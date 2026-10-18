-- ============================================================
-- Miriam College HRIS — Seed data (from assets/js/data.js)
-- Idempotent: truncates demo tables, then re-inserts.
-- ============================================================
truncate table
  public.payroll_items, public.payroll_runs,
  public.attendance_today, public.leave_applications,
  public.performance_reviews, public.faculty_ranking,
  public.claims, public.benefits,
  public.separations, public.clearance_offices,
  public.notifications, public.audit_trail,
  public.applicants, public.jobs,
  public.employees, public.departments, public.campuses
restart identity cascade;

-- ---- Campuses ----
insert into public.campuses(name) values
  ('Quezon City'), ('Nuvali'), ('Alviera');

-- ---- Departments ----
insert into public.departments(name) values
  ('College of Arts & Sciences'),('Basic Education Unit'),('Grade School'),('High School'),
  ('Information & Communications Technology Office'),('Human Resources Division'),('Finance & Accounting'),
  ('Registrar'),('Library Services'),('Guidance & Counseling'),('Property & Supply'),('Security Office'),
  ('Research & Publications'),('Campus Ministry'),('Student Affairs');

-- ---- Employees ----
insert into public.employees
 (id,name,position,dept,campus,emp_type,status,email,phone,hired,sg,rank,supervisor,birth,civil,gender,tin,sss,pagibig,philhealth,contract_ends) values
 ('MC-0417','Ma. Jasmin B. Velasco','Project Management Officer','Information & Communications Technology Office','Quezon City','Regular','Active','jvelasco@mc.edu.ph','0917 555 0417','2016-06-01','SG-18','—','Reggie D. De Leon','1988-03-12','Married','Female','214-558-002','34-5589002-1','1210-5589-0021','09-255890021-3',null),
 ('MC-0088','Noel C. Racho','Director, Human Resources Division','Human Resources Division','Quezon City','Regular','Active','nracho@mc.edu.ph','0917 555 0088','2009-01-15','SG-24','—','VP for Administration','1976-09-02','Married','Male','118-220-551','33-1122055-2','1210-1122-0552','09-211220552-1',null),
 ('MC-0631','Mark Raymond S. Par','Compensation & HR Services Officer','Human Resources Division','Quezon City','Regular','Active','mpar@mc.edu.ph','0917 555 0631','2018-08-06','SG-16','—','Noel C. Racho','1991-11-25','Single','Male','330-114-889','34-9901148-5','1211-9901-1485','09-399011485-0',null),
 ('MC-0219','Dr. Cristina L. Mendoza','Associate Professor','College of Arts & Sciences','Quezon City','Faculty','Active','cmendoza@mc.edu.ph','0918 221 0219','2011-06-01','—','Associate Professor II','Dean, CAS','1979-04-18','Married','Female','220-887-114','33-5566778-9','1210-5566-7789','09-255667789-2',null),
 ('MC-0744','Prof. Daniel R. Aquino','Assistant Professor','College of Arts & Sciences','Nuvali','Faculty','Active','daquino@mc.edu.ph','0916 744 0744','2019-06-03','—','Assistant Professor I','Dean, CAS','1986-07-30','Married','Male','441-220-663','34-7788990-1','1211-7788-9901','09-477889901-4',null),
 ('MC-0902','Angela F. Santos','Guidance Counselor','Guidance & Counseling','Quezon City','Regular','Active','asantos@mc.edu.ph','0917 902 0902','2020-07-01','SG-14','—','Dean of Student Affairs','1993-02-14','Single','Female','551-990-227','34-2233445-6','1212-2233-4456','09-522334456-7',null),
 ('MC-1035','Roberto M. Dizon','IT Systems Administrator','Information & Communications Technology Office','Quezon City','Regular','Active','rdizon@mc.edu.ph','0915 103 1035','2017-03-20','SG-15','—','Ma. Jasmin B. Velasco','1990-12-05','Married','Male','662-115-338','34-6677889-0','1211-6677-8890','09-566778890-2',null),
 ('MC-1180','Patricia G. Villanueva','Payroll Officer','Finance & Accounting','Quezon City','Regular','Active','pvillanueva@mc.edu.ph','0917 118 1180','2015-09-14','SG-14','—','Finance Director','1989-06-21','Married','Female','773-226-449','33-8899001-2','1210-8899-0012','09-588990012-5',null),
 ('MC-1267','Emmanuel T. Cruz','Instructor I','Basic Education Unit','Alviera','Probationary','Active','ecruz@mc.edu.ph','0918 126 1267','2025-06-02','—','Instructor I','Principal, BEU','1997-10-09','Single','Male','884-337-550','34-9900112-3','1213-9900-1123','09-599001123-8','2026-05-31'),
 ('MC-1288','Katrina D. Lim','Librarian II','Library Services','Nuvali','Regular','Active','klim@mc.edu.ph','0916 128 1288','2014-11-03','SG-13','—','Chief Librarian','1987-08-17','Married','Female','995-448-661','33-1100223-4','1210-1100-2234','09-511002234-9',null),
 ('MC-1301','Jose Antonio P. Reyes','Maintenance Supervisor','Property & Supply','Quezon City','Regular','Active','jreyes@mc.edu.ph','0917 130 1301','2012-02-01','SG-11','—','Admin Officer','1982-01-28','Married','Male','106-559-772','33-2211334-5','1210-2211-3345','09-522113345-0',null),
 ('MC-1356','Grace A. Fernandez','Instructor II','High School','Quezon City','Contractual','Active','gfernandez@mc.edu.ph','0915 135 1356','2023-06-01','—','Instructor II','Principal, HS','1994-05-11','Single','Female','217-660-883','34-3322445-6','1212-3322-4456','09-533224456-1','2026-05-31'),
 ('MC-1402','Dr. Victor H. Ramos','Professor','College of Arts & Sciences','Quezon City','Faculty','Active','vramos@mc.edu.ph','0917 140 1402','2006-06-01','—','Professor I','Dean, CAS','1972-11-03','Married','Male','328-771-994','33-4433556-7','1210-4433-5567','09-544335567-2',null),
 ('MC-1455','Bea Carmela O. Navarro','HR Associate','Human Resources Division','Quezon City','Regular','Active','bnavarro@mc.edu.ph','0916 145 1455','2021-10-04','SG-12','—','Mark Raymond S. Par','1995-09-27','Single','Female','439-882-005','34-5544667-8','1212-5544-6678','09-555446678-3',null),
 ('MC-1510','Miguel S. Tan','Research Associate','Research & Publications','Nuvali','Contractual','Active','mtan@mc.edu.ph','0917 151 1510','2024-08-01','SG-13','—','Research Director','1996-03-19','Single','Male','540-993-116','34-6655778-9','1213-6655-7789','09-566557789-4','2026-07-31'),
 ('MC-0975','Sister Maria Teresa V. Lopez','Campus Minister','Campus Ministry','Quezon City','Regular','On Leave','mlopez@mc.edu.ph','0918 097 0975','2010-06-01','SG-14','—','VP for Mission','1975-12-24','Single','Female','651-004-227','33-7766889-0','1210-7766-8890','09-577668890-5',null);

