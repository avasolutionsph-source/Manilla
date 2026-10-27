/* ============================================================
   Miriam College HRIS — App shell, auth, role-scoped routing
   ============================================================ */
window.MC = window.MC || {};
MC.pages = MC.pages || {};
MC.state = { role: 'HR Administrator', campus: 'All Campuses', route: 'dashboard' };

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const { icon, fmt, avatar, toast, modal, closeModal, drawer, closeDrawer, popover, closePopover, charts, download } = UI;

/* ---------- Shared helpers ---------- */
MC.badge = function (text, tone) {
  const map = {
    Active:'green', Open:'green', Approved:'green', Cleared:'green', Completed:'green', Present:'green', Filled:'green', Outstanding:'green', Paid:'green', Posted:'green', Accepted:'green', Enrolled:'green', Enabled:'green', Compliant:'green', Connected:'green', Live:'green', Hired:'green', Passed:'green',
    Pending:'amber', 'In Progress':'amber', Processing:'amber', 'In Review':'amber', 'For Review':'amber', 'For Approval':'amber', Late:'amber', Screening:'amber', Initiated:'amber', 'Enrollment Open':'amber', Shortlist:'amber', 'In Clearance':'amber', Scheduled:'amber',
    Rejected:'red', 'Not Compliant':'red', Overdue:'red', LWOP:'red', Closed:'red',
    'On Leave':'blue', 'On Official Business':'blue', Interviewing:'blue', Interview:'blue', Probationary:'blue', Contractual:'blue', Assessment:'blue', Submitted:'blue',
    Offer:'violet', 'Very Satisfactory':'violet', Faculty:'violet',
    Regular:'teal', Satisfactory:'teal', Applied:'gray', Requisition:'gray', 'Not yet':'gray',
  };
  const t = tone || map[text] || 'gray';
  return `<span class="badge b-${t}"><span class="bd"></span>${text}</span>`;
};

MC.stat = function ({ icon: ic, color, value, label, trend, trendDir, onclick }) {
  // Apple-minimal: KPI icon tiles are decorative — always neutral (data in value/label).
  const tone = 'var(--brand)';
  const bg = 'var(--surface-2)';
  const tr = trend ? `<span class="trend ${trendDir||'up'}">${icon(trendDir==='down'?'trendingDown':'trendingUp')}${trend}</span>` : '';
  return `<div class="card stat" ${onclick?`style="cursor:pointer" onclick="${onclick}"`:''}>
    <div class="top"><div class="ic" style="background:${bg};color:${tone}">${icon(ic)}</div>${tr}</div>
    <div class="v">${value}</div><div class="l">${label}</div></div>`;
};

MC.empCell = function (id) {
  const e = DB.empById(id); if (!e) return id;
  return `<div class="cell-emp">${avatar(e)}<div><b>${e.name}</b><span>${e.position}</span></div></div>`;
};

MC.seal = `<span class="seal-badge"><img src="assets/Images/Miriam%20Logo.png" alt="Miriam College seal"></span>`;
const SEAL = MC.seal;
MC.confirm = function(title, msg, onYes, yesLabel){ modal({title, body:`<p style="font-size:13.5px;color:var(--ink-2);margin:0;line-height:1.6">${msg}</p>`, foot:`<button class="btn" data-close>Cancel</button><button class="btn danger" id="cfmYes">${yesLabel||'Confirm'}</button>`}); const y=document.getElementById('cfmYes'); if(y) y.addEventListener('click', ()=>{ closeModal(); onYes&&onYes(); }); };

/* ============================================================
   ROLE CONFIGURATION — who sees what
   ============================================================ */
MC.PERSONA = {
  'HR Administrator': { id:'MC-0088', name:'Noel C. Racho', title:'Director, Human Resources Division', initials:'NR', color:'#1d3473' },
  'Management':       { id:'MC-EXEC', name:'Dr. Rosario P. Laurel', title:'VP for Administration', initials:'RL', color:'#1d3473' },
  'Supervisor':       { id:'MC-0417', name:'Ma. Jasmin B. Velasco', title:'Department Head · ICT Office', initials:'JV', color:'#17295f' },
  'Employee':         { id:'MC-1035', name:'Roberto M. Dizon', title:'IT Systems Administrator', initials:'RD', color:'#274597' },
  'Applicant':        { id:'A-5543', name:'Diane Rose F. Castro', title:'Applicant · IT Support Specialist', initials:'DC', color:'#284a9a' },
};
MC.SUP_TEAM = ['MC-1035','MC-0631','MC-1455','MC-0902','MC-1288','MC-0744'];

