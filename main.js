/* גיטי קניאל - לוגיקה משותפת: תפריט, פוטר, ורינדור התוכן מתוך content.js */
(function () {
  var S = window.SITE;
  var page = document.body.getAttribute('data-page') || '';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var param = function (k) { return new URLSearchParams(location.search).get(k); };
  var byId = function (arr, id) { return arr.filter(function (x) { return x.id === id; })[0]; };
  /* detail pages: give search engines the item's own description instead of the generic one */
  var setDesc = function (t) { var m = $('meta[name="description"]'); if (m && t) m.setAttribute('content', String(t).slice(0, 160)); };

  /* תמונה עם גיבוי: אם אין תמונה או שהיא חסרה מוצג "תמונה בקרוב" */
  function pic(src, label, alt) {
    return '<span class="ph" aria-hidden="true">' + (label || 'תמונה בקרוב') + '</span>' +
      (src ? '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" onerror="this.remove()">' : '');
  }

  /* ---------- header + footer ---------- */
  var links = [['index.html', 'בית', 'home'], ['projects.html', 'פרויקטים', 'projects'], ['process.html', 'תהליכים', 'process'], ['blog.html', 'בלוג', 'blog'], ['about.html', 'אודות', 'about'], ['course.html', 'קורס Claude ל-Revit', 'course']];
  var nav = links.map(function (l) { return '<a href="' + l[0] + '"' + (page === l[2] ? ' class="active" aria-current="page"' : '') + '>' + l[1] + '</a>'; }).join('') +
    '<a class="nav-cta" href="contact.html">צרו קשר</a>';
  var h = $('#site-header');
  if (h) h.outerHTML = '<div class="beta-bar" role="note">האתר בהרצה. ייתכנו שינויים ותכנים חלקיים.</div>' +
    '<header class="site-header" id="hdr"><div class="wrap header-inner">' +
    '<nav class="nav" id="nav" aria-label="ניווט ראשי">' + nav + '</nav>' +
    '<button class="menu-btn" id="menuBtn" aria-label="תפריט" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>' +
    '<a class="logo" href="index.html" aria-label="גיטי קניאל"><img src="images/logo.png" alt="גיטי קניאל"></a></div></header>';

  /* social links as thin line icons, same style as the WhatsApp icon */
  var ico = function (href, label, svg) { return '<a href="' + esc(href) + '" target="_blank" rel="noopener" aria-label="' + label + ' (נפתח בחלון חדש)"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + svg + '</svg></a>'; };
  var soc = (S.social.instagram ? ico(S.social.instagram, 'אינסטגרם', '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>') : '') +
    (S.social.youtube ? ico(S.social.youtube, 'יוטיוב', '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z"/>') : '');
  if (soc) soc = '<div class="f-social">' + soc + '</div>';
  var f = $('#site-footer');
  if (f) f.outerHTML = '<footer class="site-footer"><div class="wrap"><div class="foot-grid">' +
    '<div><img src="images/logo-white.png" alt="גיטי קניאל"><p>אדריכלות ועיצוב פנים.<br>התכנון שלי זה הרווח שלך.</p></div>' +
    '<div><h2>ניווט</h2><a href="index.html">בית</a><a href="projects.html">פרויקטים</a><a href="process.html">תהליכים</a><a href="blog.html">בלוג</a><a href="about.html">אודות</a><a href="contact.html">צרו קשר</a><a href="course.html">קורס Claude ל-Revit</a><a href="accessibility.html">הצהרת נגישות</a></div>' +
    '<div><h2>דברו איתי</h2>' +
    '<div class="f-phone"><a href="tel:' + S.phoneRaw + '" dir="ltr">' + S.phone + '</a>' +
    '<a class="f-wa" href="https://wa.me/' + S.whatsapp + '" target="_blank" rel="noopener" aria-label="וואטסאפ (נפתח בחלון חדש)"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21z"/><path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z"/></svg></a></div>' +
    '<a href="https://mail.google.com/mail/?view=cm&fs=1&to=' + S.email + '" target="_blank" rel="noopener" dir="ltr" style="text-align:right">' + S.email + '<span class="sr-only"> (נפתח בחלון חדש)</span></a>' +
    (S.address ? '<p class="f-addr">' + esc(S.address) + '<br>ניווט: <a href="https://waze.com/ul?q=' + encodeURIComponent(S.address) + '&navigate=yes" target="_blank" rel="noopener">Waze<span class="sr-only"> (נפתח בחלון חדש)</span></a> · <a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.address) + '" target="_blank" rel="noopener">Google Maps<span class="sr-only"> (נפתח בחלון חדש)</span></a></p>' : '') +
    soc + '</div>' +
    '</div><div class="foot-bottom">© ' + new Date().getFullYear() + ' גיטי קניאל | ' + S.domain + ' | <a href="accessibility.html" style="display:inline">הצהרת נגישות</a></div></div></footer>';

  if (page !== 'contact') {
    var n = document.createElement('a');
    n.className = 'nudge'; n.href = 'https://wa.me/' + S.whatsapp; n.target = '_blank'; n.rel = 'noopener';
    n.setAttribute('aria-label', 'בואו נדבר בוואטסאפ (נפתח בחלון חדש)');
    n.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21z"/><path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z"/></svg><span>בואו נדבר</span>';
    var nw = document.createElement('aside'); nw.setAttribute('aria-label', 'יצירת קשר מהירה');   /* a landmark, so screen readers can find it */
    nw.appendChild(n); document.body.appendChild(nw);
  }
  /* one scroll listener, at most one update per frame */
  var hdr = $('#hdr'), ticking = false;
  var onScroll = function () {
    ticking = false; var y = window.scrollY;
    if (hdr) hdr.classList.toggle('scrolled', y > 10);
    if (n) n.classList.toggle('show', y > 700);
  };
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  var mb = $('#menuBtn'), navEl = $('#nav');
  var setMenu = function (o) { navEl.classList.toggle('open', o); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); };
  if (mb) mb.addEventListener('click', function () { setMenu(!navEl.classList.contains('open')); });

  /* ---------- lightbox (shared) ---------- */
  var lb = document.createElement('div'); lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'תמונה מוגדלת');
  lb.innerHTML = '<button class="lb-close" aria-label="סגירה">&times;</button><img alt="">'; document.body.appendChild(lb);
  var lbFrom = null;
  var lbOpen = function (t) {
    var im = t.querySelector('img') || (t.tagName === 'IMG' ? t : null);
    lb.querySelector('img').src = t.getAttribute('data-full'); lb.querySelector('img').alt = im ? im.alt : '';
    lbFrom = t; lb.classList.add('on'); lb.querySelector('.lb-close').focus();
  };
  var lbClose = function () { if (!lb.classList.contains('on')) return; lb.classList.remove('on'); lb.querySelector('img').removeAttribute('src'); if (lbFrom) lbFrom.focus(); };
  document.addEventListener('click', function (e) { var t = e.target.closest('[data-full]'); if (t) lbOpen(t); });
  document.addEventListener('keydown', function (e) {
    var t = e.target.closest && e.target.closest('[data-full]');
    if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); lbOpen(t); }
    if (e.key === 'Escape') { if (lb.classList.contains('on')) lbClose(); else if (mb && navEl.classList.contains('open')) { setMenu(false); mb.focus(); } }
    if (e.key === 'Tab' && lb.classList.contains('on')) { e.preventDefault(); lb.querySelector('.lb-close').focus(); }
  });
  lb.addEventListener('click', lbClose);

  /* horizontal swipe: fn(+1) for a swipe to the right, fn(-1) to the left; vertical page scrolling is ignored */
  function swipe(el, fn) {
    var x0 = null, y0 = 0;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) fn(dx > 0 ? 1 : -1);
    });
  }
  /* resize callbacks run once per frame, not on every resize event */
  var resizers = [], rzPending = false;
  function onResize(fn) { resizers.push(fn); }
  window.addEventListener('resize', function () {
    if (rzPending) return; rzPending = true;
    requestAnimationFrame(function () { rzPending = false; resizers.forEach(function (fn) { fn(); }); });
  });

  /* ---------- sliding carousel with arrows (home: projects, videos, blog) ---------- */
  function hcar(el, cardsHtml) {
    el.innerHTML = '<button class="harrow hprev" aria-label="הקודמים">&rsaquo;</button><div class="hcar-vp"><div class="hcar-track">' + cardsHtml + '</div></div><button class="harrow hnext" aria-label="הבאים">&lsaquo;</button>';
    var track = el.querySelector('.hcar-track'), items = track.children, idx = 0;
    var per = function () { var w = el.querySelector('.hcar-vp').clientWidth, iw = items[0] ? items[0].getBoundingClientRect().width : w; return Math.max(1, Math.round(w / Math.max(iw, 1))); };
    var step = function () { if (!items[1]) return 0; return Math.abs(items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left); };
    var maxIdx = function () { return Math.max(0, items.length - per()); };
    var prevB = el.querySelector('.hprev'), nextB = el.querySelector('.hnext');
    var draw = function () {
      /* read all sizes first, then write, so the browser lays out once */
      var pv = per(), mx = Math.max(0, items.length - pv), st = step();
      idx = Math.max(0, Math.min(idx, mx));
      track.style.transform = 'translateX(' + (idx * st) + 'px)';
      prevB.disabled = idx === 0; nextB.disabled = idx >= mx;
      Array.prototype.forEach.call(items, function (it, k) { var vis = k >= idx && k < idx + pv; it.setAttribute('aria-hidden', vis ? 'false' : 'true'); var fs = Array.prototype.slice.call(it.querySelectorAll('a,button,[role=button]')); if (it.matches('a,button')) fs.push(it); fs.forEach(function (f) { if (vis) f.removeAttribute('tabindex'); else f.setAttribute('tabindex', '-1'); }); });
    };
    nextB.addEventListener('click', function () { idx++; draw(); });
    prevB.addEventListener('click', function () { idx--; draw(); });
    swipe(el, function (dir) { idx += dir; draw(); });
    onResize(draw);
    draw();
  }

  /* ---------- spaces (portfolio) ---------- */
  var roomName = function (id) { var r = byId(S.rooms, id); return r ? r.name : ''; };
  function spaceCard(p) {
    return '<a class="proj" href="project.html?id=' + esc(p.id) + '"><div class="img">' + pic(p.cover) + '</div>' +
      '<span class="meta">' + esc(roomName(p.room)) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p></a>';
  }
  var fp = $('#featured-projects');
  if (fp) {
    var byRoom = S.rooms.map(function (r) { return S.spaces.filter(function (x) { return x.room === r.id; }); }), mixed = [], more = true;
    for (var k = 0; more; k++) { more = false; byRoom.forEach(function (list) { if (list[k]) { mixed.push(list[k]); more = true; } }); }
    hcar(fp, mixed.map(spaceCard).join(''));
  }

  var pg = $('#projects-grid');
  if (pg) {
    var bar = $('#filters');
    bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'סינון לפי חלל');
    bar.innerHTML = '<button class="filter on" aria-pressed="true" data-cat="all">הכול</button>' + S.rooms.map(function (r) {
      return '<button class="filter" aria-pressed="false" data-cat="' + r.id + '">' + esc(r.name) + '</button>';
    }).join('');
    var draw = function (cat) {
      pg.innerHTML = S.spaces.filter(function (p) { return cat === 'all' || p.room === cat; }).map(spaceCard).join('');
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.filter'); if (!b) return;
      bar.querySelectorAll('.filter').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); draw(b.getAttribute('data-cat'));
      try { history.replaceState(null, '', b.getAttribute('data-cat') === 'all' ? location.pathname : '#' + b.getAttribute('data-cat')); } catch (er) {}
    });
    /* compare by value instead of building a selector from the URL: a hash like #a"] would throw and stop the whole script */
    var fromHash = function () {
      var start = (location.hash || '').slice(1); try { start = decodeURIComponent(start); } catch (er) {}
      var sb = start && Array.prototype.filter.call(bar.querySelectorAll('.filter'), function (b) { return b.getAttribute('data-cat') === start; })[0];
      (sb || bar.querySelector('.filter')).click();
    };
    fromHash(); window.addEventListener('hashchange', fromHash);
  }

  var fig = function (g, cls, alt) { return '<figure class="' + cls + '"><div class="img" data-full="' + esc(g) + '" tabindex="0" role="button" aria-label="הגדלת התמונה: ' + esc(alt || '') + '">' + pic(g, '', alt) + '</div></figure>'; };
  var pd = $('#project-detail');
  if (pd) {
    var p = byId(S.spaces, param('id')) || S.spaces[0];
    document.title = p.title + ' | גיטי קניאל'; setDesc(p.desc);
    var st = p.story && byId(S.stories, p.story);
    pd.innerHTML = '<div class="page-head" style="padding-top:20px"><span class="eyebrow">' + esc(roomName(p.room)) + '</span>' +
      '<h1>' + esc(p.title) + '</h1><span class="rule" style="margin-inline:auto"></span><p>' + esc(p.desc) + '</p></div>' +
      '<div class="gal">' + (p.images || []).map(function (g, k) { return fig(g, 'ph-item', p.title + ', תמונה ' + (k + 1)); }).join('') + '</div>' +
      (p.before && p.before.length ? '<div class="sub-head"><span class="eyebrow">לפני</span></div><div class="gal">' + p.before.map(function (g, k) { return fig(g, 'ph-item', p.title + ', לפני, תמונה ' + (k + 1)); }).join('') + '</div>' : '') +
      (st ? '<div class="story-link"><span class="eyebrow">הסיפור של הפרויקט</span><h2 class="h3">' + esc(st.title) + '</h2><a class="btn arrow" href="story.html?id=' + esc(st.id) + '">לסיפור המלא</a></div>' : '') +
      '<p class="center" style="margin-top:60px"><a class="btn arrow" href="projects.html#' + esc(p.room) + '">עוד ב' + esc(roomName(p.room)) + '</a></p>';
  }

  /* ---------- process / stories ---------- */
  function storyCard(s) {
    return '<a class="proj" href="story.html?id=' + esc(s.id) + '"><div class="img">' + pic(s.cover) + '</div>' +
      '<span class="meta">' + esc(s.tag || '') + (s.place ? ' · ' + esc(s.place) : '') + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p></a>';
  }
  var sl = $('#story-list'); if (sl) sl.innerHTML = S.stories.map(storyCard).join('');

  /* before / after slider */
  function compare(c) {
    return '<div class="cmp" style="--pos:50%"><img class="cmp-a" src="' + esc(c.after) + '" alt="אחרי השיפוץ" loading="lazy">' +
      '<div class="cmp-b"><img src="' + esc(c.before) + '" alt="לפני השיפוץ" loading="lazy"></div>' +
      '<span class="cmp-tag cmp-tag-b" aria-hidden="true">לפני</span><span class="cmp-tag cmp-tag-a" aria-hidden="true">אחרי</span>' +
      '<span class="cmp-bar"><i></i></span><input type="range" min="0" max="100" value="50" aria-label="השוואת לפני ואחרי: גררו או השתמשו בחיצים"></div>';
  }
  document.addEventListener('input', function (e) {
    if (e.target.matches('.cmp input')) e.target.parentNode.style.setProperty('--pos', e.target.value + '%');
  });

  var sd = $('#story-detail');
  if (sd) {
    var s = byId(S.stories, param('id')) || S.stories[0];
    document.title = s.title + ' | גיטי קניאל'; setDesc(s.desc);
    var story = (s.story || []).map(function (c) {
      return '<div class="chap">' + (c.h ? '<h2 class="h3">' + esc(c.h) + '</h2>' : '') + '<p>' + esc(c.p) + '</p></div>';
    }).join('');
    var plans = (s.plans || []).map(function (x) {
      return '<figure class="plan"><img src="' + esc(x.src) + '" alt="' + esc(s.title + ': ' + x.caption) + '" data-full="' + esc(x.src) + '" tabindex="0" role="button" loading="lazy"><figcaption>' + esc(x.caption) + '</figcaption></figure>';
    }).join('');
    var cmps = (s.compare || []).map(compare).join('');
    var gal = function (arr, what) { return '<div class="gal">' + arr.map(function (g, k) { return fig(g, 'ph-item', s.title + ', ' + what + ' ' + (k + 1)); }).join('') + '</div>'; };
    var related = S.spaces.filter(function (x) { return x.story === s.id; });
    sd.innerHTML = '<div class="page-head" style="padding-top:20px"><span class="eyebrow">' + esc(s.tag || '') + (s.place ? ' · ' + esc(s.place) : '') + '</span>' +
      '<h1>' + esc(s.title) + '</h1><span class="rule" style="margin-inline:auto"></span><p>' + esc(s.desc) + '</p></div>' +
      '<div class="story' + (s.portrait ? ' with-portrait' : '') + '">' +
      (s.portrait ? '<figure class="portrait"><div class="img" data-full="' + esc(s.portrait) + '" tabindex="0" role="button" aria-label="הגדלת התמונה">' + pic(s.portrait, '', s.portraitCaption || 'גיטי קניאל') + '</div><figcaption>' + esc(s.portraitCaption || '') + '</figcaption></figure>' : '') +
      '<div class="story-text">' + story + '</div></div>' +
      (cmps ? '<div class="sub-head"><span class="eyebrow">לפני ואחרי: גררו את הסמן</span></div><div class="cmps">' + cmps + '</div>' : '') +
      (plans ? '<div class="sub-head"><span class="eyebrow">מהתכנון</span></div><div class="plans">' + plans + '</div>' : '') +
      (s.before && s.before.length ? '<div class="sub-head"><span class="eyebrow">לפני</span></div>' + gal(s.before, 'לפני, תמונה') : '') +
      '<div class="sub-head"><span class="eyebrow">התוצאה</span></div>' + gal(s.gallery || [], 'תמונה') +
      (related.length ? '<div class="sub-head"><span class="eyebrow">בתיק העבודות</span></div><div class="proj-grid">' + related.map(spaceCard).join('') + '</div>' : '') +
      '<p class="center" style="margin-top:60px"><a class="btn arrow" href="process.html">לכל התהליכים</a></p>';
  }

  /* ---------- videos ---------- */
  function videoCard(v) {
    var tag = v.type === 'youtube' ? 'YOUTUBE' : 'INSTAGRAM';
    var cover = v.cover || (v.type === 'youtube' && v.id ? 'https://i.ytimg.com/vi/' + v.id + '/oardefault.jpg' : '');
    if (!v.id) return '<div class="video" style="cursor:default"><span class="tag">' + tag + '</span>' + pic('', 'סרטון בקרוב') + '</div>';
    return '<button class="video" data-type="' + v.type + '" data-id="' + esc(v.id) + '" aria-label="' + esc(v.title) + '">' +
      '<span class="tag">' + tag + '</span>' + pic(cover, '') +
      '<span class="play"><i></i><span class="cap">' + esc(v.title) + '</span></span></button>';
  }
  var sl2 = $('#social-links');
  if (sl2) sl2.innerHTML = (S.social.youtube ? '<a class="textlink" href="' + esc(S.social.youtube) + '" target="_blank" rel="noopener">לערוץ היוטיוב<span class="sr-only"> (נפתח בחלון חדש)</span></a>' : '') + (S.social.instagram ? '<a class="textlink" href="' + esc(S.social.instagram) + '" target="_blank" rel="noopener">לאינסטגרם<span class="sr-only"> (נפתח בחלון חדש)</span></a>' : '');
  var vg = $('#video-grid');
  if (vg) {
    if (vg.classList.contains('hcar')) hcar(vg, S.videos.map(videoCard).join('')); else vg.innerHTML = S.videos.map(videoCard).join('');
    vg.addEventListener('click', function (e) {
      var b = e.target.closest('.video[data-id]'); if (!b) return;
      var id = b.getAttribute('data-id');
      var src = b.getAttribute('data-type') === 'youtube'
        ? 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0'
        : 'https://www.instagram.com/reel/' + id + '/embed';
      /* the player replaces the button: an iframe inside a <button> is invalid HTML and traps the player's own controls */
      var box = document.createElement('div');
      box.className = b.className;
      box.innerHTML = '<iframe title="' + esc(b.getAttribute('aria-label') || 'סרטון') + '" src="' + src + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      b.parentNode.replaceChild(box, b);
      box.querySelector('iframe').focus();
    });
  }

  /* ---------- testimonials ---------- */
  /* name on one line, place under it (no joining dot) */
  function who(t) {
    if (!t.name && !t.place) return '';
    return '<div class="who">' + (t.name ? '<span class="who-name">' + esc(t.name) + '</span>' : '') + (t.place ? '<span class="who-place">' + esc(t.place) + '</span>' : '') + '</div>';
  }
  var tm = $('#testimonials');
  if (tm) {
    /* track slider (the standard used by Swiper/Splide): slides sit side by side, the whole track moves,
       so the outgoing and incoming slides travel together as one continuous motion. */
    tm.innerHTML = '<div class="testi-wrap" role="region" aria-roledescription="קרוסלה" aria-label="המלצות לקוחות"><button class="tarrow tprev" aria-label="הקודמת">&rsaquo;</button><button class="tarrow tnext" aria-label="הבאה">&lsaquo;</button><div class="testi-stage"><div class="testi-track">' + S.testimonials.map(function (t, i) {
      return '<div class="quote' + (i ? '' : ' on') + '" data-i="' + i + '"><p>“' + esc(t.text) + '”</p>' + who(t) + '</div>';
    }).join('') + '</div></div></div><div class="dots">' + S.testimonials.map(function (t, i) { return '<button aria-label="המלצה ' + (i + 1) + '"' + (i ? '' : ' class="on"') + '></button>'; }).join('') + '</div>';
    var track = tm.querySelector('.testi-track'), stage = tm.querySelector('.testi-stage'), ds = tm.querySelectorAll('.dots button');
    var N = S.testimonials.length, busy = false;
    var DUR = 620;                                   /* ms, matches the CSS transition */
    var fit = function () { var m = 0; track.querySelectorAll('.quote').forEach(function (q) { m = Math.max(m, q.scrollHeight); }); stage.style.height = m + 'px'; };
    fit(); onResize(fit); window.addEventListener('load', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    var aria = function () { track.querySelectorAll('.quote').forEach(function (q) { q.setAttribute('aria-hidden', q.classList.contains('on') ? 'false' : 'true'); }); };
    var setActive = function () { var a = +track.firstElementChild.getAttribute('data-i'); track.querySelectorAll('.quote').forEach(function (q) { q.classList.toggle('on', q === track.firstElementChild); }); ds.forEach(function (d, i) { d.classList.toggle('on', i === a); }); };
    var instant = function (fn) { track.style.transition = 'none'; fn(); void track.offsetWidth; track.style.transition = ''; };
    var normalize = function () { var f = +track.firstElementChild.getAttribute('data-i'); Array.prototype.slice.call(track.children).sort(function (a, b) { return ((+a.getAttribute('data-i') - f + N) % N) - ((+b.getAttribute('data-i') - f + N) % N); }).forEach(function (el) { track.appendChild(el); }); };
    var next = function (done) {
      if (busy || N < 2) return; busy = true;
      var n = track.children[1]; n.classList.add('on'); track.firstElementChild.classList.remove('on');
      ds.forEach(function (d, i) { d.classList.toggle('on', i === +n.getAttribute('data-i')); });
      track.style.transform = 'translateX(-100%)';
      setTimeout(function () { instant(function () { track.appendChild(track.firstElementChild); normalize(); track.style.transform = ''; }); busy = false; if (done) done(); }, DUR);
    };
    var prev = function () {
      if (busy || N < 2) return; busy = true;
      instant(function () { track.insertBefore(track.lastElementChild, track.firstElementChild); track.style.transform = 'translateX(-100%)'; });
      var p = track.firstElementChild; p.classList.add('on'); track.children[1].classList.remove('on');
      ds.forEach(function (d, i) { d.classList.toggle('on', i === +p.getAttribute('data-i')); });
      track.style.transform = '';
      setTimeout(function () { busy = false; }, DUR);
    };
    var jump = function (i) {                         /* dots: bring the wanted slide right after the current one, then slide */
      if (busy) return; var cur = +track.firstElementChild.getAttribute('data-i'); if (i === cur) return;
      instant(function () { var target = track.querySelector('[data-i="' + i + '"]'); track.insertBefore(target, track.children[1]); });
      next();
    };
    aria(); new MutationObserver(aria).observe(track, { subtree: true, attributes: true, attributeFilter: ['class'] });
    /* no autoplay: testimonials change only by the arrows, dots or swipe */
    ds.forEach(function (d, i) { d.addEventListener('click', function () { jump(i); }); });
    tm.querySelector('.tprev').addEventListener('click', function () { prev(); });
    tm.querySelector('.tnext').addEventListener('click', function () { next(); });
    swipe(tm, function (dir) { if (dir > 0) prev(); else next(); });
  }
  var tg = $('#testimonials-grid');
  if (tg) tg.innerHTML = S.testimonials.map(function (t) {
    return '<div class="quote"><p>“' + esc(t.text) + '”</p>' + who(t) + '</div>';
  }).join('');

  /* ---------- articles ---------- */
  var catName = function (id) { var c = byId(S.articleCats || [], id); return c ? c.name : 'מאמר'; };
  function postCard(a) {
    return '<a class="post" href="article.html?id=' + esc(a.id) + '"><div class="img">' + pic(a.cover, 'G') + '</div>' +
      '<span class="meta">' + esc(catName(a.category)) + (a.date ? ' · ' + esc(a.date) : '') + '</span><h3>' + esc(a.title) + '</h3><p>' + esc(a.excerpt) + '</p><span class="textlink">לקריאה</span></a>';
  }
  var bp = $('#blog-preview'); if (bp) hcar(bp, S.articles.map(postCard).join(''));
  var bl = $('#blog-list');
  if (bl) {
    var fb = $('#article-filters');
    fb.setAttribute('role', 'group'); fb.setAttribute('aria-label', 'סינון מאמרים');
    fb.innerHTML = '<button class="filter on" aria-pressed="true" data-cat="all">הכול</button>' + (S.articleCats || []).map(function (c) {
      return '<button class="filter" aria-pressed="false" data-cat="' + c.id + '">' + esc(c.name) + '</button>';
    }).join('');
    var drawA = function (cat) {
      bl.innerHTML = S.articles.filter(function (a) { return cat === 'all' || a.category === cat; }).map(postCard).join('');
    };
    fb.addEventListener('click', function (e) {
      var b = e.target.closest('.filter'); if (!b) return;
      fb.querySelectorAll('.filter').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); drawA(b.getAttribute('data-cat'));
    });
    drawA('all');
  }

  var ar = $('#article');
  if (ar) {
    var a = byId(S.articles, param('id')) || S.articles[0];
    document.title = a.title + ' | גיטי קניאל'; setDesc(a.excerpt || a.intro);
    var idx = S.articles.indexOf(a), nxt = S.articles[(idx + 1) % S.articles.length];
    ar.innerHTML = '<p><a class="textlink" href="blog.html">&rarr; לכל המאמרים</a></p><div style="height:30px"></div>' +
      '<span class="eyebrow">' + esc(catName(a.category)) + (a.date ? ' · ' + esc(a.date) : '') + '</span><h1>' + esc(a.title) + '</h1><span class="rule"></span>' +
      '<p class="lead">' + esc(a.intro) + '</p>' +
      (a.sections || []).map(function (s, i) {
        return '<div class="part"><span class="no" aria-hidden="true">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</span><h2 class="h3">' + esc(s.h) + '</h2>' + String(s.p).split('\n').map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>';
      }).join('') +
      (a.quote ? '<blockquote class="aquote">' + esc(a.quote) + '</blockquote>' : '') +
      (nxt && nxt !== a ? '<div class="next"><span class="eyebrow">המאמר הבא</span><h3><a href="article.html?id=' + esc(nxt.id) + '">' + esc(nxt.title) + '</a></h3></div>' : '');
  }
})();
