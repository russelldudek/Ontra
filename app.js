(() => {
  'use strict';

  const scenarios = [
    {
      name: 'Finance review',
      id: 'FIN-01',
      title: 'Recurring finance operating review',
      summary: 'Prepare recurring operating review inputs with AI assistance while finance retains interpretation, adjustment, and final communication authority.',
      work: 'Gather, reconcile, and summarize recurring operating inputs before review.',
      value: 'Reduce manual preparation and expose unresolved variance sooner.',
      authority: 'Finance owns interpretation, adjustments, and the final narrative.',
      boundary: 'Approved sources only; no autonomous posting or external disclosure.',
      adoption: 'Named finance owner, review checklist, examples, and feedback cadence.',
      evidence: 'Completeness, preparation effort, rework, review confidence, and retained use.',
      owner: 'Finance workflow owner',
      reuse: 'Keep bounded while evidence accumulates and exceptions become visible.'
    },
    {
      name: 'Account research',
      id: 'GTM-03',
      title: 'Account research preparation',
      summary: 'Prepare account context and meeting hypotheses while commercial leaders retain prioritization, claims, commitments, and customer communication.',
      work: 'Synthesize approved account, market, relationship, and product context before engagement.',
      value: 'Reduce preparation time and improve the consistency of relevant account context.',
      authority: 'The account owner controls priorities, interpretation, claims, and customer commitments.',
      boundary: 'Approved internal and public sources only; no invented facts or automated outreach.',
      adoption: 'Account-owner examples, peer review, and outcome feedback.',
      evidence: 'Preparation effort, factual corrections, meeting usefulness, reuse, and owner confidence.',
      owner: 'Commercial workflow owner',
      reuse: 'Reuse the research pattern while preserving account-specific judgment and claims.'
    },
    {
      name: 'Decision follow-up',
      id: 'OPS-05',
      title: 'Operating decision follow-up',
      summary: 'Draft structured follow-up from operating decisions while accountable leaders retain priority, assignment, timing, and escalation authority.',
      work: 'Convert approved meeting decisions into clear owners, actions, dependencies, and follow-up.',
      value: 'Reduce ambiguity and shorten the path from decision to visible execution.',
      authority: 'Accountable leaders retain priority, assignment, timing, and escalation decisions.',
      boundary: 'Approved meeting records only; no autonomous reassignment or policy interpretation.',
      adoption: 'Owner confirmation, a standard follow-up pattern, and closure feedback.',
      evidence: 'Owner clarity, missed actions, rework, closure rate, and retained use.',
      owner: 'Operating review owner',
      reuse: 'Standardize the follow-up structure while keeping priority and escalation local.'
    }
  ];

  const fields = {
    count: document.getElementById('example-count'),
    name: document.getElementById('example-name'),
    id: document.getElementById('record-id'),
    title: document.getElementById('record-title'),
    summary: document.getElementById('record-summary'),
    work: document.getElementById('field-work'),
    value: document.getElementById('field-value'),
    authority: document.getElementById('field-authority'),
    boundary: document.getElementById('field-boundary'),
    adoption: document.getElementById('field-adoption'),
    evidence: document.getElementById('field-evidence'),
    owner: document.getElementById('field-owner'),
    reuse: document.getElementById('field-reuse'),
    live: document.getElementById('live')
  };
  const record = document.querySelector('.precedent-record');
  const button = document.querySelector('.next-precedent');
  if (!record || !button || Object.values(fields).some((field) => !field)) return;

  let activeIndex = 0;

  function render(index, announce = true) {
    const scenario = scenarios[index];
    fields.count.textContent = `Example ${index + 1} of ${scenarios.length}`;
    fields.name.textContent = scenario.name;
    fields.id.textContent = scenario.id;
    fields.title.textContent = scenario.title;
    fields.summary.textContent = scenario.summary;
    fields.work.textContent = scenario.work;
    fields.value.textContent = scenario.value;
    fields.authority.textContent = scenario.authority;
    fields.boundary.textContent = scenario.boundary;
    fields.adoption.textContent = scenario.adoption;
    fields.evidence.textContent = scenario.evidence;
    fields.owner.textContent = scenario.owner;
    fields.reuse.textContent = scenario.reuse;
    record.classList.remove('record-flash');
    void record.offsetWidth;
    record.classList.add('record-flash');
    if (announce) fields.live.textContent = `${scenario.name} precedent loaded.`;
  }

  button.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % scenarios.length;
    render(activeIndex);
  });

  render(activeIndex, false);
})();
