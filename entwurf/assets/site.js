/* Entwürfe: Auswahl beim ersten Aufruf, Auftakt, Einblenden, Laufband und alles, was dem Scrollen folgt. Ohne Bibliotheken. */

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

/* Karte: Punktraster und Koordinaten. Ortsdaten: GeoNames (CC BY 4.0), Bezirksgrenzen: BEV / github.com/ginseng666/GeoJSON-TopoJSON-Austria (CC BY 4.0) */
var JH_KARTE = {"b":[14.45,48.08,16.15,49.08],"c":64,"r":57,"k":0.6616,"g":"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000022222220000002000000000000000000000000000000000000000000000000002222222000022220000000000000000000000000000000000000000000000000222222202222222222000000000000000000000000000000000000000000000022222222222222222222000000000000000000000000000000000000000000002222222222222222222200000000000000000000000000000000000000000000222222222222222222222222000000000000000000000000000000000000000022222222222222222222222220000000000000000000000000000000000000002222222222222222222222222200011110000000000000000000000000000000222222222222222222222222222221111100000000000000000000000000000222222222222222222222222222222111111000000000000000000000000000022222222222222222222222222222222211110000000000000000000000000002222222222222222222222222222222222211100000000000000000000222200022222222222222222222222222222222221111100000000000000000022222222222222222222222222222222222222221111111100000000000000002222222222222222222222222222222222222211111111111110000000000002222222222222222222222222222222222222222111111111111000000000002222222222222222222222222222222222222222111111111111100000000002222222222222222222222222222222222222222222111111111110000000000222222222222222222222222222222222222222222222211111111000000000022222222222222222222222222222222222222222222211111111111000000002222222222222222222222222222222222222222222221111111111110010000222222222222222222222222222222222222222222222111111111111111110022222222222222222222222222222222222222222211111111111111111111112222222222222222222222222222222222222221111111111111111111111111212222222222222222222222222222222222222111111111111111111111111111112222222222222222222222222222222222211111111111111111111111111111112222222222222222222222222222222211111111111111111111111111111111122222222222222222222222222222222111111111111111111111111111111122222222222222222222222222222222221111111111111111111111111111112222222222222222222222222222222222111111111111111111111111111111222222222222222222222222222222222211111111111111111111111111111112222222222222222222222222222222211111111111111111111111111111111122222222222222222222222222222221111111111111111111111111111111112222222222222222222222222222222111111111111111111111111111111111122222222222222222222222222222111111111111111111111111111111111112222222222222222222222222221111111111111111111111111111111111111222222222222222222222222222111111111111111111111111111111111111122222222222222222222221122111111111111111111111111111111111111111222222222222222222221111111111111111111111111111111111111111111122222222222222222222111111111111111111111111111111111111111111112222222222222222222111111111111111111111111111111111111111111111222222222222222222211111111111111111111111111111111111111111111222222222222222222211111111111111111111111111111111111111111111122222222222222222211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111","t":[["Zwettl",15.167,48.607],["Gmünd",14.981,48.768],["Waidhofen/Thaya",15.283,48.817],["Horn",15.657,48.663],["Krems",15.614,48.409],["Schrems",15.067,48.783],["Heidenreichstein",15.117,48.867],["Litschau",15.045,48.944],["Weitra",14.883,48.7],["Groß Gerungs",14.958,48.574],["Raabs",15.5,48.85],["Groß-Siegharts",15.404,48.792],["Allentsteig",15.328,48.697],["Eggenburg",15.819,48.639],["Gföhl",15.483,48.517],["Ottenschlag",15.219,48.424],["Langenlois",15.667,48.467],["Pöggstall",15.204,48.317],["Melk",15.332,48.227],["Spitz",15.414,48.366],["Gars am Kamp",15.661,48.598],["Vitis",15.183,48.76],["Persenbeug",15.088,48.187],["Retz",15.955,48.757],["Dobersberg",15.322,48.915]],"p":{"3942|Hirschbach":[15.125,48.743],"3942":[15.125,48.743],"3542|Gföhl":[15.483,48.517],"3542":[15.483,48.517],"3632|Bad Traunstein":[15.083,48.433],"3632":[15.083,48.433],"3950|Großdietmanns":[14.933,48.733],"3950":[14.99,48.786],"3730|Eggenburg":[15.819,48.639],"3730":[15.819,48.639],"3925|Altmelon":[14.966,48.462],"3925":[14.966,48.462],"3500|Krems an der Donau":[15.614,48.409],"3500":[15.614,48.409],"3592|Röhrenbach":[15.5,48.65],"3592":[15.5,48.65],"3874|Litschau":[15.045,48.944],"3874":[15.045,48.944],"3752|Sigmundsherberg":[15.73,48.73],"3752":[15.73,48.73],"3595|Brunn an der Wild und Umgebung":[15.52,48.694],"3595":[15.52,48.694],"3524|Sallingberg":[15.269,48.494],"3524":[15.269,48.494],"3683|Yspertal":[15.059,48.312],"3683":[15.059,48.312],"3684|St. Oswald":[15.018,48.269],"3684":[15.018,48.269],"3921|Langschlag":[14.885,48.575],"3921":[14.885,48.575],"3931|Schweiggers":[15.067,48.667],"3931":[15.067,48.667],"3911|Zwettl":[15.07,48.525],"3911":[15.079,48.522],"3653|Weiten":[15.26,48.296],"3653":[15.26,48.296],"3813|Dietmanns":[15.384,48.792],"3813":[15.384,48.792],"3842|Thaya":[15.289,48.855],"3842":[15.289,48.855],"3595|Brunn an der Wild":[15.52,48.694],"3910|Zwettl":[15.167,48.607],"3910":[15.167,48.607],"3950|Großeibenstein":[14.99,48.786],"3902|Vitis":[15.183,48.76],"3902":[15.183,48.76],"3950|Gmünd":[14.981,48.768],"3945|Hoheneich":[15.029,48.772],"3945":[15.029,48.772],"3532|Rastenfeld":[15.332,48.574],"3532":[15.332,48.574],"3972|Bad Großpertholz":[14.823,48.629],"3972":[14.823,48.629],"3822|Karlstein an der Thaya":[15.397,48.881],"3822":[15.397,48.881],"3591|Altenburg":[15.593,48.648],"3591":[15.593,48.648],"3593|Neupölla":[15.449,48.642],"3593":[15.449,48.642],"3970|Weitra":[14.883,48.7],"3970":[14.883,48.7],"3814|Ludweis-Aigen":[15.483,48.8],"3814":[15.483,48.8],"3922|Großschönau":[14.933,48.65],"3922":[14.933,48.65],"3943|Schrems":[15.067,48.783],"3943":[15.067,48.783],"3914|Waldhausen":[15.262,48.522],"3914":[15.262,48.522],"3841|Windigsteig":[15.283,48.767],"3841":[15.283,48.767],"3610|Weißenkirchen in der Wachau":[15.469,48.398],"3610":[15.469,48.398],"3872|Amaliendorf":[15.083,48.833],"3872":[15.083,48.833],"3613|Albrechtsberg an der Großen Krems":[15.364,48.462],"3613":[15.364,48.462],"3852|Gastern":[15.22,48.895],"3852":[15.22,48.895],"3662|Münichreith-Laimbach":[15.117,48.25],"3662":[15.117,48.25],"3522|Lichtenau im Waldviertel":[15.392,48.497],"3522":[15.392,48.497],"3631|Ottenschlag":[15.219,48.424],"3631":[15.219,48.424],"3691|Nöchling":[14.981,48.224],"3691":[14.981,48.224],"3873|Brand-Nagelberg":[15.0,48.85],"3873":[15.0,48.85],"3580|Horn":[15.657,48.663],"3580":[15.657,48.663],"3550|Langenlois":[15.667,48.467],"3550":[15.667,48.467],"3571|Gars am Kamp":[15.661,48.598],"3571":[15.661,48.598],"3552|Droß":[15.576,48.464],"3552":[15.576,48.464],"3681|Hofamt Priel":[15.078,48.196],"3681":[15.078,48.196],"3525|Sallingberg":[15.233,48.467],"3525":[15.233,48.467],"3754|Irnfritz-Messern":[15.556,48.741],"3754":[15.556,48.741],"3622|Mühldorf":[15.347,48.374],"3622":[15.347,48.374],"3932|Kirchberg am Walde":[15.088,48.725],"3932":[15.088,48.725],"3580|St. Bernhard-Frauenhofen":[15.628,48.673],"3730|Straning-Grafenberg":[15.85,48.617],"3552|Stratzing":[15.6,48.45],"3753|Pernegg":[15.617,48.733],"3753":[15.663,48.781],"3753|Geras":[15.64,48.754],"3812|Groß-Siegharts":[15.404,48.792],"3812":[15.404,48.792],"3871|Brand-Nagelberg":[14.993,48.829],"3871":[14.993,48.829],"3631|Kirchschlag":[15.223,48.394],"3652|Leiben":[15.275,48.246],"3652":[15.275,48.246],"3811|Breitenfeld":[15.387,48.748],"3811":[15.387,48.748],"3680|Persenbeug-Gottsdorf":[15.108,48.19],"3680":[15.108,48.19],"3841|Willings":[15.283,48.767],"3552|Lengenfeld":[15.599,48.472],"3920|Groß Gerungs":[14.958,48.574],"3920":[14.958,48.574],"3924|Zwettl":[15.056,48.596],"3924":[15.056,48.596],"3851|Pleßberg":[15.267,48.917],"3851":[15.267,48.917],"3863|Reingers":[15.133,48.967],"3863":[15.133,48.967],"3923|Zwettl":[15.026,48.641],"3923":[15.026,48.641],"3911|Rappottenstein":[15.079,48.522],"3843|Riegers":[15.333,48.9],"3843":[15.322,48.915],"3620|Spitz":[15.414,48.366],"3620":[15.414,48.366],"3931|Zwettl":[15.06,48.66],"3541|Senftenberg":[15.544,48.452],"3541":[15.544,48.452],"3650|Pöggstall":[15.204,48.317],"3650":[15.204,48.317],"3730|Burgschleinitz-Kühnring und Umgebung":[15.817,48.6],"3744|Meiseldorf":[15.752,48.665],"3744":[15.752,48.665],"3860|Heidenreichstein":[15.117,48.867],"3860":[15.117,48.867],"3820|Raabs an der Thaya":[15.5,48.85],"3820":[15.5,48.85],"3660|Klein-Pöchlarn":[15.217,48.217],"3660":[15.217,48.217],"3913|Großgöttfritz":[15.208,48.525],"3913":[15.208,48.525],"3623|Kottes-Purk":[15.3,48.417],"3623":[15.3,48.417],"3610|Weinzierl am Walde":[15.432,48.432],"3970|Unserfrau-Altweitra":[14.9,48.717],"3751|Rodingersdorf":[15.721,48.687],"3751":[15.75,48.683],"3830|Waidhofen an der Thaya":[15.283,48.817],"3830":[15.283,48.817],"3922|Bad Großpertholz":[14.947,48.649],"3862|Eisgarn":[15.103,48.917],"3862":[15.103,48.917],"3800|Göpfritz an der Wild":[15.402,48.725],"3800":[15.402,48.725],"3874|Haugschlag":[15.05,48.983],"3593|Pölla":[15.467,48.617],"3861|Bergen":[15.149,48.908],"3861":[15.149,48.908],"3843|Dobersberg":[15.322,48.915],"3580|Rosenburg-Mold":[15.701,48.642],"3572|St. Leonhard am Hornerwald":[15.512,48.462],"3572":[15.512,48.462],"3912|Grafenschlag":[15.167,48.5],"3912":[15.167,48.5],"3665|Gutenbrunn":[15.119,48.365],"3665":[15.119,48.365],"3762|Ludweis-Aigen":[15.483,48.767],"3762":[15.483,48.767],"3553|Langenlois":[15.595,48.522],"3553":[15.595,48.522],"3844|Waldkirchen an der Thaya":[15.35,48.933],"3844":[15.35,48.933],"3730|Meiseldorf":[15.829,48.641],"3562|Schönberg am Kamp":[15.7,48.517],"3562":[15.7,48.517],"3902|Jaudling":[15.2,48.793],"3561|Langenlois":[15.667,48.467],"3561":[15.667,48.467],"3661|Artstetten-Pöbring":[15.234,48.26],"3661":[15.234,48.26],"3751|Sigmundsherberg":[15.75,48.683],"3900|Schwarzenau":[15.258,48.744],"3900":[15.258,48.744],"3753|Hötzelsdorf":[15.663,48.781],"3944|Schrems":[15.105,48.767],"3944":[15.105,48.767],"3611|Großheinrichschlag":[15.383,48.417],"3611":[15.383,48.417],"3820|Oberndorf bei Raabs":[15.483,48.85]}};

