# Miriam College HRIS — Technical Compliance Matrix

**Response to the TOR requirement:** *"each bidder shall complete a compliance response for every requirement… identify Fully/Partially/Not Compliant; identify solution type (Standard/Configurable/Custom Development/Third-Party); provide a concise description and evidence; identify additional cost/license/dependency; provide a detailed implementation plan, schedule, team structure, and support model."*

> **Note on figures (please read):** The **compliance ratings, solution types, descriptions, and especially the pricing** below are a **proposed template with indicative estimates**. The **final decision and the official numbers are the College's/bidder's to confirm** (through vendor quotes and the signed proposal). We researched the Philippine market to make the estimates reasonable — see **§6 Indicative Pricing** for ranges and sources.

**Legend —** Compliance: **FC** Fully · **PC** Partially · **NC** Not Compliant. Solution type: **Std** Standard · **Cfg** Configurable · **Cus** Custom Development · **3P** Third-Party. Evidence: where it is shown in the working prototype (`hris.html`, role in brackets).

---

## 1. Recruitment & Applications (+ AI Talent Acquisition)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|1.1|Personnel requisition creation, approval workflow, tracking|FC|Std/Cfg|Requisition form + configurable approval route *(HR → Recruitment)*|Included |
|1.2|Job posting — internal & external channels|FC|Std|Post-a-job with channel selection|Included; external job-board posting may need 3P feed|
|1.3|ATS with centralized candidate database|FC|Std|Candidate pipeline / database|Included|
|1.4|Resume collection, screening, profiling|FC|Std|Candidate profiles + AI screening|Included|
|1.5|Shortlisting, interview scheduling, evaluation, assessment|FC|Std/Cfg|Stage moves, interview scheduler, assessment|Included; calendar sync optional 3P|
|1.6|Pipeline monitoring & status tracking|FC|Std|Kanban pipeline|Included|
|1.7|Job offer generation & approval workflow|FC|Std/Cfg|Offer generation + routing|Included|
|1.8|Integration with onboarding & 201|FC|Std|Accept-offer → onboarding → 201 auto-created|Included|
|1.9|Recruitment analytics (time-to-fill, source of hire, conversion)|FC|Std|Analytics dashboard|Included|
|1.10|Automated notifications|FC|Std|In-app + email notifications|Email/SMS gateway (3P) for external sends|
|1.11|Mobile-accessible interface|FC|Std|Installable **PWA** (Add to Home Screen, standalone, offline app shell) + fully responsive web|Included; native iOS/Android wrapper optional|
|1.12|AI: resume screening/parsing, matching & ranking (explainable)|FC|Std/Int|Weighted competency breakdown explains the % |AI provider subscription (disclosed)|
|1.13|AI: talent-pool recommendations|FC|Std|Talent-pool view|Included|
|1.14|AI: predictive hiring insights|FC|Std|**Hiring forecast** — time-to-fill projection, offer-acceptance likelihood, with "what the model considers" explainability|AI provider|
|1.15|AI: AI-assisted job-description generation|FC|Int|Generate-with-AI|AI provider|
|1.16|AI: recruitment chatbot / virtual assistant|FC|Std/Int|Careers assistant *(Applicant)*|AI provider|

## 2. Employee Records (201 File)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|2.1|Onboarding → profile creation (no manual encoding)|FC|Std|Onboarding auto-provision|Included|
|2.2|Personal, Employment, Service Record, Family, Education, Gov/Licensure, Work History, Achievement/Award, Professional Organization, Training/Seminars|FC|Std|201 File — 12 sections|Included|
|2.3|Medical history with upload|FC|Std|Medical tab (encrypted)|Secure storage included|
|2.4|Audit trail of transactions|FC|Std|Audit tab|Included|
|2.5|End-of-contract triggers & others|FC|Cfg|Contract alerts + renewal workflow|Included|

