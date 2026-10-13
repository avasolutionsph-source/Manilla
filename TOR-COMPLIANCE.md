# Miriam College HRIS — TOR Compliance Check

A self-assessment of the **prototype** against the HRIS Terms of Reference. The TOR asks bidders to indicate, per requirement, **Fully / Partially / Not Compliant** and the solution type. This maps each TOR area to what the demo shows and where to see it.

**Status legend**
- ✅ **Demonstrated** — interactive in the prototype (open it and click through)
- 🟡 **Shown (conceptual)** — represented in the UI; full logic needs the backend
- 📄 **Proposal-stage** — an implementation/commercial deliverable (plan, pricing, hosting), not a prototype feature

> Where to see it: **Portal** = `hris.html` → sign in as the stated role.

---

## 1. Recruitment & Applications (+ AI Talent Acquisition)
| TOR requirement | Status | Where |
|---|---|---|
| Personnel requisition + approval workflow + tracking | ✅ | HR Admin → Recruitment → New requisition |
| Job vacancy posting (internal + external channels) | ✅ | Recruitment → Post a job (channels) |
| ATS with centralized candidate database | ✅ | Recruitment → Candidate Pipeline (kanban) |
| Resume collection, screening, profiling | ✅ | Candidate drawer + AI screening |
| Shortlisting, interview schedule, evaluation, assessment | ✅ | Candidate → Interview / Advance stage |
| Pipeline monitoring & status | ✅ | Kanban (drag between stages) |
| Job offer generation & approval workflow | ✅ | Candidate → Offer (routes for approval) |
| Integration with onboarding & 201 | ✅ | Applicant accepts offer → Onboarding auto-creates 201 |
| Recruitment analytics (time-to-fill, source of hire, conversion) | ✅ | Recruitment → Analytics |
| Automated notifications | ✅ | Notifications bell + toasts |
| Mobile-accessible | 🟡 | Responsive UI; native app in Settings → Integrations |
| **AI**: resume screening/parsing, matching & ranking | ✅ | ✨ on candidate → weighted competency breakdown (**explains the %**) |
| **AI**: talent-pool recommendations | ✅ | Recruitment → Talent Pool |
| **AI**: predictive hiring insights | 🟡 | Analytics |
| **AI**: AI-assisted job description generation | ✅ | Post a job → Generate with AI |
| **AI**: recruitment chatbot / virtual assistant | ✅ | Applicant → Careers Assistant (✨) |

## 2. Employee Records (201 File)
| TOR requirement | Status | Where |
|---|---|---|
| Onboarding → profile creation (no manual encoding) | ✅ | HR Admin → Onboarding (auto-provision) |
| Personal, Employment, Service Record, Family, Education, Gov/Licensure, Work History, **Achievement/Award**, **Professional Organization**, Training/Seminars | ✅ | Employee 201 File → 12 tabs |
| Medical history with upload | ✅ | 201 → Medical (encrypted) |
| Audit trail of transactions | ✅ | 201 → Audit Trail |
| End-of-contract triggers & others | ✅ | 201 → Employment (renewal) + Dashboard alerts |

## 3. Timekeeping & Attendance (+ AI)
| TOR requirement | Status | Where |
|---|---|---|
| Onboarding → attendance account; sync from master | ✅ | Onboarding checklist (auto) |
| Work-schedule types (regular/flexible/shifting/hybrid/compressed) | 🟡 | Timekeeping (schedule shown) |
| Payroll integration for inputs | ✅ | Approved leaves flow to Payroll |
| Biometric (M10 Fingerprint & Facial), web, mobile, GPS | ✅ | Login → Time-in Kiosk + Timekeeping log (methods) |
| Real-time monitoring & dashboards | ✅ | Timekeeping → live log + status donut |
| Application filing: Leave, OB, Overtime, Offsetting | ✅ | Timekeeping → File application |
| Auto computation (tardiness, OT, holiday, night diff, etc.) | 🟡 | Payroll simulation steps |
| Employee & supervisor self-service | ✅ | Employee + Supervisor portals |
| Configurable rules/policies | 🟡 | Settings → Workflows |
| Audit trail of attendance actions | ✅ | Settings → Security (audit log) |
| **AI**: anomaly detection & alerts (explainable) | ✅ | Timekeeping → AI anomaly → **Why** |
| **AI**: habitual tardiness/absenteeism | ✅ | Same (pattern detail) |
| **AI**: predictive absenteeism / OT / staffing | 🟡 | Command Center |

