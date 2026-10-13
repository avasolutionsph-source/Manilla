/* Renders a sub-page into #page from PAGES[?p=] */
(function () {
  function blocks(bs) {
    return (bs || []).map(function (b) {
      if (b.lead) return '<p class="lead-p" data-reveal="up">' + b.lead + '</p>';
      if (b.h) return '<h3 data-reveal="up">' + b.h + '</h3>';
      if (b.h4) return '<h4 data-reveal="up">' + b.h4 + '</h4>';
      if (b.p) return '<p data-reveal="up">' + b.p + '</p>';
      if (b.list) return '<ul data-reveal="up">' + b.list.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
      if (b.quote) return '<blockquote class="pquote" data-reveal="up">“' + b.quote + '”' + (b.by ? '<span class="by">— ' + b.by + '</span>' : '') + '</blockquote>';
      if (b.cards) return '<div class="pcards" data-reveal="up">' + b.cards.map(function (c) { return '<div class="pcard">' + (c.n ? '<div class="pn">' + c.n + '</div>' : '') + '<h4>' + c.t + '</h4><p>' + c.d + '</p></div>'; }).join('') + '</div>';
      if (b.stats) return '<div class="pstats" data-reveal="up">' + b.stats.map(function (s) { return '<div class="ps"><b>' + s.n + '</b><span>' + s.l + '</span></div>'; }).join('') + '</div>';
      return '';
    }).join('');
  }

  var p = (new URLSearchParams(location.search).get('p') || '').trim();
  var data = (window.PAGES || {})[p];
  var el = document.getElementById('page');
  if (!el) return;

  if (!data) {
    document.title = 'Page not found — Miriam College';
    el.innerHTML = '<section class="phero"><div class="pbg" style="background-image:url(\'old-site/images/EDITED-2-MMJ-BUILDING-scaled.jpg\')"></div>' +
      '<div class="wrap"><div class="pcrumb"><a href="index.html">Home</a></div><h1>Page not found</h1>' +
      '<p class="psub">The page you’re looking for isn’t available. Return to the homepage to continue exploring.</p></div></section>' +
      '<section class="pbody"><div class="wrap"><a class="btn btn-navy" href="index.html">← Back to Home</a></div></section>';
    return;
  }

  document.title = data.title + ' — Miriam College';
  var img = 'old-site/images/' + (data.img || 'EDITED-2-MMJ-BUILDING-scaled.jpg');
  var crumb = '<div class="pcrumb"><a href="index.html">Home</a><span class="sep">›</span>' +
    (data.section ? '<a href="' + data.section[1] + '">' + data.section[0] + '</a><span class="sep">›</span>' : '') +
    '<span>' + data.title + '</span></div>';
  var hero = '<section class="phero"><div class="pbg" style="background-image:url(\'' + img + '\')"></div><div class="wrap">' +
    crumb + '<h1>' + data.title + '</h1>' + (data.sub ? '<p class="psub">' + data.sub + '</p>' : '') + '</div></section>';
  var body = '<section class="pbody"><div class="wrap"><div class="prose">' + blocks(data.blocks) + '</div></div></section>';
  var cta = '<section class="cta-band"><div class="wrap"><div><div class="eyebrow">Take the next step</div>' +
    '<h2 style="margin-top:14px">Ready to begin your Miriam journey?</h2>' +
    '<p>Apply online, or sign in to the MC Portal for faculty, staff, and applicants.</p></div>' +
    '<div class="acts"><a class="btn btn-gold" href="hris.html?portal=applicant">Apply Online <span class="ar">→</span></a>' +
    '<a class="btn btn-outline" href="hris.html">MC Portal <span class="ar">→</span></a></div></div></section>';
  el.innerHTML = hero + body + cta;
  if (window.MCsite && MCsite.animate) MCsite.animate(el);
})();