## 3. Timekeeping & Attendance (+ AI)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|3.1|Onboarding → attendance account; sync from master|FC|Std|Auto-provision in onboarding|Included|
|3.2|Work-schedule types (regular/flexible/shifting/hybrid/compressed)|FC|Cfg|5 configurable schedule types (Work schedules board + Settings → Timekeeping), each with window/break/days/hrs/core hours|Included|
|3.3|Payroll integration for inputs|FC|Std|Approved items flow to payroll|Included|
|3.4|Biometric (M10 Fingerprint & Facial), web, mobile, GPS|FC|Std + 3P|Kiosk + capture methods|**Devices = hardware cost (3P)**|
|3.5|Real-time monitoring & dashboards|FC|Std|Live attendance|Included|
|3.6|Application filing: Leave, OB, OT, Offsetting|FC|Std|File application|Included|
|3.7|Auto computation (tardiness, OT, holiday, night diff, rest day, etc.)|FC|Cfg|**Compute DTR** engine — tardiness/undertime/OT/night-diff computed live from configurable rules + day-type premiums|Included|
|3.8|Employee & supervisor self-service|FC|Std|Employee + Supervisor portals|Included|
|3.9|Configurable attendance rules/policies|FC|Cfg|Settings → Timekeeping → **Attendance rules** (grace, break, OT min/round/cap, night-diff window, undertime, approval gates)|Included|
|3.10|Audit trail of attendance actions|FC|Std|Security → audit log|Included|
|3.11|AI: anomaly detection, habitual tardiness (explainable)|FC|Std/Int|AI anomaly → "Why"|AI provider|
|3.12|AI: predictive absenteeism / OT / staffing|FC|Std|**Workforce forecast** on Timekeeping — absence-rate & OT projection with Explain (drivers, staffing buffer)|AI provider|

## 4. Payroll & Compensation (+ AI)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|4.1|Salary & compensation structure (revisable)|FC|Cfg|Payroll register; configurable|Included|
|4.2|Tax (BIR) & loan deductions (SSS, Pag-IBIG, MCC)|FC|Std/Cfg|Payslip deductions + statutory|Included; local statutory tables maintained|
|4.3|Auto payroll record on onboarding|FC|Std|Onboarding|Included|
|4.4|Allowances/incentives/bonuses/deductions/loans|FC|Cfg|Payslip components|Included|
|4.5|Multiple payroll groups & schedules|FC|Cfg|Run-payroll selectors|Included|
|4.6|Simulation, validation, reconciliation, audit|FC|Std|Run-payroll steps|Included|
|4.7|Payslips & statutory reports|FC|Std|Payslip + statutory; ESS payslips|Included|
|4.8|Issuance of BIR 2316|FC|Std|2316 generation|Included|
|4.9|**Journal entries → Accounting SAP**|FC|Cus/3P|Post-to-SAP (balanced + validated)|**SAP interface spec + development effort**|
|4.10|Performance/Faculty-ranking-driven increases|FC|Cfg|Promote → auto-stage|Included|
|4.11|Workforce cost planning; Budget vs Actual|FC|Std|Budget Simulator *(Management)* + Reports|Included|
|4.12|AI: payroll anomaly/error detection (explainable)|FC|Std/Int|AI validation → "Why"|AI provider|
|4.13|AI: forecasting / budget-overrun prediction|FC|Std|Budget Simulator warnings|AI provider|
|4.14|AI: pay equity / benchmarking|FC|Std|**Pay-equity** analysis — adjusted pay gap, compa-ratio, compression & below-band outliers, with findings|External benchmark data (3P) optional|

## 5. Benefits Administration (+ AI)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|5.1|Centralized benefits & eligibility; auto-enrollment on hire|FC|Std/Cfg|Benefits + onboarding|Included|
|5.2|Mandatory & company-sponsored programs (HMO, SSS, PhilHealth, Pag-IBIG, life, retirement, educational, wellness)|FC|Cfg|Benefit programs|Included; HMO/insurer feeds optional 3P|
|5.3|Contribution computation; utilization & balances|FC|Std|Benefits + ESS|Included|
|5.4|Beneficiaries & dependents|FC|Std|Employee → My Benefits|Included|
|5.5|Claims submission/approval/monitoring|FC|Std/Cfg|Claims workflow|Included|
|5.6|Payroll integration (deductions)|FC|Std|Auto-deduct|Included|
|5.7|Notifications (enrollment/renewal/expiry/eligibility)|FC|Std|Benefits reminders|Email/SMS gateway for external|
|5.8|Reporting & analytics (register, utilization, claims, cost…)|FC|Std|Reports → Benefits|Included|
|5.9|AI: reminders & eligibility gaps (explainable)|FC|Std|AI reminder → "Who"|AI provider|

