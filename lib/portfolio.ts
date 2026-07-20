// Centralized portfolio content — single source of truth for every section.

export const profile = {
  name: "Walid Hanif Ataullah",
  firstName: "Walid Hanif",
  lastName: "Ataullah",
  roles: ["Software Engineer", "ML/DL Enthusiast", "IoT Explorer"],
  tagline: "Building intelligent systems that bridge human needs and technology.",
  location: "Tangerang, Indonesia",
  email: "walidhnf12@gmail.com",
  cv: "/cv/Walid_Hanif_Ataullah_CV.pdf",
  summary:
    "Bachelor's graduate in Software Engineering with strong academic and research experience in AI, Machine Learning, Deep Learning, and Internet of Things. I contribute to Scopus-indexed publications and build data-driven, AI-based solutions through interdisciplinary research and real-world engineering.",
  summarySecondary:
    "Highly motivated to pursue advanced studies and to develop impactful, technology-driven solutions for societal and industrial challenges — bridging the gap between human needs and technological innovation.",
  quote:
    "Technology is not just about code — it's about solving real problems and creating meaningful impact.",
};

export const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/walid-hanif-ataullah25/",
  scholar: "https://scholar.google.com/citations?user=JYcwa0sAAAAJ&hl=id/",
  email: "mailto:walidhnf12@gmail.com",
  whatsapp: "https://wa.me/6282219282003",
};

export const heroStats = [
  { value: "8+", label: "Publications" },
  { value: "14+", label: "Projects" },
  { value: "50+", label: "Technologies" },
];

export const expertiseAreas = [
  "Information Technology Adoption",
  "Machine Learning & Deep Learning",
  "Internet of Things (IoT)",
  "Software Engineering",
];

export const aboutHighlights = [
  { value: "8+", label: "Publications" },
  { value: "7", label: "Scopus Indexed" },
  { value: "14+", label: "Projects Shipped" },
  { value: "4", label: "Roles Held" },
];

export const coreCompetencies = [
  "Software Engineering",
  "Machine Learning & Deep Learning",
  "Data-Driven Solutions",
  "AI-Based Innovation",
  "Research & Development",
];

export type Project = {
  title: string;
  date: string;
  description: string;
  technologies: string[];
  link: string;
  category: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "APJ Gate",
    date: "Apr 2026",
    description:
      "Web-based monitoring and management system for public street lighting, supporting operational control, energy optimization, and maintenance efficiency. Built the executive energy audit feature analyzing consumption, cost efficiency, TCOO, and ESG impact.",
    technologies: ["Angular", "Node.js", "Serverless"],
    link: "https://console-dev.stroomer.co.id/sign-in",
    category: "Energy & Utilities",
    featured: true,
  },
  {
    title: "Prabayar Pintar (Prapin)",
    date: "Apr 2026",
    description:
      "Mobile app to monitor, manage, and optimize household electricity usage through real-time tracking, smart device integration, and seamless token top-up. Implemented IoT connectivity: Bluetooth pairing, Wi-Fi configuration, and handshaking protocols.",
    technologies: ["Flutter", "REST API", "IoT", "Bluetooth"],
    link: "https://play.google.com/store/apps/details?id=id.co.stroomer.mobile",
    category: "Energy & Utilities",
    featured: true,
  },
  {
    title: "Trafacomm",
    date: "Mar 2026",
    description:
      "Transformer Advanced Commissioning — a mobile app supporting transformer monitoring, tracking, and field installation through structured, integrated asset-management workflows.",
    technologies: ["Flutter", "REST API", "Asset Management"],
    link: "https://play.google.com/store/apps/details?id=id.stroomer.trafacomm.up3",
    category: "Energy & Utilities",
  },
  {
    title: "GPS Tracker",
    date: "Feb 2026",
    description:
      "Web dashboard to monitor and track device locations in real time, with multi-device management, location history, and tracking-data filtering built on the Serverless Framework and Angular.",
    technologies: ["Angular", "Node.js", "Serverless", "GPS"],
    link: "https://gpstracker.stroomer.co.id",
    category: "Fleet & Tracking",
  },
  {
    title: "Stroomer Company Website",
    date: "Dec 2025",
    description:
      "Corporate website promoting company services, products, and career opportunities. Built contact and recruitment features — job listings, CV upload, and email automation — with Astro, Serverless, and Sanity CMS.",
    technologies: ["Astro", "Node.js", "Sanity CMS"],
    link: "https://stroomer.co.id",
    category: "Corporate",
  },
  {
    title: "Palm Oil Machine Analytics",
    date: "Aug 2025",
    description:
      "Real-time and historical analytics dashboard for palm oil processing machines, integrating computer vision to analyze operational parameters and support anomaly detection.",
    technologies: ["Laravel", "Computer Vision", "MySQL"],
    link: "https://jurnalptpn.teluapp.org",
    category: "Analytics",
    featured: true,
  },
  {
    title: "E-Laman Hati",
    date: "Jul 2025",
    description:
      "Digital platform built with DKPP Bandung City for animal health data management — registration, monitoring, vaccination tracking, and public reporting. Led a student team using Agile Scrum.",
    technologies: ["Flutter", "Agile Scrum", "Mobile"],
    link: "https://bit.ly/e-lamanhatiapk",
    category: "Government",
  },
  {
    title: "Kacir FnB",
    date: "Jul 2025",
    description:
      "Mobile point-of-sale (POS) app streamlining sales transactions, payment processing, and business operations with integrated reporting and multi-outlet management.",
    technologies: ["Flutter", "Agile Scrum", "POS"],
    link: "https://bit.ly/kacirfnbapk",
    category: "Business",
  },
  {
    title: "Hadir.In",
    date: "Jun 2025",
    description:
      "Web platform to streamline meeting and attendance management — configurable form submission, attendance tracking, real-time monitoring, and automated PDF reporting.",
    technologies: ["Laravel", "MySQL", "PDF"],
    link: "https://hadirin.teluapp.org/login",
    category: "Business",
  },
  {
    title: "DKPP Store",
    date: "Apr 2025",
    description:
      "Application portal for DKPP Bandung City to manage, distribute, and showcase digital innovation solutions in agriculture and food security for public and stakeholders.",
    technologies: ["Laravel", "MySQL"],
    link: "https://dkpp-store.teluapp.org",
    category: "Government",
  },
  {
    title: "E-Buruan Sae Dashboard",
    date: "Mar 2025",
    description:
      "Dashboard for DKPP Bandung City managing agricultural data — harvest recording, prediction, and distribution tracking for urban farming programs.",
    technologies: ["CodeIgniter", "MySQL", "Prediction"],
    link: "https://buruansae-dashboard.matradipti.org/login",
    category: "Government",
  },
  {
    title: "Jadwal.in",
    date: "Jan 2025",
    description:
      "Barista schedule-management system for multi-outlet workforce management — flexible shift planning, approval workflows, and real-time coordination.",
    technologies: ["Laravel", "MySQL", "Scheduling"],
    link: "https://shift.matradipti.org",
    category: "Business",
  },
  {
    title: "SIMONA",
    date: "Aug 2024",
    description:
      "Non-ASN employee management system for Tangerang Regency local government — managing non-civil-servant workforce data and profiles to improve administrative efficiency.",
    technologies: ["Laravel", "MySQL"],
    link: "https://simona.tangerangkab.my.id/panel",
    category: "Government",
  },
];

