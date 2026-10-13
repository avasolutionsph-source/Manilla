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

## 10. Commercial Summary *(placeholders — to finalize)*
| Item | 1-year | 3-year |
|---|---|---|
| Licenses / subscription | `[ ]` | `[ ]` |
| Implementation (one-time) | `[ ]` | `[ ]` |
| Integration & migration | `[ ]` | `[ ]` |
| Training | `[ ]` | `[ ]` |
| Support & maintenance | `[ ]` | `[ ]` |
- **Assumptions / dependencies:** `[biometric device access, SAP interface specs, data readiness, network]`.
- **Optional modules / add-ons:** `[ ]`.

## 11. Technical Compliance Matrix
Per the TOR, a completed matrix (Fully / Partially / Not Compliant; Standard / Configurable / Custom / Third-Party) is provided — see **`TOR-COMPLIANCE.md`**, to be finalized into the official submission format.

---
*Draft for internal completion before submission. Replace all `[ ]` placeholders with final figures and specifics.*
