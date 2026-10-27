# Miriam College HRIS — Bid Proposal (Draft)

**Prepared for:** Miriam College — ICT Office & HR Division
**Re:** Human Resources and Information System (HRIS) — response to Terms of Reference
**Status:** Draft outline for completion. Commercial figures are placeholders `[ ]` to be finalized.

> This document covers the **proposal-stage** requirements of the TOR (architecture, security, integration, migration, implementation, training & support, pricing). The **functional and AI capabilities** are demonstrated in the working prototype; see `TOR-COMPLIANCE.md` for the requirement-by-requirement matrix.

---

## 1. Executive Summary
We propose an integrated, secure HRIS covering the full employee lifecycle — Recruitment, Onboarding, 201 Records, Timekeeping, Payroll, Benefits, Performance & Faculty Ranking, and Offboarding — unified by a single employee master so data flows between modules **without duplicate encoding**. The platform provides role-based self-service for HR, management, supervisors, employees, and applicants across the Quezon City, Nuvali, and Alviera campuses, with **AI-assisted insights that are advisory and human-approved by design**.

## 2. Solution Overview
- **Modules:** Recruitment/ATS, Onboarding, Employee 201, Timekeeping & Attendance, Payroll & Compensation, Benefits, Performance/Faculty Ranking, L&D, Offboarding/Clearance, Reports & Analytics, Settings/RBAC, AI Governance.
- **Experience:** 5 role-scoped portals + a public careers site; multi-campus; responsive web + roadmap native mobile.
- **Proof:** a clickable prototype demonstrates each module and the end-to-end integration story.

## 3. Technical Architecture & Hosting
The College may choose any of three deployment models; we recommend **cloud-based** for fastest value and lowest operational burden.

| Option | Summary | Notes |
|---|---|---|
| **Cloud (recommended)** | Managed hosting in a Philippine/regional data center | Elastic scaling; 99.9% availability target; managed backup & DR |
| **On-premises** | Deployed on College servers | Min. spec: `[app/web, DB, OS, storage, network]` to be detailed |
| **Hybrid** | Sensitive data on-prem, app tier in cloud | For specific data-residency needs |

- **Stack:** web application + relational database + secure APIs; horizontally scalable app tier.
- **Data location / region:** `[PH region / provider]`. **Third-party processors:** `[list]`. **Major dependencies:** `[email/SMS, biometric SDK, AI provider]`.
- **Scalability:** supports current and projected workforce and additional campuses.

## 4. Security, Privacy & Recovery
- **Access:** MFA for privileged roles; **role-based authorization (RBAC)**, least-privilege.
- **Encryption:** TLS 1.2+ in transit; AES-256 at rest.
- **Audit:** immutable logging of material system and data actions.
- **Backup & recovery:** daily backups; **RPO `[≤15 min]`, RTO `[≤4 hrs]`**; DR site/region.
- **Sensitive documents:** medical and other uploads access-restricted and encrypted.
- **Compliance:** aligned to the **Data Privacy Act of 2012** and NPC guidelines; defined **security-incident & breach-notification** procedures.

## 5. Integration Approach
- **Among modules:** one employee master; Recruitment → Onboarding → 201 → Timekeeping → Payroll → Benefits share data (no re-encoding).
- **Accounting SAP:** payroll **journal entries** posted via secure API, balanced and validated before posting.
- **Biometric devices:** M10 Fingerprint & Facial, plus web/mobile/GPS capture.
- **APIs:** documented REST APIs; documented **data mapping, interface specs, validation, error handling, reconciliation, monitoring**; secure system-to-system authentication.

## 6. AI Governance & Responsible Use
- Each AI capability identified as **native / integrated / third-party / roadmap** (see matrix).
- **Human oversight retained** for all employment, compensation, ranking, promotion, benefits, and separation decisions — **AI never auto-executes**.
- **Explainability:** every AI score/flag shows its basis (competency breakdowns, weighted factors, flagged records).
- **Data handling:** disclosure of whether prompts/documents/outputs are retained or used to train models — our stance: `[not used to train external models]`.
- Known limitations, validation practices, auditability, and human-review mechanisms documented.

## 7. Data Migration Approach
Planning → data mapping → **cleansing** → test migration → validation → **reconciliation** → production cutover. Agreed employee information and historical records migrated with integrity; sign-off gates at each stage.

## 8. Implementation Plan & Schedule
| Phase | Activities | Indicative duration |
|---|---|---|
| 1. Initiation & fit-gap | Validate requirements vs TOR; project charter | `[ ]` |
| 2. Configuration | Org, roles, workflows, pay rules, benefits | `[ ]` |
| 3. Integration & migration | SAP, biometrics, APIs; test migration | `[ ]` |
| 4. Testing | Functional, security, integration, **UAT** | `[ ]` |
| 5. Training | Admin & all user groups | `[ ]` |
| 6. Go-live & hypercare | Cutover, **rollback plan**, stabilization | `[ ]` |
- **Team structure:** PM, solution architect, module consultants, integration & data engineers, trainer, support lead.
- **Deliverables:** configuration docs, test results, training materials, runbooks, knowledge transfer.

