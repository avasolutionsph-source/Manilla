/* ============================================================
   Miriam College HRIS — UI toolkit (icons, toast, modal, charts)
   ============================================================ */
window.UI = (function () {
  /* ---------- Icons (lucide-style, 24x24 stroke) ---------- */
  const I = {
    dashboard:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    userPlus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
    userCheck:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
    clock:'<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
    wallet:'<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M12 8C12 8 11 3 8 3a2.5 2.5 0 0 0 0 5h4Zm0 0s1-5 4-5a2.5 2.5 0 0 1 0 5h-4Z"/>',
    award:'<circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/>',
    logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    chart:'<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/><line x1="3" y1="20" x2="21" y2="20"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',
    search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    chevronDown:'<polyline points="6 9 12 15 18 9"/>',
    chevronRight:'<polyline points="9 18 15 12 9 6"/>',
    x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    check:'<polyline points="20 6 9 17 4 12"/>',
    checkCircle:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    mapPin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    sparkles:'<path d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15l-1.6-4.2L6 9.2l4.4-1.6L12 3Z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z"/><path d="M5 13l.6 1.7L7 15.3l-1.4.6L5 17.5l-.6-1.6L3 15.3l1.4-.6L5 13Z"/>',
    send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
    trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    more:'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    alertTriangle:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    trendingUp:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    trendingDown:'<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
    building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6"/><line x1="12" y1="6" x2="12" y2="6"/><line x1="16" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/>',
    mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    fingerprint:'<path d="M12 10a2 2 0 0 0-2 2c0 1.5.5 3-1 5"/><path d="M8.5 7.5A5 5 0 0 1 17 12c0 2-1 4-1 4"/><path d="M5 11a7 7 0 0 1 14 0c0 2.5-.5 4.5-1 6"/><path d="M12 12v4c0 1-.5 2-1 3"/>',
    gradCap:'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    heartPulse:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/><path d="M3.22 12H9l1.5-3 2 5 1.5-2h5.27"/>',
    arrowRight:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    refresh:'<path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/>',
    zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    cpu:'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
    database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    smartphone:'<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    clipboard:'<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
    userX:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="22" y2="13"/><line x1="22" y1="8" x2="17" y2="13"/>',
    dollar:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    home:'<path d="M3 9.5 12 2l9 7.5"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>',
    activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    stethoscope:'<path d="M4 2v6a4 4 0 0 0 8 0V2"/><path d="M8 14a6 6 0 0 0 12 0v-2"/><circle cx="20" cy="10" r="2"/>',
    badgeCheck:'<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><polyline points="9 12 11 14 15 10"/>',
    message:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/>',
    grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    hourglass:'<path d="M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',
    info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    pieChart:'<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10Z"/>',
    coins:'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/>',
    scroll:'<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>',
    checkBig:'<circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/>',
  };
  function icon(name, cls) {
    const p = I[name] || I.info;
    return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  }

  /* ---------- Formatters ---------- */
  const fmt = {
    peso: (n) => '₱' + Number(n).toLocaleString('en-PH', { maximumFractionDigits: 0 }),
    peso2: (n) => '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    num: (n) => Number(n).toLocaleString('en-PH'),
    date: (iso) => { if(!iso||iso==='—') return '—'; const d=new Date(iso+'T00:00:00'); return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); },
    dateShort: (iso) => { if(!iso||iso==='—') return '—'; const d=new Date(iso+'T00:00:00'); return d.toLocaleDateString('en-US',{month:'short',day:'numeric'}); },
    yrs: (iso) => { const d=new Date(iso+'T00:00:00'); const y=(Date.now()-d)/(365.25*864e5); return y.toFixed(1)+' yrs'; },
  };

  /* ---------- Avatars ---------- */
  function avatar(obj, size='sm') { return `<div class="ava-${size}" style="background:${obj.color}">${obj.initials}</div>`; }

  /* ---------- Toast ---------- */
  function toast(title, type='ok', sub='') {
    let wrap = document.querySelector('.toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
    const t = document.createElement('div');
    const ic = type==='warn'?'alertTriangle':type==='info'?'info':'check';
    t.className = `toast ${type}`;
    t.innerHTML = `<div class="ic">${icon(ic)}</div><div><b>${title}</b>${sub?`<small>${sub}</small>`:''}</div>`;
    wrap.appendChild(t);
    setTimeout(() => { t.style.transition='.25s'; t.style.opacity='0'; t.style.transform='translateX(120%)'; setTimeout(()=>t.remove(),260); }, 3400);
  }

  /* ---------- Modal ---------- */
  function modal({ title, sub, body, foot, size='' }) {
    closeModal();
    const o = document.createElement('div');
    o.className = 'overlay'; o.id = 'modal-overlay';
    o.innerHTML = `<div class="modal ${size}" role="dialog">
      <div class="modal-head"><div><h3>${title}</h3>${sub?`<div class="sub">${sub}</div>`:''}</div>
        <button class="x-btn" data-close>${icon('x')}</button></div>
      <div class="modal-body">${body}</div>
      ${foot?`<div class="modal-foot">${foot}</div>`:''}</div>`;
    document.body.appendChild(o);
    o.addEventListener('click', e => { if (e.target === o || e.target.closest('[data-close]')) closeModal(); });
    return o;
  }
  function closeModal() { const o = document.getElementById('modal-overlay'); if (o) o.remove(); }

  /* ---------- Drawer ---------- */
  function drawer({ title, body }) {
    closeDrawer();
    const ov = document.createElement('div'); ov.className='drawer-overlay'; ov.id='drawer-ov';
    const d = document.createElement('div'); d.className='drawer'; d.id='drawer';
    d.innerHTML = `<div class="drawer-head"><h3>${title}</h3><button class="x-btn" data-close>${icon('x')}</button></div><div class="drawer-body">${body}</div>`;
    document.body.appendChild(ov); document.body.appendChild(d);
    ov.addEventListener('click', closeDrawer);
    d.querySelector('[data-close]').addEventListener('click', closeDrawer);
    return d;
  }
  function closeDrawer() { ['drawer-ov','drawer'].forEach(id=>{const e=document.getElementById(id); if(e)e.remove();}); }

  /* ---------- Popover menu ---------- */
  function popover(anchor, html, align='right') {
    closePopover();
    const r = anchor.getBoundingClientRect();
    const m = document.createElement('div'); m.className='menu'; m.id='popover'; m.innerHTML = html;
    m.style.minWidth = '240px';
    document.body.appendChild(m);
    const mw = m.offsetWidth;
    m.style.top = (r.bottom + 8) + 'px';
    m.style.left = (align==='right' ? Math.max(12, r.right - mw) : r.left) + 'px';
    setTimeout(() => document.addEventListener('mousedown', outside), 0);
    function outside(e){ if(!m.contains(e.target) && !anchor.contains(e.target)) closePopover(); }
    m._outside = outside;
    return m;
  }
  function closePopover(){ const m=document.getElementById('popover'); if(m){ document.removeEventListener('mousedown', m._outside); m.remove(); } }

  /* ---------- Charts (inline SVG) ---------- */
  const charts = {
    donut(data, { size=180, thickness=26, center='', centerSub='' } = {}) {
      const total = data.reduce((a, d) => a + d.value, 0) || 1;
      const r = (size - thickness) / 2, cx = size/2, cy = size/2, C = 2*Math.PI*r;
      let off = 0;
      const segs = data.map(d => {
        const len = d.value/total*C;
        const s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${thickness}"
          stroke-dasharray="${len} ${C-len}" stroke-dashoffset="${-off}" transform="rotate(-90 ${cx} ${cy})" stroke-linecap="butt"/>`;
        off += len; return s;
      }).join('');
      return `<svg class="chart-svg" viewBox="0 0 ${size} ${size}" style="max-width:${size}px;margin:0 auto">
        ${segs}
        ${center?`<text x="${cx}" y="${cy-2}" text-anchor="middle" class="donut-center" dominant-baseline="middle" fill="var(--ink)">${center}</text>`:''}
        ${centerSub?`<text x="${cx}" y="${cy+18}" text-anchor="middle" class="donut-center-sub">${centerSub}</text>`:''}
      </svg>`;
    },
    legend(data) {
      return `<div class="legend">${data.map(d=>`<span><i style="background:${d.color}"></i>${d.label} <b style="margin-left:2px">${d.value!=null?d.value:''}</b></span>`).join('')}</div>`;
    },
    bars(data, { height=190, color='var(--brand-2)', fmt=(v)=>v } = {}) {
      const max = Math.max(...data.map(d=>d.value), 1);
      const w = 100/data.length;
      return `<svg class="chart-svg" viewBox="0 0 100 ${100}" preserveAspectRatio="none" style="height:${height}px">
        ${[0,25,50,75,100].map(y=>`<line x1="0" y1="${y}" x2="100" y2="${y}" stroke="var(--line-2)" stroke-width=".4"/>`).join('')}
        ${data.map((d,i)=>{ const h=d.value/max*86; const x=i*w+w*0.2; const bw=w*0.6;
          return `<rect x="${x}" y="${100-h}" width="${bw}" height="${h}" rx="1.5" fill="${d.color||color}"><title>${d.label}: ${fmt(d.value)}</title></rect>`;
        }).join('')}
      </svg>
      <div style="display:flex;margin-top:8px">${data.map(d=>`<div style="flex:1;text-align:center;font-size:10.5px;color:var(--ink-3)">${d.label}</div>`).join('')}</div>`;
    },
    groupedBars(labels, series, { height=200 } = {}) {
      const all = series.flatMap(s=>s.data); const max = Math.max(...all,1);
      const gw = 100/labels.length; const bw = gw*0.7/series.length;
      let bars='';
      labels.forEach((lb,i)=>{ series.forEach((s,j)=>{ const h=s.data[i]/max*86; const x=i*gw+gw*0.15+j*bw;
        bars += `<rect x="${x}" y="${100-h}" width="${bw*0.82}" height="${h}" rx="1" fill="${s.color}"><title>${lb} · ${s.name}: ${s.data[i]}</title></rect>`; }); });
      return `<svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none" style="height:${height}px">
        ${[0,25,50,75,100].map(y=>`<line x1="0" y1="${y}" x2="100" y2="${y}" stroke="var(--line-2)" stroke-width=".4"/>`).join('')}${bars}</svg>
        <div style="display:flex;margin-top:8px">${labels.map(l=>`<div style="flex:1;text-align:center;font-size:10.5px;color:var(--ink-3)">${l}</div>`).join('')}</div>
        ${this.legend(series.map(s=>({label:s.name,color:s.color})))}`;
    },
    line(points, { height=190, color='var(--brand-2)', area=true, labels=[] } = {}) {
      const max = Math.max(...points,1)*1.12, min=0;
      const n = points.length;
      const X = i => (i/(n-1))*100, Y = v => 100 - (v-min)/(max-min)*90 - 5;
      const path = points.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
      const areaPath = `${path} L100 100 L0 100 Z`;
      return `<svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none" style="height:${height}px">
        ${[5,27,50,72,95].map(y=>`<line x1="0" y1="${y}" x2="100" y2="${y}" stroke="var(--line-2)" stroke-width=".4"/>`).join('')}
        ${area?`<defs><linearGradient id="lg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><path d="${areaPath}" fill="url(#lg)"/>`:''}
        <path d="${path}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke"/>
        ${points.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="1.6" fill="#fff" stroke="${color}" stroke-width="1.5" vector-effect="non-scaling-stroke"><title>${labels[i]||''}: ${v}</title></circle>`).join('')}
      </svg>
      ${labels.length?`<div style="display:flex;margin-top:6px">${labels.map(l=>`<div style="flex:1;text-align:center;font-size:10px;color:var(--ink-3)">${l}</div>`).join('')}</div>`:''}`;
    },
    ring(pct, { size=120, thickness=12, color='var(--brand-2)', label='' } = {}) {
      const r=(size-thickness)/2, c=size/2, C=2*Math.PI*r, len=pct/100*C;
      return `<svg viewBox="0 0 ${size} ${size}" style="width:${size}px;height:${size}px">
        <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--line-2)" stroke-width="${thickness}"/>
        <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-width="${thickness}" stroke-linecap="round"
          stroke-dasharray="${len} ${C}" transform="rotate(-90 ${c} ${c})"/>
        <text x="${c}" y="${c-1}" text-anchor="middle" dominant-baseline="middle" font-size="${size*0.22}" font-weight="800" fill="var(--ink)">${pct}%</text>
        ${label?`<text x="${c}" y="${c+size*0.17}" text-anchor="middle" font-size="${size*0.09}" fill="var(--ink-3)">${label}</text>`:''}
      </svg>`;
    }
  };

  function download(filename, text) {
    const b = new Blob([text], { type: 'text/csv' });
    const u = URL.createObjectURL(b); const a = document.createElement('a');
    a.href = u; a.download = filename; a.click(); URL.revokeObjectURL(u);
  }

  return { icon, fmt, avatar, toast, modal, closeModal, drawer, closeDrawer, popover, closePopover, charts, download };
})();