(function () {
  'use strict';
  window.__entwurf = true;
  var html = document.documentElement, body = document.body;
  if (!body) return;
  var anim = html.classList.contains('anim');
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  var markEl = $('.top-bar .mark');
  var name = markEl ? markEl.textContent.trim() : '';

  /* Rollbalken in der Hausfarbe */
  try { html.style.scrollbarColor = getComputedStyle(body).getPropertyValue('--a1').trim() + ' transparent'; } catch (e) {}

  /* Text in Wörter (oder Zeichen) teilen. mask = aus einer Maske hochfahren, sonst nur einzeln ansprechbar */
  function split(el, opt) {
    var d = opt.base || 0, texts = [], tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n, out = [];
    while ((n = tw.nextNode())) texts.push(n);
    texts.forEach(function (t) {
      var parts = opt.chars ? t.nodeValue.split('') : t.nodeValue.split(/(\s+)/), f = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return; }
        var o = document.createElement('span');
        if (opt.mask) {
          o.className = 'w';
          var i = document.createElement('span');
          i.textContent = p;
          i.style.setProperty('--d', d.toFixed(2) + 's');
          o.appendChild(i);
        } else { o.className = opt.cls; o.textContent = p; }
        d += opt.step || 0;
        out.push(o);
        f.appendChild(o);
      });
      t.parentNode.replaceChild(f, t);
    });
    return out;
  }

  /* Name groß am Ende der Kontaktfläche */
  var kontakt = $('.kontakt'), big = null;
  if (kontakt && name) {
    big = document.createElement('div');
    big.className = 'bigname';
    big.setAttribute('aria-hidden', 'true');
    big.textContent = name + ' · ' + name + ' · ' + name;
    kontakt.appendChild(big);
  } else html.classList.add('no-big');

  /* Erster Satz unter „Über uns“ wird zur Aussage */
  var say = $('.ueber p:not(.hint)'), sayWords = [];
  if (say) say.classList.add('say');

  /* Foto-Platzhalter: die Grafik des Betriebs füllt den Rahmen, bis ein echtes Foto da ist */
  var photo = $('.ueber .photo'), heroSvg = $('.hero-art svg');
  if (photo && heroSvg) {
    var pa = document.createElement('div');
    pa.className = 'photo-art hero-art in';
    pa.setAttribute('aria-hidden', 'true');
    pa.appendChild(heroSvg.cloneNode(true));
    photo.insertBefore(pa, photo.firstChild);
    photo.classList.add('has-art');
  }

  /* Zwei zusätzliche Abschnitte: Stapelkarten nach den Leistungen, Geschichte nach „Über uns“ */
  function mk(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; }
  var kickEl = $('.hero .kicker'), ortM = kickEl ? kickEl.textContent.trim().match(/\s(?:in|aus)\s+(.+)$/) : null, ort = ortM ? ortM[1] : '';
  var theme = (body.className.match(/t-(\w+)/) || [])[1] || '';
  var NOUN = { gastro: 'Das Lokal', backstube: 'Die Backstube', salon: 'Der Salon', beauty: 'Das Studio', ruhe: 'Die Praxis', holz: 'Die Werkstatt', werkstatt: 'Die Werkstatt', atelier: 'Das Atelier' };
  var noun = NOUN[theme] || 'Der Betrieb';
  var stackWords = [], stackCards = [], zeitList = null, zeitItems = [], zeitBig = null;
  var leist = $('main .leistungen'), ueber = $('main .ueber');
  if (leist && name) {
    var st = mk('section', 'stack'), sw = mk('div', 'wrap'), sh = mk('h2', '', 'Darauf können Sie zählen'), sl = mk('ul');
    sh.id = 'h-stack';
    st.setAttribute('aria-labelledby', 'h-stack');
    [['Persönlich.', 'Sie reden direkt mit uns. Keine Warteschleife, kein Callcenter.'],
     [ort ? 'Aus ' + ort + '.' : 'Aus der Region.', 'Kurze Wege und Gesichter, die man kennt.'],
     ['Verlässlich.', 'Was ausgemacht ist, gilt. Termin, Preis und Ergebnis.']].forEach(function (c, i) {
      var li = mk('li'), w = mk('p', 'stack-w', c[0]);
      li.style.setProperty('--i', i);
      li.appendChild(w);
      li.appendChild(mk('p', '', c[1]));
      sl.appendChild(li);
      stackWords.push(w);
      stackCards.push(li);
    });
    sw.appendChild(sh);
    sw.appendChild(sl);
    sw.appendChild(mk('p', 'hint', 'Beispieltexte. Hier steht, was Ihren Betrieb wirklich ausmacht.'));
    st.appendChild(sw);
    leist.parentNode.insertBefore(st, leist.nextSibling);
  }
  if (ueber && name) {
    var zs = mk('section', 'zeit'), zw = mk('div', 'wrap'), side = mk('div', 'zeit-side'), zh = mk('h2', '', 'Unsere Geschichte');
    var jahr = new Date().getFullYear();
    zh.id = 'h-zeit';
    zs.setAttribute('aria-labelledby', 'h-zeit');
    zeitBig = mk('div', 'zeit-big', '1998');
    zeitBig.setAttribute('aria-hidden', 'true');
    side.appendChild(zh);
    side.appendChild(zeitBig);
    zeitList = mk('ol', 'zeit-list');
    [[1998, '1998', 'Der Anfang', noun + ' sperrt' + (ort ? ' in ' + ort : '') + ' auf. Klein, aber mit viel Einsatz.'],
     [2007, '2007', 'Mehr Platz', 'Umbau und neue Ausstattung, weil die Arbeit mehr wird.'],
     [2016, '2016', 'Verstärkung', 'Das Team wächst, die Stammkundschaft auch.'],
     [jahr, 'Heute', 'Für Sie da', name + ': persönlich erreichbar und mit Freude bei der Sache.']].forEach(function (z) {
      var li = mk('li');
      li.className = 'on';
      li.setAttribute('data-y', z[0]);
      li.appendChild(mk('span', 'zeit-y', z[1]));
      li.appendChild(mk('h3', '', z[2]));
      li.appendChild(mk('p', '', z[3]));
      zeitList.appendChild(li);
      zeitItems.push(li);
    });
    var zr = mk('div');
    zr.appendChild(zeitList);
    zr.appendChild(mk('p', 'hint', 'Beispiel: Jahreszahlen und Stationen sind erfunden. Hier steht Ihre echte Geschichte.'));
    zr.lastChild.style.marginTop = '2.5rem';
    zw.appendChild(side);
    zw.appendChild(zr);
    zs.appendChild(zw);
    ueber.parentNode.insertBefore(zs, ueber.nextSibling);
  }

  /* Punktkarte: der Betrieb als Mittelpunkt, die größeren Orte rundherum laufen mit Linien auf ihn zu */
  var karteCard = null, karteDraw = null;
  (function () {
    var K = window.JH_KARTE, addr = $('.kontakt address');
    if (!K || !kontakt || !addr || !name) return;
    var lines = addr.innerHTML.split(/<br\s*\/?>/i), pm = null;
    for (var q = lines.length - 1; q >= 0 && !pm; q--) pm = lines[q].match(/^\s*(\d{4})\s+\S/);
    if (!pm) return;
    var pos = K.p[pm[1] + '|' + ort] || K.p[pm[1]];
    if (!pos) return;
    var NS = 'http://www.w3.org/2000/svg', VW = 640, VH = Math.round(VW * K.r / K.c), B = K.b;
    function px(lon) { return (lon - B[0]) / (B[2] - B[0]) * VW; }
    function py(lat) { return (B[3] - lat) / (B[3] - B[1]) * VH; }
    function km(a, b) { var dx = (a[0] - b[0]) * 111.32 * K.k, dy = (a[1] - b[1]) * 110.57; return Math.sqrt(dx * dx + dy * dy); }
    function sv(tag, attrs, cls) { var n = document.createElementNS(NS, tag); for (var a in attrs) n.setAttribute(a, attrs[a]); if (cls) n.setAttribute('class', cls); return n; }
    var near = K.t.map(function (t) { return { n: t[0], x: px(t[1]), y: py(t[2]), d: km(pos, [t[1], t[2]]) }; })
      .filter(function (t) { return t.d > 3.5; }).sort(function (a, b) { return a.d - b.d; });
    var hx = px(pos[0]), hy = py(pos[1]);

    var sec = mk('section', 'karte'), wrap = mk('div', 'wrap'), text = mk('div', 'karte-text'), h = mk('h2', '', ort ? 'Daheim in ' + ort + '.' : 'Mitten im Waldviertel.');
    h.id = 'h-karte';
    sec.setAttribute('aria-labelledby', 'h-karte');
    var first = near.slice(0, 3).map(function (t) { return t.n; });
    text.appendChild(h);
    text.appendChild(mk('p', '', 'Ob aus ' + first[0] + ', ' + first[1] + ' oder ' + first[2] + ': zu ' + name + ' ist es nicht weit.'));
    var chips = mk('ul', 'karte-orte');
    near.slice(0, 6).forEach(function (t) {
      var li = mk('li');
      li.appendChild(mk('b', '', t.n));
      li.appendChild(mk('span', '', ' ' + Math.round(t.d) + ' km'));
      chips.appendChild(li);
    });
    text.appendChild(chips);
    var route = $('.hero .btn.ghost');
    if (route) { var rb = route.cloneNode(true); rb.removeAttribute('style'); text.appendChild(rb); }
    text.appendChild(mk('p', 'karte-quelle', 'Entfernungen in Luftlinie. Kartendaten: GeoNames und BEV (CC BY 4.0).'));

    karteCard = mk('div', 'karte-card');
    var svg = sv('svg', { viewBox: '0 0 ' + VW + ' ' + VH, role: 'img', 'aria-label': 'Karte des Waldviertels mit ' + name + ' und den Orten in der Nähe' });
    var d = ['', '', ''], cw = VW / K.c, ch = VH / K.r;
    for (var r = 0; r < K.r; r++) for (var c = 0; c < K.c; c++) {
      d[+K.g.charAt(r * K.c + c)] += 'M' + ((c + 0.5) * cw).toFixed(1) + ' ' + ((r + 0.5) * ch).toFixed(1) + 'h.01';
    }
    d.forEach(function (p, i) { if (p) svg.appendChild(sv('path', { d: p }, 'k-d k-d' + i)); });
    var over = sv('g', {});
    svg.appendChild(over);
    karteCard.appendChild(svg);
    wrap.appendChild(text);
    wrap.appendChild(karteCard);
    sec.appendChild(wrap);
    kontakt.parentNode.insertBefore(sec, kontakt);

    karteDraw = function () {
      var ww = VW * 0.6, wh = ww * VH / VW, x0 = clamp(hx - ww / 2, 0, VW - ww), y0 = clamp(hy - wh / 2, 0, VH - wh), x1 = x0 + ww, y1 = y0 + wh;
      svg.setAttribute('viewBox', x0.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + ww.toFixed(1) + ' ' + wh.toFixed(1));
      var s = (svg.clientWidth || 560) / ww, small = svg.clientWidth < 460, fs = (small ? 12 : 13.5) / s, gap = (small ? 56 : 62) / s, edge = 16 / s;
      while (over.firstChild) over.removeChild(over.firstChild);
      var pick = [];
      near.forEach(function (t) {
        if (pick.length >= (small ? 5 : 7)) return;
        if (t.x < x0 + edge || t.x > x1 - edge || t.y < y0 + edge || t.y > y1 - edge) return;
        if (Math.hypot(t.x - hx, t.y - hy) < gap * 0.8) return;
        for (var i = 0; i < pick.length; i++) if (Math.hypot(t.x - pick[i].x, t.y - pick[i].y) < gap) return;
        pick.push(t);
      });
      pick.forEach(function (t, i) {
        var mx = (t.x + hx) / 2, my = (t.y + hy) / 2, dx = hx - t.x, dy = hy - t.y, bend = (dx > 0 ? -1 : 1) * 0.2;
        var path = sv('path', { d: 'M' + t.x.toFixed(1) + ' ' + t.y.toFixed(1) + 'Q' + (mx - dy * bend).toFixed(1) + ' ' + (my + dx * bend).toFixed(1) + ' ' + hx.toFixed(1) + ' ' + hy.toFixed(1), pathLength: 1, 'stroke-width': (1.6 / s).toFixed(2), id: 'k-l' + i }, 'k-line');
        path.style.setProperty('--i', i);
        over.appendChild(path);
        if (anim) {
          var run = sv('circle', { r: (3 / s).toFixed(1) }, 'k-run'), mo = sv('animateMotion', { dur: (2.6 + (i % 3) * 0.5) + 's', repeatCount: 'indefinite', begin: (1.8 + i * 0.35) + 's', path: path.getAttribute('d') });
          run.appendChild(mo);
          over.appendChild(run);
        }
      });
      pick.forEach(function (t, i) {
        var g = sv('g', {}, 'k-town'), left = t.x < hx, w = t.n.length * fs * 0.6;
        if (left && t.x - 10 / s - w < x0 + 4) left = false;
        if (!left && t.x + 10 / s + w > x1 - 4) left = true;
        g.style.setProperty('--i', i);
        g.appendChild(sv('circle', { cx: t.x.toFixed(1), cy: t.y.toFixed(1), r: (5 / s).toFixed(1), 'stroke-width': (2 / s).toFixed(1) }));
        var tx = sv('text', { x: (t.x + (left ? -10 : 10) / s).toFixed(1), y: (t.y + fs * 0.35).toFixed(1), 'text-anchor': left ? 'end' : 'start', 'font-size': fs.toFixed(1), 'stroke-width': (3.5 / s).toFixed(1) });
        tx.textContent = t.n;
        g.appendChild(tx);
        over.appendChild(g);
      });
      var hub = sv('g', {}, 'k-hub'), label = name.length > 24 ? name.slice(0, 23).trim() + '…' : name, lw = label.length * fs * 0.62 + 20 / s, lh = fs * 2, nr = pick.filter(function (t) { return t.x >= hx; }).length, right = nr * 2 <= pick.length;
      if (right && hx + 16 / s + lw > x1 - 4) right = false;
      if (!right && hx - 16 / s - lw < x0 + 4) right = true;
      hub.appendChild(sv('circle', { cx: hx.toFixed(1), cy: hy.toFixed(1), r: (7 / s).toFixed(1) }, 'k-ring'));
      hub.appendChild(sv('circle', { cx: hx.toFixed(1), cy: hy.toFixed(1), r: (7 / s).toFixed(1) }, 'k-dot'));
      var lx = right ? hx + 16 / s : hx - 16 / s - lw, ly = clamp(hy - lh / 2, y0 + 4, y1 - lh - 4);
      hub.appendChild(sv('rect', { x: lx.toFixed(1), y: ly.toFixed(1), width: lw.toFixed(1), height: lh.toFixed(1), rx: (lh / 2).toFixed(1) }));
      var ht = sv('text', { x: (lx + lw / 2).toFixed(1), y: (ly + lh / 2 + fs * 0.35).toFixed(1), 'text-anchor': 'middle', 'font-size': fs.toFixed(1) });
      ht.textContent = label;
      hub.appendChild(ht);
      over.appendChild(hub);
    };
    karteDraw();
  })();

  /* Überschrift oben einpassen: kein Wort darf breiter sein als die Spalte */
  var h1 = $('.hero h1'), h1Style = h1 ? h1.getAttribute('style') : null;
  function fit() {
    stackWords.forEach(function (w) {
      w.style.fontSize = '';
      w.classList.remove('umbruch');
      var base = parseFloat(getComputedStyle(w).fontSize), f = base, g = 0;
      while (w.scrollWidth > w.clientWidth + 1 && f > 22 && g++ < 40) { f *= 0.94; w.style.fontSize = f.toFixed(1) + 'px'; }
      /* Wird es einzeilig zu klein, lieber groß auf zwei Zeilen */
      if (f < base * 0.72 && /\s/.test(w.textContent.trim())) {
        w.classList.add('umbruch');
        f = base; g = 0;
        w.style.fontSize = '';
        while (w.scrollWidth > w.clientWidth + 1 && f > 22 && g++ < 40) { f *= 0.94; w.style.fontSize = f.toFixed(1) + 'px'; }
      }
    });
    if (karteDraw) karteDraw();
    if (!h1) return;
    if (h1Style !== null) h1.setAttribute('style', h1Style); else h1.removeAttribute('style');
    var avail = h1.parentNode.clientWidth, ws = $$('.w', h1), fs = parseFloat(getComputedStyle(h1).fontSize), guard = 0;
    function widest() { var m = 0; ws.forEach(function (w) { if (w.scrollWidth > m) m = w.scrollWidth; if (w.offsetWidth > m) m = w.offsetWidth; }); return m; }
    while (widest() > avail && fs > 26 && guard++ < 40) { fs *= 0.95; h1.style.fontSize = fs.toFixed(1) + 'px'; }
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fit, 150); });

  if (!anim) { html.classList.add('intro-on'); return; }

  /* ---------- ab hier nur mit Bewegung ---------- */
  var heads = $$('main h2');
  heads.forEach(function (h) { split(h, { mask: true, step: 0.08 }); h.classList.add('split'); });
  var tel = $('.kontakt .tel');
  if (tel) { split(tel, { mask: true, chars: true, step: 0.035, base: 0.1 }); tel.classList.add('split'); }
  if (say) sayWords = split(say, { cls: 'yw' });

  var prog = document.createElement('div');
  prog.className = 'prog';
  prog.setAttribute('aria-hidden', 'true');
  body.appendChild(prog);

  stackWords.forEach(function (w) { split(w, { mask: true, step: 0.09, base: 0.05 }); w.classList.add('split'); });
  if (karteCard) fit();
  zeitItems.forEach(function (li) { li.classList.remove('on'); });

  /* Großes Jahr zählt zur aktiven Station */
  var yShown = 1998, yGoal = 1998, yRaf = 0;
  function yStep() {
    yRaf = 0;
    var d = yGoal - yShown;
    if (!d) return;
    yShown += (d > 0 ? 1 : -1) * Math.max(1, Math.round(Math.abs(d) * 0.18));
    zeitBig.textContent = yShown;
    yRaf = requestAnimationFrame(yStep);
  }

  var targets = $$('.rv, .rvg, .hero-art').concat(heads, stackWords);
  if (karteCard) targets.push(karteCard);
  if (tel) targets.push(tel);
  function startReveal() {
    if (!('IntersectionObserver' in window)) { targets.forEach(function (t) { t.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* Auftakt: Vorhang mit dem Namen, dann fährt die Seite darunter hoch */
  function intro() {
    if (!name) { html.classList.add('intro-on'); startReveal(); return; }
    var el = document.createElement('div'), b = document.createElement('b'), s = document.createElement('span');
    el.className = 'intro';
    el.setAttribute('aria-hidden', 'true');
    s.textContent = name;
    b.appendChild(s);
    el.appendChild(b);
    el.appendChild(document.createElement('i'));
    body.appendChild(el);
    html.classList.add('intro-on');
    var gone = false;
    function end() { if (gone) return; gone = true; if (el.parentNode) el.parentNode.removeChild(el); }
    el.addEventListener('animationend', function (e) { if (e.target === el) end(); });
    setTimeout(startReveal, 1150);
    setTimeout(end, 2800);
  }
  if (window.__jhGate) document.addEventListener('jh:closed', intro, { once: true });
  else intro();

  /* ---------- alles, was dem Scrollen folgt ---------- */
  var art = $('.hero-wrap .hero-art svg');
  var lastY = window.scrollY || 0, lastS = null, lastAway = false, vel = 0, ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY || 0, vh = window.innerHeight, dy = y - lastY;
    lastY = y;
    vel += dy;
    var s = y > 40;
    if (s !== lastS) { html.classList.toggle('scrolled', s); lastS = s; }
    var away = lastAway;
    if (y < 220 || dy < -4) away = false; else if (dy > 4) away = true;
    if (away !== lastAway) { html.classList.toggle('bar-away', away); lastAway = away; }
    var max = document.documentElement.scrollHeight - vh;
    prog.style.setProperty('--sp', max > 0 ? clamp(y / max, 0, 1).toFixed(4) : '0');
    if (art && y < vh * 1.2) art.style.setProperty('--py', (y * 0.12).toFixed(1));
    if (kontakt) {
      var r = kontakt.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        kontakt.style.setProperty('--kp', clamp((vh - r.top) / (vh * 0.55), 0, 1).toFixed(3));
        if (big) big.style.setProperty('--bx', (-(vh - r.top) * 0.28).toFixed(1));
      }
    }
    if (stackCards.length) {
      var rs = stackCards.map(function (c) { return c.getBoundingClientRect(); });
      if (rs[0].top < vh && rs[rs.length - 1].bottom > 0) {
        for (var c = 0; c < stackCards.length - 1; c++) {
          stackCards[c].style.setProperty('--s', clamp((rs[c].bottom - rs[c + 1].top) / rs[c].height, 0, 1).toFixed(3));
        }
      }
    }
    if (zeitList) {
      var zb = zeitList.getBoundingClientRect();
      if (zb.top < vh && zb.bottom > 0) {
        zeitList.style.setProperty('--tp', clamp((vh * 0.62 - zb.top) / zb.height, 0, 1).toFixed(3));
        var act = 0;
        zeitItems.forEach(function (li, k) {
          var on = li.getBoundingClientRect().top < vh * 0.64;
          li.classList.toggle('on', on);
          if (on) act = k;
        });
        var goal = +zeitItems[act].getAttribute('data-y');
        if (goal !== yGoal) { yGoal = goal; if (!yRaf) yRaf = requestAnimationFrame(yStep); }
      }
    }
    if (sayWords.length) {
      var q = say.getBoundingClientRect();
      if (q.top < vh && q.bottom > -vh) {
        var p = clamp((vh * 0.9 - q.top) / (q.height + vh * 0.32), 0, 1), on = Math.round(p * sayWords.length);
        for (var i = 0; i < sayWords.length; i++) sayWords[i].classList.toggle('on', i < on);
      }
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  window.addEventListener('resize', frame);
  frame();

  /* Laufband: läuft von selbst, wird beim Scrollen schneller und dreht mit der Richtung */
  var mq = $('.marquee'), track = mq ? $('.mq-track', mq) : null;
  if (track) {
    html.classList.add('mq-js');
    var x = 0, dir = 1, boost = 0, half = 0, seen = false, prev = 0, raf = 0;
    var measure = function () { half = track.scrollWidth / 2; };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    var step = function (t) {
      raf = 0;
      var dt = prev ? Math.min(t - prev, 60) : 16;
      prev = t;
      if (vel) { dir = vel > 0 ? 1 : -1; boost = clamp(boost + Math.abs(vel) * 0.045, 0, 3.2); vel = 0; }
      boost *= Math.pow(0.9, dt / 16);
      x -= dir * (0.045 + boost * 0.12) * dt;
      if (half > 0) { if (x <= -half) x += half; else if (x > 0) x -= half; }
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + (-dir * boost * 2.2).toFixed(2) + 'deg)';
      if (seen) raf = requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        seen = e[0].isIntersecting;
        if (seen && !raf) { prev = 0; raf = requestAnimationFrame(step); }
      }).observe(mq);
    } else { seen = true; raf = requestAnimationFrame(step); }
  }

  /* Maus: Grafik neigt sich, Knöpfe ziehen leicht mit */
  if (window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    var hero = $('.hero-wrap');
    if (hero && art) {
      hero.addEventListener('mousemove', function (e) {
        var b = hero.getBoundingClientRect();
        art.style.setProperty('--tx', (((e.clientX - b.left) / b.width - 0.5) * 9).toFixed(2));
        art.style.setProperty('--ty', (-((e.clientY - b.top) / b.height - 0.5) * 7).toFixed(2));
      });
      hero.addEventListener('mouseleave', function () { art.style.setProperty('--tx', 0); art.style.setProperty('--ty', 0); });
    }
    stackCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var b = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - b.left) / b.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - b.top) / b.height * 100).toFixed(1) + '%');
      });
    });
    $$('.hero .btn, .kontakt .btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var b = btn.getBoundingClientRect();
        btn.style.translate = ((e.clientX - b.left - b.width / 2) * 0.22).toFixed(1) + 'px ' + ((e.clientY - b.top - b.height / 2) * 0.3).toFixed(1) + 'px';
      });
      btn.addEventListener('mouseleave', function () { btn.style.translate = ''; });
    });
  }

  /* Endlos-Animationen anhalten, wenn der obere Bereich nicht zu sehen ist */
  var hw = $('.hero-wrap');
  if (hw && 'IntersectionObserver' in window) new IntersectionObserver(function (e) { hw.classList.toggle('off', !e[0].isIntersecting); }).observe(hw);
})();
