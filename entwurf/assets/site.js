/* Entwürfe: Einblenden beim Scrollen, Kopfzeile, sanfte Tiefe der Grafik. Ohne Bibliotheken. */
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
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  for (var j = 0; j < targets.length; j++) io.observe(targets[j]);

  var art = document.querySelector('.hero-art svg');
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
