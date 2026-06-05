export const siteMeta = {
  name: 'Vincent Louise Collamat',
  subtitle: 'Junior Web Developer',
  location: 'Antique, Philippines',
  email: 'collamatvincent@sac.edu.ph',
  github: 'https://github.com/maki-matcha',
  accent: '#191970',
  background: '#ECEFF1',
};

export const profileSummary = `Passionate IT Graduate specializing in Web Development, Frontend Development, UI/UX design, and systems architecture. Always eager to gain valuable insights`;

export const educationTimeline = [
  {
    title: 'IT Intern',
    subtitle: 'TechnoPH Systems & Integration Inc. • Present',
    description: 'Developing responsive UI interfaces using React and Chakra UI, including a fully functional DTR Dashboard with activity tracking.',
  },
  {
    title: 'Capstone Defended',
    subtitle: 'CAP102 • AY 2025-2026',
    description: 'Frontend role for “An IoT-based Smart Distress Signal for Fast Emergency Response in San Jose de Buenavista.”',
  },
  {
    title: 'BS Information Technology',
    subtitle: 'St. Anthony\'s College • 2021 - Present',
    description: 'Focus on Web Development, Systems Design, and modern frontend tooling.',
  },
];

export const certificates = [
  { title: 'Web Application Development Certificate', subtitle: 'St. Anthony\'s College' },
  { title: 'React & UI/UX Training', subtitle: 'TechnoPH Intern Program' },
  { title: 'Systems Design and Architecture', subtitle: 'Academic Honors' },
];

export const achievements = [
  { title: 'Region VI - Top 10 Finalist', description: 'AI.DEAS for Impact 2025', date: 'September 2025' },
  { title: 'Region VI - Top 10 Finalist', description: 'Philippine Startup Challenge 9', date: 'October 2024' },
];

export const techStack = {
  languages: [
    'JavaScript',
    'HTML5',
    'PHP',
  ],
  frontend: [
    'React',
    'Chakra UI',
    'Next.js',
    'TailwindCSS',
    'Figma',
    'Vercel',
  ],
  backend: [
    'Node.js',
    'Express',
    'MongoDB',
    'MERN stack',
  ],
};

export const featuredProjects = [
  {
    id: 'technodtr',
    title: 'TechnoDTR',
    badge: 'Completed',
    color: 'purple',
    desc: 'A daily time record system built for TechnoPH interns with roster-aware attendance, dynamic approvals, and polished analytics.',
    tech: 'React / Chakra UI',
    techColor: 'cyan.400',
    img: '/images/TechnoDTR.png',
    role: 'Solo Frontend Developer',
    duration: '3 months',
    status: 'Completed',
    overview: 'TechnoDTR is an intern-facing attendance and time record interface crafted to simplify daily check-ins, approve shifts, and surface attendance summaries in a clean, responsive experience.',
    impact: 'Improved intern attendance tracking and reduced manual DTR reconciliation by providing clear project-based summaries and faster managerial review flows.',
    features: [
      'Interactive time log entries with approval workflow',
      'Responsive dashboard for attendance insights',
      'Integration-ready UI for backend attendance services',
    ],
    screenshots: [
      { src: '/images/TechnoDTR.png', caption: 'Main dashboard with time log summary.' },
    ],
  },
  {
    id: 'react-crud',
    title: 'First CRUD using React',
    badge: 'Completed',
    color: 'purple',
    desc: 'A CRUD system for QA testers to log anomalies and manage issue details easily using React and Node.js.',
    tech: 'React / Chakra UI / Node.js',
    techColor: 'yellow.400',
    img: '/images/crudnimaki.png',
    role: 'Frontend & Backend Developer',
    duration: '2 months',
    status: 'Completed',
    overview: 'This CRUD application lets QA testers submit system anomalies, filter existing reports, and access responsive details in a modern React interface.',
    impact: 'Streamlined issue reporting through an accessible UI and reduced turnaround time for review and testing feedback.',
    features: [
      'Create, read, update, and delete issue reports',
      'Responsive listing with search and filtering',
      'Modern Chakra UI form and validation patterns',
    ],
    screenshots: [
      { src: '/images/crudnimaki.png', caption: 'Issue management interface with data controls.' },
    ],
  },
  {
    id: 'granttrack',
    title: 'GrantTrack',
    badge: 'Completed',
    color: 'purple',
    desc: 'A scholarship discovery and management platform for students, with admin controls for program organization and application tracking.',
    tech: 'MERN stack / ChakraUI',
    techColor: 'green.400',
    img: '/images/granttrack.png',
    role: 'Full-Stack Intern Developer',
    duration: '3 months',
    status: 'Completed',
    overview: 'GrantTrack connects students to scholarships, allows online applications, and gives administrators tools to manage programs efficiently.',
    impact: 'Made scholarship application tracking more visible for students and reduced admin overhead with centralized program management.',
    features: [
      'Scholarship discovery feed',
      'Application status tracking for students',
      'Admin program creation and management interface',
    ],
    screenshots: [
      { src: '/images/granttrack.png', caption: 'Student dashboard with scholarship cards.' },
    ],
  },
  {
    id: 'auxiliumai',
    title: 'AuxiliumAI',
    badge: 'Testing',
    color: 'yellow',
    desc: 'An AI-powered triage system that categorizes and prioritizes incoming support tickets for faster response in medical or IT workflows.',
    tech: 'MERN stack / Python',
    techColor: 'green.400',
    img: '/images/auxiliumAI.png',
    role: 'Research & Development Intern',
    duration: '2 months',
    status: 'Testing',
    overview: 'AuxiliumAI accelerates ticket triaging by using automated classification and prioritization, improving response efficiency for incoming support requests.',
    impact: 'Helped reduce ticket handling time by centralizing issue categorization and surfacing priority tasks more clearly to support agents.',
    features: [
      'AI-assisted ticket categorization',
      'Priority scoring for support requests',
      'Responsive triage dashboard design',
    ],
    screenshots: [
      { src: '/images/auxiliumAI.png', caption: 'AI triage dashboard with ticket priorities.' },
    ],
  },
];
