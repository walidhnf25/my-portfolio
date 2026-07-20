"use client";

import { Code2, Layers, Brain, Cpu, Cloud, GitBranch } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { skillCategories } from "@/lib/portfolio";

const icons = [Code2, Layers, Brain, Cpu, Cloud, GitBranch];

const marqueeTech = [
  "Python", "TypeScript", "Golang", "PyTorch", "TensorFlow", "React", "Next.js",
  "Angular", "Flutter", "Laravel", "Node.js", "Docker", "AWS", "Computer Vision",
  "LSTM", "DeepLab", "MobileNet", "IoT", "PostgreSQL", "Firebase", "Git",
];

export default function Skills() {
  return (
    <section id="skills" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="The tools that"
          accent="power innovation"
          description="From fullstack engineering to deep learning and IoT: a broad, applied technical stack."
        />

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem
                key={cat.title}
                className="group rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold leading-tight">
                      {cat.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      {/* Full-bleed marquee */}
      <div className="relative mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <Marquee className="[--gap:1.25rem] py-2">
          {marqueeTech.map((t) => (
            <span
              key={t}
              className="font-display text-2xl font-semibold text-muted-foreground/60 transition-colors hover:text-accent sm:text-3xl"
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
