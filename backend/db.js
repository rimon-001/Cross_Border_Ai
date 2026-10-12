const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'finance.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS student_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    liquid_funds_bdt REAL DEFAULT 3650000,
    tuition_eur REAL DEFAULT 24500,
    living_eur REAL DEFAULT 10800,
    fx_rate REAL DEFAULT 131.58
  );

  CREATE TABLE IF NOT EXISTS trust_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    agent_name TEXT NOT NULL,
    action_type TEXT NOT NULL,
    details TEXT NOT NULL,
    confidence INTEGER DEFAULT 100,
    status TEXT CHECK(status IN ('SUCCESS', 'WARNING', 'BLOCKED')) DEFAULT 'SUCCESS'
  );
`);

const profileCount = db.prepare('SELECT count(*) as count FROM student_profile').get();
if (profileCount.count === 0) {
  db.prepare(`
    INSERT INTO student_profile (name, liquid_funds_bdt, tuition_eur, living_eur, fx_rate)
    VALUES ('Tanvir Ahmed', 3650000, 24500, 10800, 131.58)
  `).run();

  const insertAudit = db.prepare(`
    INSERT INTO trust_ledger (timestamp, agent_name, action_type, details, confidence, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertAudit.run('10:53:48 PM', 'Supervisor Agent', 'Human-Authorized Commit', 'Approved Student File Loan Sanction Bridge.', 100, 'SUCCESS');
  insertAudit.run('10:52:57 PM', 'Budget Agent', 'Deterministic Re-Calculation', 'Re-verified gap: max(0, 4646000 - 3650000) = ৳9.95 Lakh.', 100, 'SUCCESS');
  insertAudit.run('10:52:49 PM', 'Risk Sentinel (OWASP Gate)', 'INJECTION ATTACK THWARTED', 'Quarantined malicious instructions in fake scholarship letter.', 100, 'BLOCKED');
  insertAudit.run('10:52:40 PM', 'Document Intelligence Agent', 'Evidence Extracted', 'Processed blocked account certificate.', 99, 'SUCCESS');
  insertAudit.run('10:42:01 PM', 'Orchestrator Agent', 'Goal Deconstruction', 'Deconstructed visa proof and FX optimization goals.', 99, 'SUCCESS');
}

module.exports = db;