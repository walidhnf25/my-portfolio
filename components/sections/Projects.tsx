"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { EmblaOptionsType } from "embla-carousel";
import { projects } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

// Stable reference — an inline object would reinit Embla on every render.
const EMBLA_OPTIONS: EmblaOptionsType = { align: "start", loop: false, dragFree: true };

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    // Re-measure after fonts/layout settle so the engine can scroll reliably.
    const timers = [200, 600].map((t) => window.setTimeout(() => emblaApi.reInit(), t));
    const onLoad = () => emblaApi.reInit();
    window.addEventListener("load", onLoad);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Building solutions"
            accent="that matter"
            description="A selection of production apps across energy, government, agriculture, and business."
          />
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Next"
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
                  <SpotlightCard className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                        {p.category}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {p.date}
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
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
                    >
                      View project <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selected ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
