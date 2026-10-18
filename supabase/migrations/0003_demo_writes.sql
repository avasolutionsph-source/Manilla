-- ============================================================
-- Miriam College HRIS — Demo write access
-- Opens INSERT + UPDATE to the public (anon) role so the
-- prototype's actions persist to Supabase. DELETE is NOT granted
-- (data cannot be wiped via the public key).
-- NOTE: this is a demo posture. Before production, replace with
-- real auth (Supabase Auth) and per-role RLS, then drop these.
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
    -- INSERT
    execute format('drop policy if exists %I on public.%I;', t||'_ins', t);
    execute format('create policy %I on public.%I for insert to anon, authenticated with check (true);', t||'_ins', t);
    -- UPDATE
    execute format('drop policy if exists %I on public.%I;', t||'_upd', t);
    execute format('create policy %I on public.%I for update to anon, authenticated using (true) with check (true);', t||'_upd', t);
  end loop;
end $$;
