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
  /** Paper abstract. Dummy for now; falls back to a default in the accessor. */
  abstract?: string;
};

export const publications: Publication[] = [
  {
    title: "Pose-Based Action Recognition in Tennis Using MediaPipe and LSTM",
    year: "2025",
    venue: "IJoICT",
    publisher: "Telkom University",
    authors: "Walid Hanif Ataullah, Isa Mulia Insan, Sheina Fathur Rahman",
    role: "1st Author",
    indexing: "SINTA 3",
    tags: ["MediaPipe", "LSTM", "Deep learning", "Computer vision", "Pose Classification"],
    abstract:
      "Pose recognition in tennis is an essential aspect for analyzing playing techniques and evaluating athlete performance. This study develops a tennis pose recognition system that integrates MediaPipe for pose feature extraction with Long Short-Term Memory (LSTM) networks for movement classification. The research dataset consists of 2,010 images of tennis movements across four categories: backhand, forehand, ready position, and serve, annotated in COCO format. MediaPipe successfully extracted pose landmarks from 1,782 images (88.7%), generating 33 pose landmarks flattened into a 99-dimensional feature vector. The LSTM model is designed with a 3-layer LSTM architecture and 2 dense layers, trained using a stratified train-test split with an 80:20 ratio. Model evaluation uses various metrics including accuracy, precision, recall, and F1-score. The results show that the system achieves 90.20% accuracy, with the best performance in the ready position category (F1-score: 91.28%) and the lowest in the forehand category (F1-score: 88.89%). The model demonstrates good computational efficiency with a memory footprint of 714.39 KB, enabling deployment on mobile devices. This study contributes to the development of automated sports analysis systems and demonstrates the feasibility of integrating MediaPipe-LSTM for real-time tennis pose recognition applications.",
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
    tags: ["Design Thinking", "Coffee Shop", "System Usability Scale", "Scheduling System"],
    abstract:
      "Efficient shift scheduling is essential for optimizing operations in multi-branch coffee shops. This study focuses on improving the barista shift scheduling system at Coffee Shop XYZ using a technology-driven approach informed by Design Thinking principles. The current rotation-based system fails to adapt quickly to fluctuating customer demands and staff availability, leading to inefficiencies and reduced staff satisfaction. This research introduces a flexible, user-centered shift scheduling system that accounts for individual barista preferences, branch proximity, and operational needs across multiple branches. The system incorporates a cloud-based platform that facilitates real-time scheduling, ensuring better communication and workflow management. Through iterative Design Thinking phases—Empathize, Define, Ideate, Prototype, and Test—this study designs and tests the system, achieving a high usability score of 87.3 on the System Usability Scale (SUS), indicating strong user satisfaction and operational effectiveness. This innovative system not only enhances scheduling efficiency but also significantly improves barista job satisfaction, offering valuable insights for operational management in the coffee shop industry.",
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
    tags: ["DeepLabv3", "deep learning", "fish detection", "MobileNetV3", "semantic segmentation"],
    abstract:
      "Semantic segmentation of objects in aquatic environments remains underexplored, particularly in scenarios involving real-time processing on resource-constrained devices. Existing methods often struggle with varying lighting conditions, water clarity, and diverse object shapes and sizes, limiting their effectiveness in practical applications. Addressing this gap, this research aims to develop an efficient and accurate semantic segmentation model for fish detection in aquatic environments, optimized for low-resource hardware. We employ the DeepLabv3 architecture with a MobileNetV3 backbone to achieve a balance between performance and computational efficiency. The dataset comprises 390 fish images captured under diverse aquarium conditions, split into 80% training and 20% validation sets. The model is trained over 30 epochs using a combination of binary cross-entropy and Dice loss functions, optimized with the Adam optimizer at a learning rate of 0.0001. Experimental results demonstrate robust performance, achieving a Dice Score of 0.6853, Intersection over Union (IoU) of 0.5605, Pixel Accuracy of 0.9550, Precision of 0.7286, Recall of 0.6879, and an F1 Score of 0.6853. The model’s average inference time is 379.52 milliseconds per image. These findings suggest the proposed approach is well-suited for real-time applications on edge or embedded systems in aquatic monitoring tasks.",
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
    tags: ["agile scrum", "frontend development", "react.js", "research dashboard", "web application performance"],
    abstract:
      "Developing effective web-based information systems is essential in today’s digital era. This study presents the frontend design and implementation of a research dashboard for the Directorate of Research and Community Service (PPM) at Telkom University, using Agile Scrum and React. The development was organized into four iterative sprints, allowing continuous refinement based on user feedback. Google Chrome Lighthouse was employed to evaluate performance, accessibility, SEO, and adherence to best practices. Results show consistently high Best Practices (up to 96) and SEO (around 83) scores, with Accessibility mostly between 87 and 95. However, Performance scores were lower, ranging from 35 to 44, primarily due to local asset usage and unused library components. This study demonstrates that combining Agile Scrum with React enhances development efficiency and adaptability, while highlighting the need for performance optimization. The dashboard’s novelty lies in its institutional focus, providing tailored insights for PPM and offering a replicable evaluation framework for academic web applications.",
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
    tags: ["zoo health management", "veterinary services", "Extreme Programming (XP)", "black box testing"],
    abstract:
      "This paper presents the design and development of a digital health management application for zoos, created to address persistent challenges in maintaining complete and reliable animal health records in facilities without in-house veterinarians. The application unifies medical history, clinical notes, examination scheduling, and invoice management within a single, role-based platform to improve efficiency, accuracy, and continuity of care. Built using the Extreme Programming (XP) methodology, the system emphasizes short iterations, continuous integration, rapid feedback, and active user participation from zookeepers, administrators, and external veterinarians. Key features include QR-coded animal identification, appointment reminders, structured examination templates, attachment support for laboratory results, configurable billing items, and audit logging for traceability. Basic security controls authentication, authorization, and encrypted data at rest and in transit were incorporated to safeguard sensitive information. Black box testing of core modules (user authentication, inspection data entry, scheduling, and invoice processing) yielded a 100% pass rate against predefined test cases. Quantitatively, the streamlined workflows reduced operational delays and decreased transcription errors in medical recordkeeping, while dashboards improved oversight of pending examinations and outstanding invoices. Qualitatively, user acceptance testing confirmed that the application met the defined acceptance criteria and better aligned daily tasks with standard operating procedures. Overall, the system demonstrates how an XP-driven, user-centered approach can enhance zoo operations, support veterinary care continuity with limited on-site expertise, and improve documentation quality and payment management, providing a scalable foundation for future interoperability with laboratory information systems and national animal health reporting.",
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
    tags: ["GPS tracking", "bird monitoring", "real-time system", "behavioral research"],
    abstract:
      "Bird tracking has become increasingly important in both ecological studies and behavioral research, especially for species that cover wide areas during flight. This study presents the development and evaluation of a GPS-based monitoring device designed to track birds in real time, offering a solution applicable to both scientific and behavioral studies. The system integrates a lightweight GPS module, microcontroller, and GSM-based transmission to relay location data to a web-based interface. Once activated, the device automatically transmits the bird’s geolocation to a cloud platform with Google Maps integration using a preformatted messaging protocol. Experimental testing showed that the device consumes an average of 7.8 watts, allowing for approximately 4.1 hours of continuous operation per full battery cycle. Accuracy tests revealed a mean positional error of 10.23 meters, while data transmission latency averaged 0.2 seconds from data transmission to display in the dashboard. Although the system was tested on drones which represent birds, the device’s portability and reliability make it suitable for a broader range of bird monitoring applications in conservation. These results demonstrate that the proposed system offers an effective and scalable approach to real-time bird tracking and habitat observation.",
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
    tags: ["UAV", "MAVLink", "4G LTE", "Cube Orange", "wireless communication", "network performance"],
    abstract:
      "This study aims to analyze the performance and reliability of a UAV control system based on the Cube Orange flight controller using a 4G LTE network and the MAVLink protocol. The testing was conducted in two types of environments: urban and rural (Haurcucuk, West Bandung), with communication parameters measured including RSRP, throughput, latency, and handover success rate. Data were collected from flight logs and analyzed using Mission Planner and ArduPlot. The results indicate that the average throughput ranged between 18‒21 kbps, latency varied from 60 to 130 ms, and RSRP values ranged from −98 to −80 dBm. In the urban environment, handovers were successfully executed without connection interruptions. In contrast, in the rural area, although no handovers occurred, the system maintained stable MAVLink connectivity. These findings demonstrate that LTE networks can reliably support long-range UAV communication, provided that mission planning accounts for network coverage conditions.",
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
    tags: ["semantic segmentation", "smoke detection", "e-cigarette", "DeepLabv3", "multi-purpose security camera"],
    abstract:
      "Smoke detection with alarm sensors is often less effective because it has a limited range and cannot distinguish cigarette smoke, vaping, or other types of smoke. At the same time, semantic segmentation offers a more comprehensive solution for detecting cigarette and e-cigarette smoke. However, detecting e-cigarette smoke specifically using semantic segmentation presents a research opportunity. To address this issue, this study proposes a new approach for detecting cigarette and e-cigarette smoke based on the shape of the smoke using semantic segmentation with the lightweight DeepLabv3 architecture and MobileNetV2 backbone. First, we downloaded the smoke semantic segmentation dataset from Kaggle called “GOES16 Wildfires Smoke Plumes Dataset”. Then, we designed and tested the semantic segmentation with the DeepLabv3 model and compared J-statistics and G-mean optimization. In the next step, we developed a multi-purpose security camera design that can perform surveillance while detecting e-cigarette smoke in a certain area. Finally, we tested our semantic segmentation model on several e-cigarette smoke images and several images that did not contain e-cigarette smoke. We use several metrics, such as sensitivity, specificity, dice, and pixel accuracy. The test results show that the ROC from the training results of the semantic segmentation model on the smoke dataset has an AUC of 0.90. J-statistics and G-mean produce two different optimum threshold values, 0.52 and 0.55, respectively. It turns out that the optimized model with a threshold from G-mean has better sensitivity, dice, and pixel accuracy values than J-statistics, with values of 0.80, 0.85, 0.86, and 0.77, respectively.",
    link: "https://ieeexplore.ieee.org/abstract/document/10913184",
  },
];