MC.ROLES = {
  'HR Administrator': {
    portal:'HR Administration', accent:'navy', tagColor:'blue',
    nav:[
      { group:'Overview', items:[ { r:'dashboard', label:'Dashboard', icon:'dashboard' }, { r:'org_chart', label:'Org Chart', icon:'layers' } ] },
      { group:'Talent', items:[ { r:'recruitment', label:'Recruitment & ATS', icon:'userPlus', badge:'6' }, { r:'onboarding', label:'Onboarding', icon:'userCheck', badge:'2' }, { r:'employees', label:'Employee 201 Files', icon:'users' } ]},
      { group:'Operations', items:[ { r:'timekeeping', label:'Timekeeping', icon:'clock' }, { r:'payroll', label:'Payroll & Comp', icon:'wallet' }, { r:'benefits', label:'Benefits', icon:'gift' }, { r:'compliance', label:'Compliance Center', icon:'shield' } ]},
      { group:'Development', items:[ { r:'performance', label:'Performance & Ranking', icon:'award' }, { r:'offboarding', label:'Offboarding', icon:'logout' } ]},
      { group:'System', items:[ { r:'approvals', label:'Approvals', icon:'checkBig', badge:'4', badgeRed:true }, { r:'documents', label:'AI Documents', icon:'scroll' }, { r:'reports', label:'Reports & Analytics', icon:'chart' }, { r:'settings', label:'Settings & Admin', icon:'settings' } ]},
    ],
  },
  'Management': {
    portal:'Executive Command Center', accent:'navy', tagColor:'violet',
    nav:[
      { group:'Overview', items:[ { r:'command_center', label:'Command Center', icon:'activity' } ] },
      { group:'Organization', items:[ { r:'org_chart', label:'Org Chart', icon:'layers' }, { r:'budget_sim', label:'Budget & Planning', icon:'coins' } ]},
      { group:'Insights', items:[ { r:'reports', label:'Analytics & Reports', icon:'chart' } ]},
    ],
  },
  'Supervisor': {
    portal:'Manager Portal', accent:'teal', tagColor:'teal',
    nav:[
      { group:'Overview', items:[ { r:'sup_dashboard', label:'My Team', icon:'dashboard' } ] },
      { group:'Team', items:[ { r:'sup_team', label:'Team Roster', icon:'users' }, { r:'sup_attendance', label:'Team Attendance', icon:'clock' } ]},
      { group:'Actions', items:[ { r:'sup_approvals', label:'Approvals', icon:'checkBig', badge:'3', badgeRed:true }, { r:'sup_performance', label:'Evaluations', icon:'award' } ]},
      { group:'Hiring', items:[ { r:'sup_hiring', label:'My Requisitions', icon:'userPlus' } ]},
    ],
  },
  'Employee': {
    portal:'Employee Self-Service', accent:'blue', tagColor:'blue',
    nav:[
      { group:'Me', items:[ { r:'emp_dashboard', label:'My Home', icon:'home' }, { r:'emp_profile', label:'My 201 File', icon:'userCheck' } ]},
      { group:'Time & Pay', items:[ { r:'emp_attendance', label:'Attendance & Leave', icon:'clock' }, { r:'emp_payslips', label:'Payslips', icon:'wallet' } ]},
      { group:'Benefits & Growth', items:[ { r:'emp_benefits', label:'My Benefits', icon:'gift' }, { r:'emp_performance', label:'My Performance', icon:'award' }, { r:'emp_learning', label:'Learning', icon:'gradCap' } ]},
    ],
  },
  'Applicant': {
    portal:'Careers Portal', accent:'gold', tagColor:'amber',
    nav:[
      { group:'Careers', items:[ { r:'app_jobs', label:'Open Positions', icon:'briefcase' }, { r:'app_applications', label:'My Applications', icon:'fileText' } ]},
      { group:'Account', items:[ { r:'app_offers', label:'Offers', icon:'badgeCheck', badge:'1', badgeRed:true }, { r:'app_profile', label:'My Profile', icon:'userCheck' } ]},
    ],
  },
};
MC.featEnabled = (r) => { const f=(window.MC&&MC.config&&MC.config.get)?MC.config.get('features',{}):{}; const m={command_center:'command',budget_sim:'budget'}; return f[m[r]||r]!==false; };
MC.allowedRoutes = () => MC.ROLES[MC.state.role].nav.flatMap(g => g.items.map(i => i.r)).filter(MC.featEnabled);
MC.homeRoute = () => { const all=MC.ROLES[MC.state.role].nav.flatMap(g => g.items.map(i => i.r)); return all.find(MC.featEnabled) || all[0]; };
MC.persona = () => MC.PERSONA[MC.state.role];

/* ============================================================
   LOGIN
   ============================================================ */
const ROLES_UI = [
  { key:'HR Administrator', icon:'users', desc:'Full HR operations & admin' },
  { key:'Management', icon:'activity', desc:'Executive command center' },
  { key:'Supervisor', icon:'badgeCheck', desc:'Team, approvals & evaluations' },
  { key:'Employee', icon:'userCheck', desc:'Self-service portal' },
  { key:'Applicant', icon:'userPlus', desc:'Careers portal' },
];

MC.renderLogin = function () {
  MC.state.role = MC.state.role || 'HR Administrator';
  document.body.className = '';
  document.body.innerHTML = `
  <div class="login-wrap">
    <div class="login-hero">
      <div class="row" style="gap:13px">${SEAL}<div><b style="color:#fff;font-size:17px">Miriam College</b><div style="color:var(--gold-soft);font-size:11px;letter-spacing:.14em;text-transform:uppercase">Human Resources Information System</div></div></div>
      <h1 style="margin-top:46px">One HR platform.<br>Every role, every campus.</h1>
      <p class="lead">From recruitment to retirement — a single, secure source of truth for employee records, timekeeping, payroll, benefits, performance, and AI-assisted insights, with each user seeing exactly what they need.</p>
      <div class="hero-features">
        <div class="hero-feat"><div class="ic">${icon('users')}</div><div><b>Role-based access</b><small>Admins, supervisors, employees & applicants — scoped views</small></div></div>
        <div class="hero-feat"><div class="ic">${icon('fingerprint')}</div><div><b>Biometric & mobile timekeeping</b><small>M10 Fingerprint · Facial · GPS</small></div></div>
        <div class="hero-feat"><div class="ic">${icon('sparkles')}</div><div><b>AI-assisted, human-approved</b><small>Insights with oversight by design</small></div></div>
      </div>
      <div style="margin-top:28px;color:#8fa0cc;font-size:11.5px;letter-spacing:.03em;position:relative">Quezon City · Nuvali · Alviera &nbsp;•&nbsp; Veritas · Est. 1926</div>
    </div>
    <div class="login-panel">
      <div class="login-card">
        <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--ink-3);margin-bottom:16px">← Back to Miriam College website</a>
        <div class="row" style="gap:11px;margin-bottom:24px">${SEAL}<b style="font-size:15px">Miriam College HRIS</b></div>
        <h2>Sign in</h2>
        <div class="sub">Sign in with your Miriam College HRIS account.</div>
        <div class="field"><label for="loginEmail">Email</label><input class="input" id="loginEmail" type="email" placeholder="you@mc.edu.ph" value="hr@mc.edu.ph" autocomplete="username"></div>
        <div class="field"><label for="loginPass">Password</label><input class="input" id="loginPass" type="password" placeholder="Your password" autocomplete="current-password"></div>
        <div id="loginErr" class="hint" style="color:var(--red);min-height:15px;margin:-6px 0 8px"></div>
        <button class="btn primary block" id="loginBtn">${icon('lock')} <span id="loginLbl">Sign in</span></button>
        <div class="mfa-note">${icon('shield')} Role-based access control · Multi-factor authentication ready</div>
        <div class="hint" style="margin-top:8px;text-align:center;line-height:1.55">Demo — password <b>Miriam2026!</b> for <b>hr@</b> · exec@ · supervisor@ · employee@ · applicant@ <span style="color:var(--ink-3)">(…@mc.edu.ph)</span></div>
        <div style="display:flex;align-items:center;gap:10px;margin:20px 0 14px;color:var(--ink-3);font-size:11.5px"><span style="flex:1;height:1px;background:var(--line)"></span>or explore a demo role<span style="flex:1;height:1px;background:var(--line)"></span></div>
        <div class="role-grid" id="roleGrid">
          ${ROLES_UI.map(r => `<button class="role-opt" data-role="${r.key}">
            <div class="ic">${icon(r.icon)}</div><div><b>${r.key}</b><span>${r.desc}</span></div></button>`).join('')}
        </div>
        ${(window.MC&&MC.config&&MC.config.get('features',{}).kiosk===false)?'':`<div style="text-align:center;margin-top:16px"><button class="btn sm" id="kioskBtn">${icon('fingerprint')} Open Time-in Kiosk (M10 / Facial)</button></div>`}
        <div style="text-align:center;color:var(--ink-3);font-size:11px;margin-top:18px">© 2026 Miriam College · Information & Communications Technology Office</div>
      </div>
    </div>
  </div>`;
  $('#roleGrid').addEventListener('click', e => {
    const b = e.target.closest('[data-role]'); if (!b) return;
    MC.state.role = b.dataset.role; MC.authedLogin = false; // demo access
    MC.enterApp();
  });
  $('#loginBtn').addEventListener('click', () => MC.signIn());
  $('#loginPass')?.addEventListener('keydown', e => { if (e.key === 'Enter') MC.signIn(); });
  $('#kioskBtn')?.addEventListener('click', () => MC.renderKiosk());
};

