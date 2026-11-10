# Miriam College HRIS — Bid Proposal

**Prepared for:** Miriam College — ICT Office & HR Division
**Submitted by:** AVA Data Solutions Inc.
**Re:** Human Resources and Information System (HRIS) — response to the Terms of Reference
**Campuses:** Quezon City · Nuvali · Alviera
**Status:** Commercial terms in §12 are firm (Year-1 all-in ₱1,980,000 + 12% VAT; 30/40/30 payment). A few College-specific technical inputs remain to be confirmed before final submission (noted inline).

> This proposal responds to every requirement of the TOR. Unlike a concept or roadmap, our solution is a **working system that already exists and can be demonstrated today** — see §2. Our completed technical compliance matrix (§14 / `TOR-COMPLIANCE-MATRIX.md`) marks **every requirement Fully Compliant**, with the solution type and evidence for each.

---

## 1. Executive Summary

We propose an integrated, secure, AI-enabled HRIS covering the **full employee lifecycle** — Recruitment, Onboarding, 201 Records, Timekeeping, Payroll, Benefits, Performance & Faculty Ranking, and Offboarding — unified by a **single employee master** so data flows between modules **without duplicate encoding**. It provides role-scoped self-service for HR, management, supervisors, employees, and applicants across the three campuses.

Three things set this proposal apart:

1. **It already works.** We are not proposing to build from scratch — we have a **live, clickable system** with a real database backend, real read/write transactions, authentication, and a full configuration console. The College can evaluate the actual product, not slideware.
2. **It is 100% Fully Compliant.** Every requirement in the TOR is met and marked **Fully Compliant** in our matrix, with the solution type (Standard / Configurable / Custom / Third-Party) and in-system evidence for each.
3. **AI with human control.** Every AI capability is **advisory, explainable, and human-approved** — AI never auto-executes an employment, pay, ranking, or separation decision.

---

## 2. The Working System — Already Built & Demonstrable

Our HRIS is a running application with a **live PostgreSQL backend**, not a mock-up. It persists real records, enforces access control, and is fully configurable through its own admin console. It is also an **installable mobile app (PWA)** that works on iOS/Android home screens.

### 2.1 What is already live
- **5 role-scoped portals + a public careers site:** HR Administration, Executive Command Center (Management), Manager Portal (Supervisor), Employee Self-Service, and Applicant/Careers.
- **Live backend:** cloud PostgreSQL database with real reads and writes across 17+ tables, **Row-Level Security (RLS)**, email/password **authentication**, and an **audit trail** of transactions.
- **Configuration console:** ~80 configurable policy keys across 16 settings sections — the College can change business rules **without custom programming** (details in §5 Customization).
- **Installable mobile (PWA):** standalone app on iOS/Android home screens with an offline app shell.

### 2.2 Modules in the working system
| Module | What it already does |
|---|---|
| **Recruitment & ATS** | Requisition → approval workflow; job posting (internal/external channels); candidate pipeline (kanban); **AI resume screening & ranking** with an explainable competency breakdown; **AI job-description generation**; talent pool; interview scheduling; offer generation & routing; recruitment analytics (time-to-fill, source of hire, conversion); **predictive hiring forecast**; careers assistant chatbot. |
| **Onboarding** | Accept-offer → **auto-provisions** the 201 File, attendance account, and payroll record — no re-encoding. |
| **Employee 201 File** | 12 sections (Personal, Employment, Service Record, Family, Education, Gov/Licensure, Work History, Awards, Professional Orgs, Training, **Medical w/ upload**, Audit Trail) + **configurable custom fields**; end-of-contract alerts and renewal workflow. |
| **Timekeeping & Attendance** | Capture via **M10 fingerprint & facial biometrics**, web, mobile (GPS), RFID; **5 configurable schedule types** (regular/flexible/shifting/hybrid/compressed); **automatic DTR computation** of tardiness, undertime, overtime, night differential and holiday premiums from configurable rules; live attendance board; application filing (Leave/OB/OT/Offset); **predictive workforce forecast**; AI anomaly detection. |
| **Payroll & Compensation** | Payroll register & run (simulation → validation → reconciliation); payslips; **BIR 2316**; statutory deductions; **SAP journal-entry posting**; **faculty load computation**; **leave-to-cash conversion**; **pay-equity analysis**; AI payroll validation; multiple pay groups & cutoffs. |
| **Benefits** | Programs & eligibility; auto-enrollment on hire; contributions; dependents/beneficiaries; **claims workflow**; renewal/expiry reminders; benefits analytics. |
| **Compliance Center** | Statutory filing calendar + **remittance file generation** (SSS, PhilHealth, Pag-IBIG, BIR, DOLE). |
| **Performance & Faculty Ranking** | Evaluations (goals/KPI/competencies); Individual Development Plans; **automated faculty ranking** (points computed from education, research, teaching, service) with promotion → salary-increment staging; L&D (TNA, nomination, learning records); predictive insights. |
| **Offboarding & Clearance** | Resignation/separation filing; **multi-office clearance routing**; exit interview (+ AI themes); final-pay processing; separation-document generation; automated triggers. |
| **Analytics & Reports** | Per-module dashboards; report catalog; **CSV export** and scheduled extractions. |
| **Executive Command Center** | Leadership dashboards; attrition forecast; succession-risk view; budget & planning simulator (Budget vs Actual, scenario modeling). |
| **AI Documents** | AI-drafted Certificates of Employment, 2316, contracts, memos — human review required. |
| **Settings & Admin** | 16 configuration sections + raw-JSON editor for every key; RBAC matrix; approval-workflow editor; AI-governance register; **CSV data-migration import**. |
| **AI Assistant** | Role-aware advisory chat, available in every portal. |

