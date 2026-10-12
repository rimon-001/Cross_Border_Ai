# Technical Documentation: CrossBorder AI
> **2026 Shenzhen International FinTech Competition (FinTechathon)**  
> **Topic C:** Cross-border & Student Finance Assistant  
> **Theme:** AI as a Financial Participant  

---

## 1. System Architecture Overview

CrossBorder AI follows a decoupled three-tier architecture:

### 1.1 Client Layer (Single-Page Application)
- **Framework:** React 19 initialized with Vite for rapid client-side rendering.
- **Styling:** Tailwind CSS with a unified high-density dark mode palette (`#060B13`).
- **Data Flow:** Asynchronous REST API requests interacting with backend routes (`/api/overview`, `/api/trust-ledger`, `/api/copilot`).

### 1.2 Orchestration & API Layer
- **Runtime:** Node.js with Express.
- **Security Middleware:** Pre-execution OWASP LLM01 Gate scanning inbound natural language payloads for command injection patterns before passing requests to external models or SQLite.
- **Resilience Engine:** Dual-mode AI pipeline supporting real-time streaming via the `@google/genai` SDK with automatic fallback to deterministic rule-based evaluation.

### 1.3 Persistence & Ledger Layer
- **Database Engine:** `better-sqlite3` configured with Write-Ahead Logging (`PRAGMA journal_mode = WAL`) for ACID-compliant audit logging.
- **Data Entities:** 
  - `student_profile`: Tracks liquid capital, CAS tuition liabilities, and living allocations.
  - `trust_ledger`: Append-only audit ledger storing multi-agent execution steps, confidence scores, and status flags (`SUCCESS`, `WARNING`, `BLOCKED`).

---

## 2. Core Algorithms & Mathematical Models

### 2.1 First-Year Solvency & Funding Deficit
Calculates financial shortfall according to immigration compliance standards:

$$\text{Total Required (EUR)} = \text{Tuition Due} + \text{Living Maintenance Benchmark}$$

$$\text{Total Required (BDT)} = \text{Total Required (EUR)} \times \text{Spot FX Rate}$$

$$\text{Funding Deficit (BDT)} = \max(0, \text{Total Required (BDT)} - \text{Verifiable Liquid Funds})$$

$$\text{Financial Runway (Months)} = \frac{\frac{\text{Verifiable Liquid Funds}}{\text{Spot FX Rate}}}{\frac{\text{Living Maintenance Benchmark}}{12}}$$

### 2.2 Digital Twin Shock Propagation
When the user stresses external macroeconomic conditions:
- **Rent Inflation Shock ($\Delta R$):** Adjusts living expenditures:
  $$\text{Stressed Living} = \text{Living Baseline} \times (1 + \Delta R)$$
- **BDT Depreciation Shock ($\Delta FX$):** Adjusts exchange liabilities:
  $$\text{Stressed FX Rate} = \text{Spot FX Rate} \times (1 + \Delta FX)$$
- **Combined Stressed Runway:**
  $$\text{Stressed Runway} = \max\left(0.1, \text{Baseline Runway} - (\Delta FX \times 0.15) - (\Delta R \times 0.08)\right)$$

### 2.3 Remittance Landed-Cost Computation
Calculates effective landed value for tuition remittance:

$$\text{Effective Landed Rate} = \frac{\text{BDT Transferred}}{\text{EUR Received}}$$

$$\text{Hidden FX Spread} = (\text{Effective Rate} - \text{Mid-Market Rate}) \times \text{EUR Received}$$

$$\text{Total Landed Deduction} = \text{Disclosed Transfer Fee} + \text{Hidden FX Spread} + \text{Intermediary Fees}$$

---

## 3. Multi-Agent Design Pattern

The application splits financial tasks across 5 specialized roles:

```text
               ┌────────────────────────┐
               │   Orchestrator Agent   │
               └───────────┬────────────┘
                           │ Task Delegation
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │ Budget Agent │  │   FX Agent   │  │Document Agent│
  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           ▼
               ┌────────────────────────┐
               │ Risk Sentinel (OWASP)  │
               └───────────┬────────────┘
                           ▼
               ┌────────────────────────┐
               │   Trust Ledger Write   │
               └────────────────────────┘