/* ============================================================
   Miriam College HRIS — Role-scoped portals
   Employee Self-Service · Manager Portal · Careers Portal
   ============================================================ */
(function () {
  const { icon, fmt, avatar, toast, modal, closeModal, drawer, closeDrawer, charts } = UI;
  const badge = MC.badge, stat = MC.stat;
  const kv = (k,v) => `<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`;
  const daysTo = (iso) => Math.max(0, Math.round((new Date(iso) - Date.now())/864e5));
  const aiRow = (t) => `<div class="alertbar ai">${icon('sparkles')}<div style="flex:1">${t}</div><span class="ai-flag">${icon('shield')} Human-approved</span></div>`;

  /* ========================================================
     ===============  EMPLOYEE SELF-SERVICE  ================
     ======================================================== */
  const ME = () => DB.empById('MC-1035'); // Roberto M. Dizon

  MC.pages.emp_dashboard = function () {
    const e = ME();
    return { title:'My Home', crumb:'Employee Self-Service',
      html:`
      <div class="hero">
        <div class="between" style="align-items:flex-start">
          <div><div class="portal-tag" style="background:rgba(255,255,255,.14);color:#e8d59a">${icon('userCheck')} Self-Service</div>
            <h2 style="margin-top:12px">Good day, Roberto</h2>
            <p>Welcome to your Miriam College employee portal — ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}. You're clocked in since <b style="color:#fff">07:45 AM</b> (Facial Biometric).</p></div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><b>9.5</b><span>Vacation leave (days)</span></div>
          <div class="hero-stat"><b>₱39,605</b><span>Latest net pay</span></div>
          <div class="hero-stat"><b>98.4%</b><span>My attendance rate</span></div>
          <div class="hero-stat"><b>Oct 20</b><span>Next payday</span></div>
        </div>
        <div class="hero-actions">
          <button class="btn gold" onclick="MC.fileApplication()">${icon('calendar')} File a leave</button>
          <button class="btn" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.2)" onclick="MC.go('emp_payslips')">${icon('wallet')} View payslip</button>
        </div>
      </div>

      <div class="ss-grid mb">
        ${ssTile('userCheck','blue','My 201 File','View your complete record','emp_profile')}
        ${ssTile('calendar','violet','Attendance & Leave','File & track applications','emp_attendance')}
        ${ssTile('wallet','green','Payslips','Download payslips & 2316','emp_payslips')}
        ${ssTile('gift','amber','My Benefits','HMO, claims & dependents','emp_benefits')}
      </div>

      <div class="grid" style="grid-template-columns:1.5fr 1fr">
        <div class="card"><div class="card-head"><h3>My requests</h3><button class="btn sm primary" onclick="MC.fileApplication()">${icon('plus')} New request</button></div>
          <div class="table-wrap"><table class="tbl"><thead><tr><th>Ref</th><th>Type</th><th>Dates</th><th>Status</th></tr></thead><tbody>
            <tr><td class="muted">LV-3380</td><td>${badge('Vacation Leave','teal')}</td><td class="muted">Oct 6 – 7</td><td>${badge('Approved')}</td></tr>
            <tr><td class="muted">OB-2190</td><td>${badge('Official Business','blue')}</td><td class="muted">Sep 29</td><td>${badge('Approved')}</td></tr>
            <tr><td class="muted">OT-1120</td><td>${badge('Overtime','violet')}</td><td class="muted">Sep 22</td><td>${badge('Approved')}</td></tr>
          </tbody></table></div>
        </div>
        <div class="card"><div class="card-head"><h3>Announcements</h3></div><div class="card-pad" style="padding-top:8px">
          ${announce('calendar','violet','Educational benefit enrollment','Window closes Nov 15 — enroll your dependents.','2 days ago')}
          ${announce('award','teal','Faculty & Staff Recognition','Nominations open for the Veritas Awards.','4 days ago')}
          ${announce('heartPulse','red','Annual Physical Exam','Book your APE schedule before Dec 15.','1 week ago')}
        </div></div>
      </div>`,
    };
  };
  function ssTile(ic,color,title,sub,route){
    return `<div class="ss-tile" onclick="MC.go('${route}')"><span class="arr">${icon('arrowRight')}</span>
      <div class="ic" style="background:var(--surface-2);color:var(--brand)">${icon(ic)}</div>
      <b>${title}</b><span>${sub}</span></div>`;
  }
  function announce(ic,color,title,body,time){
    return `<div class="ann"><div class="ic" style="background:var(--surface-2);color:var(--brand)">${icon(ic)}</div><div style="flex:1"><b>${title}</b><p>${body}</p><div class="tm">${time}</div></div></div>`;
  }

  MC.pages.emp_profile = function () {
    const e = ME();
    return { title:'My 201 File', crumb:'Employee Self-Service',
      html:`
      <div class="card card-pad mb"><div class="row" style="gap:18px">${avatar(e,'lg')}
        <div style="flex:1"><h2 style="font-size:20px">${e.name}</h2><div class="muted">${e.position} · ${e.dept}</div>
          <div class="row mt-sm wrap" style="gap:7px">${badge(e.status)}${badge(e.type)}<span class="chip">${icon('mapPin')} ${e.campus}</span><span class="chip">${icon('clock')} ${fmt.yrs(e.hired)} tenure</span><span class="chip">${e.id}</span></div></div>
        <button class="btn" onclick="UI.toast('Request update','info','Profile change requests route to HR for review')">${icon('edit')} Request update</button></div>

      <div class="grid g-2 mb">
        <div class="card"><div class="card-head"><h3>Personal information</h3></div><div class="card-pad">${kv('Full name',e.name)}${kv('Date of birth',fmt.date(e.birth))}${kv('Gender',e.gender)}${kv('Civil status',e.civil)}${kv('Mobile',e.phone)}${kv('Email',e.email)}</div></div>
        <div class="card"><div class="card-head"><h3>Employment</h3></div><div class="card-pad">${kv('Position',e.position)}${kv('Department',e.dept)}${kv('Type',e.type)}${kv('Date hired',fmt.date(e.hired))}${kv('Supervisor',e.supervisor)}${kv('Salary grade',e.sg)}</div></div>
      </div>
      <div class="grid g-2 mb">
        <div class="card"><div class="card-head"><h3>Government IDs</h3><span class="chip">${icon('lock')} Masked</span></div><div class="card-pad">${kv('TIN','•••-•••-'+e.tin.slice(-3))}${kv('SSS','••-•••••'+e.sss.slice(-3))}${kv('Pag-IBIG','••••-••••-'+e.pagibig.slice(-4))}${kv('PhilHealth','••-•••••••'+e.philhealth.slice(-2))}</div></div>
        <div class="card"><div class="card-head"><h3>Dependents</h3></div><div class="card-pad">${kv('Spouse','1 · covered')}${kv('Children','2 · covered')}${kv('Beneficiaries','Updated · 2026')}<button class="btn block mt" onclick="UI.toast('Dependents','info','Update routes to HR & Benefits')">${icon('users')} Manage dependents</button></div></div>
      </div>
      <div class="card"><div class="card-head"><h3>My documents</h3><button class="btn sm" onclick="UI.toast('Upload','info','Encrypted at rest')">${icon('upload')} Upload</button></div>
        <div class="card-pad" style="padding-top:8px">
          ${docRow('Contract of Employment','PDF · 2017','green')}
          ${docRow('Diploma & Transcript','PDF · verified','green')}
          ${docRow('PRC / Eligibility','PDF · valid 2027','green')}
          ${docRow('Annual Physical Exam (2026)','PDF · encrypted','green')}
        </div></div>`,
    };
  };
  function docRow(name,meta,color){
    return `<div class="cl-row" style="padding:11px 14px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('fileText')}</div><div style="flex:1"><b style="font-size:13px">${name}</b><div class="muted" style="font-size:11.5px">${meta}</div></div><button class="btn sm" onclick="UI.toast('Download','ok','${name}')">${icon('download')}</button></div>`;
  }

  MC.pages.emp_attendance = function () {
    const bal = [['Vacation',9.5,15,'var(--brand-2)'],['Sick',7.0,15,'var(--teal)'],['Emergency',3.0,5,'var(--violet)']];
    const week = [
      ['Mon','07:45','17:08','Present'],['Tue','07:52','17:02','Present'],['Wed','08:14','17:30','Late'],
      ['Thu','07:40','17:05','Present'],['Fri','07:45','—','Present'],
    ];
    return { title:'Attendance & Leave', crumb:'Employee Self-Service',
      html:`
      <div class="page-head"><div><div class="t">Attendance & Leave</div><div class="d">Your time records, schedule, and applications.</div></div>
        <button class="btn primary" onclick="MC.fileApplication()">${icon('calendar')} File application</button></div>

      <div class="grid g-3 mb">
        ${bal.map(([n,v,m,c])=>`<div class="bal-card"><div class="row between"><div><div class="lab">${n} leave balance</div><div class="big">${v}<span class="unit"> / ${m} days</span></div></div>${charts.ring(Math.round(v/m*100),{size:72,thickness:9,color:c})}</div></div>`).join('')}
      </div>

      <div class="grid mb" style="grid-template-columns:1.4fr 1fr">
        <div class="card"><div class="card-head"><div><h3>This week</h3><div class="sub">Captured via biometric / web / mobile</div></div><span class="chip">Schedule: Mon–Fri 8:00–17:00</span></div>
          <div class="table-wrap"><table class="tbl"><thead><tr><th>Day</th><th>Time In</th><th>Time Out</th><th>Status</th></tr></thead><tbody>
            ${week.map(([d,i,o,s])=>`<tr><td><b>${d}</b></td><td>${i}</td><td>${o}</td><td>${badge(s)}</td></tr>`).join('')}
          </tbody></table></div></div>
        <div class="card"><div class="card-head"><h3>My applications</h3></div><div class="card-pad" style="padding-top:8px">
          ${myApp('LV-3380','Vacation Leave','Oct 6–7, 2026','Approved','teal')}
          ${myApp('OB-2190','Official Business','Sep 29, 2026','Approved','blue')}
          ${myApp('OT-1120','Overtime (4h)','Sep 22, 2026','Approved','violet')}
          <button class="btn block mt" onclick="MC.fileApplication()">${icon('plus')} File new application</button>
        </div></div>
      </div>`,
    };
  };
  function myApp(ref,type,date,status,tone){
    return `<div class="cl-row" style="padding:11px 14px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('calendar')}</div><div style="flex:1"><b style="font-size:13px">${type}</b><div class="muted" style="font-size:11.5px">${ref} · ${date}</div></div>${badge(status)}</div>`;
  }

  MC.pages.emp_payslips = function () {
    const it = DB.payrollRun.items.find(x=>x.id==='MC-1035');
    const hist = [['Oct 1–15, 2026',49000,39605],['Sep 16–30, 2026',49000,39480],['Sep 1–15, 2026',49000,39605],['Aug 16–31, 2026',49000,39210]];
    return { title:'Payslips', crumb:'Employee Self-Service',
      html:`
      <div class="grid g-4 mb">
        ${stat({icon:'wallet',color:'navy',value:fmt.peso(it.gross),label:'Latest gross'})}
        ${stat({icon:'receipt',color:'amber',value:fmt.peso(it.tax+it.sss+it.phic+it.hdmf+it.loans),label:'Deductions'})}
        ${stat({icon:'coins',color:'green',value:fmt.peso(it.net),label:'Latest net pay'})}
        ${stat({icon:'scroll',color:'blue',value:fmt.peso(588000),label:'YTD gross'})}
      </div>
      <div class="grid mb" style="grid-template-columns:1fr 1fr">
        <div class="card"><div class="card-head"><div><h3>Latest payslip</h3><div class="sub">${DB.payrollRun.period} · pay date ${fmt.date(DB.payrollRun.pay_date)}</div></div></div>
          <div class="card-pad">
            <div class="grid g-2"><div>${kv('Basic pay',fmt.peso2(it.basic))}${kv('Allowances',fmt.peso2(it.allow))}${kv('Overtime',fmt.peso2(it.ot))}</div>
              <div>${kv('W/holding tax',fmt.peso2(it.tax))}${kv('SSS / PHIC / HDMF',fmt.peso2(it.sss+it.phic+it.hdmf))}${kv('Loans',fmt.peso2(it.loans))}</div></div>
            <div class="card card-pad mt-lg" style="background:var(--navy-900);color:#fff"><div class="between"><span style="color:#c7d2ef">NET PAY</span><b style="font-size:21px;color:#fff">${fmt.peso2(it.net)}</b></div></div>
            <button class="btn primary block mt-lg" onclick="MC.viewPayslip('MC-1035')">${icon('eye')} View full payslip</button>
          </div></div>
        <div class="card"><div class="card-head"><h3>Payslip history</h3><button class="btn sm" onclick="MC.save2316('MC-1035')">${icon('scroll')} BIR 2316</button></div>
          <div class="table-wrap"><table class="tbl"><thead><tr><th>Period</th><th>Gross</th><th>Net</th><th></th></tr></thead><tbody>
            ${hist.map(([p,g,n])=>`<tr><td><b style="font-size:12.8px">${p}</b></td><td>${fmt.peso(g)}</td><td><b style="color:var(--ink)">${fmt.peso(n)}</b></td><td><button class="btn sm" onclick="MC.savePayslip('MC-1035','${p}')">${icon('download')}</button></td></tr>`).join('')}
          </tbody></table></div></div>
      </div>`,
    };
  };

  MC.pages.emp_benefits = function () {
    const mine = [
      ['HMO — Maxicare Platinum','Health','red','Active · with 2 dependents'],
      ['SSS','Mandatory','blue','Active'],
      ['PhilHealth','Mandatory','blue','Active'],
      ['Pag-IBIG (HDMF)','Mandatory','blue','Active'],
      ['Group Life Insurance','Insurance','violet','Active · ₱1.2M coverage'],
      ['Retirement Plan','Retirement','navy','Vested'],
    ];
    return { title:'My Benefits', crumb:'Employee Self-Service',
      html:`
      <div class="mb">${aiRow(`<b>Reminder:</b> The <b>Educational Benefit</b> enrollment window closes <b>Nov 15</b>. Your 2 dependents are eligible for tuition support.`)}</div>
      <div class="page-head"><div><div class="t">My Benefits</div><div class="d">Your enrolled programs, dependents, and claims.</div></div>
        <div class="row wrap"><button class="btn" onclick="UI.toast('Enroll','info','Educational benefit enrollment opened')">${icon('gradCap')} Enroll (Educational)</button><button class="btn primary" onclick="MC.empFileClaim()">${icon('receipt')} File a claim</button></div></div>

      <div class="grid g-2 mb">
        <div class="card"><div class="card-head"><h3>Enrolled programs</h3></div><div class="card-pad" style="padding-top:8px">
          ${mine.map(([n,t,c,s])=>`<div class="cl-row" style="padding:11px 14px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('gift')}</div><div style="flex:1"><b style="font-size:13px">${n}</b><div class="muted" style="font-size:11.5px">${s}</div></div>${badge('Active')}</div>`).join('')}
        </div></div>
        <div>
          <div class="card mb"><div class="card-head"><h3>My dependents</h3></div><div class="card-pad">${kv('Spouse','Covered · HMO + Life')}${kv('Child 1','Covered · HMO + Educational')}${kv('Child 2','Covered · HMO + Educational')}</div></div>
          <div class="card"><div class="card-head"><h3>My claims</h3></div><div class="card-pad" style="padding-top:8px">
            ${myApp('CLM-0912','HMO — Outpatient','₱8,400 · Oct 8','Approved','green')}
            ${myApp('CLM-0902','Wellness reimbursement','₱3,000 · Sep 12','Approved','green')}
          </div></div>
        </div>
      </div>`,
    };
  };
  // ---- Real file generation (payslip / 2316) ----
  MC.saveHtmlFile = function (filename, title, bodyHtml) {
    const css = "body{font-family:'Inter',Arial,sans-serif;color:#1b1e2b;max-width:700px;margin:32px auto;padding:0 28px;font-size:13px;line-height:1.6}h1{font-size:18px;color:#102050;margin:0 0 2px}h2{font-size:13px;margin:22px 0 8px;color:#17295f;text-transform:uppercase;letter-spacing:.04em}table{width:100%;border-collapse:collapse;margin:6px 0}td,th{padding:7px 4px;border-bottom:1px solid #e4e8f0}.r{text-align:right}.tot{font-weight:700;border-top:2px solid #17295f}.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #17295f;padding-bottom:12px;margin-bottom:8px}@media print{body{margin:0}}";
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head><body><div class="hd"><div><h1>Miriam College</h1><div style="font-size:11px;color:#777">Human Resources Division · Quezon City</div></div><div style="text-align:right;font-size:11px;color:#555">${title}</div></div>${bodyHtml}<p style="margin-top:34px;font-size:10px;color:#999">System-generated document.</p></body></html>`;
    const b = new Blob([html], { type: 'text/html' }); const u = URL.createObjectURL(b); const a = document.createElement('a');
    a.href = u; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 1000);
    toast('Downloaded', 'ok', title + ' — open & print to PDF');
  };
  const peso2 = (v) => '₱' + Number(v || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  MC.savePayslip = function (empId, period) {
    const it = (DB.payrollRun.items || []).find((x) => x.id === empId) || {}; const e = DB.empById(empId) || {};
    const per = period || DB.payrollRun.period;
    const body = `<h2>Payslip — ${per}</h2>
      <table><tr><td>Employee</td><td class="r">${e.name || empId} (${empId})</td></tr><tr><td>Position</td><td class="r">${e.position || ''}</td></tr><tr><td>Pay date</td><td class="r">${DB.payrollRun.pay_date || ''}</td></tr></table>
      <h2>Earnings</h2><table><tr><td>Basic pay</td><td class="r">${peso2(it.basic)}</td></tr><tr><td>Allowances</td><td class="r">${peso2(it.allow)}</td></tr><tr><td>Overtime</td><td class="r">${peso2(it.ot)}</td></tr><tr class="tot"><td>Gross</td><td class="r">${peso2(it.gross)}</td></tr></table>
      <h2>Deductions</h2><table><tr><td>Withholding tax</td><td class="r">${peso2(it.tax)}</td></tr><tr><td>SSS</td><td class="r">${peso2(it.sss)}</td></tr><tr><td>PhilHealth</td><td class="r">${peso2(it.phic)}</td></tr><tr><td>Pag-IBIG</td><td class="r">${peso2(it.hdmf)}</td></tr><tr><td>Loans</td><td class="r">${peso2(it.loans)}</td></tr></table>
      <table style="margin-top:12px"><tr class="tot" style="font-size:15px"><td>NET PAY</td><td class="r">${peso2(it.net)}</td></tr></table>`;
    MC.saveHtmlFile(('Payslip_' + empId + '_' + per).replace(/[^\w]+/g, '_') + '.html', 'Payslip', body);
  };
  MC.save2316 = function (empId) {
    const it = (DB.payrollRun.items || []).find((x) => x.id === empId) || {}; const e = DB.empById(empId) || {};
    const ann = (v) => Number(v || 0) * 24;
    const body = `<h2>BIR Form 2316 — Certificate of Compensation / Tax Withheld</h2>
      <table><tr><td>Employee</td><td class="r">${e.name || empId}</td></tr><tr><td>TIN</td><td class="r">${e.tin || ''}</td></tr><tr><td>Taxable year</td><td class="r">${(DB.payrollRun.pay_date || '2026').slice(0, 4)}</td></tr></table>
      <h2>Summary (annualized)</h2><table><tr><td>Gross compensation</td><td class="r">${peso2(ann(it.gross))}</td></tr><tr><td>Non-taxable (SSS/PhilHealth/Pag-IBIG)</td><td class="r">${peso2(ann(it.sss + it.phic + it.hdmf))}</td></tr><tr class="tot"><td>Tax withheld</td><td class="r">${peso2(ann(it.tax))}</td></tr></table>
      <p style="margin-top:20px;font-size:11px;color:#777">This certifies that the above compensation was paid and the corresponding tax withheld per the Tax Code.</p>`;
    MC.saveHtmlFile(('BIR_2316_' + empId).replace(/[^\w]+/g, '_') + '.html', 'BIR Form 2316', body);
  };
  MC.acknowledgeReview = function () {
    const r = DB.reviews.find((x) => x.emp === 'MC-1035'); if (r) r.status = 'Acknowledged';
    toast('Acknowledged', 'ok', 'Your acknowledgment was recorded');
    if (window.MC && MC.db && MC.db.live()) MC.db.update('performance_reviews', 'emp_id', 'MC-1035', { status: 'Acknowledged' }).catch((e) => toast('Sync failed', 'warn', String(e.message || e)));
  };
  MC.saveCertificate = function(course){
    const p=MC.persona();
    const body=`<div style="text-align:center;padding:20px 0"><h2 style="border:none;font-size:22px">Certificate of Completion</h2>
      <p style="margin:24px 0 8px">This certifies that</p><p style="font-size:20px;font-weight:700;color:#102050;margin:0">${p.name}</p>
      <p style="margin:16px 0 8px">has successfully completed</p><p style="font-size:16px;font-weight:600;margin:0">${course}</p>
      <p style="margin:28px 0 0;font-size:12px;color:#777">Miriam College \u2014 Learning & Development</p></div>`;
    MC.saveHtmlFile(('Certificate_'+course).replace(/[^\w]+/g,'_')+'.html','Certificate of Completion',body);
  };
  MC.empFileClaim = function(){
    modal({title:'File a benefit claim',body:`
      <div class="field"><label>Benefit program</label><select class="select" id="clBenefit"><option>HMO — Maxicare</option><option>Educational Benefit</option><option>Wellness Program</option></select></div>
      <div class="form-row"><div class="field"><label>Claim type</label><select class="select" id="clType"><option>Outpatient</option><option>Dental</option><option>Reimbursement</option><option>Dependent tuition</option></select></div><div class="field"><label>Amount</label><input class="input" id="clAmount" placeholder="₱0.00"></div></div>
      <div class="field"><label>Supporting document</label><div class="cl-row" style="padding:10px 13px"><div class="cl-check" style="background:var(--surface-2)">${icon('upload')}</div><div style="flex:1;font-size:12.5px" class="muted">Drop receipt / official document (encrypted)</div></div></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" id="clSubmit">${icon('send')} Submit claim</button>`});
    $('#clSubmit')?.addEventListener('click',MC.submitClaim);
  };
  MC.submitClaim = function(){
    const v=id=>((document.getElementById(id)||{}).value||'').trim();
    const seqs=DB.claims.map(c=>parseInt(String(c.id).replace(/\D/g,''),10)||0);
    const id='CLM-'+String(Math.max(0,...seqs)+1).padStart(4,'0');
    const p=MC.persona(); const amount=v('clAmount')||'₱0.00'; const today=new Date().toISOString().slice(0,10);
    DB.claims.unshift({ id, emp:p.name, benefit:v('clBenefit'), amount, type:v('clType'), status:'Pending', filed:today });
    closeModal(); toast('Claim filed','ok',`${id} · routed to Benefits`);
    if(window.MC&&MC.db&&MC.db.live()) MC.db.insert('claims',{ id, emp_name:p.name, benefit:v('clBenefit'), amount, claim_type:v('clType'), status:'Pending', filed:today }).catch(e=>toast('Sync failed','warn',String(e.message||e)));
  };

  MC.pages.emp_performance = function () {
    const r = DB.reviews.find(x=>x.emp==='MC-1035') || {score:4.3,rating:'Very Satisfactory',status:'In Review',goals:6,met:5};
    const comp=[['Job knowledge & technical skill',5],['Quality & reliability of work',4],['Service & collaboration',5],['Initiative & problem-solving',4],['Mission & values alignment',5]];
    return { title:'My Performance', crumb:'Employee Self-Service',
      html:`
      <div class="grid mb" style="grid-template-columns:1fr 1fr 1fr">
        <div class="bal-card"><div class="lab">Current cycle score</div><div class="big" style="color:var(--brand)">${r.score}<span class="unit"> / 5.0</span></div><div class="mt-sm">${badge(r.rating)}</div></div>
        <div class="bal-card"><div class="lab">Goals met</div><div class="big">${r.met}<span class="unit"> / ${r.goals}</span></div><div class="prog mt-sm"><i style="width:${r.met/r.goals*100}%;background:var(--brand-2)"></i></div></div>
        <div class="bal-card"><div class="lab">Status</div><div style="margin-top:10px">${badge(r.status)}</div><div class="muted" style="font-size:12px;margin-top:8px">Cycle: H2 2026</div></div>
      </div>
      <div class="grid mb" style="grid-template-columns:1.3fr 1fr">
        <div class="card"><div class="card-head"><h3>Competency assessment</h3></div><div class="card-pad">
          ${comp.map(([c,v])=>`<div class="cl-row" style="padding:11px 14px;margin-bottom:8px"><div style="flex:1;font-size:13px;font-weight:600">${c}</div><div class="row" style="gap:3px">${[1,2,3,4,5].map(n=>`<span style="color:${n<=v?'var(--brand)':'var(--line-2)'}">${icon('star')}</span>`).join('')}</div></div>`).join('')}
        </div></div>
        <div class="card"><div class="card-head"><h3>My goals & KPIs</h3></div><div class="card-pad">
          ${goal('Zero critical downtime (SLA 99.9%)',100)}${goal('Migrate 3 systems to cloud',66)}${goal('Complete AWS certification',40)}${goal('Mentor 2 junior staff',80)}
        </div></div>
      </div>
      <div class="card"><div class="card-head"><h3>My Individual Development Plan (IDP)</h3></div><div class="card-pad">
        <p style="font-size:13.5px;color:var(--ink-2);line-height:1.6;margin:0">Focus on cloud infrastructure certification (AWS Solutions Architect) and leadership readiness. Recommended: <b>Cloud Fundamentals</b> and <b>Leadership Track</b>. Target: complete certification by Q2 2027.</p>
        <div class="row mt-lg wrap" style="gap:8px"><button class="btn primary" onclick="MC.acknowledgeReview()">${icon('check')} Acknowledge evaluation</button><button class="btn" onclick="MC.go('emp_learning')">${icon('gradCap')} View recommended training</button></div>
      </div></div>`,
    };
  };
  function goal(t,p){ return `<div style="margin-bottom:14px"><div class="between" style="margin-bottom:6px"><span style="font-size:12.5px;font-weight:600">${t}</span><span class="muted" style="font-size:12px">${p}%</span></div><div class="prog"><i style="width:${p}%;background:${p===100?'var(--green)':'var(--brand-2)'}"></i></div></div>`; }

  MC.pages.emp_learning = function () {
    return { title:'Learning & Development', crumb:'Employee Self-Service',
      html:`
      <div class="mb">${aiRow(`<b>Recommended for you:</b> based on your IDP and competency gaps, AI suggests <b>AWS Cloud Fundamentals</b> and <b>Leadership Track</b>. Enroll anytime.`)}</div>
      <div class="grid g-3 mb">
        ${stat({icon:'gradCap',color:'violet',value:'14',label:'Trainings completed'})}
        ${stat({icon:'badgeCheck',color:'green',value:'6',label:'Certifications'})}
        ${stat({icon:'clock',color:'blue',value:'48 hrs',label:'Learning hours (YTD)'})}
      </div>
      <div class="grid g-2">
        <div class="card"><div class="card-head"><h3>Recommended learning paths</h3><span class="chip">${icon('sparkles')} AI-matched</span></div><div class="card-pad" style="padding-top:8px">
          ${course('AWS Cloud Fundamentals','4 modules · 12 hrs','Recommended','violet')}
          ${course('Leadership Track for IT','6 modules · 18 hrs','Recommended','violet')}
          ${course('Data Privacy Act Refresher','2 modules · 3 hrs','Required','amber')}
        </div></div>
        <div class="card"><div class="card-head"><h3>My completed trainings</h3></div><div class="card-pad" style="padding-top:8px">
          ${course('Outcomes-Based Education Workshop','CHED · Aug 2025','Completed','green')}
          ${course('Cybersecurity Essentials','Internal · May 2025','Completed','green')}
          ${course('ITIL Foundations','External · Jan 2025','Completed','green')}
        </div></div>
      </div>`,
    };
  };
  function course(t,m,status,tone){
    const action = status==='Completed'?`<button class="btn sm" onclick="MC.saveCertificate('${t}')">${icon('download')}</button>`:`<button class="btn sm primary" onclick="UI.toast('Enrolled','ok','${t}')">Enroll</button>`;
    return `<div class="cl-row" style="padding:11px 14px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('gradCap')}</div><div style="flex:1"><b style="font-size:13px">${t}</b><div class="muted" style="font-size:11.5px">${m}</div></div>${badge(status)}${action}</div>`;
  }

  /* ========================================================
     ==================  MANAGER PORTAL  ===================
     ======================================================== */
  const TEAM = () => MC.SUP_TEAM.map(id=>DB.empById(id)).filter(Boolean);

  MC.pages.sup_dashboard = function () {
    const team = TEAM();
    const pending = DB.applications.filter(a=>a.status==='Pending');
    const statusDonut=[{label:'Present',value:5,color:'var(--green)'},{label:'Late',value:1,color:'var(--amber)'},{label:'Leave/OB',value:0,color:'var(--blue)'}];
    return { title:'My Team', crumb:'Manager Portal',
      html:`
      <div class="hero teal">
        <div class="portal-tag" style="background:rgba(255,255,255,.14);color:#bfeef3">${icon('badgeCheck')} Manager Portal</div>
        <h2 style="margin-top:12px">Your team at a glance</h2>
        <p>Hi Jasmin — ${team.length} team members, ${pending.length} items need your approval, and this cycle's evaluations are open.</p>
        <div class="hero-stats">
          <div class="hero-stat"><b>${team.length}</b><span>Team members</span></div>
          <div class="hero-stat"><b>5 / 6</b><span>Present today</span></div>
          <div class="hero-stat"><b>${pending.length}</b><span>Pending approvals</span></div>
          <div class="hero-stat"><b>3</b><span>Evaluations open</span></div>
        </div>
        <div class="hero-actions">
          <button class="btn gold" onclick="MC.go('sup_approvals')">${icon('checkBig')} Review approvals</button>
          <button class="btn" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.2)" onclick="MC.go('sup_attendance')">${icon('clock')} Team attendance</button>
        </div>
      </div>

      <div class="grid mb" style="grid-template-columns:1fr 1.6fr">
        <div class="card"><div class="card-head"><h3>Attendance today</h3></div><div class="card-pad">${charts.donut(statusDonut,{center:'6',centerSub:'team'})}${charts.legend(statusDonut)}</div></div>
        <div class="card"><div class="card-head"><h3>Awaiting your approval</h3><span class="badge b-red"><span class="bd"></span>${pending.length}</span></div>
          <div style="padding:8px">${pending.map(a=>`<div class="cl-row" style="padding:13px 15px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('calendar')}</div>
            <div style="flex:1"><b style="font-size:13px">${a.type} — ${a.empName}</b><div class="muted" style="font-size:11.5px">${a.id} · ${fmt.dateShort(a.from)}${a.to!==a.from?' – '+fmt.dateShort(a.to):''} · ${a.reason}</div></div>
            <div class="row" style="gap:7px"><button class="btn sm primary" onclick="MC.decideApp('${a.id}','Approved');this.closest('.cl-row').remove()">${icon('check')} Approve</button><button class="btn sm danger" onclick="MC.decideApp('${a.id}','Rejected');this.closest('.cl-row').remove()">${icon('x')}</button></div></div>`).join('')}</div>
        </div>
      </div>

      <div class="card"><div class="card-head"><h3>My team</h3><button class="btn sm" onclick="MC.go('sup_team')">View roster ${icon('arrowRight')}</button></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Member</th><th>Department</th><th>Status</th><th>Today</th></tr></thead><tbody>
          ${team.map((e,i)=>`<tr><td class="cell-emp">${avatar(e)}<div><b>${e.name}</b><span>${e.position}</span></div></td><td class="muted">${e.dept}</td><td>${badge(e.status)}</td><td>${i===2?badge('Late'):badge('Present')}</td></tr>`).join('')}
        </tbody></table></div></div>`,
    };
  };

  MC.pages.sup_team = function () {
    const team = TEAM();
    return { title:'Team Roster', crumb:'Manager Portal',
      html:`
      <div class="page-head"><div><div class="t">Team Roster</div><div class="d">Your direct reports — view-only records. Sensitive fields are restricted.</div></div></div>
      <div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Member</th><th>ID</th><th>Department</th><th>Type</th><th>Status</th><th></th></tr></thead>
        <tbody>${team.map(e=>`<tr class="clickable" onclick="MC.supViewMember('${e.id}')"><td class="cell-emp">${avatar(e)}<div><b>${e.name}</b><span>${e.position}</span></div></td><td class="muted">${e.id}</td><td class="muted">${e.dept}</td><td>${badge(e.type)}</td><td>${badge(e.status)}</td><td><button class="btn sm" onclick="event.stopPropagation();MC.supViewMember('${e.id}')">${icon('eye')}</button></td></tr>`).join('')}</tbody></table></div></div>`,
    };
  };
  MC.supViewMember = function(id){
    const e = DB.empById(id);
    drawer({title:'Team member',body:`<div style="padding:20px">
      <div class="row" style="gap:14px">${avatar(e,'lg')}<div><h3 style="font-size:18px">${e.name}</h3><div class="muted">${e.position}</div><div class="row mt-sm" style="gap:7px">${badge(e.status)}${badge(e.type)}</div></div></div>
      <div class="card card-pad mt-lg">${kv('Department',e.dept)}${kv('Campus',e.campus)}${kv('Date hired',fmt.date(e.hired))}${kv('Tenure',fmt.yrs(e.hired))}${kv('Email',e.email)}</div>
      <div class="alertbar info mt-lg">${icon('lock')} As a manager you see work-related fields only. Compensation and sensitive records are restricted to HR.</div>
      <div class="row mt-lg wrap" style="gap:8px"><button class="btn primary" style="flex:1" onclick="MC.closeDrawerGo('sup_performance')">${icon('award')} Evaluate</button><button class="btn" onclick="MC.closeDrawerGo('sup_attendance')">${icon('clock')} Attendance</button></div>
    </div>`});
  };
  MC.closeDrawerGo = function(r){ UI.closeDrawer(); MC.go(r); };

  MC.pages.sup_attendance = function () {
    const team = TEAM();
    return { title:'Team Attendance', crumb:'Manager Portal',
      html:`
      <div class="grid g-4 mb">
        ${stat({icon:'userCheck',color:'green',value:'5',label:'Present today'})}
        ${stat({icon:'clock',color:'amber',value:'1',label:'Late'})}
        ${stat({icon:'calendar',color:'blue',value:'0',label:'On leave'})}
        ${stat({icon:'activity',color:'navy',value:'97.1%',label:'Team attendance rate'})}
      </div>
      <div class="card mb"><div class="card-head"><div><h3>Today's team log</h3><div class="sub">${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric'})}</div></div><span class="chip" style="color:var(--ink-2)">${icon('activity')} Live</span></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Member</th><th>Time In</th><th>Method</th><th>Status</th></tr></thead><tbody>
          ${team.map((e,i)=>`<tr><td class="cell-emp">${avatar(e)}<div><b>${e.name}</b><span>${e.dept}</span></div></td><td><b>${['07:45','07:58','08:14','07:52','07:49','08:03'][i]}</b></td><td class="muted"><span class="chip">${['Facial Biometric','Web Portal','M10 Fingerprint','Mobile (GPS)','M10 Fingerprint','Facial Biometric'][i]}</span></td><td>${i===2?badge('Late'):badge('Present')}</td></tr>`).join('')}
        </tbody></table></div></div>
      <div class="card"><div class="card-head"><h3>Team filings this period</h3></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Ref</th><th>Member</th><th>Type</th><th>Dates</th><th>Status</th><th></th></tr></thead><tbody>
          ${DB.applications.slice(0,5).map(a=>`<tr><td class="muted">${a.id}</td><td><b style="font-size:12.8px">${a.empName}</b></td><td>${badge(a.type,'blue')}</td><td class="muted">${fmt.dateShort(a.from)}</td><td>${badge(a.status)}</td><td>${a.status==='Pending'?`<button class="btn sm primary" onclick="MC.decideApp('${a.id}','Approved')">Approve</button>`:badge(a.status)}</td></tr>`).join('')}
        </tbody></table></div></div>`,
    };
  };

  MC.pages.sup_approvals = function () {
    const pending = DB.applications.filter(a=>a.status==='Pending');
    const items=[
      ...pending.map(a=>({t:`${a.type} — ${a.empName}`,ref:a.id,sub:a.reason,kind:'Timekeeping',ic:'calendar',approve:`MC.decideApp('${a.id}','Approved')`,reject:`MC.decideApp('${a.id}','Rejected')`})),
      {t:'Evaluation sign-off — Roberto Dizon',ref:'EVAL-1035',sub:'H2 2026 cycle · score 4.3',kind:'Performance',ic:'award'},
    ];
    return { title:'Approvals', crumb:'Manager Portal',
      html:`
      <div class="page-head"><div><div class="t">Approvals inbox</div><div class="d">Items from your team awaiting your decision.</div></div></div>
      <div class="card"><div class="card-head"><h3>Pending your approval</h3><span class="badge b-red"><span class="bd"></span>${items.length} items</span></div>
      <div style="padding:8px">${items.map(it=>`<div class="cl-row" style="padding:14px 16px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon(it.ic)}</div>
        <div style="flex:1"><b style="font-size:13.5px">${it.t}</b><div class="muted" style="font-size:11.5px">${it.kind} · ${it.ref} · ${it.sub}</div></div>
        <div class="row" style="gap:7px">${it.approve?`<button class="btn sm primary" onclick="${it.approve};this.closest('.cl-row').remove()">${icon('check')} Approve</button><button class="btn sm danger" onclick="${it.reject};this.closest('.cl-row').remove()">${icon('x')}</button>`:`<button class="btn sm primary" onclick="UI.toast('Signed off','ok','${it.ref}');this.closest('.cl-row').remove()">${icon('check')} Sign off</button>`}</div></div>`).join('')}</div></div>`,
    };
  };

  MC.pages.sup_performance = function () {
    const team = TEAM();
    const map = Object.fromEntries(DB.reviews.map(r=>[r.emp,r]));
    return { title:'Team Evaluations', crumb:'Manager Portal',
      html:`
      <div class="mb">${aiRow(`<b>AI assist:</b> competency ratings can be pre-filled from each member's goal progress for your review — you confirm or adjust before submitting.`)}</div>
      <div class="grid g-3 mb">
        ${stat({icon:'award',color:'violet',value:'3',label:'Evaluations open'})}
        ${stat({icon:'checkBig',color:'green',value:'2',label:'Completed'})}
        ${stat({icon:'target',color:'blue',value:'4.3',label:'Team avg. rating'})}
      </div>
      <div class="card"><div class="card-head"><h3>Team evaluation status — H2 2026</h3></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Member</th><th>Cycle</th><th>Score</th><th>Status</th><th></th></tr></thead><tbody>
          ${team.map(e=>{const r=map[e.id];return `<tr><td class="cell-emp">${avatar(e)}<div><b>${e.name}</b><span>${e.position}</span></div></td><td class="muted">${r?r.cycle:'H2 2026'}</td><td>${r?`<b>${r.score}</b>`:'—'}</td><td>${r?badge(r.status):badge('Not started','gray')}</td><td><button class="btn sm primary" onclick="MC.openReview('${e.id}')">${r&&r.status==='Completed'?'View':'Evaluate'}</button></td></tr>`;}).join('')}
        </tbody></table></div></div>`,
    };
  };

  MC.pages.sup_hiring = function () {
    const myReqs = DB.jobs.filter(j=>j.requester && j.requester.includes('Velasco'));
    const cands = DB.applicants.filter(a=>a.role.includes('IT Support'));
    return { title:'My Requisitions', crumb:'Manager Portal',
      html:`
      <div class="page-head"><div><div class="t">Hiring — My Requisitions</div><div class="d">Positions you requested and candidates assigned for your interview.</div></div>
        <button class="btn primary" onclick="MC.newRequisition()">${icon('plus')} New requisition</button></div>
      <div class="card mb"><div class="card-head"><h3>My requisitions</h3></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Requisition</th><th>Campus</th><th>Applicants</th><th>Stage</th><th>Status</th></tr></thead><tbody>
          ${myReqs.length?myReqs.map(j=>`<tr><td><b>${j.title}</b><div class="muted" style="font-size:11.5px">${j.id}</div></td><td>${j.campus}</td><td><b>${j.applicants}</b></td><td>${badge(j.stage)}</td><td>${badge(j.status)}</td></tr>`).join(''):`<tr><td colspan="5" class="muted" style="text-align:center;padding:20px">No active requisitions.</td></tr>`}
        </tbody></table></div></div>
      <div class="card"><div class="card-head"><div><h3>Candidates to interview</h3><div class="sub">Shortlisted for IT Support Specialist</div></div></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Candidate</th><th>Experience</th><th>Stage</th><th></th></tr></thead><tbody>
          ${cands.map(a=>`<tr><td class="cell-emp">${avatar(a)}<div><b>${a.name}</b><span>${a.edu}</span></div></td><td class="muted">${a.exp}</td><td>${badge(a.stage)}</td><td><div class="row" style="gap:6px"><button class="btn sm" onclick="MC.scheduleInterview('${a.id}')">${icon('calendar')} Schedule</button><button class="btn sm primary" onclick="UI.toast('Feedback saved','ok','Interview assessment recorded')">${icon('check')} Assess</button></div></td></tr>`).join('')}
        </tbody></table></div></div>`,
    };
  };

  /* ========================================================
     ==================  CAREERS PORTAL  ===================
     ======================================================== */
  MC.APPLIED = ['REQ-2026-015']; // Diane applied to IT Support Specialist

  MC.pages.app_jobs = function () {
    const open = DB.jobs.filter(j=>j.status==='Open');
    return { title:'Open Positions', crumb:'Careers Portal',
      html:`
      <div class="hero gold">
        <div class="portal-tag" style="background:rgba(255,255,255,.14);color:#e8d59a">${icon('briefcase')} Careers at Miriam College</div>
        <h2 style="margin-top:12px">Build your career with purpose.</h2>
        <p>Join a Catholic educational community guided by <b style="color:#fff">Veritas</b> since 1926, across our Quezon City, Nuvali, and Alviera campuses. Explore ${open.length} open positions below.</p>
        <div class="hero-actions"><button class="btn gold" onclick="MC.go('app_applications')">${icon('fileText')} Track my applications</button></div>
      </div>
      <div class="jobs-grid">
        ${open.map(j=>{const applied=MC.APPLIED.includes(j.id);return `<div class="jobcard">
          <div class="between"><h3>${j.title}</h3>${applied?badge('Applied','blue'):badge('Open','green')}</div>
          <div class="tags"><span class="chip">${icon('building')} ${j.dept}</span><span class="chip">${icon('mapPin')} ${j.campus}</span><span class="chip">${icon('briefcase')} ${j.type}</span></div>
          <div class="job-meta"><span>${icon('calendar')} Posted ${fmt.dateShort(j.posted)}</span><span>${icon('users')} ${j.applicants} applicants</span></div>
          <div class="row mt-lg" style="gap:8px">${applied?`<button class="btn" style="flex:1" onclick="MC.go('app_applications')">${icon('eye')} View application</button>`:`<button class="btn primary" style="flex:1" onclick="MC.applyJob('${j.id}')">${icon('send')} Apply now</button>`}<button class="btn" onclick="MC.jobDetail('${j.id}')">Details</button></div>
        </div>`;}).join('')}
      </div>`,
    };
  };
  MC.jobDetail = function(id){
    const j = DB.jobs.find(x=>x.id===id); const applied=MC.APPLIED.includes(id);
    modal({title:j.title,sub:`${j.dept} · ${j.campus}`,size:'lg',body:`
      <div class="tags" style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px"><span class="chip">${icon('briefcase')} ${j.type}</span><span class="chip">${icon('mapPin')} ${j.campus}</span><span class="chip">${icon('calendar')} Posted ${fmt.date(j.posted)}</span></div>
      <h4 style="font-size:14px;margin-bottom:8px">About the role</h4>
      <p style="font-size:13.5px;color:var(--ink-2);line-height:1.6">Miriam College seeks a qualified professional to join our ${j.dept}, guided by our Veritas mission. You will contribute to the College's commitment to excellent, values-based education across our campuses.</p>
      <h4 style="font-size:14px;margin:18px 0 8px">Qualifications</h4>
      <ul style="font-size:13.5px;color:var(--ink-2);line-height:1.7;margin:0;padding-left:18px"><li>Relevant degree and professional experience</li><li>Valid PRC license where applicable</li><li>Strong communication & collaboration skills</li><li>Commitment to Catholic, values-based education</li></ul>`,
      foot:`<button class="btn" data-close>Close</button>${applied?`<button class="btn primary" onclick="UI.closeModal();MC.go('app_applications')">View my application</button>`:`<button class="btn primary" onclick="UI.closeModal();MC.applyJob('${id}')">${icon('send')} Apply now</button>`}`});
  };
  MC.applyJob = function(id){
    const j = DB.jobs.find(x=>x.id===id);
    modal({title:'Apply for this position',sub:j.title,body:`
      <div class="form-row"><div class="field"><label>Full name</label><input class="input" id="ajName" value="Diane Rose F. Castro"></div><div class="field"><label>Email</label><input class="input" id="ajEmail" value="diane.castro@email.com"></div></div>
      <div class="field"><label>Mobile number</label><input class="input" value="0917 000 5543"></div>
      <div class="field"><label>Résumé / CV</label><div class="cl-row" style="padding:11px 14px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('fileText')}</div><div style="flex:1;font-size:12.5px"><b>Diane_Castro_Resume.pdf</b><div class="muted" style="font-size:11px">On file · from your profile</div></div><span class="ai-flag">${icon('sparkles')} AI will screen</span></div></div>
      <div class="field"><label>Cover message (optional)</label><textarea class="input" placeholder="Tell us why you're a great fit…"></textarea></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="MC.submitApplyJob('${id}')">${icon('send')} Submit application</button>`});
  };
  MC.submitApplyJob = function(id){
    const v=i=>((document.getElementById(i)||{}).value||'').trim();
    const j=DB.jobs.find(x=>x.id===id); if(!j)return;
    const name=v('ajName')||'Applicant'; const email=v('ajEmail');
    const seqs=DB.applicants.map(a=>parseInt(String(a.id).split('-').pop(),10)||0);
    const aid='A-'+String(Math.max(0,...seqs)+1); const today=new Date().toISOString().slice(0,10);
    DB.applicants.unshift({ id:aid, name, role:j.title, stage:'Applied', match:null, exp:'—', edu:'—', applied:today, source:'MC Careers Site', email, aiNotes:null, color:DB.colorFor(name), initials:DB.initials(name) });
    j.applicants=(j.applicants||0)+1; MC.APPLIED.push(id);
    closeModal(); toast('Application submitted','ok','We will email you about next steps'); MC.go('app_applications');
    if(window.MC&&MC.db&&MC.db.live()){
      MC.db.insert('applicants',{ id:aid, name, role:j.title, stage:'Applied', match:null, exp:'—', edu:'—', applied:today, source:'MC Careers Site', email, ai_notes:null }).catch(e=>toast('Sync failed','warn',String(e.message||e)));
      MC.db.update('jobs','id',id,{applicants:j.applicants}).catch(()=>{});
    }
  };

  MC.pages.app_applications = function () {
    const stages=['Applied','Screening','Interview','Assessment','Offer'];
    const current=4; // Offer
    return { title:'My Applications', crumb:'Careers Portal',
      html:`
      <div class="page-head"><div><div class="t">My Applications</div><div class="d">Track the status of every position you applied for.</div></div></div>

      <div class="card mb"><div class="card-head"><div><h3>IT Support Specialist</h3><div class="sub">REQ-2026-015 · ICT Office · Quezon City · applied Sep 23</div></div>${badge('Offer','violet')}</div>
        <div class="card-pad">
          <div class="track">${stages.map((s,i)=>`<div class="step ${i<current?'done':i===current?'active':''}"><div class="dot">${icon(i<current?'check':i===current?'badgeCheck':'clock')}</div><small>${s}</small></div>`).join('')}</div>
          <div class="alertbar info mt-lg">${icon('badgeCheck')}<div style="flex:1"><b>Congratulations!</b> You've reached the offer stage. Review your job offer in the Offers tab.</div><button class="btn sm primary" onclick="MC.go('app_offers')">View offer</button></div>
        </div></div>

      <div class="card"><div class="card-head"><h3>Application history</h3></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Position</th><th>Campus</th><th>Applied</th><th>Status</th></tr></thead><tbody>
          <tr><td><b>IT Support Specialist</b><div class="muted" style="font-size:11.5px">REQ-2026-015</div></td><td>Quezon City</td><td class="muted">Sep 23, 2026</td><td>${badge('Offer','violet')}</td></tr>
          ${MC.APPLIED.filter(x=>x!=='REQ-2026-015').map(id=>{const j=DB.jobs.find(x=>x.id===id);return j?`<tr><td><b>${j.title}</b><div class="muted" style="font-size:11.5px">${j.id}</div></td><td>${j.campus}</td><td class="muted">Today</td><td>${badge('Submitted','blue')}</td></tr>`:'';}).join('')}
        </tbody></table></div></div>`,
    };
  };

  MC.pages.app_offers = function () {
    return { title:'Offers', crumb:'Careers Portal',
      html:`
      <div class="page-head"><div><div class="t">Your Offer</div><div class="d">Review and respond to your job offer from Miriam College.</div></div></div>
      <div class="offer-card">
        <div class="between" style="align-items:flex-start"><div class="row" style="gap:13px">${MC.seal}<div><div class="portal-tag" style="background:var(--surface-2);color:var(--brand)">${icon('badgeCheck')} Job Offer</div><h2 style="font-size:22px;margin-top:8px">IT Support Specialist</h2><div class="muted">Information & Communications Technology Office · Quezon City</div></div></div></div>
        <div class="grid g-2 mt-lg">
          <div>${kv('Employment type','Probationary (6 months)')}${kv('Monthly rate','₱45,000')}${kv('Start date','November 3, 2026')}</div>
          <div>${kv('Work schedule','Mon–Fri · 8:00–17:00')}${kv('Benefits','HMO, SSS, PhilHealth, Pag-IBIG, Life')}${kv('Reporting to','Ma. Jasmin B. Velasco')}</div>
        </div>
        <div class="alertbar info mt-lg">${icon('info')} Accepting begins onboarding — your records transfer to your 201 File automatically, with no re-encoding.</div>
        <div class="row mt-lg wrap" style="gap:10px">
          <button class="btn primary" style="flex:1;justify-content:center;padding:12px" onclick="MC.acceptOffer()">${icon('check')} Accept offer</button>
          <button class="btn" onclick="UI.toast('Message sent','info','HR will get back to you')">${icon('message')} Ask a question</button>
          <button class="btn danger" onclick="UI.toast('Noted','warn','Offer declined')">Decline</button>
        </div>
      </div>`,
    };
  };
  MC.acceptOffer = function(){
    modal({title:'Accept job offer',sub:'IT Support Specialist',body:`
      <div style="text-align:center;padding:10px 0">
        <div class="ic" style="width:64px;height:64px;border-radius:18px;background:var(--surface-2);color:var(--brand);display:grid;place-items:center;margin:0 auto 16px">${icon('checkBig')}</div>
        <h3 style="font-size:18px">Welcome to Miriam College!</h3>
        <p class="muted" style="font-size:13.5px;max-width:40ch;margin:10px auto 0">By accepting, you confirm your start date of <b>November 3, 2026</b>. HR will send onboarding steps to your email. Your candidate data will transfer into your employee 201 File automatically.</p>
      </div>`,
      foot:`<button class="btn" data-close>Not yet</button><button class="btn primary" onclick="MC.doAcceptOffer()">${icon('check')} Confirm acceptance</button>`});
  };
  MC.doAcceptOffer = function(){
    const a=DB.applicants.find(x=>x.id==='A-5543'); if(a)a.stage='Hired';
    if(MC.startOnboarding)MC.startOnboarding();
    closeModal(); toast('Offer accepted','ok','Onboarding started — data transferred automatically');
    if(window.MC&&MC.db&&MC.db.live()) MC.db.update('applicants','id','A-5543',{stage:'Hired'}).catch(e=>toast('Sync failed','warn',String(e.message||e)));
  };

  MC.pages.app_profile = function () {
    return { title:'My Profile', crumb:'Careers Portal',
      html:`
      <div class="card card-pad mb"><div class="row" style="gap:18px"><div class="ava-lg" style="background:var(--navy-700)">DC</div>
        <div style="flex:1"><h2 style="font-size:20px">Diane Rose F. Castro</h2><div class="muted">Applicant · IT Support Specialist</div>
          <div class="row mt-sm wrap" style="gap:7px"><span class="chip">${icon('mail')} diane.castro@email.com</span><span class="chip">${icon('phone')} 0917 000 5543</span></div></div>
        <button class="btn" onclick="UI.toast('Edit profile','info','Update your candidate profile')">${icon('edit')} Edit</button></div>
      <div class="grid g-2 mb">
        <div class="card"><div class="card-head"><h3>Experience</h3></div><div class="card-pad">
          ${expRow('IT Support Lead','TechCorp Solutions','2021 – present · 5 yrs')}
          ${expRow('Helpdesk Associate','DataServe Inc.','2019 – 2021 · 2 yrs')}
        </div></div>
        <div class="card"><div class="card-head"><h3>Education & credentials</h3></div><div class="card-pad">
          ${expRow('BS Information Technology','Mapúa University','2019')}
          ${expRow('CompTIA A+ Certification','CompTIA','2020')}
          ${expRow('ITIL Foundations','Axelos','2022')}
        </div></div>
      </div>
      <div class="card"><div class="card-head"><h3>My documents</h3><button class="btn sm" onclick="UI.toast('Upload','info','Add a document')">${icon('upload')} Upload</button></div>
        <div class="card-pad" style="padding-top:8px">
          ${docRow2('Diane_Castro_Resume.pdf','Uploaded Sep 23')}
          ${docRow2('Transcript_of_Records.pdf','Uploaded Sep 23')}
          ${docRow2('CompTIA_Certificate.pdf','Uploaded Sep 23')}
        </div></div>`,
    };
  };
  function expRow(t,s,m){ return `<div style="padding:10px 0;border-bottom:1px solid var(--line-2)"><b style="font-size:13px">${t}</b><div class="muted" style="font-size:12px">${s}</div><div class="muted" style="font-size:11.5px;margin-top:2px">${m}</div></div>`; }
  function docRow2(name,meta){ return `<div class="cl-row" style="padding:11px 14px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('fileText')}</div><div style="flex:1"><b style="font-size:13px">${name}</b><div class="muted" style="font-size:11.5px">${meta}</div></div><button class="btn sm" onclick="UI.toast('Download','ok','${name}')">${icon('download')}</button></div>`; }

})();
