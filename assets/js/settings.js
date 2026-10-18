/* ============================================================
   Miriam College HRIS — Configuration UI
   A full Settings workspace: every module's options, policies and
   feature flags are editable here and persist to app_settings via
   MC.config. Overrides this prototype's original settings page.
   ============================================================ */
(function () {
  const { icon, toast, badge, modal, closeModal } = UI;
  const G = window.MC;

  const TABS = [
    ['org', 'Organization'], ['features', 'Feature Flags'], ['recruitment', 'Recruitment'],
    ['leave', 'Leave'], ['employment', 'Employment'], ['payroll', 'Payroll'], ['benefits', 'Benefits'],
    ['performance', 'Performance'], ['timekeeping', 'Timekeeping'], ['compliance', 'Compliance'],
    ['rbac', 'Roles & Access'], ['ai', 'AI Governance'], ['workflow', 'Workflows'], ['integrations', 'Integrations'],
    ['advanced', 'Advanced (JSON)'],
  ];
  G.setTab = G.setTab || 'org';

  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const paint = () => { const b = document.getElementById('stBody'); if (b) { b.innerHTML = setBody(); } };
  G.cfgPaint = paint;

  async function persist(key, value, msg) {
    try { await G.config.set(key, value); toast(msg || 'Saved', 'ok', G.dataSource === 'supabase' ? 'Synced to server' : 'Saved locally'); }
    catch (e) { toast('Save failed', 'warn', String(e.message || e)); }
    paint();
  }

  /* ---------------- generic editors ---------------- */
  // Array of strings: chips with remove + add field.
  function strList(key, { title, sub, ph } = {}) {
    const arr = G.config.get(key, []);
    return `<div class="card mb"><div class="card-head"><div><h3>${title}</h3>${sub ? `<div class="sub">${sub}</div>` : ''}</div>
        ${G.config.isOverridden(key) ? `<button class="btn sm" data-reset="${key}">${icon('refresh')} Reset</button>` : ''}</div>
      <div class="card-pad">
        <div class="row wrap" style="gap:7px">${arr.map((v, i) => `<span class="chip" style="padding-right:4px">${esc(v)}<button class="x-btn" data-del="${key}" data-i="${i}" style="width:20px;height:20px;margin-left:4px">${icon('x')}</button></span>`).join('') || '<span class="muted">None yet</span>'}</div>
        <div class="row mt" style="gap:8px"><input class="input" id="add-${key}" placeholder="${ph || 'Add item…'}" style="max-width:320px"><button class="btn primary" data-add="${key}">${icon('plus')} Add</button></div>
      </div></div>`;
  }

  // Object of booleans: toggle rows.
  function toggles(key, { title, sub, labels } = {}) {
    const obj = G.config.get(key, {});
    return `<div class="card mb"><div class="card-head"><div><h3>${title}</h3>${sub ? `<div class="sub">${sub}</div>` : ''}</div>
        ${G.config.isOverridden(key) ? `<button class="btn sm" data-reset="${key}">${icon('refresh')} Reset</button>` : ''}</div>
      <div class="card-pad"><div class="grid g-3">${Object.keys(obj).map((k) => `
        <label class="cl-row" style="margin:0;cursor:pointer"><div style="flex:1;font-size:13px;font-weight:500">${esc((labels && labels[k]) || k.replace(/_/g, ' '))}</div>
          <input type="checkbox" data-flag="${key}" data-k="${k}" ${obj[k] ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--brand)"></label>`).join('')}</div></div></div>`;
  }

  // Object field editor (numbers / text / bool). fields: [{k,label,type,suffix}]
  function kv(key, { title, sub, fields } = {}) {
    const obj = G.config.get(key, {});
    return `<div class="card mb"><div class="card-head"><div><h3>${title}</h3>${sub ? `<div class="sub">${sub}</div>` : ''}</div>
        <div class="row" style="gap:8px">${G.config.isOverridden(key) ? `<button class="btn sm" data-reset="${key}">${icon('refresh')} Reset</button>` : ''}<button class="btn primary sm" data-savekv="${key}">${icon('check')} Save</button></div></div>
      <div class="card-pad"><div class="form-row" style="grid-template-columns:1fr 1fr">${fields.map((f) => f.type === 'bool'
        ? `<label class="cl-row" style="margin:0;cursor:pointer"><div style="flex:1;font-size:13px">${f.label}</div><input type="checkbox" data-kv="${f.k}" ${obj[f.k] ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--brand)"></label>`
        : `<div class="field" style="margin:0"><label>${f.label}${f.suffix ? ` <span class="muted">(${f.suffix})</span>` : ''}</label><input class="input" data-kv="${f.k}" data-type="${f.type || 'text'}" value="${esc(obj[f.k])}"></div>`).join('')}</div></div></div>`;
  }

  // Array of objects: editable table. cols:[{k,label,type}]
  function objTable(key, { title, sub, cols, blank } = {}) {
    const arr = G.config.get(key, []);
    return `<div class="card mb"><div class="card-head"><div><h3>${title}</h3>${sub ? `<div class="sub">${sub}</div>` : ''}</div>
        <div class="row" style="gap:8px">${G.config.isOverridden(key) ? `<button class="btn sm" data-reset="${key}">${icon('refresh')} Reset</button>` : ''}
          <button class="btn sm" data-addrow="${key}">${icon('plus')} Add</button><button class="btn primary sm" data-savetable="${key}">${icon('check')} Save</button></div></div>
      <div class="table-wrap"><table class="tbl" data-table="${key}"><thead><tr>${cols.map((c) => `<th>${c.label}</th>`).join('')}<th></th></tr></thead>
      <tbody>${arr.map((row, i) => `<tr data-row="${i}">${cols.map((c) => c.type === 'bool'
        ? `<td><input type="checkbox" data-col="${c.k}" ${row[c.k] ? 'checked' : ''} style="width:16px;height:16px;accent-color:var(--brand)"></td>`
        : `<td><input class="input" data-col="${c.k}" data-type="${c.type || 'text'}" value="${esc(row[c.k])}" style="padding:6px 9px;font-size:12.5px"></td>`).join('')}
        <td><button class="x-btn" data-delrow="${key}" data-i="${i}">${icon('trash')}</button></td></tr>`).join('')}</tbody></table></div>
      <div class="hint" style="padding:10px 16px">Edit cells then <b>Save</b>. “Add” inserts a blank row.</div></div>`;
  }

  /* ---------------- tab bodies ---------------- */
  function setBody() {
    const t = G.setTab;
    if (t === 'org') return strTitle('Organization') +
      kv('org.info', { title: 'Institution', sub: 'Core identity used across the system', fields: [
        { k: 'name', label: 'Name' }, { k: 'tagline', label: 'Tagline' }, { k: 'hrEmail', label: 'HR email' },
        { k: 'phone', label: 'Phone' }, { k: 'website', label: 'Website' }, { k: 'headcount', label: 'Headcount', type: 'num' }] }) +
      strList('org.campuses', { title: 'Campuses', sub: 'Drives campus pickers across modules', ph: 'e.g. Katipunan' }) +
      strList('org.departments', { title: 'Departments / Units', ph: 'e.g. Alumni Affairs' });

    if (t === 'features') return strTitle('Feature Flags') +
      toggles('features', { title: 'Modules & capabilities', sub: 'Turn modules on/off — the navigation reflects this immediately after reload', labels: {
        org_chart: 'Org Chart', ai_assistant: 'AI Assistant', command: 'Command Center', budget: 'Budget Simulator', kiosk: 'Biometric Kiosk' } });

    if (t === 'recruitment') return strTitle('Recruitment') +
      strList('recruitment.stages', { title: 'Pipeline stages', sub: 'Order matters — drives the candidate Kanban & “advance stage”', ph: 'e.g. Final Interview' }) +
      strList('recruitment.sources', { title: 'Applicant sources', ph: 'e.g. Indeed' }) +
      strList('recruitment.jobTypes', { title: 'Job types', ph: 'e.g. Visiting Lecturer' }) +
      strList('recruitment.channels', { title: 'Posting channels', ph: 'e.g. Partner Universities' });

    if (t === 'leave') return strTitle('Leave') +
      objTable('leave.types', { title: 'Leave types', sub: 'Populates the “File an application” picker', cols: [
        { k: 'name', label: 'Name' }, { k: 'code', label: 'Code' }, { k: 'paid', label: 'Paid', type: 'bool' }, { k: 'maxDays', label: 'Max days / yr', type: 'num' }] });

    if (t === 'employment') return strTitle('Employment') +
      strList('employment.types', { title: 'Employment types', ph: 'e.g. Casual' }) +
      strList('employment.salaryGrades', { title: 'Salary grades', ph: 'e.g. SG-20' });

    if (t === 'payroll') return strTitle('Payroll') +
      kv('payroll.statutory', { title: 'Statutory rates', sub: 'Government contribution & premium rates', fields: [
        { k: 'sssEmployeeRate', label: 'SSS employee', type: 'num', suffix: '%' }, { k: 'sssEmployerRate', label: 'SSS employer', type: 'num', suffix: '%' },
        { k: 'philhealthRate', label: 'PhilHealth', type: 'num', suffix: '%' }, { k: 'pagibigEmployee', label: 'Pag-IBIG employee', type: 'num', suffix: '₱' },
        { k: 'taxRegime', label: 'Tax regime' }, { k: 'nightDiffRate', label: 'Night differential', type: 'num', suffix: '%' },
        { k: 'otRegularRate', label: 'OT (regular day)', type: 'num', suffix: '%' }, { k: 'holidayRate', label: 'Holiday premium', type: 'num', suffix: '%' }] }) +
      strList('payroll.groups', { title: 'Pay groups', ph: 'e.g. Executives' }) +
      strList('payroll.cutoffs', { title: 'Cutoff periods', ph: 'e.g. Weekly' });

    if (t === 'benefits') return strTitle('Benefits') +
      objTable('benefits.programs', { title: 'Benefit programs', cols: [{ k: 'name', label: 'Program' }, { k: 'type', label: 'Type' }, { k: 'employer', label: 'Employer share' }] }) +
      strList('benefits.claimTypes', { title: 'Claim types', ph: 'e.g. Optical' });

    if (t === 'performance') return strTitle('Performance') +
      objTable('performance.ratingScale', { title: 'Rating scale', sub: 'Score thresholds → labels', cols: [{ k: 'min', label: 'Min score', type: 'num' }, { k: 'label', label: 'Label' }] }) +
      strList('performance.competencies', { title: 'Competencies', sub: 'Rated in every evaluation', ph: 'e.g. Leadership' }) +
      strList('performance.cycles', { title: 'Review cycles', ph: 'e.g. Q1' }) +
      kv('performance.facultyRankPoints', { title: 'Faculty ranking weights', sub: 'Point weights (should total 100)', fields: [
        { k: 'education', label: 'Education', type: 'num' }, { k: 'research', label: 'Research', type: 'num' }, { k: 'teaching', label: 'Teaching', type: 'num' }, { k: 'service', label: 'Service', type: 'num' }] });

    if (t === 'timekeeping') return kvGroup() +
      strList('timekeeping.captureModes', { title: 'Capture methods', ph: 'e.g. QR code' }) +
      objTable('timekeeping.devices', { title: 'Biometric devices', cols: [{ k: 'id', label: 'Device ID' }, { k: 'campus', label: 'Campus' }, { k: 'location', label: 'Location' }, { k: 'type', label: 'Type' }, { k: 'status', label: 'Status' }] });

    if (t === 'compliance') return strTitle('Compliance') +
      objTable('compliance.reports', { title: 'Government reports', sub: 'Statutory filing calendar', cols: [{ k: 'agency', label: 'Agency' }, { k: 'form', label: 'Form' }, { k: 'freq', label: 'Frequency' }, { k: 'due', label: 'Due' }] });

    if (t === 'rbac') return strTitle('Roles & Access') + rbacMatrix() +
      strList('rbac.mfaRequiredRoles', { title: 'MFA-required roles', sub: 'These roles must use multi-factor auth', ph: 'e.g. Finance' });

    if (t === 'ai') return strTitle('AI Governance') +
      `<div class="card card-pad mb" style="background:var(--surface-2)"><div class="row" style="gap:10px;color:var(--brand);font-weight:600;font-size:15px">${icon('shield')} Responsible AI</div>
        <p style="font-size:13.5px;color:var(--ink-2);margin:10px 0 0;line-height:1.6">The College retains <b>human oversight</b> over all employment decisions. AI recommendations <b>never auto-execute</b>.</p></div>` +
      kv('ai.governance', { title: 'Governance rules', fields: [
        { k: 'humanApprovalRequired', label: 'Human approval required', type: 'bool' }, { k: 'trainExternalModels', label: 'Allow training external models', type: 'bool' }, { k: 'dataRetentionDays', label: 'Data retention', type: 'num', suffix: 'days' }] }) +
      objTable('ai.capabilities', { title: 'AI capability register', sub: 'Toggle each AI feature on/off', cols: [
        { k: 'name', label: 'Capability' }, { k: 'module', label: 'Module' }, { k: 'type', label: 'Type' }, { k: 'oversight', label: 'Oversight' }, { k: 'enabled', label: 'On', type: 'bool' }] });

    if (t === 'workflow') return strTitle('Approval Workflows') +
      `<div class="hint" style="margin-bottom:14px">Each workflow is a sequence of approver steps. Edit the comma-free step labels per row, then Save.</div>` +
      workflowEditor();

    if (t === 'integrations') return strTitle('Integrations') +
      objTable('integrations', { title: 'Connected systems', cols: [{ k: 'name', label: 'System' }, { k: 'detail', label: 'Detail' }, { k: 'status', label: 'Status' }] });

    if (t === 'advanced') return advancedEditor();

    return '';
  }

  // Every config key, editable as raw JSON — guarantees 100% configurability.
  function advancedEditor() {
    const keys = G.config.keys().slice().sort();
    const rows = keys.map((k) => `<tr data-k="${esc(k)}"><td><b style="font-size:12.5px">${esc(k)}</b></td>
      <td class="muted" style="font-size:11px;max-width:380px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(JSON.stringify(G.config.get(k)))}</td>
      <td>${G.config.isOverridden(k) ? badge('Overridden', 'amber') : '<span class="muted" style="font-size:11.5px">Default</span>'}</td>
      <td style="white-space:nowrap"><button class="btn sm" data-editraw="${esc(k)}">${icon('edit')} Edit</button>${G.config.isOverridden(k) ? ` <button class="btn sm" data-reset="${esc(k)}">Reset</button>` : ''}</td></tr>`).join('');
    return `<div class="card"><div class="card-head"><div><h3>All configuration keys</h3><div class="sub">Edit any setting directly as JSON — ${keys.length} keys</div></div>
        <input class="input" id="cfgSearch" placeholder="Search keys…" style="max-width:260px"></div>
      <div class="table-wrap"><table class="tbl" id="cfgKeysTbl"><thead><tr><th>Key</th><th>Value</th><th>State</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }

  MC.cfgEditRaw = function (key) {
    const cur = JSON.stringify(G.config.get(key), null, 2);
    modal({
      title: 'Edit setting', sub: key, size: 'lg',
      body: `<div class="field" style="margin:0"><label>Value (JSON)</label><textarea class="input" id="rawJson" spellcheck="false" style="min-height:320px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.5">${esc(cur)}</textarea></div><div class="hint" id="rawErr" style="margin-top:8px"></div>`,
      foot: `<button class="btn" data-close>Cancel</button><button class="btn" id="rawReset">${icon('refresh')} Reset to default</button><button class="btn primary" id="rawSave">${icon('check')} Save</button>`,
    });
    const save = document.getElementById('rawSave');
    if (save) save.addEventListener('click', async () => {
      let v; try { v = JSON.parse(document.getElementById('rawJson').value); }
      catch (err) { document.getElementById('rawErr').innerHTML = `<span style="color:var(--red)">Invalid JSON — ${esc(err.message)}</span>`; return; }
      await persist(key, v, 'Saved'); closeModal();
    });
    const rst = document.getElementById('rawReset');
    if (rst) rst.addEventListener('click', async () => { await G.config.reset(key); toast('Reset to default', 'ok'); closeModal(); paint(); });
  };

  function strTitle() { return ''; }

  // Timekeeping scalar policy (grace / hours) — kv over discrete keys.
  function kvGroup() {
    const grace = G.config.get('timekeeping.graceMinutes', 15);
    const ws = G.config.get('timekeeping.workStart', '08:00');
    const we = G.config.get('timekeeping.workEnd', '17:00');
    return `<div class="card mb"><div class="card-head"><div><h3>Work schedule</h3><div class="sub">Grace period & standard hours</div></div><button class="btn primary sm" data-savesched>${icon('check')} Save</button></div>
      <div class="card-pad"><div class="form-row" style="grid-template-columns:1fr 1fr 1fr">
        <div class="field" style="margin:0"><label>Grace period <span class="muted">(min)</span></label><input class="input" id="tkGrace" type="number" value="${grace}"></div>
        <div class="field" style="margin:0"><label>Work start</label><input class="input" id="tkStart" type="time" value="${ws}"></div>
        <div class="field" style="margin:0"><label>Work end</label><input class="input" id="tkEnd" type="time" value="${we}"></div>
      </div></div></div>`;
  }

  function rbacMatrix() {
    const roles = G.config.get('rbac.roles', []);
    const mods = G.config.get('rbac.modules', []);
    const mx = G.config.get('rbac.matrix', {});
    const cell = (v) => v === 1 ? `<span style="color:var(--brand);font-weight:700">Full</span>` : v === 2 ? `<span class="muted">View</span>` : `<span style="color:var(--line)">—</span>`;
    return `<div class="card mb"><div class="card-head"><div><h3>Role-based access control</h3><div class="sub">Click a cell to cycle: — → Full → View. Changes persist.</div></div>
        ${G.config.isOverridden('rbac.matrix') ? `<button class="btn sm" data-reset="rbac.matrix">${icon('refresh')} Reset</button>` : ''}</div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>Role</th>${mods.map((m) => `<th style="text-align:center">${m}</th>`).join('')}</tr></thead>
      <tbody>${roles.map((r) => `<tr><td><b>${esc(r)}</b></td>${mods.map((m, i) => `<td style="text-align:center;cursor:pointer" data-mx data-role="${esc(r)}" data-i="${i}">${cell((mx[r] || [])[i] || 0)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  }

  function workflowEditor() {
    const wf = G.config.get('workflows.approvals', []);
    return `<div class="card mb"><div class="card-head"><div><h3>Workflows</h3></div><button class="btn primary sm" data-savewf>${icon('check')} Save</button></div>
      <div class="card-pad">${wf.map((w, i) => `<div class="field"><label>${esc(w.name)}</label>
        <input class="input" data-wf="${i}" value="${esc((w.steps || []).join(' → '))}" placeholder="Step 1 → Step 2 → Step 3"></div>`).join('')}
      <div class="hint">Separate approval steps with “→” or “,”.</div></div></div>`;
  }

  /* ---------------- delegated handlers ---------------- */
  function onClick(e) {
    const root = document.getElementById('stBody'); if (!root) return;
    const add = e.target.closest('[data-add]');
    if (add) { const k = add.dataset.add; const inp = document.getElementById('add-' + k); const v = (inp.value || '').trim(); if (!v) return; const arr = G.config.get(k, []); arr.push(v); persist(k, arr, 'Added'); return; }
    const del = e.target.closest('[data-del]');
    if (del) { const k = del.dataset.del; const arr = G.config.get(k, []); arr.splice(+del.dataset.i, 1); persist(k, arr, 'Removed'); return; }
    const er = e.target.closest('[data-editraw]');
    if (er) { MC.cfgEditRaw(er.dataset.editraw); return; }
    const reset = e.target.closest('[data-reset]');
    if (reset) { G.config.reset(reset.dataset.reset).then(() => { toast('Reset to default', 'ok'); paint(); }); return; }
    const addrow = e.target.closest('[data-addrow]');
    if (addrow) { const k = addrow.dataset.addrow; const arr = readTable(k); arr.push({}); persist(k, arr, 'Row added'); return; }
    const delrow = e.target.closest('[data-delrow]');
    if (delrow) { const k = delrow.dataset.delrow; const arr = readTable(k); arr.splice(+delrow.dataset.i, 1); persist(k, arr, 'Row removed'); return; }
    const savet = e.target.closest('[data-savetable]');
    if (savet) { const k = savet.dataset.savetable; persist(k, readTable(k), 'Saved'); return; }
    const savekv = e.target.closest('[data-savekv]');
    if (savekv) { const k = savekv.dataset.savekv; persist(k, readKv(root), 'Saved'); return; }
    const mx = e.target.closest('[data-mx]');
    if (mx) { const role = mx.dataset.role, i = +mx.dataset.i; const m = G.config.get('rbac.matrix', {}); m[role] = m[role] || []; m[role][i] = ((m[role][i] || 0) + 1) % 3; persist('rbac.matrix', m, 'Permission updated'); return; }
    if (e.target.closest('[data-savesched]')) { const g = +document.getElementById('tkGrace').value || 0, ws = document.getElementById('tkStart').value, we = document.getElementById('tkEnd').value; Promise.all([G.config.set('timekeeping.graceMinutes', g), G.config.set('timekeeping.workStart', ws), G.config.set('timekeeping.workEnd', we)]).then(() => { toast('Schedule saved', 'ok'); paint(); }).catch((err) => toast('Save failed', 'warn', String(err.message || err))); return; }
    if (e.target.closest('[data-savewf]')) { const wf = G.config.get('workflows.approvals', []); root.querySelectorAll('[data-wf]').forEach((inp) => { const i = +inp.dataset.wf; if (wf[i]) wf[i].steps = inp.value.split(/→|,/).map((s) => s.trim()).filter(Boolean); }); persist('workflows.approvals', wf, 'Workflow saved'); return; }
  }
  function onChange(e) {
    const flag = e.target.closest('[data-flag]');
    if (flag) { const k = flag.dataset.flag; const obj = G.config.get(k, {}); obj[flag.dataset.k] = flag.checked; persist(k, obj, flag.checked ? 'Enabled' : 'Disabled'); }
  }
  function onInput(e) {
    if (e.target && e.target.id === 'cfgSearch') {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#cfgKeysTbl tbody tr').forEach((tr) => { tr.style.display = (tr.dataset.k || '').toLowerCase().includes(q) ? '' : 'none'; });
    }
  }
  function readTable(key) {
    const tbl = document.querySelector(`[data-table="${key}"]`); if (!tbl) return G.config.get(key, []);
    return [...tbl.querySelectorAll('tbody tr')].map((tr) => { const o = {}; tr.querySelectorAll('[data-col]').forEach((inp) => { o[inp.dataset.col] = inp.type === 'checkbox' ? inp.checked : (inp.dataset.type === 'num' ? (parseFloat(inp.value) || 0) : inp.value); }); return o; });
  }
  function readKv(root) {
    const o = {};
    root.querySelectorAll('[data-kv]').forEach((inp) => { o[inp.dataset.kv] = inp.type === 'checkbox' ? inp.checked : (inp.dataset.type === 'num' ? (parseFloat(inp.value) || 0) : inp.value); });
    return o;
  }

  /* ---------------- page ---------------- */
  MC.pages.settings = function () {
    return {
      title: 'Settings & Admin', crumb: 'System Administration',
      html: `
        <div class="page-head"><div><div class="t">Settings & Administration</div><div class="d">Configure every module — changes persist and drive the system.</div></div>
          <span class="chip">${icon('database')} ${MC.dataSource === 'supabase' ? 'Saving to Supabase' : 'Local (offline)'}</span></div>
        <div class="tabs" id="stTabs">${TABS.map(([k, l]) => `<div class="tab ${k === MC.setTab ? 'active' : ''}" data-t="${k}">${l}</div>`).join('')}</div>
        <div id="stBody"></div>`,
      onMount(root) {
        const tabs = root.querySelector('#stTabs');
        tabs.addEventListener('click', (e) => { const t = e.target.closest('[data-t]'); if (!t) return; MC.setTab = t.dataset.t; [...tabs.querySelectorAll('.tab')].forEach((x) => x.classList.toggle('active', x === t)); paint(); });
        const body = root.querySelector('#stBody');
        body.addEventListener('click', onClick);
        body.addEventListener('change', onChange);
        body.addEventListener('input', onInput);
        paint();
      },
    };
  };
})();
