# Miriam College — HRIS + Website Prototype

A front-end prototype built for the **Miriam College Human Resources and Information System (HRIS)** procurement (per the College's Terms of Reference), plus a sample **official website** landing page. No backend — self-contained HTML/CSS/vanilla JS with mock data, runnable offline.

## Run it
Open `index.html`, or serve the folder:
```bash
python -m http.server 8000
# then open http://localhost:8000
```
- `index.html` — **official Miriam College website** (landing page)
- `hris.html` — **HRIS portal** (opens on the login page); linked from the site's "MC Portal" buttons

## What's inside
- **Official website** — hero, about, vision/mission, core values, academics, campuses, news, careers, contact (real MC branding & content).
- **HRIS portal** with **5 role-scoped logins** — each sees only what it should:
  - **HR Administrator** — full back-office (Recruitment/ATS, 201 Files, Onboarding, Timekeeping, Payroll + SAP, Benefits, Compliance, Performance & Faculty Ranking, Offboarding, Approvals, AI Documents, Reports, Settings/RBAC/AI-Governance)
  - **Management / Executive** — Command Center, Org Chart, Budget Simulator, Analytics
  - **Supervisor** — Manager Portal (team only)
  - **Employee** — Self-service (own records)
  - **Applicant** — Careers portal (apply, track, accept offer → onboarding)
- **Game-changer features** — Executive Command Center, interactive Org Chart, Budget/Cost Simulator, Digital Onboarding, Biometric Time-in Kiosk, PH Compliance Center, AI Document Generator.
- **AI assistant** per role, framed as advisory/human-approved (TOR AI governance).

## Docs
| File | Purpose |
|------|---------|
| `TOR-HRIS.md` | The Terms of Reference (Markdown) |
| `ADDITIONAL-FEATURES.md` | Game-changer feature proposal + roadmap |
| `DEMO-GUIDE.md` | Demo click-path & talking points |
| `old-site/` | Archive of the current mc.edu.ph site (reference) |

## Tech
Buildless: custom CSS design system (Miriam navy + gold), vanilla JS SPA router, inline-SVG charts. Works on desktop, tablet, and phone. **Prototype only — mock data, no real records.**

> Content and branding © Miriam College. This is a vendor prototype for requirements validation.