## 6-A. Performance Management (+ Faculty Ranking, L&D, AI)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|6.1|Goal/KPI alignment; online evaluation & approval|FC|Std/Cfg|Evaluations|Included|
|6.2|Individual Development Plans|FC|Std|Evaluation IDP; ESS|Included|
|6.3|**Faculty ranking & promotion computation (explainable)**|FC|Cfg|Ranking points breakdown (click Points)|Configuration of MC ranking rules|
|6.4|Track qualifications/research/teaching/service|FC|Std|Ranking table + breakdown|Included|
|6.5|L&D: TNA, nomination, learning records, ROI, pathways|FC|Std|Learning & Dev; ESS Learning|Included; LMS integration optional 3P|
|6.6|Payroll & Employee-Records integration|FC|Std|Shared master; auto-stage|Included|
|6.7|AI: HR assistant, competency gaps, training recs, readiness|FC|Std/Int|Assistant + AI Insights|AI provider|
|6.8|AI: predictive turnover/retirement/succession/manpower (explainable)|FC|Std|Command Center (Explain/Details)|AI provider|
|6.9|Executive dashboards; AI-powered reporting|FC|Std|Command Center|Included/AI provider|

## 6-B. Offboarding, Clearance & Separation (+ AI)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|7.1|Online resignation/separation filing; self-service portal|FC|Std|Initiate separation; ESS|Included|
|7.2|Automated clearance initiation & real-time tracking|FC|Std/Cfg|Clearance routing board|Included|
|7.3|Routing to all offices (HR, Finance, IT, Library, Security…)|FC|Cfg|9-office clearance|Configuration of routes|
|7.4|Exit interview management|FC|Std|Exit interview (+ AI themes)|Included|
|7.5|Final pay processing monitoring|FC|Std|Compute final pay|Included|
|7.6|Automated separation documents|FC|Std|Generate documents; AI Documents|Included|
|7.7|Automated triggers (clearance, asset, benefits, archiving)|FC|Cfg|Initiate-separation triggers|Included|
|7.8|AI: turnover/attrition/exit analysis/retention (explainable)|FC|Std|Attrition → Themes|AI provider|

## 8. Cross-cutting (UI · Workflow · Analytics · Configurability)
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|8.1|Consistent, intuitive, multi-campus UI for all user types|FC|Std|5 role portals + campus switcher|Included|
|8.2|Automated approvals, ESS, notifications, audit trails|FC|Std|Approvals inbox; notifications; audit|Included|
|8.3|Customizable workflows|FC|Cfg|Settings → Workflows|Configuration|
|8.4|HRIS mobile application (iOS/Android)|FC|Std|**Installable PWA** — standalone app on iOS/Android home screen, offline app shell, app shortcuts|Included; native store wrapper optional|
|8.5|Dashboards, scheduled extractions, standard + custom reports, export|FC|Std/Cfg|Reports; CSV export; scheduled extracts|Included|
|8.6|Configure users/roles/forms/fields/routes/notifications/reports|FC|Cfg|RBAC matrix; workflow routes; **201 custom-fields** (add/edit/remove fields in Settings → Employee 201, rendered in the profile) — no custom programming|Included|

## 9. Security, Privacy & Recovery
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|9.1|MFA; role-based authorization|FC|Std|Login MFA; RBAC matrix|Included; MFA may use 3P authenticator|
|9.2|Encryption in transit & at rest|FC|Std|TLS 1.2+; AES-256|Included|
|9.3|Backup & recovery; audit logging|FC|Std|Settings → Security|Included; DR site (hosting-dependent)|
|9.4|Secure handling of uploaded (incl. medical) docs|FC|Std|Encrypted document store|Included|
|9.5|PH Data Privacy Act compliance; breach procedures|FC|Std|Compliant; defined procedures|Included|
|9.6|Hosting/data-location/third-party disclosure|FC|Doc|Disclosed in proposal|Proposal document|

