/**
 * The Meridian Society — Shared Site Script
 *
 * Runs on every page. Modules:
 *   1. Registration URL  — single source of truth for all [data-register] links
 *   2. Scroll handler    — RAF-batched: nav state, progress bar, arc button, sticky join (optional)
 *   3. Scroll reveal     — IntersectionObserver for .rv elements
 *   4. Mobile menu       — open/close/focus/Escape
 *   5. Pull-to-dismiss   — swipe-right gesture on mobile drawer
 */
'use strict';

// ─────────────────────────────────────────────────────────────────
// 1. REGISTRATION URL
// Update here to change every registration link across the whole site
// ─────────────────────────────────────────────────────────────────
var REGISTER_URL = 'https://docs.google.com/forms/d/1qThcXHxzfuW4uNVkZbHGhHwlDsy8x-YGtpHpOLnqTl4/viewform';

document.querySelectorAll('a[data-register]').forEach(function(el) {
  el.href = REGISTER_URL;
});

// ─────────────────────────────────────────────────────────────────
// SPEAKER APPLICATION URL
// Update here to change every speaker application link across the site
// ─────────────────────────────────────────────────────────────────
var SPEAK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScP7jkZ_M1EXIYnxu7ERnCBRpDDmBNPpT3BWruAoyGnPtN6IA/viewform?usp=dialog';

document.querySelectorAll('a[data-speak]').forEach(function(el) {
  el.href = SPEAK_URL;
});

// ─────────────────────────────────────────────────────────────────
// MARQUEE TEXT
// Edit here to update the ticker on every page at once
// ─────────────────────────────────────────────────────────────────
var MARQUEE_TEXT = 'The Meridian Society <span class="mgem">◈</span> Ottawa <span class="mgem">◈</span> Est. 2025 <span class="mgem">◈</span> Student-Run <span class="mgem">◈</span> Inaugural Event — Fall 2026 <span class="mgem">◈</span> Carleton University <span class="mgem">◈</span> uOttawa <span class="mgem">◈</span> Algonquin College <span class="mgem">◈</span>';

var marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack && !marqueeTrack.dataset.static) {
  marqueeTrack.innerHTML = '<div class="marquee-item">' + MARQUEE_TEXT + '</div><div class="marquee-item">' + MARQUEE_TEXT + '</div>';
}

/* ── Mobile menu injection ──────────────────────
 * Generates the drawer HTML once per page-load based on current pathname.
 * Must run before getElementById calls for mobileMenu / menuBackdrop.
 * ─────────────────────────────────────────────── */
(function buildMobileMenu() {
  var path    = window.location.pathname;
  var isHome  = path === '/' || path === '/index.html' || path === '';
  var isTeam  = path === '/team.html';
  var isSpeak = path === '/speak.html';

  var aboutHref   = isHome ? '#about'    : '/#about';
  var regHref     = isHome ? '#register' : '/#register';

  var fifthLink = isTeam
    ? '<a href="/speak.html">Speak <span class="mob-arrow">\u2192</span></a>'
    : isSpeak
      ? '<a href="/team.html">Our Team <span class="mob-arrow">\u2192</span></a>'
      : '<a href="/speak.html">Speak <span class="mob-arrow">\u2192</span></a>';

  var html = '<div class="mob-backdrop" id="menuBackdrop"></div>' +
    '<div class="mob-drawer" id="mobileMenu" role="dialog" aria-label="Navigation" aria-modal="true">' +
    '  <div class="mob-wordmark">The Meridian Society</div>' +
    '  <nav class="mob-links" aria-label="Mobile navigation">' +
    '    <a href="' + aboutHref + '">About <span class="mob-arrow">\u2192</span></a>' +
    '    <a href="/events.html">Events <span class="mob-arrow">\u2192</span></a>' +
    '    <a href="/speak.html">Speak <span class="mob-arrow">\u2192</span></a>' +
    '    <a href="' + regHref + '">Membership <span class="mob-arrow">\u2192</span></a>' +
    '    ' + fifthLink +
    '  </nav>' +
    '  <div class="mob-bottom">' +
    '    <span class="mob-meta">Ottawa \u00b7 Est. 2025</span>' +
    '    <a href="#" target="_blank" rel="noopener noreferrer" class="mob-cta" data-register>' +
    '      Register as a Member' +
    '    </a>' +
    '  </div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', html);

  /* Re-run data-register population for the injected element */
  document.querySelectorAll('a[data-register]').forEach(function(el) {
    el.href = REGISTER_URL;
  });

  /* Bind click-to-close for injected links */
  document.querySelectorAll('.mob-links a, .mob-cta').forEach(function(el) {
    el.addEventListener('click', function() {
      if (typeof closeMenu === 'function') closeMenu();
    });
  });
}());

/* ── Scroll thresholds ────────────────────────── */
var SCROLL_NAV_THRESHOLD   = 40;   /* px — nav adds .scrolled class */
var SCROLL_ARC_THRESHOLD   = 200;  /* px — arc back-to-top btn appears */
var ARC_RADIUS             = 22;   /* px — circle radius in arc SVG */
var SWIPE_CLOSE_THRESHOLD  = 72;   /* px — swipe distance to close drawer */
var REVEAL_ROOT_MARGIN     = '0px 0px -40px 0px'; /* IO margin for .rv reveal */

