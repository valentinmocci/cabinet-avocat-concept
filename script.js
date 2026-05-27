/* =====================================================================
   Cabinet Avocat Concept — script.js
   Vanilla JS · pas de tracking · pas d'appel réseau
   ===================================================================== */
(function () {
  'use strict';

  /* ----- 1. Bandeau démo : croix fermable, sans persistance ----- */
  var demoBanner = document.querySelector('[data-demo-banner]');
  if (demoBanner) {
    var closeBtn = demoBanner.querySelector('.demo-banner__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        demoBanner.style.display = 'none';
      });
    }
  }

  /* ----- 2. Burger menu mobile ----- */
  var burger = document.querySelector('[data-burger]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        var firstLink = menu.querySelector('a, button');
        if (firstLink) firstLink.focus();
      }
    });
    // Fermer le menu au clic sur un lien interne
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    // Fermer avec Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('is-open')) {
        document.body.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* ----- 3. Smooth scroll vers les ancres internes ----- */
  // (le CSS gère déjà scroll-behavior: smooth, ce JS ne sert qu'à fermer
  //  le menu mobile et à donner le focus à la cible — accessibilité)
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var hash = a.getAttribute('href');
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Mettre le focus sur la cible (sans la mettre dans le tab order si pas focusable)
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
      // Mettre à jour l'URL sans déclencher le saut natif
      if (history.replaceState) history.replaceState(null, '', hash);
    });
  });

  /* ----- 4. Année dynamique dans le footer (si présente) ----- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
