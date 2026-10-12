# CrossBorder AI: Autonomous Student Finance Assistant
> **2026 Shenzhen International FinTech Competition (FinTechathon) — International Track**  
> **Topic C:** Cross-border & Student Finance Assistant  
> **Theme:** AI as a Financial Participant  

CrossBorder AI is a multi-agent financial assistant engineered for international students navigating overseas education tuition, visa maintenance proof-of-funds (UKVI 28-day rule & European blocked accounts), cross-border remittance spreads, and living affordability shocks.

---

## 🌟 Key Capabilities & Architectural Features

1. **Autonomous Financial Participant:**
   - Evaluates tuition obligations, visa proof-of-funds, and liquid assets.
   - Calculates financial runway and affordability indices in real time without human manual calculation.

2. **Digital Twin Live Sandbox:**
   - Stress-tests finances against real-world foreign exchange shocks (BDT depreciation), destination rent inflation, and scholarship disbursement lags.

3. **Landed-Cost Cross-Border Remittance Engine:**
   - Benchmarks remittance methods (Wise vs. SWIFT Telegraphic Transfers vs. Flywire) revealing hidden foreign exchange markups and intermediary bank deductions.

4. **Security & Prompt Injection Quarantine (OWASP LLM01 Gate):**
   - Active regex and semantic guardrail isolating adversarial prompt injections embedded in uploaded scholarship letters or invoice streams.

5. **Explainable Multi-Agent Trust Ledger:**
   - Immutable audit trail recording execution provenance across five specialized agents: Orchestrator, Budget Agent, FX Agent, Document Agent, and Risk Sentinel.

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                 React + Tailwind CSS Client                 │
│   (Overview, Missions, Sandbox Sliders, Money Map, Ledger)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON REST APIs
┌──────────────────────────────▼──────────────────────────────┐
│                    Node.js & Express API                    │
│   ┌─────────────────────────────────────────────────────┐   │
│   │         OWASP LLM01 Risk Sentinel Interceptor       │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│         ┌────────────────────┴────────────────────┐         │
│         ▼                                         ▼         │
│  ┌──────────────┐                         ┌──────────────┐  │
│  │  Gemini 2.5  │                         │ Better-SQLite│  │
│  │ Flash Engine │                         │ WAL Database │  │
│  └──────────────┘                         └──────────────┘  │
└─────────────────────────────────────────────────────────────┘