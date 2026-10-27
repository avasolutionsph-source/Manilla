/* ============================================================
   Miriam College HRIS — Configuration store
   ------------------------------------------------------------
   Every configurable policy/option lives here as a DEFAULT, and
   the Settings UI can override any key. Overrides persist to the
   Supabase `app_settings` table and are merged over the defaults
   at boot. MC.config.get(key) returns the effective value; it is
   the single source of truth the feature code reads from.
   Offline-safe: with no backend, the shipped defaults are used.
   ============================================================ */
window.MC = window.MC || {};

MC.CONFIG_DEFAULTS = {
  /* ---- Organization ---- */
  'org.info': { name: 'Miriam College', tagline: 'Veritas in Caritate', hrEmail: 'hr@mc.edu.ph', phone: '(02) 8580 5400', website: 'mc.edu.ph', headcount: 412 },
  'org.campuses': ['Quezon City', 'Nuvali', 'Alviera'],
  'org.departments': [
    'College of Arts & Sciences', 'Basic Education Unit', 'Grade School', 'High School',
    'Information & Communications Technology Office', 'Human Resources Division', 'Finance & Accounting',
    'Registrar', 'Library Services', 'Guidance & Counseling', 'Property & Supply', 'Security Office',
    'Research & Publications', 'Campus Ministry', 'Student Affairs',
  ],

  /* ---- Feature flags (show/hide modules) ---- */
  'features': {
    dashboard: true, org_chart: true, recruitment: true, onboarding: true, employees: true,
    timekeeping: true, payroll: true, benefits: true, compliance: true, performance: true,
    offboarding: true, approvals: true, documents: true, reports: true, settings: true,
    command: true, budget: true, kiosk: true, ai_assistant: true,
  },

  /* ---- Recruitment ---- */
  'recruitment.stages': ['Applied', 'Screening', 'Interview', 'Assessment', 'Offer'],
  'recruitment.sources': ['MC Careers Site', 'Referral', 'LinkedIn', 'JobStreet', 'Walk-in'],
  'recruitment.jobTypes': ['Full-time Faculty', 'Full-time Staff', 'Contractual', 'Part-time'],
  'recruitment.channels': ['Internal + External', 'Internal only', 'External only'],

  /* ---- Leave / applications ---- */
  'leave.types': [
    { name: 'Vacation Leave', code: 'VL', paid: true, maxDays: 15 },
    { name: 'Sick Leave', code: 'SL', paid: true, maxDays: 15 },
    { name: 'Official Business', code: 'OB', paid: true, maxDays: 0 },
    { name: 'Overtime', code: 'OT', paid: true, maxDays: 0, convertible: false },
    { name: 'Work Hours Offset', code: 'WO', paid: true, maxDays: 0, convertible: false },
    { name: 'Maternity Leave', code: 'ML', paid: true, maxDays: 105, convertible: false },
    { name: 'Paternity Leave', code: 'PL', paid: true, maxDays: 7, convertible: false },
    { name: 'Solo Parent Leave', code: 'SPL', paid: true, maxDays: 7, convertible: false },
    { name: 'Bereavement Leave', code: 'BL', paid: true, maxDays: 3, convertible: false },
  ],
  'leave.defaultApprover': 'Immediate Supervisor',
  // Convertible leave -> cash (Miriam leave credits are convertible)
  'leave.conversion': {
    enabled: true,
    convertibleTypes: ['Vacation Leave', 'Sick Leave'],
    maxConvertibleDays: 10,           // max days convertible per year
    rateBasis: 'daily rate',          // cash value = unused days x daily rate
    minBalanceToKeep: 5,              // must retain this balance
    paidInCash: true,
    cutoff: 'December payroll',
  },

  /* ---- Payroll ---- */
  'payroll.statutory': {
    sssEmployeeRate: 4.5, sssEmployerRate: 9.5, philhealthRate: 5.0,
    pagibigEmployee: 200, pagibigRate: 2.0, taxRegime: 'TRAIN Law (2023)',
    nightDiffRate: 10, otRegularRate: 125, otRestDayRate: 130, holidayRate: 200,
  },
  'payroll.groups': ['Monthly-Paid Regular', 'Daily-Paid', 'Permanent Faculty', 'Part-Time Faculty (per load)', 'Project-Based', 'Consultant', 'Contractual'],
  'payroll.cutoffs': ['1st Cutoff (1–15)', '2nd Cutoff (16–EOM)'],
  'payroll.thirteenthMonth': { enabled: true, releaseMonth: 'December' },
  // Faculty load-based computation (Higher Education encodes units)
  'payroll.facultyLoad': {
    ratePerUnitHigherEd: 1250,        // ₱ per teaching unit, per month, HE
    unitsPerFullLoad: 24,             // full load reference
    partTimeUnitConversion: 1.0,      // multiplier applied to part-time units
    overloadRatePerUnit: 1400,        // units beyond full load
    permanentBasis: 'monthly',        // permanent faculty are monthly-paid
    semestersPerYear: 2,
  },

  /* ---- Benefits ---- */
  'benefits.programs': [
    { name: 'HMO — Maxicare Platinum', type: 'Health', employer: '₱18,500 / yr' },
    { name: 'Group Life Insurance', type: 'Insurance', employer: '₱6,200 / yr' },
    { name: 'Educational Benefit (Dependents)', type: 'Educational', employer: 'Up to 100% tuition' },
    { name: 'Retirement Plan', type: 'Retirement', employer: 'Defined benefit' },
    { name: 'Wellness & EAP Program', type: 'Wellness', employer: '₱3,000 / yr' },
  ],
  'benefits.claimTypes': ['Outpatient', 'Dental', 'Reimbursement', 'Dependent tuition'],

  /* ---- Performance ---- */
  'performance.ratingScale': [
    { min: 4.5, label: 'Outstanding' },
    { min: 3.5, label: 'Very Satisfactory' },
    { min: 2.5, label: 'Satisfactory' },
    { min: 1.5, label: 'Fair' },
    { min: 0, label: 'Needs Improvement' },
  ],
  'performance.competencies': [
    'Job knowledge & competence', 'Quality & timeliness of work', 'Collaboration & communication',
    'Initiative & innovation', 'Mission & values alignment',
  ],
  'performance.cycles': ['H1', 'H2', 'AY (Annual)', 'Probationary'],
  'performance.facultyRankPoints': { education: 30, research: 25, teaching: 25, service: 20 },

  /* ---- Timekeeping ---- */
  'timekeeping.captureModes': ['M10 Fingerprint', 'Facial Biometric', 'Web Portal', 'Mobile (GPS)', 'RFID / ID Card'],
  'timekeeping.graceMinutes': 15,
  'timekeeping.workStart': '08:00',
  'timekeeping.workEnd': '17:00',
  // Work-schedule types (regular/flexible/shifting/hybrid/compressed) — configurable per TOR
  'timekeeping.scheduleTypes': [
    { name: 'Regular', code: 'REG', start: '08:00', end: '17:00', breakMins: 60, daysPerWeek: 5, hoursPerDay: 8, coreHours: '08:00–17:00', note: 'Fixed daily schedule, Mon–Fri' },
    { name: 'Flexible', code: 'FLEX', start: '07:00', end: '19:00', breakMins: 60, daysPerWeek: 5, hoursPerDay: 8, coreHours: '10:00–15:00', note: 'Flexible in/out within a window; core hours required' },
    { name: 'Shifting', code: 'SHIFT', start: 'varies', end: 'varies', breakMins: 60, daysPerWeek: 5, hoursPerDay: 8, coreHours: 'per roster', note: 'Rotating AM/PM/Night shifts via roster' },
    { name: 'Hybrid', code: 'HYB', start: '08:00', end: '17:00', breakMins: 60, daysPerWeek: 5, hoursPerDay: 8, coreHours: '08:00–17:00', note: '3 days on-site, 2 days remote (configurable)' },
    { name: 'Compressed', code: 'CWW', start: '07:00', end: '18:00', breakMins: 60, daysPerWeek: 4, hoursPerDay: 10, coreHours: '07:00–18:00', note: '4-day week, 10 hrs/day (compressed work week)' },
  ],
  // Configurable attendance rules / labor standards (drive auto-computation)
  'timekeeping.rules': {
    graceMinutes: 15,              // late only counts after this grace period
    halfDayThresholdHrs: 4,        // worked hours below this = half day
    minOtMinutes: 60,              // OT credited only beyond this, after shift end
    otRoundingMinutes: 30,         // OT rounded down to this increment
    breakMinutes: 60,              // unpaid meal break deducted from worked hours
    nightDiffStart: '22:00',       // night differential window start
    nightDiffEnd: '06:00',         // night differential window end
    undertimeCounts: true,         // deduct undertime from pay
    maxOtHoursPerDay: 4,           // cap on claimable OT per day
    requireApprovalForOt: true,    // OT must be pre-approved to be paid
    autoDeductAbsentNoFiling: true,// absence w/o filing auto-deducts
  },
  // 12 biometric devices across 3 campuses (per site survey)
  'timekeeping.devices': [
    { id: 'QC-M10-001', campus: 'Quezon City', location: 'Gate 01', type: 'M10 Fingerprint', status: 'Connected' },
    { id: 'QC-M10-002', campus: 'Quezon City', location: 'Gate 02', type: 'M10 Fingerprint', status: 'Connected' },
    { id: 'QC-FR-003', campus: 'Quezon City', location: 'Main Lobby', type: 'Facial Biometric', status: 'Connected' },
    { id: 'QC-FR-004', campus: 'Quezon City', location: 'Admin Bldg', type: 'Facial Biometric', status: 'Connected' },
    { id: 'QC-M10-005', campus: 'Quezon City', location: 'Grade School', type: 'M10 Fingerprint', status: 'Connected' },
    { id: 'NU-M10-001', campus: 'Nuvali', location: 'Gate 01', type: 'M10 Fingerprint', status: 'Connected' },
    { id: 'NU-FR-002', campus: 'Nuvali', location: 'Main Lobby', type: 'Facial Biometric', status: 'Connected' },
    { id: 'NU-M10-003', campus: 'Nuvali', location: 'Faculty Rm', type: 'M10 Fingerprint', status: 'Connected' },
    { id: 'AL-M10-001', campus: 'Alviera', location: 'Gate 01', type: 'M10 Fingerprint', status: 'Connected' },
    { id: 'AL-FR-002', campus: 'Alviera', location: 'Main Lobby', type: 'Facial Biometric', status: 'Connected' },
    { id: 'AL-M10-003', campus: 'Alviera', location: 'Admin', type: 'M10 Fingerprint', status: 'Connected' },
    { id: 'QC-RF-006', campus: 'Quezon City', location: 'Library', type: 'RFID / ID Card', status: 'Connected' },
  ],
  // Biometric SDK/integration settings
  'timekeeping.biometricSdk': {
    vendor: 'To be confirmed (per device survey)',
    connection: 'Web-based capture today; direct SDK/API integration targeted',
    syncMode: 'Real-time push / scheduled pull',
    model: 'M10 Fingerprint + Facial',
  },

  /* ---- Compliance ---- */
  'compliance.reports': [
    { agency: 'SSS', form: 'R-3 Contribution', freq: 'Monthly', due: 'Last day of month' },
    { agency: 'PhilHealth', form: 'RF-1 Remittance', freq: 'Monthly', due: 'Last day of month' },
    { agency: 'Pag-IBIG', form: 'MCRF Remittance', freq: 'Monthly', due: 'Last day of month' },
    { agency: 'BIR', form: 'Form 1601-C', freq: 'Monthly', due: '10th of following month' },
    { agency: 'BIR', form: 'Form 2316 (Annual)', freq: 'Annual', due: 'Jan 31' },
    { agency: 'DOLE', form: '13th Month Report', freq: 'Annual', due: 'Jan 15' },
  ],

  /* ---- Roles & access (RBAC) : 0=none, 1=full, 2=view ---- */
  'rbac.roles': ['HR Administrator', 'Payroll Officer', 'Supervisor', 'Faculty', 'Employee', 'Applicant'],
  'rbac.modules': ['Employee 201', 'Timekeeping', 'Payroll', 'Benefits', 'Performance', 'Recruitment', 'Reports', 'Settings'],
  'rbac.matrix': {
    'HR Administrator': [1, 1, 1, 1, 1, 1, 1, 1],
    'Payroll Officer': [0, 1, 1, 1, 0, 0, 1, 0],
    'Supervisor': [2, 2, 0, 0, 1, 1, 2, 0],
    'Faculty': [2, 2, 0, 2, 2, 0, 0, 0],
    'Employee': [2, 2, 0, 2, 0, 0, 0, 0],
    'Applicant': [0, 0, 0, 0, 0, 1, 0, 0],
  },
  'rbac.mfaRequiredRoles': ['HR Administrator', 'Payroll Officer'],

  /* ---- AI governance ---- */
  'ai.governance': { humanApprovalRequired: true, trainExternalModels: false, dataRetentionDays: 365 },
  'ai.capabilities': [
    { name: 'Resume screening & ranking', module: 'Recruitment', type: 'Native', oversight: 'Advisory — committee decides', enabled: true },
    { name: 'Attendance anomaly detection', module: 'Timekeeping', type: 'Native', oversight: 'Advisory — supervisor reviews', enabled: true },
    { name: 'Payroll validation', module: 'Payroll', type: 'Native', oversight: 'Advisory — officer confirms', enabled: true },
    { name: 'Attrition & succession prediction', module: 'Performance', type: 'Native', oversight: 'Advisory — leadership reviews', enabled: true },
    { name: 'HR Assistant (chat)', module: 'Global', type: 'Integrated', oversight: 'Read-only insights', enabled: true },
    { name: 'Exit interview analysis', module: 'Offboarding', type: 'Native', oversight: 'Advisory', enabled: true },
  ],

  /* ---- Approval workflows ---- */
  'workflows.approvals': [
    { name: 'Leave / OB / OT', steps: ['Employee', 'Supervisor', 'HR'] },
    { name: 'Personnel Requisition', steps: ['Dept. Head', 'HR', 'Finance', 'VP Admin'] },
    { name: 'Job Offer', steps: ['Dept. Head', 'HR', 'VP Admin'] },
    { name: 'Promotion', steps: ['Dean', 'Ranking Committee', 'VP Acad'] },
    { name: 'Payroll', steps: ['Payroll Officer', 'Finance Director', 'VP Admin'] },
    { name: 'Clearance', steps: ['Auto-route to 9 offices in parallel'] },
  ],

  /* ---- Integrations ---- */
  'integrations': [
    { name: 'M10 Biometric Devices', detail: 'Fingerprint & facial capture · 12 devices · 3 campuses', status: 'Connected' },
    { name: 'Microsoft 365', detail: 'Entra ID SSO · Outlook/Teams notifications · Excel export', status: 'Connected' },
    { name: 'Accounting SAP System', detail: 'Payroll journal entries · secure API', status: 'Connected' },
    { name: 'HRIS Mobile App', detail: 'iOS & Android · self-service & GPS attendance', status: 'Live' },
    { name: 'Email / SMTP', detail: 'Automated notifications', status: 'Connected' },
    { name: 'Employee Master Sync', detail: 'Onboarding → 201 → Timekeeping → Payroll', status: 'Active' },
    { name: 'AI Services', detail: 'Resume screening, anomaly detection, assistant', status: 'Enabled' },
  ],

  /* ---- Separations ---- */
  'offboarding.types': ['Resignation', 'End of Contract', 'Retirement', 'Termination'],
  'offboarding.clearanceOffices': [
    'Immediate Supervisor', 'Human Resources', 'IT Office', 'Library Services',
    'Property & Supply', 'Finance & Accounting', 'Security Office', 'Research Office', 'Campus Ministry',
  ],

  /* ---- Employment ---- */
  'employment.types': ['Regular', 'Probationary', 'Contractual', 'Permanent Faculty', 'Part-Time Faculty', 'Project-Based', 'Consultant', 'Part-time'],
  'employment.salaryGrades': ['SG-11', 'SG-12', 'SG-13', 'SG-14', 'SG-15', 'SG-16', 'SG-18', 'SG-24'],
  'employment.probationaryMonths': 6,

  /* ---- Recruitment (advanced) ---- */
  'recruitment.funnelStages': ['Applied', 'Screened', 'Interview', 'Offer', 'Hired'],
  'recruitment.interviewTypes': ['Panel (on-site)', 'Virtual (video)', 'Teaching demo'],
  'recruitment.requisitionJustifications': ['Replacement', 'New / Additional', 'Backfill'],
  'recruitment.offerEmploymentTypes': ['Probationary', 'Regular', 'Contractual'],
  'recruitment.facultyRoleKeywords': 'Professor|Instructor|Teacher|Faculty|Dean|Lecturer',
  'recruitment.matchScoreBands': [
    { min: 85, label: 'Strong', tone: 'green' }, { min: 70, label: 'Good', tone: 'blue' },
    { min: 55, label: 'Fair', tone: 'amber' }, { min: 0, label: 'Low', tone: 'gray' },
  ],
  'recruitment.recommendationBands': [
    { min: 90, label: 'Fast-track' }, { min: 80, label: 'Recommend interview' },
    { min: 68, label: 'Shortlist' }, { min: 0, label: 'Keep in talent pool' },
  ],

  /* ---- HR / workforce ---- */
  'hr.workforceCategories': ['Faculty', 'Staff', 'Admin', 'Contractual'],
  'hr.statutoryIdTypes': ['TIN', 'SSS', 'Pag-IBIG (HDMF)', 'PhilHealth', 'PRC License', 'Civil Service', 'LET / Board', "Driver's License"],
  'hr.dependentRelationships': ['Spouse', 'Child', 'Parent', 'Sibling'],
  'hr.contractAlertWindowDays': 45,
  'hr.employeeStatuses': ['Active', 'On Leave', 'Suspended', 'Separated'],
  // Configurable 201-File custom fields — add/modify/remove without custom programming (TOR §Customization)
  'records.customFields': [
    { label: 'PRC License No.', type: 'text', section: 'Government / Licensure', required: false },
    { label: 'PRC Expiry', type: 'date', section: 'Government / Licensure', required: false },
    { label: 'Highest Degree Attained', type: 'select', options: ['Bachelor', 'Master', 'Doctorate', 'Post-Doctorate'], section: 'Educational Background', required: false },
    { label: 'Emergency Contact Name', type: 'text', section: 'Personal Information', required: true },
    { label: 'Emergency Contact No.', type: 'text', section: 'Personal Information', required: true },
    { label: 'Blood Type', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], section: 'Medical History', required: false },
  ],
  'records.fieldTypes': ['text', 'number', 'date', 'select', 'checkbox'],
  'records.sections': ['Personal Information', 'Employment Information', 'Service Record', 'Family Background', 'Educational Background', 'Government / Licensure', 'Work History', 'Medical History', 'Training / Seminars'],

  /* ---- Payroll (advanced) ---- */
  'payroll.deductionTypes': ['Withholding Tax', 'SSS', 'PhilHealth', 'Pag-IBIG', 'Loans'],
  'payroll.otAnomalyThresholdPct': 18,
  'payroll.jeNumberFormat': 'JE-{YYYY}-{MM}-{SEQ}',

  /* ---- Performance ranking ---- */
  'performance.promotionThreshold': 75,
  'performance.facultyRankLadder': [
    'Instructor I', 'Instructor II', 'Assistant Professor I', 'Assistant Professor II',
    'Associate Professor I', 'Associate Professor II', 'Associate Professor III', 'Professor I', 'Professor II',
  ],
  'performance.attritionBenchmark': 6.5,
  'performance.meritIncreaseRules': [
    { rating: 'Outstanding', increasePct: 8 }, { rating: 'Very Satisfactory', increasePct: 5 }, { rating: 'Satisfactory', increasePct: 2 },
  ],

  /* ---- Timekeeping (advanced) ---- */
  'timekeeping.attendanceStatuses': ['Present', 'Late', 'On Leave', 'On Official Business', 'Absent'],
  'timekeeping.defaultOvertimeHours': 8,

  /* ---- Documents ---- */
  'documents.types': ['Certificate of Employment', 'Certificate of Compensation', 'Employment Contract', 'Offer Letter', 'Memorandum', 'Notice to Explain'],
  'documents.tones': ['Formal', 'Standard', 'Warm'],
  'documents.signatory': { name: 'Noel C. Racho', title: 'Director, Human Resources Division' },
  'documents.refFormat': 'HR-{YYYY}-{SEQ}',

  /* ---- Onboarding ---- */
  'onboarding.checklist': [
    { task: 'Create 201 File', auto: true }, { task: 'Provision email & accounts', auto: true },
    { task: 'Enroll in attendance/biometrics', auto: false }, { task: 'Payroll & statutory registration', auto: true },
    { task: 'Issue equipment & ID', auto: false }, { task: 'Orientation & policy sign-off', auto: false },
  ],

  /* ---- Reports ---- */
  'reports.catalog': ['Headcount & Demographics', 'Payroll Register', 'Attendance Summary', 'Leave Ledger', 'Turnover & Retention', 'Statutory Remittances', 'Compliance Status', 'Faculty Ranking'],

  /* ---- Budget / planning simulator ---- */
  'budget.assumptions': { basePersonnelCost: 236300000, approvedAnnual: 251000000, avgHireCost: 720000, promoIncrement: 78000, allowanceShareOfBase: 0.12 },
  'budget.utilizationThresholds': { near: 98, over: 100 },

  /* ---- Security ---- */
  'security.controls': [
    { name: 'Multi-factor authentication (MFA)', status: 'Enabled' },
    { name: 'Role-based authorization', status: 'Enabled' },
    { name: 'Encryption at rest & in transit', status: 'Enabled' },
    { name: 'Audit logging', status: 'Enabled' },
    { name: 'Backup & recovery', status: 'Enabled' },
    { name: 'Data Privacy Act compliance', status: 'Compliant' },
  ],
  'security.encryption': { atRest: 'AES-256', inTransit: 'TLS 1.3' },
  'security.backup': { frequency: 'Daily', rpoMinutes: 15 },

  /* ---- Workflow / statuses ---- */
  'workflow.statuses': ['Pending', 'In Progress', 'Approved', 'Rejected', 'Completed'],

  /* ---- Rank -> monthly salary increment (auto-staged on approved promotion) ---- */
  'performance.rankSalaryIncrements': {
    'Instructor II': 2500, 'Assistant Professor I': 4000, 'Assistant Professor II': 5000,
    'Associate Professor I': 6500, 'Associate Professor II': 7500, 'Associate Professor III': 8500,
    'Professor I': 10000, 'Professor II': 12000,
  },

  /* ---- Legacy data migration ---- */
  'migration': {
    sourceSystem: 'Legacy HRIS (to be confirmed)',
    database: 'To be confirmed',
    recordsEstimate: 3500,
    yearsAvailable: 10,
    scopeSchoolYears: 1,            // included in base scope; additional years = add-on
    fields: ['201 File', 'Service Record', 'Leave Balances', 'Payroll History', 'Benefits'],
    cleansing: 'Shared — vendor maps & loads, client validates',
  },

  /* ---- Microsoft environment ---- */
  'integrations.microsoft': {
    entraIdSso: true, outlookTeamsNotifications: true, excelExport: true,
    sharePointDocs: false, note: 'Confirm specific M365 products required by TOR',
  },
};

