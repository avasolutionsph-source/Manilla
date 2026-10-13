/* Miriam College site — shared header/footer + interactions */
window.MCsite = (function () {
  var IMG = 'old-site/images/';
  var CV = '<svg class="cv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>';

  var NAV = [
    { label:'Home', href:'index.html' },
    { label:'About MC', href:'index.html#about', kids:[
      ['Overview','index.html#about'],['Vision, Mission & Core Values','index.html#values'],
      ['History & Heritage','page.html?p=history'],['School Name, Seal & Hymn','page.html?p=seal-hymn'],
      ['Sustainable MC','page.html?p=sustainable'],['Office of the President','page.html?p=president'],
      ['Board of Trustees','page.html?p=board'],['Accreditation & Certification','page.html?p=accreditation'],
      ['Affiliation & Linkages','page.html?p=affiliation'] ] },
    { label:'Our Campuses', href:'index.html#campuses', kids:[
      ['All Campuses','index.html#campuses'],['MC Nuvali','page.html?p=nuvali'],['MC Alviera','page.html?p=alviera'] ] },
    { label:'Academics', href:'index.html#academics', wide:[
      { grp:'Basic Education Unit', items:[['Preschool','page.html?p=preschool'],['Grade School','page.html?p=gradeschool'],['Junior High School','page.html?p=jhs'],['Senior High School','page.html?p=shs']] },
      { grp:'Higher Education Unit', items:[['Undergraduate','page.html?p=undergraduate'],['Graduate','page.html?p=graduate'],['__SDTEC & More',''],['SDTEC','page.html?p=sdtec'],['Online · MC-COTEACH','page.html?p=coteach'],['Student Journal','page.html?p=student-journal']] } ] },
    { label:'Admissions', href:'index.html#academics', kids:[
      ['Apply Online','hris.html?portal=applicant'],['Basic Education','page.html?p=admissions-beu'],
      ['Higher Education','page.html?p=admissions-heu'],['Scholarships','page.html?p=scholarships'],
      ['Program Fees','page.html?p=program-fees'],['FAQs','page.html?p=faqs'] ] },
    { label:'International', href:'page.html?p=international' },
    { label:'Student Life', href:'page.html?p=clubs', kids:[
      ['Clubs & Organizations','page.html?p=clubs'],['Campus Facilities','page.html?p=facilities'],
      ['Residence Hall','page.html?p=residence-hall'],['ILAW · Well-being','page.html?p=ilaw'],
      ['Safe Spaces','page.html?p=safe-spaces'],['Career Opportunities','page.html?p=careers'] ] },
    { label:'News', href:'index.html#news' },
    { label:'Contact', href:'index.html#contact' }
  ];

  function deskNav() {
    return NAV.map(function (it) {
      if (!it.kids && !it.wide) return '<a href="' + it.href + '">' + it.label + '</a>';
      var drop;
      if (it.wide) {
        drop = '<div class="drop wide">' + it.wide.map(function (c) {
          return '<div class="col"><span class="grp">' + c.grp + '</span>' + c.items.map(function (x) {
            if (!x[1]) return '<span class="grp">' + x[0].replace('__', '') + '</span>';
            return '<a href="' + x[1] + '">' + x[0] + '</a>';
          }).join('') + '</div>';
        }).join('') + '</div>';
      } else {
        drop = '<div class="drop">' + it.kids.map(function (k) { return '<a href="' + k[1] + '">' + k[0] + '</a>'; }).join('') + '</div>';
      }
      return '<div class="navi"><a href="' + it.href + '">' + it.label + ' ' + CV + '</a>' + drop + '</div>';
    }).join('');
  }

  function mobNav() {
    return NAV.map(function (it) {
      if (!it.kids && !it.wide) return '<a href="' + it.href + '" data-close>' + it.label + '</a>';
      var subs;
      if (it.wide) { subs = it.wide.reduce(function (a, c) { return a.concat(c.items.filter(function (x) { return x[1]; })); }, []); }
      else subs = it.kids;
      return '<div class="macc-item"><button class="macc-h">' + it.label + '<span class="pm">+</span></button>' +
        '<div class="macc-sub">' + subs.map(function (k) { return '<a href="' + k[1] + '"' + (k[1].indexOf('page.html')===0||k[1].indexOf('index.html')===0?' data-close':'') + '>' + k[0] + '</a>'; }).join('') + '</div></div>';
    }).join('');
  }

  function headerHTML() {
    return '' +
    '<header class="site" id="siteHeader"><div class="wrap">' +
      '<a class="brand" href="index.html"><img src="' + IMG + 'MC_Logo_SEAL-FA-trans-blue-300x300.png" alt="Miriam College seal">' +
      '<div><b>Miriam College</b><span>Katipunan · Quezon City</span></div></a>' +
      '<nav class="main">' + deskNav() + '</nav>' +
      '<a class="btn btn-navy" href="hris.html">MC Portal <span class="ar">&rarr;</span></a>' +
      '<button class="hamburger" id="openNav" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg></button>' +
    '</div></header>' +
    '<div class="mnav" id="mnav"><div class="top"><b>Miriam College</b><button class="x" id="closeNav">&#10005;</button></div>' +
      '<div class="macc">' + mobNav() + '</div>' +
      '<a class="btn btn-gold" href="hris.html">MC Portal Login</a></div>';
  }

  function footerHTML() {
    return '<footer class="site"><div class="top">' +
      '<div><div class="fb"><img src="' + IMG + 'MC_Logo_SEAL-FA-trans-white-300x300.png" alt=""><div><b>Miriam College</b><span>Veritas · Est. 1926</span></div></div>' +
      '<p style="margin:0;max-width:34ch">A Filipino Catholic learning community that nurtures the whole person committed to lead in mission and service for the greater good.</p></div>' +
      '<div><h4>Explore</h4><ul><li><a href="index.html#about">About MC</a></li><li><a href="index.html#academics">Academics</a></li><li><a href="page.html?p=admissions-heu">Admissions</a></li><li><a href="index.html#campuses">Campuses</a></li></ul></div>' +
      '<div><h4>Community</h4><ul><li><a href="page.html?p=careers">Careers</a></li><li><a href="hris.html">MC Portal</a></li><li><a href="index.html#news">News</a></li><li><a href="page.html?p=ilaw">Student Life</a></li></ul></div>' +
      '<div class="contact"><h4>Contact</h4>' +
      '<p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>Katipunan Avenue, Loyola Heights,<br>Quezon City 1108, Philippines</span></p>' +
      '<p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg><span>(02) 8930-6272 · assist@mc.edu.ph</span></p>' +
      '<p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg><span>www.mc.edu.ph</span></p></div>' +
      '</div><div class="bottom"><span>© ' + (new Date().getFullYear()) + ' Miriam College. All rights reserved.</span><span class="v">VERITAS</span><span>Quezon City · Nuvali · Alviera</span></div></footer>';
  }

  function animate(root) {
    root = root || document;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    var els = [].slice.call(root.querySelectorAll('[data-reveal]:not(._o),.rule:not(._o),.stat:not(._o),.about .media:not(._o),.feat:not(._o)'));
    els.forEach(function (el) { el.classList.add('_o'); io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add('in'); }); }, 400);
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 2600);
    var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } }); }, { threshold: .6 });
    [].slice.call(root.querySelectorAll('[data-count]:not(._c)')).forEach(function (el) { el.classList.add('_c'); cio.observe(el); });
  }
  function count(el) {
    var t = +el.getAttribute('data-count'), plain = el.getAttribute('data-plain'), dur = 1500, st = null;
    function step(ts) { if (!st) st = ts; var p = Math.min((ts - st) / dur, 1), e = 1 - Math.pow(1 - p, 3), v = Math.floor(e * t);
      el.textContent = plain ? String(v) : v.toLocaleString('en-US'); if (p < 1) requestAnimationFrame(step); else el.textContent = plain ? String(t) : t.toLocaleString('en-US'); }
    requestAnimationFrame(step);
  }

  function boot() {
    if (!document.getElementById('sb')) {
      var bar = document.createElement('div'); bar.className = 'sbar'; bar.innerHTML = '<i id="sb"></i>';
      document.body.insertBefore(bar, document.body.firstChild);
    }
    // show the intro loader at most twice per browser session
    var showIntro = true;
    try { var ic = +(sessionStorage.getItem('mcIntro') || 0); if (ic >= 2) showIntro = false; else sessionStorage.setItem('mcIntro', ic + 1); } catch (e) {}
    if (showIntro && !document.getElementById('intro')) {
      var intro = document.createElement('div'); intro.id = 'intro';
      intro.innerHTML = '<div class="seal"><img src="' + IMG + 'MC_Logo_SEAL-FA-trans-white-300x300.png" alt=""></div>';
      document.body.insertBefore(intro, document.body.firstChild);
    }
    var top = document.getElementById('mc-top'), foot = document.getElementById('mc-foot');
    if (top) top.innerHTML = headerHTML();
    if (foot) foot.innerHTML = footerHTML();

    var header = document.getElementById('siteHeader'), sb = document.getElementById('sb'),
        px = [].slice.call(document.querySelectorAll('.px')), tick = false, lastY = 0, toTop = null;
    function onScroll() { if (tick) return; tick = true; requestAnimationFrame(function () {
      var y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
      if (header) {
        header.classList.toggle('scrolled', y > 12);
        if (y < 90 || y < lastY) header.classList.remove('nav-hidden'); // top, or ANY scroll up → show
        else if (y > lastY + 5) header.classList.add('nav-hidden');     // scroll down → hide
      }
      lastY = y;
      if (sb) sb.style.width = (h > 0 ? y / h * 100 : 0) + '%';
      if (toTop) toTop.classList.toggle('show', y > 600);
      for (var i = 0; i < px.length; i++) { var r = px[i].getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) { var o = (r.top - innerHeight / 2) / innerHeight; px[i].style.transform = 'translate3d(0,' + (o * -22) + 'px,0)'; } }
      tick = false; }); }
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    var m = document.getElementById('mnav'), ob = document.getElementById('openNav'), cb = document.getElementById('closeNav');
    function closeMenu() { if (m) m.classList.remove('open'); document.body.classList.remove('menu-open'); }
    if (ob) ob.onclick = function () { m.classList.add('open'); document.body.classList.add('menu-open'); };
    if (cb) cb.onclick = closeMenu;
    if (m) {
      [].slice.call(m.querySelectorAll('[data-close]')).forEach(function (a) { a.onclick = closeMenu; });
      [].slice.call(m.querySelectorAll('.macc-h')).forEach(function (h) { h.onclick = function () { h.parentNode.classList.toggle('open'); }; });
    }
    addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

    // back-to-top
    toTop = document.createElement('button'); toTop.className = 'to-top'; toTop.setAttribute('aria-label', 'Back to top');
    toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    toTop.onclick = function () { scrollTo({ top: 0, behavior: 'smooth' }); };
    document.body.appendChild(toTop);

    // active nav (scroll-spy) — homepage sections only
    var SPY = { about: 'index.html#about', values: 'index.html#about', academics: 'index.html#academics', campuses: 'index.html#campuses', news: 'index.html#news' };
    var secs = Object.keys(SPY).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (secs.length) {
      var sio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          [].forEach.call(document.querySelectorAll('nav.main a.navactive'), function (a) { a.classList.remove('navactive'); });
          var link = document.querySelector('nav.main a[href="' + SPY[e.target.id] + '"]');
          if (link) link.classList.add('navactive');
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      secs.forEach(function (s) { sio.observe(s); });
    }
    // subtle page fade-in on arrival
    var xf = document.createElement('div'); xf.className = 'xfade'; document.body.appendChild(xf);
    setTimeout(function () { if (xf && xf.parentNode) xf.parentNode.removeChild(xf); }, 700);

    // prefetch internal pages on hover for near-instant navigation
    var pref = {};
    document.addEventListener('mouseover', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      if (/^(https?:)?\/\//.test(href) && href.indexOf(location.host) === -1) return; // external
      var path = href.split('#')[0]; if (!path || pref[path]) return;
      pref[path] = 1;
      var l = document.createElement('link'); l.rel = 'prefetch'; l.href = path; document.head.appendChild(l);
    }, { passive: true });

    addEventListener('load', function () {
      var intro = document.getElementById('intro');
      setTimeout(function () { if (intro) intro.classList.add('gone'); }, 900);
      setTimeout(function () { document.body.classList.add('loaded'); }, 150);
    });
    setTimeout(function () { document.body.classList.add('loaded'); }, 400);
    animate(document);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  return { animate: animate };
})();
