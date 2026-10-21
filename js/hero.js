// Hero-гармошка.
// Десктоп з мишкою: відкривається панель під курсором, закривається при виході.
// Мобільний / тач / вузьке вікно: відкриття і закриття по тапу (наведення немає).
(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;
  var panels = Array.from(hero.querySelectorAll('.panel'));
  var tapMode = window.matchMedia('(max-width: 900px), (hover: none)');

  function open(panel) {
    panels.forEach(function (p) { p.classList.toggle('is-open', p === panel); });
    hero.classList.add('has-open');
  }
  function closeAll() {
    panels.forEach(function (p) { p.classList.remove('is-open'); });
    hero.classList.remove('has-open');
  }

  panels.forEach(function (p) {
    p.addEventListener('mouseenter', function () { if (!tapMode.matches) open(p); });
    p.addEventListener('focus', function () { if (!tapMode.matches) open(p); });
    p.addEventListener('click', function (e) {
      if (!tapMode.matches) { if (!p.classList.contains('is-open')) open(p); return; }
      if (e.target.closest('a') && p.classList.contains('is-open')) return;   // клік по кнопці всередині відкритої
      if (p.classList.contains('is-open')) closeAll(); else open(p);
      if (p.classList.contains('is-open')) setTimeout(function () {
        var r = p.getBoundingClientRect();
        if (r.top < 0 || r.bottom > innerHeight) p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 450);
    });
  });
  hero.addEventListener('mouseleave', function () { if (!tapMode.matches) closeAll(); });
  hero.addEventListener('focusout', function (e) {
    if (!tapMode.matches && !hero.contains(e.relatedTarget)) closeAll();
  });
  tapMode.addEventListener('change', closeAll);
})();