-- ---- Jobs ----
insert into public.jobs(id,title,dept,campus,job_type,status,posted,applicants,stage,channel,requester) values
 ('REQ-2026-014','Assistant Professor — Mathematics','College of Arts & Sciences','Quezon City','Full-time Faculty','Open','2026-09-15',24,'Interviewing','Internal + External','Dean, CAS'),
 ('REQ-2026-015','IT Support Specialist','Information & Communications Technology Office','Quezon City','Full-time Staff','Open','2026-09-22',41,'Screening','External','Ma. Jasmin B. Velasco'),
 ('REQ-2026-016','Guidance Counselor (Nuvali)','Guidance & Counseling','Nuvali','Full-time Staff','Open','2026-09-28',12,'Shortlist','Internal + External','Dean of Student Affairs'),
 ('REQ-2026-017','Accounting Clerk','Finance & Accounting','Quezon City','Contractual','For Approval','—',0,'Requisition','—','Finance Director'),
 ('REQ-2026-012','Grade School Teacher — Science','Grade School','Alviera','Full-time Faculty','Filled','2026-07-10',33,'Hired','External','Principal, GS');

-- ---- Applicants ----
insert into public.applicants(id,name,role,stage,match,exp,edu,applied,source,email,ai_notes) values
 ('A-5521','Reina M. Bautista','Assistant Professor — Mathematics','Interview',94,'7 yrs','MS Mathematics, UP Diliman','2026-09-18','MC Careers Site','reina.bautista@email.com','Strong research output (4 publications). Matches 9/10 required competencies. Licensed (LET). Recommend fast-track.'),
 ('A-5522','Carlo D. Jimenez','Assistant Professor — Mathematics','Assessment',88,'5 yrs','MS Applied Math, ADMU','2026-09-19','Referral','carlo.jimenez@email.com','Excellent teaching evaluations. Competency match 8/10. Lacks published research.'),
 ('A-5530','Patricia Anne L. Yu','IT Support Specialist','Screening',91,'4 yrs','BS Information Technology, DLSU','2026-09-24','LinkedIn','patricia.yu@email.com','Certifications: CompTIA A+, ITIL. Strong helpdesk background. Top 5% of applicant pool.'),
 ('A-5531','Kevin O. Salcedo','IT Support Specialist','Screening',79,'3 yrs','BS Computer Science, PUP','2026-09-25','JobStreet','kevin.salcedo@email.com','Good technical skills. Limited experience in education sector. Competency match 7/10.'),
 ('A-5533','Mariel T. Ocampo','IT Support Specialist','Applied',72,'2 yrs','BS IT, FEU','2026-09-29','MC Careers Site','mariel.ocampo@email.com','Entry-level profile. Meets minimum qualifications. Suited for junior track.'),
 ('A-5540','Joseph R. Aguilar','Guidance Counselor (Nuvali)','Shortlist',90,'6 yrs','MA Guidance & Counseling, RPm','2026-09-30','Referral','joseph.aguilar@email.com','Registered Psychometrician. Strong fit for school counseling. Competency match 9/10.'),
 ('A-5541','Hazel P. Cordova','Guidance Counselor (Nuvali)','Interview',85,'4 yrs','MA Psychology, UST','2026-10-01','MC Careers Site','hazel.cordova@email.com','Warm interview presence. Competency match 8/10. Recommend reference check.'),
 ('A-5542','Nathaniel S. Gomez','Assistant Professor — Mathematics','Applied',67,'3 yrs','BS Math, PNU','2026-10-02','Walk-in','nathaniel.gomez@email.com','Below preferred qualification (no MS). Flag for talent pool.'),
 ('A-5543','Diane Rose F. Castro','IT Support Specialist','Offer',93,'5 yrs','BS IT, Mapua','2026-09-23','LinkedIn','diane.castro@email.com','Top candidate. Competency match 10/10. Offer in approval workflow.'),
 ('A-5544','Francis Leo M. Tolentino','Guidance Counselor (Nuvali)','Applied',74,'2 yrs','BS Psychology, UST','2026-10-03','JobStreet','francis.tolentino@email.com','Needs RGC/RPm license. Competency match 6/10.');