/* ============================================================
   BIOMETRIC TIME-IN KIOSK
   ============================================================ */
MC.kioskMethod = 'M10 Fingerprint';
MC.renderKiosk = function () {
  if (MC._kioskTimer) clearInterval(MC._kioskTimer);
  document.body.className = '';
  const methods = [['M10 Fingerprint','fingerprint'],['Facial Biometric','eye'],['RFID / ID Card','smartphone']];
  document.body.innerHTML = `
  <div class="kiosk">
    <div class="kiosk-top">
      <div class="row" style="gap:12px">${SEAL}<div><b style="color:#fff;font-size:16px">Miriam College</b><div style="color:var(--gold-soft);font-size:11px;letter-spacing:.14em;text-transform:uppercase">Time & Attendance Kiosk</div></div></div>
      <div class="row" style="gap:16px"><div style="text-align:right"><div class="kiosk-clock" id="kClock">--:--:--</div><div style="color:#aebbdd;font-size:12px" id="kDate"></div></div>
        <button class="btn" id="kExit" style="background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.2)">${icon('logout')} Exit</button></div>
    </div>
    <div class="kiosk-body" id="kBody">
      <div class="kiosk-tabs" id="kTabs">${methods.map(([m,ic])=>`<button class="kiosk-tab ${m===MC.kioskMethod?'active':''}" data-m="${m}">${icon(ic)} ${m}</button>`).join('')}</div>
      <div class="kiosk-scan" id="kScan">
        <div class="scan-ring" id="scanRing">${icon('fingerprint')}</div>
        <h2 id="scanTitle">Place your finger on the scanner</h2>
        <p id="scanSub">or tap below to simulate a scan</p>
        <button class="btn gold" id="kScanBtn" style="padding:13px 26px;font-size:15px">${icon('fingerprint')} Simulate scan</button>
        <div style="color:#8fa0cc;font-size:12px;margin-top:20px">Quezon City Campus · Gate 01 · Device QC-M10-001</div>
      </div>
    </div>
  </div>`;
  const tick = () => { const d=new Date(); $('#kClock').textContent=d.toLocaleTimeString('en-US',{hour12:false}); $('#kDate').textContent=d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}); };
  tick(); MC._kioskTimer = setInterval(tick, 1000);
  $('#kExit').addEventListener('click', () => { clearInterval(MC._kioskTimer); MC.renderLogin(); });
  $('#kTabs').addEventListener('click', e => { const b=e.target.closest('[data-m]'); if(!b) return; MC.kioskMethod=b.dataset.m; $$('.kiosk-tab').forEach(x=>x.classList.toggle('active',x===b)); kioskSetMethod(); });
  $('#kScanBtn').addEventListener('click', () => MC.kioskScan());
  kioskSetMethod();
};
function kioskSetMethod(){
  const m = MC.kioskMethod;
  const map = { 'M10 Fingerprint':['fingerprint','Place your finger on the scanner'], 'Facial Biometric':['eye','Look at the camera'], 'RFID / ID Card':['smartphone','Tap your ID card'] };
  const [ic,title] = map[m];
  const ring=$('#scanRing'), st=$('#scanTitle'), sb=$('#kScanBtn');
  if(ring){ ring.innerHTML=icon(ic); st.textContent=title; sb.innerHTML=`${icon(ic)} Simulate scan`; }
}
MC._kioskIdx = 0;
MC.kioskScan = function(){
  const ring=$('#scanRing'); if(!ring) return;
  ring.classList.add('scanning');
  const scan = $('#kScan');
  $('#kScanBtn').disabled = true;
  $('#scanTitle').textContent = 'Scanning…';
  $('#scanSub').textContent = 'Please hold still';
  setTimeout(() => {
    const pool = DB.employees.filter(e=>e.status==='Active');
    const e = pool[MC._kioskIdx % pool.length]; MC._kioskIdx++;
    const now = new Date().toLocaleTimeString('en-US',{hour12:false});
    scan.innerHTML = `
      <div class="scan-ok">${avatar(e,'lg')}</div>
      <div class="kiosk-success">${icon('checkCircle')} Verified</div>
      <h2 style="margin-top:6px">Welcome, ${e.name.split(' ')[0]}!</h2>
      <p style="color:#c7d2ef">${e.position} · ${e.dept}</p>
      <div class="kiosk-stamp">${icon('clock')} Timed IN at <b>${now}</b> · ${MC.kioskMethod}</div>
      <button class="btn gold" id="kAgain" style="margin-top:22px;padding:12px 24px">${icon('refresh')} Next employee</button>`;
    $('#kAgain').addEventListener('click', () => { MC.renderKioskScanReset(); });
  }, 1600);
};
MC.renderKioskScanReset = function(){
  const scan = $('#kScan');
  scan.innerHTML = `
    <div class="scan-ring" id="scanRing">${icon('fingerprint')}</div>
    <h2 id="scanTitle">Place your finger on the scanner</h2>
    <p id="scanSub">or tap below to simulate a scan</p>
    <button class="btn gold" id="kScanBtn" style="padding:13px 26px;font-size:15px">${icon('fingerprint')} Simulate scan</button>
    <div style="color:#8fa0cc;font-size:12px;margin-top:20px">Quezon City Campus · Gate 01 · Device QC-M10-001</div>`;
  $('#kScanBtn').addEventListener('click', () => MC.kioskScan());
  kioskSetMethod();
};
function loginEmailFor(){ return { 'HR Administrator':'nracho@mc.edu.ph','Management':'rlaurel@mc.edu.ph','Supervisor':'jvelasco@mc.edu.ph','Employee':'rdizon@mc.edu.ph','Applicant':'diane.castro@email.com' }[MC.state.role]; }

