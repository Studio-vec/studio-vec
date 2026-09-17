(function () {
  var canvas = document.getElementById('hero-canvas');
  var heroSection = canvas ? canvas.closest('.hero') : null;
  var pathEl = document.getElementById('hero-canvas-path');
  var pointsGroup = document.getElementById('hero-canvas-points');
  var SVG_NS = 'http://www.w3.org/2000/svg';

  if (canvas && heroSection && pathEl && pointsGroup) {
    var POINT_LIFETIME = 1000;
    var POINT_INTERVAL = 30;
    var JITTER = 6;

    var points = [];
    var lastPointTime = 0;

    function rand(n) {
      return (Math.random() - 0.5) * n;
    }

    function buildPathData(pts) {
      if (pts.length < 2) return '';
      var d = 'M ' + pts[0].x + ' ' + pts[0].y;
      for (var i = 1; i < pts.length; i++) {
        d += ' L ' + pts[i].x + ' ' + pts[i].y;
      }
      return d;
    }

    function render() {
      pathEl.setAttribute('d', buildPathData(points));

      while (pointsGroup.firstChild) {
        pointsGroup.removeChild(pointsGroup.firstChild);
      }

      points.forEach(function (p) {
        var line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', p.x);
        line.setAttribute('y1', p.y);
        line.setAttribute('x2', p.hx);
        line.setAttribute('y2', p.hy);
        line.setAttribute('stroke', 'white');
        line.setAttribute('stroke-width', p.weight);
        pointsGroup.appendChild(line);

        var rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('x', p.x - p.size / 2);
        rect.setAttribute('y', p.y - p.size / 2);
        rect.setAttribute('width', p.size);
        rect.setAttribute('height', p.size);
        rect.setAttribute('fill', 'white');
        pointsGroup.appendChild(rect);

        var circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('cx', p.hx);
        circle.setAttribute('cy', p.hy);
        circle.setAttribute('r', p.size * 0.35);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', p.weight);
        pointsGroup.appendChild(circle);
      });
    }

    heroSection.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - lastPointTime < POINT_INTERVAL) return;
      lastPointTime = now;

      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var angle = Math.random() * Math.PI * 2;
      var handleLen = 40 + Math.random() * 30;
      var size = 8 + Math.random() * 14;
      var weight = 1 + Math.random() * 3;

      points.push({
        x: x + rand(JITTER),
        y: y + rand(JITTER),
        hx: x + Math.cos(angle) * handleLen,
        hy: y + Math.sin(angle) * handleLen,
        size: size,
        weight: weight,
        createdAt: now
      });

      render();
    });

    setInterval(function () {
      var now = Date.now();
      var before = points.length;
      points = points.filter(function (p) {
        return now - p.createdAt < POINT_LIFETIME;
      });
      if (points.length !== before) render();
    }, 100);
  }

  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');
  var toTop = document.getElementById('to-top');

  function setHeaderHeightVar() {
    if (header) {
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    }
  }
  setHeaderHeightVar();
  window.addEventListener('resize', setHeaderHeightVar);

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '메뉴 열기');
      });
    });
  }

  window.addEventListener('scroll', function () {
    if (!toTop) return;
    toTop.classList.toggle('visible', window.scrollY > 480);
  }, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
