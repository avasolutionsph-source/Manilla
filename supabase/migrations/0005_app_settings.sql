-- ============================================================
-- Miriam College HRIS — Configuration store
-- A flexible key -> JSON settings table backing the Settings UI.
-- The front-end ships DEFAULTS (config-store.js); this table holds
-- only the admin's OVERRIDES, merged over the defaults at load time.
-- ============================================================
create table if not exists public.app_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

alter table public.app_settings enable row level security;

drop policy if exists app_settings_read on public.app_settings;
create policy app_settings_read on public.app_settings for select to anon, authenticated using (true);

drop policy if exists app_settings_ins on public.app_settings;
create policy app_settings_ins on public.app_settings for insert to anon, authenticated with check (true);

drop policy if exists app_settings_upd on public.app_settings;
create policy app_settings_upd on public.app_settings for update to anon, authenticated using (true) with check (true);