// Hardcoded demo credentials — the sign-in form works out of the box for
// evaluation. Real Supabase Auth still applies to any provisioned account.
const DEMO_ACCOUNTS = {
  'hr@mc.edu.ph':         { password: 'Miriam2026!', role: 'HR Administrator' },
  'exec@mc.edu.ph':       { password: 'Miriam2026!', role: 'Management' },
  'supervisor@mc.edu.ph': { password: 'Miriam2026!', role: 'Supervisor' },
  'employee@mc.edu.ph':   { password: 'Miriam2026!', role: 'Employee' },
  'applicant@mc.edu.ph':  { password: 'Miriam2026!', role: 'Applicant' },
};
MC.DEMO_ACCOUNTS = DEMO_ACCOUNTS;
MC.confirmReject = function (id, btn) { MC.confirm('Reject this application?', 'This action cannot be undone.', () => { MC.decideApp(id, 'Rejected'); const row = btn && btn.closest && btn.closest('.cl-row'); if (row) row.remove(); }, 'Reject'); };
MC.signIn = async function () {
  const email = ($('#loginEmail') || {}).value || '';
  const pass = ($('#loginPass') || {}).value || '';
  const err = $('#loginErr');
  if (!email || !pass) { if (err) err.textContent = 'Enter your email and password.'; return; }
  // Demo credentials (client-side) — instant access without provisioning.
  const demo = DEMO_ACCOUNTS[email.trim().toLowerCase()];
  if (demo && demo.password === pass) { MC.state.role = demo.role; MC.authedLogin = true; MC.enterApp(); return; }
  const btn = $('#loginBtn'), lbl = $('#loginLbl');
  if (btn) btn.disabled = true; if (lbl) lbl.textContent = 'Signing in…'; if (err) err.textContent = '';
  try {
    if (!MC.auth) throw new Error('Authentication is unavailable.');
    const profile = await MC.auth.login(email, pass);
    const meta = (MC.auth.user && MC.auth.user.user_metadata) || {};
    const role = (profile && profile.role) || meta.role;
    if (!role || !MC.ROLES[role]) throw new Error('Your account has no assigned role. Contact HR.');
    MC.state.role = role; MC.authedLogin = true;
    if (profile && MC.PERSONA[role]) MC.PERSONA[role] = { ...MC.PERSONA[role], name: profile.name || MC.PERSONA[role].name, id: profile.emp_id || MC.PERSONA[role].id };
    MC.enterApp();
  } catch (e) {
    if (btn) btn.disabled = false; if (lbl) lbl.textContent = 'Sign in';
    if (err) err.textContent = String((e && e.message) || e);
  }
};
MC.enterApp = function () {
  MC.state.route = MC.homeRoute();
  MC.renderApp();
  setTimeout(() => toast('Signed in', 'ok', `${MC.persona().name} · ${MC.ROLES[MC.state.role].portal}`), 300);
};

/* ============================================================
   APP SHELL
   ============================================================ */
