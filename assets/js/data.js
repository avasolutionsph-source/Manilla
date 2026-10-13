/* ============================================================
   Miriam College HRIS — Mock data (demo only)
   ============================================================ */
window.DB = (function () {
  const avatarColors = ['#1d3473','#274597','#0f8f9e','#6d4bd4','#c07d16','#15966b','#c7384a','#2563c9','#9a4f16','#4a4f73'];
  const colorFor = (s) => avatarColors[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % avatarColors.length];
  const initials = (n) => n.split(' ').filter(w=>w[0]&&/[A-Za-z]/.test(w[0])).slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const campuses = ['Quezon City', 'Nuvali', 'Alviera'];
  const departments = [
    'College of Arts & Sciences','Basic Education Unit','Grade School','High School',
    'Information & Communications Technology Office','Human Resources Division','Finance & Accounting',
    'Registrar','Library Services','Guidance & Counseling','Property & Supply','Security Office',
    'Research & Publications','Campus Ministry','Student Affairs'
  ];

  const employees = [
    { id:'MC-0417', name:'Ma. Jasmin B. Velasco', position:'Project Management Officer', dept:'Information & Communications Technology Office', campus:'Quezon City', type:'Regular', status:'Active', email:'jvelasco@mc.edu.ph', phone:'0917 555 0417', hired:'2016-06-01', sg:'SG-18', rank:'—', supervisor:'Reggie D. De Leon', birth:'1988-03-12', civil:'Married', gender:'Female', tin:'214-558-002', sss:'34-5589002-1', pagibig:'1210-5589-0021', philhealth:'09-255890021-3', contractEnds:null },
    { id:'MC-0088', name:'Noel C. Racho', position:'Director, Human Resources Division', dept:'Human Resources Division', campus:'Quezon City', type:'Regular', status:'Active', email:'nracho@mc.edu.ph', phone:'0917 555 0088', hired:'2009-01-15', sg:'SG-24', rank:'—', supervisor:'VP for Administration', birth:'1976-09-02', civil:'Married', gender:'Male', tin:'118-220-551', sss:'33-1122055-2', pagibig:'1210-1122-0552', philhealth:'09-211220552-1', contractEnds:null },
    { id:'MC-0631', name:'Mark Raymond S. Par', position:'Compensation & HR Services Officer', dept:'Human Resources Division', campus:'Quezon City', type:'Regular', status:'Active', email:'mpar@mc.edu.ph', phone:'0917 555 0631', hired:'2018-08-06', sg:'SG-16', rank:'—', supervisor:'Noel C. Racho', birth:'1991-11-25', civil:'Single', gender:'Male', tin:'330-114-889', sss:'34-9901148-5', pagibig:'1211-9901-1485', philhealth:'09-399011485-0', contractEnds:null },
    { id:'MC-0219', name:'Dr. Cristina L. Mendoza', position:'Associate Professor', dept:'College of Arts & Sciences', campus:'Quezon City', type:'Faculty', status:'Active', email:'cmendoza@mc.edu.ph', phone:'0918 221 0219', hired:'2011-06-01', sg:'—', rank:'Associate Professor II', supervisor:'Dean, CAS', birth:'1979-04-18', civil:'Married', gender:'Female', tin:'220-887-114', sss:'33-5566778-9', pagibig:'1210-5566-7789', philhealth:'09-255667789-2', contractEnds:null },
    { id:'MC-0744', name:'Prof. Daniel R. Aquino', position:'Assistant Professor', dept:'College of Arts & Sciences', campus:'Nuvali', type:'Faculty', status:'Active', email:'daquino@mc.edu.ph', phone:'0916 744 0744', hired:'2019-06-03', sg:'—', rank:'Assistant Professor I', supervisor:'Dean, CAS', birth:'1986-07-30', civil:'Married', gender:'Male', tin:'441-220-663', sss:'34-7788990-1', pagibig:'1211-7788-9901', philhealth:'09-477889901-4', contractEnds:null },
    { id:'MC-0902', name:'Angela F. Santos', position:'Guidance Counselor', dept:'Guidance & Counseling', campus:'Quezon City', type:'Regular', status:'Active', email:'asantos@mc.edu.ph', phone:'0917 902 0902', hired:'2020-07-01', sg:'SG-14', rank:'—', supervisor:'Dean of Student Affairs', birth:'1993-02-14', civil:'Single', gender:'Female', tin:'551-990-227', sss:'34-2233445-6', pagibig:'1212-2233-4456', philhealth:'09-522334456-7', contractEnds:null },
    { id:'MC-1035', name:'Roberto M. Dizon', position:'IT Systems Administrator', dept:'Information & Communications Technology Office', campus:'Quezon City', type:'Regular', status:'Active', email:'rdizon@mc.edu.ph', phone:'0915 103 1035', hired:'2017-03-20', sg:'SG-15', rank:'—', supervisor:'Ma. Jasmin B. Velasco', birth:'1990-12-05', civil:'Married', gender:'Male', tin:'662-115-338', sss:'34-6677889-0', pagibig:'1211-6677-8890', philhealth:'09-566778890-2', contractEnds:null },
    { id:'MC-1180', name:'Patricia G. Villanueva', position:'Payroll Officer', dept:'Finance & Accounting', campus:'Quezon City', type:'Regular', status:'Active', email:'pvillanueva@mc.edu.ph', phone:'0917 118 1180', hired:'2015-09-14', sg:'SG-14', rank:'—', supervisor:'Finance Director', birth:'1989-06-21', civil:'Married', gender:'Female', tin:'773-226-449', sss:'33-8899001-2', pagibig:'1210-8899-0012', philhealth:'09-588990012-5', contractEnds:null },
    { id:'MC-1267', name:'Emmanuel T. Cruz', position:'Instructor I', dept:'Basic Education Unit', campus:'Alviera', type:'Probationary', status:'Active', email:'ecruz@mc.edu.ph', phone:'0918 126 1267', hired:'2025-06-02', sg:'—', rank:'Instructor I', supervisor:'Principal, BEU', birth:'1997-10-09', civil:'Single', gender:'Male', tin:'884-337-550', sss:'34-9900112-3', pagibig:'1213-9900-1123', philhealth:'09-599001123-8', contractEnds:'2026-05-31' },
    { id:'MC-1288', name:'Katrina D. Lim', position:'Librarian II', dept:'Library Services', campus:'Nuvali', type:'Regular', status:'Active', email:'klim@mc.edu.ph', phone:'0916 128 1288', hired:'2014-11-03', sg:'SG-13', rank:'—', supervisor:'Chief Librarian', birth:'1987-08-17', civil:'Married', gender:'Female', tin:'995-448-661', sss:'33-1100223-4', pagibig:'1210-1100-2234', philhealth:'09-511002234-9', contractEnds:null },
    { id:'MC-1301', name:'Jose Antonio P. Reyes', position:'Maintenance Supervisor', dept:'Property & Supply', campus:'Quezon City', type:'Regular', status:'Active', email:'jreyes@mc.edu.ph', phone:'0917 130 1301', hired:'2012-02-01', sg:'SG-11', rank:'—', supervisor:'Admin Officer', birth:'1982-01-28', civil:'Married', gender:'Male', tin:'106-559-772', sss:'33-2211334-5', pagibig:'1210-2211-3345', philhealth:'09-522113345-0', contractEnds:null },
    { id:'MC-1356', name:'Grace A. Fernandez', position:'Instructor II', dept:'High School', campus:'Quezon City', type:'Contractual', status:'Active', email:'gfernandez@mc.edu.ph', phone:'0915 135 1356', hired:'2023-06-01', sg:'—', rank:'Instructor II', supervisor:'Principal, HS', birth:'1994-05-11', civil:'Single', gender:'Female', tin:'217-660-883', sss:'34-3322445-6', pagibig:'1212-3322-4456', philhealth:'09-533224456-1', contractEnds:'2026-05-31' },
    { id:'MC-1402', name:'Dr. Victor H. Ramos', position:'Professor', dept:'College of Arts & Sciences', campus:'Quezon City', type:'Faculty', status:'Active', email:'vramos@mc.edu.ph', phone:'0917 140 1402', hired:'2006-06-01', sg:'—', rank:'Professor I', supervisor:'Dean, CAS', birth:'1972-11-03', civil:'Married', gender:'Male', tin:'328-771-994', sss:'33-4433556-7', pagibig:'1210-4433-5567', philhealth:'09-544335567-2', contractEnds:null },
    { id:'MC-1455', name:'Bea Carmela O. Navarro', position:'HR Associate', dept:'Human Resources Division', campus:'Quezon City', type:'Regular', status:'Active', email:'bnavarro@mc.edu.ph', phone:'0916 145 1455', hired:'2021-10-04', sg:'SG-12', rank:'—', supervisor:'Mark Raymond S. Par', birth:'1995-09-27', civil:'Single', gender:'Female', tin:'439-882-005', sss:'34-5544667-8', pagibig:'1212-5544-6678', philhealth:'09-555446678-3', contractEnds:null },
    { id:'MC-1510', name:'Miguel S. Tan', position:'Research Associate', dept:'Research & Publications', campus:'Nuvali', type:'Contractual', status:'Active', email:'mtan@mc.edu.ph', phone:'0917 151 1510', hired:'2024-08-01', sg:'SG-13', rank:'—', supervisor:'Research Director', birth:'1996-03-19', civil:'Single', gender:'Male', tin:'540-993-116', sss:'34-6655778-9', pagibig:'1213-6655-7789', philhealth:'09-566557789-4', contractEnds:'2026-07-31' },
    { id:'MC-0975', name:'Sister Maria Teresa V. Lopez', position:'Campus Minister', dept:'Campus Ministry', campus:'Quezon City', type:'Regular', status:'On Leave', email:'mlopez@mc.edu.ph', phone:'0918 097 0975', hired:'2010-06-01', sg:'SG-14', rank:'—', supervisor:'VP for Mission', birth:'1975-12-24', civil:'Single', gender:'Female', tin:'651-004-227', sss:'33-7766889-0', pagibig:'1210-7766-8890', philhealth:'09-577668890-5', contractEnds:null },
  ].map(e => ({ ...e, color: colorFor(e.name), initials: initials(e.name) }));

  // ----- Recruitment -----
  const jobs = [
    { id:'REQ-2026-014', title:'Assistant Professor — Mathematics', dept:'College of Arts & Sciences', campus:'Quezon City', type:'Full-time Faculty', status:'Open', posted:'2026-09-15', applicants:24, stage:'Interviewing', channel:'Internal + External', requester:'Dean, CAS' },
    { id:'REQ-2026-015', title:'IT Support Specialist', dept:'Information & Communications Technology Office', campus:'Quezon City', type:'Full-time Staff', status:'Open', posted:'2026-09-22', applicants:41, stage:'Screening', channel:'External', requester:'Ma. Jasmin B. Velasco' },
    { id:'REQ-2026-016', title:'Guidance Counselor (Nuvali)', dept:'Guidance & Counseling', campus:'Nuvali', type:'Full-time Staff', status:'Open', posted:'2026-09-28', applicants:12, stage:'Shortlist', channel:'Internal + External', requester:'Dean of Student Affairs' },
    { id:'REQ-2026-017', title:'Accounting Clerk', dept:'Finance & Accounting', campus:'Quezon City', type:'Contractual', status:'For Approval', posted:'—', applicants:0, stage:'Requisition', channel:'—', requester:'Finance Director' },
    { id:'REQ-2026-012', title:'Grade School Teacher — Science', dept:'Grade School', campus:'Alviera', type:'Full-time Faculty', status:'Filled', posted:'2026-07-10', applicants:33, stage:'Hired', channel:'External', requester:'Principal, GS' },
  ];

  const applicants = [
    { id:'A-5521', name:'Reina M. Bautista', role:'Assistant Professor — Mathematics', stage:'Interview', match:94, exp:'7 yrs', edu:'MS Mathematics, UP Diliman', applied:'2026-09-18', source:'MC Careers Site', email:'reina.bautista@email.com', aiNotes:'Strong research output (4 publications). Matches 9/10 required competencies. Licensed (LET). Recommend fast-track.' },
    { id:'A-5522', name:'Carlo D. Jimenez', role:'Assistant Professor — Mathematics', stage:'Assessment', match:88, exp:'5 yrs', edu:'MS Applied Math, ADMU', applied:'2026-09-19', source:'Referral', email:'carlo.jimenez@email.com', aiNotes:'Excellent teaching evaluations. Competency match 8/10. Lacks published research.' },
    { id:'A-5530', name:'Patricia Anne L. Yu', role:'IT Support Specialist', stage:'Screening', match:91, exp:'4 yrs', edu:'BS Information Technology, DLSU', applied:'2026-09-24', source:'LinkedIn', email:'patricia.yu@email.com', aiNotes:'Certifications: CompTIA A+, ITIL. Strong helpdesk background. Top 5% of applicant pool.' },
    { id:'A-5531', name:'Kevin O. Salcedo', role:'IT Support Specialist', stage:'Screening', match:79, exp:'3 yrs', edu:'BS Computer Science, PUP', applied:'2026-09-25', source:'JobStreet', email:'kevin.salcedo@email.com', aiNotes:'Good technical skills. Limited experience in education sector. Competency match 7/10.' },
    { id:'A-5533', name:'Mariel T. Ocampo', role:'IT Support Specialist', stage:'Applied', match:72, exp:'2 yrs', edu:'BS IT, FEU', applied:'2026-09-29', source:'MC Careers Site', email:'mariel.ocampo@email.com', aiNotes:'Entry-level profile. Meets minimum qualifications. Suited for junior track.' },
    { id:'A-5540', name:'Joseph R. Aguilar', role:'Guidance Counselor (Nuvali)', stage:'Shortlist', match:90, exp:'6 yrs', edu:'MA Guidance & Counseling, RPm', applied:'2026-09-30', source:'Referral', email:'joseph.aguilar@email.com', aiNotes:'Registered Psychometrician. Strong fit for school counseling. Competency match 9/10.' },
    { id:'A-5541', name:'Hazel P. Cordova', role:'Guidance Counselor (Nuvali)', stage:'Interview', match:85, exp:'4 yrs', edu:'MA Psychology, UST', applied:'2026-10-01', source:'MC Careers Site', email:'hazel.cordova@email.com', aiNotes:'Warm interview presence. Competency match 8/10. Recommend reference check.' },
    { id:'A-5542', name:'Nathaniel S. Gomez', role:'Assistant Professor — Mathematics', stage:'Applied', match:67, exp:'3 yrs', edu:'BS Math, PNU', applied:'2026-10-02', source:'Walk-in', email:'nathaniel.gomez@email.com', aiNotes:'Below preferred qualification (no MS). Flag for talent pool.' },
    { id:'A-5543', name:'Diane Rose F. Castro', role:'IT Support Specialist', stage:'Offer', match:93, exp:'5 yrs', edu:'BS IT, Mapua', applied:'2026-09-23', source:'LinkedIn', email:'diane.castro@email.com', aiNotes:'Top candidate. Competency match 10/10. Offer in approval workflow.' },
    { id:'A-5544', name:'Francis Leo M. Tolentino', role:'Guidance Counselor (Nuvali)', stage:'Applied', match:74, exp:'2 yrs', edu:'BS Psychology, UST', applied:'2026-10-03', source:'JobStreet', email:'francis.tolentino@email.com', aiNotes:'Needs RGC/RPm license. Competency match 6/10.' },
  ].map(a => ({ ...a, color: colorFor(a.name), initials: initials(a.name) }));

  // ----- Timekeeping -----
  const attendanceToday = [
    { id:'MC-0417', timeIn:'07:52', timeOut:'—', status:'Present', mode:'Facial Biometric', late:false },
    { id:'MC-0631', timeIn:'08:14', timeOut:'—', status:'Late', mode:'M10 Fingerprint', late:true },
    { id:'MC-1035', timeIn:'07:45', timeOut:'—', status:'Present', mode:'Facial Biometric', late:false },
    { id:'MC-1180', timeIn:'07:58', timeOut:'—', status:'Present', mode:'Web Portal', late:false },
    { id:'MC-0219', timeIn:'09:02', timeOut:'—', status:'Late', mode:'Mobile (GPS)', late:true },
    { id:'MC-0744', timeIn:'—', timeOut:'—', status:'On Official Business', mode:'Filed', late:false },
    { id:'MC-0902', timeIn:'07:49', timeOut:'—', status:'Present', mode:'M10 Fingerprint', late:false },
    { id:'MC-1288', timeIn:'08:05', timeOut:'—', status:'Present', mode:'Facial Biometric', late:false },
    { id:'MC-1455', timeIn:'07:55', timeOut:'—', status:'Present', mode:'Web Portal', late:false },
    { id:'MC-0975', timeIn:'—', timeOut:'—', status:'On Leave', mode:'Approved SL', late:false },
    { id:'MC-1267', timeIn:'08:21', timeOut:'—', status:'Late', mode:'Mobile (GPS)', late:true },
    { id:'MC-1301', timeIn:'06:58', timeOut:'—', status:'Present', mode:'M10 Fingerprint', late:false },
  ];

  const applications = [
    { id:'LV-3391', emp:'MC-0975', empName:'Sister Maria Teresa V. Lopez', type:'Sick Leave', from:'2026-10-12', to:'2026-10-16', days:5, status:'Approved', filed:'2026-10-10', approver:'VP for Mission', reason:'Medical — post-operative recovery' },
    { id:'OB-2210', emp:'MC-0744', empName:'Prof. Daniel R. Aquino', type:'Official Business', from:'2026-10-13', to:'2026-10-13', days:1, status:'Approved', filed:'2026-10-11', approver:'Dean, CAS', reason:'CHED accreditation conference, Manila' },
    { id:'OT-1180', emp:'MC-1180', empName:'Patricia G. Villanueva', type:'Overtime', from:'2026-10-14', to:'2026-10-14', days:0, hours:4, status:'Pending', filed:'2026-10-13', approver:'Finance Director', reason:'Month-end payroll processing' },
    { id:'LV-3402', emp:'MC-1356', empName:'Grace A. Fernandez', type:'Vacation Leave', from:'2026-10-20', to:'2026-10-22', days:3, status:'Pending', filed:'2026-10-12', approver:'Principal, HS', reason:'Family event' },
    { id:'WO-0901', emp:'MC-0902', empName:'Angela F. Santos', type:'Work Hours Offset', from:'2026-10-15', to:'2026-10-15', days:0, hours:3, status:'Pending', filed:'2026-10-13', approver:'Dean of Student Affairs', reason:'Offset for Saturday orientation duty' },
    { id:'LV-3380', emp:'MC-1035', empName:'Roberto M. Dizon', type:'Vacation Leave', from:'2026-10-06', to:'2026-10-07', days:2, status:'Approved', filed:'2026-10-01', approver:'Ma. Jasmin B. Velasco', reason:'Personal' },
    { id:'LV-3410', emp:'MC-1267', empName:'Emmanuel T. Cruz', type:'Sick Leave', from:'2026-10-13', to:'2026-10-13', days:1, status:'Rejected', filed:'2026-10-13', approver:'Principal, BEU', reason:'Insufficient SL balance; converted to LWOP pending review' },
  ];

  // ----- Payroll -----
  const payrollRun = {
    period:'October 1–15, 2026', cutoff:'2nd Cutoff', group:'Monthly-Paid Regular', pay_date:'2026-10-20',
    employees:412, gross:9847200, deductions:2410344, net:7436856, status:'For Review',
    items:[
      { id:'MC-0417', basic:52000, allow:6500, ot:0, gross:58500, tax:7420, sss:1350, phic:1462, hdmf:200, loans:3200, net:44868 },
      { id:'MC-0088', basic:98000, allow:12000, ot:0, gross:110000, tax:22840, sss:1350, phic:2750, hdmf:200, loans:0, net:82860 },
      { id:'MC-0219', basic:61000, allow:7000, ot:0, gross:68000, tax:9680, sss:1350, phic:1700, hdmf:200, loans:4500, net:50570 },
      { id:'MC-1180', basic:41000, allow:4500, ot:3800, gross:49300, tax:4910, sss:1350, phic:1125, hdmf:200, loans:2100, net:39615 },
      { id:'MC-1035', basic:44000, allow:5000, ot:0, gross:49000, tax:4820, sss:1350, phic:1225, hdmf:200, loans:1800, net:39605 },
      { id:'MC-1267', basic:29000, allow:3000, ot:0, gross:32000, tax:1430, sss:1350, phic:800, hdmf:200, loans:0, net:28220 },
    ]
  };

  // ----- Benefits -----
  const benefits = [
    { name:'HMO — Maxicare Platinum', type:'Health', enrolled:398, eligible:412, employer:'₱18,500 / yr', renews:'2026-12-31', status:'Active' },
    { name:'SSS', type:'Mandatory', enrolled:412, eligible:412, employer:'Per table', renews:'—', status:'Active' },
    { name:'Pag-IBIG (HDMF)', type:'Mandatory', enrolled:412, eligible:412, employer:'₱200 / mo', renews:'—', status:'Active' },
    { name:'PhilHealth', type:'Mandatory', enrolled:412, eligible:412, employer:'5% share', renews:'—', status:'Active' },
    { name:'Group Life Insurance', type:'Insurance', enrolled:412, eligible:412, employer:'₱6,200 / yr', renews:'2027-01-31', status:'Active' },
    { name:'Educational Benefit (Dependents)', type:'Educational', enrolled:146, eligible:260, employer:'Up to 100% tuition', renews:'2026-11-15', status:'Enrollment Open' },
    { name:'Retirement Plan', type:'Retirement', enrolled:389, eligible:412, employer:'Defined benefit', renews:'—', status:'Active' },
    { name:'Wellness & EAP Program', type:'Wellness', enrolled:275, eligible:412, employer:'₱3,000 / yr', renews:'2026-12-31', status:'Active' },
  ];
  const claims = [
    { id:'CLM-0912', emp:'Roberto M. Dizon', benefit:'HMO — Maxicare', amount:'₱8,400', type:'Outpatient', status:'Approved', filed:'2026-10-08' },
    { id:'CLM-0915', emp:'Patricia G. Villanueva', benefit:'Educational Benefit', amount:'₱42,000', type:'Dependent tuition', status:'Processing', filed:'2026-10-10' },
    { id:'CLM-0918', emp:'Angela F. Santos', benefit:'Wellness Program', amount:'₱3,000', type:'Reimbursement', status:'Pending', filed:'2026-10-12' },
    { id:'CLM-0920', emp:'Dr. Victor H. Ramos', benefit:'HMO — Maxicare', amount:'₱15,200', type:'Dental', status:'Pending', filed:'2026-10-13' },
  ];

  // ----- Performance -----
  const reviews = [
    { emp:'MC-0219', cycle:'AY 2025–2026', score:4.6, rating:'Outstanding', status:'Completed', idp:true, goals:5, met:5 },
    { emp:'MC-0744', cycle:'AY 2025–2026', score:4.1, rating:'Very Satisfactory', status:'Completed', idp:true, goals:4, met:3 },
    { emp:'MC-1035', cycle:'H2 2026', score:4.3, rating:'Very Satisfactory', status:'In Review', idp:false, goals:6, met:5 },
    { emp:'MC-1180', cycle:'H2 2026', score:3.8, rating:'Satisfactory', status:'In Progress', idp:false, goals:5, met:4 },
    { emp:'MC-1267', cycle:'Probationary — 5th mo', score:3.9, rating:'Satisfactory', status:'In Progress', idp:true, goals:4, met:3 },
    { emp:'MC-1402', cycle:'AY 2025–2026', score:4.8, rating:'Outstanding', status:'Completed', idp:true, goals:5, met:5 },
  ];
  const facultyRanking = [
    { emp:'MC-1402', current:'Professor I', points:92, next:'Professor II', eligible:true, qualif:'PhD', research:12, teaching:4.8, service:'High' },
    { emp:'MC-0219', current:'Associate Professor II', points:78, next:'Associate Professor III', eligible:true, qualif:'PhD (cand.)', research:8, teaching:4.6, service:'High' },
    { emp:'MC-0744', current:'Assistant Professor I', points:61, next:'Assistant Professor II', eligible:false, qualif:'MA', research:4, teaching:4.1, service:'Medium' },
    { emp:'MC-1356', current:'Instructor II', points:48, next:'Assistant Professor I', eligible:false, qualif:'MA (cand.)', research:2, teaching:4.0, service:'Medium' },
  ];

  // ----- Offboarding / clearance -----
  const separations = [
    { id:'SEP-0071', emp:'Miguel S. Tan', empId:'MC-1510', type:'End of Contract', lastDay:'2026-07-31', status:'In Clearance', progress:62, exit:false },
    { id:'SEP-0069', emp:'Grace A. Fernandez', empId:'MC-1356', type:'Resignation', lastDay:'2026-11-15', status:'Initiated', progress:18, exit:false },
    { id:'SEP-0064', emp:'Former: L. Cabrera', empId:'MC-0820', type:'Retirement', lastDay:'2026-08-31', status:'Completed', progress:100, exit:true },
  ];
  const clearanceOffices = [
    { office:'Immediate Supervisor', status:'Cleared', by:'Research Director', date:'2026-07-18' },
    { office:'Human Resources', status:'Cleared', by:'B. Navarro', date:'2026-07-19' },
    { office:'IT Office', status:'Cleared', by:'R. Dizon', date:'2026-07-20', note:'Laptop MC-IT-0391 returned' },
    { office:'Library Services', status:'Cleared', by:'K. Lim', date:'2026-07-20' },
    { office:'Property & Supply', status:'Pending', by:'—', date:'—', note:'2 items pending return' },
    { office:'Finance & Accounting', status:'Pending', by:'—', date:'—', note:'Awaiting final pay computation' },
    { office:'Security Office', status:'Cleared', by:'Security', date:'2026-07-18', note:'ID + access card deactivated' },
    { office:'Research Office', status:'In Progress', by:'—', date:'—' },
  ];

  // ----- Notifications -----
  const notifications = [
    { icon:'user-plus', color:'blue', title:'New applicant for IT Support Specialist', body:'Mariel T. Ocampo applied via MC Careers Site', time:'12 min ago', unread:true },
    { icon:'alert-triangle', color:'amber', title:'Contract ending in 45 days', body:'Emmanuel T. Cruz (MC-1267) — ends May 31, 2026', time:'1 hr ago', unread:true },
    { icon:'calendar', color:'violet', title:'Leave approval needed', body:'2 leave applications awaiting your review', time:'2 hrs ago', unread:true },
    { icon:'dollar-sign', color:'green', title:'Payroll run ready for review', body:'Oct 1–15 · 412 employees · ₱7.44M net', time:'3 hrs ago', unread:false },
    { icon:'award', color:'teal', title:'Faculty ranking cycle open', body:'2 faculty eligible for promotion review', time:'Yesterday', unread:false },
  ];

  const auditTrail = [
    { ts:'2026-10-13 08:14', actor:'M. Par', action:'Updated salary grade', target:'MC-1035 Roberto Dizon', ip:'10.0.14.22' },
    { ts:'2026-10-13 07:59', actor:'System', action:'Attendance synced from M10 device', target:'QC-Gate-01', ip:'10.0.3.11' },
    { ts:'2026-10-12 16:42', actor:'B. Navarro', action:'Approved leave application', target:'LV-3391', ip:'10.0.14.30' },
    { ts:'2026-10-12 14:05', actor:'N. Racho', action:'Generated 2316 batch', target:'AY 2025 · 412 records', ip:'10.0.14.02' },
    { ts:'2026-10-12 09:20', actor:'P. Villanueva', action:'Posted journal entries to SAP', target:'JE-2026-10-204', ip:'10.0.9.17' },
  ];

  const empById = (id) => employees.find(e => e.id === id);

  return {
    campuses, departments, employees, jobs, applicants, attendanceToday, applications,
    payrollRun, benefits, claims, reviews, facultyRanking, separations, clearanceOffices,
    notifications, auditTrail, empById, colorFor, initials,
  };
})();