// ─────────────────────────────────────────────────────────────────
// 2. SCROLL HANDLER
// All scroll side-effects batched into a single rAF callback.
// stickyJoin / heroEl / registerEl are optional — only active on index.html.
// ─────────────────────────────────────────────────────────────────
(function() {
  var ticking    = false;
  var nav        = document.getElementById('mainNav');
  var bar        = document.getElementById('progressBar');
  var arcBtn     = document.getElementById('arcBtn');
  var arcFill    = document.getElementById('arcFill');
  var stickyJoin = document.getElementById('stickyJoin');
  var heroEl     = document.querySelector('.hero');
  var registerEl = document.getElementById('register');
  var footerGhost    = document.querySelector('.footer-ghost');
  var reducedMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CIRC = 2 * Math.PI * ARC_RADIUS; // ARC_RADIUS = SVG circle radius (matches r="22" on #arcFill)
  arcFill.style.strokeDasharray  = String(CIRC);
  arcFill.style.strokeDashoffset = String(CIRC);

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function() {
        var h   = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? window.scrollY / h : 0;

        nav.classList.toggle('scrolled', window.scrollY > SCROLL_NAV_THRESHOLD);   // just past nav height (68px) — adds border + shadow
        bar.style.width = (pct * 100) + '%';
        arcFill.style.strokeDashoffset = String(CIRC * (1 - pct));
        arcBtn.classList.toggle('visible', window.scrollY > SCROLL_ARC_THRESHOLD); // ~1 full viewport scroll before showing back-to-top

        if (stickyJoin && heroEl && registerEl) {
          stickyJoin.classList.toggle('visible',
            heroEl.getBoundingClientRect().bottom < 0 &&
            registerEl.getBoundingClientRect().bottom > 0
          );
        }

        if (footerGhost && !reducedMotion) {
          footerGhost.style.transform = 'translateX(-50%) translateY(' + (window.scrollY * 0.03) + 'px)';
        }

        ticking = false;
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  arcBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) ticking = false;
  });
})();

// ─────────────────────────────────────────────────────────────────
// 3. SCROLL REVEAL
// ─────────────────────────────────────────────────────────────────
(function() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.01, rootMargin: REVEAL_ROOT_MARGIN });
  // threshold 0.01 = fire as soon as 1% of element enters viewport
  // rootMargin -40px bottom = element must be 40px inside viewport before triggering

  document.querySelectorAll('.rv').forEach(function(el) { obs.observe(el); });
})();

// ─────────────────────────────────────────────────────────────────
// 4. MOBILE MENU
// ─────────────────────────────────────────────────────────────────
(function() {
  var mobileMenu = document.getElementById('mobileMenu');
  var backdrop   = document.getElementById('menuBackdrop');
  var burger     = document.getElementById('burgerBtn');

  function openMenu() {
    mobileMenu.classList.add('open');
    backdrop.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    backdrop.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger.focus();
  }

  /* Cross-IIFE bridge for pull-to-dismiss (section 5) — NOT for inline HTML handlers */
  window.closeMenu = closeMenu;

  burger.addEventListener('click', function() {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Focus trap — keep Tab cycling inside the open drawer
  mobileMenu.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab' || !mobileMenu.classList.contains('open')) return;
    var focusable = mobileMenu.querySelectorAll('a, button, [tabindex]');
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus(); e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus(); e.preventDefault();
    }
  });
})();

// ─────────────────────────────────────────────────────────────────
// 5. PULL-TO-DISMISS (swipe-right gesture on mobile drawer)
// ─────────────────────────────────────────────────────────────────
(function() {
  var drawer  = document.getElementById('mobileMenu');
  var startX  = 0;
  var startY  = 0;
  var dragging = false;

  drawer.addEventListener('touchstart', function(e) {
    if (!drawer.classList.contains('open')) return;
    startX   = e.touches[0].clientX;
    startY   = e.touches[0].clientY;
    dragging = true;
    drawer.style.transition = 'none';
  }, { passive: true });

  drawer.addEventListener('touchmove', function(e) {
    if (!dragging) return;
    var dx = e.touches[0].clientX - startX;
    var dy = Math.abs(e.touches[0].clientY - startY);
    if (dx > 0 && dx > dy) drawer.style.transform = 'translateX(' + dx + 'px)';
  }, { passive: true });

  drawer.addEventListener('touchend', function(e) {
    if (!dragging) return;
    var dx = e.changedTouches[0].clientX - startX;
    dragging = false;
    drawer.style.transition = '';
    if (dx > SWIPE_CLOSE_THRESHOLD) { drawer.style.transform = ''; window.closeMenu(); } // ~1/4 of drawer width (280px) feels intentional
    else drawer.style.transform = '';
  }, { passive: true });

  drawer.addEventListener('touchcancel', function() {
    dragging = false;
    drawer.style.transition = '';
    drawer.style.transform  = '';
  }, { passive: true });
})();