## 9. Training & Support
- **Training:** role-based for HR, payroll, benefits, recruitment, performance, faculty ranking, L&D, ICT, finance, supervisors, and employees; user/admin/technical guides and materials.
- **Support channels:** phone, chat, email, onsite, remote.
- **Availability:** minimum **8×5**, with **24/7 where appropriate**.
- **SLAs by severity:** `[P1 response/resolution; P2; P3; P4]`.
- **Options:** **1-year** and **3-year** support packages — scope and pricing in §10.
- Release, patch, upgrade, and maintenance notifications.

## 10. Commercial Summary *(competitive indicative offer — market-researched, to finalize in contract)*

**Scope basis:** ~412 employees · 3 campuses (Quezon City, Nuvali, Alviera) · all modules + AI + Faculty Ranking + Employee Self-Service + installable mobile (PWA) + SAP journal-entry interface + M10/facial biometrics.

**Our competitive positioning.** Philippine HRIS subscriptions run **₱79–149 PEPM (SME)**, **₱150–300 PEPM (mid-market)**, and **₱300+ / ~$4–8 PEPM (enterprise)** (2026 market research — sources below). We offer Miriam a **blended ₱200 per-employee-per-month**, at the mid-market rate while delivering **enterprise scope** (AI, faculty ranking, SAP integration, multi-campus) — training bundled and statutory-table maintenance included.

### Year-1 (indicative)
| Item | Amount (₱) | Basis |
|---|---|---|
| Subscription — all modules + AI (412 × ₱200 × 12) | **990,000** | Mid-market PEPM; enterprise scope |
| Implementation (config, UAT, go-live, hypercare) | **450,000** | PH impl range ₱20k–200k (SME) scaled for enterprise/multi-campus |
| Integration & migration (SAP interface, biometrics, 1 school-year data) | **550,000** | Sprout 500-emp model (impl ₱500k + migration ₱500k + compliance ₱250k), scaled |
| Training (role-based, all user groups) | **Bundled** | Included to stay competitive |
| Support & maintenance (8×5, Year 1) | **Included** | 24×7 premium optional (below) |
| **Year-1 total (indicative)** | **≈ 1,990,000** | |

### 3-Year Total Cost of Ownership (indicative)
| Item | Amount (₱) | Note |
|---|---|---|
| Subscription (3 yrs, ~12% multi-year lock discount) | **≈ 2,610,000** | ~₱870k/yr locked vs ₱990k Year-1 rate |
| One-time implementation + integration & migration | **1,000,000** | Year-1 only |
| **3-Year TCO (indicative)** | **≈ 3,610,000** | Excludes optional hardware / 24×7 |

> **Benchmark check.** Akrivia's 2026 worked example for a **200-employee, 3-region** company gives a 3-year TCO of **₱1.3M (standard)** to **₱2.19M (modular add-ons)**. Scaled to Miriam's **412 employees + AI + SAP + faculty ranking**, our **₱3.61M** 3-year offer is competitive for the enterprise scope and avoids the per-module and recurring-compliance surcharges that inflate modular bids.

- **Assumptions / dependencies:** College provides biometric-device network access, **SAP interface specifications**, source-data extracts in agreed format, and campus network/VPN access; prices assume cloud hosting (PH/regional region).
- **Optional add-ons (not in base):**
  - **Biometric devices** if purchased new (~8 fingerprint + 4 facial): **₱95,000–280,000** one-time (PH prices: ZKTeco fingerprint ₱4,350–8,250 each; facial ~₱15k–40k each).
  - **24×7 premium support** (payroll cutoff, go-live critical windows): **≈ ₱180,000 / yr**.
  - **Additional school-years of data migration** beyond the first: per-year quote.
  - **On-premises / hybrid hosting** instead of cloud: infrastructure cost per the College's environment.

> ⚠️ **These are competitive, market-based indicative figures for budgeting**, derived from 2026 Philippine HRIS pricing research — **not a final quotation**. Final line items are confirmed in the signed contract. We recommend the College also request itemized quotes from 2–3 vendors to compare.

**Sources (2026 pricing research):**
[Akrivia HCM — HR/Payroll pricing PH](https://akriviahcm.com/blog/hr-payroll-software-pricing-philippines) ·
[Sprout — HRIS 3-Year TCO guide](https://sprout.ph/articles/hris-total-cost-of-ownership-3-year-guide-philippines/) ·
[Go-Tropa — Best HRIS PH 2026 buyer's guide](https://go-tropa.com/blog/tropa-1/best-hris-software-in-the-philippines-the-2026-buyer-s-guide-11) ·
[KAMI Workforce — HRIS in the Philippines](https://kamiworkforce.com/ph/blog/what-is-hris-philippines/) ·
[Omni HR — HRIS cost FAQ](https://www.omnihr.co/faqs/how-much-does-an-hris-system-cost-in-the-philippines) ·
[hr.software — Sprout Solutions review](https://www.hr.software/reviews/sprout-solutions) ·
[PC Express — ZKTeco device prices](https://pcx.com.ph/collections/all-products/zkteco)

## 11. Technical Compliance Matrix
Per the TOR, a completed matrix (Fully / Partially / Not Compliant; Standard / Configurable / Custom / Third-Party) is provided — see **`TOR-COMPLIANCE.md`**, to be finalized into the official submission format.

---
*Draft for internal completion before submission. Replace all `[ ]` placeholders with final figures and specifics.*