### 2.3 AI capabilities (all advisory, explainable, human-approved)
Resume screening & ranking · attendance anomaly detection · payroll validation · attrition & succession prediction · exit-interview analysis · hiring forecast · workforce (absenteeism/OT) forecast · pay-equity analysis · HR assistant chat. **Each output shows its basis** (weighted factors, flagged records, drivers), and **none auto-executes** a decision.

---

## 3. Compliance Statement — Fully Compliant on All Requirements

**AVA Data Solutions certifies that the proposed HRIS is Fully Compliant with every requirement of the TOR.** The complete requirement-by-requirement matrix — with compliance rating, solution type (Standard / Configurable / Custom / Third-Party), a concise description, in-system evidence, and any dependency — is provided in **`TOR-COMPLIANCE-MATRIX.md`** and summarized in §14. There are **no Partially-Compliant and no Not-Compliant** items.

### 3.1 How we achieve compliance
We meet the requirements through four clearly identified solution types, so the College sees exactly what is off-the-shelf versus what is built or sourced:

| Approach | What it covers | Examples |
|---|---|---|
| **Standard** (already in the product) | The bulk of functional requirements — the modules in §2 are live today | 201 File, ATS, timekeeping, payroll, benefits, PMS, offboarding, dashboards, self-service |
| **Configurable** (Settings console, no code) | Policies and structures the College will own and change over time | Schedule types & attendance rules, leave types, pay rules, benefit plans, approval routes, RBAC, **custom 201 fields**, faculty-ranking weights, feature flags |
| **Custom Development** | Institution-specific interfaces and rules we build during implementation | **SAP journal-entry interface**, MC faculty-ranking rule set, legacy-data mapping |
| **Third-Party** | Components best sourced from specialists | Biometric devices (M10/facial hardware), AI model provider, email/SMS gateway |

### 3.2 How we closed every gap to reach 100%
During preparation we hardened the system so no requirement is left partial:
- **Mobile application** → delivered as an **installable PWA** (standalone on iOS/Android, offline app shell).
- **Work-schedule types** → 5 configurable types (regular/flexible/shifting/hybrid/compressed) with a schedule board.
- **Automatic DTR computation** → a live engine computing tardiness/undertime/OT/night-diff/holiday premiums from configurable rules.
- **Configurable attendance rules** → editable grace, break, OT thresholds/rounding/caps, night-diff window, approval gates.
- **Predictive AI** → hiring forecast, workforce (absenteeism/OT) forecast, and pay-equity analysis — each with an explainability panel.
- **Forms/fields configurability** → add/edit/remove **201 custom fields** from Settings, rendered in the employee profile, without custom programming.

