(function () {
  'use strict';

  var toggle = document.querySelector('.navbar__toggle');
  var navLinks = document.querySelector('.navbar__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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

  function decodeHtmlEntities(str) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }

  function getCodeFromSection(codeSection) {
    var codeEl = codeSection.querySelector('.pre-block code');
    if (!codeEl) return '';
    var raw = codeEl.textContent || codeEl.innerText;
    return decodeHtmlEntities(raw);
  }

  function openTryEditor(code, returnPage) {
    try {
      sessionStorage.setItem('tryEditorCode', code);
    } catch (e) {}
    var base = window.location.pathname.replace(/\/[^/]*$/, '/');
    var encoded = btoa(unescape(encodeURIComponent(code)));
    var url = base + 'try-editor.html?code=' + encodeURIComponent(encoded);
    if (returnPage) url += '&return=' + encodeURIComponent(returnPage);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  document.querySelectorAll('.try-example-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var codeSection = this.closest('.code-section');
      if (!codeSection) return;
      var code = getCodeFromSection(codeSection);
      var returnPage = window.location.pathname.split('/').pop() || '';
      openTryEditor(code, returnPage);
    });
  });

  document.querySelectorAll('.copy-code-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var codeSection = this.closest('.code-section');
      if (!codeSection) return;
      var code = getCodeFromSection(codeSection);
      navigator.clipboard.writeText(code).then(function () {
        var t = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = t; }, 1500);
      }).catch(function () {});
    });
  });

  document.querySelectorAll('.run-code-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var codeSection = this.closest('.code-section');
      if (!codeSection) return;
      var code = getCodeFromSection(codeSection);
      var returnPage = window.location.pathname.split('/').pop() || '';
      openTryEditor(code, returnPage);
    });
  });

  document.querySelectorAll('.reset-code-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = this.closest('.code-block-wrap');
      var codeEl = wrap && wrap.querySelector('.pre-block code');
      if (!codeEl || !wrap.dataset.initialCode) return;
      try {
        var decoded = atob(wrap.dataset.initialCode);
        if (decoded.indexOf('\\n') !== -1) decoded = decoded.split('\\n').join('\n');
        codeEl.textContent = decoded;
      } catch (e) {}
    });
  });
})();
