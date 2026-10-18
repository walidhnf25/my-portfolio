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
    "Highly motivated to pursue advanced studies and to develop impactful, technology-driven solutions for societal and industrial challenges, bridging the gap between human needs and technological innovation.",
  quote:
    "Technology is not just about code. It's about solving real problems and creating meaningful impact.",
};

export const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
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
  /** Drives the placeholder shape on the detail page: landscape vs. phone. */
  platform?: "web" | "mobile";
  /** My role on the project. Optional; falls back to a default in the accessor. */
  role?: string;
  /**
   * Gallery captions. Dummy for now — each drives a generated placeholder on the
   * detail page, so no image files are needed until real screenshots exist.
   * Omit to get a sensible default set.
   */
  gallery?: string[];
  /** One-paragraph summary of what I built on the project. */
  contribution?: string;
};

export const projects: Project[] = [
  {
    title: "APJ Gate",
    contribution:
      "Designed and engineered the executive energy audit feature for a street lighting management platform using Angular and Node.js (Serverless Framework), implementing calculation logic for ESG metrics, TCOO (12-year), and investment efficiency.",
    date: "Apr 2026",
    description:
      "Web-based monitoring and management system for public street lighting, supporting operational control, energy optimization, and maintenance efficiency. Built the executive energy audit feature analyzing consumption, cost efficiency, TCOO, and ESG impact.",
    technologies: ["Angular", "Node.js", "Serverless"],
    link: "https://console-dev.stroomer.co.id/sign-in",
    platform: "web",
    role: "Fullstack Developer (Internship)",
    category: "Energy & Utilities",
    featured: true,
  },
  {
    title: "Prabayar Pintar (Prapin)",
    contribution:
      "Enhanced a Flutter-based mobile energy management app by restructuring device onboarding workflows, redesigning smart meter input interfaces, and implementing IoT connectivity features (Bluetooth, Wi-Fi, handshaking) alongside OpenWeather API integration.",
    date: "Apr 2026",
    description:
      "Mobile app to monitor, manage, and optimize household electricity usage through real-time tracking, smart device integration, and seamless token top-up. Implemented IoT connectivity: Bluetooth pairing, Wi-Fi configuration, and handshaking protocols.",
    technologies: ["Flutter", "IoT", "Bluetooth", "Wi-Fi", "OpenWeather API"],
    link: "https://play.google.com/store/apps/details?id=id.co.stroomer.mobile",
    platform: "mobile",
    role: "Fullstack Developer (Internship)",
    category: "Energy & Utilities",
    featured: true,
  },
  {
    title: "Trafacomm",
    contribution:
      "Developed a mobile frontend using Flutter and RESTful APIs to support real-time transformer asset management, field installation workflows, and remote tracking configurations.",
    date: "Mar 2026",
    description:
      "Transformer Advanced Commissioning is a mobile app supporting transformer monitoring, tracking, and field installation through structured, integrated asset-management workflows.",
    technologies: ["Flutter", "REST API", "Asset Management"],
    link: "https://play.google.com/store/apps/details?id=id.stroomer.trafacomm.up3",
    platform: "mobile",
    role: "Fullstack Developer (Internship)",
    category: "Energy & Utilities",
  },
  {
    title: "GPS Tracker",
    contribution:
      "Developed a web-based real-time GPS tracking system using Angular and Node.js Serverless Framework, enabling multi-device monitoring, live location tracking, and historical data filtering.",
    date: "Feb 2026",
    description:
      "Web dashboard to monitor and track device locations in real time, with multi-device management, location history, and tracking-data filtering built on the Serverless Framework and Angular.",
    technologies: ["Angular", "Node.js", "Serverless", "GPS"],
    link: "https://gpstracker.stroomer.co.id",
    platform: "web",
    role: "Fullstack Developer (Internship)",
    category: "Fleet & Tracking",
  },
  {
    title: "Stroomer Company Website",
    contribution:
      "Upgraded corporate platform features using Astro, Node.js (Serverless), and Sanity CMS; engineered backend APIs for automated recruitment hiring workflows, CV uploads, and automated email notifications via Nodemailer.",
    date: "Dec 2025",
    description:
      "Corporate website promoting company services, products, and career opportunities. Built contact and recruitment features (job listings, CV upload, and email automation) with Astro, Serverless, and Sanity CMS.",
    technologies: ["Astro", "Node.js", "Serverless", "Sanity CMS", "Nodemailer"],
    link: "https://stroomer.co.id",
    platform: "web",
    role: "Fullstack Developer (Internship)",
    category: "Corporate",
  },
  {
    title: "Palm Oil Machine Analytics",
    contribution:
      "Developed a real-time web analytics dashboard using Laravel integrated with computer vision to ingest, visualize, and monitor machine parameters for automated anomaly detection.",
    date: "Aug 2025",
    description:
      "Real-time and historical analytics dashboard for palm oil processing machines, integrating computer vision to analyze operational parameters and support anomaly detection.",
    technologies: ["Laravel", "Computer Vision"],
    link: "https://jurnalptpn.teluapp.org",
    platform: "web",
    role: "Research Assistant",
    category: "Analytics",
    featured: true,
  },
  {
    title: "E-Laman Hati",
    contribution:
      "Led a student development team using Agile Scrum to redevelop a mobile animal health management system for the Bandung City Government (DKPP), covering registration and vaccination tracking.",
    date: "Jul 2025",
    description:
      "Digital platform built with DKPP Bandung City for animal health data management: registration, monitoring, vaccination tracking, and public reporting. Led a student team using Agile Scrum.",
    technologies: ["Agile Scrum", "Mobile"],
    link: "https://bit.ly/e-lamanhatiapk",
    platform: "mobile",
    role: "Research Assistant",
    category: "Government",
  },
  {
    title: "Kacir FnB",
    contribution:
      "Served as Agile Scrum Lead for the development of a mobile Point-of-Sale (POS) application, implementing transaction processing, multi-outlet management, and automated sales reporting features.",
    date: "Jul 2025",
    description:
      "Mobile point-of-sale (POS) app streamlining sales transactions, payment processing, and business operations with integrated reporting and multi-outlet management.",
    technologies: ["Agile Scrum", "POS", "Mobile"],
    link: "https://bit.ly/kacirfnbapk",
    platform: "mobile",
    role: "Research Assistant",
    category: "Business",
  },
  {
    title: "Hadir.In",
    contribution:
      "Enhanced a web-based organizational attendance tracking platform using Laravel and MySQL, implementing dynamic forms and automated PDF reporting to boost administrative efficiency.",
    date: "Jun 2025",
    description:
      "Web platform to streamline meeting and attendance management, with configurable form submission, attendance tracking, real-time monitoring, and automated PDF reporting.",
    technologies: ["Laravel", "MySQL", "PDF"],
    link: "https://hadirin.teluapp.org/login",
    platform: "web",
    role: "Research Assistant",
    category: "Business",
  },
  {
    title: "DKPP Store",
    contribution:
      "Developed a web application portal using Laravel and MySQL for Bandung City's DKPP to showcase and provide centralized public access to digital innovations in food security.",
    date: "Apr 2025",
    description:
      "Application portal for DKPP Bandung City to manage, distribute, and showcase digital innovation solutions in agriculture and food security for public and stakeholders.",
    technologies: ["Laravel", "MySQL"],
    link: "https://dkpp-store.teluapp.org",
    platform: "web",
    role: "Research Assistant",
    category: "Government",
  },
  {
    title: "E-Buruan Sae Dashboard",
    contribution:
      "Upgraded an urban farming web dashboard using CodeIgniter and MySQL, implementing data management features for harvest prediction and agricultural distribution tracking.",
    date: "Mar 2025",
    description:
      "Dashboard for DKPP Bandung City managing agricultural data: harvest recording, prediction, and distribution tracking for urban farming programs.",
    technologies: ["CodeIgniter", "MySQL", "Prediction"],
    link: "https://buruansae-dashboard.matradipti.org/login",
    platform: "web",
    role: "Research Assistant",
    category: "Government",
  },
  {
    title: "Jadwal.in",
    contribution:
      "Engineered a multi-outlet workforce shift planning web system using Laravel and MySQL to optimize shift coordination, approval workflows, and real-time retail operational efficiency.",
    date: "Jan 2025",
    description:
      "Barista schedule-management system for multi-outlet workforce management, with flexible shift planning, approval workflows, and real-time coordination.",
    technologies: ["Laravel", "MySQL", "Scheduling"],
    link: "https://shift.matradipti.org",
    platform: "web",
    role: "Research Assistant",
    category: "Business",
  },
  {
    title: "SIMONA",
    contribution:
      "Designed and built a local government web platform using Laravel and MySQL to manage non-civil servant workforce data and optimize administrative record tracking.",
    date: "Aug 2024",
    description:
      "Non-ASN employee management system for Tangerang Regency local government, managing non-civil-servant workforce data and profiles to improve administrative efficiency.",
    technologies: ["Laravel", "MySQL"],
    link: "https://simona.tangerangkab.my.id/panel",
    platform: "web",
    role: "Fullstack Developer (Internship)",
    category: "Government",
  },
];

