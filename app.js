(() => {
  'use strict';

  const record = document.querySelector('.precedent-record');
  if (!record) return;

  const gridItems = Array.from(record.querySelectorAll('.record-grid article'));
  const labels = [
    '01 · Work to change',
    '02 · Human decision retained',
    '03 · Evidence before reuse'
  ];
  const visibleIndexes = [0, 2, 5];

  gridItems.forEach((item, index) => {
    const visiblePosition = visibleIndexes.indexOf(index);
    if (visiblePosition === -1) {
      item.setAttribute('hidden', '');
      return;
    }

    const label = item.querySelector('span');
    if (label) label.textContent = labels[visiblePosition];
    item.style.setProperty('--stage-index', visiblePosition);
  });

  const evidence = document.getElementById('field-evidence');
  if (evidence) {
    evidence.textContent = 'Track completeness, preparation effort, corrections, review confidence, and retained use. Reuse only when the pattern works beyond one case.';
  }

  const ownerBlock = record.querySelector('.record-footer > div:first-child');
  if (ownerBlock) ownerBlock.setAttribute('hidden', '');

  const decisionLabel = record.querySelector('.record-footer > div:nth-child(2) span');
  if (decisionLabel) decisionLabel.textContent = 'Decision';

  const decision = document.getElementById('field-reuse');
  if (decision) {
    decision.textContent = 'Keep the workflow local until evidence shows the operating pattern can transfer safely.';
  }

  record.querySelectorAll('.record-kicker, .record-status, .next-precedent, .control-note').forEach((element) => {
    element.setAttribute('hidden', '');
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    record.classList.add('is-revealed');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry || !entry.isIntersecting) return;
    record.classList.add('is-revealed');
    observer.disconnect();
  }, { threshold: 0.28 });

  observer.observe(record);
})();