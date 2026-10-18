// Locale-independent portfolio data. Everything a visitor reads in a particular
// language (summary, project descriptions, labels) lives in lib/i18n/dictionaries.

import { hasLocale, intlLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export const profile = {
  name: "Walid Hanif Ataullah",
  firstName: "Walid Hanif",
  lastName: "Ataullah",
  location: "Tangerang, Indonesia",
  email: "walidhnf12@gmail.com",
  cv: "/cv/Walid_Hanif_Ataullah_CV.pdf",
};

export const NAV_IDS = ["home", "about", "projects", "blog", "contact"] as const;
export type NavId = (typeof NAV_IDS)[number];

/**
 * Which nav item a non-home page belongs to: /en/projects/x → "projects",
 * /id/blog → "blog". Null for the home page and anything else.
 */
export function navIdForPath(pathname: string): NavId | null {
  const [, lang, section] = pathname.split("/");
  if (!lang || !hasLocale(lang)) return null;
  return section === "projects" || section === "blog" ? section : null;
}

/** Section anchors with their localized labels. */
export function getNavItems(dict: Dictionary) {
  return NAV_IDS.map((id) => ({ id, name: dict.nav[id], href: `#${id}` }));
}

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/walid-hanif-ataullah25/",
  scholar: "https://scholar.google.com/citations?user=JYcwa0sAAAAJ&hl=id/",
  email: "mailto:walidhnf12@gmail.com",
  whatsapp: "https://wa.me/6282219282003",
};

export type Project = {
  title: string;
  /** Year-month, "YYYY-MM". Formatted per locale on display. */
  date: string;
  technologies: string[];
  link: string;
  featured?: boolean;
  /** Drives the placeholder shape on the detail page: landscape vs. phone. */
  platform: "web" | "mobile";
};

export const projects: Project[] = [
  {
    title: "APJ Gate",
    date: "2026-04",
    technologies: ["Angular", "Node.js", "Serverless"],
    link: "https://console-dev.stroomer.co.id/sign-in",
    platform: "web",
    featured: true,
  },
  {
    title: "Prabayar Pintar (Prapin)",
    date: "2026-04",
    technologies: ["Flutter", "IoT", "Bluetooth", "Wi-Fi", "OpenWeather API"],
    link: "https://play.google.com/store/apps/details?id=id.co.stroomer.mobile",
    platform: "mobile",
    featured: true,
  },
  {
    title: "Trafacomm",
    date: "2026-03",
    technologies: ["Flutter", "REST API", "Asset Management"],
    link: "https://play.google.com/store/apps/details?id=id.stroomer.trafacomm.up3",
    platform: "mobile",
  },
  {
    title: "GPS Tracker",
    date: "2026-02",
    technologies: ["Angular", "Node.js", "Serverless", "GPS"],
    link: "https://gpstracker.stroomer.co.id",
    platform: "web",
  },
  {
    title: "Stroomer Company Website",
    date: "2025-12",
    technologies: ["Astro", "Node.js", "Serverless", "Sanity CMS", "Nodemailer"],
    link: "https://stroomer.co.id",
    platform: "web",
  },
  {
    title: "Palm Oil Machine Analytics",
    date: "2025-08",
    technologies: ["Laravel", "Computer Vision"],
    link: "https://jurnalptpn.teluapp.org",
    platform: "web",
    featured: true,
  },
  {
    title: "E-Laman Hati",
    date: "2025-07",
    technologies: ["Agile Scrum", "Mobile"],
    link: "https://bit.ly/e-lamanhatiapk",
    platform: "mobile",
  },
  {
    title: "Kacir FnB",
    date: "2025-07",
    technologies: ["Agile Scrum", "POS", "Mobile"],
    link: "https://bit.ly/kacirfnbapk",
    platform: "mobile",
  },
  {
    title: "Hadir.In",
    date: "2025-06",
    technologies: ["Laravel", "MySQL", "PDF"],
    link: "https://hadirin.teluapp.org/login",
    platform: "web",
  },
  {
    title: "DKPP Store",
    date: "2025-04",
    technologies: ["Laravel", "MySQL"],
    link: "https://dkpp-store.teluapp.org",
    platform: "web",
  },
  {
    title: "E-Buruan Sae Dashboard",
    date: "2025-03",
    technologies: ["CodeIgniter", "MySQL", "Prediction"],
    link: "https://buruansae-dashboard.matradipti.org/login",
    platform: "web",
  },
  {
    title: "Jadwal.in",
    date: "2025-01",
    technologies: ["Laravel", "MySQL", "Scheduling"],
    link: "https://shift.matradipti.org",
    platform: "web",
  },
  {
    title: "SIMONA",
    date: "2024-08",
    technologies: ["Laravel", "MySQL"],
    link: "https://simona.tangerangkab.my.id/panel",
    platform: "web",
  },
];

/** Title → URL-safe slug. "Prabayar Pintar (Prapin)" → "prabayar-pintar-prapin". */
export function projectSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "2026-04" → "Apr 2026" / "Apr 2026" (id), via Intl so months follow the locale. */
export function formatProjectDate(iso: string, locale: Locale): string {
  return new Date(`${iso}-01T00:00:00Z`).toLocaleDateString(intlLocale[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** A project with its localized text resolved — safe to render directly. */
export type ProjectDetail = Project & {
  slug: string;
  dateLabel: string;
  category: string;
  role: string;
  description: string;
  contribution: string;
  gallery: string[];
};

export function getProjectDetail(
  project: Project,
  dict: Dictionary,
  locale: Locale
): ProjectDetail {
  const slug = projectSlug(project.title);
  const text = dict.projects.items[slug];
  const d = dict.projects.detail;
  return {
    ...project,
    slug,
    dateLabel: formatProjectDate(project.date, locale),
    category: text?.category ?? "",
    role: text?.role ?? d.defaultRole,
    description: text?.description ?? "",
    contribution: text?.contribution ?? d.defaultContribution,
    gallery: d.defaultGallery,
  };
}

export function getProjectDetails(dict: Dictionary, locale: Locale): ProjectDetail[] {
  return projects.map((p) => getProjectDetail(p, dict, locale));
}

/** Look a project up by slug for the detail route. Undefined = 404. */
export function getProjectBySlug(
  slug: string,
  dict: Dictionary,
  locale: Locale
): ProjectDetail | undefined {
  const match = projects.find((p) => projectSlug(p.title) === slug);
  return match ? getProjectDetail(match, dict, locale) : undefined;
}

export const contactMethods = [
  { key: "email", value: "walidhnf12@gmail.com", href: "mailto:walidhnf12@gmail.com", icon: "mail" },
  { key: "linkedin", value: "Walid Hanif Ataullah", href: socialLinks.linkedin, icon: "linkedin" },
  { key: "whatsapp", value: "+62 822 1928 2003", href: socialLinks.whatsapp, icon: "message" },
  { key: "location", value: "Tangerang, Indonesia", href: "#", icon: "pin" },
] as const;
