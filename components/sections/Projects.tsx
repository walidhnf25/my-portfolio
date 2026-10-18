"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  CarouselArrows,
  CarouselDots,
  CarouselSlide,
  CarouselTrack,
  useCardCarousel,
} from "@/components/ui/card-carousel";
import { getProjectDetails } from "@/lib/portfolio";
import { useI18n } from "@/components/providers/LocaleProvider";
import { fmt } from "@/lib/i18n/config";

export default function Projects() {
  const { locale, t, path } = useI18n();
  const projects = getProjectDetails(t, locale);
  const [viewport, carousel] = useCardCarousel();

  return (
    <section id="projects" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            accent={t.projects.accent}
            description={t.projects.description}
          />
          <CarouselArrows
            carousel={carousel}
            previousLabel={t.common.previous}
            nextLabel={t.common.next}
          />
        </div>

        <CarouselTrack viewport={viewport}>
              {projects.map((p) => (
                <CarouselSlide key={p.title}>
                  {/* The whole card navigates to the detail page now; the live
                      site link moved there. Link wraps the card so the entire
                      surface is the target, not just the footer affordance. */}
                  <Link
                    href={path(`/projects/${p.slug}`)}
                    className="block h-full"
                  >
                    <SpotlightCard className="flex h-full flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                          {p.category}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {p.dateLabel}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-bold leading-tight">
                        {p.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-bright">
                        {t.projects.viewDetails} <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </SpotlightCard>
                  </Link>
                </CarouselSlide>
              ))}
        </CarouselTrack>

        <CarouselDots carousel={carousel} label={(n) => fmt(t.common.goToSlide, { n })} />
      </div>
    </section>
  );
}
