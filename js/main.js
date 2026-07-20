/* Dubai Barber Shop — Precotto, Milano
   Plumbing canonico (PLUMBING_V 2) + codice-firma del sito. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'dubai-barber-shop',
    /* ⚠️ NESSUN telefono pubblico su nessuna scheda: niente tel:, niente
       wa.me. Le CTA portano al listino e alle indicazioni. */
    whatsapp: { number: '', message: '', ids: [] },
    /* Lunedì CHIUSO · martedì–domenica 09:00–20:00 (scheda Treatwell). */
    hours: {
      0: [['09:00', '20:00']],
      1: [],
      2: [['09:00', '20:00']],
      3: [['09:00', '20:00']],
      4: [['09:00', '20:00']],
      5: [['09:00', '20:00']],
      6: [['09:00', '20:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'nav.tempo': 'Prices', 'nav.chi': 'Amid and Said', 'nav.voci': 'Reviews', 'nav.dove': 'Find us',
      'cta.dove': 'Getting here', 'a.lang': 'Change language', 'a.menu': 'Open the menu', 'a.chiudi': 'Close',
      'a.zoomMacchinetta': 'Enlarge the clipper cut photo', 'a.zoomRasoio': 'Enlarge the razor shave photo',
      'alt.forbice': 'A cut being finished with scissors and comb',
      'alt.macchinetta': 'The nape being tidied with clippers and comb',
      'alt.rasoio': 'A beard being shaved with a straight razor',
      'hero.kicker': 'Precotto · Milan · open on Sundays too',
      'hero.h': 'How much time have you got?',
      'hero.lead': 'Every service here comes with a price and a stated length. So the right question is not what it costs: it is how much time you have right now.',
      'hero.rec': 'from 537 reviews',
      'hero.cta1': 'See the price list', 'hero.cta2': 'Find us',
      'tem.occhiello': 'The price list, by length',
      'tem.h': 'A quarter of an hour, half an hour,<br>three quarters',
      'tem.p': 'These are the prices the shop publishes on its own booking channel. The length is the time the barber sets aside for each service.',
      's1': 'Beard with clippers', 's2': 'Clipper trim', 's3': 'Head shave with razor',
      's4': 'Beard shaping', 's5': "Child's cut", 's6': "Men's cut",
      's7': 'Blade fade', 's8': "Shampoo and men's cut",
      'f1.nota': 'The length of a coffee break.', 'f2.nota': 'The classic cut, unhurried.',
      'f3.nota': 'When the blade comes out.',
      'tem.marche': 'In the chair they use Nish Man and Red One products.',
      'chi.occhiello': 'Who you will find', 'chi.h': 'Amid and Said',
      'chi.p': '<strong>Amid</strong> alone has <strong>422 reviews</strong> in his name, averaging 4.9. In the customers\' words "professional", "competent" and "friendly" keep coming back. <strong>Said</strong> works alongside him.',
      'chi.p2': 'You can book online — the shop has done so since 2023 — and cancel up to three hours before. Or you can simply walk in.',
      'voci.occhiello': 'What customers say', 'voci.h': 'Four, exactly as they are',
      'voci.nota': 'These are verified reviews: on Treatwell only people who actually booked can leave one. Out of 537, four hundred and two gave a full five stars.',
      'dove.occhiello': 'Where we are', 'dove.h': 'Via Bernardo Rucellai 12',
      'dove.p': 'Milan, between Precotto and Gorla: both M1 metro stops are a few minutes on foot, and tram 7 stops at Largo Mattei.',
      'g.lun': 'Monday', 'g.mar': 'Tuesday', 'g.mer': 'Wednesday', 'g.gio': 'Thursday',
      'g.ven': 'Friday', 'g.sab': 'Saturday', 'g.dom': 'Sunday', 'g.chiuso': 'closed',
      'dove.nota': 'Sunday is a full day, not an exception: the shop opens at nine like any other day.',
      'faq.h': 'Frequently asked questions',
      'faq.q1': 'Are you open on Sundays?',
      'faq.a1': 'Yes. Open Tuesday to Sunday from 9:00 to 20:00. The closing day is Monday.',
      'faq.q2': 'How long does a cut take?',
      'faq.a2': "The men's cut is thirty minutes, forty-five with the shampoo. The clipper beard and the clipper trim take a quarter of an hour.",
      'faq.q3': 'How much does it cost?',
      'faq.a3': "Beard with clippers €5, clipper trim €8, beard shaping and head shave €10, child's cut €12, men's cut €13, blade fade €15, shampoo and cut €16.",
      'faq.q4': 'Do I need to book?',
      'faq.a4': 'Not necessarily, but you can book online — the shop has done so since 2023 — and cancel up to three hours before.',
      'faq.q5': 'Where are you?',
      'faq.a5': 'At via Bernardo Rucellai 12, between Precotto and Gorla: both M1 stops are a few minutes on foot.',
      'foot.orari': 'Tuesday–Sunday 9:00–20:00 · closed on Monday',
      'foot.demo': 'Demonstration website made by Bespoke Studio using public data and photographs of the business.',
      'bar.listino': 'Prices', 'bar.dove': 'Find us',
    },
  };
  /* ═════════════════════════════════════ */

  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' + encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  var intro = document.getElementById(SITE.introId);
  var heroEntrance = function () { if (window.bespokeHeroEntrance) window.bespokeHeroEntrance(); };
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 600);
    heroEntrance();
  }
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      killIntroNow();
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) };
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) };
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    var en = root.lang === 'en';
    var txt;
    if (st.open) {
      txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    } else if (st.opensToday) {
      txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    } else {
      txt = en ? 'Closed' : 'Chiuso';
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  var originals = {};
  var I18N_ATTRS = [
    ['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'], ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var lt = document.getElementById('langToggle');
    if (lt) lt.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  }
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — codice-firma: LE FASCE DI DURATA ══════
     Le barre 15/30/45 si riempiono quando la fascia entra in vista.
     ⚠️ Sono INFORMAZIONE, non decorazione: la larghezza sta in una
     variabile CSS (--w) e viene applicata con una classe, senza GSAP,
     così funzionano anche se la CDN non risponde. Senza JS ci pensa la
     regola `html:not(.js) .fascia__barra i`.
     ⚠️ MAI un terzo argomento su gsap.from(): la firma legacy è
     (target, duration, vars) e l'elemento resterebbe a opacity 0. */

  var barre = document.querySelectorAll('.fascia__barra');
  function accendiBarre() { barre.forEach(function (b) { b.classList.add('is-on'); }); }
  if (barre.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      accendiBarre();
    } else {
      var ioBarre = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-on');
          ioBarre.unobserve(e.target);
        });
      }, { threshold: 0.4 });
      barre.forEach(function (b) { ioBarre.observe(b); });
      setTimeout(accendiBarre, 2500); // rete di sicurezza
    }
  }

  if (hasGsap && !reducedMotion) {
    window.bespokeHeroEntrance = function () {
      gsap.from('.hero__foto', { opacity: 0, x: 24, duration: .9, ease: 'power3.out' });
      gsap.from('.hero__kicker, .hero__h, .hero__lead, .hero__voto, .hero__cta', {
        opacity: 0, y: 22, duration: .7, stagger: .09, ease: 'power3.out', delay: .12,
      });
    };
  }
})();