## 4. Payroll & Compensation (+ AI)
| TOR requirement | Status | Where |
|---|---|---|
| Salary & compensation structure | ✅ | Payroll → register |
| Tax (BIR) & loan deductions (SSS, Pag-IBIG, etc.) | ✅ | Payslip breakdown |
| Auto payroll record on onboarding | ✅ | Onboarding |
| Allowances/incentives/bonuses/deductions/loans | ✅ | Payslip |
| Multiple payroll groups & schedules | ✅ | Run payroll (group/cutoff) |
| Simulation, validation, reconciliation, audit | ✅ | Run payroll (step-by-step) |
| Payslips & statutory reports | ✅ | Payslip + statutory buttons; ESS → Payslips |
| Issuance of 2316 | ✅ | Payroll + Employee → BIR 2316 |
| **Journal Entries → Accounting SAP** | ✅ | Payroll → Post to SAP (**balanced check + validation**) |
| Performance/Faculty-Ranking-driven increases | ✅ | Faculty Ranking → Promote (rank-based auto-stage) |
| Workforce cost planning & Budget vs Actual | ✅ | Management → Budget & Planning (what-if) + Reports |
| **AI**: payroll anomaly/error detection (explainable) | ✅ | Payroll → AI validation → **Why** |
| **AI**: forecasting / budget overrun | ✅ | Budget Simulator (over-budget warning) |
| **AI**: pay equity / benchmarking | 🟡 | Reports (pay equity) |

## 5. Benefits Administration (+ AI)
| TOR requirement | Status | Where |
|---|---|---|
| Centralized benefits & eligibility; auto-enrollment on hire | ✅ | Benefits + Onboarding |
| Mandatory & company-sponsored (HMO, SSS, PhilHealth, Pag-IBIG, life, retirement, educational, wellness) | ✅ | Benefits → programs |
| Contribution computation; utilization & balances | ✅ | Benefits + Employee → My Benefits |
| Beneficiaries & dependents | ✅ | Employee → My Benefits (dependents) |
| Claims submission/approval/monitoring | ✅ | Benefits → claims; Employee → file a claim |
| Payroll integration (deductions) | ✅ | Benefits (auto-deduct note) |
| Notifications (enrollment/renewal/expiry/eligibility) | ✅ | Benefits reminders |
| Reporting & analytics | ✅ | Reports → Benefits |
| **AI**: reminders & gaps (explainable) | ✅ | Benefits → AI reminder → **Who** (breakdown by unit) |

## 6. Performance Management (PMS) (+ Faculty Ranking, L&D, AI)
| TOR requirement | Status | Where |
|---|---|---|
| Goal/KPI alignment; online evaluation & approval | ✅ | Performance → Evaluations (open one) |
| Individual Development Plans | ✅ | Evaluation → IDP; Employee → My Performance |
| Dashboards & analytics | ✅ | Performance tabs |
| **Faculty ranking & promotion computation (explainable)** | ✅ | Performance → Faculty Ranking → **click Points** (breakdown) |
| Tracks qualifications/research/teaching/service | ✅ | Ranking table + breakdown |
| L&D: TNA, nomination, learning records, ROI, pathways | ✅ | Performance → Learning & Dev; Employee → Learning |
| Payroll & Employee-Records integration | ✅ | Promote → auto-stage; shared 201 |
| **AI**: HR assistant, competency gaps, training recs, readiness | ✅ | ✨ Assistant; Performance → AI Insights |
| **AI**: predictive turnover/retirement/succession/manpower | ✅ | Management → Command Center (**explainable**) |