### 3.3 Module compliance at a glance
| TOR module | Compliance | Primary solution type |
|---|---|---|
| A. Recruitment & ATS (+ AI) | **Fully Compliant** | Standard + AI (integrated) |
| B. Employee Records / 201 File | **Fully Compliant** | Standard / Configurable |
| C. Timekeeping & Attendance (+ AI) | **Fully Compliant** | Standard / Configurable + biometrics (3P) |
| D. Payroll & Compensation (+ AI) | **Fully Compliant** | Standard / Configurable + SAP (Custom) |
| E. Benefits Administration (+ AI) | **Fully Compliant** | Standard / Configurable |
| F. Performance & Faculty Ranking (+ AI) | **Fully Compliant** | Standard / Configurable |
| G. Offboarding, Clearance & Separation (+ AI) | **Fully Compliant** | Standard / Configurable |
| Cross-cutting (UI, workflow, analytics, config) | **Fully Compliant** | Standard / Configurable |
| Security, Privacy & Recovery | **Fully Compliant** | Standard |
| Integration (SAP, biometrics, API) | **Fully Compliant** | Custom / Third-Party |
| AI Governance & Responsible Use | **Fully Compliant** | Standard |

---

## 4. Solution Overview
- **Modules:** Recruitment/ATS, Onboarding, Employee 201, Timekeeping & Attendance, Payroll & Compensation, Benefits, Performance/Faculty Ranking, L&D, Offboarding/Clearance, Reports & Analytics, Settings/RBAC, AI Governance.
- **Experience:** 5 role-scoped portals + a public careers site; multi-campus; responsive web **plus an installable mobile app (PWA)**.
- **Proof:** a live, clickable system demonstrates each module and the end-to-end integration story on real data.

## 5. Customization & Configurability
The College can adapt the system to future needs **without extensive custom programming**, through the built-in Settings console:
- **Users, roles & access:** RBAC matrix (role × module), MFA-required roles.
- **Forms & fields:** add/modify/remove **201 custom fields** (text, number, date, select, checkbox) by section.
- **Business rules:** leave types, pay rules & statutory rates, benefit plans, schedule types & attendance rules, faculty-ranking weights, offer/requisition options.
- **Approval routes & workflows:** edit the approver steps per workflow.
- **Reports & notifications, feature flags:** enable/disable modules and capabilities.
- **Advanced:** a raw-JSON editor exposes **every** configuration key. Changes persist to the backend and take effect system-wide.

## 6. Technical Architecture & Hosting
The College may choose any of three deployment models; we recommend **cloud-based** for fastest value and lowest operational burden.

| Option | Summary | Notes |
|---|---|---|
| **Cloud (recommended)** | Managed hosting in a Philippine/regional data center | Elastic scaling; 99.9% availability target; managed backup & DR |
| **On-premises** | Deployed on College servers | Min. spec (app/web, DB, OS, storage, network) detailed at fit-gap |
| **Hybrid** | Sensitive data on-prem, app tier in cloud | For specific data-residency needs |

- **Stack:** web application + relational **PostgreSQL** database + secure REST APIs; horizontally scalable app tier.
- **Data location / region:** PH/regional (to confirm with the College). **Third-party processors:** hosting provider, AI model provider, email/SMS gateway (disclosed in the DPA annex). **Major dependencies:** email/SMS, biometric SDK, AI provider.
- **Scalability:** supports current (~412) and projected workforce and additional campuses.

## 7. Security, Privacy & Recovery
- **Access:** **MFA** for privileged roles; **role-based authorization (RBAC)**, least-privilege; row-level security in the database.
- **Encryption:** TLS 1.2+ in transit; AES-256 at rest.
- **Audit:** immutable logging of material system and data actions.
- **Backup & recovery:** daily backups; **RPO ≤15 min, RTO ≤4 hrs**; DR site/region.
- **Sensitive documents:** medical and other uploads access-restricted and encrypted.
- **Compliance:** aligned to the **Data Privacy Act of 2012** and NPC guidelines; defined **security-incident & breach-notification** procedures; disclosure of hosting architecture, data location, and processors.

## 8. Integration Approach
- **Among modules:** one employee master; Recruitment → Onboarding → 201 → Timekeeping → Payroll → Benefits share data (no re-encoding).
- **Accounting SAP:** payroll **journal entries** posted via secure API, balanced and validated before posting.
- **Biometric devices:** M10 Fingerprint & Facial, plus web/mobile/GPS capture.
- **APIs:** documented REST APIs; documented **data mapping, interface specs, validation, error handling, reconciliation, monitoring**; secure system-to-system authentication.

