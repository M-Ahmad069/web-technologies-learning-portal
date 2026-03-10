(function () {
  'use strict';

  // Mobile navbar toggle
  var toggle = document.querySelector('.navbar__toggle');
  var navLinks = document.querySelector('.navbar__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link (for in-page anchor)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links (fallback for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Highlight current lecture in sidebar (on lecture pages)
  var sidebarLinks = document.querySelectorAll('.lecture-sidebar__list a');
  var currentPath = window.location.pathname.replace(/\/$/, '');
  var currentFile = currentPath.split('/').pop() || '';

  sidebarLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkFile = href.split('/').pop();
    if (currentPath.endsWith(href) || currentFile === linkFile) {
      link.classList.add('is-active');
    }
  });
})();
