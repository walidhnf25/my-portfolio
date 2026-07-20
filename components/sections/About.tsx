"use client";

import { Quote, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import {
  profile,
  aboutHighlights,
  expertiseAreas,
  coreCompetencies,
} from "@/lib/portfolio";

export default function About() {
  return (
    <section id="about" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="The engineer behind"
          accent="the innovation"
          description="Software engineering graduate turning research into real-world, AI-driven systems."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* Story */}
          <Reveal className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                <span className="float-left mr-3 font-display text-6xl font-bold leading-[0.8] text-accent">
                  {profile.summary.charAt(0)}
                </span>
                {profile.summary.slice(1)}
              </p>
              <p>{profile.summarySecondary}</p>
            </div>

            {/* Quote */}
            <div className="mt-8 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-3 font-display text-lg italic leading-relaxed text-foreground sm:text-xl">
                {profile.quote}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                — {profile.name}
              </p>
            </div>

            {/* Expertise */}
            <div className="mt-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Areas of Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {expertiseAreas.map((area) => (
                  <Badge key={area} variant="accent">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            {/* Highlights */}
            <RevealGroup className="grid grid-cols-2 gap-4">
              {aboutHighlights.map((h) => (
                <RevealItem
                  key={h.label}
                  className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-colors hover:border-accent/40"
                >
                  <div className="font-display text-3xl font-bold text-gradient-accent sm:text-4xl">
                    {h.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{h.label}</div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Competencies */}
            <Reveal delay={0.1} className="mt-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Core Competencies
              </p>
              <ul className="space-y-3">
                {coreCompetencies.map((c) => (
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
