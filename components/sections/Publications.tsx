"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { publications, publicationSlug } from "@/lib/portfolio";

const stats = [
  { value: "8", label: "Publications" },
  { value: "7", label: "Scopus" },
  { value: "1", label: "SINTA 3" },
  { value: "3", label: "1st Author" },
];

export default function Publications() {
  return (
    <section id="publications" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Publications"
          title="Pushing the boundaries of"
          accent="knowledge"
          description="Peer-reviewed research in AI, machine learning, computer vision, and IoT, published with IEEE and indexed journals."
        />

        {/* Stats */}
        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <RevealItem
              key={s.label}
              className="rounded-2xl border border-border bg-card/50 p-4 text-center backdrop-blur-sm sm:p-5"
            >
              <div className="font-display text-3xl font-bold text-gradient-accent sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {s.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* List */}
        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {publications.map((pub, i) => (
            <Reveal key={pub.title} delay={Math.min(i * 0.04, 0.2)}>
              <Link
                href={`/publications/${publicationSlug(pub.title)}`}
                className="group block rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-card sm:p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <div className="flex items-center gap-3 sm:w-28 sm:flex-col sm:items-start">
                    <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {pub.year}
                    </span>
                    <Badge variant={pub.indexing === "Scopus" ? "solid" : "accent"}>
                      {pub.indexing}
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-bold leading-tight text-foreground">
                        {pub.title}
                      </h3>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-3.5 w-3.5 text-accent" />
                      <span className="italic">{pub.venue}</span>
                      <span className="text-border">·</span>
                      <span>{pub.publisher}</span>
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{pub.authors}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline">{pub.role}</Badge>
                      {pub.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
