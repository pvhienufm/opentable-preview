/* Open Table — tasteful motion. Vanilla, no deps. Respects reduced-motion. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Scroll reveal + stagger ---- */
  var revealSel = ['.hero__head', '.hero__aside', '.tablewrap', '.hero__foot',
    '.sec', '.epill', '.menu__item', '.redline', '.mtier', '.pj', '.letter__aside',
    '.letter__body', '.partners > *', '.invite > *', '.type-row', '.swatch', '.tile'];
  var nodes = document.querySelectorAll(revealSel.join(','));

  // stagger children within these groups
  var groups = ['.easitable', '.menu', '.redlines', '.mtiers', '.pjourney', '.grid-4', '.grid-3'];
  groups.forEach(function (g) {
    document.querySelectorAll(g).forEach(function (parent) {
      Array.prototype.forEach.call(parent.children, function (child, i) {
        child.style.setProperty('--d', (i * 80) + 'ms');
      });
    });
  });

  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.classList.add('is-visible'); });
  } else {
    nodes.forEach(function (n) { n.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---- 2. Header condense on scroll ---- */
  var bar = document.querySelector('.topbar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('is-stuck', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- 3. Seamless ticker marquee ---- */
  var mq = document.querySelector('.marquee');
  if (mq && !reduce) {
    var w = mq.querySelector('.wrap');
    if (w) {
      var items = w.innerHTML;
      mq.innerHTML =
        '<div class="marquee__mask">' +
          '<div class="marquee__track">' + items + '</div>' +
          '<div class="marquee__track" aria-hidden="true">' + items + '</div>' +
        '</div>';
    }
  }
})();