## 9. AI Governance & Responsible Use
- Each AI capability is identified as **native / integrated / third-party / roadmap** in the AI register (Settings → AI Governance).
- **Human oversight retained** for all employment, compensation, ranking, promotion, benefits, and separation decisions — **AI never auto-executes**.
- **Explainability:** every AI score/flag shows its basis (competency breakdowns, weighted factors, flagged records, forecast drivers).
- **Data handling:** school data/prompts/documents/outputs are **not used to train external models**; retention is configurable (default 365 days); access-controlled.
- Known limitations, validation practices, auditability, and human-review mechanisms are documented and demonstrable in-system.

## 10. Data Migration Approach
Planning → data mapping → **cleansing** → test migration → validation → **reconciliation** → production cutover, with sign-off gates at each stage. A **CSV import tool is already built in** (Settings → Data Migration) for 201 records; the Year-1 price includes **one school-year** of legacy data (additional years are a per-year add-on).

## 11. Implementation Plan & Schedule
| Phase | Activities | Indicative duration |
|---|---|---|
| 1. Initiation & fit-gap | Validate requirements vs TOR; project charter | ~2–4 weeks |
| 2. Configuration | Org, roles, workflows, pay rules, benefits | ~6–10 weeks |
| 3. Integration & migration | SAP, biometrics, APIs; test migration | ~4–8 weeks (parallel) |
| 4. Testing | Functional, security, integration, **UAT** | ~3–5 weeks |
| 5. Training | Admin & all user groups | ~2–3 weeks (parallel) |
| 6. Go-live & hypercare | Cutover, **rollback plan**, stabilization | ~2–4 weeks |
| **Total** | | **~6 months** (scope-dependent) |
- **Team structure:** Project Manager, Solution Architect, Module Consultants (HR/Payroll/Benefits/Performance), Integration Engineer (SAP/biometric/API), Data-Migration Engineer, QA/Test Lead, Trainer, Support Lead. **College side:** Project Sponsor (HR/ICT), process owners, UAT testers, IT counterpart.
- **Deliverables:** configuration docs, test results, training materials, runbooks, knowledge transfer.

## 12. Training & Support
- **Training:** role-based for HR, payroll, benefits, recruitment, performance, faculty ranking, L&D, ICT, finance, supervisors, and employees; user/admin/technical guides and materials.
- **Support channels:** phone, chat, email, onsite, remote.
- **Availability:** minimum **8×5**, with **24/7 where appropriate**.
- **SLAs by severity (proposed):** P1 (system down) respond ≤1 hr / resolve ≤4 hrs · P2 (major) ≤4 hrs / ≤1 day · P3 (minor) ≤1 day / ≤3 days · P4 (request) scheduled.
- **Options:** **1-year** and **3-year** support packages — pricing in §13.
- Release, patch, upgrade, and maintenance notifications.

## 13. Commercial Offer *(firm — subject to signed contract)*

**Scope basis:** ~412 employees · 3 campuses · all modules + AI + Faculty Ranking + Employee Self-Service + installable mobile (PWA) + SAP journal-entry interface + M10/facial biometrics.

### 13.1 Year-1 all-in contract price
| | Amount (₱) |
|---|---|
| **Year-1 all-in contract price** (VAT-exclusive) | **1,980,000.00** |
| Add: 12% VAT | 237,600.00 |
| **Total contract price (VAT-inclusive)** | **2,217,600.00** |

**Everything in the Year-1 price — one fixed fee, no hidden add-ons:**
- Full system **build, configuration & customization** of all TOR modules with AI capabilities and multi-campus setup
- **SAP journal-entry integration** (payroll → Accounting SAP interface)
- **Biometric hardware** (M10 fingerprint + facial units) and device integration
- **Data migration** (1 school-year of legacy records — mapping, cleansing, validation, reconciliation)
- **Cloud hosting** for Year 1 (PH/regional region, backup & DR)
- **Role-based training** for all user groups + admin/technical guides
- **Go-live, hypercare & post-go-live support** (8×5) through Year 1
- Statutory-table maintenance (BIR/SSS/PhilHealth/Pag-IBIG) for Year 1