export type Publication = {
  title: string;
  year: string;
  venue: string;
  publisher: string;
  authors: string;
  role: string;
  indexing: string;
  tags: string[];
  link: string;
};

export const publications: Publication[] = [
  {
    title: "Pose-Based Action Recognition in Tennis Using MediaPipe and LSTM",
    year: "2025",
    venue: "IJoICT, Vol. 11, No. 2, pp. 118–135",
    publisher: "Telkom University",
    authors: "Walid Hanif Ataullah, Isa Mulia Insan, Sheina Fathur Rahman",
    role: "1st Author",
    indexing: "SINTA 3",
    tags: ["MediaPipe", "LSTM", "Pose Recognition"],
    link: "https://journals.telkomuniversity.ac.id/ijoict/article/view/9622",
  },
  {
    title:
      "Optimizing Barista Shift Scheduling in Multi-Branches Through System Development Using Design Thinking",
    year: "2025",
    venue: "ICoSEIT 2025",
    publisher: "IEEE",
    authors:
      "Walid Hanif Ataullah, Rahmat Yasirandi, Rahmat Panji Wirayudha, Arga Ramadhana, Rahmat Indra Pratama Anom, Kobthong Ladkoom",
    role: "1st Author & Presenter",
    indexing: "Scopus",
    tags: ["Design Thinking", "Scheduling", "SUS 87.3"],
    link: "https://ieeexplore.ieee.org/abstract/document/11290953",
  },
  {
    title:
      "Optimized Semantic Segmentation for Fish Detection Using DeepLabV3 and MobileNetV3 on Resource-Constrained Systems",
    year: "2025",
    venue: "ICSECS 2025",
    publisher: "IEEE",
    authors:
      "Jonathan Arya Wibowo, Walid Hanif Ataullah, Isa Mulia Insan, Sheina Fathur Rahman, Muhammad Al Makky, Rio Guntur Utomo",
    role: "2nd Author & Presenter",
    indexing: "Scopus",
    tags: ["DeepLabV3", "MobileNetV3", "Segmentation"],
    link: "https://ieeexplore.ieee.org/abstract/document/11279067",
  },
  {
    title:
      "Frontend Design and Implementation of a Research Dashboard for the PPM Directorate Using Agile Scrum",
    year: "2025",
    venue: "ICoSEIT 2025",
    publisher: "IEEE",
    authors:
      "Sheina Fathur Rahman, Walid Hanif Ataullah, Rahmat Yasirandi, Jonathan Arya Wibowo, Isa Mulia Insan, Muhamad Al Makky",
    role: "2nd Author",
    indexing: "Scopus",
    tags: ["Agile Scrum", "Dashboard", "Frontend"],
    link: "https://ieeexplore.ieee.org/abstract/document/11290847",
  },
  {
    title:
      "A Digital Solution for Zoo Health Management: Ensuring Continuity of Care Without In-House Veterinarians",
    year: "2025",
    venue: "ICoSEIT 2025",
    publisher: "IEEE",
    authors:
      "Sheina Fathur Rahman, Fernando Putra Silalahi, Rahmat Yasirandi, Muhammad Al Makky, Noor Alamsyah, Walid Hanif Ataullah",
    role: "6th Author",
    indexing: "Scopus",
    tags: ["Zoo Health", "Mobile App", "Monitoring"],
    link: "https://ieeexplore.ieee.org/abstract/document/11290765/",
  },
  {
    title:
      "Design and Implementation of a Real-Time Monitoring System for Bird Tracking Applications",
    year: "2025",
    venue: "ICSECS 2025",
    publisher: "IEEE",
    authors:
      "Jonathan Arya Wibowo, Muharman Lubis, Rio Guntur Utomo, Walid Hanif Ataullah, Sheina Fathur Rahman, Isa Mulia Insan",
    role: "4th Author",
    indexing: "Scopus",
    tags: ["GPS Tracking", "Bird Monitoring", "GSM"],
    link: "https://ieeexplore.ieee.org/abstract/document/11279236",
  },
  {
    title:
      "Performance and Reliability Analysis of 4G-Based Flight Controllers in UAV Control",
    year: "2025",
    venue: "ICCTEIE 2025",
    publisher: "IEEE",
    authors:
      "Riska Yucha Septiyanti, Rendy Munadi, Basuki Rahmat, Walid Hanif Ataullah, Athif Fadheel Atharahman, Jonathan Arya Wibowo",
    role: "4th Author",
    indexing: "Scopus",
    tags: ["4G LTE", "UAV", "MAVLink"],
    link: "https://ieeexplore.ieee.org/abstract/document/11341803",
  },
  {
    title:
      "Multi-Purpose Security Camera for E-Cigarette Smoke Detection With Semantic Segmentation",
    year: "2024",
    venue: "ICOIACT 2024",
    publisher: "IEEE",
    authors: "Walid Hanif Ataullah, Aji Gautama Putrada, Villy Satria Praditha",
    role: "1st Author & Presenter",
    indexing: "Scopus",
    tags: ["DeepLabV3", "MobileNetV2", "AUC 0.90"],
    link: "https://ieeexplore.ieee.org/abstract/document/10913184",
  },
];

