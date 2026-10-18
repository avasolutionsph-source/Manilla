-- ============================================================
-- Miriam College HRIS — Schema (public)
-- Mirrors assets/js/data.js (window.DB) so the front-end data
-- layer can load the same shapes from Postgres.
-- Role-switcher demo auth: anon has READ-ONLY access via RLS.
-- ============================================================

-- ---- Lookups -------------------------------------------------
create table if not exists public.campuses (
  seq  bigserial primary key,
  name text not null unique
);

create table if not exists public.departments (
  seq  bigserial primary key,
  name text not null unique
);

-- ---- Employees (201 File core) ------------------------------
create table if not exists public.employees (
  id            text primary key,          -- e.g. MC-0417
  seq           bigserial,
  name          text not null,
  position      text,
  dept          text,
  campus        text,
  emp_type      text,                       -- Regular / Faculty / Contractual / Probationary
  status        text,                       -- Active / On Leave
  email         text,
  phone         text,
  hired         date,
  sg            text,
  rank          text,
  supervisor    text,
  birth         date,
  civil         text,
  gender        text,
  tin           text,
  sss           text,
  pagibig       text,
  philhealth    text,
  contract_ends date
);

-- ---- Recruitment --------------------------------------------
create table if not exists public.jobs (
  id         text primary key,              -- REQ-2026-014
  seq        bigserial,
  title      text,
  dept       text,
  campus     text,
  job_type   text,
  status     text,
  posted     text,                           -- may be '—'
  applicants int default 0,
  stage      text,
  channel    text,
  requester  text
);

create table if not exists public.applicants (
  id       text primary key,                -- A-5521
  seq      bigserial,
  name     text not null,
  role     text,
  stage    text,
  match    int,
  exp      text,
  edu      text,
  applied  date,
  source   text,
  email    text,
  ai_notes text
);

-- ---- Timekeeping --------------------------------------------
create table if not exists public.attendance_today (
  seq      bigserial primary key,
  emp_id   text references public.employees(id) on delete cascade,
  time_in  text,
  time_out text,
  status   text,
  mode     text,
  late     boolean default false
);

create table if not exists public.leave_applications (
  id        text primary key,               -- LV-3391 / OB / OT / WO
  seq       bigserial,
  emp_id    text references public.employees(id) on delete set null,
  emp_name  text,
  leave_type text,
  from_date date,
  to_date   date,
  days      int,
  hours     int,
  status    text,
  filed     date,
  approver  text,
  reason    text
);

-- ---- Payroll ------------------------------------------------
create table if not exists public.payroll_runs (
  id          bigserial primary key,
  period      text,
  cutoff      text,
  pay_group   text,
  pay_date    date,
  employees   int,
  gross       numeric(14,2),
  deductions  numeric(14,2),
  net         numeric(14,2),
  status      text
);

create table if not exists public.payroll_items (
  seq    bigserial primary key,
  run_id bigint references public.payroll_runs(id) on delete cascade,
  emp_id text references public.employees(id) on delete cascade,
  basic  numeric(12,2),
  allow  numeric(12,2),
  ot     numeric(12,2),
  gross  numeric(12,2),
  tax    numeric(12,2),
  sss    numeric(12,2),
  phic   numeric(12,2),
  hdmf   numeric(12,2),
  loans  numeric(12,2),
  net    numeric(12,2)
);

-- ---- Benefits -----------------------------------------------
create table if not exists public.benefits (
  seq       bigserial primary key,
  name      text,
  ben_type  text,
  enrolled  int,
  eligible  int,
  employer  text,
  renews    text,
  status    text
);

create table if not exists public.claims (
  id          text primary key,             -- CLM-0912
  seq         bigserial,
  emp_name    text,
  benefit     text,
  amount      text,
  claim_type  text,
  status      text,
  filed       date
);

-- ---- Performance --------------------------------------------
create table if not exists public.performance_reviews (
  seq    bigserial primary key,
  emp_id text references public.employees(id) on delete cascade,
  cycle  text,
  score  numeric(3,1),
  rating text,
  status text,
  idp    boolean default false,
  goals  int,
  met    int
);

create table if not exists public.faculty_ranking (
  seq      bigserial primary key,
  emp_id   text references public.employees(id) on delete cascade,
  current_rank text,
  points   int,
  next_rank text,
  eligible boolean default false,
  qualif   text,
  research int,
  teaching numeric(3,1),
  service  text
);

-- ---- Offboarding / clearance --------------------------------
create table if not exists public.separations (
  id       text primary key,                -- SEP-0071
  seq      bigserial,
  emp_name text,
  emp_id   text,                             -- not FK: may be a former employee
  sep_type text,
  last_day date,
  status   text,
  progress int,
  is_exit  boolean default false
);

create table if not exists public.clearance_offices (
  seq    bigserial primary key,
  office text,
  status text,
  cleared_by text,
  cleared_date text,                         -- may be '—'
  note   text
);

-- ---- Notifications & audit ----------------------------------
create table if not exists public.notifications (
  seq    bigserial primary key,
  icon   text,
  color  text,
  title  text,
  body   text,
  time_label text,
  unread boolean default true
);

create table if not exists public.audit_trail (
  seq    bigserial primary key,
  ts     text,
  actor  text,
  action text,
  target text,
  ip     text
);

-- ============================================================
-- Row-Level Security — read-only for the public (anon) role.
-- (Role-switcher demo: the browser uses the anon key to READ.
--  Writes are not exposed to anon; enable later with real auth.)
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'campuses','departments','employees','jobs','applicants',
    'attendance_today','leave_applications','payroll_runs','payroll_items',
    'benefits','claims','performance_reviews','faculty_ranking',
    'separations','clearance_offices','notifications','audit_trail'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %I on public.%I;', t||'_read', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true);',
      t||'_read', t
    );
  end loop;
end $$;
