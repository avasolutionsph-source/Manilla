/* ============================================================
   Miriam College HRIS — Module screens
   ============================================================ */
(function () {
  const { icon, fmt, avatar, toast, modal, closeModal, drawer, closeDrawer, charts, download, popover, closePopover } = UI;
  const badge = MC.badge, stat = MC.stat, empCell = MC.empCell;
  const campusFilter = (e) => MC.state.campus === 'All Campuses' || e.campus === MC.state.campus;

  const aiBanner = (text) => `<div class="alertbar ai">${icon('sparkles')}<div style="flex:1">${text}</div><span class="ai-flag">${icon('shield')} Human-approved</span></div>`;

  /* ========================================================
     DASHBOARD
     ======================================================== */
  MC.pages.dashboard = function () {
    const emps = DB.employees.filter(campusFilter);
    const active = emps.filter(e => e.status === 'Active').length;
    const campusCounts = DB.campuses.map((c, i) => ({ label: c, value: [258,101,53][i], color: ['var(--brand)','var(--teal)','var(--gold)'][i] }));
    const typeDonut = [
      { label:'Faculty', value:176, color:'var(--violet)' },
      { label:'Staff', value:158, color:'var(--brand-2)' },
      { label:'Admin', value:62, color:'var(--teal)' },
      { label:'Contractual', value:16, color:'var(--gold)' },
    ];
    const funnel = [
      { label:'Applied', value:89, color:'#c7d2ef' },
      { label:'Screened', value:52, color:'#8fa9e0' },
      { label:'Interview', value:24, color:'var(--brand-2)' },
      { label:'Offer', value:6, color:'var(--navy-700)' },
      { label:'Hired', value:3, color:'var(--green)' },
    ];
    return {
      title: 'Dashboard', crumb: 'Overview · '+MC.state.campus,
      html: `
      <div class="page-head"><div><div class="t">Good day, ${roleFirst()} 👋</div><div class="d">Here's what's happening across Miriam College HR today — ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}.</div></div>
        <div class="row wrap"><button class="btn" id="dExport">${icon('download')} Export</button><button class="btn primary" id="dQuick">${icon('plus')} Quick action</button></div></div>

      <div class="grid g-4 mb">
        ${stat({icon:'users',color:'navy',value:fmt.num(active),label:'Active employees',trend:'+2.4%',trendDir:'up',onclick:"MC.go('employees')"})}
        ${stat({icon:'userPlus',color:'violet',value:'6',label:'Open positions',trend:'+3',trendDir:'up',onclick:"MC.go('recruitment')"})}
        ${stat({icon:'clock',color:'green',value:'94.3%',label:'Attendance today',trend:'+1.1%',trendDir:'up',onclick:"MC.go('timekeeping')"})}
        ${stat({icon:'checkBig',color:'amber',value:'4',label:'Pending approvals',onclick:"MC.go('approvals')"})}
      </div>

      <div class="grid mb" style="grid-template-columns:1.4fr 1fr">
        <div class="card">
          <div class="card-head"><div><h3>Headcount trend</h3><div class="sub">Last 8 months · all campuses</div></div>
            <div class="seg"><button class="active">Headcount</button><button>Hires</button></div></div>
          <div class="card-pad">${charts.line([392,396,399,401,404,407,409,412],{labels:['Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],color:'var(--brand-2)'})}</div>
        </div>
        <div class="card">
          <div class="card-head"><h3>Workforce mix</h3></div>
          <div class="card-pad">
            ${charts.donut(typeDonut,{center:'412',centerSub:'employees'})}
            ${charts.legend(typeDonut)}
          </div>
        </div>
      </div>

      <div class="mb">${aiBanner(`<b>AI insight:</b> 3 contracts end within 90 days and 2 faculty are promotion-eligible this cycle. Attrition risk is concentrated in contractual faculty. <button class="btn sm" style="padding:3px 10px;margin-left:4px" onclick="MC.contractsEndingSoon()">${icon('eye')} Contracts</button> <button class="btn sm" style="padding:3px 10px" onclick="MC.perfTab='ranking';MC.go('performance')">${icon('award')} Ranking</button>`)}</div>

      <div class="grid mb" style="grid-template-columns:1fr 1fr">
        <div class="card">
          <div class="card-head"><div><h3>Recruitment funnel</h3><div class="sub">Active requisitions</div></div><button class="btn sm" onclick="MC.go('recruitment')">Open ATS ${icon('arrowRight')}</button></div>
          <div class="card-pad">${charts.bars(funnel,{fmt:(v)=>v+' candidates'})}</div>
        </div>
        <div class="card">
          <div class="card-head"><h3>Headcount by campus</h3></div>
          <div class="card-pad">
            ${campusCounts.map(c=>`<div class="mb" style="margin-bottom:14px"><div class="between" style="margin-bottom:6px"><span style="font-size:13px;font-weight:600">${c.label}</span><span class="muted" style="font-size:12.5px">${c.value}</span></div><div class="prog"><i style="width:${c.value/258*100}%;background:${c.color}"></i></div></div>`).join('')}
          </div>
        </div>
      </div>

      <div class="grid" style="grid-template-columns:1.5fr 1fr">
        <div class="card">
          <div class="card-head"><h3>Recent activity</h3><span class="chip">${icon('shield')} Audit trail</span></div>
          <div class="table-wrap"><table class="tbl"><thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Target</th></tr></thead>
          <tbody>${DB.auditTrail.map(a=>`<tr><td class="muted" style="font-size:12px">${a.ts}</td><td><b>${a.actor}</b></td><td>${a.action}</td><td class="muted">${a.target}</td></tr>`).join('')}</tbody></table></div>
        </div>
        <div class="card">
          <div class="card-head"><div><h3>Contract alerts</h3><div class="sub">End-of-contract triggers</div></div></div>
          <div class="card-pad">
            ${DB.employees.filter(e=>e.contractEnds).map(e=>`<div class="cl-row clickable" style="padding:12px 14px;cursor:pointer" onclick="MC.openEmployee('${e.id}')">
              ${avatar(e)}<div style="flex:1"><b style="font-size:13px">${e.name}</b><div class="muted" style="font-size:11.5px">${e.type} · ${e.campus}</div></div>
              <div style="text-align:right"><div style="font-size:12px;font-weight:700;color:var(--amber)">${fmt.date(e.contractEnds)}</div><div class="muted" style="font-size:11px">${daysTo(e.contractEnds)} days</div></div></div>`).join('')}
            <button class="btn block mt-sm" onclick="MC.go('employees')">Review all contracts</button>
          </div>
        </div>
      </div>`,
      onMount(root){
        $('#dExport',root).addEventListener('click',()=>MC.exportCSV('dashboard'));
        $('#dQuick',root).addEventListener('click',(e)=>MC.quickActions(e.currentTarget));
      }
    };
  };

  MC.quickActions = function(anchor){
    const html = `<div style="width:250px"><div class="menu-head"><b>Quick actions</b></div>
      <div class="menu-item" data-a="emp">${icon('userPlus')} Add employee</div>
      <div class="menu-item" data-a="job">${icon('briefcase')} Post a job</div>
      <div class="menu-item" data-a="leave">${icon('calendar')} File application</div>
      <div class="menu-item" data-a="pay">${icon('wallet')} Run payroll</div>
      <div class="menu-item" data-a="report">${icon('chart')} Generate report</div></div>`;
    const m = popover(anchor, html);
    m.addEventListener('click',e=>{ const a=e.target.closest('[data-a]'); if(!a)return; closePopover();
      ({emp:()=>{MC.go('employees');setTimeout(MC.newEmployee,100);}, job:()=>{MC.go('recruitment');setTimeout(MC.newJob,100);},
        leave:()=>{MC.go('timekeeping');setTimeout(MC.fileApplication,100);}, pay:()=>{MC.go('payroll');setTimeout(MC.runPayroll,100);},
        report:()=>MC.go('reports')})[a.dataset.a]?.();
    });
  };

  /* ========================================================
     RECRUITMENT & ATS
     ======================================================== */
  const STAGES = ['Applied','Screening','Interview','Assessment','Offer'];
  MC.recruitTab = 'pipeline';
  MC.pages.recruitment = function () {
    return {
      title:'Recruitment & ATS', crumb:'Talent Acquisition',
      html:`
      <div class="page-head"><div><div class="t">Recruitment & Applicant Tracking</div><div class="d">Requisition to onboarding — with AI-assisted screening and ranking.</div></div>
        <div class="row wrap"><button class="btn" id="rReq">${icon('fileText')} New requisition</button><button class="btn primary" id="rJob">${icon('plus')} Post a job</button></div></div>
      <div class="tabs" id="rTabs">
        ${[['pipeline','Candidate Pipeline'],['jobs','Job Requisitions'],['talent','Talent Pool'],['analytics','Analytics']].map(([k,l])=>`<div class="tab ${k===MC.recruitTab?'active':''}" data-t="${k}">${l}</div>`).join('')}
      </div>
      <div id="rBody"></div>`,
      onMount(root){
        const render = () => { $('#rBody',root).innerHTML = recruitBody(); wireRecruit(root); };
        $('#rTabs',root).addEventListener('click',e=>{const t=e.target.closest('[data-t]'); if(!t)return; MC.recruitTab=t.dataset.t; $$('.tab',root).forEach(x=>x.classList.toggle('active',x===t)); render();});
        $('#rReq',root).addEventListener('click',MC.newRequisition);
        $('#rJob',root).addEventListener('click',MC.newJob);
        render();
      }
    };
  };
  function recruitBody(){
    if (MC.recruitTab==='pipeline') return pipelineHTML();
    if (MC.recruitTab==='jobs') return jobsHTML();
    if (MC.recruitTab==='talent') return talentHTML();
    return recruitAnalyticsHTML();
  }
  function pipelineHTML(){
    return `<div class="mb">${aiBanner(`<b>AI screening active.</b> 89 resumes parsed and ranked by competency match this period. Top candidate per role is highlighted. Rankings assist — the hiring committee decides.`)}</div>
    <div class="kanban" id="kanban">
      ${STAGES.map(s=>{ const list = DB.applicants.filter(a=>a.stage===s);
        return `<div class="kcol" data-stage="${s}"><div class="kcol-head"><span>${s}</span><span class="cnt">${list.length}</span></div>
        <div class="kcol-body" data-stage="${s}">${list.map(a=>applicantCard(a)).join('')||`<div style="text-align:center;color:var(--ink-3);font-size:12px;padding:16px 0">Drop here</div>`}</div></div>`;
      }).join('')}
    </div>`;
  }
  function cbColor(s){ return s>=85?'var(--green)':s>=70?'var(--brand-2)':s>=55?'var(--amber)':'var(--ink-3)'; }
  function roleCriteria(role){
    if(/Professor|Instructor|Teacher|Faculty|Dean|Lecturer/i.test(role||'')) return [
      {k:'Educational attainment',w:22},{k:'Teaching experience',w:20},{k:'Research & publications',w:16},
      {k:'Licensure (PRC / LET)',w:14},{k:'Subject-matter expertise',w:16},{k:'Communication & values fit',w:12}];
    return [
      {k:'Educational attainment',w:20},{k:'Relevant work experience',w:22},{k:'Certifications',w:16},
      {k:'Core technical skills',w:20},{k:'Tools & systems',w:12},{k:'Communication & values fit',w:10}];
  }
  function cbreak(a){
    const crit=roleCriteria(a.role), M=a.match;
    const seed=[...a.id].reduce((s,c)=>s+c.charCodeAt(0),0);
    const scores=[]; let wpts=0, i;
    for(i=0;i<crit.length-1;i++){ const off=((seed>>(i*2))%11)-5; const s=Math.max(55,Math.min(100,M+off)); scores.push(s); wpts+=s*crit[i].w/100; }
    const lw=crit[crit.length-1].w; let ls=Math.round((M-wpts)*100/lw); ls=Math.max(55,Math.min(100,ls)); scores.push(ls);
    let total=0; for(i=0;i<crit.length;i++) total+=scores[i]*crit[i].w/100;
    return { crit, scores, total:Math.round(total) };
  }
  function aiAnalysisHTML(a){
    const b=cbreak(a);
    const rec = a.match>=90?['Fast-track','green']:a.match>=80?['Recommend interview','blue']:a.match>=68?['Shortlist','amber']:['Talent pool','gray'];
    return `<div class="ai-analysis">
      <div class="between"><span class="hd">${icon('sparkles')} AI Screening Analysis</span>${badge(rec[0],rec[1])}</div>
      <div class="between mt" style="align-items:baseline"><span class="muted" style="font-size:12px">Overall competency match</span><b style="font-size:22px;color:${cbColor(a.match)}">${a.match}%</b></div>
      <div class="prog" style="margin-top:6px;height:7px"><i style="width:${a.match}%;background:${cbColor(a.match)}"></i></div>
      <div class="muted" style="font-size:11.5px;margin-top:12px">How this score was computed — weighted average of ${b.crit.length} factors:</div>
      <div class="mt-sm">${b.crit.map((c,i)=>{const s=b.scores[i];return `<div class="cb-row">
        <div class="cb-top"><span class="cl">${c.k}</span><span class="cw">weight ${c.w}%</span><span class="cs" style="color:${cbColor(s)}">${s}%</span></div>
        <div class="cb-bar"><i style="width:${s}%;background:${cbColor(s)}"></i></div></div>`;}).join('')}</div>
      <div class="card card-pad mt" style="background:var(--surface-2);box-shadow:none;border-color:var(--line-2)">
        <div class="muted" style="font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:700">Analyst summary</div>
        <p style="font-size:12.5px;color:var(--ink-2);margin:6px 0 0;line-height:1.5">${a.aiNotes}</p></div>
      <div class="hint mt" style="display:flex;align-items:center;gap:6px">${icon('shield')} Advisory score — final shortlisting requires authorized human review.</div>
    </div>`;
  }
  MC.aiAnalysisHTML = aiAnalysisHTML;

  function rankParts(f){
    const q = /PhD/i.test(f.qualif) && !/cand/i.test(f.qualif) ? 30 : /PhD.*cand/i.test(f.qualif) ? 23 : /MA.*cand|MS.*cand/i.test(f.qualif) ? 13 : /MA|MS|Master/i.test(f.qualif) ? 19 : 15;
    const t = Math.round((f.teaching/5)*25);
    const s = f.service==='High'?20 : f.service==='Medium'?13 : 7;
    let r = f.points - q - t - s; r = Math.max(0, Math.min(25, r));
    return [
      {k:'Academic qualifications', v:q, max:30, note:f.qualif},
      {k:'Research & publications', v:r, max:25, note:f.research+' publications'},
      {k:'Teaching performance', v:t, max:25, note:f.teaching+' / 5.0 rating'},
      {k:'Institutional service', v:s, max:20, note:f.service+' involvement'}
    ];
  }
  function rankBreakdownHTML(empId){
    const f=DB.facultyRanking.find(x=>x.emp===empId); const parts=rankParts(f); const TH=75;
    return `<div class="ai-analysis">
      <div class="between"><span class="hd" style="color:var(--amber)">${icon('award')} Ranking computation</span>${f.eligible?badge('Promotion-eligible','green'):badge('Not yet eligible','gray')}</div>
      <div class="between mt" style="align-items:baseline"><span class="muted" style="font-size:12px">Total ranking points</span><b style="font-size:22px;color:${f.points>=TH?'var(--green)':'var(--amber)'}">${f.points}<span style="font-size:13px;color:var(--ink-3);font-weight:400"> / 100</span></b></div>
      <div class="prog" style="margin-top:6px;height:7px"><i style="width:${f.points}%;background:${f.points>=TH?'var(--green)':'var(--amber)'}"></i></div>
      <div class="muted" style="font-size:11px;margin-top:5px">Promotion threshold for ${f.next}: ${TH} points</div>
      <div class="muted" style="font-size:11.5px;margin-top:12px">Points are the sum of four criteria:</div>
      <div class="mt-sm">${parts.map(p=>{const pct=Math.round(p.v/p.max*100);return `<div class="cb-row">
        <div class="cb-top"><span class="cl">${p.k}</span><span class="cw">${p.note}</span><span class="cs">${p.v}<span style="color:var(--ink-3);font-weight:400">/${p.max}</span></span></div>
        <div class="cb-bar"><i style="width:${pct}%;background:${cbColor(pct)}"></i></div></div>`;}).join('')}</div>
      <div class="hint mt" style="display:flex;align-items:center;gap:6px">${icon('shield')} Advisory — promotion requires Dean & Ranking Committee approval.</div>
    </div>`;
  }
  MC.openRankBreakdown = function(empId){ const e=DB.empById(empId); const f=DB.facultyRanking.find(x=>x.emp===empId);
    modal({title:'Faculty ranking breakdown',sub:(e?e.name:empId)+' · '+f.current,body:rankBreakdownHTML(empId),
      foot:`<button class="btn" data-close>Close</button>${f.eligible?`<button class="btn primary" onclick="UI.closeModal();MC.promote('${empId}')">${icon('arrowRight')} Promote</button>`:''}`});
  };

  MC.aiPayrollDetail = function(){
    modal({title:'Payroll validation · advisory',sub:'October 1–15, 2026 run',body:`<div class="ai-analysis">
      <div class="between"><span class="hd">${icon('sparkles')} Why this was flagged</span>${badge('Advisory','amber')}</div>
      <p style="font-size:13px;color:var(--ink-2);margin:12px 0 0;line-height:1.55">Patricia G. Villanueva (MC-1180) filed <b>4.0 hours of overtime</b> this cutoff — <b>18% above</b> her 3-month average. The rule engine surfaces it for a quick human check; it does not block the run.</p>
      <div class="mt-lg">${kv2('This cutoff OT','₱3,800 · 4.0 hrs')}${kv2('3-month average','₱3,220 · 3.4 hrs')}${kv2('Variance','+18% ▲')}${kv2('Filing · approver','OT-1180 · Finance Director')}</div>
      <div class="hint mt" style="display:flex;gap:6px;align-items:center">${icon('shield')} Advisory only — confirm the approval is valid, then release.</div></div>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Reviewed & cleared','ok','OT-1180 confirmed valid')">${icon('check')} Confirm & clear</button>`});
  };
  MC.aiAttendanceDetail = function(){
    const row=(id,note)=>{const e=DB.empById(id);return `<div class="cl-row" style="padding:11px 14px">${e?avatar(e):''}<div style="flex:1"><b style="font-size:13px">${e?e.name:id}</b><div class="muted" style="font-size:11.5px">${note}</div></div>${badge('Monday pattern','amber')}</div>`;};
    modal({title:'Attendance anomaly · advisory',sub:'Habitual tardiness pattern',body:`<div class="ai-analysis">
      <div class="between"><span class="hd">${icon('sparkles')} Pattern detected</span>${badge('Advisory','amber')}</div>
      <p style="font-size:13px;color:var(--ink-2);margin:12px 0 0;line-height:1.55">Two employees were late on <b>3 of the last 4 Mondays</b>. The engine surfaces the pattern for a supervisor conversation — not an automatic sanction.</p>
      <div class="mt-lg">${row('MC-0631','Late 3 of 4 Mondays · avg 12 min · M10 Fingerprint')}${row('MC-0219','Late 3 of 4 Mondays · avg 9 min · Mobile (GPS)')}</div>
      <div class="hint mt" style="display:flex;gap:6px;align-items:center">${icon('shield')} Recommended: a coaching note, pending supervisor review.</div></div>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Coaching note drafted','ok','Routed to supervisors for review')">${icon('message')} Draft coaching note</button>`});
  };

  function applicantCard(a){
    const col = a.match>=90?'var(--green)':a.match>=80?'var(--brand-2)':a.match>=70?'var(--amber)':'var(--ink-3)';
    return `<div class="kcard" draggable="true" data-app="${a.id}">
      <div class="row" style="gap:9px">${avatar(a)}<div style="min-width:0"><b>${a.name}</b><div class="muted" style="font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.role}</div></div></div>
      <div class="matchbar"><span class="muted" style="font-size:10.5px">AI match</span><div class="mb"><i style="width:${a.match}%;background:${col}"></i></div><b style="color:${col}">${a.match}%</b></div>
      <div class="meta">${icon('mapPin')}<span>${a.source}</span><span class="spacer"></span><button class="btn sm" style="padding:3px 8px" onclick="event.stopPropagation();MC.aiScreen('${a.id}')">${icon('sparkles')}</button></div>
    </div>`;
  }
  function jobsHTML(){
    return `<div class="card"><div class="table-wrap"><table class="tbl">
      <thead><tr><th>Requisition</th><th>Department</th><th>Campus</th><th>Type</th><th>Applicants</th><th>Stage</th><th>Status</th><th></th></tr></thead>
      <tbody>${DB.jobs.map(j=>`<tr class="clickable" data-job="${j.id}"><td><b>${j.title}</b><div class="muted" style="font-size:11.5px">${j.id} · posted ${j.posted}</div></td>
        <td class="muted">${j.dept}</td><td>${j.campus}</td><td>${j.type}</td>
        <td><b>${j.applicants}</b></td><td>${badge(j.stage)}</td><td>${badge(j.status)}</td>
        <td><button class="btn sm" data-job="${j.id}">View</button></td></tr>`).join('')}</tbody></table></div></div>`;
  }
  function talentHTML(){
    const pool = DB.applicants.filter(a=>a.match<80 || a.stage==='Applied');
    return `<div class="mb">${aiBanner(`<b>Intelligent recommendations:</b> ${pool.length} candidates kept in the talent pool. AI suggests re-engaging 2 of them for upcoming requisitions based on competency fit.`)}</div>
    <div class="grid g-3">${DB.applicants.map(a=>`<div class="card card-pad">
      <div class="row" style="gap:11px">${avatar(a,'md')}<div><b>${a.name}</b><div class="muted" style="font-size:12px">${a.exp} · ${a.edu}</div></div></div>
      <div class="matchbar mt"><span class="muted" style="font-size:11px">Match</span><div class="mb"><i style="width:${a.match}%;background:var(--brand-2)"></i></div><b>${a.match}%</b></div>
      <div class="row mt" style="gap:7px"><span class="chip">${a.role.split('—')[0]}</span></div>
      <button class="btn block mt" data-app="${a.id}">${icon('eye')} View profile</button></div>`).join('')}</div>`;
  }
  function recruitAnalyticsHTML(){
    const sources = [{label:'Careers Site',value:38,color:'var(--brand)'},{label:'Referral',value:22,color:'var(--teal)'},{label:'LinkedIn',value:18,color:'var(--brand-2)'},{label:'JobStreet',value:14,color:'var(--gold)'},{label:'Walk-in',value:8,color:'var(--violet)'}];
    return `<div class="grid g-4 mb">
      ${stat({icon:'clock',color:'blue',value:'28 days',label:'Avg. time-to-fill',trend:'-4 days',trendDir:'down'})}
      ${stat({icon:'userPlus',color:'violet',value:'89',label:'Applicants this period'})}
      ${stat({icon:'target',color:'green',value:'3.4%',label:'Applicant→hire rate'})}
      ${stat({icon:'badgeCheck',color:'teal',value:'91%',label:'Offer acceptance'})}
    </div>
    <div class="grid" style="grid-template-columns:1fr 1fr">
      <div class="card"><div class="card-head"><h3>Source of hire</h3></div><div class="card-pad">${charts.donut(sources,{center:'100%',centerSub:'of hires'})}${charts.legend(sources.map(s=>({...s,value:s.value+'%'})))}</div></div>
      <div class="card"><div class="card-head"><h3>Time-to-fill by department (days)</h3></div><div class="card-pad">${charts.bars([{label:'CAS',value:34},{label:'ICT',value:22},{label:'Finance',value:26},{label:'GS',value:31},{label:'Library',value:19}],{color:'var(--brand-2)'})}</div></div>
    </div>`;
  }
  function wireRecruit(root){
    $$('[data-app]',root).forEach(el=>{ if(el.tagName==='BUTTON'||el.classList.contains('kcard')) el.addEventListener('click',()=>MC.openApplicant(el.dataset.app)); });
    $$('tr[data-job], button[data-job]',root).forEach(el=>el.addEventListener('click',(e)=>{e.stopPropagation();MC.openJob(el.dataset.job);}));
    // drag & drop
    let dragged=null;
    $$('.kcard',root).forEach(c=>{
      c.addEventListener('dragstart',()=>{dragged=c;c.classList.add('dragging');});
      c.addEventListener('dragend',()=>{dragged&&dragged.classList.remove('dragging');dragged=null;$$('.kcol',root).forEach(k=>k.classList.remove('drop-hint'));});
    });
    $$('.kcol',root).forEach(col=>{
      col.addEventListener('dragover',e=>{e.preventDefault();col.classList.add('drop-hint');});
      col.addEventListener('dragleave',()=>col.classList.remove('drop-hint'));
      col.addEventListener('drop',e=>{e.preventDefault();col.classList.remove('drop-hint'); if(!dragged)return;
        const id=dragged.dataset.app; const st=col.dataset.stage; const a=DB.applicants.find(x=>x.id===id);
        if(a&&a.stage!==st){ a.stage=st; $('#rBody',root).innerHTML=pipelineHTML(); wireRecruit(root); toast('Candidate moved',`ok`,`${a.name} → ${st}`); }
      });
    });
  }

  MC.openApplicant = function(id){
    const a = DB.applicants.find(x=>x.id===id); if(!a) return;
    const col = a.match>=90?'var(--green)':a.match>=80?'var(--brand-2)':'var(--amber)';
    drawer({ title:'Candidate profile', body:`<div style="padding:20px">
      <div class="row" style="gap:14px">${avatar(a,'lg')}<div><h3 style="font-size:18px">${a.name}</h3><div class="muted">${a.role}</div><div class="row mt-sm" style="gap:7px">${badge(a.stage)}<span class="chip">${a.id}</span></div></div></div>
      <div class="mt-lg">${aiAnalysisHTML(a)}</div>
      <div class="card mt-lg"><div class="card-pad">
        <div class="kv"><span class="k">Experience</span><span class="v">${a.exp}</span></div>
        <div class="kv"><span class="k">Education</span><span class="v">${a.edu}</span></div>
        <div class="kv"><span class="k">Source</span><span class="v">${a.source}</span></div>
        <div class="kv"><span class="k">Applied</span><span class="v">${fmt.date(a.applied)}</span></div>
        <div class="kv"><span class="k">Email</span><span class="v">${a.email}</span></div>
      </div></div>
      <div class="row mt-lg wrap" style="gap:8px">
        <button class="btn primary" style="flex:1" onclick="MC.advanceStage('${a.id}')">${icon('arrowRight')} Advance stage</button>
        <button class="btn" onclick="MC.scheduleInterview('${a.id}')">${icon('calendar')} Interview</button>
        <button class="btn gold" onclick="MC.makeOffer('${a.id}')">${icon('fileText')} Offer</button>
      </div>
      <div class="hint mt" style="text-align:center">${icon('shield')} AI ranking is advisory — selection decisions require authorized human approval.</div>
    </div>`});
  };
  MC.advanceStage = function(id){ const a=DB.applicants.find(x=>x.id===id); const i=STAGES.indexOf(a.stage); if(i<STAGES.length-1){a.stage=STAGES[i+1];toast('Stage advanced','ok',`${a.name} → ${a.stage}`);} else {a.stage='Offer';toast('Candidate at offer stage','ok');} closeDrawer(); if(MC.state.route==='recruitment'&&MC.recruitTab==='pipeline')MC.go('recruitment'); };
  MC.scheduleInterview = function(id){ const a=DB.applicants.find(x=>x.id===id); closeDrawer();
    modal({title:'Schedule interview',sub:a.name+' · '+a.role,body:`
      <div class="form-row"><div class="field"><label>Date</label><input class="input" type="date" value="2026-10-20"></div><div class="field"><label>Time</label><input class="input" type="time" value="10:00"></div></div>
      <div class="field"><label>Interview type</label><select class="select"><option>Panel (on-site)</option><option>Virtual (video)</option><option>Teaching demo</option></select></div>
      <div class="field"><label>Panel members</label><input class="input" value="Dean CAS, HR, Dept. Chair"></div>
      <div class="field"><label>Notes to candidate</label><textarea class="input">Please bring credentials and a 15-min teaching demo.</textarea></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Interview scheduled','ok','Invite sent to ${a.email}')">${icon('calendar')} Schedule & notify</button>`});
  };
  MC.makeOffer = function(id){ const a=DB.applicants.find(x=>x.id===id); closeDrawer();
    modal({title:'Generate job offer',sub:a.name,body:`
      <div class="form-row"><div class="field"><label>Position</label><input class="input" value="${a.role}"></div><div class="field"><label>Employment type</label><select class="select"><option>Probationary</option><option>Regular</option><option>Contractual</option></select></div></div>
      <div class="form-row"><div class="field"><label>Monthly rate</label><input class="input" value="₱45,000"></div><div class="field"><label>Start date</label><input class="input" type="date" value="2026-11-03"></div></div>
      <div class="alertbar info mt">${icon('info')} Offer will route through the approval workflow: Dept. Head → HR → VP for Administration.</div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Job offer routed for approval','ok','${a.name} · Probationary')">${icon('send')} Generate & route</button>`});
  };
  MC.aiScreen = function(id){
    const a = DB.applicants.find(x=>x.id===id); if(!a) return;
    modal({title:'AI Resume Screening',sub:a.name+' · '+a.role,size:'lg',body:`
      <div class="muted" style="font-size:12px;display:flex;align-items:center;gap:7px;margin-bottom:14px">${icon('sparkles')} Résumé parsed & scored in 1.2s · ${a.exp} · ${a.edu}</div>
      ${aiAnalysisHTML(a)}`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();MC.openApplicant('${a.id}')">${icon('eye')} Full profile</button>`});
  };
  MC.openJob = function(id){
    const j = DB.jobs.find(x=>x.id===id); if(!j) return;
    const apps = DB.applicants.filter(a=>a.role.includes(j.title.split('—')[0].trim())||a.role===j.title);
    modal({title:j.title,sub:`${j.id} · ${j.dept} · ${j.campus}`,size:'lg',body:`
      <div class="grid g-3 mb">
        <div class="card card-pad"><div class="muted" style="font-size:11.5px">Applicants</div><div style="font-size:22px;font-weight:800">${j.applicants}</div></div>
        <div class="card card-pad"><div class="muted" style="font-size:11.5px">Stage</div><div style="margin-top:4px">${badge(j.stage)}</div></div>
        <div class="card card-pad"><div class="muted" style="font-size:11.5px">Channel</div><div style="font-size:13px;font-weight:600;margin-top:4px">${j.channel}</div></div>
      </div>
      <h4 style="font-size:14px;margin-bottom:10px">Candidates</h4>
      ${apps.length?apps.map(a=>`<div class="cl-row" style="padding:10px 14px;margin-bottom:8px">${avatar(a)}<div style="flex:1"><b style="font-size:13px">${a.name}</b><div class="muted" style="font-size:11.5px">${a.exp} · ${a.source}</div></div><b style="color:var(--brand-2)">${a.match}%</b>${badge(a.stage)}</div>`).join(''):`<div class="muted">No candidates yet.</div>`}`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();MC.recruitTab='pipeline';MC.go('recruitment')">View pipeline</button>`});
  };
  MC.newJob = function(){
    modal({title:'Post a job vacancy',sub:'Published to internal + external channels',body:`
      <div class="field"><label>Job title <span class="req">*</span></label><input class="input" placeholder="e.g. Assistant Professor — Biology"></div>
      <div class="form-row"><div class="field"><label>Department</label><select class="select">${DB.departments.map(d=>`<option>${d}</option>`).join('')}</select></div>
        <div class="field"><label>Campus</label><select class="select">${DB.campuses.map(c=>`<option>${c}</option>`).join('')}</select></div></div>
      <div class="form-row"><div class="field"><label>Employment type</label><select class="select"><option>Full-time Faculty</option><option>Full-time Staff</option><option>Contractual</option><option>Part-time</option></select></div>
        <div class="field"><label>Channels</label><select class="select"><option>Internal + External</option><option>Internal only</option><option>External only</option></select></div></div>
      <div class="field"><label>Job description</label>
        <div class="row" style="gap:8px;margin-bottom:6px"><button class="btn sm gold" id="genJD">${icon('sparkles')} Generate with AI</button><span class="hint">AI drafts a description from the title & department.</span></div>
        <textarea class="input" id="jdText" style="min-height:120px" placeholder="Describe responsibilities, qualifications, competencies…"></textarea></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Job posted','ok','Published to internal + external channels')">${icon('send')} Post vacancy</button>`});
    $('#genJD').addEventListener('click',()=>{ const b=$('#genJD'); b.innerHTML=`${icon('refresh')} Generating…`; b.disabled=true;
      setTimeout(()=>{ $('#jdText').value=`Miriam College seeks a qualified professional to join our academic community, guided by our Veritas mission.\n\nKey Responsibilities:\n• Deliver high-quality instruction aligned with the College's outcomes-based curriculum\n• Mentor and advise students; contribute to research and institutional service\n• Collaborate across departments and support co-curricular programs\n\nQualifications:\n• Master's degree in the relevant field (Doctorate an advantage)\n• Valid PRC license where applicable\n• Strong communication skills and commitment to Catholic, values-based education\n• Teaching or industry experience preferred`;
        b.innerHTML=`${icon('sparkles')} Regenerate`; b.disabled=false; toast('Job description drafted by AI','info','Review before posting'); },1100);
    });
  };
  MC.newRequisition = function(){
    modal({title:'Personnel requisition',sub:'Routed for approval before posting',body:`
      <div class="form-row"><div class="field"><label>Position requested</label><input class="input" placeholder="Position title"></div>
        <div class="field"><label>Number of positions</label><input class="input" type="number" value="1"></div></div>
      <div class="form-row"><div class="field"><label>Department</label><select class="select">${DB.departments.map(d=>`<option>${d}</option>`).join('')}</select></div>
        <div class="field"><label>Justification</label><select class="select"><option>Replacement</option><option>New / Additional</option><option>Backfill</option></select></div></div>
      <div class="field"><label>Reason / notes</label><textarea class="input" placeholder="Business justification…"></textarea></div>
      <div class="alertbar info">${icon('info')} Approval route: Dept. Head → HR → Finance (budget check) → VP for Administration.</div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Requisition submitted','ok','Routed to Dept. Head for approval')">${icon('send')} Submit for approval</button>`});
  };

  /* ========================================================
     EMPLOYEE 201 FILES
     ======================================================== */
  MC.empFilter = { q:'', type:'All', tab:'current' };
  MC.pages.employees = function () {
    return {
      title:'Employee 201 Files', crumb:'Employee Records Management',
      html:`
      <div class="page-head"><div><div class="t">Employee Records (201 File)</div><div class="d">Centralized digital 201 files — auto-created from onboarding, no manual encoding.</div></div>
        <div class="row wrap"><button class="btn" id="eExport">${icon('download')} Export CSV</button><button class="btn primary" id="eAdd">${icon('userPlus')} Add employee</button></div></div>
      ${daysAlert()}
      <div class="card">
        <div class="card-head" style="gap:12px;flex-wrap:wrap">
          <div class="subtabs" id="eTabs"><div class="subtab active" data-tab="current">Current (15)</div><div class="subtab" data-tab="former">Former (3)</div></div>
          <div class="spacer"></div>
          <div class="search" style="width:230px"><span>${icon('search')}</span><input id="eSearch" placeholder="Search name, ID, position…"></div>
          <select class="select" id="eType" style="width:150px"><option>All</option><option>Regular</option><option>Faculty</option><option>Probationary</option><option>Contractual</option></select>
        </div>
        <div class="table-wrap"><table class="tbl" id="eTable"></table></div>
      </div>`,
      onMount(root){
        const paint = ()=>{ $('#eTable',root).innerHTML = empTable(); $$('#eTable tr[data-emp]',root).forEach(tr=>tr.addEventListener('click',()=>MC.openEmployee(tr.dataset.emp))); };
        $('#eSearch',root).addEventListener('input',e=>{MC.empFilter.q=e.target.value;paint();});
        $('#eType',root).addEventListener('change',e=>{MC.empFilter.type=e.target.value;paint();});
        $('#eTabs',root).addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(!t)return;MC.empFilter.tab=t.dataset.tab;$$('.subtab',root).forEach(x=>x.classList.toggle('active',x===t));paint();});
        $('#eExport',root).addEventListener('click',()=>MC.exportCSV('employees'));
        $('#eAdd',root).addEventListener('click',MC.newEmployee);
        paint();
      }
    };
  };
  function empTable(){
    let list = DB.employees.filter(campusFilter);
    const f = MC.empFilter;
    if (f.tab==='former') return `<tbody><tr><td colspan="6"><div class="empty">${icon('users')}<div>Former employees are archived with full clearance & exit records.</div><div class="muted" style="font-size:12px;margin-top:6px">3 archived records · retained per records policy</div></div></td></tr></tbody>`;
    if (f.q){ const q=f.q.toLowerCase(); list=list.filter(e=>e.name.toLowerCase().includes(q)||e.id.toLowerCase().includes(q)||e.position.toLowerCase().includes(q)); }
    if (f.type!=='All') list=list.filter(e=>e.type===f.type);
    return `<thead><tr><th>Employee</th><th>ID</th><th>Department</th><th>Campus</th><th>Type</th><th>Status</th></tr></thead>
      <tbody>${list.map(e=>`<tr class="clickable" data-emp="${e.id}"><td class="cell-emp">${avatar(e)}<div><b>${e.name}</b><span>${e.position}</span></div></td>
        <td class="muted">${e.id}</td><td class="muted">${e.dept}</td><td>${e.campus}</td><td>${badge(e.type)}</td><td>${badge(e.status)}</td></tr>`).join('')||`<tr><td colspan="6"><div class="empty">${icon('search')}<div>No employees match your filters.</div></div></td></tr>`}</tbody>`;
  }
  function daysAlert(){
    const soon = DB.employees.filter(e=>e.contractEnds);
    if(!soon.length) return '';
    return `<div class="alertbar warn mb" style="cursor:pointer" onclick="MC.contractsEndingSoon()">${icon('alertTriangle')}<div style="flex:1"><b>${soon.length} contracts ending soon.</b> End-of-contract triggers active — ${soon.map(e=>e.name.split(' ').slice(-1)).join(', ')}. <u>Click to review &amp; renew.</u></div><button class="btn sm" onclick="event.stopPropagation();MC.contractsEndingSoon()">${icon('eye')} Review</button></div>`;
  }
  MC.contractsEndingSoon = function(){
    const soon = DB.employees.filter(e=>e.contractEnds).sort((a,b)=>new Date(a.contractEnds)-new Date(b.contractEnds));
    modal({title:'Contracts ending soon',sub:soon.length+' employees · end-of-contract triggers active',body:`
      ${soon.map(e=>`<div class="cl-row clickable" style="padding:12px 14px;margin-bottom:8px;cursor:pointer" onclick="UI.closeModal();MC.openEmployee('${e.id}')">${avatar(e)}
        <div style="flex:1"><b style="font-size:13px">${e.name}</b><div class="muted" style="font-size:11.5px">${e.position} · ${e.type} · ${e.campus}</div></div>
        <div style="text-align:right;min-width:92px"><div style="font-size:12px;font-weight:700;color:var(--amber)">${fmt.date(e.contractEnds)}</div><div class="muted" style="font-size:11px">${daysTo(e.contractEnds)} days left</div></div>
        <button class="btn sm" onclick="event.stopPropagation();UI.toast('Renewal initiated','ok','${e.name} · routed to Dept. Head')">${icon('refresh')} Renew</button></div>`).join('')}
      <div class="hint mt" style="display:flex;gap:6px;align-items:center">${icon('info')} Click a row to open the full 201 file, or initiate a renewal workflow.</div>`,
      foot:`<button class="btn primary" data-close>Close</button>`});
  };
  MC.attByStatus = function(kind){
    const title={present:'Present today',late:'Late arrivals',leave:'On leave / official business'}[kind];
    const list=DB.attendanceToday.filter(a=> kind==='present'? a.status==='Present' : kind==='late'? a.late : (a.status.includes('Leave')||a.status.includes('Business')));
    modal({title,sub:list.length+' employees · '+new Date().toLocaleDateString('en-US',{month:'long',day:'numeric'}),body:`
      ${list.map(a=>{const e=DB.empById(a.id);return `<div class="cl-row clickable" style="padding:11px 14px;margin-bottom:8px;cursor:pointer" onclick="UI.closeModal();MC.openEmployee('${a.id}')">${e?avatar(e):''}<div style="flex:1"><b style="font-size:13px">${e?e.name:a.id}</b><div class="muted" style="font-size:11.5px">${e?e.dept:''} · ${a.mode}</div></div><div style="text-align:right"><div style="font-size:12px;font-weight:700">${a.timeIn}</div>${badge(a.status)}</div></div>`;}).join('')||`<div class="muted" style="text-align:center;padding:16px">None in this category today.</div>`}`,
      foot:`<button class="btn primary" data-close>Close</button>`});
  };

  MC.openEmployee = function(id){
    const e = DB.empById(id); if(!e) return;
    const tabs = [['personal','Personal'],['employment','Employment'],['service','Service Record'],['family','Family'],['education','Education'],['eligibility','Gov/Licensure'],['work','Work History'],['awards','Awards'],['orgs','Prof. Orgs'],['training','Training'],['medical','Medical'],['audit','Audit Trail']];
    modal({title:'Employee 201 File',sub:`${e.id} · ${e.name}`,size:'xl',body:`
      <div class="row" style="gap:16px;margin-bottom:18px">${avatar(e,'lg')}
        <div style="flex:1"><h3 style="font-size:19px">${e.name}</h3><div class="muted">${e.position} · ${e.dept}</div>
          <div class="row mt-sm wrap" style="gap:7px">${badge(e.status)}${badge(e.type)}<span class="chip">${icon('mapPin')} ${e.campus}</span><span class="chip">${icon('clock')} ${fmt.yrs(e.hired)} tenure</span></div></div>
        <button class="btn" onclick="UI.toast('Edit mode','info','Changes are logged to the audit trail')">${icon('edit')} Edit</button></div>
      <div class="tabs" id="eft">${tabs.map((t,i)=>`<div class="tab ${i===0?'active':''}" data-ft="${t[0]}">${t[1]}</div>`).join('')}</div>
      <div id="eftBody">${emp201('personal',e)}</div>`});
    $('#eft').addEventListener('click',ev=>{const t=ev.target.closest('[data-ft]');if(!t)return;$$('#eft .tab').forEach(x=>x.classList.toggle('active',x===t));$('#eftBody').innerHTML=emp201(t.dataset.ft,e);});
  };
  function kv(k,v){ return `<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`; }
  function emp201(tab,e){
    if(tab==='personal') return `<div class="grid g-2"><div class="card card-pad">${kv('Full name',e.name)}${kv('Employee ID',e.id)}${kv('Date of birth',fmt.date(e.birth))}${kv('Gender',e.gender)}${kv('Civil status',e.civil)}</div>
      <div class="card card-pad">${kv('Email',e.email)}${kv('Mobile',e.phone)}${kv('Campus',e.campus)}${kv('Address','Loyola Heights, Quezon City')}${kv('Emergency contact','Listed · verified')}</div></div>`;
    if(tab==='employment') return `<div class="grid g-2"><div class="card card-pad">${kv('Position',e.position)}${kv('Department',e.dept)}${kv('Employment type',e.type)}${kv('Date hired',fmt.date(e.hired))}${kv('Supervisor',e.supervisor)}</div>
      <div class="card card-pad">${kv('Status',e.status)}${kv('Salary grade',e.sg)}${kv('Academic rank',e.rank)}${kv('Work schedule','Mon–Fri · 8:00–17:00')}${kv('Contract ends',e.contractEnds?fmt.date(e.contractEnds):'— (Regular)')}</div></div>
      ${e.contractEnds?`<div class="alertbar warn mt">${icon('alertTriangle')}<div style="flex:1">Contract ends ${fmt.date(e.contractEnds)} (${daysTo(e.contractEnds)} days). <b>Initiate renewal?</b></div><button class="btn sm" onclick="UI.toast('Renewal workflow started','ok','Routed to Dept. Head')">Initiate renewal</button></div>`:''}`;
    if(tab==='service') return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Effective</th><th>Action</th><th>Position</th><th>Details</th></tr></thead><tbody>
      <tr><td>${fmt.date(e.hired)}</td><td>${badge('Hired','green')}</td><td>${e.position}</td><td class="muted">Initial appointment</td></tr>
      <tr><td>Jun 1, 2021</td><td>${badge('Regularized','teal')}</td><td>${e.position}</td><td class="muted">Passed probation</td></tr>
      <tr><td>Jan 1, 2024</td><td>${badge('Salary adj.','blue')}</td><td>${e.position}</td><td class="muted">Merit increase (PMS)</td></tr></tbody></table></div></div>`;
    if(tab==='family') return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Name</th><th>Relationship</th><th>Date of birth</th><th>Dependent</th></tr></thead><tbody>
      <tr><td>Spouse name</td><td>Spouse</td><td>—</td><td>${badge('Yes','green')}</td></tr>
      <tr><td>Child A</td><td>Child</td><td>2015</td><td>${badge('Yes','green')}</td></tr>
      <tr><td>Child B</td><td>Child</td><td>2018</td><td>${badge('Yes','green')}</td></tr></tbody></table></div></div>`;
    if(tab==='education') return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Level</th><th>School</th><th>Degree</th><th>Year</th></tr></thead><tbody>
      <tr><td>Graduate</td><td>University of the Philippines</td><td>${e.rank!=='—'?'MA / PhD':'MBA'}</td><td>2014</td></tr>
      <tr><td>College</td><td>Ateneo de Manila University</td><td>Bachelor's degree</td><td>2008</td></tr></tbody></table></div></div>`;
    if(tab==='eligibility') return `<div class="grid g-2"><div class="card card-pad">${kv('TIN',e.tin)}${kv('SSS No.',e.sss)}${kv('Pag-IBIG (HDMF)',e.pagibig)}${kv('PhilHealth',e.philhealth)}</div>
      <div class="card card-pad">${kv('PRC License',e.rank!=='—'?'Valid · 2027':'N/A')}${kv('Civil Service','Professional')}${kv('LET / Board','Passed')}${kv('Driver’s License','Non-Pro')}</div></div>`;
    if(tab==='work') return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Employer</th><th>Position</th><th>Period</th></tr></thead><tbody>
      <tr><td>Previous Institution</td><td>${e.position}</td><td>2012–2016</td></tr>
      <tr><td>Earlier Employer</td><td>Junior role</td><td>2008–2012</td></tr></tbody></table></div></div>`;
    if(tab==='awards') return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Achievement / Award</th><th>Conferring body</th><th>Year</th></tr></thead><tbody>
      <tr><td>Outstanding Employee of the Year</td><td>Miriam College</td><td>2024</td></tr>
      <tr><td>Service Excellence Award</td><td>Human Resources Division</td><td>2022</td></tr>
      <tr><td>Loyalty Award (10 years)</td><td>Miriam College</td><td>2021</td></tr></tbody></table></div>
      <div class="hint" style="padding:12px 16px">Achievements and awards feed into performance and faculty-ranking review.</div></div>`;
    if(tab==='orgs') return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Professional Organization</th><th>Role</th><th>Membership</th></tr></thead><tbody>
      <tr><td>${e.rank!=='—'?'Phil. Association of Graduate Educators':'Phil. Society of IT Educators'}</td><td>Member</td><td>${badge('Active','green')}</td></tr>
      <tr><td>MC Faculty & Staff Association</td><td>Member</td><td>${badge('Active','green')}</td></tr></tbody></table></div></div>`;
    if(tab==='training') return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Training / Seminar</th><th>Provider</th><th>Date</th><th>Certificate</th></tr></thead><tbody>
      <tr><td>Outcomes-Based Education Workshop</td><td>CHED</td><td>Aug 2025</td><td>${badge('On file','green')}</td></tr>
      <tr><td>Data Privacy Act Compliance</td><td>NPC</td><td>Mar 2025</td><td>${badge('On file','green')}</td></tr>
      <tr><td>Faculty Development Program</td><td>Miriam College</td><td>Jan 2025</td><td>${badge('On file','green')}</td></tr></tbody></table></div></div>`;
    if(tab==='medical') return `<div class="card card-pad"><div class="row between"><div><b>Annual Physical Examination</b><div class="muted" style="font-size:12px">Secure document storage · sensitive data</div></div><button class="btn sm" onclick="UI.toast('Upload','info','APE results encrypted at rest')">${icon('upload')} Upload APE</button></div>
      <div class="mt-lg">${kv('Latest APE','Mar 12, 2026 · Fit to work')}${kv('Blood type','O+')}${kv('Allergies','None reported')}${kv('Records','3 documents · encrypted')}</div>
      <div class="alertbar info mt">${icon('lock')} Medical records are access-restricted and encrypted at rest per Data Privacy Act.</div></div>`;
    return `<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>Field</th></tr></thead><tbody>
      <tr><td class="muted" style="font-size:12px">2026-10-13 08:14</td><td>M. Par</td><td>Updated</td><td>Salary grade</td></tr>
      <tr><td class="muted" style="font-size:12px">2026-06-01 09:02</td><td>System</td><td>Onboarding sync</td><td>Profile created</td></tr>
      <tr><td class="muted" style="font-size:12px">2025-03-15 14:20</td><td>B. Navarro</td><td>Uploaded</td><td>APE document</td></tr></tbody></table></div>
      <div class="hint" style="padding:12px 16px">Complete, immutable audit trail of all 201 transactions.</div></div>`;
  }
  MC.newEmployee = function(){
    const nums=DB.employees.map(e=>parseInt(String(e.id).replace(/\D/g,''),10)||0);
    const nextId='MC-'+String(Math.max(0,...nums)+1).padStart(4,'0');
    modal({title:'Add employee',sub:'Auto-provisions 201 file, attendance account & payroll record',body:`
      <div class="alertbar ai mb">${icon('sparkles')}<div style="flex:1">Hiring from a candidate? Data transfers from Recruitment automatically — no re-encoding.</div></div>
      <div class="form-row"><div class="field"><label>Full name <span class="req">*</span></label><input class="input" id="empName" placeholder="First M. Last"></div><div class="field"><label>Employee ID</label><input class="input" id="empNewId" value="${nextId}" readonly></div></div>
      <div class="form-row"><div class="field"><label>Position</label><input class="input" id="empPos"></div><div class="field"><label>Department</label><select class="select" id="empDept">${DB.departments.map(d=>`<option>${d}</option>`).join('')}</select></div></div>
      <div class="form-row"><div class="field"><label>Campus</label><select class="select" id="empCampus">${DB.campuses.map(c=>`<option>${c}</option>`).join('')}</select></div><div class="field"><label>Employment type</label><select class="select" id="empType"><option>Probationary</option><option>Regular</option><option>Faculty</option><option>Contractual</option></select></div></div>
      <div class="form-row"><div class="field"><label>Date hired</label><input class="input" id="empHired" type="date" value="2026-11-03"></div><div class="field"><label>Email</label><input class="input" id="empEmail" placeholder="name@mc.edu.ph"></div></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" id="empSubmit">${icon('check')} Create & provision</button>`});
    const btn=document.getElementById('empSubmit'); if(btn) btn.addEventListener('click',MC.submitEmployee);
  };
  MC.submitEmployee = function(){
    const v=id=>((document.getElementById(id)||{}).value||'').trim();
    const name=v('empName'); if(!name){ toast('Name required','warn','Enter the full name'); return; }
    const id=v('empNewId')||('MC-'+String(Date.now()).slice(-4));
    const rec={ id, name, position:v('empPos')||'—', dept:v('empDept'), campus:v('empCampus'), type:v('empType'), status:'Active',
      email:v('empEmail'), phone:'', hired:v('empHired'), sg:'—', rank:'—', supervisor:'—', birth:null, civil:'—', gender:'—',
      tin:'', sss:'', pagibig:'', philhealth:'', contractEnds:null, color:DB.colorFor(name), initials:DB.initials(name) };
    DB.employees.push(rec);
    closeModal();
    toast('Employee added','ok',`${id} · ${name}`);
    if(MC.go && MC.state && MC.state.route==='employees') MC.go('employees');
    if(window.MC && MC.db && MC.db.live()) MC.db.insert('employees',{ id, name, position:rec.position, dept:rec.dept, campus:rec.campus,
      emp_type:rec.type, status:'Active', email:rec.email, hired:rec.hired||null, sg:'—', rank:'—', supervisor:'—' })
      .catch(e=>toast('Sync failed','warn',String(e.message||e)));
  };

  /* ========================================================
     TIMEKEEPING & ATTENDANCE
     ======================================================== */
  MC.pages.timekeeping = function () {
    const present = DB.attendanceToday.filter(a=>a.status==='Present').length;
    const late = DB.attendanceToday.filter(a=>a.late).length;
    const leave = DB.attendanceToday.filter(a=>a.status.includes('Leave')||a.status.includes('Business')).length;
    const statusDonut = [{label:'Present',value:present,color:'var(--green)'},{label:'Late',value:late,color:'var(--amber)'},{label:'Leave/OB',value:leave,color:'var(--blue)'}];
    return {
      title:'Timekeeping & Attendance', crumb:'Schedule Management',
      html:`
      <div class="page-head"><div><div class="t">Timekeeping & Attendance</div><div class="d">Real-time workforce visibility · biometric, web, and mobile capture.</div></div>
        <div class="row wrap"><button class="btn" id="tExport">${icon('download')} Export DTR</button><button class="btn primary" id="tFile">${icon('calendar')} File application</button></div></div>

      <div class="mb">${aiBanner(`<b>AI anomaly detection:</b> 2 employees show a habitual Monday-tardiness pattern. Recommended: coaching note (not sanction). <button class="btn sm" style="padding:3px 10px;margin-left:4px" onclick="MC.aiAttendanceDetail()">${icon('eye')} Why</button>`)}</div>

      <div class="grid g-4 mb">
        ${stat({icon:'userCheck',color:'green',value:present+'',label:'Present today',onclick:"MC.attByStatus('present')"})}
        ${stat({icon:'clock',color:'amber',value:late+'',label:'Late arrivals',onclick:"MC.attByStatus('late')"})}
        ${stat({icon:'calendar',color:'blue',value:leave+'',label:'On leave / OB',onclick:"MC.attByStatus('leave')"})}
        ${stat({icon:'fingerprint',color:'navy',value:'94.3%',label:'Attendance rate'})}
      </div>

      <div class="grid mb" style="grid-template-columns:1fr 1.6fr">
        <div class="card"><div class="card-head"><h3>Today's status</h3></div><div class="card-pad">${charts.donut(statusDonut,{center:present+late+leave+'',centerSub:'logged'})}${charts.legend(statusDonut)}
          <div class="mt-lg"><div class="muted" style="font-size:11.5px;margin-bottom:8px">Capture methods</div>
          ${['M10 Fingerprint','Facial Biometric','Web Portal','Mobile (GPS)'].map(m=>`<div class="chip" style="margin:0 6px 6px 0">${icon('fingerprint')} ${m}</div>`).join('')}</div></div></div>
        <div class="card"><div class="card-head"><div><h3>Live attendance log</h3><div class="sub">${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})} · auto-synced</div></div><span class="chip" style="color:var(--green)">${icon('activity')} Live</span></div>
          <div class="table-wrap"><table class="tbl"><thead><tr><th>Employee</th><th>Time In</th><th>Method</th><th>Status</th></tr></thead>
          <tbody>${DB.attendanceToday.map(a=>{const e=DB.empById(a.id);return `<tr><td class="cell-emp">${e?avatar(e):''}<div><b>${e?e.name:a.id}</b><span>${e?e.dept:''}</span></div></td><td><b>${a.timeIn}</b></td><td class="muted"><span class="chip">${a.mode}</span></td><td>${badge(a.status)}</td></tr>`;}).join('')}</tbody></table></div></div>
      </div>

      <div class="card">
        <div class="card-head"><div><h3>Applications & filings</h3><div class="sub">Leave · Official Business · Overtime · Offsetting</div></div>
          <div class="seg" id="tFilter"><button class="active" data-f="all">All</button><button data-f="Pending">Pending</button><button data-f="Approved">Approved</button></div></div>
        <div class="table-wrap"><table class="tbl" id="tApps"></table></div>
      </div>`,
      onMount(root){
        const paint=()=>{ $('#tApps',root).innerHTML = appsTable(root._f||'all'); };
        $('#tFilter',root).addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;root._f=b.dataset.f;$$('#tFilter button',root).forEach(x=>x.classList.toggle('active',x===b));paint();});
        $('#tFile',root).addEventListener('click',MC.fileApplication);
        $('#tExport',root).addEventListener('click',()=>MC.exportCSV('attendance'));
        paint();
      }
    };
  };
  function appsTable(f){
    let list = DB.applications; if(f&&f!=='all') list=list.filter(a=>a.status===f);
    return `<thead><tr><th>Ref</th><th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>${list.map(a=>`<tr><td class="muted">${a.id}</td><td><b style="font-size:12.8px">${a.empName}</b></td><td>${badge(a.type,typeTone(a.type))}</td>
        <td class="muted">${fmt.dateShort(a.from)}${a.to!==a.from?' – '+fmt.dateShort(a.to):''}</td><td>${a.days?a.days+'d':(a.hours+'h')}</td><td>${badge(a.status)}</td>
        <td>${a.status==='Pending'?`<div class="row" style="gap:6px"><button class="btn sm primary" onclick="MC.decideApp('${a.id}','Approved')">${icon('check')}</button><button class="btn sm danger" onclick="MC.decideApp('${a.id}','Rejected')">${icon('x')}</button></div>`:`<button class="btn sm" onclick="MC.viewApp('${a.id}')">View</button>`}</td></tr>`).join('')}</tbody>`;
  }
  function typeTone(t){ return {'Sick Leave':'red','Vacation Leave':'teal','Official Business':'blue','Overtime':'violet','Work Hours Offset':'amber'}[t]||'gray'; }
  MC.decideApp = function(id,decision){ const a=DB.applications.find(x=>x.id===id); if(!a)return; a.status=decision;
    toast(`Application ${decision.toLowerCase()}`,decision==='Approved'?'ok':'warn',`${a.id} · ${a.empName}`);
    const t=$('#tApps'); if(t) t.innerHTML=appsTable($('#tFilter button.active')?.dataset.f||'all');
    if (window.MC && MC.db && MC.db.live()) MC.db.update('leave_applications','id',id,{status:decision}).catch(e=>toast('Sync failed','warn',String(e.message||e))); };
  MC.viewApp = function(id){ const a=DB.applications.find(x=>x.id===id);
    modal({title:a.type,sub:a.id+' · '+a.empName,body:`${kv2('Status',badge(a.status))}${kv2('Dates',fmt.date(a.from)+(a.to!==a.from?' – '+fmt.date(a.to):''))}${kv2('Duration',a.days?a.days+' day(s)':a.hours+' hour(s)')}${kv2('Filed',fmt.date(a.filed))}${kv2('Approver',a.approver)}<div class="field mt"><label>Reason</label><div class="card card-pad" style="font-size:13px">${a.reason}</div></div>`,foot:`<button class="btn primary" data-close>Close</button>`}); };
  function kv2(k,v){ return `<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`; }
  MC.fileApplication = function(){
    modal({title:'File an application',sub:'Routed to your supervisor for approval',body:`
      <div class="field"><label>Application type <span class="req">*</span></label><select class="select" id="appType"><option>Leave — Vacation</option><option>Leave — Sick</option><option>Official Business</option><option>Overtime</option><option>Work Hours Offsetting</option></select></div>
      <div class="form-row"><div class="field"><label>From</label><input class="input" type="date" id="appFrom" value="2026-10-20"></div><div class="field"><label>To</label><input class="input" type="date" id="appTo" value="2026-10-20"></div></div>
      <div class="field"><label>Reason</label><textarea class="input" id="appReason" placeholder="Provide details…"></textarea></div>
      <div class="card card-pad" style="background:var(--surface-2)"><div class="between"><span class="muted" style="font-size:12.5px">Leave balance (VL)</span><b>9.5 days</b></div><div class="prog mt-sm"><i style="width:63%"></i></div></div>
      <div class="alertbar info mt">${icon('info')} Approved leaves automatically flow to Payroll computation.</div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" id="appSubmit">${icon('send')} Submit</button>`});
    const btn=document.getElementById('appSubmit'); if(btn) btn.addEventListener('click',MC.submitApplication);
  };
  MC.submitApplication = function(){
    const typeMap={'Leave — Vacation':'Vacation Leave','Leave — Sick':'Sick Leave','Official Business':'Official Business','Overtime':'Overtime','Work Hours Offsetting':'Work Hours Offset'};
    const v=id=>((document.getElementById(id)||{}).value||'');
    const type=typeMap[v('appType')]||'Vacation Leave';
    const from=v('appFrom')||new Date().toISOString().slice(0,10);
    const to=v('appTo')||from;
    const reason=v('appReason').trim();
    const p=MC.persona(); const empId=DB.empById(p.id)?p.id:null;
    const prefix=type==='Official Business'?'OB':type==='Overtime'?'OT':type==='Work Hours Offset'?'WO':'LV';
    const id=`${prefix}-${String(Date.now()).slice(-4)}`;
    let days=Math.round((new Date(to)-new Date(from))/86400000)+1; if(!(days>=0))days=1;
    const isHours=(type==='Overtime'||type==='Work Hours Offset');
    const filed=new Date().toISOString().slice(0,10);
    DB.applications.unshift({ id, emp:empId, empName:p.name, type, from, to, days:isHours?0:days, hours:isHours?8:null, status:'Pending', filed, approver:'Supervisor', reason });
    closeModal();
    toast('Application filed','ok',`${id} · routed for approval`);
    const t=document.getElementById('tApps'); if(t) t.innerHTML=appsTable(document.querySelector('#tFilter button.active')?.dataset.f||'all');
    if(window.MC && MC.db && MC.db.live()) MC.db.insert('leave_applications',{ id, emp_id:empId, emp_name:p.name, leave_type:type, from_date:from, to_date:to, days:isHours?0:days, hours:isHours?8:null, status:'Pending', filed, approver:'Supervisor', reason })
      .catch(e=>toast('Sync failed','warn',String(e.message||e)));
  };

  /* ========================================================
     PAYROLL & COMPENSATION
     ======================================================== */
  MC.pages.payroll = function () {
    const p = DB.payrollRun;
    return {
      title:'Payroll & Compensation', crumb:'Payroll Management',
      html:`
      <div class="page-head"><div><div class="t">Payroll & Compensation</div><div class="d">${p.period} · ${p.cutoff} · ${p.group}</div></div>
        <div class="row wrap"><button class="btn" id="pJE">${icon('link')} Post to SAP</button><button class="btn primary" id="pRun">${icon('zap')} Run payroll</button></div></div>

      <div class="mb">${aiBanner(`<b>AI payroll validation:</b> 0 critical anomalies in this run. 1 advisory — an overtime entry 18% above the employee's 3-month average. <button class="btn sm" style="padding:3px 10px;margin-left:4px" onclick="MC.aiPayrollDetail()">${icon('eye')} Why</button>`)}</div>

      <div class="grid g-4 mb">
        ${stat({icon:'users',color:'navy',value:fmt.num(p.employees),label:'Employees in run'})}
        ${stat({icon:'wallet',color:'blue',value:fmt.peso(p.gross),label:'Gross pay'})}
        ${stat({icon:'receipt',color:'amber',value:fmt.peso(p.deductions),label:'Deductions'})}
        ${stat({icon:'coins',color:'green',value:fmt.peso(p.net),label:'Net pay'})}
      </div>

      <div class="grid mb" style="grid-template-columns:1.6fr 1fr">
        <div class="card">
          <div class="card-head"><div><h3>Payroll register</h3><div class="sub">Sample of ${p.items.length} of ${p.employees} records · ${badge(p.status)}</div></div><span class="chip">Pay date: ${fmt.date(p.pay_date)}</span></div>
          <div class="table-wrap"><table class="tbl"><thead><tr><th>Employee</th><th>Basic</th><th>Allow.</th><th>OT</th><th>Gross</th><th>Deductions</th><th>Net</th><th></th></tr></thead>
          <tbody>${p.items.map(it=>{const e=DB.empById(it.id);const ded=it.tax+it.sss+it.phic+it.hdmf+it.loans;return `<tr><td class="cell-emp">${e?avatar(e):''}<div><b>${e?e.name:it.id}</b><span>${it.id}</span></div></td>
            <td>${fmt.peso(it.basic)}</td><td>${fmt.peso(it.allow)}</td><td>${it.ot?fmt.peso(it.ot):'—'}</td><td><b>${fmt.peso(it.gross)}</b></td><td class="muted">${fmt.peso(ded)}</td><td><b style="color:var(--green)">${fmt.peso(it.net)}</b></td>
            <td><button class="btn sm" onclick="MC.viewPayslip('${it.id}')">Payslip</button></td></tr>`;}).join('')}</tbody></table></div>
        </div>
        <div class="card"><div class="card-head"><h3>Deduction breakdown</h3></div><div class="card-pad">
          ${charts.donut([{label:'W/holding Tax',value:46,color:'var(--brand)'},{label:'SSS',value:18,color:'var(--brand-2)'},{label:'PhilHealth',value:14,color:'var(--teal)'},{label:'Pag-IBIG',value:6,color:'var(--gold)'},{label:'Loans',value:16,color:'var(--violet)'}],{center:fmt.peso(p.deductions).replace('₱','₱'),centerSub:'total'})}
          ${charts.legend([{label:'Tax',color:'var(--brand)'},{label:'SSS',color:'var(--brand-2)'},{label:'PhilHealth',color:'var(--teal)'},{label:'Pag-IBIG',color:'var(--gold)'},{label:'Loans',color:'var(--violet)'}])}
        </div></div>
      </div>

      <div class="grid g-3">
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:6px">${icon('fileText')}<b>Statutory reports</b></div><p class="muted" style="font-size:12.5px;margin:0 0 12px">BIR, SSS, PhilHealth, Pag-IBIG remittance files.</p><button class="btn block" onclick="MC.exportCSV('statutory')">${icon('download')} Generate reports</button></div>
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:6px">${icon('scroll')}<b>BIR Form 2316</b></div><p class="muted" style="font-size:12.5px;margin:0 0 12px">Year-end certificate of compensation & tax withheld.</p><button class="btn block" onclick="UI.toast('2316 batch generated','ok','412 certificates ready')">${icon('printer')} Issue 2316</button></div>
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:6px">${icon('link')}<b>Journal entries → SAP</b></div><p class="muted" style="font-size:12.5px;margin:0 0 12px">Post payroll JE to the Accounting SAP system.</p><button class="btn block primary" id="pJE2">${icon('arrowRight')} Post to SAP</button></div>
      </div>`,
      onMount(root){
        $('#pRun',root).addEventListener('click',MC.runPayroll);
        $('#pJE',root).addEventListener('click',MC.postJE);
        $('#pJE2',root).addEventListener('click',MC.postJE);
      }
    };
  };
  MC.runPayroll = function(){
    modal({title:'Run payroll',sub:'Simulation → validation → reconciliation',body:`
      <div class="form-row"><div class="field"><label>Payroll group</label><select class="select"><option>Monthly-Paid Regular</option><option>Faculty (Semestral)</option><option>Contractual</option></select></div>
        <div class="field"><label>Cutoff</label><select class="select"><option>Oct 1–15, 2026 (2nd)</option><option>Oct 16–31, 2026</option></select></div></div>
      <div id="runSteps"></div>
      <div class="field mt"><label>Include</label><div class="row wrap" style="gap:8px"><span class="chip">${icon('check')} Approved leaves</span><span class="chip">${icon('check')} Overtime</span><span class="chip">${icon('check')} Loan deductions</span><span class="chip">${icon('check')} Allowances</span></div></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" id="runGo">${icon('zap')} Run simulation</button>`});
    $('#runGo').addEventListener('click',()=>{
      const steps=['Pulling approved timekeeping inputs…','Computing gross, OT, holiday & night differential…','Applying tax, SSS, PhilHealth, Pag-IBIG & loans…','AI validation & anomaly scan…','Reconciliation complete ✓'];
      const box=$('#runSteps'); box.innerHTML=''; $('#runGo').disabled=true; $('#runGo').innerHTML=`${icon('refresh')} Running…`;
      let i=0; const tick=()=>{ if(i<steps.length){ box.insertAdjacentHTML('beforeend',`<div class="cl-row" style="padding:9px 13px;margin-bottom:7px"><div class="cl-check" style="background:var(--green-bg);color:var(--green)">${icon('check')}</div><div style="font-size:12.5px">${steps[i]}</div></div>`); i++; setTimeout(tick,500);} else { $('#runGo').innerHTML=`${icon('check')} Done`; setTimeout(()=>{closeModal();toast('Payroll simulation complete','ok','412 employees · ₱7.44M net · 0 critical anomalies');},600);} };
      tick();
    });
  };
  MC.viewPayslip = function(id){
    const it=DB.payrollRun.items.find(x=>x.id===id); const e=DB.empById(id); const ded=it.tax+it.sss+it.phic+it.hdmf+it.loans;
    modal({title:'Payslip',sub:DB.payrollRun.period,body:`
      <div class="row between" style="padding-bottom:14px;border-bottom:2px solid var(--line)"><div class="row" style="gap:12px">${avatar(e,'md')}<div><b style="font-size:15px">${e.name}</b><div class="muted" style="font-size:12px">${e.position} · ${id}</div></div></div><div style="text-align:right"><div class="muted" style="font-size:11px">Pay date</div><b>${fmt.date(DB.payrollRun.pay_date)}</b></div></div>
      <div class="grid g-2 mt-lg"><div><div class="muted" style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Earnings</div>${kv('Basic pay',fmt.peso2(it.basic))}${kv('Allowances',fmt.peso2(it.allow))}${kv('Overtime',fmt.peso2(it.ot))}<div class="kv"><span class="k"><b>Gross</b></span><span class="v"><b>${fmt.peso2(it.gross)}</b></span></div></div>
        <div><div class="muted" style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Deductions</div>${kv('Withholding tax',fmt.peso2(it.tax))}${kv('SSS',fmt.peso2(it.sss))}${kv('PhilHealth',fmt.peso2(it.phic))}${kv('Pag-IBIG',fmt.peso2(it.hdmf))}${kv('Loans',fmt.peso2(it.loans))}<div class="kv"><span class="k"><b>Total</b></span><span class="v"><b>${fmt.peso2(ded)}</b></span></div></div></div>
      <div class="card card-pad mt-lg" style="background:var(--navy-900);color:#fff"><div class="between"><span style="color:#c7d2ef">NET PAY</span><b style="font-size:22px;color:#fff">${fmt.peso2(it.net)}</b></div></div>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.toast('Payslip downloaded','ok','PDF · ${e.name}')">${icon('download')} Download PDF</button>`});
  };
  MC.postJE = function(){
    const dr=9847200, cr=1108558+915000+386786+7436856;
    const vcheck=(ok,t)=>`<div class="cl-row" style="padding:9px 13px;margin-bottom:7px"><div class="cl-check" style="background:var(--${ok?'green':'red'}-bg);color:var(--${ok?'green':'red'})">${icon(ok?'check':'x')}</div><div style="flex:1;font-size:12.5px;font-weight:600">${t}</div>${badge(ok?'Pass':'Fail',ok?'green':'red')}</div>`;
    modal({title:'Post journal entries to SAP',sub:'JE-2026-10-204 · Oct 1–15, 2026',size:'lg',body:`
      <div class="card mb"><div class="table-wrap"><table class="tbl"><thead><tr><th>Account</th><th style="text-align:right">Debit</th><th style="text-align:right">Credit</th></tr></thead><tbody>
        <tr><td>Salaries & Wages Expense</td><td style="text-align:right">${fmt.peso(9847200)}</td><td style="text-align:right">—</td></tr>
        <tr><td>Withholding Tax Payable</td><td style="text-align:right">—</td><td style="text-align:right">${fmt.peso(1108558)}</td></tr>
        <tr><td>SSS / PhilHealth / Pag-IBIG Payable</td><td style="text-align:right">—</td><td style="text-align:right">${fmt.peso(915000)}</td></tr>
        <tr><td>Loans Payable</td><td style="text-align:right">—</td><td style="text-align:right">${fmt.peso(386786)}</td></tr>
        <tr><td>Cash in Bank — Payroll</td><td style="text-align:right">—</td><td style="text-align:right">${fmt.peso(7436856)}</td></tr>
        <tr style="border-top:2px solid var(--line)"><td><b>Totals</b></td><td style="text-align:right"><b>${fmt.peso(dr)}</b></td><td style="text-align:right"><b>${fmt.peso(cr)}</b></td></tr>
      </tbody></table></div></div>
      <div class="ai-analysis">
        <div class="between"><span class="hd" style="color:var(--teal)">${icon('shield')} Pre-post validation</span>${badge(dr===cr?'Ready to post':'Blocked',dr===cr?'green':'red')}</div>
        <div class="mt">${vcheck(dr===cr,`Entry is balanced — debits ${fmt.peso(dr)} = credits ${fmt.peso(cr)}`)}${vcheck(true,'All accounts mapped to the SAP chart of accounts')}${vcheck(true,'Posting period matches the payroll cutoff (Oct 1–15, 2026)')}${vcheck(true,'No duplicate journal entry for this period')}${vcheck(true,'Secure system-to-system authentication established')}</div>
      </div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" ${dr!==cr?'disabled':''} onclick="UI.closeModal();UI.toast('Posted to SAP','ok','JE-2026-10-204 · balanced ✓')">${icon('arrowRight')} Post to SAP</button>`});
  };

  /* ========================================================
     BENEFITS
     ======================================================== */
  MC.pages.benefits = function () {
    return {
      title:'Benefits Administration', crumb:'Benefits Management',
      html:`
      <div class="page-head"><div><div class="t">Benefits Administration</div><div class="d">Mandatory & company-sponsored benefits, claims, and dependents.</div></div>
        <div class="row wrap"><button class="btn" id="bClaims">${icon('receipt')} Claims</button><button class="btn primary" id="bEnroll">${icon('plus')} Enroll employee</button></div></div>

      <div class="mb">${aiBanner(`<b>AI reminder:</b> The Educational Benefit window closes Nov 15 — 114 eligible dependents are not yet enrolled. <button class="btn sm" style="padding:3px 10px;margin-left:4px" onclick="MC.benefitGap()">${icon('eye')} Who</button>`)}</div>

      <div class="grid g-4 mb">
        ${stat({icon:'heartPulse',color:'red',value:'96.6%',label:'HMO enrollment'})}
        ${stat({icon:'gift',color:'violet',value:'8',label:'Active programs'})}
        ${stat({icon:'receipt',color:'amber',value:'4',label:'Open claims'})}
        ${stat({icon:'coins',color:'green',value:'₱4.2M',label:'Annual benefit cost'})}
      </div>

      <div class="card mb"><div class="card-head"><h3>Benefit programs</h3><span class="chip">${icon('refresh')} Auto-enrolled on hire</span></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Program</th><th>Type</th><th>Enrollment</th><th>Employer share</th><th>Renews</th><th>Status</th><th></th></tr></thead>
        <tbody>${DB.benefits.map(b=>`<tr><td><b>${b.name}</b></td><td>${badge(b.type,benTone(b.type))}</td>
          <td><div class="row" style="gap:8px"><div class="prog" style="width:70px"><i style="width:${b.enrolled/b.eligible*100}%"></i></div><span class="muted" style="font-size:12px">${b.enrolled}/${b.eligible}</span></div></td>
          <td class="muted">${b.employer}</td><td class="muted">${b.renews}</td><td>${badge(b.status)}</td>
          <td><button class="btn sm" onclick="UI.toast('Program details','info','${b.name}')">${icon('eye')}</button></td></tr>`).join('')}</tbody></table></div>
      </div>

      <div class="card"><div class="card-head"><div><h3>Recent claims</h3><div class="sub">Electronic submission & approval</div></div></div>
        <div class="table-wrap"><table class="tbl" id="bClaimsTbl"></table></div></div>`,
      onMount(root){
        const paint=()=>{ $('#bClaimsTbl',root).innerHTML=claimsTable(); };
        $('#bEnroll',root).addEventListener('click',MC.enrollBenefit);
        $('#bClaims',root).addEventListener('click',()=>$('#bClaimsTbl',root).scrollIntoView({behavior:'smooth'}));
        paint();
      }
    };
  };
  function benTone(t){ return {Health:'red',Mandatory:'blue',Insurance:'violet',Educational:'teal',Retirement:'navy',Wellness:'green'}[t]||'gray'; }
  function claimsTable(){
    return `<thead><tr><th>Ref</th><th>Employee</th><th>Benefit</th><th>Type</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>${DB.claims.map(c=>`<tr><td class="muted">${c.id}</td><td><b style="font-size:12.8px">${c.emp}</b></td><td>${c.benefit}</td><td class="muted">${c.type}</td><td><b>${c.amount}</b></td><td>${badge(c.status)}</td>
      <td>${c.status==='Pending'?`<button class="btn sm primary" onclick="MC.decideClaim('${c.id}')">Approve</button>`:c.status==='Processing'?`<button class="btn sm" onclick="UI.toast('Claim in processing','info','${c.id}')">Track</button>`:`<button class="btn sm" onclick="UI.toast('Claim ${c.id}','info','${c.status}')">View</button>`}</td></tr>`).join('')}</tbody>`;
  }
  MC.decideClaim = function(id){ const c=DB.claims.find(x=>x.id===id); c.status='Approved'; toast('Claim approved','ok',`${id} · ${c.emp}`); const t=$('#bClaimsTbl'); if(t)t.innerHTML=claimsTable(); };
  MC.benefitGap = function(){
    const units=[['Basic Education Unit',62],['Higher Education Unit',38],['Shared services & admin',14]];
    modal({title:'Educational benefit — not yet enrolled',sub:'Enrollment closes Nov 15',body:`<div class="ai-analysis">
      <div class="between"><span class="hd">${icon('sparkles')} Eligible but not enrolled</span>${badge('114 dependents','amber')}</div>
      <p style="font-size:13px;color:var(--ink-2);margin:12px 0 0;line-height:1.55">Of <b>260 eligible dependents</b>, 146 are enrolled and <b>114 have not completed enrollment</b>. By employee unit:</p>
      <div class="mt-sm">${units.map(u=>`<div class="cb-row"><div class="cb-top"><span class="cl">${u[0]}</span><span class="cw">${u[1]} dependents</span><span class="cs" style="color:var(--amber)">${Math.round(u[1]/114*100)}%</span></div><div class="cb-bar"><i style="width:${u[1]/62*100}%;background:var(--amber)"></i></div></div>`).join('')}</div>
      <div class="hint mt" style="display:flex;gap:6px;align-items:center">${icon('shield')} Targeted reminders are drafted for HR review before sending.</div></div>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Reminders queued','ok','114 reminders drafted for HR review')">${icon('send')} Draft reminders</button>`});
  };
  MC.enrollBenefit = function(){
    modal({title:'Enroll employee in benefit',body:`
      <div class="field"><label>Employee</label><select class="select">${DB.employees.map(e=>`<option>${e.name}</option>`).join('')}</select></div>
      <div class="field"><label>Benefit program</label><select class="select">${DB.benefits.map(b=>`<option>${b.name}</option>`).join('')}</select></div>
      <div class="field"><label>Dependents to include</label><div class="row wrap" style="gap:8px"><span class="chip">${icon('check')} Spouse</span><span class="chip">${icon('check')} Child A</span><span class="chip">${icon('plus')} Add dependent</span></div></div>
      <div class="alertbar info">${icon('link')} Contributions auto-deduct via Payroll; history saves to the 201 File.</div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Enrolled','ok','Payroll deduction scheduled')">${icon('check')} Enroll</button>`});
  };

  /* ========================================================
     PERFORMANCE & FACULTY RANKING
     ======================================================== */
  MC.perfTab = 'reviews';
  MC.pages.performance = function () {
    return {
      title:'Performance & Faculty Ranking', crumb:'Performance Management System',
      html:`
      <div class="page-head"><div><div class="t">Performance Management System</div><div class="d">Goals & KPIs, evaluations, IDPs, faculty ranking, and L&D.</div></div>
        <div class="row wrap"><button class="btn" id="pfRank">${icon('award')} Compute ranking</button><button class="btn primary" id="pfNew">${icon('plus')} New evaluation</button></div></div>
      <div class="tabs" id="pfTabs">${[['reviews','Evaluations'],['ranking','Faculty Ranking'],['ld','Learning & Dev'],['insights','AI Insights']].map(([k,l])=>`<div class="tab ${k===MC.perfTab?'active':''}" data-t="${k}">${l}</div>`).join('')}</div>
      <div id="pfBody"></div>`,
      onMount(root){
        const render=()=>{$('#pfBody',root).innerHTML=perfBody();};
        $('#pfTabs',root).addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(!t)return;MC.perfTab=t.dataset.t;$$('.tab',root).forEach(x=>x.classList.toggle('active',x===t));render();});
        $('#pfNew',root).addEventListener('click',()=>MC.openReview(DB.reviews[2].emp));
        $('#pfRank',root).addEventListener('click',MC.computeRanking);
        render();
      }
    };
  };
  function perfBody(){
    if(MC.perfTab==='reviews'){
      return `<div class="grid g-4 mb">
        ${stat({icon:'target',color:'blue',value:'4.3',label:'Avg. rating (of 5)'})}
        ${stat({icon:'checkBig',color:'green',value:'68%',label:'Cycle completion'})}
        ${stat({icon:'clipboard',color:'violet',value:'4',label:'IDPs in progress'})}
        ${stat({icon:'award',color:'amber',value:'2',label:'Promotion-eligible'})}
      </div>
      <div class="card"><div class="card-head"><h3>Performance evaluations</h3></div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>Employee</th><th>Cycle</th><th>Goals met</th><th>Score</th><th>Rating</th><th>Status</th><th></th></tr></thead>
      <tbody>${DB.reviews.map(r=>{const e=DB.empById(r.emp);return `<tr class="clickable" onclick="MC.openReview('${r.emp}')"><td class="cell-emp">${e?avatar(e):''}<div><b>${e?e.name:r.emp}</b><span>${e?e.position:''}</span></div></td>
        <td class="muted">${r.cycle}</td><td>${r.met}/${r.goals}</td><td><b>${r.score}</b></td><td>${badge(r.rating)}</td><td>${badge(r.status)}</td>
        <td><button class="btn sm" onclick="event.stopPropagation();MC.openReview('${r.emp}')">${icon('eye')}</button></td></tr>`;}).join('')}</tbody></table></div></div>`;
    }
    if(MC.perfTab==='ranking'){
      return `<div class="mb">${aiBanner(`<b>Ranking computed:</b> 2 faculty meet promotion criteria. Rank-based salary increases auto-stage in Payroll upon authorized approval — never executed automatically.`)}</div>
      <div class="card"><div class="card-head"><h3>Faculty Ranking & Promotion</h3><span class="chip">AY 2025–2026 cycle</span></div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>Faculty</th><th>Current rank</th><th>Points</th><th>Qualif.</th><th>Research</th><th>Teaching</th><th>Next rank</th><th>Eligible</th></tr></thead>
      <tbody>${DB.facultyRanking.map(f=>{const e=DB.empById(f.emp);return `<tr><td class="cell-emp">${e?avatar(e):''}<div><b>${e?e.name:f.emp}</b><span>${e?e.dept:''}</span></div></td>
        <td><button class="btn sm ghost" style="padding:4px 8px;gap:8px" onclick="MC.openRankBreakdown('${f.emp}')" title="See how this was computed"><div class="prog" style="width:54px"><i style="width:${f.points}%;background:${f.points>=75?'var(--green)':'var(--amber)'}"></i></div><b>${f.points}</b>${icon('info')}</button></td>
        <td>${f.qualif}</td><td>${f.research} pubs</td><td>${f.teaching}</td><td class="muted">${f.next}</td>
        <td>${f.eligible?`<button class="btn sm primary" onclick="MC.promote('${f.emp}')">Promote</button>`:badge('Not yet','gray')}</td></tr>`;}).join('')}</tbody></table></div></div>`;
    }
    if(MC.perfTab==='ld'){
      return `<div class="grid g-2 mb">
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:10px">${icon('gradCap')}<b>Training Needs Analysis</b></div>
          <p class="muted" style="font-size:13px;margin:0 0 12px">AI maps competency gaps from evaluations to recommended training.</p>
          ${['Research & Publication Workshop — 12 faculty','Digital Pedagogy — 28 faculty','Leadership Track — 6 staff'].map(t=>`<div class="cl-row" style="padding:10px 13px;margin-bottom:8px"><div class="cl-check" style="background:var(--violet-bg);color:var(--violet)">${icon('sparkles')}</div><div style="flex:1;font-size:12.5px">${t}</div><button class="btn sm" onclick="UI.toast('Nominated','ok','Training nomination routed')">Nominate</button></div>`).join('')}
        </div>
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:10px">${icon('book')}<b>Learning records</b></div>
          ${kv('Trainings completed (YTD)','147')}${kv('Certifications tracked','89')}${kv('Avg. training ROI','3.2×')}${kv('Pending nominations','14')}
          <button class="btn block mt-lg" onclick="UI.toast('L&D report','info','Training effectiveness report')">${icon('chart')} Training effectiveness report</button>
        </div>
      </div>`;
    }
    return `<div class="grid g-2">
      <div class="card card-pad" style="background:var(--violet-bg);border-color:#d7cbf5"><div class="row" style="gap:9px;color:var(--violet);font-weight:700">${icon('sparkles')} Predictive insights</div>
        <div class="mt">${['Turnover risk: 7 employees elevated (contractual faculty)','Succession gaps in 2 leadership roles','Retirement wave: 4 employees within 3 years'].map(t=>`<div class="cl-row" style="padding:11px 13px;margin-bottom:8px"><div class="cl-check" style="background:#fff;color:var(--violet)">${icon('activity')}</div><div style="font-size:12.5px">${t}</div></div>`).join('')}</div></div>
      <div class="card card-pad"><div class="row" style="gap:9px;font-weight:700">${icon('target')} Competency gaps & readiness</div>
        <div class="mt">${kv('Promotion-ready employees','11')}${kv('Critical competency gaps','6')}${kv('Personalized learning paths','23')}${kv('Career-readiness flags','9')}</div>
        <div class="alertbar ai mt-lg">${icon('shield')} All AI insights are advisory. Employment decisions require authorized human approval.</div></div>
    </div>`;
  }
  MC.openReview = function(empId){
    const e=DB.empById(empId); const r=DB.reviews.find(x=>x.emp===empId)||{cycle:'H2 2026',score:4.0};
    const cnames=['Job knowledge & competence','Quality & timeliness of work','Collaboration & communication','Initiative & innovation','Mission & values alignment'];
    const coffs=[0.4,-0.3,0.2,-0.2,-0.1];
    const crit=cnames.map((n,i)=>[n, Math.max(1,Math.min(5,Math.round((r.score+coffs[i])*10)/10))]);
    modal({title:'Performance evaluation',sub:`${e.name} · ${r.cycle}`,size:'lg',body:`
      <div class="grid g-2 mb"><div class="card card-pad"><div class="muted" style="font-size:11.5px">Overall score</div><div style="font-size:26px;font-weight:800;color:var(--brand)">${r.score}<span style="font-size:14px;color:var(--ink-3)"> / 5.0</span></div><div class="mt-sm">${badge(r.rating||'Satisfactory')}</div></div>
        <div class="card card-pad"><div class="muted" style="font-size:11.5px">Goals</div><div style="font-size:26px;font-weight:800">${r.met||4}<span style="font-size:14px;color:var(--ink-3)"> / ${r.goals||5} met</span></div><div class="prog mt-sm"><i style="width:${(r.met||4)/(r.goals||5)*100}%;background:var(--green)"></i></div></div></div>
      <div class="between" style="margin-bottom:12px"><h4 style="font-size:14px">Competency ratings</h4><span class="muted" style="font-size:11.5px">Overall <b>${r.score}</b> = average of the 5 ratings</span></div>
      <div class="ai-analysis" style="border:none;padding:0;background:none">${crit.map(([c,v])=>{const col=v>=4.5?'var(--green)':v>=3.5?'var(--brand-2)':'var(--amber)';return `<div class="cb-row"><div class="cb-top"><span class="cl">${c}</span><span class="cs" style="color:${col}">${v.toFixed(1)}<span style="color:var(--ink-3);font-weight:400"> / 5</span></span></div><div class="cb-bar"><i style="width:${v/5*100}%;background:${col}"></i></div></div>`;}).join('')}</div>
      <div class="field mt"><label>Individual Development Plan (IDP)</label><textarea class="input">Focus on research output and completion of doctoral units. Nominate for Research & Publication Workshop. Target 2 publications within AY.</textarea></div>
      <div class="alertbar info">${icon('info')} Outstanding/VS ratings may trigger configurable merit increases in Payroll — subject to approval.</div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn" onclick="UI.toast('Saved as draft','info')">Save draft</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Evaluation submitted','ok','Routed for employee acknowledgment')">${icon('send')} Submit & route</button>`});
  };
  MC.computeRanking = function(){
    MC.perfTab='ranking'; MC.go('performance');
    setTimeout(()=>toast('Faculty ranking computed','ok','2 faculty promotion-eligible'),200);
  };
  MC.promote = function(empId){ const e=DB.empById(empId); const f=DB.facultyRanking.find(x=>x.emp===empId);
    modal({title:'Promotion recommendation',sub:e.name+' · '+f.current+' → '+f.next,body:`
      ${rankBreakdownHTML(empId)}
      <div class="card card-pad mt-lg">${kv('Current rank',f.current)}${kv('Recommended rank',f.next)}${kv('Salary impact','+₱6,500 / mo (auto-staged)')}</div>
      <div class="field mt-lg"><label>Approval route</label><div class="row wrap" style="gap:7px"><span class="chip">Dean</span>${icon('arrowRight')}<span class="chip">Faculty Ranking Committee</span>${icon('arrowRight')}<span class="chip">VP Academic Affairs</span></div></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Promotion routed for approval','ok','${e.name} · pending committee review')">${icon('send')} Route for approval</button>`});
  };

  /* ========================================================
     OFFBOARDING & CLEARANCE
     ======================================================== */
  MC.pages.offboarding = function () {
    return {
      title:'Offboarding & Clearance', crumb:'Separation Management',
      html:`
      <div class="page-head"><div><div class="t">Offboarding, Clearance & Separation</div><div class="d">Automated clearance routing, exit interviews, and final pay.</div></div>
        <button class="btn primary" id="ofNew">${icon('logout')} Initiate separation</button></div>

      <div class="mb">${aiBanner(`<b>Attrition analysis:</b> Exit-interview themes point to compensation competitiveness and workload. <button class="btn sm" style="padding:3px 10px;margin-left:4px" onclick="MC.attritionThemes()">${icon('eye')} Themes</button>`)}</div>

      <div class="grid mb" style="grid-template-columns:1fr 1.4fr">
        <div class="card"><div class="card-head"><h3>Active separations</h3></div><div class="card-pad">
          ${DB.separations.map(s=>`<div class="cl-row" style="padding:13px 14px;flex-direction:column;align-items:stretch;gap:9px">
            <div class="row"><div style="flex:1"><b style="font-size:13.5px">${s.emp}</b><div class="muted" style="font-size:11.5px">${s.id} · ${s.type}</div></div>${badge(s.status)}</div>
            <div class="row" style="gap:8px"><div class="prog" style="flex:1"><i style="width:${s.progress}%;background:${s.progress===100?'var(--green)':'var(--brand-2)'}"></i></div><span class="muted" style="font-size:11.5px">${s.progress}%</span></div>
            <div class="row between"><span class="muted" style="font-size:11.5px">Last day: ${fmt.date(s.lastDay)}</span><button class="btn sm" onclick="MC.openClearance('${s.id}')">Clearance</button></div></div>`).join('')}
        </div></div>
        <div class="card"><div class="card-head"><div><h3>Clearance routing — Miguel S. Tan</h3><div class="sub">SEP-0071 · End of contract</div></div><span class="chip">62% cleared</span></div>
          <div class="card-pad">${clearanceList()}</div></div>
      </div>

      <div class="grid g-3">
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:6px">${icon('message')}<b>Exit interview</b></div><p class="muted" style="font-size:12.5px;margin:0 0 12px">Structured digital exit interview with AI theme analysis.</p><button class="btn block" onclick="MC.exitInterview()">${icon('clipboard')} Open exit interview</button></div>
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:6px">${icon('wallet')}<b>Final pay</b></div><p class="muted" style="font-size:12.5px;margin:0 0 12px">Last pay, pro-rated 13th month, leave conversion.</p><button class="btn block" onclick="UI.toast('Final pay computed','ok','₱48,210 · pending Finance clearance')">${icon('coins')} Compute final pay</button></div>
        <div class="card card-pad"><div class="row" style="gap:10px;margin-bottom:6px">${icon('fileText')}<b>Separation docs</b></div><p class="muted" style="font-size:12.5px;margin:0 0 12px">COE, clearance certificate, quitclaim.</p><button class="btn block" onclick="UI.toast('Documents generated','ok','COE + clearance certificate')">${icon('printer')} Generate documents</button></div>
      </div>`,
      onMount(root){ $('#ofNew',root).addEventListener('click',MC.initiateSeparation); }
    };
  };
  function clearanceList(){
    return DB.clearanceOffices.map(o=>{const tone=o.status==='Cleared'?['green','check']:o.status==='In Progress'?['amber','hourglass']:['gray','clock'];
      return `<div class="cl-row" style="padding:11px 14px"><div class="cl-check" style="background:var(--${tone[0]==='gray'?'line-2':tone[0]+'-bg'});color:var(--${tone[0]==='gray'?'ink-3':tone[0]})">${icon(tone[1])}</div>
      <div style="flex:1"><b style="font-size:13px">${o.office}</b>${o.note?`<div class="muted" style="font-size:11.5px">${o.note}</div>`:''}</div>
      <div style="text-align:right">${badge(o.status)}${o.by!=='—'?`<div class="muted" style="font-size:11px;margin-top:3px">${o.by} · ${o.date}</div>`:''}</div></div>`;}).join('')
      + `<div class="alertbar info mt">${icon('link')} Clearance auto-routes to all designated offices; triggers asset & payroll validation.</div>`;
  }
  MC.openClearance = function(id){ const s=DB.separations.find(x=>x.id===id);
    modal({title:'Clearance tracking',sub:`${s.emp} · ${s.id}`,size:'lg',body:clearanceList(),foot:`<button class="btn primary" data-close>Close</button>`});
  };
  MC.initiateSeparation = function(){
    modal({title:'Initiate separation',sub:'Triggers clearance, asset verification & final pay',body:`
      <div class="field"><label>Employee</label><select class="select">${DB.employees.map(e=>`<option>${e.name}</option>`).join('')}</select></div>
      <div class="form-row"><div class="field"><label>Separation type</label><select class="select"><option>Resignation</option><option>End of Contract</option><option>Retirement</option><option>Termination</option></select></div>
        <div class="field"><label>Last working day</label><input class="input" type="date" value="2026-11-30"></div></div>
      <div class="field"><label>Reason / remarks</label><textarea class="input"></textarea></div>
      <div class="alertbar warn">${icon('alertTriangle')}<div style="flex:1">This will auto-trigger: clearance workflow, asset accountability, benefits & payroll validation, exit interview, records archiving.</div></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Separation initiated','ok','Clearance routed to all offices')">${icon('logout')} Initiate</button>`});
  };
  MC.attritionThemes = function(){
    const themes=[['Compensation competitiveness',46,'Pay vs. market & internal equity'],['Career growth & promotion',31,'Unclear advancement timelines'],['Workload & balance',23,'Load during peak terms']];
    modal({title:'Exit-interview themes',sub:'Last 12 months · aggregated',body:`<div class="ai-analysis">
      <div class="between"><span class="hd">${icon('sparkles')} Why people leave</span>${badge('Advisory','amber')}</div>
      <p style="font-size:13px;color:var(--ink-2);margin:12px 0 0;line-height:1.55">Themes are aggregated from structured exit interviews. Attrition is concentrated in <b>contractual faculty</b> near end-of-contract — no single manager cluster detected.</p>
      <div class="mt-sm">${themes.map(t=>`<div class="cb-row"><div class="cb-top"><span class="cl">${t[0]}</span><span class="cw">${t[2]}</span><span class="cs" style="color:var(--violet)">${t[1]}%</span></div><div class="cb-bar"><i style="width:${t[1]}%;background:var(--violet)"></i></div></div>`).join('')}</div>
      <div class="hint mt" style="display:flex;gap:6px;align-items:center">${icon('shield')} Recommendation: review contractual faculty load & comp for AY 2026–2027 — subject to leadership approval.</div></div>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Retention review opened','ok','Routed to HR & academic leadership')">${icon('check')} Open retention review</button>`});
  };
  MC.exitInterview = function(){
    modal({title:'Exit interview',sub:'Digital form · AI theme analysis',size:'lg',body:`
      ${['Primary reason for leaving','Would you recommend MC as an employer?','What could we have done better?'].map((q,i)=>`<div class="field"><label>${q}</label>${i===1?`<div class="row" style="gap:3px">${[1,2,3,4,5].map(n=>`<span style="color:${n<=4?'var(--gold)':'var(--line)'}">${icon('star')}</span>`).join('')}</div>`:`<textarea class="input" style="min-height:60px">${i===0?'Career growth opportunity elsewhere':'More competitive compensation and clearer promotion timelines.'}</textarea>`}</div>`).join('')}
      <div class="card card-pad" style="background:var(--violet-bg);border-color:#d7cbf5"><div class="row" style="gap:8px;color:var(--violet);font-weight:700">${icon('sparkles')} AI theme analysis</div><p style="font-size:13px;margin:8px 0 0;color:var(--ink-2)">Themes across recent exits: <b>compensation</b> (46%), <b>career growth</b> (31%), <b>workload</b> (23%). No single manager cluster detected.</p></div>`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Exit interview saved','ok','Added to attrition analysis')">${icon('check')} Submit</button>`});
  };

  /* ========================================================
     APPROVALS (unified inbox)
     ======================================================== */
  MC.pages.approvals = function () {
    const pending = DB.applications.filter(a=>a.status==='Pending');
    const items = [
      ...pending.map(a=>({t:a.type,who:a.empName,ref:a.id,kind:'Timekeeping',action:`MC.decideApp('${a.id}','Approved')`,act2:`MC.decideApp('${a.id}','Rejected')`})),
      {t:'Job Offer — Diane Rose F. Castro',who:'Recruitment',ref:'OFR-0033',kind:'Recruitment'},
      {t:'Promotion — Dr. Victor H. Ramos',who:'Faculty Ranking',ref:'PRM-0007',kind:'Performance'},
      {t:'Payroll run — Oct 1–15',who:'Payroll',ref:'PR-10-02',kind:'Payroll'},
    ];
    return {
      title:'Approvals', crumb:'Workflow & Notifications',
      html:`
      <div class="page-head"><div><div class="t">Approvals inbox</div><div class="d">All items awaiting your review, across modules.</div></div>
        <button class="btn" onclick="UI.toast('Workflow settings','info','Configure approval routes in Settings')">${icon('settings')} Routes</button></div>
      <div class="card"><div class="card-head"><h3>Pending your approval</h3><span class="badge b-red"><span class="bd"></span>${items.length} items</span></div>
      <div style="padding:8px">${items.map(it=>`<div class="cl-row" style="padding:14px 16px">
        <div class="cl-check" style="background:var(--blue-bg);color:var(--blue)">${icon(kindIcon(it.kind))}</div>
        <div style="flex:1"><b style="font-size:13.5px">${it.t}</b><div class="muted" style="font-size:11.5px">${it.kind} · ${it.ref} · ${it.who}</div></div>
        <div class="row" style="gap:7px">${it.action?`<button class="btn sm primary" onclick="${it.action};this.closest('.cl-row').remove()">${icon('check')} Approve</button><button class="btn sm danger" onclick="${it.act2};this.closest('.cl-row').remove()">${icon('x')}</button>`:`<button class="btn sm primary" onclick="UI.toast('Approved','ok','${it.ref}');this.closest('.cl-row').remove()">${icon('check')} Approve</button><button class="btn sm" onclick="UI.toast('Sent back','warn','${it.ref}');this.closest('.cl-row').remove()">Return</button>`}</div></div>`).join('')}</div></div>`,
    };
  };
  function kindIcon(k){ return {Timekeeping:'calendar',Recruitment:'userPlus',Performance:'award',Payroll:'wallet'}[k]||'checkBig'; }

  /* ========================================================
     REPORTS & ANALYTICS
     ======================================================== */
  MC.pages.reports = function () {
    const cats = [
      { icon:'users', color:'blue', name:'Workforce Analytics', items:['Headcount register','Demographics & diversity','Movement & service records','Tenure & retirement'] },
      { icon:'clock', color:'teal', name:'Attendance & Compliance', items:['Daily time records (DTR)','Tardiness & absenteeism','Leave ledger','Overtime utilization'] },
      { icon:'wallet', color:'green', name:'Payroll & Compensation', items:['Payroll register','Statutory remittances','Budget vs actual','Pay equity analysis'] },
      { icon:'gift', color:'violet', name:'Benefits', items:['Benefits register','Enrollment & utilization','Claims monitoring','Contribution reports'] },
      { icon:'award', color:'amber', name:'Performance', items:['Evaluation summary','Faculty ranking history','Training effectiveness','Competency gaps'] },
      { icon:'logout', color:'red', name:'Attrition & Offboarding', items:['Turnover trends','Exit interview analysis','Clearance status','Final pay register'] },
    ];
    return {
      title:'Reports & Analytics', crumb:'Analytics, Reporting & Data Extraction',
      html:`
      <div class="page-head"><div><div class="t">Reports & Analytics</div><div class="d">Standard and configurable reports with filter, drill-down, and export.</div></div>
        <div class="row wrap"><button class="btn" onclick="UI.toast('Schedule','info','Automated extraction scheduled')">${icon('refresh')} Scheduled extracts</button><button class="btn primary" onclick="UI.toast('Custom report','info','Report builder')">${icon('plus')} Custom report</button></div></div>

      <div class="grid mb" style="grid-template-columns:1fr 1fr">
        <div class="card"><div class="card-head"><h3>Workforce by department</h3></div><div class="card-pad">${charts.bars([{label:'CAS',value:68},{label:'BEU',value:54},{label:'GS',value:47},{label:'HS',value:41},{label:'ICT',value:12},{label:'Admin',value:62}],{color:'var(--brand-2)'})}</div></div>
        <div class="card"><div class="card-head"><h3>Budget vs actual (staff cost, ₱M)</h3></div><div class="card-pad">${charts.groupedBars(['Q1','Q2','Q3','Q4'],[{name:'Budget',color:'var(--line)',data:[42,42,44,44]},{name:'Actual',color:'var(--brand)',data:[40,43,42,41]}])}</div></div>
      </div>

      <div class="grid g-3">
        ${cats.map(c=>`<div class="card card-pad"><div class="row" style="gap:11px;margin-bottom:12px"><div class="stat" style="padding:0"><div class="ic" style="width:40px;height:40px;background:var(--${c.color}-bg);color:var(--${c.color})">${icon(c.icon)}</div></div><b>${c.name}</b></div>
          ${c.items.map(it=>`<div class="between" style="padding:7px 0;border-bottom:1px solid var(--line-2)"><span style="font-size:12.5px">${it}</span><button class="btn sm ghost" onclick="MC.exportCSV('report')" title="Export">${icon('download')}</button></div>`).join('')}
        </div>`).join('')}
      </div>`,
    };
  };

  /* ========================================================
     SETTINGS & ADMIN
     ======================================================== */
  MC.setTab = 'roles';
  MC.pages.settings = function () {
    return {
      title:'Settings & Admin', crumb:'System Administration',
      html:`
      <div class="page-head"><div><div class="t">Settings & Administration</div><div class="d">Access control, security, integrations, AI governance, and workflows.</div></div></div>
      <div class="tabs" id="stTabs">${[['roles','Roles & Access'],['security','Security'],['integrations','Integrations'],['ai','AI Governance'],['workflow','Workflows']].map(([k,l])=>`<div class="tab ${k===MC.setTab?'active':''}" data-t="${k}">${l}</div>`).join('')}</div>
      <div id="stBody"></div>`,
      onMount(root){
        const render=()=>{$('#stBody',root).innerHTML=setBody();};
        $('#stTabs',root).addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(!t)return;MC.setTab=t.dataset.t;$$('.tab',root).forEach(x=>x.classList.toggle('active',x===t));render();});
        render();
      }
    };
  };
  function setBody(){
    if(MC.setTab==='roles'){
      const roles=['HR Administrator','Payroll Officer','Supervisor','Faculty','Employee','Applicant'];
      const perms=['Employee 201','Timekeeping','Payroll','Benefits','Performance','Recruitment','Reports','Settings'];
      const matrix={
        'HR Administrator':[1,1,1,1,1,1,1,1],'Payroll Officer':[0,1,1,1,0,0,1,0],'Supervisor':[2,2,0,0,1,1,2,0],
        'Faculty':[2,2,0,2,2,0,0,0],'Employee':[2,2,0,2,0,0,0,0],'Applicant':[0,0,0,0,0,1,0,0]};
      const cell=(v)=>v===1?`<span style="color:var(--green)">${icon('check')}</span>`:v===2?`<span class="muted" style="font-size:11px">View</span>`:`<span style="color:var(--line)">${icon('x')}</span>`;
      return `<div class="card mb"><div class="card-head"><div><h3>Role-based access control (RBAC)</h3><div class="sub">Configurable permissions per role · principle of least privilege</div></div><button class="btn sm" onclick="UI.toast('Role added','ok','Define permissions')">${icon('plus')} Add role</button></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Role</th>${perms.map(p=>`<th style="text-align:center">${p}</th>`).join('')}</tr></thead>
        <tbody>${roles.map(r=>`<tr><td><b>${r}</b></td>${matrix[r].map(v=>`<td style="text-align:center">${cell(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>
        <div class="card"><div class="card-head"><h3>Users</h3></div><div class="table-wrap"><table class="tbl"><thead><tr><th>User</th><th>Role</th><th>MFA</th><th>Last login</th><th>Status</th></tr></thead>
        <tbody>${DB.employees.slice(0,5).map(e=>`<tr><td class="cell-emp">${avatar(e)}<div><b>${e.name}</b><span>${e.email}</span></div></td><td>${e.dept.includes('Human')?'HR Administrator':'Employee'}</td><td>${badge('Enabled','green')}</td><td class="muted">Today 08:${12+Math.floor(Math.random()*40)}</td><td>${badge('Active')}</td></tr>`).join('')}</tbody></table></div></div>`;
    }
    if(MC.setTab==='security'){
      const items=[['lock','Multi-factor authentication (MFA)','Required for HR, Payroll & Admin roles','Enabled'],['shield','Role-based authorization','Least-privilege access enforced','Enabled'],['database','Encryption at rest & in transit','AES-256 at rest · TLS 1.3 in transit','Enabled'],['fileText','Audit logging','All material actions logged & immutable','Enabled'],['refresh','Backup & recovery','Daily backups · 15-min RPO · DR site','Enabled'],['heartPulse','Data Privacy Act compliance','NPC-registered · breach procedures defined','Compliant']];
      return `<div class="grid g-2 mb">${items.map(([ic,t,d,s])=>`<div class="card card-pad"><div class="row between"><div class="row" style="gap:12px"><div class="stat" style="padding:0"><div class="ic" style="width:40px;height:40px;background:var(--green-bg);color:var(--green)">${icon(ic)}</div></div><div><b style="font-size:13.5px">${t}</b><div class="muted" style="font-size:12px">${d}</div></div></div>${badge(s,'green')}</div></div>`).join('')}</div>
        <div class="card"><div class="card-head"><h3>Audit log</h3><button class="btn sm" onclick="MC.exportCSV('audit')">${icon('download')} Export</button></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>Target</th><th>IP</th></tr></thead>
        <tbody>${DB.auditTrail.map(a=>`<tr><td class="muted" style="font-size:12px">${a.ts}</td><td><b>${a.actor}</b></td><td>${a.action}</td><td class="muted">${a.target}</td><td class="muted" style="font-size:12px">${a.ip}</td></tr>`).join('')}</tbody></table></div></div>`;
    }
    if(MC.setTab==='integrations'){
      const ints=[['fingerprint','M10 Biometric Devices','Fingerprint & facial capture · 6 devices','Connected','green'],['link','Accounting SAP System','Payroll journal entries · secure API','Connected','green'],['smartphone','HRIS Mobile App','iOS & Android · self-service & GPS attendance','Live','green'],['mail','Email / SMTP','Automated notifications','Connected','green'],['database','Employee Master Sync','Onboarding → 201 → Timekeeping → Payroll','Active','green'],['cpu','AI Services','Resume screening, anomaly detection, assistant','Enabled','violet']];
      return `<div class="mb">${aiBanner(`Integration is a core requirement. Modules share one employee master — no duplicate encoding across Recruitment → Onboarding → 201 → Timekeeping → Payroll → Benefits.`)}</div>
      <div class="grid g-2">${ints.map(([ic,t,d,s,c])=>`<div class="card card-pad"><div class="row between"><div class="row" style="gap:12px"><div class="stat" style="padding:0"><div class="ic" style="width:42px;height:42px;background:var(--${c}-bg);color:var(--${c})">${icon(ic)}</div></div><div><b style="font-size:14px">${t}</b><div class="muted" style="font-size:12px">${d}</div></div></div></div>
        <div class="row between mt-lg">${badge(s,c)}<button class="btn sm" onclick="UI.toast('Connection tested','ok','${t} · healthy')">${icon('refresh')} Test</button></div></div>`).join('')}</div>`;
    }
    if(MC.setTab==='ai'){
      const caps=[['Resume screening & ranking','Recruitment','Native','Advisory — committee decides'],['Attendance anomaly detection','Timekeeping','Native','Advisory — supervisor reviews'],['Payroll validation','Payroll','Native','Advisory — officer confirms'],['Attrition & succession prediction','Performance','Native','Advisory — leadership reviews'],['HR Assistant (chat)','Global','Integrated','Read-only insights'],['Exit interview analysis','Offboarding','Native','Advisory']];
      return `<div class="card card-pad mb" style="background:var(--violet-bg);border-color:#d7cbf5"><div class="row" style="gap:10px;color:var(--violet);font-weight:700;font-size:15px">${icon('shield')} AI Governance & Responsible Use</div>
        <p style="font-size:13.5px;color:var(--ink-2);margin:10px 0 0;line-height:1.6">The College retains <b>human oversight</b> over all decisions affecting employment, compensation, performance, ranking, promotion, benefits eligibility, and separation. AI recommendations <b>never auto-execute</b> — an authorized person always approves.</p></div>
      <div class="card"><div class="card-head"><h3>AI capability register</h3></div><div class="table-wrap"><table class="tbl"><thead><tr><th>Capability</th><th>Module</th><th>Type</th><th>Human oversight</th><th>Toggle</th></tr></thead>
      <tbody>${caps.map(([c,m,t,o])=>`<tr><td><b>${c}</b></td><td class="muted">${m}</td><td>${badge(t,t==='Native'?'teal':'blue')}</td><td><span class="ai-flag">${icon('shield')} ${o}</span></td><td><div class="seg"><button class="active" style="padding:4px 10px">On</button><button style="padding:4px 10px">Off</button></div></td></tr>`).join('')}</tbody></table></div>
      <div class="hint" style="padding:12px 16px">Data retention: prompts & documents are not used to train external models · processing arrangements disclosed per TOR.</div></div>`;
    }
    const flows=[['Leave / OB / OT','Employee → Supervisor → HR'],['Personnel Requisition','Dept. Head → HR → Finance → VP Admin'],['Job Offer','Dept. Head → HR → VP Admin'],['Promotion','Dean → Ranking Committee → VP Acad'],['Payroll','Payroll Officer → Finance Director → VP Admin'],['Clearance','Auto-route to 9 offices in parallel']];
    return `<div class="card"><div class="card-head"><div><h3>Approval workflows</h3><div class="sub">Configurable routes per the College's policies</div></div><button class="btn sm" onclick="UI.toast('Workflow editor','info','Drag to reorder approval steps')">${icon('edit')} Configure</button></div>
      <div style="padding:8px">${flows.map(([t,r])=>`<div class="cl-row" style="padding:14px 16px"><div class="cl-check" style="background:var(--blue-bg);color:var(--blue)">${icon('refresh')}</div><div style="flex:1"><b style="font-size:13.5px">${t}</b><div class="muted" style="font-size:12px;margin-top:3px">${r.split(' → ').map(s=>`<span class="chip" style="margin-right:4px">${s}</span>`).join('<span style="color:var(--ink-3)">→</span> ')}</div></div><span class="badge b-green"><span class="bd"></span>Active</span></div>`).join('')}</div></div>`;
  }

  /* ========================================================
     EXPORT
     ======================================================== */
  MC.exportCSV = function(type){
    let rows=[['Export'],['Generated',new Date().toISOString()]];
    if(type==='employees'){ rows=[['ID','Name','Position','Department','Campus','Type','Status','Date Hired'],...DB.employees.map(e=>[e.id,e.name,e.position,e.dept,e.campus,e.type,e.status,e.hired])]; }
    else if(type==='attendance'){ rows=[['ID','Name','Time In','Method','Status'],...DB.attendanceToday.map(a=>{const e=DB.empById(a.id);return [a.id,e?e.name:'',a.timeIn,a.mode,a.status];})]; }
    else if(type==='statutory'){ rows=[['ID','Name','Tax','SSS','PhilHealth','Pag-IBIG'],...DB.payrollRun.items.map(it=>{const e=DB.empById(it.id);return [it.id,e?e.name:'',it.tax,it.sss,it.phic,it.hdmf];})]; }
    else if(type==='audit'){ rows=[['Timestamp','Actor','Action','Target','IP'],...DB.auditTrail.map(a=>[a.ts,a.actor,a.action,a.target,a.ip])]; }
    const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    download(`mc-hris-${type}-${Date.now()}.csv`,csv);
    toast('Export ready','ok',`${type}.csv downloaded`);
  };

  /* ---------- small helpers ---------- */
  function daysTo(iso){ return Math.max(0,Math.round((new Date(iso)-Date.now())/864e5)); }
  window.daysTo = daysTo;
  function roleFirst(){ return (roleName_()||'there').split(' ')[0]; }
  function roleName_(){ return { 'HR Administrator':'Noel','Employee':'Roberto','Supervisor':'Jasmin','Applicant':'Diane' }[MC.state.role]||'there'; }
})();