-- ---- Attendance (today) ----
insert into public.attendance_today(emp_id,time_in,time_out,status,mode,late) values
 ('MC-0417','07:52','—','Present','Facial Biometric',false),
 ('MC-0631','08:14','—','Late','M10 Fingerprint',true),
 ('MC-1035','07:45','—','Present','Facial Biometric',false),
 ('MC-1180','07:58','—','Present','Web Portal',false),
 ('MC-0219','09:02','—','Late','Mobile (GPS)',true),
 ('MC-0744','—','—','On Official Business','Filed',false),
 ('MC-0902','07:49','—','Present','M10 Fingerprint',false),
 ('MC-1288','08:05','—','Present','Facial Biometric',false),
 ('MC-1455','07:55','—','Present','Web Portal',false),
 ('MC-0975','—','—','On Leave','Approved SL',false),
 ('MC-1267','08:21','—','Late','Mobile (GPS)',true),
 ('MC-1301','06:58','—','Present','M10 Fingerprint',false);

-- ---- Leave / OB / OT applications ----
insert into public.leave_applications(id,emp_id,emp_name,leave_type,from_date,to_date,days,hours,status,filed,approver,reason) values
 ('LV-3391','MC-0975','Sister Maria Teresa V. Lopez','Sick Leave','2026-10-12','2026-10-16',5,null,'Approved','2026-10-10','VP for Mission','Medical — post-operative recovery'),
 ('OB-2210','MC-0744','Prof. Daniel R. Aquino','Official Business','2026-10-13','2026-10-13',1,null,'Approved','2026-10-11','Dean, CAS','CHED accreditation conference, Manila'),
 ('OT-1180','MC-1180','Patricia G. Villanueva','Overtime','2026-10-14','2026-10-14',0,4,'Pending','2026-10-13','Finance Director','Month-end payroll processing'),
 ('LV-3402','MC-1356','Grace A. Fernandez','Vacation Leave','2026-10-20','2026-10-22',3,null,'Pending','2026-10-12','Principal, HS','Family event'),
 ('WO-0901','MC-0902','Angela F. Santos','Work Hours Offset','2026-10-15','2026-10-15',0,3,'Pending','2026-10-13','Dean of Student Affairs','Offset for Saturday orientation duty'),
 ('LV-3380','MC-1035','Roberto M. Dizon','Vacation Leave','2026-10-06','2026-10-07',2,null,'Approved','2026-10-01','Ma. Jasmin B. Velasco','Personal'),
 ('LV-3410','MC-1267','Emmanuel T. Cruz','Sick Leave','2026-10-13','2026-10-13',1,null,'Rejected','2026-10-13','Principal, BEU','Insufficient SL balance; converted to LWOP pending review');

