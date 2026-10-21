// Шапка: ховається при скролі вниз, висувається при скролі вгору
(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  var last = window.scrollY;
  var HEIGHT = 88, DELTA = 6;

  function update() {
    var y = Math.max(0, window.scrollY);
    if (y <= HEIGHT) header.classList.remove('is-hidden');
    else if (y > last + DELTA) header.classList.add('is-hidden');
    else if (y < last - DELTA) header.classList.remove('is-hidden');
    if (Math.abs(y - last) > DELTA) last = y;
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
