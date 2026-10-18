"use client";

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Stable reference — an inline object would reinit Embla on every render.
const EMBLA_OPTIONS: EmblaOptionsType = { align: "start", loop: false, dragFree: true };

/**
 * Shared state for the home-page card carousels (Projects, Blog).
 *
 * Embla owns scroll state, so it is read as an external store rather than mirrored
 * into React state from an effect. Primitive snapshots keep every read
 * referentially stable.
 */
export function useCardCarousel() {
  const [viewport, api] = useEmblaCarousel(EMBLA_OPTIONS);

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onChange).on("reInit", onChange);
      return () => {
        api.off("select", onChange).off("reInit", onChange);
      };
    },
    [api]
  );
  const selected = useSyncExternalStore(subscribe, () => api?.selectedScrollSnap() ?? 0, () => 0);
  const snapCount = useSyncExternalStore(subscribe, () => api?.scrollSnapList().length ?? 0, () => 0);
  const canPrev = useSyncExternalStore(subscribe, () => api?.canScrollPrev() ?? false, () => false);
  const canNext = useSyncExternalStore(subscribe, () => api?.canScrollNext() ?? true, () => true);

  useEffect(() => {
    if (!api) return;
    // Re-measure after fonts/layout settle so the engine can scroll reliably.
    const timers = [200, 600].map((ms) => window.setTimeout(() => api.reInit(), ms));
    const onLoad = () => api.reInit();
    window.addEventListener("load", onLoad);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, [api]);

  // The viewport callback is returned beside the controls, not inside them: it must
  // go straight to <CarouselTrack viewport=...>, and keeping it out of the object
  // keeps the react-hooks/refs rule from treating the whole object as a ref.
  const controls = {
    selected,
    snapCount,
    canPrev,
    canNext,
    prev: () => api?.scrollPrev(),
    next: () => api?.scrollNext(),
    scrollTo: (i: number) => api?.scrollTo(i),
  };
  return [viewport, controls] as const;
}

export type CardCarousel = ReturnType<typeof useCardCarousel>[1];

const arrowClass =
  "grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30";

export function CarouselArrows({
  carousel,
  previousLabel,
  nextLabel,
}: {
  carousel: CardCarousel;
  previousLabel: string;
  nextLabel: string;
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        onClick={carousel.prev}
        disabled={!carousel.canPrev}
        aria-label={previousLabel}
        className={arrowClass}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        onClick={carousel.next}
        disabled={!carousel.canNext}
        aria-label={nextLabel}
        className={arrowClass}
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/** The scrolling viewport; wrap each card in <CarouselSlide>. */
export function CarouselTrack({
  viewport,
  children,
}: {
  viewport: ReturnType<typeof useCardCarousel>[0];
  children: ReactNode;
}) {
  return (
    <div className="mt-12">
      <div className="overflow-hidden" ref={viewport}>
        <div className="flex gap-5">{children}</div>
      </div>
    </div>
  );
}

export function CarouselSlide({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_58%] lg:flex-[0_0_38%]">{children}</div>
  );
}

/** Progress dots — the bar is the visual, the button is the (finger-sized) tap area. */
export function CarouselDots({
  carousel,
  label,
}: {
  carousel: CardCarousel;
  /** Template with an {n} placeholder, e.g. "Go to slide {n}". */
  label: (n: number) => string;
}) {
  return (
    <div className="mt-4 flex justify-center">
      {Array.from({ length: carousel.snapCount }, (_, i) => (
        <button
          key={i}
          aria-label={label(i + 1)}
          onClick={() => carousel.scrollTo(i)}
          className="group grid h-11 w-6 place-items-center"
        >
          <span
            className={cn(
              "block h-1.5 rounded-full transition-all duration-300",
              i === carousel.selected
                ? "w-6 bg-accent"
                : "w-1.5 bg-border group-hover:bg-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
}
