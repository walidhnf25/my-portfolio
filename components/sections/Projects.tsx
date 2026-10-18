"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { EmblaOptionsType } from "embla-carousel";
import { getProjectDetails } from "@/lib/portfolio";
import { useI18n } from "@/components/providers/LocaleProvider";
import { fmt } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

// Stable reference — an inline object would reinit Embla on every render.
const EMBLA_OPTIONS: EmblaOptionsType = { align: "start", loop: false, dragFree: true };

export default function Projects() {
  const { locale, t, path } = useI18n();
  const projects = getProjectDetails(t, locale);
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);

  // Embla owns this state, so read it as an external store instead of mirroring it
  // into React state from an effect. Primitive snapshots keep it referentially stable.
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onChange).on("reInit", onChange);
      return () => {
        emblaApi.off("select", onChange).off("reInit", onChange);
      };
    },
    [emblaApi]
  );
  const selected = useSyncExternalStore(subscribe, () => emblaApi?.selectedScrollSnap() ?? 0, () => 0);
  const snapCount = useSyncExternalStore(subscribe, () => emblaApi?.scrollSnapList().length ?? 0, () => 0);
  const canPrev = useSyncExternalStore(subscribe, () => emblaApi?.canScrollPrev() ?? false, () => false);
  const canNext = useSyncExternalStore(subscribe, () => emblaApi?.canScrollNext() ?? true, () => true);

  useEffect(() => {
    if (!emblaApi) return;
    // Re-measure after fonts/layout settle so the engine can scroll reliably.
    const timers = [200, 600].map((ms) => window.setTimeout(() => emblaApi.reInit(), ms));
    const onLoad = () => emblaApi.reInit();
    window.addEventListener("load", onLoad);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, [emblaApi]);

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
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label={t.projects.previous}
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label={t.projects.next}
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_58%] lg:flex-[0_0_38%]"
                >
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress dots — the bar is the visual, the button is the (finger-sized) tap area */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: snapCount }, (_, i) => (
            <button
              key={i}
              aria-label={fmt(t.projects.goToSlide, { n: i + 1 })}
              onClick={() => emblaApi?.scrollTo(i)}
              className="group grid h-11 w-6 place-items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === selected
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-border group-hover:bg-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