export type SkillCategory = {
  title: string;
  subtitle: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    subtitle: "The Foundation",
    skills: ["Python", "Golang", "JavaScript", "TypeScript", "PHP", "SQL", "C", "C++", "C#", "R"],
  },
  {
    title: "Fullstack Development",
    subtitle: "End-to-End Solutions",
    skills: ["Flask", "Node.js", "Laravel", "CodeIgniter", "React", "Angular", "Astro", "Flutter", "MySQL", "PostgreSQL", "MongoDB", "Sanity.io"],
  },
  {
    title: "Machine & Deep Learning",
    subtitle: "AI & Intelligence",
    skills: ["PyTorch", "TensorFlow", "CNN", "LSTM", "DeepLab", "MobileNet", "Computer Vision", "Semantic Segmentation", "Model Training", "Optimization"],
  },
  {
    title: "IoT & Intelligent Systems",
    subtitle: "Connected World",
    skills: ["Embedded Programming", "Sensor Data Acquisition", "IoT-Cloud Integration", "Real-Time Monitoring"],
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Infrastructure",
    skills: ["Google Cloud", "AWS", "Firebase", "Docker", "Git", "Android Studio", "Arduino IDE", "Postman"],
  },
  {
    title: "Software Engineering",
    subtitle: "Methodology",
    skills: ["Agile", "Scrum", "Kanban", "Design Thinking", "System Design", "Unit Testing", "Integration Testing"],
  },
];

export const contactMethods = [
  { label: "Email", value: "walidhnf12@gmail.com", href: "mailto:walidhnf12@gmail.com", icon: "mail" },
  { label: "LinkedIn", value: "Walid Hanif Ataullah", href: socialLinks.linkedin, icon: "linkedin" },
  { label: "WhatsApp", value: "+62 822 1928 2003", href: socialLinks.whatsapp, icon: "message" },
  { label: "Location", value: "Tangerang, Indonesia", href: "#", icon: "pin" },
];
