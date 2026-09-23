(function () {
  var KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_xipUhX/friend';

  var openBtn = document.getElementById('open-contact-btn');
  var modal = document.getElementById('contact-modal');
  var closeBtn = document.getElementById('contact-modal-close');
  var form = document.getElementById('contact-form');
  var note = document.getElementById('contact-modal-note');

  if (openBtn && modal && closeBtn && form && note) {
    function openModal() {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var firstField = form.querySelector('input');
      if (firstField) firstField.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var message = form.message.value.trim();

      var text =
        '[Studio Vec 프로젝트 상담 요청]\n' +
        '이름: ' + name + '\n' +
        '연락처: ' + phone + '\n' +
        '필요한 서비스: ' + message;

      function proceed(copied) {
        note.textContent = copied
          ? '메시지가 복사되었습니다. 새로 열린 카카오톡 채팅창에 붙여넣기(Ctrl+V 또는 길게 눌러 붙여넣기) 후 전송해주세요.'
          : '카카오톡 채팅창이 열렸습니다. 아래 내용을 채팅창에 직접 입력해 보내주세요:\n\n' + text;
        note.hidden = false;
        window.open(KAKAO_CHANNEL_URL, '_blank', 'noopener');
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { proceed(true); },
          function () { proceed(false); }
        );
      } else {
        proceed(false);
      }
    });
  }

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

  var filterChips = document.querySelectorAll('.filter-chip');
  var workCards = document.querySelectorAll('#works-grid .work-card');
  var worksEmpty = document.getElementById('works-empty');

  if (filterChips.length && workCards.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) {
          c.classList.remove('is-active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-selected', 'true');

        var filter = chip.getAttribute('data-filter');
        var visibleCount = 0;

        workCards.forEach(function (card) {
          var categories = (card.getAttribute('data-category') || '').split(' ');
          var show = filter === 'all' || categories.indexOf(filter) !== -1;
          card.hidden = !show;
          if (show) visibleCount++;
        });

        if (worksEmpty) worksEmpty.hidden = visibleCount > 0;
      });
    });
  }

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
      sctx.clearRect(0, 0, sampleW, sampleH);
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
          var alpha = data[(y * sampleW + x) * 4 + 3];
          if (alpha > 128) {
            var ox = x * scaleX;
            var oy = y * scaleY;
            nfParticles.push({
              ox: ox,
              oy: oy,
              x: ox,
              y: oy,
              vx: 0,
              vy: 0,
              phase: Math.random() * Math.PI * 2
            });
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

      var idle = !reduceMotion;

      for (var i = 0; i < nfParticles.length; i++) {
        var p = nfParticles[i];
        var tx = p.ox;
        var ty = p.oy;

        if (idle) {
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

        var disp = Math.min(Math.sqrt(Math.pow(p.x - p.ox, 2) + Math.pow(p.y - p.oy, 2)) / 14, 1);
        var r = Math.round(255 - disp * (255 - 219));
        var g = Math.round(255 - disp * (255 - 255));
        var b = Math.round(255 - disp * (255 - 120));

        nfCtx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
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
