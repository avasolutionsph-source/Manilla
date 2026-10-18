/* ============================================================
   Miriam College HRIS — Backend configuration
   ------------------------------------------------------------
   Supabase project connection for the live data layer.
   The anon key is SAFE to expose in the browser: it is a public,
   read-only key (Row-Level Security blocks all writes).
   To point the demo at a different project, change these two values.
   ============================================================ */
window.MC_CONFIG = {
  SUPABASE_URL:      'https://vnmmmxazkxofpxktkntl.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZubW1teGF6a3hvZnB4a3RrbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzNDkzMzQsImV4cCI6MjEwNzkyNTMzNH0.6_-WAi-hOiPHi-Nj85-T7sgPQ7McmuH-iMsxE0u1nkI',
  // When false, the app always uses the bundled mock data in data.js.
  USE_SUPABASE: true,
};
