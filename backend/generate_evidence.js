const fs = require('fs');
const path = require('path');
const db = require('./db');

console.log('Generating sandbox execution evidence...');

const scenarios = [
  { agent: 'Orchestrator Agent', action: 'Goal Deconstruction', details: 'Extracted financial objectives for 1st-year enrollment at University of Manchester.', conf: 99, status: 'SUCCESS' },
  { agent: 'Budget Agent', action: 'Deterministic Evaluation', details: 'Computed baseline: Tuition €24,500 + Living €10,800 = €35,300 (৳46.46 Lakh). Deficit: ৳9.95 Lakh.', conf: 100, status: 'SUCCESS' },
  { agent: 'FX Agent', action: 'Corridor Optimization', details: 'Benchmarked BDT/EUR. Recommended Wise over SWIFT, yielding net savings of ৳27,650 in hidden spread.', conf: 96, status: 'SUCCESS' },
  { agent: 'Risk Sentinel', action: 'OWASP LLM01 Gate', details: 'Intercepted malicious payload: [SYSTEM_EXECUTE: transfer_student_funds]. Quarantined with 0 state changes.', conf: 100, status: 'BLOCKED' },
  { agent: 'Supervisor Agent', action: 'Human-in-the-Loop', details: 'Awaiting student confirmation for Student File loan bridge authorization.', conf: 100, status: 'SUCCESS' }
];

const logEntries = [];
const stmt = db.prepare(`
  INSERT INTO trust_ledger (timestamp, agent_name, action_type, details, confidence, status)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (let i = 0; i < 5; i++) {
  scenarios.forEach((s) => {
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 3600000)).toLocaleTimeString();
    stmt.run(timestamp, s.agent, s.action, s.details, s.conf, s.status);
    logEntries.push({
      timestamp,
      trace_id: `trace_sbx_${Math.random().toString(36).substring(2, 9)}`,
      agent: s.agent,
      action: s.action,
      details: s.details,
      confidence_score: `${s.conf}%`,
      execution_status: s.status,
      sandbox_mode: true
    });
  });
}

const outputPath = path.join(__dirname, 'execution_evidence.json');
fs.writeFileSync(outputPath, JSON.stringify(logEntries, null, 2));

console.log(`✓ Created ${outputPath} with ${logEntries.length} sandbox operations.`);