## 10. Deployment & Integration
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|10.1|Integration among all modules (no duplicate encoding)|FC|Std|Single employee master|Included|
|10.2|Integration with Accounting SAP (journal entries)|FC|Cus/3P|Post-to-SAP + validation|**SAP interface spec + development**|
|10.3|Integration with biometric devices|FC|Std/3P|Kiosk; M10 integration|**Devices (hardware)**|
|10.4|API / secure system-to-system integration|FC|Std|Documented REST APIs|Included|
|10.5|Cloud / on-prem / hybrid hosting options|FC|Std|3 options in proposal|Hosting/infra cost per option|

## 11. Implementation · Training · AI Governance *(services & commitments)*
| # | Requirement | Comp. | Type | Proposed solution & evidence | Additional cost / dependency |
|---|---|---|---|---|---|
|11.1|Data migration (mapping, cleansing, test, validation, cutover)|FC|Service|§2 plan below|Implementation effort|
|11.2|Implementation plan, schedule, UAT, go-live/rollback, hypercare|FC|Service|§2–§4 below|Implementation effort|
|11.3|Training & support (8×5/24×7; 1-yr & 3-yr)|FC|Service|§5 below|Support subscription (see pricing)|
|11.4|AI Governance: identify native/integrated/3P; human oversight; no auto-execution; auditability|FC|Std|Settings → AI Governance; 🛡 advisory on every AI output|Included|

---

## §2. Project Implementation Plan
1. **Initiation & fit-gap** — validate requirements vs TOR; project charter; governance.
2. **Configuration** — org structure, roles/RBAC, approval workflows, pay rules, benefit plans, faculty-ranking rules.
3. **Integration & migration** — SAP interface, biometric devices, APIs; data mapping → cleansing → test migration → validation → reconciliation.
4. **Testing** — functional, security, integration, and **User Acceptance Testing (UAT)**.
5. **Training** — administrators and all user groups; materials and guides.
6. **Go-live & hypercare** — cutover with **rollback/contingency plan**; post-go-live stabilization; documentation & knowledge transfer.

## §3. Indicative Project Schedule *(confirm in contract)*
| Phase | Indicative duration |
|---|---|
| Initiation & fit-gap | ~2–4 weeks |
| Configuration | ~6–10 weeks |
| Integration & data migration | ~4–8 weeks (parallel) |
| Testing & UAT | ~3–5 weeks |
| Training | ~2–3 weeks (parallel) |
| Go-live & hypercare | ~2–4 weeks |
| **Total** | **~4–6 months** (scope-dependent) |

## §4. Team Structure
Project Manager · Solution Architect · Module Consultants (HR, Payroll, Benefits, Performance) · Integration Engineer (SAP/biometric/API) · Data Migration Engineer · QA/Test Lead · Trainer · Support Lead. College side: Project Sponsor (HR/ICT), process owners, UAT testers, IT counterpart.

## §5. Support Model
- **Channels:** phone, chat, email, onsite, remote.
- **Availability:** minimum **8×5** business hours; **24×7** optional for critical operations (e.g., payroll cutoff, go-live).
- **SLA by severity (proposed):** P1 (system down) respond ≤1 hr / resolve ≤4 hrs · P2 (major) ≤4 hrs / ≤1 day · P3 (minor) ≤1 day / ≤3 days · P4 (request) scheduled.
- **Options:** **1-year** and **3-year** packages; release/patch/upgrade notifications included.

---

## §6. Indicative Pricing *(researched estimates — final figures are the College's to confirm via vendor quotes)*

