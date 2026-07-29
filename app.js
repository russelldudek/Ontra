(() => {
  'use strict';

  const scenarios = {
    finance: {
      id: 'FIN-01',
      title: 'Recurring finance operating review',
      summary: 'Prepare recurring operating review inputs with AI assistance while finance retains interpretation, adjustment, and final communication authority.',
      work: 'Gather, reconcile, and summarize recurring operating inputs before review.',
      value: 'Reduce manual preparation and expose unresolved variance sooner.',
      authority: 'Finance owns interpretation, adjustments, and the final narrative.',
      boundary: 'Approved sources only; no autonomous posting or external disclosure.',
      adoption: 'Named finance owner, review checklist, examples, and feedback cadence.',
      evidence: 'Completeness, preparation effort, rework, review confidence, and retained use.',
      owner: 'Finance workflow owner'
    },
    people: {
      id: 'PPL-02',
      title: 'Employee onboarding preparation',
      summary: 'Use AI to assemble role-specific onboarding material while People leaders and managers retain policy interpretation, access decisions, and the employee experience.',
      work: 'Assemble approved role, policy, systems, and team context into a usable onboarding path.',
      value: 'Improve completeness and reduce repeated preparation without flattening role context.',
      authority: 'People and the hiring manager own policy interpretation, access, timing, and exceptions.',
      boundary: 'Approved policy and role sources only; no sensitive inference or autonomous access grant.',
      adoption: 'Named People owner, manager checklist, new-hire feedback, and quarterly content review.',
      evidence: 'Preparation time, completeness, manager rework, new-hire questions, and retained use.',
      owner: 'People Operations workflow owner'
    },
    sales: {
      id: 'GTM-03',
      title: 'Account research preparation',
      summary: 'Use AI to organize approved public and internal account context while account owners retain judgment, positioning, commitments, and customer-facing claims.',
      work: 'Collect and structure approved account, market, relationship, and product context before planning.',
      value: 'Reduce research assembly time and make gaps or contradictions visible earlier.',
      authority: 'The account owner retains interpretation, messaging, commercial judgment, and commitments.',
      boundary: 'Approved sources and permissions; no invented customer facts, pricing, or unsupported claims.',
      adoption: 'Account-owner templates, examples, coaching, and feedback from live planning sessions.',
      evidence: 'Preparation effort, source completeness, correction rate, planning usefulness, and reuse.',
      owner: 'Revenue workflow owner'
    },
    success: {
      id: 'CS-04',
      title: 'Customer preparation brief',
      summary: 'Use AI to prepare a concise account and issue brief while customer leaders retain prioritization, response strategy, promises, and escalation authority.',
      work: 'Synthesize approved customer history, open issues, product context, and next actions.',
      value: 'Improve preparation consistency and surface unresolved dependencies before customer contact.',
      authority: 'Customer Success owns priority, response, commitments, and escalation.',
      boundary: 'Authorized customer data only; no autonomous outreach, promise, or case closure.',
      adoption: 'Named success owner, meeting template, exception guidance, and post-meeting feedback.',
      evidence: 'Preparation time, missing-context rate, action completeness, rework, and retained use.',
      owner: 'Customer Success workflow owner'
    },
    operations: {
      id: 'OPS-05',
      title: 'Decision follow-up and operating cadence',
      summary: 'Use AI to organize decisions, owners, dependencies, and follow-up while accountable leaders retain prioritization, escalation, and final disposition.',
      work: 'Convert approved meeting notes and operating signals into explicit actions, owners, and dependencies.',
      value: 'Reduce lost follow-up and make blocked decisions visible sooner.',
      authority: 'Accountable leaders retain priority, commitment, escalation, and closure decisions.',
      boundary: 'Approved meeting context only; no invented commitments or automatic reassignment.',
      adoption: 'Named cadence owner, review ritual, exception path, and owner-confirmation step.',
      evidence: 'Action completeness, owner confirmation, overdue dependencies, decision latency, and reuse.',
      owner: 'Business Operations workflow owner'
    }
  };

  const evidenceStates = {
    signal: {
      disposition: 'Discovery candidate',
      reuse: 'Keep local while the work, authority, and baseline are clarified.',
      suffix: 'Initial signal only; establish a baseline and bounded test before reuse.'
    },
    proof: {
      disposition: 'Bounded practice',
      reuse: 'Keep bounded while evidence accumulates.',
      suffix: 'Bounded proof; verify behavior, exceptions, trust, and owner participation.'
    },
    repeatable: {
      disposition: 'Reusable precedent',
      reuse: 'Publish the reusable core and preserve legitimate local variation.',
      suffix: 'Repeatable evidence; document the pattern, controls, training, and exception path.'
    }
  };

  const state = { scenario: 'finance', evidence: 'proof', revision: 0 };
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function setText(selector, value) {
    const el = qs(selector);
    if (el) el.textContent = value;
  }

  function render({ announce = true, replay = true } = {}) {
    const scenario = scenarios[state.scenario] || scenarios.finance;
    const evidence = evidenceStates[state.evidence] || evidenceStates.proof;
    const record = qs('.precedent-record');

    state.revision += 1;
    const revision = state.revision;

    qsa('[data-scenario]').forEach((button) => {
      const active = button.dataset.scenario === state.scenario;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });
    qsa('[data-evidence]').forEach((button) => {
      const active = button.dataset.evidence === state.evidence;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });

    setText('#record-id', scenario.id);
    setText('#record-title', scenario.title);
    setText('#record-summary', scenario.summary);
    setText('#disposition', evidence.disposition);
    setText('#field-work', scenario.work);
    setText('#field-value', scenario.value);
    setText('#field-authority', scenario.authority);
    setText('#field-boundary', scenario.boundary);
    setText('#field-adoption', scenario.adoption);
    setText('#field-evidence', `${scenario.evidence} ${evidence.suffix}`);
    setText('#field-owner', scenario.owner);
    setText('#field-reuse', evidence.reuse);

    if (record) {
      record.dataset.scenario = state.scenario;
      record.dataset.evidence = state.evidence;
      record.classList.remove('is-resolving');
      if (replay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        void record.offsetWidth;
        requestAnimationFrame(() => {
          if (revision === state.revision) record.classList.add('is-resolving');
        });
      }
    }

    if (announce) {
      const live = qs('#precedent-live');
      if (live) live.textContent = `${scenario.title}. ${evidence.disposition}. ${evidence.reuse}`;
    }
  }

  function moveWithinGroup(event, selector) {
    const buttons = qsa(selector);
    const index = buttons.indexOf(event.currentTarget);
    if (index < 0) return;
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else return;
    event.preventDefault();
    buttons[next].focus();
    buttons[next].click();
  }

  function init() {
    qsa('[data-scenario]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!scenarios[button.dataset.scenario]) return;
        state.scenario = button.dataset.scenario;
        render();
      });
      button.addEventListener('keydown', (event) => moveWithinGroup(event, '[data-scenario]'));
    });

    qsa('[data-evidence]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!evidenceStates[button.dataset.evidence]) return;
        state.evidence = button.dataset.evidence;
        render();
      });
      button.addEventListener('keydown', (event) => moveWithinGroup(event, '[data-evidence]'));
    });

    const reset = qs('.reset-button');
    if (reset) reset.addEventListener('click', () => {
      state.scenario = 'finance';
      state.evidence = 'proof';
      render();
    });

    const replay = qs('.replay-button');
    if (replay) replay.addEventListener('click', () => render({ announce: false, replay: true }));

    const navToggle = qs('.nav-toggle');
    const mobileNav = qs('#primary-mobile');
    if (navToggle && mobileNav) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        mobileNav.hidden = expanded;
      });
    }

    render({ announce: false, replay: true });
    document.documentElement.classList.add('js-ready');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