MC.renderApp = function () {
  const role = MC.ROLES[MC.state.role];
  const p = MC.persona();
  const showCampus = MC.state.role === 'HR Administrator' || MC.state.role === 'Supervisor';
  document.body.innerHTML = `
  <div class="app" data-accent="${role.accent}">
    <aside class="sidebar">
      <div class="brand">${SEAL}<div><b>Miriam College</b><span>${role.portal}</span></div></div>
      <nav class="nav" id="nav">
        ${(() => { const feat=(window.MC&&MC.config&&MC.config.get)?MC.config.get('features',{}):{}; const fmap={command_center:'command',budget_sim:'budget'}; return role.nav.map(g => { const items=g.items.filter(it=>feat[fmap[it.r]||it.r]!==false); return items.length?`<div class="nav-group-label">${g.group}</div>`+items.map(it=>`<div class="nav-item ${it.r===MC.state.route?'active':''}" data-route="${it.r}" role="button" tabindex="0">${icon(it.icon)}<span>${it.label}</span>${it.badge?`<span class="nav-badge ${it.badgeRed?'red':''}">${it.badge}</span>`:''}</div>`).join(''):''; }).join(''); })()}
      </nav>
      <div class="side-foot">
        ${showCampus ? `<div class="campus-pill" id="campusPill">${icon('mapPin')}<span id="campusLbl">${MC.state.campus}</span>${icon('chevronDown')}</div>` : `<div class="campus-pill" id="switchRole">${icon('refresh')}<span>Switch role</span></div>`}
      </div>
    </aside>
    <div class="nav-backdrop" id="navBackdrop"></div>
    <div class="main">
      <header class="topbar">
        <button class="icon-btn mobile-menu-btn" id="btnMenu" title="Menu">${icon('menu')}</button>
        <div id="headTitle"></div>
        <div class="spacer"></div>
        <div class="search" id="searchBox">${icon('search')}<input placeholder="${searchPlaceholder()}" id="globalSearch"><kbd>Ctrl K</kbd></div>
        <button class="btn sm" id="btnInstall" title="Install the HRIS app" style="display:${MC._installPrompt?'inline-flex':'none'};gap:6px">${icon('download')} Install app</button>
        <button class="icon-btn" id="btnNotif" title="Notifications" aria-label="Notifications">${icon('bell')}${(MC.notifSets&&(MC.notifSets[MC.state.role]||[]).some(x=>x.unread))?'<span class="dot"></span>':''}</button>
        ${(window.MC&&MC.config&&MC.config.get('features',{}).ai_assistant===false)?'':`<button class="icon-btn" id="btnHelp" title="AI Assistant">${icon('sparkles')}</button>`}
        <div class="userchip" id="userChip">
          <div class="ava" style="background:${p.color}">${p.initials}</div>
          <div><b>${p.name}</b><span>${MC.state.role}</span></div>
          ${icon('chevronDown')}
        </div>
      </header>
      <main class="content" id="content"></main>
    </div>
  </div>
  ${(window.MC&&MC.config&&MC.config.get('features',{}).ai_assistant===false)?'':`<button class="ai-fab" id="aiFab" title="${aiTitle()}">${icon('sparkles')}</button>`}
  <div class="watermark">Miriam College HRIS — Interactive Prototype · ${role.portal}</div>`;

  const closeMobileNav = () => $('.app')?.classList.remove('nav-open');
  $('#nav').addEventListener('click', e => { const it = e.target.closest('[data-route]'); if (it) { MC.go(it.dataset.route); closeMobileNav(); } });
  $('#nav').addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { const it = e.target.closest('[data-route]'); if (it) { e.preventDefault(); MC.go(it.dataset.route); closeMobileNav(); } } });
  $('#btnMenu').addEventListener('click', () => $('.app').classList.toggle('nav-open'));
  $('#navBackdrop').addEventListener('click', closeMobileNav);
  $('#btnInstall')?.addEventListener('click', () => MC.installApp());
  $('#btnNotif').addEventListener('click', () => MC.openNotifications());
  $('#btnHelp')?.addEventListener('click', () => MC.openAI());
  $('#aiFab')?.addEventListener('click', () => MC.openAI());
  $('#userChip').addEventListener('click', () => MC.openUserMenu());
  if ($('#campusPill')) $('#campusPill').addEventListener('click', () => MC.openCampusMenu());
  if ($('#switchRole')) $('#switchRole').addEventListener('click', () => MC.renderLogin());
  $('#searchBox').addEventListener('click', () => $('#globalSearch').focus());
  $('#globalSearch').addEventListener('input', e => MC.search(e.target.value));
  if (MC._kbd) document.removeEventListener('keydown', MC._kbd);
  MC._kbd = e => { if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k') { e.preventDefault(); $('#globalSearch')?.focus(); } };
  document.addEventListener('keydown', MC._kbd);
  MC.go(MC.state.route);
};
function searchPlaceholder(){ return MC.state.role==='Applicant' ? 'Search open positions…' : MC.state.role==='Employee' ? 'Search my records…' : 'Search employees, modules…'; }

MC.go = function (route) {
  if (!MC.allowedRoutes().includes(route)) route = MC.homeRoute();
  MC.state.route = route;
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.route === route));
  const page = MC.pages[route];
  const content = $('#content');
  if (!page) { content.innerHTML = `<div class="empty">${icon('info')}<div>Coming soon</div></div>`; return; }
  const out = page();
  content.innerHTML = out.html;
  $('#headTitle').innerHTML = `<div class="crumb">${out.crumb||MC.ROLES[MC.state.role].portal}</div><h1>${out.title}</h1>`;
  content.scrollTop = 0; window.scrollTo(0,0);
  if (out.onMount) out.onMount(content);
};

/* ---------- Notifications (role-aware) ---------- */
MC.notifSets = {
  'HR Administrator':[
    { icon:'userPlus', color:'blue', title:'New applicant for IT Support Specialist', body:'Mariel T. Ocampo applied via MC Careers Site', time:'12 min ago', unread:true },
    { icon:'alertTriangle', color:'amber', title:'Contract ending in 45 days', body:'Emmanuel T. Cruz (MC-1267)', time:'1 hr ago', unread:true },
    { icon:'calendar', color:'violet', title:'Leave approvals needed', body:'2 applications awaiting review', time:'2 hrs ago', unread:true },
    { icon:'dollar', color:'green', title:'Payroll run ready for review', body:'Oct 1–15 · ₱7.44M net', time:'3 hrs ago', unread:false },
  ],
  'Management':[
    { icon:'trendingUp', color:'violet', title:'Q3 workforce report ready', body:'Attrition down 0.8% vs Q2', time:'1 hr ago', unread:true },
    { icon:'alertTriangle', color:'amber', title:'Succession risk flagged', body:'2 leadership roles without a ready successor', time:'4 hrs ago', unread:true },
    { icon:'coins', color:'green', title:'Budget utilization at 94%', body:'Personnel budget on track for FY', time:'Yesterday', unread:false },
  ],
  'Supervisor':[
    { icon:'calendar', color:'violet', title:'Leave request from your team', body:'Grace Fernandez · VL · Oct 20–22', time:'20 min ago', unread:true },
    { icon:'clock', color:'amber', title:'Overtime filing to approve', body:'Patricia Villanueva · 4 hrs', time:'1 hr ago', unread:true },
    { icon:'award', color:'teal', title:'Evaluation window open', body:'3 team members pending review', time:'Yesterday', unread:true },
  ],
  'Employee':[
    { icon:'checkBig', color:'green', title:'Your leave was approved', body:'VL · Oct 6–7 · approved by J. Velasco', time:'1 hr ago', unread:true },
    { icon:'dollar', color:'blue', title:'Payslip available', body:'Oct 1–15, 2026 · net ₱39,605', time:'3 hrs ago', unread:true },
    { icon:'gift', color:'violet', title:'Educational benefit enrollment', body:'Window closes Nov 15', time:'Yesterday', unread:false },
  ],
  'Applicant':[
    { icon:'badgeCheck', color:'green', title:'You received a job offer!', body:'IT Support Specialist · review your offer', time:'30 min ago', unread:true },
    { icon:'calendar', color:'blue', title:'Interview completed', body:'Thank you for coming in', time:'3 days ago', unread:false },
  ],
};
MC.openNotifications = function () {
  const n = MC.notifSets[MC.state.role] || [];
  // Neutral notification icon tiles — the icon + text carry the meaning.
  const tones = { blue:'var(--brand)', amber:'var(--brand)', violet:'var(--brand)', green:'var(--brand)', teal:'var(--brand)' };
  const bgs = { blue:'var(--surface-2)', amber:'var(--surface-2)', violet:'var(--surface-2)', green:'var(--surface-2)', teal:'var(--surface-2)' };
  const html = `<div style="width:360px">
    <div class="menu-head"><b>Notifications</b><span style="font-size:12px;color:var(--brand-2);cursor:pointer" id="markAll">Mark all read</span></div>
    <div style="max-height:400px;overflow-y:auto">
      ${n.length?n.map(x => `<div class="notif-item ${x.unread?'unread':''}">
        <div class="ni" style="background:${bgs[x.color]};color:${tones[x.color]}">${icon(x.icon)}</div>
        <div><b>${x.title}</b><p>${x.body}</p><div class="tm">${x.time}</div></div></div>`).join(''):`<div class="menu-item muted">No notifications</div>`}
    </div></div>`;
  const m = popover($('#btnNotif'), html);
  $('#markAll', m)?.addEventListener('click', () => { (MC.notifSets[MC.state.role]||[]).forEach(x=>x.unread=false); $('#btnNotif .dot')?.remove(); closePopover(); toast('All caught up','ok'); });
};