/** Title → URL-safe slug. "Prabayar Pintar (Prapin)" → "prabayar-pintar-prapin". */
export function projectSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Fallbacks live in one place, so every consumer sees the same shape. */
const DEFAULT_ROLE = "Fullstack Engineer";
const DEFAULT_GALLERY = ["Overview", "Key screen", "Detail view", "Mobile layout"];
const DEFAULT_CONTRIBUTION =
  "Designed and shipped the core feature set end to end, from data model to production.";

/** A project with its derived fields resolved — safe to render directly. */
export type ProjectDetail = Project & {
  slug: string;
  role: string;
  gallery: string[];
  contribution: string;
  platform: "web" | "mobile";
};

export function getProjectDetail(project: Project): ProjectDetail {
  return {
    ...project,
    slug: projectSlug(project.title),
    role: project.role ?? DEFAULT_ROLE,
    gallery: project.gallery ?? DEFAULT_GALLERY,
    contribution: project.contribution ?? DEFAULT_CONTRIBUTION,
    platform: project.platform ?? "web",
  };
}

/** Look a project up by slug for the detail route. Undefined = 404. */
export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  const match = projects.find((p) => projectSlug(p.title) === slug);
  return match ? getProjectDetail(match) : undefined;
}

export const contactMethods = [
  { label: "Email", value: "walidhnf12@gmail.com", href: "mailto:walidhnf12@gmail.com", icon: "mail" },
  { label: "LinkedIn", value: "Walid Hanif Ataullah", href: socialLinks.linkedin, icon: "linkedin" },
  { label: "WhatsApp", value: "+62 822 1928 2003", href: socialLinks.whatsapp, icon: "message" },
  { label: "Location", value: "Tangerang, Indonesia", href: "#", icon: "pin" },
];