-- ---- Payroll run + items ----
with r as (
  insert into public.payroll_runs(period,cutoff,pay_group,pay_date,employees,gross,deductions,net,status)
  values ('October 1–15, 2026','2nd Cutoff','Monthly-Paid Regular','2026-10-20',412,9847200,2410344,7436856,'For Review')
  returning id
)
insert into public.payroll_items(run_id,emp_id,basic,allow,ot,gross,tax,sss,phic,hdmf,loans,net)
select r.id, v.emp_id, v.basic, v.allow, v.ot, v.gross, v.tax, v.sss, v.phic, v.hdmf, v.loans, v.net
from r, (values
 ('MC-0417',52000,6500,0,58500,7420,1350,1462,200,3200,44868),
 ('MC-0088',98000,12000,0,110000,22840,1350,2750,200,0,82860),
 ('MC-0219',61000,7000,0,68000,9680,1350,1700,200,4500,50570),
 ('MC-1180',41000,4500,3800,49300,4910,1350,1125,200,2100,39615),
 ('MC-1035',44000,5000,0,49000,4820,1350,1225,200,1800,39605),
 ('MC-1267',29000,3000,0,32000,1430,1350,800,200,0,28220)
) as v(emp_id,basic,allow,ot,gross,tax,sss,phic,hdmf,loans,net);

-- ---- Benefits ----
insert into public.benefits(name,ben_type,enrolled,eligible,employer,renews,status) values
 ('HMO — Maxicare Platinum','Health',398,412,'₱18,500 / yr','2026-12-31','Active'),
 ('SSS','Mandatory',412,412,'Per table','—','Active'),
 ('Pag-IBIG (HDMF)','Mandatory',412,412,'₱200 / mo','—','Active'),
 ('PhilHealth','Mandatory',412,412,'5% share','—','Active'),
 ('Group Life Insurance','Insurance',412,412,'₱6,200 / yr','2027-01-31','Active'),
 ('Educational Benefit (Dependents)','Educational',146,260,'Up to 100% tuition','2026-11-15','Enrollment Open'),
 ('Retirement Plan','Retirement',389,412,'Defined benefit','—','Active'),
 ('Wellness & EAP Program','Wellness',275,412,'₱3,000 / yr','2026-12-31','Active');

-- ---- Claims ----
insert into public.claims(id,emp_name,benefit,amount,claim_type,status,filed) values
 ('CLM-0912','Roberto M. Dizon','HMO — Maxicare','₱8,400','Outpatient','Approved','2026-10-08'),
 ('CLM-0915','Patricia G. Villanueva','Educational Benefit','₱42,000','Dependent tuition','Processing','2026-10-10'),
 ('CLM-0918','Angela F. Santos','Wellness Program','₱3,000','Reimbursement','Pending','2026-10-12'),
 ('CLM-0920','Dr. Victor H. Ramos','HMO — Maxicare','₱15,200','Dental','Pending','2026-10-13');

