# Miriam College HRIS — Demo Guide (TOR meeting)

**Open:** http://localhost:8000 (server running) — or double-click `index.html`. No install, no internet needed. Works on **desktop, tablet, and phone** (slide-in menu on small screens).

> Front-end prototype, no backend. Two headlines: **(1) role-based access** — each login sees a different, scoped experience; **(2) game-changer features** that go beyond a generic HRIS and target *Miriam* + the people in the room (management).

---

## The 5 portals (switch roles on the login screen)

1. **HR Administrator** — full back-office: Dashboard, **Org Chart**, Recruitment/ATS (drag-drop pipeline, AI resume screening, AI JD generator), **Onboarding**, Employee 201 Files, Timekeeping, Payroll (run sim, payslips, **post to SAP**, 2316), Benefits, **Compliance Center**, Performance & Faculty Ranking, Offboarding, Approvals, **AI Documents**, Reports, Settings (RBAC, Security, Integrations, AI Governance).
2. **Management / Executive** *(for the directors & VPs in the room)* — **Command Center** (strategic KPIs, attrition forecast, succession, campus comparison, AI watchlist), **Org Chart**, **Budget & Planning** simulator, Analytics.
3. **Supervisor** — Manager Portal: own team only (roster, attendance, approvals, evaluations, requisitions). Sensitive fields restricted.
4. **Employee** — Self-service (as Roberto Dizon): own records only — home, 201 (gov IDs masked), attendance/leave, payslips, benefits, performance, learning.
5. **Applicant** — Careers Portal (as Diane Castro): browse jobs, apply, **application tracker**, accept offer (→ triggers onboarding), profile.

Plus **Biometric Time-in Kiosk** — launch from the login screen (M10 / Facial / RFID scan simulator, live clock). And a role-scoped **✨ AI assistant** (floating button).

---

## Game-changer features (the differentiators)
- **Executive Command Center** — the screen that sells the system to management. Predictive attrition, succession, campus comparison, cost. *TOR: "executive dashboards + strategic HR insights."*
- **Interactive Org Chart** — live multi-campus tree with vacancies highlighted.
- **Digital Onboarding** — Applicant accepts offer → onboarding checklist with **auto-provisioning** (201, attendance, payroll, benefits). *Proof of "no manual re-encoding."*
- **Budget & Cost Simulator** — live what-if sliders vs the approved budget (over-budget warnings).
- **Biometric Kiosk** — makes M10/Facial integration tangible.
- **PH Compliance Center** — BIR, SSS, PhilHealth, Pag-IBIG, DOLE, CHED + deadlines. *PH-specific, not generic.*
- **AI Document Generator** — COE, Compensation cert, Offer letter, Contract, Memo, Service cert — drafted from 201 data, human-reviewed.

Full write-up + roadmap: `ADDITIONAL-FEATURES.md`.

---

## 2-minute demo flow (recommended)
1. **Management** login → **Command Center** → *"this is the strategic view for leadership."* Open **Budget & Planning**, drag the merit slider.
2. Sign out → **Applicant** → apply + **accept the offer**.
3. Sign out → **HR Administrator** → **Onboarding** (Diane appears, auto-provisioned) → *"zero re-encoding."* Then **AI Documents** → generate a COE in 2 seconds. Then **Settings → AI Governance** → *"AI is advisory; a person always approves."*
4. Sign out → **Employee** → *"the same system, but Roberto only sees himself."*
5. Login screen → **Kiosk** → simulate a biometric time-in.

That loop tells the whole TOR story: integration, RBAC, self-service, PH compliance, AI-with-oversight, multi-campus.

---

## Talking points (straight from the TOR)
- **No duplicate encoding** — one employee master flows Recruitment → Onboarding → 201 → Timekeeping → Payroll → Benefits.
- **RBAC + least privilege** — proven by 5 scoped logins; matrix in Settings → Roles.
- **AI advisory, human-approved** — 🛡 flag on every AI output; AI Governance register.
- **Security** — MFA, encryption, audit trail, Data Privacy Act.
- **Integrations** — M10 biometrics, **SAP** journal entries, mobile, APIs.
- **PH-specific** — BIR/SSS/PhilHealth/Pag-IBIG/DOLE/CHED compliance.
- **Multi-campus** — QC / Nuvali / Alviera.

---

## Files
| File | Purpose |
|------|---------|
| `index.html` | Entry point |
| `TOR-HRIS.md` · `ADDITIONAL-FEATURES.md` | TOR + feature proposal |
| `assets/js/app.js` | Login, shell, roles & routing, kiosk, AI |
| `assets/js/modules.js` | HR Administrator screens |
| `assets/js/portals.js` | Employee / Supervisor / Applicant portals |
| `assets/js/features.js` | Command Center, Org Chart, Budget Sim, Onboarding, Compliance, AI Documents |
| `assets/js/data.js` · `ui.js` | Mock data · icons/charts/modals |
| `assets/css/styles.css` | Design system (navy + gold), responsive |

*Say in the demo: prototype for requirements validation; no backend, no real data yet.*
