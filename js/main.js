/* ============================================================
   YourBestMoney.com — Main JavaScript
   Interactivity | Animations | Language Switching
   ============================================================ */

(function () {
  'use strict';

  // --- DOM Ready ---
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileMenu();
    initLanguageSwitcher();
    initScrollAnimations();
    initStickyHeader();
    initScrollToTop();
    initTabs();
    initAccordions();
    initQuiz();
    initCounters();
    initCarousels();
    initDailyLesson();
    initSmoothScroll();
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-mobile');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Language Switcher ---
  function initLanguageSwitcher() {
    const btn = document.querySelector('.lang-btn');
    const dropdown = document.querySelector('.lang-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
    });

    dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // --- Scroll Animations (Intersection Observer) ---
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // --- Sticky Header ---
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Scroll to Top ---
  function initScrollToTop() {
    var btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Tabs ---
  function initTabs() {
    var containers = document.querySelectorAll('.tabs-container');
    containers.forEach(function (container) {
      var btns = container.querySelectorAll('.tab-btn');
      var panels = container.querySelectorAll('.tab-panel');

      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');

          btns.forEach(function (b) { b.classList.remove('active'); });
          panels.forEach(function (p) { p.classList.remove('active'); });

          btn.classList.add('active');
          var panel = container.querySelector('#' + target);
          if (panel) panel.classList.add('active');
        });
      });
    });
  }

  // --- Accordions ---
  function initAccordions() {
    var items = document.querySelectorAll('.accordion-item');
    items.forEach(function (item) {
      var header = item.querySelector('.accordion-header');
      var body = item.querySelector('.accordion-body');
      if (!header || !body) return;

      header.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all others in same group
        var parent = item.closest('.accordion-group');
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(function (i) {
            i.classList.remove('open');
            var b = i.querySelector('.accordion-body');
            if (b) b.style.maxHeight = null;
          });
        }

        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        } else {
          item.classList.remove('open');
          body.style.maxHeight = null;
        }
      });
    });
  }

  // --- Interactive Quiz ---
  function initQuiz() {
    var quizSections = document.querySelectorAll('.quiz-section');
    quizSections.forEach(function (section) {
      var options = section.querySelectorAll('.quiz-option');
      var resultEl = section.querySelector('.quiz-result');

      options.forEach(function (option) {
        option.addEventListener('click', function () {
          // Toggle selection
          if (section.querySelector('[data-multi="true"]')) {
            option.classList.toggle('selected');
          } else {
            options.forEach(function (o) { o.classList.remove('selected'); });
            option.classList.add('selected');
          }

          // Update marker
          options.forEach(function (o) {
            var marker = o.querySelector('.quiz-option-marker');
            if (marker) {
              marker.textContent = o.classList.contains('selected') ? '\u2713' : '';
            }
          });

          // Show result if exists
          if (resultEl) {
            var selectedVal = option.getAttribute('data-value');
            var results = section.querySelectorAll('.quiz-result-item');
            results.forEach(function (r) {
              r.style.display = r.getAttribute('data-for') === selectedVal ? 'block' : 'none';
            });
            resultEl.style.display = 'block';
          }
        });
      });
    });
  }

  // --- Animated Counters ---
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // --- Carousel Scroll Buttons ---
  function initCarousels() {
    var carousels = document.querySelectorAll('.expert-carousel');
    carousels.forEach(function (carousel) {
      var parent = carousel.closest('.carousel-wrapper');
      if (!parent) return;

      var prevBtn = parent.querySelector('.carousel-prev');
      var nextBtn = parent.querySelector('.carousel-next');
      var scrollAmount = 340;

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }
    });
  }

  // --- Daily Lesson Rotation ---
  function initDailyLesson() {
    var container = document.querySelector('.daily-lesson');
    if (!container) return;

    // Update date display
    var dateEl = container.querySelector('.daily-lesson-date');
    if (dateEl) {
      var now = new Date();
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var lang = document.documentElement.lang || 'en';
      try {
        dateEl.textContent = now.toLocaleDateString(lang, options);
      } catch (e) {
        dateEl.textContent = now.toLocaleDateString('en-US', options);
      }
    }
  }

  // --- Smooth Scroll for Anchor Links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = document.querySelector('.site-header')
            ? document.querySelector('.site-header').offsetHeight
            : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

})();