## 7. Offboarding, Clearance & Separation (+ AI)
| TOR requirement | Status | Where |
|---|---|---|
| Online resignation/separation filing | ✅ | Offboarding → Initiate separation |
| Automated clearance initiation & real-time tracking | ✅ | Offboarding → clearance routing board |
| Routing to all offices (HR, Finance, IT, Library, Security, etc.) | ✅ | Clearance board (9 offices) |
| Exit interview management | ✅ | Offboarding → Exit interview (+ AI themes) |
| Final pay processing monitoring | ✅ | Offboarding → Compute final pay |
| Automated separation documents | ✅ | Offboarding → Generate documents; AI Documents |
| Automated triggers (clearance, asset, benefits, archiving) | ✅ | Initiate separation (trigger list) |
| **AI**: turnover/attrition/exit analysis/retention (explainable) | ✅ | Offboarding → Attrition → **Themes** breakdown |

## 8–11. UI · Workflow · Analytics · Configurability
| TOR requirement | Status | Where |
|---|---|---|
| Consistent, intuitive, multi-campus UI for all user types | ✅ | 5 role portals + campus switcher (QC/Nuvali/Alviera) |
| Automated review/approval, ESS, notifications, audit trails | ✅ | Approvals inbox; ESS; notifications; audit log |
| Configurable workflows | ✅ | Settings → Workflows |
| HRIS mobile application | 🟡 | Responsive; listed in Settings → Integrations |
| Dashboards, scheduled extractions, standard + custom reports, export | ✅ | Reports (CSV export works; scheduled extracts) |
| Add/modify users & roles; configure forms/fields/routes | ✅/🟡 | Settings → Roles (RBAC matrix); workflow config |

## 12. Security, Privacy & Recovery
| TOR requirement | Status | Where |
|---|---|---|
| MFA; role-based authorization | ✅ | Login (MFA note); Settings → Roles (RBAC matrix) |
| Encryption in transit & at rest | ✅ | Settings → Security |
| Backup & recovery; audit logging | ✅ | Settings → Security |
| Secure handling of uploaded (incl. medical) docs | ✅ | 201 → Medical (encrypted) |
| PH Data Privacy Act compliance; breach procedures | ✅ | Settings → Security |
| Hosting/data-location/third-party disclosure | 📄 | Proposal document |

## 13–14. Deployment & Integration
| TOR requirement | Status | Where |
|---|---|---|
| Integration among all modules (no duplicate encoding) | ✅ | Recruitment→Onboarding→201→Timekeeping→Payroll→Benefits |
| Integration with Accounting **SAP** (journal entries) | ✅ | Payroll → Post to SAP |
| Integration with biometric devices | ✅ | Kiosk; Settings → Integrations (M10) |
| API / secure system-to-system integration | ✅ | Settings → Integrations |
| Cloud / on-prem / hybrid hosting options | 📄 | Proposal document |

## 15–17. Implementation · Training · AI Governance
| TOR requirement | Status | Where |
|---|---|---|
| Data migration, implementation plan, UAT, go-live, hypercare | 📄 | Proposal document |
| Training & support, 8×5 / 24×7, 1-yr & 3-yr options | 📄 | Proposal document |
| **AI Governance**: native/integrated identification, human oversight, no auto-execution, auditability | ✅ | Settings → AI Governance (register); 🛡 "advisory · human-approved" on **every** AI output |

---

## Summary

- **Functional modules:** essentially **all TOR modules are demonstrated** interactively in the prototype, end-to-end, with the **integration ("no re-encoding") story** running through them.
- **Differentiators delivered:** every AI/computed figure is **explainable** (resume %, faculty points, payroll flags, attrition, benefits gaps), framed as **advisory with human approval** — directly satisfying the TOR's **AI Governance** requirements.
- **Remaining items are proposal-stage (📄)** by nature — hosting architecture, data-migration plan, training/support model, and commercial pricing — which belong in the written bid and the required **technical compliance matrix**, not the prototype.
- A few **🟡 conceptual** items (native mobile app, full configurable form-builder, some predictive analytics) are represented in the UI and would be completed in build.

**Verdict:** the prototype covers the TOR's functional and AI-governance requirements comprehensively; what's left is the written proposal (implementation, hosting, support, pricing) and backend build.