/** Title → URL-safe slug, capped so very long paper titles stay tidy. */
export function publicationSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .slice(0, 8)
    .join("-");
}

const DEFAULT_ABSTRACT =
  "This study presents the design, implementation, and evaluation of the proposed approach, detailing the methodology, experimental setup, and results. The findings demonstrate the effectiveness of the method and its potential applications, alongside a discussion of limitations and directions for future work.";

/**
 * Journal vs conference, used to label the venue on the detail page.
 *
 * Two signals, because the venue string alone is not enough once trimmed to a
 * bare name like "IJoICT": SINTA is an Indonesian journal accreditation (journals
 * only, never conference proceedings), and any leftover volume/issue/page markers
 * or a "journal" in the name. Conferences here are Scopus-indexed "ICxxxx YYYY".
 */
function classifyVenue(venue: string, indexing: string): "Journal" | "Conference" {
  const journalish =
    /\bsinta\b/i.test(indexing) || /\b(vol|no|pp)\.|journal|jurnal/i.test(venue);
  return journalish ? "Journal" : "Conference";
}

/** A publication with derived fields resolved — safe to render directly. */
export type PublicationDetail = Publication & {
  slug: string;
  abstract: string;
  venueKind: "Journal" | "Conference";
};

export function getPublicationDetail(pub: Publication): PublicationDetail {
  return {
    ...pub,
    slug: publicationSlug(pub.title),
    abstract: pub.abstract ?? DEFAULT_ABSTRACT,
    venueKind: classifyVenue(pub.venue, pub.indexing),
  };
}

/** Look a publication up by slug for the detail route. Undefined = 404. */
export function getPublicationBySlug(slug: string): PublicationDetail | undefined {
  const match = publications.find((p) => publicationSlug(p.title) === slug);
  return match ? getPublicationDetail(match) : undefined;
}

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