MC.openUserMenu = function () {
  const p = MC.persona();
  const isInternal = MC.state.role !== 'Applicant';
  const html = `<div style="width:240px">
    <div class="menu-head"><div class="row" style="gap:10px"><div class="ava-sm" style="background:${p.color}">${p.initials}</div><div><b>${p.name}</b><div style="font-size:11.5px;color:var(--ink-3)">${p.title}</div></div></div></div>
    ${isInternal?`<div class="menu-item" data-a="profile">${icon('userCheck')} My 201 File</div>`:`<div class="menu-item" data-a="profile">${icon('userCheck')} My profile</div>`}
    <div class="menu-item" data-a="role">${icon('refresh')} Switch role</div>
    <div class="menu-item" data-a="logout">${icon('logout')} Sign out</div></div>`;
  const m = popover($('#userChip'), html);
  m.addEventListener('click', e => { const a = e.target.closest('[data-a]'); if (!a) return; closePopover();
    if (a.dataset.a==='logout') { if (MC.auth) MC.auth.logout(); MC.authedLogin = false; MC.renderLogin(); }
    else if (a.dataset.a==='role') MC.renderLogin();
    else if (a.dataset.a==='profile') MC.go({ 'HR Administrator':'employees','Supervisor':'sup_team','Employee':'emp_profile','Applicant':'app_profile' }[MC.state.role]);
  });
};

MC.openCampusMenu = function () {
  const opts = ['All Campuses', ...DB.campuses];
  const html = `<div style="width:220px"><div class="menu-head"><b>Campus</b></div>
    ${opts.map(c => `<div class="menu-item" data-c="${c}">${icon('mapPin')} ${c}${c===MC.state.campus?' '+icon('check'):''}</div>`).join('')}</div>`;
  const m = popover($('#campusPill'), html, 'left');
  m.addEventListener('click', e => { const c = e.target.closest('[data-c]'); if (!c) return; MC.state.campus = c.dataset.c; $('#campusLbl').textContent = c.dataset.c; closePopover(); toast('Campus filter updated', 'info', c.dataset.c); MC.go(MC.state.route); });
};

/* ---------- Global search (role-aware) ---------- */
MC.search = function (q) {
  closePopover(); if (!q || q.length < 2) return;
  const ql = q.toLowerCase();
  const role = MC.state.role;
  if (role === 'Applicant') {
    const jobs = DB.jobs.filter(j=>j.status==='Open' && (j.title.toLowerCase().includes(ql)||j.dept.toLowerCase().includes(ql))).slice(0,5);
    const html = `<div style="width:320px">${jobs.length?jobs.map(j=>`<div class="menu-item" data-job="${j.id}">${icon('briefcase')}<div><b style="font-size:12.5px">${j.title}</b><div style="font-size:11px;color:var(--ink-3)">${j.campus} · ${j.type}</div></div></div>`).join(''):`<div class="menu-item muted">No open positions match “${q}”</div>`}</div>`;
    const m = popover($('#searchBox'), html, 'left');
    m.addEventListener('click',e=>{const j=e.target.closest('[data-job]'); if(j){closePopover();$('#globalSearch').value='';MC.go('app_jobs');}});
    return;
  }
  const mods = MC.ROLES[role].nav.flatMap(g=>g.items).filter(i => i.label.toLowerCase().includes(ql)).slice(0,4);
  let empHtml = '';
  if (role === 'HR Administrator') {
    const emps = DB.employees.filter(e => e.name.toLowerCase().includes(ql) || e.id.toLowerCase().includes(ql) || e.position.toLowerCase().includes(ql)).slice(0,5);
    if (emps.length) empHtml = `<div class="nav-group-label" style="color:var(--ink-3);padding:10px 14px 4px">Employees</div>${emps.map(e=>`<div class="menu-item" data-emp="${e.id}">${avatar(e)}<div><b style="font-size:12.5px">${e.name}</b><div style="font-size:11px;color:var(--ink-3)">${e.id} · ${e.position}</div></div></div>`).join('')}`;
  }
  const html = `<div style="width:300px;max-height:420px;overflow:auto">${empHtml}
    ${mods.length?`<div class="nav-group-label" style="color:var(--ink-3);padding:10px 14px 4px">Navigate</div>${mods.map(m=>`<div class="menu-item" data-mod="${m.r}">${icon(m.icon)} ${m.label}</div>`).join('')}`:''}
    ${!empHtml&&!mods.length?`<div class="menu-item muted">No results for “${q}”</div>`:''}</div>`;
  const m = popover($('#searchBox'), html, 'left');
  m.addEventListener('click', e => {
    const emp = e.target.closest('[data-emp]'); const mod = e.target.closest('[data-mod]');
    if (emp) { closePopover(); $('#globalSearch').value=''; MC.go('employees'); setTimeout(()=>MC.openEmployee(emp.dataset.emp),120); }
    if (mod) { closePopover(); $('#globalSearch').value=''; MC.go(mod.dataset.mod); }
  });
};

