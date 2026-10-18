// English dictionary — the source of truth for the shape every locale must match.
// Templates use {placeholders}; no functions, so it can be passed to client components.

const en = {
  meta: {
    title: "Portfolio | Walid Hanif Ataullah",
    description:
      "Bachelor's graduate in Software Engineering specializing in Information Technology Adoption, Machine Learning, Deep Learning, and Internet of Things. Explore my projects, read my engineering blog, and get in touch.",
    ogDescription:
      "Software Engineer & ML/DL Enthusiast focused on Machine Learning, Deep Learning, and IoT. Explore my projects and engineering blog.",
    twitterDescription:
      "Software Engineer & ML/DL Enthusiast focused on Machine Learning, Deep Learning, and IoT.",
    siteName: "Walid Hanif Ataullah Portfolio",
  },

  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
  },

  common: {
    backToTop: "Walid Hanif Ataullah, back to top",
    toggleTheme: "Toggle theme",
    toggleMenu: "Toggle menu",
    language: "Language",
    switchLanguage: "Switch language",
    notFoundTitle: "Page not found",
    notFoundText: "The page you are looking for does not exist.",
    goHome: "Back to home",
  },

  profile: {
    roles: ["Software Engineer", "ML/DL Enthusiast", "IoT Explorer"],
    tagline: "Building intelligent systems that bridge human needs and technology.",
    summary:
      "Bachelor's graduate in Software Engineering with strong academic and research experience in AI, Machine Learning, Deep Learning, and Internet of Things. I contribute to Scopus-indexed publications and build data-driven, AI-based solutions through interdisciplinary research and real-world engineering.",
    summarySecondary:
      "Highly motivated to pursue advanced studies and to develop impactful, technology-driven solutions for societal and industrial challenges, bridging the gap between human needs and technological innovation.",
    quote:
      "Technology is not just about code. It's about solving real problems and creating meaningful impact.",
  },

  splash: {
    hi: "Hi, I'm Walid Hanif",
    welcome: "Welcome to my Portfolio",
  },

  hero: {
    badge: "Open to collaboration",
    downloadCv: "Download CV",
    viewWork: "View Work",
    scroll: "Scroll",
    scrollToAbout: "Scroll to about",
    boatLabel:
      "A sunken wooden boat resting on the seabed, with bubbles rising and seaweed swaying",
  },

  about: {
    eyebrow: "About",
    title: "The engineer behind",
    accent: "the innovation",
    description:
      "Software engineering graduate turning research into real-world, AI-driven systems.",
    areasLabel: "Areas of Expertise",
    competenciesLabel: "Core Competencies",
    expertiseAreas: [
      "Information Technology Adoption",
      "Machine Learning & Deep Learning",
      "Internet of Things (IoT)",
      "Software Engineering",
    ],
    highlights: [
      { value: "8+", label: "Publications" },
      { value: "7", label: "Scopus Indexed" },
      { value: "14+", label: "Projects Shipped" },
      { value: "4", label: "Roles Held" },
    ],
    coreCompetencies: [
      "Software Engineering",
      "Machine Learning & Deep Learning",
      "Data-Driven Solutions",
      "AI-Based Innovation",
      "Research & Development",
    ],
  },

  projects: {
    eyebrow: "Featured Projects",
    title: "Building solutions",
    accent: "that matter",
    description:
      "A selection of production apps across energy, government, agriculture, and business.",
    previous: "Previous",
    next: "Next",
    goToSlide: "Go to slide {n}",
    viewDetails: "View details",
    detail: {
      back: "Back to projects",
      all: "All projects",
      visit: "Visit live site",
      role: "Role — ",
      contribution: "My contribution",
      builtWith: "Built with",
      gallery: "Gallery",
      placeholder: "Placeholder",
      notFound: "Project not found",
      defaultRole: "Fullstack Engineer",
      defaultContribution:
        "Designed and shipped the core feature set end to end, from data model to production.",
      defaultGallery: ["Overview", "Key screen", "Detail view", "Mobile layout"],
    },
    /** Translatable project text, keyed by project slug. */
    items: {
      "apj-gate": {
        category: "Energy & Utilities",
        role: "Fullstack Developer (Internship)",
        description:
          "Web-based monitoring and management system for public street lighting, supporting operational control, energy optimization, and maintenance efficiency. Built the executive energy audit feature analyzing consumption, cost efficiency, TCOO, and ESG impact.",
        contribution:
          "Designed and engineered the executive energy audit feature for a street lighting management platform using Angular and Node.js (Serverless Framework), implementing calculation logic for ESG metrics, TCOO (12-year), and investment efficiency.",
      },
      "prabayar-pintar-prapin": {
        category: "Energy & Utilities",
        role: "Fullstack Developer (Internship)",
        description:
          "Mobile app to monitor, manage, and optimize household electricity usage through real-time tracking, smart device integration, and seamless token top-up. Implemented IoT connectivity: Bluetooth pairing, Wi-Fi configuration, and handshaking protocols.",
        contribution:
          "Enhanced a Flutter-based mobile energy management app by restructuring device onboarding workflows, redesigning smart meter input interfaces, and implementing IoT connectivity features (Bluetooth, Wi-Fi, handshaking) alongside OpenWeather API integration.",
      },
      trafacomm: {
        category: "Energy & Utilities",
        role: "Fullstack Developer (Internship)",
        description:
          "Transformer Advanced Commissioning is a mobile app supporting transformer monitoring, tracking, and field installation through structured, integrated asset-management workflows.",
        contribution:
          "Developed a mobile frontend using Flutter and RESTful APIs to support real-time transformer asset management, field installation workflows, and remote tracking configurations.",
      },
      "gps-tracker": {
        category: "Fleet & Tracking",
        role: "Fullstack Developer (Internship)",
        description:
          "Web dashboard to monitor and track device locations in real time, with multi-device management, location history, and tracking-data filtering built on the Serverless Framework and Angular.",
        contribution:
          "Developed a web-based real-time GPS tracking system using Angular and Node.js Serverless Framework, enabling multi-device monitoring, live location tracking, and historical data filtering.",
      },
      "stroomer-company-website": {
        category: "Corporate",
        role: "Fullstack Developer (Internship)",
        description:
          "Corporate website promoting company services, products, and career opportunities. Built contact and recruitment features (job listings, CV upload, and email automation) with Astro, Serverless, and Sanity CMS.",
        contribution:
          "Upgraded corporate platform features using Astro, Node.js (Serverless), and Sanity CMS; engineered backend APIs for automated recruitment hiring workflows, CV uploads, and automated email notifications via Nodemailer.",
      },
      "palm-oil-machine-analytics": {
        category: "Analytics",
        role: "Research Assistant",
        description:
          "Real-time and historical analytics dashboard for palm oil processing machines, integrating computer vision to analyze operational parameters and support anomaly detection.",
        contribution:
          "Developed a real-time web analytics dashboard using Laravel integrated with computer vision to ingest, visualize, and monitor machine parameters for automated anomaly detection.",
      },
      "e-laman-hati": {
        category: "Government",
        role: "Research Assistant",
        description:
          "Digital platform built with DKPP Bandung City for animal health data management: registration, monitoring, vaccination tracking, and public reporting. Led a student team using Agile Scrum.",
        contribution:
          "Led a student development team using Agile Scrum to redevelop a mobile animal health management system for the Bandung City Government (DKPP), covering registration and vaccination tracking.",
      },
      "kacir-fnb": {
        category: "Business",
        role: "Research Assistant",
        description:
          "Mobile point-of-sale (POS) app streamlining sales transactions, payment processing, and business operations with integrated reporting and multi-outlet management.",
        contribution:
          "Served as Agile Scrum Lead for the development of a mobile Point-of-Sale (POS) application, implementing transaction processing, multi-outlet management, and automated sales reporting features.",
      },
      "hadir-in": {
        category: "Business",
        role: "Research Assistant",
        description:
          "Web platform to streamline meeting and attendance management, with configurable form submission, attendance tracking, real-time monitoring, and automated PDF reporting.",
        contribution:
          "Enhanced a web-based organizational attendance tracking platform using Laravel and MySQL, implementing dynamic forms and automated PDF reporting to boost administrative efficiency.",
      },
      "dkpp-store": {
        category: "Government",
        role: "Research Assistant",
        description:
          "Application portal for DKPP Bandung City to manage, distribute, and showcase digital innovation solutions in agriculture and food security for public and stakeholders.",
        contribution:
          "Developed a web application portal using Laravel and MySQL for Bandung City's DKPP to showcase and provide centralized public access to digital innovations in food security.",
      },
      "e-buruan-sae-dashboard": {
        category: "Government",
        role: "Research Assistant",
        description:
          "Dashboard for DKPP Bandung City managing agricultural data: harvest recording, prediction, and distribution tracking for urban farming programs.",
        contribution:
          "Upgraded an urban farming web dashboard using CodeIgniter and MySQL, implementing data management features for harvest prediction and agricultural distribution tracking.",
      },
      "jadwal-in": {
        category: "Business",
        role: "Research Assistant",
        description:
          "Barista schedule-management system for multi-outlet workforce management, with flexible shift planning, approval workflows, and real-time coordination.",
        contribution:
          "Engineered a multi-outlet workforce shift planning web system using Laravel and MySQL to optimize shift coordination, approval workflows, and real-time retail operational efficiency.",
      },
      simona: {
        category: "Government",
        role: "Fullstack Developer (Internship)",
        description:
          "Non-ASN employee management system for Tangerang Regency local government, managing non-civil-servant workforce data and profiles to improve administrative efficiency.",
        contribution:
          "Designed and built a local government web platform using Laravel and MySQL to manage non-civil servant workforce data and optimize administrative record tracking.",
      },
    } as Record<string, { category: string; role: string; description: string; contribution: string }>,
  },

  blog: {
    eyebrow: "Blog",
    title: "Notes on building",
    accent: "better software",
    description:
      "Short reads on clean code, production readiness, and scalability.",
    metaTitle: "Blog | Walid Hanif Ataullah",
    allPosts: "All posts",
    readArticle: "Read article",
    minRead: "{n} min read",
    backHome: "Back to home",
    notFound: "Post not found",
    detail: {
      back: "Back to blog",
      all: "All posts",
      contents: "On this page",
      takeaway: "Takeaway",
      closingQuestion: "Question for you",
      viewSlides: "View {n} slides",
      openSlides: "Open slides: {title} ({n} slides)",
      titleSlide: "Title slide: {title}",
    },
    viewer: {
      slidesLabel: "{title} — slides",
      close: "Close slides",
      previous: "Previous slide",
      next: "Next slide",
      goTo: "Go to slide {n}",
      slideAlt: "Slide {n} of {total}",
      swipeHint: "Swipe to browse",
      desktopHint: "Drag, use ← → keys, or click a thumbnail · Esc to close",
    },
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's build something",
    accent: "together",
    description:
      "Have a project, research collaboration, or opportunity in mind? My inbox is always open.",
    methods: {
      email: "Email",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      location: "Location",
    },
    form: {
      name: "Name *",
      namePlaceholder: "Your name",
      email: "Email *",
      emailPlaceholder: "you@email.com",
      subject: "Subject",
      subjectPlaceholder: "Collaboration opportunity",
      message: "Message *",
      messagePlaceholder: "Tell me about it...",
      send: "Send message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successText: "Thanks for reaching out. I'll get back to you as soon as possible.",
      sendAnother: "Send another message",
      errorRequired: "Name, email, and message are required.",
      errorGeneric: "Something went wrong. Please try again.",
    },
  },

  footer: {
    navigate: "Navigate",
    connect: "Connect",
    rights: "All rights reserved.",
    builtWith: "Built with Next.js · Three.js · Framer Motion",
  },
};

export default en;
export type Dictionary = typeof en;
