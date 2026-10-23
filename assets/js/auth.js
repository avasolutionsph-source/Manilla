/* ============================================================
   Miriam College HRIS — Authentication (Supabase Auth / GoTrue)
   ------------------------------------------------------------
   Production sign-in with email + password. The authoritative
   role comes from the admin-managed `profiles` table (users
   cannot change their own role). The demo role-switcher remains
   available for evaluation; it does not require an account.
   Buildless — plain fetch against the GoTrue + REST endpoints.
   ============================================================ */
(function () {
  window.MC = window.MC || {};
  const CFG = window.MC_CONFIG || {};
  const URL = CFG.SUPABASE_URL, KEY = CFG.SUPABASE_ANON_KEY;
  const LS = 'mc_auth';

  MC.auth = {
    user: null, token: null, refresh: null, profile: null,

    /** Sign in with email + password. Resolves to the profile (role). */
    async login(email, password) {
      if (!URL || !KEY) throw new Error('Auth not configured');
      const r = await fetch(`${URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { apikey: KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: String(email || '').trim(), password: password || '' }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error_description || d.msg || d.error || 'Invalid email or password');
      MC.auth.token = d.access_token; MC.auth.refresh = d.refresh_token; MC.auth.user = d.user || null;
      try { localStorage.setItem(LS, JSON.stringify({ token: d.access_token, refresh: d.refresh_token, user: d.user })); } catch (e) {}
      await MC.auth.loadProfile();
      return MC.auth.profile;
    },

    /** Load the signed-in user's authoritative profile (role, emp_id, name). */
    async loadProfile() {
      if (!MC.auth.token || !MC.auth.user) return null;
      try {
        const r = await fetch(`${URL}/rest/v1/profiles?select=role,emp_id,name,email&id=eq.${MC.auth.user.id}`, {
          headers: { apikey: KEY, Authorization: 'Bearer ' + MC.auth.token },
        });
        const d = await r.json().catch(() => []);
        MC.auth.profile = (Array.isArray(d) && d[0]) ? d[0] : null;
      } catch (e) { MC.auth.profile = null; }
      return MC.auth.profile;
    },

    logout() {
      if (MC.auth.token) { // best-effort server-side revoke
        fetch(`${URL}/auth/v1/logout`, { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + MC.auth.token } }).catch(() => {});
      }
      MC.auth.token = null; MC.auth.refresh = null; MC.auth.user = null; MC.auth.profile = null;
      try { localStorage.removeItem(LS); } catch (e) {}
    },

    restore() {
      try { const s = JSON.parse(localStorage.getItem(LS) || 'null'); if (s && s.token) { MC.auth.token = s.token; MC.auth.refresh = s.refresh; MC.auth.user = s.user; } } catch (e) {}
    },

    isAuthed() { return !!MC.auth.token; },
    /** Bearer header to use for data requests — the user's token when signed in, else the public anon key. */
    authHeader() { return 'Bearer ' + (MC.auth.token || KEY); },
  };

  MC.auth.restore();
})();
