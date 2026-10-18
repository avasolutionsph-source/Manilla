/* ============================================================
   Miriam College HRIS — Live data layer (Supabase REST)
   ------------------------------------------------------------
   Loads real records from Supabase into window.DB, keeping the
   exact same shapes the UI already expects (see data.js). No
   build step, no SDK — plain fetch against PostgREST.
   If the backend is unreachable or disabled, the app silently
   keeps the bundled mock data (offline fallback).
   ============================================================ */
(function () {
  const CFG = window.MC_CONFIG || {};
  const URL = CFG.SUPABASE_URL, KEY = CFG.SUPABASE_ANON_KEY;

  // Nothing to do — keep mock data from data.js.
  if (!CFG.USE_SUPABASE || !URL || !KEY) {
    window.MC = window.MC || {}; MC.dataReady = Promise.resolve(false); MC.dataSource = 'mock';
    return;
  }

  const num = (x) => (x === null || x === undefined || x === '') ? x : Number(x);
  async function rest(path) {
    const r = await fetch(`${URL}/rest/v1/${path}`, {
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, Accept: 'application/json' },
    });
    if (!r.ok) throw new Error(`REST ${path} → ${r.status}`);
    return r.json();
  }
  // Replace an array's contents in place (preserves references/closures, e.g. DB.empById).
  const repl = (arr, items) => { if (!Array.isArray(arr)) return; arr.length = 0; items.forEach(x => arr.push(x)); };

  // ---- Row → UI-shape mappers (mirror data.js keys exactly) ----
  const mapEmployee = (r) => ({
    id: r.id, name: r.name, position: r.position, dept: r.dept, campus: r.campus,
    type: r.emp_type, status: r.status, email: r.email, phone: r.phone, hired: r.hired,
    sg: r.sg, rank: r.rank, supervisor: r.supervisor, birth: r.birth, civil: r.civil,
    gender: r.gender, tin: r.tin, sss: r.sss, pagibig: r.pagibig, philhealth: r.philhealth,
    contractEnds: r.contract_ends,
    color: DB.colorFor(r.name), initials: DB.initials(r.name),
  });
  const mapJob = (r) => ({
    id: r.id, title: r.title, dept: r.dept, campus: r.campus, type: r.job_type, status: r.status,
    posted: r.posted, applicants: r.applicants, stage: r.stage, channel: r.channel, requester: r.requester,
  });
  const mapApplicant = (r) => ({
    id: r.id, name: r.name, role: r.role, stage: r.stage, match: r.match, exp: r.exp, edu: r.edu,
    applied: r.applied, source: r.source, email: r.email, aiNotes: r.ai_notes,
    color: DB.colorFor(r.name), initials: DB.initials(r.name),
  });
  const mapAttendance = (r) => ({
    id: r.emp_id, timeIn: r.time_in, timeOut: r.time_out, status: r.status, mode: r.mode, late: r.late,
  });
  const mapLeave = (r) => ({
    id: r.id, emp: r.emp_id, empName: r.emp_name, type: r.leave_type, from: r.from_date, to: r.to_date,
    days: r.days, hours: r.hours, status: r.status, filed: r.filed, approver: r.approver, reason: r.reason,
  });
  const mapBenefit = (r) => ({
    name: r.name, type: r.ben_type, enrolled: r.enrolled, eligible: r.eligible,
    employer: r.employer, renews: r.renews, status: r.status,
  });
  const mapClaim = (r) => ({
    id: r.id, emp: r.emp_name, benefit: r.benefit, amount: r.amount, type: r.claim_type, status: r.status, filed: r.filed,
  });
  const mapReview = (r) => ({
    emp: r.emp_id, cycle: r.cycle, score: num(r.score), rating: r.rating, status: r.status,
    idp: r.idp, goals: r.goals, met: r.met,
  });
  const mapRanking = (r) => ({
    emp: r.emp_id, current: r.current_rank, points: r.points, next: r.next_rank, eligible: r.eligible,
    qualif: r.qualif, research: r.research, teaching: num(r.teaching), service: r.service,
  });
  const mapSeparation = (r) => ({
    id: r.id, emp: r.emp_name, empId: r.emp_id, type: r.sep_type, lastDay: r.last_day,
    status: r.status, progress: r.progress, exit: r.is_exit,
  });
  const mapClearance = (r) => ({
    office: r.office, status: r.status, by: r.cleared_by, date: r.cleared_date, note: r.note,
  });
  const mapNotification = (r) => ({
    icon: r.icon, color: r.color, title: r.title, body: r.body, time: r.time_label, unread: r.unread,
  });
  const mapAudit = (r) => ({ ts: r.ts, actor: r.actor, action: r.action, target: r.target, ip: r.ip });

  async function loadData() {
    const [
      campuses, departments, employees, jobs, applicants, attendance, leave,
      runRows, itemRows, benefits, claims, reviews, ranking, separations,
      clearance, notifications, audit,
    ] = await Promise.all([
      rest('campuses?select=name&order=seq'),
      rest('departments?select=name&order=seq'),
      rest('employees?select=*&order=seq'),
      rest('jobs?select=*&order=seq'),
      rest('applicants?select=*&order=seq'),
      rest('attendance_today?select=*&order=seq'),
      rest('leave_applications?select=*&order=seq'),
      rest('payroll_runs?select=*&order=id&limit=1'),
      rest('payroll_items?select=*&order=seq'),
      rest('benefits?select=*&order=seq'),
      rest('claims?select=*&order=seq'),
      rest('performance_reviews?select=*&order=seq'),
      rest('faculty_ranking?select=*&order=seq'),
      rest('separations?select=*&order=seq'),
      rest('clearance_offices?select=*&order=seq'),
      rest('notifications?select=*&order=seq'),
      rest('audit_trail?select=*&order=seq'),
    ]);

    repl(DB.campuses, campuses.map(r => r.name));
    repl(DB.departments, departments.map(r => r.name));
    repl(DB.employees, employees.map(mapEmployee));
    repl(DB.jobs, jobs.map(mapJob));
    repl(DB.applicants, applicants.map(mapApplicant));
    repl(DB.attendanceToday, attendance.map(mapAttendance));
    repl(DB.applications, leave.map(mapLeave));
    repl(DB.benefits, benefits.map(mapBenefit));
    repl(DB.claims, claims.map(mapClaim));
    repl(DB.reviews, reviews.map(mapReview));
    repl(DB.facultyRanking, ranking.map(mapRanking));
    repl(DB.separations, separations.map(mapSeparation));
    repl(DB.clearanceOffices, clearance.map(mapClearance));
    repl(DB.notifications, notifications.map(mapNotification));
    repl(DB.auditTrail, audit.map(mapAudit));

    // Payroll run is a single object with an items array.
    if (runRows && runRows[0]) {
      const run = runRows[0];
      const pr = DB.payrollRun;
      pr.period = run.period; pr.cutoff = run.cutoff; pr.group = run.pay_group; pr.pay_date = run.pay_date;
      pr.employees = run.employees; pr.gross = num(run.gross); pr.deductions = num(run.deductions);
      pr.net = num(run.net); pr.status = run.status;
      pr.items = itemRows.map(r => ({
        id: r.emp_id, basic: num(r.basic), allow: num(r.allow), ot: num(r.ot), gross: num(r.gross),
        tax: num(r.tax), sss: num(r.sss), phic: num(r.phic), hdmf: num(r.hdmf), loans: num(r.loans), net: num(r.net),
      }));
    }
    return true;
  }

  // ---- Write helpers (demo: anon INSERT/UPDATE; DELETE blocked by RLS) ----
  async function write(method, path, body, prefer) {
    const r = await fetch(`${URL}/rest/v1/${path}`, {
      method,
      headers: {
        apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json',
        ...(prefer ? { Prefer: prefer } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!r.ok) { const t = await r.text().catch(() => ''); throw new Error(`${method} ${path} → ${r.status} ${t}`); }
    const txt = await r.text(); return txt ? JSON.parse(txt) : null;
  }

  window.MC = window.MC || {};
  MC.db = {
    live: () => MC.dataSource === 'supabase',
    insert: (table, row) => write('POST', table, row, 'return=representation'),
    update: (table, idField, idValue, patch) =>
      write('PATCH', `${table}?${idField}=eq.${encodeURIComponent(idValue)}`, patch, 'return=representation'),
  };

  MC.dataSource = 'loading';
  // Kick off the load immediately (parallel with page init).
  MC.dataReady = loadData()
    .then(() => { MC.dataSource = 'supabase'; console.info('[Miriam HRIS] Live data loaded from Supabase.'); return true; })
    .catch((e) => { MC.dataSource = 'mock'; console.warn('[Miriam HRIS] Supabase unavailable — using bundled demo data.', e); return false; });

  // Make the login → portal transition wait for live data (first render shows real records).
  function wrapEnter() {
    if (!window.MC || typeof MC.enterApp !== 'function' || MC._enterWrapped) return;
    MC._enterWrapped = true;
    const original = MC.enterApp;
    MC.enterApp = async function () {
      if (MC.dataSource === 'loading') {
        const btn = document.getElementById('loginBtn');
        const prev = btn ? btn.innerHTML : null;
        if (btn) { btn.disabled = true; btn.textContent = 'Loading live data…'; }
        try { await Promise.all([MC.dataReady, MC.configReady]); } catch (e) {}
        if (btn) { btn.disabled = false; if (prev != null) btn.innerHTML = prev; }
      }
      return original.apply(this, arguments);
    };
  }
  wrapEnter();
})();
