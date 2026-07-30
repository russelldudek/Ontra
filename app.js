(() => {
  'use strict';
  const scenarios = {
    finance:{id:'FIN-01',title:'Recurring finance operating review',summary:'Prepare recurring operating review inputs with AI assistance while finance retains interpretation, adjustment, and final communication authority.',work:'Gather, reconcile, and summarize recurring operating inputs before review.',value:'Reduce manual preparation and expose unresolved variance sooner.',authority:'Finance owns interpretation, adjustments, and the final narrative.',boundary:'Approved sources only; no autonomous posting or external disclosure.',adoption:'Named finance owner, review checklist, examples, and feedback cadence.',evidence:'Completeness, preparation effort, rework, review confidence, and retained use.',owner:'Finance workflow owner'},
    people:{id:'PPL-02',title:'Employee onboarding preparation',summary:'Assemble role-specific onboarding material while People leaders and managers retain policy interpretation, access decisions, and the employee experience.',work:'Combine approved role, policy, systems, and team context into one onboarding path.',value:'Improve completeness and reduce repeated preparation without flattening role context.',authority:'People and the hiring manager own policy interpretation, timing, access, and exceptions.',boundary:'Approved policy and role sources only; no sensitive inference or autonomous access grant.',adoption:'Named People owner, manager checklist, new-hire feedback, and content review cadence.',evidence:'Preparation time, completeness, manager rework, new-hire questions, and retained use.',owner:'People Operations workflow owner'},
    sales:{id:'GTM-03',title:'Account research preparation',summary:'Prepare focused account context with AI assistance while commercial leaders retain positioning, relationship judgment, and all commitments.',work:'Collect approved public and internal account context before a commercial review.',value:'Reduce research time and improve consistency of preparation.',authority:'The account owner retains interpretation, positioning, and customer commitments.',boundary:'Approved sources only; no sensitive inference, external outreach, or autonomous CRM changes.',adoption:'Named sales owner, research template, review examples, and feedback from active pursuits.',evidence:'Preparation effort, source completeness, rework, usefulness, and retained use.',owner:'Commercial workflow owner'},
    success:{id:'CUS-04',title:'Customer preparation brief',summary:'Assemble customer context before a meeting while Customer Success retains relationship judgment, commitments, and escalation authority.',work:'Bring approved account history, open issues, commitments, and product context into one brief.',value:'Improve preparation quality and surface unresolved follow-up sooner.',authority:'Customer Success owns interpretation, commitments, tone, and escalation.',boundary:'Approved customer records only; no autonomous customer communication or promise.',adoption:'Named CS owner, pre-meeting checklist, examples, and post-meeting feedback.',evidence:'Preparation time, issue completeness, rework, meeting usefulness, and follow-through.',owner:'Customer Success workflow owner'},
    operations:{id:'OPS-05',title:'Cross-functional decision follow-up',summary:'Convert meeting decisions into owned follow-up while leaders retain prioritization, commitment, and exception authority.',work:'Extract decisions, owners, due dates, dependencies, and unresolved questions from approved records.',value:'Reduce follow-up latency and make ownership visible.',authority:'Meeting owners confirm commitments, priorities, and exceptions.',boundary:'Approved meeting records only; no autonomous assignment, escalation, or external communication.',adoption:'Named meeting owner, confirmation step, standard follow-up format, and weekly review.',evidence:'Decision completeness, confirmation time, overdue work, rework, and retained use.',owner:'Cross-functional meeting owner'}
  };
  const evidenceStates=[
    {label:'Observed signal',disposition:'Discovery candidate',reuse:'Keep in discovery; clarify the work, owner, boundary, and evidence plan.',suffix:' Early signal only; define a bounded test and baseline.'},
    {label:'Bounded proof',disposition:'Bounded practice',reuse:'Keep bounded while evidence accumulates.',suffix:' Bounded proof; preserve review and collect retained-use evidence.'},
    {label:'Repeatable evidence',disposition:'Reusable precedent',reuse:'Publish the reusable core and preserve legitimate local variation.',suffix:' Repeatable evidence; document the pattern, controls, training, and exception path.'}
  ];
  const select=document.querySelector('#scenario-select');
  const range=document.querySelector('#evidence-range');
  const record=document.querySelector('.precedent-record');
  if(!select||!range||!record) return;
  const fields={id:'#record-id',title:'#record-title',summary:'#record-summary',work:'#field-work',value:'#field-value',authority:'#field-authority',boundary:'#field-boundary',adoption:'#field-adoption',evidence:'#field-evidence',owner:'#field-owner',reuse:'#field-reuse',disposition:'#disposition'};
  const set=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value};
  function render(){
    const scenario=scenarios[select.value]||scenarios.finance;
    const state=evidenceStates[Number(range.value)]||evidenceStates[1];
    set(fields.id,scenario.id);set(fields.title,scenario.title);set(fields.summary,scenario.summary);set(fields.work,scenario.work);set(fields.value,scenario.value);set(fields.authority,scenario.authority);set(fields.boundary,scenario.boundary);set(fields.adoption,scenario.adoption);set(fields.evidence,scenario.evidence+state.suffix);set(fields.owner,scenario.owner);set(fields.reuse,state.reuse);set(fields.disposition,state.disposition);set('#evidence-label',state.label);
    range.setAttribute('aria-valuetext',state.label);
    record.classList.remove('is-resolving');
    void record.offsetWidth;
    record.classList.add('is-resolving');
  }
  select.addEventListener('change',render);range.addEventListener('input',render);render();
})();
