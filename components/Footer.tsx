"use client";

import { Mail, MessageCircle, GraduationCap } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { navItems, socialLinks, profile } from "@/lib/portfolio";

const socials = [
  { icon: LinkedInIcon, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: GraduationCap, href: socialLinks.scholar, label: "Google Scholar" },
  { icon: Mail, href: socialLinks.email, label: "Email" },
  { icon: MessageCircle, href: socialLinks.whatsapp, label: "WhatsApp" },
];

export default function Footer() {
  const scrollTo = useScrollTo();
  const go = (href: string) => scrollTo(href.slice(1));

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <button
              onClick={() => go("#home")}
              className="flex items-center gap-2 font-display text-xl font-bold"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm text-accent-foreground">
                W
              </span>
              {profile.name}
            </button>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Navigate
              </p>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => go(item.href)}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Connect
              </p>
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js · Three.js · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