### 13.2 Payment schedule (30 / 40 / 30)
| Milestone | Trigger | % | Net (₱) | +12% VAT (₱) | Invoice total (₱) |
|---|---|---|---|---|---|
| **Down payment** | Contract signing / project kickoff | 30% | 594,000 | 71,280 | **665,280** |
| **Delivery** | **UAT sign-off** by Miriam | 40% | 792,000 | 95,040 | **887,040** |
| **Retention** | **90 days after UAT sign-off** (covers go-live & stabilization) | 30% | 594,000 | 71,280 | **665,280** |
| **Total** | | 100% | **1,980,000** | **237,600** | **2,217,600** |

The final 30% falls due 90 days after UAT sign-off — paid only after go-live and the hypercare/stabilization window, so the College is assured the system performs in production before the last tranche is released.

### 13.3 Year-2 onward (recurring — proposed, to confirm)
| Item | Proposed (₱, VAT-excl.) | Note |
|---|---|---|
| Annual subscription (licence + hosting + 8×5 support + statutory updates) | **780,000 / yr** | ~₱158 PEPM — below PH mid-market (₱150–300) |
| 3-year lock option (Years 2–4) | **~₱2,106,000** (≈ ₱702,000/yr, ~10% discount) | TOR asks for 1-yr & 3-yr options |

### 13.4 Optional add-ons (not in the base price)
- **24×7 premium support** (payroll cutoff / critical windows): **≈ ₱180,000 / yr**
- **Additional school-years of data migration** beyond the first: per-year quote
- **On-premises / hybrid hosting** instead of cloud: infrastructure cost per the College's environment
- **Additional biometric units** beyond the surveyed devices: at cost + install

### 13.5 Assumptions & dependencies
College provides: **SAP interface specifications**, source-data extracts in the agreed format, biometric-device network access, and campus network/VPN access. Pricing assumes **cloud hosting** and a **~6-month delivery**. Delays caused by pending inputs may shift milestone dates but not the fixed price.

> **Competitive check.** The Year-1 all-in ₱1.98M equals a blended **~₱200 per-employee-per-month** — mid-market rate (PH 2026: SME ₱79–149, mid-market ₱150–300, enterprise ₱300+) while delivering **enterprise scope** (AI, SAP, faculty ranking, biometrics, hosting, hardware). Akrivia's 2026 worked example for a 200-employee/3-region company is ₱1.3M–2.19M over **three years** for software alone; our offer bundles build, hardware, SAP, hosting, and support into one competitive Year-1 fee.

**Sources (2026 pricing research):**
[Akrivia HCM](https://akriviahcm.com/blog/hr-payroll-software-pricing-philippines) ·
[Sprout — 3-Year TCO](https://sprout.ph/articles/hris-total-cost-of-ownership-3-year-guide-philippines/) ·
[Go-Tropa — 2026 buyer's guide](https://go-tropa.com/blog/tropa-1/best-hris-software-in-the-philippines-the-2026-buyer-s-guide-11) ·
[KAMI Workforce](https://kamiworkforce.com/ph/blog/what-is-hris-philippines/) ·
[Omni HR — cost FAQ](https://www.omnihr.co/faqs/how-much-does-an-hris-system-cost-in-the-philippines) ·
[hr.software — Sprout review](https://www.hr.software/reviews/sprout-solutions) ·
[PC Express — ZKTeco prices](https://pcx.com.ph/collections/all-products/zkteco)

## 14. Technical Compliance Matrix
Per TOR §3, a completed matrix — every requirement rated **Fully / Partially / Not Compliant**, with **Standard / Configurable / Custom / Third-Party** type, description, in-system evidence, and dependency — is provided in **`TOR-COMPLIANCE-MATRIX.md`**. All items are **Fully Compliant**. The matrix also contains the project implementation plan, indicative schedule, team structure, support model, and indicative pricing research.

## 15. Why Miriam College Should Choose This Proposal
1. **Proven, working system** — evaluate the real product today, not a promise.
2. **100% Fully Compliant** — every TOR requirement met, with evidence and solution type.
3. **AI with human control** — explainable, advisory, never auto-executing — matching the College's governance stance.
4. **One fixed, competitive price** — ₱1,980,000 all-in for Year 1 (+VAT), with milestone-protected payments.
5. **Configurable for the future** — the College owns its rules, forms, and workflows without depending on us for every change.

---
*AVA Data Solutions Inc. · Response to the Miriam College HRIS Terms of Reference. Commercial terms in §13 are firm; Year-2 renewal (§13.3) and a few College-specific technical inputs are to be confirmed before contract signing.*
