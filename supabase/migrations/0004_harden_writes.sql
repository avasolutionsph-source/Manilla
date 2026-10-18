-- ============================================================
-- Miriam College HRIS — Harden demo writes
-- The UI only ever writes to 8 tables. Revoke anon INSERT/UPDATE
-- on every other table (they stay READ-ONLY) to shrink the public
-- attack surface before the site is deployed publicly.
-- Still a demo posture — real per-user auth should replace this
-- entirely before true production. DELETE remains ungranted everywhere.
-- ============================================================
do $$
declare t text;
begin
  -- tables the app actually writes to (keep INSERT/UPDATE)
  -- employees, jobs, applicants, leave_applications, claims,
  -- separations, performance_reviews, faculty_ranking
  --
  -- revoke writes on everything else:
  foreach t in array array[
    'campuses','departments','payroll_runs','payroll_items',
    'benefits','clearance_offices','notifications','audit_trail'
  ] loop
    execute format('drop policy if exists %I on public.%I;', t||'_ins', t);
    execute format('drop policy if exists %I on public.%I;', t||'_upd', t);
  end loop;
end $$;
