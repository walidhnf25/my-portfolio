"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useIntroGuarantee } from "@/lib/use-intro-guarantee";
import { ArrowRight, Download, Mail, MessageCircle, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { StairClimber } from "@/components/ui/stair-climber";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { profile, socialLinks } from "@/lib/portfolio";

// Every element the intro timeline hides via `.from()`.
const ANIMATED =
  ".hero-badge, .hero-line, .hero-sub, .hero-cta, .hero-social, .hero-aside";

const socials = [
  { icon: LinkedInIcon, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: GraduationCap, href: socialLinks.scholar, label: "Scholar" },
  { icon: Mail, href: socialLinks.email, label: "Email" },
  { icon: MessageCircle, href: socialLinks.whatsapp, label: "WhatsApp" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      // Respect reduced-motion: skip the intro entirely so the markup simply
      // renders in its final, visible state (matches SceneBackground/StairClimber).
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
        // Once the intro is done, drop the inline opacity/transform GSAP leaves
        // behind so the markup can never be left in a hidden state. Scoped to
        // this section — `onComplete` fires outside useGSAP's selector scope.
        onComplete: () => {
          const el = root.current;
          if (el) gsap.set(el.querySelectorAll(ANIMATED), { clearProps: "all" });
        },
      });
      tlRef.current = tl;
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-line", { yPercent: 120, opacity: 0, stagger: 0.12 }, "-=0.2")
        .from(".hero-sub", { y: 20, opacity: 0 }, "-=0.5")
        .from(".hero-aside", { y: 24, opacity: 0 }, "-=0.7")
        .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.6")
        .from(".hero-social", { scale: 0, opacity: 0, stagger: 0.06 }, "-=0.6");
    },
    { scope: root }
  );

  useIntroGuarantee(root, tlRef, ANIMATED);

  const scrollTo = useScrollTo();

  return (
    <section
      id="home"
      ref={root}
      className="section-anchor relative flex min-h-svh items-center overflow-hidden pt-28 pb-20"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Left — intro */}
        <div className="lg:col-span-7">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-muted-foreground">Open to collaboration</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">{profile.firstName}</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block text-gradient-accent">{profile.lastName}</span>
            </span>
          </h1>

          <div className="hero-sub mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            {profile.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-4">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-accent" />}
                {role}
              </span>
            ))}
          </div>

          <p className="hero-sub mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="primary" size="lg" className="hero-cta">
              <a href={profile.cv} download>
                <Download aria-hidden="true" /> Download CV
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hero-cta"
              onClick={() => scrollTo("projects")}
            >
              View Work <ArrowRight aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hero-social grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Right — "climb to success" animation */}
        <div className="hero-aside mx-auto w-full max-w-[280px] sm:max-w-sm lg:col-span-5 lg:max-w-none">
          <StairClimber />
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-accent sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-border pt-1.5">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-accent" />
        </span>
      </button>
    </section>
  );
}
