-- ============================================================
-- Miriam College HRIS — Production authentication
-- Supabase Auth (email + password). The authoritative ROLE for
-- each user lives here (admin-managed); users can read only their
-- own profile and cannot change their role (production-safe authz).
-- ============================================================
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  role       text,     -- HR Administrator | Management | Supervisor | Employee | Applicant
  emp_id     text,     -- links to public.employees(id)
  name       text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using (auth.uid() = id);

-- ------------------------------------------------------------
-- Role assignment. Create the sign-in accounts FIRST in the
-- Supabase dashboard (Authentication → Users → Add user, with
-- "Auto Confirm User" checked), then run this block — it maps each
-- account to its role by email. Safe to re-run (idempotent); it
-- inserts 0 rows until the matching accounts exist.
-- ------------------------------------------------------------
insert into public.profiles (id, email, role, emp_id, name)
select u.id, u.email, m.role, m.emp_id, m.name
from auth.users u
join (values
  ('hr@mc.edu.ph',         'HR Administrator', 'MC-0088', 'Noel C. Racho'),
  ('exec@mc.edu.ph',       'Management',       'MC-EXEC', 'Dr. Rosario P. Laurel'),
  ('supervisor@mc.edu.ph', 'Supervisor',       'MC-0417', 'Ma. Jasmin B. Velasco'),
  ('employee@mc.edu.ph',   'Employee',         'MC-1035', 'Roberto M. Dizon'),
  ('applicant@mc.edu.ph',  'Applicant',        'A-5543',  'Diane Rose F. Castro')
) as m(email, role, emp_id, name) on lower(u.email) = m.email
on conflict (id) do update set role = excluded.role, emp_id = excluded.emp_id, name = excluded.name;