/* ============================================================
   AI ASSISTANT (role-scoped, scripted)
   ============================================================ */
function aiTitle(){ return MC.state.role==='Applicant' ? 'Careers Assistant' : MC.state.role==='Employee' ? 'HR Self-Service Assistant' : 'HRIS AI Assistant'; }
MC.AI = {
  'HR Administrator':{ greet:`Hi! I'm your <b>HRIS AI Assistant</b>. I surface workforce insights, draft content, and answer HR questions. Everything I recommend is advisory — <b>a person always approves the decision.</b>`,
    chips:['Headcount summary','Attrition risk','Contracts ending','Payroll check','Best candidate'],
    kb:[
      {k:['headcount','how many','employees','total'],a:`You have <b>412 active employees</b> — 258 QC, 101 Nuvali, 53 Alviera. That's 176 faculty and 236 staff/admin. 12-month attrition is 6.2%.`},
      {k:['attrition','turnover','resign','retention'],a:`I flag <b>7 employees</b> at elevated attrition risk — concentrated in contractual faculty near end-of-contract. <span class="ai-flag">${icon('shield')} Advisory — human review required</span>`},
      {k:['contract','ending','expire'],a:`<b>3 contracts</b> end within 90 days: E. Cruz (May 31), G. Fernandez (May 31), M. Tan (Jul 31). I can draft renewal recommendations.`},
      {k:['tardy','late','absent','attendance'],a:`Today: <b>3 late</b>, 1 on leave, 1 on OB. Anomaly engine detects habitual Monday tardiness for 2 employees — I recommend a coaching note pending supervisor review.`},
      {k:['payroll','salary','pay'],a:`The <b>Oct 1–15 run</b> is ready: 412 employees, ₱7.44M net, <b>0 critical anomalies</b>. Journal entries are staged for SAP.`},
      {k:['hire','recruit','applicant','candidate','best'],a:`Top candidate for IT Support is <b>Diane Rose F. Castro</b> (93% match, at offer). For Asst. Prof. Math, <b>Reina M. Bautista</b> leads at 94%. Rankings assist — the committee decides.`},
      {k:['promote','ranking'],a:`<b>2 faculty</b> are promotion-eligible: Dr. V. Ramos and Dr. C. Mendoza. Rank-based increases auto-stage in Payroll upon approval.`},
    ]},
  'Management':{ greet:`Good day, VP Laurel. I'm your <b>Executive Assistant</b>. Ask me for strategic workforce insights — attrition, succession, cost, and campus comparisons. All projections are decision-support; <b>decisions remain yours.</b>`,
    chips:['Workforce summary','Succession risk','Cost forecast','Campus comparison','Attrition outlook'],
    kb:[
      {k:['summary','workforce','overview','headcount'],a:`Miriam College has <b>412 employees</b> across 3 campuses — stable headcount, 6.2% attrition (below the 8% sector benchmark), and 94% budget utilization. Engagement index is <b>4.1/5</b>.`},
      {k:['succession','successor','leadership'],a:`<b>2 of 9</b> leadership roles lack a ready successor within 12 months. 11 employees are "ready-now" for promotion. I recommend accelerating 3 development plans. <span class="ai-flag">${icon('shield')} Advisory</span>`},
      {k:['cost','forecast','budget','expense'],a:`Projected annual personnel cost is <b>₱236.3M</b>. A 5% merit increase would add ₱9.4M; current budget absorbs it with a 2.1% buffer. Use Budget & Planning to model scenarios.`},
      {k:['campus','compare','nuvali','alviera'],a:`By campus — <b>QC</b>: 258 staff, 94.6% attendance; <b>Nuvali</b>: 101, 95.1%; <b>Alviera</b>: 53, 93.2%. Alviera has the highest contractual ratio and merits a staffing review.`},
      {k:['attrition','turnover','retention','outlook'],a:`12-month attrition forecast is <b>6.0–6.5%</b>, concentrated in contractual faculty. Retaining 3 high-performers would protect ₱2.1M in replacement cost.`},
    ]},
  'Supervisor':{ greet:`Hi! I'm your <b>Manager Assistant</b>. I help you review your team's attendance, approvals, and evaluations. Approvals always stay with you.`,
    chips:['Pending approvals','Team attendance','Who is on leave?','Evaluation status'],
    kb:[
      {k:['approval','pending','approve'],a:`You have <b>3 items</b> awaiting approval: Grace Fernandez (VL), Patricia Villanueva (OT), and a work-offset request. Open Approvals to action them.`},
      {k:['attendance','present','late'],a:`Your team today: <b>5 present</b>, 1 late, 0 absent. Roberto Dizon timed in 07:45 via facial biometric.`},
      {k:['leave','on leave','who'],a:`No one on your team is on leave today. Grace Fernandez has a <b>pending</b> VL for Oct 20–22 awaiting your approval.`},
      {k:['evaluation','performance','review'],a:`<b>3 evaluations</b> are open this cycle. Roberto Dizon is in review (4.3). I can pre-fill competency ratings from goal progress for your confirmation.`},
    ]},
  'Employee':{ greet:`Hi Roberto! I'm your <b>HR Self-Service Assistant</b>. Ask me about your leave balance, payslip, benefits, or how to file a request.`,
    chips:['My leave balance','My latest payslip','File a leave','My benefits'],
    kb:[
      {k:['leave','balance','vl','sl'],a:`Your balances: <b>Vacation 9.5 days</b>, Sick 7.0 days, Emergency 3.0 days. Want to file one? Go to Attendance & Leave → File application.`},
      {k:['payslip','pay','salary','net'],a:`Your latest payslip (Oct 1–15) shows gross ₱49,000 and <b>net ₱39,605</b>, pay date Oct 20. You can download the PDF from Payslips.`},
      {k:['file','apply','request'],a:`You can file Leave, Official Business, Overtime, or Work-Hours-Offset from <b>Attendance & Leave</b>. It routes to J. Velasco for approval.`},
      {k:['benefit','hmo','claim'],a:`You're enrolled in HMO (Maxicare), SSS, PhilHealth, Pag-IBIG, group life & retirement. Educational benefit enrollment is open until Nov 15.`},
      {k:['performance','evaluation','idp'],a:`Your current evaluation is <b>In Review</b> (score 4.3 — Very Satisfactory). Your IDP focuses on cloud certification. See My Performance.`},
    ]},
  'Applicant':{ greet:`Hi Diane! I'm the <b>Miriam College Careers Assistant</b>. I can help with your application status, open positions, and next steps.`,
    chips:['My application status','Open positions','What happens next?','About Miriam College'],
    kb:[
      {k:['status','application','where'],a:`Great news — your application for <b>IT Support Specialist</b> is at the <b>Offer</b> stage! Check the Offers tab to review and respond.`},
      {k:['open','position','job','vacancy'],a:`We currently have <b>3 open positions</b>: Assistant Professor (Math), IT Support Specialist, and Guidance Counselor (Nuvali). See Open Positions.`},
      {k:['next','happen','step'],a:`Your next step: review your <b>job offer</b> in the Offers tab. Once you accept, HR will begin onboarding — and your records transfer automatically, no re-encoding.`},
      {k:['about','miriam','college','mission'],a:`Miriam College is a Catholic educational institution (est. 1926) guided by <b>Veritas</b>, with campuses in Quezon City, Nuvali, and Alviera.`},
    ]},
};
MC.openAI = function () {
  if ($('#aiPanel')) return;
  const cfg = MC.AI[MC.state.role];
  const p = document.createElement('div'); p.className='ai-panel'; p.id='aiPanel';
  p.innerHTML = `
    <div class="ai-head"><div class="ab">${icon('sparkles')}</div>
      <div style="flex:1"><b>${aiTitle()}</b><span>${MC.state.role==='Applicant'?'Recruitment support':'Human-in-the-loop · Advisory'}</span></div>
      <button class="x-btn" style="background:rgba(255,255,255,.12);color:#fff" id="aiClose">${icon('x')}</button></div>
    <div class="ai-body" id="aiBody">
      <div class="ai-msg bot">${cfg.greet}</div>
      <div class="ai-chips">${cfg.chips.map(c=>`<div class="ai-chip">${c}</div>`).join('')}</div>
    </div>
    <div class="ai-foot"><input id="aiInput" placeholder="Type your question…"><button class="ai-send" id="aiSend">${icon('send')}</button></div>`;
  document.body.appendChild(p);
  $('#aiClose').addEventListener('click', () => p.remove());
  const send = () => { const v = $('#aiInput').value.trim(); if (!v) return; MC.aiSend(v); $('#aiInput').value=''; };
  $('#aiSend').addEventListener('click', send);
  $('#aiInput').addEventListener('keydown', e => { if (e.key==='Enter') send(); });
  p.addEventListener('click', e => { const c = e.target.closest('.ai-chip'); if (c) MC.aiSend(c.textContent); });
  $('#aiInput').focus();
};
MC.aiSend = function (text) {
  const body = $('#aiBody'); if (!body) return;
  $$('.ai-chips', body).forEach(c => c.remove());
  body.insertAdjacentHTML('beforeend', `<div class="ai-msg user">${text}</div>`);
  const typing = document.createElement('div'); typing.className='ai-msg bot'; typing.innerHTML = `<div class="ai-typing"><i></i><i></i><i></i></div>`;
  body.appendChild(typing); body.scrollTop = body.scrollHeight;
  const ql = text.toLowerCase().trim();
  const cfg = MC.AI[MC.state.role];
  const greet = /^(hi|hello|hey|yo|kumusta|kamusta|good (morning|afternoon|evening)|what can you do|help|start)\b/.test(ql) || ql==='hi' || ql==='hello';
  const hit = cfg.kb.find(x => x.k.some(w => ql.includes(w)));
  const fallback = MC.state.role==='Applicant'
    ? `I can help with your application status, open positions, next steps, or about Miriam College — tap a suggestion below.`
    : `I didn't quite catch that. Here are things I can answer — tap one below. Every recommendation I give is reviewed and approved by an authorized person.`;
  const ans = greet ? cfg.greet : (hit ? hit.a : fallback);
  setTimeout(() => {
    typing.innerHTML = ans;
    // follow-up suggestions after every answer
    const sug = cfg.chips.filter(c => c.toLowerCase() !== ql).slice(0, 4);
    typing.insertAdjacentHTML('afterend', `<div class="ai-chips"><div class="ai-chips-label">Suggested next</div>${sug.map(c => `<div class="ai-chip">${c}</div>`).join('')}</div>`);
    body.scrollTop = body.scrollHeight;
  }, 700);
};

