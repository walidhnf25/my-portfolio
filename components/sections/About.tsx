"use client";

import { Quote, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/lib/portfolio";
import { DolphinGame } from "@/components/about/dolphin-game";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function About() {
  const { t } = useI18n();
  const { about } = t;
  return (
    <section id="about" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          accent={about.accent}
          description={about.description}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* Story */}
          <Reveal className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                <span className="float-left mr-3 font-display text-6xl font-bold leading-[0.8] text-accent">
                  {t.profile.summary.charAt(0)}
                </span>
                {t.profile.summary.slice(1)}
              </p>
              <p>{t.profile.summarySecondary}</p>
            </div>

            {/* Quote */}
            <div className="mt-8 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-3 font-display text-lg italic leading-relaxed text-foreground sm:text-xl">
                {t.profile.quote}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                — {profile.name}
              </p>
            </div>

            {/* Expertise */}
            <div className="mt-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {about.areasLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {about.expertiseAreas.map((area) => (
                  <Badge key={area} variant="accent">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            {/* A little game, in keeping with the aquarium */}
            <Reveal>
              <DolphinGame />
            </Reveal>

            {/* Competencies */}
            <Reveal delay={0.1} className="mt-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {about.competenciesLabel}
              </p>
              <ul className="space-y-3">
                {about.coreCompetencies.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