(function () {
  const CFG = window.MC_CONFIG || {};
  const URL = CFG.SUPABASE_URL, KEY = CFG.SUPABASE_ANON_KEY;
  const store = {};   // DB overrides (key -> value)

  const effective = (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : MC.CONFIG_DEFAULTS[k]);
  const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

  MC.config = {
    /** Effective value for a key (override if set, else shipped default). */
    get(key, fallback) { const v = effective(key); return v === undefined ? fallback : clone(v); },
    /** Default (shipped) value, ignoring overrides. */
    default(key) { return clone(MC.CONFIG_DEFAULTS[key]); },
    isOverridden(key) { return Object.prototype.hasOwnProperty.call(store, key); },
    keys() { return Object.keys(MC.CONFIG_DEFAULTS); },
    /** Set an override and persist it (upsert into app_settings). */
    async set(key, value) {
      const had = Object.prototype.hasOwnProperty.call(store, key); const prev = store[key];
      store[key] = clone(value); // optimistic
      if (CFG.USE_SUPABASE && URL && KEY && MC.dataSource === 'supabase') {
        try {
          const r = await fetch(`${URL}/rest/v1/app_settings?on_conflict=key`, {
            method: 'POST',
            headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
            body: JSON.stringify({ key, value }),
          });
          if (!r.ok) throw new Error(`config set ${key} → ${r.status}`);
        } catch (e) { if (had) store[key] = prev; else delete store[key]; throw e; } // roll back
      }
      return true;
    },
    /** Revert a key to its shipped default — removes the override row. */
    async reset(key) {
      const had = Object.prototype.hasOwnProperty.call(store, key); const prev = store[key];
      delete store[key];
      if (CFG.USE_SUPABASE && URL && KEY && MC.dataSource === 'supabase') {
        try {
          const r = await fetch(`${URL}/rest/v1/app_settings?key=eq.${encodeURIComponent(key)}`, {
            method: 'DELETE', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY },
          });
          if (!r.ok && r.status !== 404) throw new Error(`config reset ${key} → ${r.status}`);
        } catch (e) { if (had) store[key] = prev; throw e; }
      }
      return true;
    },
  };

  // Load overrides at boot (parallel with the data layer).
  MC.configReady = (async () => {
    if (!CFG.USE_SUPABASE || !URL || !KEY) return false;
    try {
      const r = await fetch(`${URL}/rest/v1/app_settings?select=key,value`, {
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, Accept: 'application/json' },
      });
      if (!r.ok) throw new Error('config load ' + r.status);
      (await r.json()).forEach((row) => { store[row.key] = row.value; });
      console.info('[Miriam HRIS] Configuration loaded.');
      return true;
    } catch (e) {
      console.warn('[Miriam HRIS] Config overrides unavailable — using shipped defaults.', e);
      return false;
    }
  })();
})();
