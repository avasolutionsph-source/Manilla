/* ============================================================
   Miriam College HRIS — Game-changer features
   Command Center · Org Chart · Budget Simulator · Onboarding · Compliance
   ============================================================ */
(function () {
  const { icon, fmt, avatar, toast, modal, closeModal, drawer, closeDrawer, charts } = UI;
  const badge = MC.badge, stat = MC.stat;
  const kv = (k,v) => `<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`;
  const aiRow = (t) => `<div class="alertbar ai">${icon('sparkles')}<div style="flex:1">${t}</div><span class="ai-flag">${icon('shield')} Decision-support only</span></div>`;

  /* ========================================================
     1. MANAGEMENT COMMAND CENTER
     ======================================================== */
  MC.pages.command_center = function () {
    const gender = [{label:'Female',value:63,color:'var(--brand-2)'},{label:'Male',value:37,color:'var(--navy-700)'}];
    return { title:'Command Center', crumb:'Executive Command Center',
      html:`
      <div class="hero">
        <div class="portal-tag" style="background:rgba(255,255,255,.14);color:#d6c8f7">${icon('activity')} Executive View</div>
        <h2 style="margin-top:12px">Workforce at a glance — all campuses</h2>
        <p>Good day, VP Laurel. Headcount is stable at 412, attrition is below benchmark, and the personnel budget is 94% utilized and on track. 2 leadership roles need succession attention.</p>
        <div class="hero-actions"><button class="btn gold" onclick="MC.go('budget_sim')">${icon('coins')} Model a scenario</button><button class="btn" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.2)" onclick="MC.openAI()">${icon('sparkles')} Ask the assistant</button></div>
      </div>

      <div class="mb">${aiRow(`<b>AI executive summary:</b> Workforce health is strong. Watch contractual-faculty attrition (7 flagged) and 2 succession gaps. A 5% merit increase is affordable within a 2.1% budget buffer.`)}</div>

      <div class="kpi6 mb">
        ${miniKpi('412','Total workforce','navy')}
        ${miniKpi('6.2%','Attrition (YoY)','green')}
        ${miniKpi('₱236.3M','Annual cost','blue')}
        ${miniKpi('4.1/5','Engagement','violet')}
        ${miniKpi('28d','Time-to-fill','amber')}
        ${miniKpi('0.75','Faculty : staff','teal')}
      </div>

      <div class="grid mb" style="grid-template-columns:1.5fr 1fr">
        <div class="card"><div class="card-head"><div><h3>Attrition forecast</h3><div class="sub">Actual + 4-month AI projection</div></div><div class="row" style="gap:8px"><span class="ai-flag">${icon('sparkles')} Predictive</span><button class="btn sm" onclick="MC.execAttrition()">${icon('eye')} Explain</button></div></div>
          <div class="card-pad">${charts.line([5.8,6.0,6.4,6.1,6.2,6.3,6.1,6.0,6.2,6.4],{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],color:'var(--brand-2)'})}
          <div class="hint" style="margin-top:6px">Dashed region beyond Oct is AI-projected. Forecast band: 6.0–6.5%.</div></div></div>
        <div class="card"><div class="card-head"><h3>Succession readiness</h3><button class="btn sm" onclick="MC.execSuccession()">${icon('eye')} Details</button></div><div class="card-pad" style="text-align:center">
          ${charts.ring(78,{size:150,color:'var(--brand-2)',label:'roles covered'})}
          <div class="row" style="justify-content:center;gap:18px;margin-top:14px">
            <div><div style="font-size:20px;font-weight:800;color:var(--green)">7</div><div class="muted" style="font-size:11.5px">Ready now</div></div>
            <div><div style="font-size:20px;font-weight:800;color:var(--amber)">2</div><div class="muted" style="font-size:11.5px">At risk</div></div>
            <div><div style="font-size:20px;font-weight:800;color:var(--brand)">11</div><div class="muted" style="font-size:11.5px">In pipeline</div></div>
          </div></div></div>
      </div>

      <div class="grid mb" style="grid-template-columns:1.5fr 1fr">
        <div class="card"><div class="card-head"><h3>Campus comparison</h3></div><div class="card-pad">
          ${charts.groupedBars(['Quezon City','Nuvali','Alviera'],[
            {name:'Headcount',color:'var(--brand)',data:[258,101,53]},
            {name:'Attendance %',color:'var(--teal)',data:[95,95,93]},
            {name:'Cost (₱M)',color:'var(--gold)',data:[148,61,27]},
          ])}</div></div>
        <div class="card"><div class="card-head"><h3>Diversity</h3></div><div class="card-pad">${charts.donut(gender,{center:'63%',centerSub:'female'})}${charts.legend(gender.map(g=>({...g,value:g.value+'%'})))}
          <div class="mt-lg">${kv('Avg. tenure','8.4 yrs')}${kv('Regularization rate','87%')}</div></div></div>
      </div>

      <div class="card"><div class="card-head"><div><h3>Strategic watchlist</h3><div class="sub">AI-flagged · with recommended actions (you approve)</div></div></div>
        <div style="padding:8px">
          ${watch('alertTriangle','amber','Succession gap — 2 leadership roles','No ready-now successor within 12 months','Accelerate 3 development plans')}
          ${watch('logout','red','Contractual faculty attrition','7 flagged as elevated risk near end-of-contract','Initiate early retention conversations')}
          ${watch('coins','green','Budget headroom','2.1% buffer remains in personnel budget','Supports a 5% merit cycle')}
          ${watch('clock','blue','Retirement wave','4 employees within 3 years','Begin knowledge-transfer planning')}
        </div></div>`,
    };
  };
  function miniKpi(v,l,c){ return `<div class="card card-pad" style="padding:16px"><div class="v" style="font-size:22px;font-weight:800;color:var(--${c==='navy'?'brand':c})">${v}</div><div class="muted" style="font-size:11.5px;margin-top:2px">${l}</div></div>`; }
  function watch(ic,c,t,d,rec){ return `<div class="cl-row" style="padding:13px 15px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon(ic)}</div>
    <div style="flex:1"><b style="font-size:13.5px">${t}</b><div class="muted" style="font-size:11.5px">${d}</div></div>
    <div style="text-align:right;max-width:240px;display:flex;flex-direction:column;align-items:flex-end;gap:7px"><span class="ai-flag" style="white-space:normal">${icon('sparkles')} ${rec}</span><button class="btn sm" onclick="UI.toast('Routed for approval','ok','${rec.replace(/'/g,'')}')">Act on this</button></div></div>`; }

  MC.execAttrition = function(){
    const segs=[['Contractual faculty',11.4,'Largest driver · end-of-contract'],['Probationary staff',7.8,'Early-tenure turnover'],['Regular faculty',3.1,'Stable'],['Regular staff / admin',2.6,'Stable']];
    const col=v=>v>=8?'var(--red)':v>=5?'var(--amber)':'var(--green)';
    modal({title:'Attrition forecast — how it is derived',sub:'Next-quarter projection 6.0–6.5%',body:`<div class="ai-analysis">
      <div class="between"><span class="hd">${icon('sparkles')} Forecast drivers</span>${badge('Predictive','violet')}</div>
      <p style="font-size:13px;color:var(--ink-2);margin:12px 0 0;line-height:1.55">The trailing 12-month rate is <b>6.2%</b>; the model projects <b>6.0–6.5%</b> next quarter. The biggest driver is contractual faculty nearing end-of-contract. Exit-interview themes: compensation (46%), career growth (31%), workload (23%).</p>
      <div class="muted" style="font-size:11.5px;margin-top:14px">Attrition rate by segment:</div>
      <div class="mt-sm">${segs.map(s=>`<div class="cb-row"><div class="cb-top"><span class="cl">${s[0]}</span><span class="cw">${s[2]}</span><span class="cs" style="color:${col(s[1])}">${s[1]}%</span></div><div class="cb-bar"><i style="width:${s[1]/12*100}%;background:${col(s[1])}"></i></div></div>`).join('')}</div>
      <div class="hint mt" style="display:flex;gap:6px;align-items:center">${icon('shield')} Decision-support only · model reviewed monthly, with human oversight.</div></div>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Retention plan drafted','ok','For 3 high-performing contractual faculty')">${icon('check')} Draft retention plan</button>`});
  };
  MC.execSuccession = function(){
    const roles=[['Director, Property & Supply','No ready-now successor · ~18 months out','Accelerate IDP'],['Dean — one academic unit','Retirement within 3 years · thin pipeline','Develop 2 candidates']];
    modal({title:'Succession readiness — detail',sub:'18 critical roles tracked',body:`<div class="ai-analysis">
      <div class="between"><span class="hd">${icon('sparkles')} Coverage</span>${badge('78% covered','blue')}</div>
      <div class="row mt" style="justify-content:space-between;max-width:340px">
        <div><b style="font-size:20px;color:var(--green)">7</b> <span class="muted" style="font-size:12px">ready now</span></div>
        <div><b style="font-size:20px;color:var(--brand)">11</b> <span class="muted" style="font-size:12px">in pipeline</span></div>
        <div><b style="font-size:20px;color:var(--amber)">2</b> <span class="muted" style="font-size:12px">at risk</span></div></div>
      <div class="muted" style="font-size:11.5px;margin-top:16px">Roles needing attention:</div>
      <div class="mt-sm">${roles.map(r=>`<div class="cl-row" style="padding:11px 13px;margin-bottom:8px"><div class="cl-check" style="background:var(--surface-2);color:var(--brand)">${icon('alertTriangle')}</div><div style="flex:1"><b style="font-size:13px">${r[0]}</b><div class="muted" style="font-size:11.5px">${r[1]}</div></div><span class="ai-flag" style="white-space:normal">${r[2]}</span></div>`).join('')}</div>
      <div class="hint mt" style="display:flex;gap:6px;align-items:center">${icon('shield')} Advisory · appointments require Board / VP approval.</div></div>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn primary" onclick="UI.closeModal();UI.toast('Development plans accelerated','ok','3 successors flagged for fast-track')">${icon('check')} Accelerate plans</button>`});
  };

  /* ========================================================
     2. INTERACTIVE ORG CHART
     ======================================================== */
  const ORG = [
    { vp:'VP for Administration', head:'Dr. Rosario P. Laurel', color:'#17295f', depts:['Human Resources Division','Finance & Accounting','Information & Communications Technology Office','Property & Supply','Security Office'] },
    { vp:'VP for Academic Affairs', head:'Dr. Teresa M. Aguinaldo', color:'#1d3473', depts:['College of Arts & Sciences','Basic Education Unit','Grade School','High School','Library Services','Research & Publications'] },
    { vp:'VP for Mission & Identity', head:'Sr. Ma. Consolacion V. Reyes', color:'#17295f', depts:['Campus Ministry','Guidance & Counseling','Student Affairs'] },
  ];
  const deptHead = { 'Human Resources Division':'Noel C. Racho','Information & Communications Technology Office':'Ma. Jasmin B. Velasco','College of Arts & Sciences':'Dean, CAS','Library Services':'Chief Librarian','Guidance & Counseling':'Dean of Student Affairs','Campus Ministry':'Sr. M. Lopez' };
  MC.orgCampus = 'All';
  MC.pages.org_chart = function () {
    return { title:'Organizational Chart', crumb:MC.ROLES[MC.state.role].portal,
      html:`
      <div class="page-head"><div><div class="t">Organizational Chart & Workforce Map</div><div class="d">Live reporting structure across all campuses — open positions highlighted.</div></div>
        <div class="seg" id="orgSeg">${['All',...DB.campuses].map(c=>`<button class="${c===MC.orgCampus?'active':''}" data-c="${c}">${c==='All'?'All campuses':c}</button>`).join('')}</div></div>
      <div id="orgBody"></div>`,
      onMount(root){
        const render=()=>{ $('#orgBody',root).innerHTML = orgHTML(); wireOrg(root); };
        $('#orgSeg',root).addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;MC.orgCampus=b.dataset.c;$$('#orgSeg button',root).forEach(x=>x.classList.toggle('active',x===b));render();});
        render();
      }
    };
  };
  function deptCount(dept){ return DB.employees.filter(e=>e.dept===dept && (MC.orgCampus==='All'||e.campus===MC.orgCampus)).length; }
  function deptVac(dept){ return DB.jobs.filter(j=>j.status==='Open' && j.dept===dept).length; }
  function orgHTML(){
    const total = DB.employees.filter(e=>MC.orgCampus==='All'||e.campus===MC.orgCampus).length;
    const totalVac = DB.jobs.filter(j=>j.status==='Open').length;
    return `<div class="org">
      <div class="org-node lvl0"><div class="oic" style="background:rgba(255,255,255,.14)">${icon('building')}</div><div><b>Office of the President</b><span>Miriam College · ${MC.orgCampus==='All'?'All campuses':MC.orgCampus}</span></div>
        <div class="cnt"><span class="chip" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.2)">${total} employees</span>${totalVac?`<span class="badge b-amber"><span class="bd"></span>${totalVac} open</span>`:''}</div></div>
      <div class="org-children">
        ${ORG.map(v=>{ const vpCount=v.depts.reduce((a,d)=>a+deptCount(d),0); if(MC.orgCampus!=='All'&&vpCount===0) return '';
          return `<div class="org-branch"><div class="org-node lvl1" data-vp="${v.vp}"><div class="oic" style="background:${v.color}">${icon('users')}</div><div><b>${v.vp}</b><span>${v.head}</span></div><div class="cnt"><span class="chip">${vpCount}</span></div></div>
          <div class="org-children">
            ${v.depts.map(d=>{ const c=deptCount(d); const vac=deptVac(d); if(MC.orgCampus!=='All'&&c===0) return '';
              return `<div class="org-node lvl2" data-dept="${d}"><div class="oic" style="background:var(--navy-600)">${icon('layers')}</div>
                <div><b>${d}</b><span>${deptHead[d]||'Department Head'}</span></div>
                <div class="cnt">${vac?`<span class="badge b-amber"><span class="bd"></span>${vac} vacancy</span>`:''}<span class="chip">${c} staff</span></div></div>`;}).join('')}
          </div></div>`;}).join('')}
      </div></div>`;
  }
  function wireOrg(root){ $$('[data-dept]',root).forEach(n=>n.addEventListener('click',()=>MC.orgDept(n.dataset.dept))); }
  MC.orgDept = function(dept){
    const members = DB.employees.filter(e=>e.dept===dept && (MC.orgCampus==='All'||e.campus===MC.orgCampus));
    const vac = DB.jobs.filter(j=>j.status==='Open' && j.dept===dept);
    drawer({title:'Department',body:`<div style="padding:20px">
      <h3 style="font-size:17px">${dept}</h3><div class="muted">${deptHead[dept]||'Department Head'} · ${members.length} staff</div>
      ${vac.length?`<div class="alertbar warn mt-lg">${icon('userPlus')}<div style="flex:1"><b>${vac.length} open position(s)</b> — ${vac.map(v=>v.title).join(', ')}</div></div>`:''}
      <div class="mt-lg">${members.length?members.map(e=>`<div class="cl-row" style="padding:10px 13px">${avatar(e)}<div style="flex:1"><b style="font-size:13px">${e.name}</b><div class="muted" style="font-size:11.5px">${e.position} · ${e.campus}</div></div>${badge(e.status)}</div>`).join(''):`<div class="muted">No staff in this campus view.</div>`}</div>
    </div>`});
  };

  /* ========================================================
     3. WORKFORCE COST & BUDGET SIMULATOR
     ======================================================== */
  const BASE_COST = 236300000, BUDGET = 248000000, AVG_HIRE = 780000, PROMO_INC = 78000;
  MC.pages.budget_sim = function () {
    return { title:'Budget & Planning', crumb:MC.ROLES[MC.state.role].portal,
      html:`
      <div class="page-head"><div><div class="t">Workforce Cost & Budget Simulator</div><div class="d">Model "what-if" scenarios — merit increases, new hires, promotions — against the approved budget.</div></div>
        <button class="btn" onclick="UI.toast('Scenario saved','ok','Snapshot saved for board review')">${icon('download')} Save scenario</button></div>
      <div class="grid mb" style="grid-template-columns:1fr 1fr">
        <div class="card"><div class="card-head"><h3>Assumptions</h3><button class="btn sm" id="simReset">Reset</button></div><div class="card-pad">
          ${slider('merit','Merit / salary increase','%',0,10,0,0.5)}
          ${slider('hires','New hires (annualized)','',0,25,0,1)}
          ${slider('promos','Promotions this cycle','',0,15,0,1)}
          ${slider('allow','Allowance adjustment','%',0,15,0,0.5)}
        </div></div>
        <div class="card"><div class="card-head"><h3>Projection</h3><span class="chip">Approved budget: ${fmt.peso(BUDGET)}</span></div><div class="card-pad">
          <div class="sim-result"><div style="color:#c7d2ef;font-size:12.5px">Projected annual personnel cost</div>
            <div class="big" id="simCost">${fmt.peso(BASE_COST)}</div>
            <div id="simDelta"></div>
            <div style="height:1px;background:rgba(255,255,255,.12);margin:18px 0"></div>
            <div class="between"><span style="color:#c7d2ef">Budget utilization</span><b id="simUtil" style="font-size:18px">95.3%</b></div>
            <div class="prog" style="margin-top:8px;background:rgba(255,255,255,.14)"><i id="simBar" style="width:95%;background:#fff"></i></div>
            <div class="between" style="margin-top:12px"><span style="color:#c7d2ef">Variance vs budget</span><b id="simVar">${fmt.peso(BUDGET-BASE_COST)}</b></div>
          </div>
          <div id="simWarn" class="mt"></div>
        </div></div>
      </div>
      <div class="card"><div class="card-head"><h3>Projected cost by campus</h3></div><div class="card-pad" id="simCampus"></div></div>`,
      onMount(root){
        const ids=['merit','hires','promos','allow'];
        const recompute=()=>{
          const v = Object.fromEntries(ids.map(id=>[id,parseFloat($('#sim_'+id,root).value)]));
          ids.forEach(id=>$('#simval_'+id,root).textContent = (id==='merit'||id==='allow'? v[id].toFixed(1)+'%' : v[id]));
          const merit=BASE_COST*v.merit/100, hire=v.hires*AVG_HIRE, promo=v.promos*PROMO_INC, allow=BASE_COST*0.08*(v.allow/100);
          const proj=BASE_COST+merit+hire+promo+allow; const delta=proj-BASE_COST; const util=proj/BUDGET*100; const variance=BUDGET-proj;
          $('#simCost',root).textContent=fmt.peso(proj);
          $('#simDelta',root).innerHTML = delta>0?`<span class="sim-delta" style="background:rgba(255,255,255,.14);color:#ffd9a8">${icon('trendingUp')} +${fmt.peso(delta)} vs current</span>`:`<span class="sim-delta" style="background:rgba(255,255,255,.14);color:#9fe3c0">At current cost</span>`;
          $('#simUtil',root).textContent=util.toFixed(1)+'%';
          $('#simBar',root).style.width=Math.min(util,100)+'%';
          $('#simBar',root).style.background = util>100?'var(--red)':util>98?'#ffb3b3':'#fff';
          $('#simVar',root).textContent = (variance>=0?'':'−')+fmt.peso(Math.abs(variance));
          $('#simVar',root).style.color = variance<0?'#ff9a9a':'#fff';
          $('#simWarn',root).innerHTML = util>100
            ? `<div class="alertbar warn">${icon('alertTriangle')}<div style="flex:1">This scenario <b>exceeds the approved budget</b> by ${fmt.peso(proj-BUDGET)}. Requires board approval or offsetting measures.</div></div>`
            : `<div class="alertbar info">${icon('checkCircle')}<div style="flex:1">Within budget — ${fmt.peso(variance)} headroom remains.</div></div>`;
          const shareQC=.63,shareNU=.25,shareAL=.12;
          $('#simCampus',root).innerHTML = charts.bars([
            {label:'Quezon City',value:Math.round(proj*shareQC/1e6),color:'var(--brand)'},
            {label:'Nuvali',value:Math.round(proj*shareNU/1e6),color:'var(--brand)'},
            {label:'Alviera',value:Math.round(proj*shareAL/1e6),color:'var(--brand)'},
          ],{fmt:(v)=>'₱'+v+'M'});
        };
        ids.forEach(id=>$('#sim_'+id,root).addEventListener('input',recompute));
        $('#simReset',root).addEventListener('click',()=>{ids.forEach(id=>$('#sim_'+id,root).value=0);recompute();toast('Reset to baseline','info');});
        recompute();
      }
    };
  };
  function slider(id,label,unit,min,max,val,step){
    return `<div class="sim-slider"><div class="between"><label>${label}</label><span class="val" id="simval_${id}">${unit==='%'?val.toFixed(1)+'%':val}</span></div>
      <input type="range" id="sim_${id}" min="${min}" max="${max}" step="${step}" value="${val}"></div>`;
  }

  /* ========================================================
     4. DIGITAL ONBOARDING
     ======================================================== */
  const taskTpl = () => ([
    { t:'Offer accepted & contract e-signed', auto:false, done:true },
    { t:'201 File auto-created from recruitment data', auto:true, done:true },
    { t:'Email & IT accounts provisioned', auto:true, done:false },
    { t:'Biometric enrollment (M10 / Facial)', auto:false, done:false },
    { t:'Attendance account activated', auto:true, done:false },
    { t:'Payroll record created', auto:true, done:false },
    { t:'Benefits auto-enrollment (SSS, PhilHealth, HMO…)', auto:true, done:false },
    { t:'New-hire orientation scheduled', auto:false, done:false },
  ]);
  MC.ONBOARDING = [
    { id:'ONB-002', name:'Reina M. Bautista', pos:'Assistant Professor — Mathematics', dept:'College of Arts & Sciences', campus:'Quezon City', start:'2026-11-03', color:'#1d3473', initials:'RB', tasks:taskTpl().map((t,i)=>({...t,done:i<5})) },
    { id:'ONB-003', name:'Patricia Anne L. Yu', pos:'IT Support Specialist', dept:'ICT Office', campus:'Quezon City', start:'2026-11-10', color:'#17295f', initials:'PY', tasks:taskTpl().map((t,i)=>({...t,done:i<2})) },
  ];
  MC.startOnboarding = function(){
    if (MC.ONBOARDING.find(o=>o.id==='ONB-004')) return;
    MC.ONBOARDING.unshift({ id:'ONB-004', name:'Diane Rose F. Castro', pos:'IT Support Specialist', dept:'ICT Office', campus:'Quezon City', start:'2026-11-03', color:'#17295f', initials:'DC', tasks:taskTpl().map((t,i)=>({...t,done:i<1})) });
  };
  const onbProgress = (o) => Math.round(o.tasks.filter(t=>t.done).length / o.tasks.length * 100);
  MC.pages.onboarding = function () {
    return { title:'Digital Onboarding', crumb:'Talent · Onboarding',
      html:`
      <div class="mb">${aiRow(`<b>Zero re-encoding:</b> accepted candidates flow straight into onboarding. The 201 File, attendance account, payroll record, and benefits are provisioned automatically from recruitment data.`)}</div>
      <div class="page-head"><div><div class="t">Onboarding Journey</div><div class="d">Guided onboarding with automatic provisioning across modules.</div></div>
        <button class="btn primary" onclick="UI.toast('New onboarding','info','Select an accepted candidate to begin')">${icon('userPlus')} Start onboarding</button></div>
      <div class="grid g-3 mb">
        ${stat({icon:'userCheck',color:'violet',value:String(MC.ONBOARDING.length),label:'In onboarding'})}
        ${stat({icon:'refresh',color:'teal',value:'100%',label:'Auto-provisioned fields'})}
        ${stat({icon:'clock',color:'amber',value:'3.2 days',label:'Avg. time-to-productive'})}
      </div>
      <div class="card"><div class="card-head"><h3>Active onboarding</h3></div>
        <div style="padding:8px" id="onbList">${MC.ONBOARDING.map(onbRow).join('')}</div></div>`,
      onMount(root){ $$('#onbList [data-onb]',root).forEach(el=>el.addEventListener('click',()=>MC.openOnboarding(el.dataset.onb))); }
    };
  };
  function onbRow(o){ const p=onbProgress(o);
    return `<div class="cl-row clickable" data-onb="${o.id}" style="padding:14px 16px;cursor:pointer">
      <div class="ava-md" style="background:${o.color}">${o.initials}</div>
      <div style="flex:1"><b style="font-size:13.5px">${o.name}</b><div class="muted" style="font-size:11.5px">${o.pos} · ${o.dept} · starts ${fmt.date(o.start)}</div>
        <div class="row" style="gap:8px;margin-top:7px"><div class="prog" style="flex:1;max-width:260px"><i style="width:${p}%;background:${p===100?'var(--green)':'var(--brand-2)'}"></i></div><span class="muted" style="font-size:11.5px">${p}%</span></div></div>
      ${p===100?badge('Completed'):badge('In Progress')}<button class="btn sm">${icon('arrowRight')}</button></div>`;
  }
  MC.openOnboarding = function(id){
    const o = MC.ONBOARDING.find(x=>x.id===id); if(!o) return;
    const render = () => {
      const p=onbProgress(o);
      drawer({title:'Onboarding checklist',body:`<div style="padding:20px">
        <div class="row" style="gap:13px"><div class="ava-lg" style="background:${o.color}">${o.initials}</div><div><h3 style="font-size:18px">${o.name}</h3><div class="muted">${o.pos}</div><div class="row mt-sm" style="gap:7px">${badge(o.campus,'teal')}<span class="chip">Starts ${fmt.date(o.start)}</span></div></div></div>
        <div class="card card-pad mt-lg"><div class="between"><b style="font-size:13px">Overall progress</b><b style="color:var(--brand)">${p}%</b></div><div class="prog mt-sm"><i style="width:${p}%;background:${p===100?'var(--green)':'var(--brand-2)'}"></i></div></div>
        <h4 style="font-size:13.5px;margin:20px 0 10px">Checklist</h4>
        ${o.tasks.map((t,i)=>`<div class="cl-row" style="padding:11px 14px;margin-bottom:8px;cursor:pointer" data-task="${i}">
          <div class="cl-check" style="background:${t.done?'var(--green-bg)':'var(--line-2)'};color:${t.done?'var(--green)':'var(--ink-3)'}">${icon(t.done?'check':'clock')}</div>
          <div style="flex:1;font-size:12.8px;${t.done?'':'font-weight:600'}">${t.t}</div>${t.auto?`<span class="chip" style="color:var(--ink-2)">${icon('refresh')} Auto</span>`:''}</div>`).join('')}
        <div class="alertbar info mt">${icon('link')} Auto tasks are completed by the system from recruitment data — no manual encoding.</div>
        ${p===100?`<button class="btn primary block mt-lg" onclick="UI.toast('Onboarding complete','ok','${o.name} is now an active employee');UI.closeDrawer()">${icon('check')} Finish & activate employee</button>`:''}
      </div>`});
      $$('#drawer [data-task]').forEach(el=>el.addEventListener('click',()=>{ const i=+el.dataset.task; o.tasks[i].done=!o.tasks[i].done; render(); const list=$('#onbList'); if(list){ const row=list.querySelector(`[data-onb="${o.id}"]`); if(row) row.outerHTML=onbRow(o); $$('#onbList [data-onb]').forEach(x=>x.addEventListener('click',()=>MC.openOnboarding(x.dataset.onb))); } }));
    };
    render();
  };

  /* ========================================================
     5. PH COMPLIANCE & GOVERNMENT REPORTING CENTER
     ======================================================== */
  const AGENCIES = [
    { name:'BIR', full:'Bureau of Internal Revenue', color:'blue', icon:'receipt', reports:[['Form 2316 (Annual)','Jan 31','Ready'],['Form 1601-C (Monthly)','Oct 10','Filed'],['Alphalist of Employees','Jan 31','Scheduled']] },
    { name:'SSS', full:'Social Security System', color:'green', icon:'shield', reports:[['R-3 Contribution','Oct 31','Ready'],['R-5 Payment','Oct 31','Ready'],['Loan remittance','Oct 31','Filed']] },
    { name:'PhilHealth', full:'Philippine Health Insurance', color:'teal', icon:'heartPulse', reports:[['RF-1 Remittance','Oct 31','Ready'],['ER2 (New members)','On change','Filed']] },
    { name:'Pag-IBIG', full:'Home Development Mutual Fund', color:'amber', icon:'home', reports:[['MCRF Remittance','Oct 31','Ready'],['MSVS (MP2)','Oct 31','Scheduled']] },
    { name:'DOLE', full:'Department of Labor & Employment', color:'violet', icon:'clipboard', reports:[['Establishment Report','Annual','Scheduled'],['13th Month Report','Dec 15','Scheduled']] },
    { name:'CHED', full:'Commission on Higher Education', color:'navy', icon:'gradCap', reports:[['Faculty Profile Report','Per term','Ready'],['Faculty Ranking Submission','Annual','Scheduled']] },
  ];
  /* ========================================================
     6b. AI DOCUMENT GENERATOR (Tier-2)
     ======================================================== */
  const DOCTYPES = [
    { k:'coe', icon:'badgeCheck', name:'Certificate of Employment', sub:'Standard COE' },
    { k:'comp', icon:'coins', name:'Certificate of Compensation', sub:'For loans / visa' },
    { k:'offer', icon:'fileText', name:'Job Offer Letter', sub:'For new hires' },
    { k:'contract', icon:'scroll', name:'Employment Contract', sub:'Appointment contract' },
    { k:'memo', icon:'clipboard', name:'Memorandum', sub:'HR advisory / notice' },
    { k:'service', icon:'award', name:'Certificate of Service', sub:'Tenure & record' },
  ];
  MC.docState = { type:'coe', empId:'MC-1035', purpose:'' };
  MC.pages.documents = function () {
    return { title:'AI Document Generator', crumb:'System · Documents',
      html:`
      <div class="mb">${aiRow(`<b>AI-assisted drafting:</b> generates HR documents from live 201 data in seconds. Every draft is <b>reviewed and signed by an authorized person</b> before release — AI never issues documents on its own.`)}</div>
      <div class="page-head"><div><div class="t">AI Document Generator</div><div class="d">COEs, contracts, offer letters, and memos — drafted from employee records.</div></div></div>
      <div class="doc-layout">
        <div class="card"><div class="card-head"><h3>Create a document</h3></div><div class="card-pad">
          <label style="font-size:12.5px;font-weight:600;color:var(--ink-2);display:block;margin-bottom:8px">Document type</label>
          <div id="docTypes">${DOCTYPES.map(d=>`<div class="doctype ${d.k===MC.docState.type?'active':''}" data-dt="${d.k}"><div class="dic">${icon(d.icon)}</div><div><b>${d.name}</b><span>${d.sub}</span></div></div>`).join('')}</div>
          <div class="field mt"><label>Employee</label><select class="select" id="docEmp">${DB.employees.map(e=>`<option value="${e.id}" ${e.id===MC.docState.empId?'selected':''}>${e.name}</option>`).join('')}</select></div>
          <div class="field"><label>Purpose / recipient <span class="muted" style="font-weight:400">(optional)</span></label><input class="input" id="docPurpose" placeholder="e.g. bank loan application"></div>
          <div class="field"><label>Tone</label><select class="select" id="docTone"><option>Formal (default)</option><option>Concise</option><option>Warm</option></select></div>
          <button class="btn primary block" id="docGen">${icon('sparkles')} Generate with AI</button>
        </div></div>
        <div class="doc-preview" id="docPreview">${docEmpty()}</div>
      </div>`,
      onMount(root){
        $('#docTypes',root).addEventListener('click',e=>{const t=e.target.closest('[data-dt]');if(!t)return;MC.docState.type=t.dataset.dt;$$('.doctype',root).forEach(x=>x.classList.toggle('active',x===t));});
        $('#docEmp',root).addEventListener('change',e=>MC.docState.empId=e.target.value);
        $('#docGen',root).addEventListener('click',()=>MC.generateDoc(root));
      }
    };
  };
  function docEmpty(){ return `<div class="paper-empty">${icon('scroll')}<div style="font-weight:600;color:var(--ink-2)">No document yet</div><p style="font-size:12.5px;margin-top:6px">Choose a document type and employee, then click <b>Generate with AI</b>.</p></div>`; }
  MC.generateDoc = function(root){
    const prev = $('#docPreview',root);
    MC.docState.purpose = $('#docPurpose',root).value.trim();
    prev.innerHTML = `<div class="paper-empty" style="align-self:center"><div class="ai-typing" style="justify-content:center">${'<i></i>'.repeat(3)}</div><div style="margin-top:12px;color:var(--brand);font-weight:600" class="doc-gen-note">${icon('sparkles')} AI is drafting your document…</div><p class="doc-gen-note" style="font-size:12px;margin-top:4px">Pulling from the 201 File · applying College templates</p></div>`;
    $('#docGen',root).disabled = true; $('#docGen',root).innerHTML = `${icon('refresh')} Generating…`;
    setTimeout(()=>{
      prev.innerHTML = docPaper(MC.docState.type, DB.empById(MC.docState.empId), MC.docState.purpose);
      $('#docGen',root).disabled = false; $('#docGen',root).innerHTML = `${icon('sparkles')} Regenerate`;
      toast('Document drafted by AI','info','Review before issuing');
    }, 1100);
  };
  function today(){ return new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}); }
  function honorific(e){ return e.gender==='Female'?'Ms.':'Mr.'; }
  function lastName(e){ return e.name.replace(/^(Dr\.|Prof\.|Sr\.|Sister|Ms\.|Mr\.)\s+/,'').split(' ').slice(-1)[0]; }
  function firstName(e){ return e.name.replace(/^(Dr\.|Prof\.|Sr\.|Sister|Ms\.|Mr\.)\s+/,'').split(' ')[0]; }
  function letterhead(){
    return `<div class="paper-lh"><span class="seal-badge"><img src="assets/Images/Miriam%20Logo.png" alt="seal"></span>
      <div><h2>MIRIAM COLLEGE</h2><div class="addr">Katipunan Road, Loyola Heights, Quezon City 1108, Philippines · www.mc.edu.ph</div></div></div>`;
  }
  function docActions(){
    return `<div class="doc-gen-note" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:-10px;margin-bottom:16px">
      <span class="ai-flag">${icon('sparkles')} AI-drafted · human review required</span></div>`;
  }
  function docPaper(type,e,purpose){
    const ref = (type.toUpperCase().slice(0,3))+'-2026-'+String(Math.floor(1000+Math.random()*9000));
    const pay = DB.payrollRun.items.find(x=>x.id===e.id);
    const salary = pay ? fmt.peso2(pay.basic) : '₱—';
    let title='', body='';
    if(type==='coe'){
      title='Certificate of Employment';
      body=`<p style="font-family:var(--font);font-size:12.5px;color:#555">TO WHOM IT MAY CONCERN:</p>
      <p>This is to certify that <b>${e.name}</b>, holder of Employee ID No. <b>${e.id}</b>, is a bona fide employee of Miriam College, presently holding the position of <b>${e.position}</b> under the ${e.dept}, from <b>${fmt.date(e.hired)}</b> up to the present.</p>
      <p>${honorific(e)} ${lastName(e)} is currently a <b>${e.type}</b> employee in good standing based at our ${e.campus} campus.</p>
      <p>This certification is issued upon the request of the above-named employee for <b>${purpose||'whatever legal purpose it may serve'}</b>.</p>
      <p>Issued this ${today()} at Quezon City, Philippines.</p>`;
    } else if(type==='comp'){
      title='Certificate of Compensation';
      body=`<p style="font-family:var(--font);font-size:12.5px;color:#555">TO WHOM IT MAY CONCERN:</p>
      <p>This is to certify that <b>${e.name}</b> (${e.id}) is employed with Miriam College as <b>${e.position}</b>, under the ${e.dept}, since <b>${fmt.date(e.hired)}</b>.</p>
      <p>${honorific(e)} ${lastName(e)} receives a monthly basic salary of <b>${salary}</b>, exclusive of statutory benefits and allowances, and is a <b>${e.type}</b> employee in good standing.</p>
      <p>This certification is issued upon ${honorific(e).toLowerCase()==='ms.'?'her':'his'} request for <b>${purpose||'loan / financial application purposes'}</b> and is valid for sixty (60) days from the date of issuance.</p>
      <p>Issued this ${today()} at Quezon City, Philippines.</p>`;
    } else if(type==='offer'){
      title='Letter of Offer of Employment';
      body=`<p style="font-family:var(--font);font-size:12.5px;color:#555">${today()}</p>
      <p>Dear ${firstName(e)},</p>
      <p>On behalf of Miriam College, we are pleased to offer you the position of <b>${e.position}</b> under the ${e.dept}, effective <b>${fmt.date(e.hired)}</b>, on a <b>${e.type}</b> basis.</p>
      <p>You will be entitled to a competitive compensation package of <b>${salary}</b> per month, together with government-mandated and company-sponsored benefits including HMO, SSS, PhilHealth, and Pag-IBIG.</p>
      <p>We are confident that your skills and values align with our Veritas mission, and we look forward to welcoming you to the Miriam College community. Kindly signify your acceptance by signing below.</p>`;
    } else if(type==='contract'){
      title='Contract of Employment';
      body=`<p>This Contract of Employment is entered into by and between <b>MIRIAM COLLEGE</b> ("the College") and <b>${e.name}</b> ("the Employee"), ${e.id}.</p>
      <p><b>1. Position.</b> The Employee is appointed as <b>${e.position}</b> under the ${e.dept}, ${e.campus} campus, effective ${fmt.date(e.hired)} on a ${e.type} basis.</p>
      <p><b>2. Compensation.</b> The Employee shall receive a monthly basic salary of <b>${salary}</b>, subject to applicable taxes and statutory deductions.</p>
      <p><b>3. Hours of Work.</b> Mondays to Fridays, 8:00 AM to 5:00 PM, or as may be scheduled by the College.</p>
      <p><b>4. Duties.</b> The Employee shall perform the responsibilities of the position and uphold the College's policies, values, and Veritas mission.</p>
      <p><b>5. Confidentiality & Data Privacy.</b> The Employee shall observe confidentiality and comply with the Data Privacy Act of 2012.</p>`;
    } else if(type==='memo'){
      title='Memorandum';
      body=`<div style="font-family:var(--font);font-size:12.5px;margin-bottom:18px;border-bottom:1px solid #ddd;padding-bottom:14px">
        <div style="display:flex;gap:8px"><b style="width:60px">TO:</b> All Employees — ${e.dept}</div>
        <div style="display:flex;gap:8px"><b style="width:60px">FROM:</b> Human Resources Division</div>
        <div style="display:flex;gap:8px"><b style="width:60px">DATE:</b> ${today()}</div>
        <div style="display:flex;gap:8px"><b style="width:60px">RE:</b> ${purpose||'General HR Advisory'}</div></div>
      <p>Greetings from the Human Resources Division.</p>
      <p>This is to formally advise all concerned regarding <b>${purpose||'the matter stated above'}</b>. Kindly take note of the relevant guidelines and ensure compliance within the prescribed timelines.</p>
      <p>For questions or clarifications, please coordinate with the Human Resources Division. Thank you for your continued cooperation and service to the College.</p>`;
    } else {
      title='Certificate of Service';
      body=`<p style="font-family:var(--font);font-size:12.5px;color:#555">TO WHOM IT MAY CONCERN:</p>
      <p>This is to certify that <b>${e.name}</b> (${e.id}) has rendered continuous and satisfactory service to Miriam College as <b>${e.position}</b> under the ${e.dept}, from <b>${fmt.date(e.hired)}</b> up to the present, a period of <b>${fmt.yrs(e.hired)}</b>.</p>
      <p>Throughout ${honorific(e).toLowerCase()==='ms.'?'her':'his'} tenure, ${honorific(e)} ${lastName(e)} has maintained good standing and has contributed meaningfully to the College community.</p>
      <p>This certification is issued for <b>${purpose||'record purposes'}</b> on ${today()} at Quezon City, Philippines.</p>`;
    }
    const sig = type==='offer'
      ? `<div class="sig" style="display:flex;justify-content:space-between;gap:30px"><div><b>Noel C. Racho</b><span>Director, Human Resources Division</span></div><div style="text-align:center"><div style="border-top:1px solid #333;padding-top:4px;margin-top:20px">${e.name}</div><span style="font-family:var(--font)">Conforme (Signature over printed name)</span></div></div>`
      : `<div class="sig"><div style="height:22px"></div><b>Noel C. Racho</b><span>Director, Human Resources Division</span><span>Miriam College</span></div>`;
    return `<div class="paper">${letterhead()}${docActions()}
      <div class="doc-ref"><span>Ref: ${ref}</span><span>${today()}</span></div>
      <h3 class="doc-title">${title}</h3>
      ${body}
      ${sig}
      <div class="doc-gen-note" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:34px;border-top:1px solid #eee;padding-top:16px">
        <button class="btn sm" onclick="this.closest('.paper').querySelectorAll('p,h3,.doc-title').forEach(el=>el.contentEditable=true);UI.toast('Editing enabled','info','Click text to edit, then issue')">${icon('edit')} Edit</button>
        <button class="btn sm" onclick="UI.toast('Downloaded','ok','${title} · PDF')">${icon('download')} Download PDF</button>
        <button class="btn sm" onclick="UI.toast('Sent to printer','ok')">${icon('printer')} Print</button>
        <button class="btn sm primary" onclick="UI.toast('Routed for signature','ok','Sent to HR Director for e-signature')">${icon('send')} Route for signature</button>
      </div></div>`;
  }

  MC._docPaper = docPaper; // exposed for self-test

  MC.pages.compliance = function () {
    const toneOf = s => s==='Filed'?'green':s==='Ready'?'amber':'blue';
    return { title:'Compliance Center', crumb:'Operations · Compliance',
      html:`
      <div class="page-head"><div><div class="t">Philippine Compliance & Government Reporting</div><div class="d">Statutory, labor, and education compliance — generated from live payroll & HR data.</div></div>
        <button class="btn" onclick="UI.toast('Calendar','info','Compliance deadlines synced')">${icon('calendar')} Compliance calendar</button></div>
      <div class="grid g-4 mb">
        ${stat({icon:'checkBig',color:'green',value:'96%',label:'Filings up to date'})}
        ${stat({icon:'clock',color:'amber',value:'7',label:'Due this month'})}
        ${stat({icon:'shield',color:'blue',value:'Compliant',label:'Data Privacy Act'})}
        ${stat({icon:'fileText',color:'violet',value:'18',label:'Report types'})}
      </div>
      <div class="grid g-2 mb">
        ${AGENCIES.map(a=>`<div class="card"><div class="card-head"><div class="row" style="gap:11px"><div class="stat" style="padding:0"><div class="ic" style="width:40px;height:40px;background:var(--surface-2);color:var(--brand)">${icon(a.icon)}</div></div><div><h3>${a.name}</h3><div class="sub">${a.full}</div></div></div></div>
          <div style="padding:6px 8px">${a.reports.map(([r,due,st])=>`<div class="cl-row" style="padding:10px 13px;margin:4px"><div style="flex:1"><b style="font-size:12.8px">${r}</b><div class="muted" style="font-size:11px">Due: ${due}</div></div>${badge(st,toneOf(st))}<button class="btn sm" onclick="MC.exportCSV('compliance')">${icon('download')}</button></div>`).join('')}</div></div>`).join('')}
      </div>
      <div class="card"><div class="card-head"><div><h3>Upcoming deadlines</h3><div class="sub">Next 30 days</div></div></div>
        <div class="table-wrap"><table class="tbl"><thead><tr><th>Agency</th><th>Report</th><th>Due date</th><th>Status</th><th></th></tr></thead><tbody>
          ${[['SSS','R-3 Contribution','Oct 31, 2026','Ready'],['PhilHealth','RF-1 Remittance','Oct 31, 2026','Ready'],['Pag-IBIG','MCRF Remittance','Oct 31, 2026','Ready'],['BIR','Form 1601-C','Nov 10, 2026','Scheduled'],['DOLE','13th Month Report','Dec 15, 2026','Scheduled']].map(([ag,r,due,st])=>`<tr><td><b>${ag}</b></td><td>${r}</td><td class="muted">${due}</td><td>${badge(st,toneOf(st))}</td><td><button class="btn sm primary" onclick="UI.toast('Generated','ok','${ag} · ${r}')">Generate</button></td></tr>`).join('')}
        </tbody></table></div></div>`,
    };
  };

})();
