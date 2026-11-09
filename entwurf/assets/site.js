/* Entwürfe: Auswahl beim ersten Aufruf, Einblenden beim Scrollen, Kopfzeile, sanfte Tiefe der Grafik. Ohne Bibliotheken. */

/* Auswahl beim ersten Aufruf: Entwurf ansehen oder Janniks Website ansehen */
(function () {
  'use strict';
  var html = document.documentElement;
  var HOME = '../../?von=entwurf';
  var KEY = 'jh-wahl:' + location.pathname;
  function seen() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function remember() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }

  var markEl = document.querySelector('.top-bar .mark');
  var name = markEl ? markEl.textContent.trim() : document.title.replace(/\s*–\s*Entwurf\s*$/, '');

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  /* Kleiner Knopf, der nach der Auswahl bleibt */
  function pill() {
    if (document.querySelector('.jh-pill')) return;
    var a = el('a', 'jh-pill');
    a.href = HOME;
    a.appendChild(el('span', 'jh-dot'));
    a.appendChild(el('span', '', 'Janniks Website ansehen'));
    a.appendChild(el('span', 'jh-arr', '→'));
    document.body.appendChild(a);
    html.classList.add('jh-has-pill');
    requestAnimationFrame(function () { a.classList.add('on'); });
  }

  function close(gate) {
    remember();
    html.classList.remove('jh-lock');
    gate.classList.add('out');
    window.__jhGate = false;
    document.dispatchEvent(new Event('jh:closed'));
    setTimeout(function () { if (gate.parentNode) gate.parentNode.removeChild(gate); }, 450);
    pill();
  }

  if (seen() || !document.body) { pill(); return; }

  window.__jhGate = true;
  var gate = el('div', 'jh-gate');
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-modal', 'true');
  gate.setAttribute('aria-labelledby', 'jh-t');
  gate.tabIndex = -1;
  var inner = el('div', 'jh-in');

  var k = el('p', 'jh-k');
  var ava = el('img', 'jh-ava');
  ava.src = '../assets/jannik-avatar.jpg';
  ava.alt = '';
  k.appendChild(ava);
  k.appendChild(document.createTextNode('Jannik Hofstetter · Webdesign'));
  var h = el('h2', '', 'Ihr Website-Entwurf ist fertig.');
  h.id = 'jh-t';
  var s = el('p', 'jh-s');
  s.appendChild(document.createTextNode('Ich habe für '));
  s.appendChild(el('b', '', name));
  s.appendChild(document.createTextNode(' einen Entwurf gebaut. Was möchten Sie zuerst sehen?'));

  var cards = el('div', 'jh-cards');

  /* Karte 1: Vorschau aus dem Entwurf selbst (Farben, Schrift und Grafik des Betriebs) */
  var own = el('button', 'jh-card jh-own');
  own.type = 'button';
  var p1 = el('span', 'jh-prev jh-prev-own');
  var mini = el('span', 'jh-mini');
  mini.appendChild(el('span', 'jh-mini-bar'));
  var kick = document.querySelector('.hero .kicker');
  if (kick) mini.appendChild(el('span', 'jh-mini-k', kick.textContent.trim()));
  mini.appendChild(el('span', 'jh-mini-h', name));
  mini.appendChild(el('span', 'jh-mini-btn'));
  var art = document.querySelector('.hero-art svg');
  if (art) {
    var artBox = el('span', 'jh-mini-art hero-art in');
    artBox.appendChild(art.cloneNode(true));
    mini.appendChild(artBox);
  }
  p1.appendChild(mini);
  own.appendChild(p1);
  own.appendChild(el('span', 'jh-ct', 'Ihren Entwurf ansehen'));
  own.appendChild(el('span', 'jh-cd', 'So könnte Ihre Website aussehen.'));

  /* Karte 2: Janniks Website */
  var me = el('a', 'jh-card jh-me');
  me.href = HOME;
  var p2 = el('span', 'jh-prev jh-prev-me');
  var img = el('img');
  img.src = '../assets/jannik-website.jpg';
  img.alt = '';
  img.decoding = 'async';
  p2.appendChild(img);
  me.appendChild(p2);
  me.appendChild(el('span', 'jh-ct', 'Janniks Website ansehen'));
  me.appendChild(el('span', 'jh-cd', 'Fertige Projekte, wie es abläuft und wer hinter dem Entwurf steckt.'));

  cards.appendChild(own);
  cards.appendChild(me);
  inner.appendChild(k);
  inner.appendChild(h);
  inner.appendChild(s);
  inner.appendChild(cards);
  inner.appendChild(el('p', 'jh-f', 'Sie können jederzeit wechseln.'));
  gate.appendChild(inner);

  own.addEventListener('click', function () { close(gate); });
  me.addEventListener('click', function () { remember(); });
  gate.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(gate); });

  html.classList.add('jh-lock');
  document.body.appendChild(gate);
  requestAnimationFrame(function () { gate.classList.add('on'); gate.focus({ preventScroll: true }); });
})();

(function () {
  'use strict';
  window.__entwurf = true;
  var html = document.documentElement;
  if (!html.classList.contains('anim')) return;
  var targets = document.querySelectorAll('.rv, .rvg, .hero-art');
  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('in');
    return;
  }
  /* Einblenden erst starten, wenn die Auswahl zu ist, damit die Startanimation zu sehen ist */
  function startReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    for (var j = 0; j < targets.length; j++) io.observe(targets[j]);
  }
  if (window.__jhGate) document.addEventListener('jh:closed', startReveal, { once: true });
  else startReveal();

  var art = document.querySelector('.hero-wrap .hero-art svg');
  var last = null, ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY || 0;
    var s = y > 40;
    if (s !== last) { html.classList.toggle('scrolled', s); last = s; }
    if (art && y < window.innerHeight * 1.2) art.style.transform = 'translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)';
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  frame();

  /* Endlos-Animationen anhalten, wenn der obere Bereich nicht zu sehen ist */
  var hw = document.querySelector('.hero-wrap');
  if (hw) new IntersectionObserver(function (e) { hw.classList.toggle('off', !e[0].isIntersecting); }).observe(hw);
})();
