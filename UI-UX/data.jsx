/* Mock data for the Atlas prototype */

const APP_DATA = {
  user: {
    name: 'Dr. Priya Menon',
    role: 'IR Director',
    initials: 'PM',
    institution: 'Tagore Institute of Technology'
  },

  kpis: [
    { label: 'Outbound students', value: 412, change: '+18%', spark: [3,5,4,7,8,6,9,11] },
    { label: 'Incoming students', value: 289, change: '+24%', spark: [2,3,4,5,4,6,7,9] },
    { label: 'Active MoUs', value: 67, change: '+5', spark: [5,5,6,6,7,7,7,7] },
    { label: 'Visa approval rate', value: '94%', change: '+2pt', spark: [8,7,9,8,9,9,10,10] }
  ],

  countries: [
    { flag: '🇩🇪', code: 'DEU', name: 'Germany',   students: 78, growth: 12 },
    { flag: '🇬🇧', code: 'GBR', name: 'United Kingdom', students: 64, growth: 8  },
    { flag: '🇨🇦', code: 'CAN', name: 'Canada',    students: 52, growth: 22 },
    { flag: '🇺🇸', code: 'USA', name: 'United States',  students: 47, growth: -3 },
    { flag: '🇦🇺', code: 'AUS', name: 'Australia', students: 38, growth: 15 },
    { flag: '🇸🇬', code: 'SGP', name: 'Singapore', students: 29, growth: 6  },
    { flag: '🇯🇵', code: 'JPN', name: 'Japan',     students: 21, growth: 28 },
    { flag: '🇫🇷', code: 'FRA', name: 'France',    students: 19, growth: 4  }
  ],

  pipeline: [
    { stage: 'Applied',         n: 124, color: 'ink' },
    { stage: 'Under review',    n: 86,  color: 'plum' },
    { stage: 'Interview',       n: 41,  color: 'sage' },
    { stage: 'Offer received',  n: 58,  color: 'clay' },
    { stage: 'Visa approved',   n: 39,  color: 'sage' },
    { stage: 'Enrolled',        n: 27,  color: 'ink' }
  ],

  students: [
    { id: 'STU-4012', name: 'Aanya Krishnan',  program: 'M.Sc. Data Science', dest: 'TU München, DE',          stage: 'Visa approved',   status: 'ok',   docs: 0.92, intake: 'Fall 2026' },
    { id: 'STU-3987', name: 'Rohan Mehta',     program: 'B.Eng Exchange',     dest: 'University of Toronto, CA', stage: 'Offer received',  status: 'warn', docs: 0.78, intake: 'Spring 2026' },
    { id: 'STU-3940', name: 'Saanvi Iyer',     program: 'MBA Dual Degree',    dest: 'ESSEC, FR',                stage: 'Interview',       status: 'ok',   docs: 0.85, intake: 'Fall 2026' },
    { id: 'STU-3902', name: 'Kabir Sharma',    program: 'Research Fellowship', dest: 'Kyoto University, JP',     stage: 'Under review',    status: 'ok',   docs: 0.66, intake: 'Winter 2026' },
    { id: 'STU-3866', name: 'Tara Banerjee',   program: 'Summer School',      dest: 'NUS, SG',                  stage: 'Enrolled',         status: 'done', docs: 1.0,  intake: 'Summer 2026' },
    { id: 'STU-3821', name: 'Vikram Reddy',    program: 'Erasmus+ Mobility',  dest: 'KU Leuven, BE',            stage: 'Applied',          status: 'ok',   docs: 0.42, intake: 'Fall 2026' },
    { id: 'STU-3784', name: 'Meera Pillai',    program: 'M.A. International Affairs', dest: 'Sciences Po, FR',  stage: 'Offer received',   status: 'warn', docs: 0.71, intake: 'Fall 2026' },
    { id: 'STU-3750', name: 'Aarav Nair',      program: 'Internship',          dest: 'ETH Zürich, CH',          stage: 'Visa approved',    status: 'ok',   docs: 0.95, intake: 'Summer 2026' }
  ],

  alerts: [
    { kind: 'crit',  title: 'Visa interview tomorrow', sub: 'Aanya Krishnan — German Consulate, Mumbai',  when: '09:30 IST' },
    { kind: 'warn',  title: 'I-20 expiring in 18 days', sub: '4 outbound students — USA workflow',         when: 'Due Jun 8' },
    { kind: 'sage',  title: 'MoU renewal pending',      sub: 'Universitat de Barcelona — sign by Jun 15',  when: '6 days' },
    { kind: 'clay',  title: 'New partner inquiry',      sub: 'Trinity College Dublin — joint PhD program',  when: 'Today' }
  ],

  partners: [
    { name: 'Technical University of Munich', country: 'Germany',   tier: 'Tier I',  type: 'Exchange + Research',  status: 'active',   since: 2018, mou: 'MoU-DE-014', students: 23 },
    { name: 'University of Toronto',          country: 'Canada',    tier: 'Tier I',  type: 'Dual Degree',           status: 'active',   since: 2020, mou: 'MoU-CA-008', students: 17 },
    { name: 'ESSEC Business School',          country: 'France',    tier: 'Tier II', type: 'Dual MBA',              status: 'renewal',  since: 2017, mou: 'MoU-FR-003', students: 11 },
    { name: 'Kyoto University',               country: 'Japan',     tier: 'Tier I',  type: 'Research Lab Exchange', status: 'active',   since: 2021, mou: 'MoU-JP-012', students: 9  },
    { name: 'KU Leuven',                      country: 'Belgium',   tier: 'Tier II', type: 'Erasmus+',              status: 'active',   since: 2019, mou: 'MoU-BE-005', students: 14 },
    { name: 'National University of Singapore', country: 'Singapore', tier: 'Tier I', type: 'Summer Schools',       status: 'active',   since: 2016, mou: 'MoU-SG-001', students: 26 },
    { name: 'Trinity College Dublin',         country: 'Ireland',   tier: 'Tier II', type: 'Inquiry',               status: 'draft',    since: 2026, mou: 'Draft',      students: 0  }
  ],

  documents: [
    { name: 'Passport.pdf',           owner: 'Aanya Krishnan', type: 'Passport',     expires: '2031-04-12', status: 'verified',  size: '2.1 MB' },
    { name: 'IELTS-Scorecard.pdf',    owner: 'Aanya Krishnan', type: 'Test Score',   expires: '2027-01-22', status: 'verified',  size: '380 KB' },
    { name: 'Bank-Statement-May.pdf', owner: 'Rohan Mehta',    type: 'Financial',    expires: '2026-08-01', status: 'pending',   size: '1.7 MB' },
    { name: 'SOP-v3.docx',            owner: 'Saanvi Iyer',    type: 'SOP',          expires: '—',          status: 'reviewing', size: '52 KB'  },
    { name: 'Acceptance-Letter.pdf',  owner: 'Tara Banerjee',  type: 'Offer',        expires: '—',          status: 'verified',  size: '210 KB' },
    { name: 'Insurance-Policy.pdf',   owner: 'Kabir Sharma',   type: 'Insurance',    expires: '2026-06-30', status: 'expiring',  size: '460 KB' }
  ],

  visaQueue: [
    { student: 'Aanya Krishnan',  country: 'Germany',  stage: 'Interview',  date: '2026-05-22', prob: 96 },
    { student: 'Rohan Mehta',     country: 'Canada',   stage: 'Biometrics', date: '2026-05-25', prob: 88 },
    { student: 'Saanvi Iyer',     country: 'France',   stage: 'Filed',      date: '2026-05-28', prob: 91 },
    { student: 'Meera Pillai',    country: 'France',   stage: 'Filed',      date: '2026-06-02', prob: 84 },
    { student: 'Aarav Nair',      country: 'Switzerland', stage: 'Approved', date: '2026-05-15', prob: 100 }
  ],

  events: [
    { date: 'JUN 04', title: 'Global Education Fair 2026', tag: 'Outreach',  loc: 'Main Auditorium',    seats: '320 / 500' },
    { date: 'JUN 12', title: 'TU München Delegation Visit', tag: 'Delegation', loc: 'IR Conference Room', seats: '12 / 12'  },
    { date: 'JUN 18', title: 'Erasmus+ Information Session', tag: 'Webinar', loc: 'Online — Zoom',       seats: '187 / 300' },
    { date: 'JUN 25', title: 'Cultural Onboarding (Incoming)', tag: 'Support', loc: 'Block C, Hall 2',    seats: '48 / 60'  }
  ],

  scholarships: [
    { name: 'Erasmus+ Mobility Grant',     country: 'EU',     amt: '€850/mo', open: 41, awarded: 12 },
    { name: 'DAAD WISE',                   country: 'Germany',amt: '€1100/mo',open: 18, awarded: 6  },
    { name: 'Commonwealth Scholarship',    country: 'UK',     amt: 'Full',    open: 22, awarded: 3  },
    { name: 'MEXT Research',               country: 'Japan',  amt: '¥143k/mo',open: 9,  awarded: 2  }
  ]
};

window.APP_DATA = APP_DATA;