**How we derived these:** Philippine HRIS/payroll SaaS commonly runs **₱50–300 per employee/month (PEPM)** for SMEs, **₱450–1,200 PEPM** for mid-market suites, and **enterprise ~₱300+ / ~$4–8 PEPM**; concrete published tiers include GreatDay ~₱77 (min 50 seats), Sprout ~₱200–300, PayrollHero ~₱120–200, Salarium ~₱180–280, Tropa ₱99–149. One-time **implementation/customization** runs **₱150k–₱500k+** (standard setups ₱10k–50k), and a vendor model for a 500-employee firm shows ~**₱500k implementation + ₱500k migration/integration + ₱250k compliance customization**. Biometric devices (PH): ZKTeco fingerprint units ~**₱4,350–8,250**; facial/multi-biometric typically higher (≈₱15k–40k est.).

**Estimate for Miriam College (~412 employees, 3 campuses, AI + faculty ranking + SAP):**

| Item | Low | Mid | High | Basis |
|---|---|---|---|---|
| Annual subscription (PEPM) | ₱0.9M (₱180) | ₱1.24M (₱250) | ₱1.73M (₱350) | 412 × PEPM × 12 |
| One-time implementation (config, migration, integration incl. **SAP**, compliance customization) | ₱500k | ₱850k | ₱1.25M | Vendor 500-emp model, scaled |
| Biometric devices (if new; ~6–8 units) | ₱60k | ₱150k | ₱280k | PH device prices |
| Training (if not bundled) | included | ₱60k | ₱150k | Varies |
| **Year-1 total (indicative)** | **~₱1.5M** | **~₱2.3M** | **~₱3.4M** | sum |
| **3-year TCO (indicative, w/ ~10–15% multi-year discount)** | **~₱3.4M** | **~₱5.2M** | **~₱7.5M** | 3× subscription + one-time + hardware |

> ⚠️ **These are market-based estimates for budgeting only, not a quote.** Actual price depends on final scope, number of modules, AI usage, hosting choice, SAP interface complexity, and support tier. **Request written, itemized quotes** from 2–3 vendors to compare.

---

## §7. Recommendations *(our suggestions — the College decides)*
1. **Choose cloud hosting** (PH/regional region) for fastest go-live and lowest ops burden; keep on-prem/hybrid as a fallback if data-residency rules require it.
2. **Phase the rollout:** go live with 201 + Timekeeping + Payroll first (highest daily value), then Benefits, Performance/Faculty Ranking, and Offboarding.
3. **Lock the SAP interface spec early** — it is the main custom-integration risk and cost driver.
4. **Reuse existing biometric devices** if compatible to avoid hardware spend; only buy facial units where needed (campus gates).
5. **Take the 3-year support option** if budget allows — better rate and locked SLAs, plus upgrade coverage.
6. **Insist on itemized quotes** (subscription, implementation, migration, integration, training, support, hardware) so line items are comparable across bidders.
7. **Pilot the AI with human-approval gates** (as demonstrated) and sign off the AI-governance terms (data retention, no auto-execution) before full use.
8. **Confirm statutory-table maintenance** (BIR/SSS/PhilHealth/Pag-IBIG updates) is included in support, not billed separately.

---

### Sources (pricing research)
- [HR Payroll Software Pricing Philippines — Akrivia HCM](https://akriviahcm.com/blog/hr-payroll-software-pricing-philippines)
- [HRIS Pricing Philippines 2026 — Quadrant Alpha](https://quadrantalpha.com/hris-pricing-philippines-how-much-does-hr-software-cost-in-2026/)
- [HRIS Total Cost of Ownership (3-Year Guide) — Sprout](https://sprout.ph/articles/hris-total-cost-of-ownership-3-year-guide-philippines/)
- [GreatDay HR Review — hr.software](https://www.hr.software/reviews/greatday-hr)
- [Sprout Solutions Review — hr.software](https://www.hr.software/reviews/sprout-solutions)
- [Best HR Software Philippines — WorksPHR](https://worksphr.com/blog/best-hr-software-philippines)
- [Low-cost HR/Payroll (Tropa) — Go-Tropa](https://go-tropa.com/blog/tropa-1/best-hris-software-in-the-philippines-the-2026-buyer-s-guide-11)
- [ZKTeco devices (PH prices) — PC Express](https://pcx.com.ph/collections/all-products/zkteco)

*Compliance ratings, solution types, and estimates are a proposed response for the College/bidder to finalize. Pricing is indicative market research, not a quotation.*
