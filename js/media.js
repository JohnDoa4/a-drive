// Нескінченна стрічка: кожен стовпчик дублюємо стільки разів, щоб
// (довжина треку - один набір) >= висоти стовпчика. Анімація зсуває трек
// рівно на один набір (-100%/n), тому цикл безшовний за будь-якої ширини.
(function () {
  var tracks = Array.from(document.querySelectorAll('.media__track'));
  tracks.forEach(function (t) {
    t._items = Array.from(t.children).map(function (li) { return li.cloneNode(true); });
  });

  function build() {
    tracks.forEach(function (t) {
      var colH = t.parentElement.clientHeight;
      t.replaceChildren.apply(t, t._items.map(function (li) { return li.cloneNode(true); }));
      var setH = t.offsetHeight || 1;
      var n = Math.max(2, Math.ceil(colH / setH) + 1);
      for (var i = 1; i < n; i++) {
        t._items.forEach(function (li) { t.appendChild(li.cloneNode(true)); });
      }
      t.style.setProperty('--n', n);
    });
  }

  var timer;
  window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(build, 150); });
  window.addEventListener('load', build);
  build();
})();
