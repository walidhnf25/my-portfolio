"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, GalleryHorizontal, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

export type Slide = { src: string; n: number };

const EMBLA_OPTIONS = { align: "center", loop: false } as const;

/**
 * The post's title slide as a clickable "deck". Clicking opens a full-screen,
 * swipeable viewer over the whole carousel.
 */
export function SlideViewer({ slides, title }: { slides: Slide[]; title: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Hand focus back to what opened the dialog.
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Open slides: ${title} (${slides.length} slides)`}
        className="group relative mx-auto block w-full max-w-xs cursor-zoom-in rounded-2xl outline-offset-8 focus-visible:outline-2 focus-visible:outline-accent lg:max-w-sm"
      >
        {/* Two ghost cards fanned behind the cover read as "a deck of slides". */}
        <span
          aria-hidden
          className="absolute inset-0 rotate-[5deg] rounded-2xl border border-border bg-card/70 transition-transform duration-500 group-hover:rotate-[9deg] group-hover:translate-x-3"
        />
        <span
          aria-hidden
          className="absolute inset-0 -rotate-[4deg] rounded-2xl border border-border bg-card/80 transition-transform duration-500 group-hover:-rotate-[8deg] group-hover:-translate-x-3"
        />

        <span className="relative block overflow-hidden rounded-2xl border border-border shadow-2xl shadow-accent/10 transition-transform duration-500 group-hover:-translate-y-1.5">
          <Image
            src={slides[0].src}
            alt={`Title slide: ${title}`}
            width={1080}
            height={1350}
            preload
            sizes="(min-width: 1024px) 384px, 320px"
            className="h-auto w-full"
          />
          {/* Hover veil + call to action */}
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute inset-x-0 bottom-0 flex justify-center p-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-105">
              <GalleryHorizontal className="h-4 w-4" />
              View {slides.length} slides
            </span>
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && <Viewer slides={slides} title={title} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

function Viewer({
  slides,
  title,
  onClose,
}: {
  slides: Slide[];
  title: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  // Embla fires a click after a drag; ignore backdrop clicks that were really swipes.
  const dragged = useRef(false);

  const total = slides.length;

  // Track the active slide.
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    const onPointerDown = () => (dragged.current = false);
    const onScroll = () => (dragged.current = true);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi]);

  // Keep the active thumbnail visible when the strip scrolls (narrow screens).
  // Scrolls the strip itself, never the page.
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.querySelectorAll<HTMLElement>("[data-thumb]")[index];
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [index, reduce]);

  // Freeze the page behind the dialog. Lenis owns scrolling, so stop it too.
  useEffect(() => {
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [lenis]);

  // Keyboard: arrows to page, Esc to close, Tab kept inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") emblaApi?.scrollNext();
      else if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      else if (e.key === "Home") emblaApi?.scrollTo(0);
      else if (e.key === "End") emblaApi?.scrollTo(total - 1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi, onClose, total]);

  const canPrev = index > 0;
  const canNext = index < total - 1;

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — slides`}
      data-lenis-prevent
      className="fixed inset-0 z-[90] flex flex-col bg-[#020b10]/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
    >
      {/* Ambient glow that follows the deck's accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 45%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-5">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-white sm:text-base">
            {title}
          </p>
          <p className="mt-0.5 font-mono text-xs tracking-[0.15em] text-white/60">
            <span className="text-accent-bright">{String(index + 1).padStart(2, "0")}</span>
            {" / "}
            {String(total).padStart(2, "0")}
          </p>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close slides"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-accent hover:text-accent-bright"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative min-h-0 flex-1">
        <div
          ref={emblaRef}
          className="h-full cursor-grab overflow-hidden active:cursor-grabbing"
          onClick={(e) => {
            // Click on the empty space around a slide closes; a drag does not.
            if (dragged.current) return;
            if ((e.target as HTMLElement).dataset.backdrop) onClose();
          }}
        >
          <div className="flex h-full">
            {slides.map((s, i) => (
              <div
                key={s.n}
                data-backdrop="true"
                className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center px-4 sm:px-20"
              >
                <motion.div
                  className="relative"
                  animate={{
                    scale: i === index ? 1 : 0.9,
                    opacity: i === index ? 1 : 0.45,
                  }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={s.src}
                    alt={`Slide ${s.n} of ${total}`}
                    width={1080}
                    height={1350}
                    draggable={false}
                    // Only the neighbours of the first slide are worth eager-loading.
                    loading={i < 2 ? "eager" : "lazy"}
                    sizes="(min-width: 768px) 640px, 92vw"
                    className="h-auto max-h-[calc(100dvh-13rem)] w-auto max-w-full select-none rounded-2xl border border-white/10 shadow-2xl shadow-black/60 sm:max-h-[calc(100dvh-14rem)]"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows (swipe covers touch devices) */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-105 hover:border-accent hover:text-accent-bright disabled:pointer-events-none disabled:opacity-0 sm:grid"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-105 hover:border-accent hover:text-accent-bright disabled:pointer-events-none disabled:opacity-0 sm:grid"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnail strip + progress */}
      <div className="relative px-4 pb-4 pt-3 sm:px-8 sm:pb-6">
        <div className="mx-auto mb-3 h-0.5 max-w-md overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        {/* Centred only when it fits: mx-auto on the inner row (not justify-center
            on the scroller, which would clip the first thumbnails when it overflows). */}
        <div ref={stripRef} className="relative overflow-x-auto py-1">
          <div className="mx-auto flex w-max gap-2 px-0.5">
          {slides.map((s, i) => (
            <button
              key={s.n}
              data-thumb
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${s.n}`}
              aria-current={i === index}
              className={cn(
                "relative h-14 w-11 shrink-0 overflow-hidden rounded-md border transition-all duration-200 sm:h-16 sm:w-[3.25rem]",
                i === index
                  ? "-translate-y-0.5 border-accent opacity-100 ring-2 ring-accent/40"
                  : "border-white/15 opacity-50 hover:opacity-90"
              )}
            >
              <Image
                src={s.src}
                alt=""
                fill
                sizes="52px"
                className="object-cover object-top"
              />
            </button>
          ))}
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-white/40 sm:hidden">Swipe to browse</p>
        <p className="mt-2 hidden text-center text-[11px] text-white/40 sm:block">
          Drag, use ← → keys, or click a thumbnail · Esc to close
        </p>
      </div>
    </motion.div>,
    document.body
  );
}
