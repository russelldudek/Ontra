(() => {
  'use strict';

  const body = document.querySelector('.site-body');
  const scene = document.querySelector('.capability-scene');
  const button = document.querySelector('.transfer-button');
  const panel = document.getElementById('transfer-test');

  if (body) body.classList.add('is-ready');

  if (scene) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      scene.classList.add('is-visible');
    } else {
      const observer = new IntersectionObserver((entries) => {
        if (!entries[0]?.isIntersecting) return;
        scene.classList.add('is-visible');
        observer.disconnect();
      }, { threshold: 0.28 });
      observer.observe(scene);
    }
  }

  if (button && panel) {
    button.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      button.setAttribute('aria-expanded', String(willOpen));
      button.textContent = willOpen ? 'Hide the transfer test' : 'Reveal the transfer test';
      if (willOpen) panel.focus?.({ preventScroll: true });
    });
  }
})();
