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
    var pruneTimer = null;

    function rand(n) {
      return (Math.random() - 0.5) * n;
    }

    function svgEl(tag, attrs) {
      var el = document.createElementNS(SVG_NS, tag);
      for (var k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    }

    function renderPath() {
      var d = '';
      if (points.length > 1) {
        d = 'M ' + points[0].x + ' ' + points[0].y;
        for (var i = 1; i < points.length; i++) {
          d += ' L ' + points[i].x + ' ' + points[i].y;
        }
      }
      pathEl.setAttribute('d', d);
    }

    // Each point owns its <g>, so only new / expired points touch the DOM.
    function addPointNode(p) {
      var g = svgEl('g', {});
      g.appendChild(svgEl('line', { x1: p.x, y1: p.y, x2: p.hx, y2: p.hy, stroke: 'white', 'stroke-width': p.weight }));
      g.appendChild(svgEl('rect', { x: p.x - p.size / 2, y: p.y - p.size / 2, width: p.size, height: p.size, fill: 'white' }));
      g.appendChild(svgEl('circle', { cx: p.hx, cy: p.hy, r: p.size * 0.35, fill: 'none', stroke: 'white', 'stroke-width': p.weight }));
      pointsGroup.appendChild(g);
      p.node = g;
    }

    // Runs only while there are points left to expire.
    function prune() {
      var now = Date.now();
      while (points.length && now - points[0].createdAt >= POINT_LIFETIME) {
        pointsGroup.removeChild(points.shift().node);
      }
      renderPath();
      pruneTimer = points.length ? setTimeout(prune, 100) : null;
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

      var p = {
        x: x + rand(JITTER),
        y: y + rand(JITTER),
        hx: x + Math.cos(angle) * handleLen,
        hy: y + Math.sin(angle) * handleLen,
        size: 8 + Math.random() * 14,
        weight: 1 + Math.random() * 3,
        createdAt: now
      };
      points.push(p);
      addPointNode(p);
      renderPath();
      if (!pruneTimer) pruneTimer = setTimeout(prune, 100);
    });
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
    function setNavOpen(isOpen) {
      mainNav.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    }

    navToggle.addEventListener('click', function () {
      setNavOpen(!mainNav.classList.contains('is-open'));
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNavOpen(false);
      });
    });
  }

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var filterChips = document.querySelectorAll('.filter-chip');
  var workCards = document.querySelectorAll('#works-grid .work-card');
  var worksEmpty = document.getElementById('works-empty');

  // Touch devices have no hover: show the hover image on the card(s) crossing
  // the viewport's vertical centre line instead.
  var hoverQuery = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)') : null;

  function updateCenterCards() {
    if (!workCards.length || !hoverQuery) return;
    var touchMode = !hoverQuery.matches;
    var mid = window.innerHeight / 2;

    workCards.forEach(function (card) {
      var on = false;
      if (touchMode && !card.hidden) {
        var r = card.getBoundingClientRect();
        on = r.top <= mid && r.bottom >= mid;
      }
      card.classList.toggle('is-center', on);
    });
  }

  if (filterChips.length && workCards.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) {
          var active = c === chip;
          c.classList.toggle('is-active', active);
          c.setAttribute('aria-selected', String(active));
        });

        var filter = chip.getAttribute('data-filter');
        var visibleCount = 0;

        workCards.forEach(function (card) {
          var categories = (card.getAttribute('data-category') || '').split(' ');
          var show = filter === 'all' || categories.indexOf(filter) !== -1;
          card.hidden = !show;
          if (show) visibleCount++;
        });

        if (worksEmpty) worksEmpty.hidden = visibleCount > 0;
        updateCenterCards();
      });
    });
  }

  // One rAF-throttled scroll handler for everything scroll-driven.
  var scrollQueued = false;
  function onScrollFrame() {
    scrollQueued = false;
    if (toTop) toTop.classList.toggle('visible', window.scrollY > 480);
    updateCenterCards();
  }
  function queueScrollFrame() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(onScrollFrame);
  }
  window.addEventListener('scroll', queueScrollFrame, { passive: true });
  window.addEventListener('resize', queueScrollFrame);
  if (hoverQuery && hoverQuery.addEventListener) hoverQuery.addEventListener('change', queueScrollFrame);
  onScrollFrame();

  var nfCanvas = document.getElementById('notfound-canvas');
  var nfArt = nfCanvas ? nfCanvas.closest('.notfound-art') : null;

  if (nfCanvas && nfArt) {
    var nfCtx = nfCanvas.getContext('2d');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var nfParticles = [];
    var nfWidth = 0;
    var nfHeight = 0;
    var nfDpr = Math.min(window.devicePixelRatio || 1, 2);

    var nfPointer = { x: -9999, y: -9999, active: false };
    var nfLastActivity = 0;

    function buildParticles() {
      var rect = nfArt.getBoundingClientRect();
      nfWidth = Math.max(rect.width, 1);
      nfHeight = Math.max(rect.height, 1);

      nfCanvas.width = nfWidth * nfDpr;
      nfCanvas.height = nfHeight * nfDpr;
      nfCtx.setTransform(nfDpr, 0, 0, nfDpr, 0, 0);

      var sample = document.createElement('canvas');
      var sampleH = 220;
      var sampleW = Math.round(sampleH * (nfWidth / nfHeight));
      sample.width = sampleW;
      sample.height = sampleH;
      var sctx = sample.getContext('2d');
      sctx.fillStyle = '#fff';
      sctx.textAlign = 'center';
      sctx.textBaseline = 'middle';
      sctx.font = '800 ' + Math.round(sampleH * 0.72) + 'px "Inter Tight", sans-serif';
      sctx.fillText('404', sampleW / 2, sampleH * 0.54);

      var data = sctx.getImageData(0, 0, sampleW, sampleH).data;
      var step = sampleW > 260 ? 4 : 3;
      var scaleX = nfWidth / sampleW;
      var scaleY = nfHeight / sampleH;

      nfParticles = [];
      for (var y = 0; y < sampleH; y += step) {
        for (var x = 0; x < sampleW; x += step) {
          if (data[(y * sampleW + x) * 4 + 3] > 128) {
            var ox = x * scaleX;
            var oy = y * scaleY;
            nfParticles.push({ ox: ox, oy: oy, x: ox, y: oy, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2 });
          }
        }
      }
    }

    function updatePointerFromEvent(clientX, clientY) {
      var rect = nfArt.getBoundingClientRect();
      nfPointer.x = clientX - rect.left;
      nfPointer.y = clientY - rect.top;
      nfPointer.active = true;
      nfLastActivity = Date.now();
    }

    nfArt.addEventListener('mousemove', function (e) {
      updatePointerFromEvent(e.clientX, e.clientY);
    });
    nfArt.addEventListener('mouseleave', function () {
      nfPointer.active = false;
    });
    nfArt.addEventListener('touchmove', function (e) {
      if (e.touches && e.touches[0]) {
        updatePointerFromEvent(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    nfArt.addEventListener('touchend', function () {
      nfPointer.active = false;
    });

    var REPEL_RADIUS = 70;
    var REPEL_STRENGTH = 9;
    var SPRING_K = 0.06;
    var DAMPING = 0.85;

    function nfStep(t) {
      nfCtx.clearRect(0, 0, nfWidth, nfHeight);

      for (var i = 0; i < nfParticles.length; i++) {
        var p = nfParticles[i];
        var tx = p.ox;
        var ty = p.oy;

        if (!reduceMotion) {
          tx += Math.sin(t * 0.0012 + p.phase) * 1.6;
          ty += Math.cos(t * 0.0015 + p.phase) * 1.6;
        }

        var ax = (tx - p.x) * SPRING_K;
        var ay = (ty - p.y) * SPRING_K;

        if (nfPointer.active) {
          var dx = p.x - nfPointer.x;
          var dy = p.y - nfPointer.y;
          var dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          if (dist < REPEL_RADIUS) {
            var force = Math.pow(1 - dist / REPEL_RADIUS, 2) * REPEL_STRENGTH;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // Displaced particles shift from white towards the accent (#dbff78).
        var ddx = p.x - p.ox;
        var ddy = p.y - p.oy;
        var disp = Math.min(Math.sqrt(ddx * ddx + ddy * ddy) / 14, 1);
        nfCtx.fillStyle = 'rgb(' + Math.round(255 - disp * 36) + ',255,' + Math.round(255 - disp * 135) + ')';
        nfCtx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }

      if (nfPointer.active && Date.now() - nfLastActivity > 4000) {
        nfPointer.active = false;
      }

      requestAnimationFrame(nfStep);
    }

    buildParticles();
    requestAnimationFrame(nfStep);

    var nfResizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(nfResizeTimer);
      nfResizeTimer = setTimeout(buildParticles, 150);
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