/* ---------- PWA install (Add to Home Screen) ---------- */
MC._installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  MC._installPrompt = e;
  $$('#btnInstall').forEach(b => { b.style.display = 'inline-flex'; });
});
window.addEventListener('appinstalled', () => {
  MC._installPrompt = null;
  $$('#btnInstall').forEach(b => { b.style.display = 'none'; });
  toast('App installed', 'ok', 'Miriam College HRIS is now on your home screen');
});
MC.installApp = async function () {
  const e = MC._installPrompt;
  if (!e) { toast('Install from your browser', 'info', 'Use “Add to Home Screen” (Share menu on iOS) to install'); return; }
  e.prompt();
  try { await e.userChoice; } catch (_) {}
  MC._installPrompt = null;
  $$('#btnInstall').forEach(b => { b.style.display = 'none'; });
};

/* ---------- Esc closes the topmost overlay ---------- */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const ai = document.getElementById('aiPanel'); if (ai) { ai.remove(); return; }
  if (document.getElementById('popover')) { closePopover(); return; }
  if (document.getElementById('drawer')) { closeDrawer(); return; }
  if (document.getElementById('modal-overlay')) { closeModal(); return; }
});

/* ---------- boot ---------- */
window.addEventListener('DOMContentLoaded', () => {
  try {
    const portal = (new URLSearchParams(location.search).get('portal') || '').toLowerCase();
    const map = { applicant:'Applicant', employee:'Employee', supervisor:'Supervisor', hr:'HR Administrator', management:'Management' };
    if (map[portal]) MC.state.role = map[portal];
  } catch (e) {}
  MC.renderLogin();
});