-- ---- Performance reviews ----
insert into public.performance_reviews(emp_id,cycle,score,rating,status,idp,goals,met) values
 ('MC-0219','AY 2025–2026',4.6,'Outstanding','Completed',true,5,5),
 ('MC-0744','AY 2025–2026',4.1,'Very Satisfactory','Completed',true,4,3),
 ('MC-1035','H2 2026',4.3,'Very Satisfactory','In Review',false,6,5),
 ('MC-1180','H2 2026',3.8,'Satisfactory','In Progress',false,5,4),
 ('MC-1267','Probationary — 5th mo',3.9,'Satisfactory','In Progress',true,4,3),
 ('MC-1402','AY 2025–2026',4.8,'Outstanding','Completed',true,5,5);

-- ---- Faculty ranking ----
insert into public.faculty_ranking(emp_id,current_rank,points,next_rank,eligible,qualif,research,teaching,service) values
 ('MC-1402','Professor I',92,'Professor II',true,'PhD',12,4.8,'High'),
 ('MC-0219','Associate Professor II',78,'Associate Professor III',true,'PhD (cand.)',8,4.6,'High'),
 ('MC-0744','Assistant Professor I',61,'Assistant Professor II',false,'MA',4,4.1,'Medium'),
 ('MC-1356','Instructor II',48,'Assistant Professor I',false,'MA (cand.)',2,4.0,'Medium');

-- ---- Separations ----
insert into public.separations(id,emp_name,emp_id,sep_type,last_day,status,progress,is_exit) values
 ('SEP-0071','Miguel S. Tan','MC-1510','End of Contract','2026-07-31','In Clearance',62,false),
 ('SEP-0069','Grace A. Fernandez','MC-1356','Resignation','2026-11-15','Initiated',18,false),
 ('SEP-0064','Former: L. Cabrera','MC-0820','Retirement','2026-08-31','Completed',100,true);

-- ---- Clearance offices ----
insert into public.clearance_offices(office,status,cleared_by,cleared_date,note) values
 ('Immediate Supervisor','Cleared','Research Director','2026-07-18',null),
 ('Human Resources','Cleared','B. Navarro','2026-07-19',null),
 ('IT Office','Cleared','R. Dizon','2026-07-20','Laptop MC-IT-0391 returned'),
 ('Library Services','Cleared','K. Lim','2026-07-20',null),
 ('Property & Supply','Pending','—','—','2 items pending return'),
 ('Finance & Accounting','Pending','—','—','Awaiting final pay computation'),
 ('Security Office','Cleared','Security','2026-07-18','ID + access card deactivated'),
 ('Research Office','In Progress','—','—',null);

-- ---- Notifications ----
insert into public.notifications(icon,color,title,body,time_label,unread) values
 ('user-plus','blue','New applicant for IT Support Specialist','Mariel T. Ocampo applied via MC Careers Site','12 min ago',true),
 ('alert-triangle','amber','Contract ending in 45 days','Emmanuel T. Cruz (MC-1267) — ends May 31, 2026','1 hr ago',true),
 ('calendar','violet','Leave approval needed','2 leave applications awaiting your review','2 hrs ago',true),
 ('dollar-sign','green','Payroll run ready for review','Oct 1–15 · 412 employees · ₱7.44M net','3 hrs ago',false),
 ('award','teal','Faculty ranking cycle open','2 faculty eligible for promotion review','Yesterday',false);

-- ---- Audit trail ----
insert into public.audit_trail(ts,actor,action,target,ip) values
 ('2026-10-13 08:14','M. Par','Updated salary grade','MC-1035 Roberto Dizon','10.0.14.22'),
 ('2026-10-13 07:59','System','Attendance synced from M10 device','QC-Gate-01','10.0.3.11'),
 ('2026-10-12 16:42','B. Navarro','Approved leave application','LV-3391','10.0.14.30'),
 ('2026-10-12 14:05','N. Racho','Generated 2316 batch','AY 2025 · 412 records','10.0.14.02'),
 ('2026-10-12 09:20','P. Villanueva','Posted journal entries to SAP','JE-2026-10-204','10.0.9.17');
