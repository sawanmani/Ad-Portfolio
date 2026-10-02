// Single source of truth for ALL copy, links & content.
// Edit personal text ONLY here — never inside components.

export const profile = {
  name: 'Adarsh Mani Tripathi',
  wordmark: 'A.D.A.R.S.H',
  role: 'Software Engineer · Web · AI/ML · QA',
  status: 'Now building · Open to opportunities',
  headline: {
    line1: 'Building things',
    accent: 'people use.', // italic serif yellow accent word
  },
  intro:
    'CSE undergraduate blending frontend engineering, applied AI/ML and quality-focused development — I build responsive, scalable web apps and thoughtful, data-driven experiences.',
  badge: 'PORTFOLIO / 2026',
  primaryCta: { label: 'Hire me', href: '#contact' },
  secondaryCta: { label: 'Watch my work', href: '#projects' },
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const socials = {
  email: 'mailto:adarshmtripathi@zohomail.in',
  github: 'https://github.com/sawanmani',
  linkedin: 'https://www.linkedin.com/in/adarsh-mani-tripathi',
};

export const heroImage = {
  cutout: '/images/hero-cutout.png',
  cutoutHover: '/images/hero-cutout-hover.png',
  cardBg: '/images/hero-card-bg.png',
  alt: 'Portrait of Adarsh Mani Tripathi',
  captionName: 'Adarsh Mani Tripathi',
  captionRole: 'Software Engineer · Web · AI/ML · QA',
};

export const about = {
  bio: 'I’m Adarsh Mani Tripathi — a Computer Science Engineering undergraduate with hands-on experience across frontend web development, applied machine learning and software quality. I build responsive, scalable web apps with JavaScript, React and Angular, integrate REST APIs, and experiment with ML using Python, TensorFlow and Google Cloud Vertex AI — always with a debugger-and-code-review mindset.',
  stats: [
    { value: '100+', label: 'Cloud skill badges' },
    { value: '1', label: 'Published research' },
    { value: '9.0', label: 'SGPA · Distinction' },
  ],
};

export const projects = [
  {
    title: 'Commudle Sense',
    tag: 'Hack-E-Awadh · Runner-Up',
    subtitle: 'Community-sensing platform — Lucknow AI Labs hackathon build (Python)',
    href: 'https://github.com/sawanmani/Commudle-Sense',
    thumb: '/images/project-1.png',
  },
  {
    title: 'VoiceTrace',
    tag: 'SIH · 1st Rank',
    subtitle: 'Voice-first application — Smart India Hackathon internal winner (PSID 26104)',
    href: 'https://github.com/sawanmani/VoiceTrace',
    thumb: '/images/project-2.png',
  },
  {
    title: 'J.U.N.I.O.R',
    tag: 'AI Assistant',
    subtitle: 'Jarvis-style helper — Google search + YouTube Music API in live on-page widgets',
    href: 'https://github.com/sawanmani/Junior-AI-Assistant',
    thumb: '/images/project-3.png',
  },
  {
    title: "Sawan's Buddy",
    tag: 'Telegram AI Bot',
    subtitle: 'Qwen3 (via OpenRouter) answers with Supabase conversation memory, hosted on Render',
    href: 'https://github.com/sawanmani/myBuddy',
    thumb: '/images/project-4.png',
  },
  {
    title: 'ReceiptSnap',
    tag: 'AI Expense Tracker',
    subtitle: 'Smart receipt scanning — AI extracts UPI payments & merchants, auto-categorizes expenses, exports tax-ready reports for Indian freelancers',
    href: 'https://github.com/sawanmani/recieptsnap-frontend',
    thumb: '/images/project-5.png',
  },
  {
    title: 'Gcloud-Labs',
    tag: 'Google Cloud',
    subtitle: 'Hands-on Google Cloud skill-bootcamp lab exercises & scripts',
    href: 'https://github.com/sawanmani/Gcloud-Labs',
    thumb: '/images/project-6.png',
  },
];

export const featured = {
  title: 'Featured project',
  items: projects.slice(0, 3),
};

export const skills = {
  // kind drives the category accent colour (same language as timeline dots)
  categories: [
    {
      kind: 'frontend',
      label: 'Frontend Engineering',
      items: [
        'JavaScript (ES6+)',
        'React',
        'Angular',
        'HTML5',
        'CSS3',
        'Responsive Design',
      ],
    },
    {
      kind: 'aiml',
      label: 'AI / ML',
      items: [
        'Python',
        'Machine Learning',
        'TensorFlow / Keras',
        'Vertex AI',
        'Prompt Design',
      ],
    },
    {
      kind: 'cloud',
      label: 'Cloud, Data & APIs',
      items: [
        'Google Cloud',
        'Firebase',
        'MySQL',
        'BigQuery',
        'Data Analytics',
        'REST APIs',
      ],
    },
    {
      kind: 'craft',
      label: 'Workflow & Quality',
      items: [
        'Git & GitHub',
        'CI/CD',
        'Figma',
        'Cross-Browser Testing',
        'Code Review',
      ],
    },
  ],
};

export const timeline = [
  {
    kind: 'edu',
    start: 202309,
    period: 'Sep 2023 — Jun 2027',
    title: 'B.Tech, Computer Science Engineering',
    org: 'Dr. Shakuntala Misra National Rehabilitation University (DSMNRU), Lucknow',
    desc: 'Coursework: DSA, OS, DBMS, Machine Learning, Cybersecurity & Software Engineering. First Division with Distinction (SGPA 9.0) in Semester 6.',
  },
  {
    kind: 'work',
    start: 202310,
    period: '2023 — Present',
    title: 'Frontend Web Developer',
    org: 'Freelance / Academic Projects · Lucknow',
    desc: 'Built responsive, high-performance web apps with JavaScript, HTML5, CSS3 & Angular — reusable components, REST API integration, DevTools debugging, cross-browser testing and Figma-driven UI/UX.',
  },
  {
    kind: 'work',
    start: 202404,
    period: '2024',
    title: 'Open Source Contributor',
    org: 'GirlScript Summer of Code 2024 (Extended)',
    desc: 'Selected among thousands; contributed to open-source web projects with Git/GitHub workflows — code review, pull-request evaluation and issue tracking.',
  },
  {
    kind: 'work',
    start: 202501,
    period: '2025',
    title: 'Google Cloud Arcade Facilitator',
    org: 'Google · Cohort 1 (National Program)',
    desc: 'Facilitated hands-on GCP learning (Vertex AI, Cloud Functions, Cloud Run, CI/CD), mentored peers on deployment & ML fundamentals, and earned 100+ skill badges.',
  },
  {
    kind: 'project',
    start: 202506,
    period: '2025',
    title: 'J.U.N.I.O.R — AI Assistant',
    org: 'Personal Project',
    desc: 'Built a Jarvis-style assistant that searched anything on Google and played songs via the YouTube Music API inside live on-page widgets.',
  },
  {
    kind: 'edu',
    start: 202603,
    period: 'Mar 2026',
    title: 'Research Publication — NCMPCS-2026',
    org: 'DSMNRU, Lucknow · National Conference',
    desc: 'Co-authored & presented “The Triad of Trust: Cybersecurity, Privacy and Ethical Issue in AI” on responsible AI deployment.',
  },
  {
    kind: 'award',
    start: 202608,
    period: '2026',
    title: '1st Rank — SIH Internal Hackathon',
    org: 'Smart India Hackathon · Internal Round',
    desc: 'Won 1st rank with VoiceTrace (Problem Statement ID 26104).',
  },
  {
    kind: 'award',
    start: 202609,
    period: '26 Sep 2026',
    title: 'Runner-Up — Hack-E-Awadh',
    org: 'Lucknow AI Labs · Hackathon',
    desc: 'Built Commudle Sense and finished runner-up among competing teams at Hack-E-Awadh.',
  },
];

export const contact = {
  heading: "Let's build something",
  sub: 'Open to frontend / web-development roles, internships, collaborations and open-source.',
  emailLabel: 'adarshmtripathi@zohomail.in',
};

const GC_PROFILE =
  'https://www.skills.google/public_profiles/4c5f929b-2b45-4505-ad05-154d2f03b57f';

export const certifications = [
  { year: '2026', title: 'NCMPCS-2026 — Research Paper Presentation', issuer: 'DSMNRU, Lucknow', link: '#' },
  { year: '2025', title: 'Google Cloud Arcade Facilitator — Cohort 1', issuer: 'Google Cloud', link: GC_PROFILE },
  { year: '2025', title: 'Level 3: AI Readiness', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2025', title: 'Responsible AI: Applying AI Principles', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2025', title: 'Use Machine Learning APIs on Google Cloud', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2025', title: 'Build a Data Warehouse with BigQuery', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2025', title: 'Build Serverless Apps with Cloud Run Functions', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2025', title: 'Manage Kubernetes in Google Cloud', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2025', title: 'Gemini for Data Scientists & Analysts', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2024', title: 'Introduction to Generative AI', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2024', title: 'Level 1: Application Development & Deployment', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2024', title: 'Level 2: Machine Learning and AI Skills', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2024', title: 'Derive Insights from BigQuery Data', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2024', title: 'Implement Cloud Security Fundamentals', issuer: 'Google Cloud Skills Boost', link: GC_PROFILE },
  { year: '2024', title: 'Data Analytics Job Simulation', issuer: 'Deloitte Australia / Forage', link: '#' },
];

export const credentialsLink = {
  href: GC_PROFILE,
  label: 'View all 100+ badges on my Google Cloud Skills Boost profile →',
};

export const footer = {
  note: 'Designed & built by Adarsh Mani Tripathi — 2026.',
  backToTop: 'Back to top ↑',
};
