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

## 10. Commercial Offer *(firm — subject to signed contract)*

**Scope basis:** ~412 employees · 3 campuses (Quezon City, Nuvali, Alviera) · all modules + AI + Faculty Ranking + Employee Self-Service + installable mobile (PWA) + SAP journal-entry interface + M10/facial biometrics.

### 10.1 Year-1 all-in contract price

| | Amount (₱) |
|---|---|
| **Year-1 all-in contract price** (VAT-exclusive) | **1,980,000.00** |
| Add: 12% VAT | 237,600.00 |
| **Total contract price (VAT-inclusive)** | **2,217,600.00** |

**Everything in the Year-1 price — one fixed fee, no hidden add-ons:**
- Full system **build, configuration & customization** of all TOR modules (Recruitment/ATS, 201 File, Timekeeping, Payroll, Benefits, Performance & Faculty Ranking, Offboarding) with AI capabilities and multi-campus setup
- **SAP journal-entry integration** (payroll → Accounting SAP interface)
- **Biometric hardware** (M10 fingerprint + facial units) and device integration
- **Data migration** (1 school-year of legacy records — mapping, cleansing, validation, reconciliation)
- **Cloud hosting** for Year 1 (PH/regional region, backup & DR)
- **Role-based training** for all user groups + admin/technical guides
- **Go-live, hypercare & post-go-live support** (8×5) through Year 1
- Statutory-table maintenance (BIR/SSS/PhilHealth/Pag-IBIG) for Year 1

### 10.2 Payment schedule (30 / 40 / 30)

| Milestone | Trigger | % | Net (₱) | +12% VAT (₱) | Invoice total (₱) |
|---|---|---|---|---|---|
| **Down payment** | Contract signing / project kickoff | 30% | 594,000 | 71,280 | **665,280** |
| **Delivery** | **UAT sign-off** by Miriam | 40% | 792,000 | 95,040 | **887,040** |
| **Retention** | **90 days after UAT sign-off** (covers go-live & stabilization) | 30% | 594,000 | 71,280 | **665,280** |
| **Total** | | 100% | **1,980,000** | **237,600** | **2,217,600** |

The final 30% falls due 90 days after UAT sign-off, so it is paid only after go-live and the hypercare/stabilization window — giving the College assurance the system performs in production before the last tranche is released.

### 10.3 Year-2 onward (recurring — proposed, to confirm)

After Year 1, an annual **software licence + cloud hosting + support & maintenance** subscription keeps the system live, patched, and statutory-compliant:

| Item | Proposed (₱, VAT-excl.) | Note |
|---|---|---|
| Annual subscription (licence + hosting + 8×5 support + statutory updates) | **780,000 / yr** | ~₱158 PEPM — below PH mid-market (₱150–300) |
| 3-year lock option (Years 2–4) | **~₱2,106,000** (≈ ₱702,000/yr, ~10% discount) | TOR asks for 1-yr & 3-yr options |

### 10.4 Optional add-ons (not in the base price)
- **24×7 premium support** (payroll cutoff / critical windows): **≈ ₱180,000 / yr**
- **Additional school-years of data migration** beyond the first: per-year quote
- **On-premises / hybrid hosting** instead of cloud: infrastructure cost per the College's environment
- **Additional biometric units** beyond the surveyed devices: at cost + install

### 10.5 Assumptions & dependencies
College provides: **SAP interface specifications**, source-data extracts in the agreed format, biometric-device network access, and campus network/VPN access. Pricing assumes **cloud hosting** and a **~6-month delivery** (see §7–8). Delays caused by pending inputs (e.g., SAP specs, data readiness) may shift milestone dates but not the fixed price.

> **Competitive check.** The Year-1 all-in ₱1.98M equals a blended **~₱200 per-employee-per-month** — mid-market rate (PH 2026: SME ₱79–149, mid-market ₱150–300, enterprise ₱300+) while delivering **enterprise scope** (AI, SAP, faculty ranking, biometrics, hosting, hardware). Akrivia's 2026 worked example for a 200-employee/3-region company is ₱1.3M–2.19M over **three years** for software alone; our offer bundles build, hardware, SAP, hosting, and support into one competitive Year-1 fee.

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
*Commercials in §10 reflect the agreed Year-1 all-in deal (₱1,980,000 + 12% VAT; 30/40/30 tied to signing / UAT sign-off / 90 days after). SLA severities in §9 and Year-2 renewal in §10.3 remain to be confirmed before official submission.*
