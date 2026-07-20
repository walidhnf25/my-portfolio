"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(28px)",
  willChange: "opacity, transform",
};

function forceVisible(targets: Element[]) {
  targets.forEach((t) => {
    const el = t as HTMLElement;
    if (parseFloat(getComputedStyle(el).opacity || "1") < 0.99) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  });
}

/**
 * Reveal on scroll using GSAP, with a hard, rAF-independent guarantee: shortly
 * after each element is triggered (and via a global safety timeout) its final
 * visible styles are force-applied, so content can never be trapped invisible
 * even if the animation loop is throttled.
 */
function useRevealTrigger(run: (el: HTMLDivElement) => Element[]) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let guard = 0;
    let done = false;

    const fire = () => {
      if (done) return;
      done = true;
      cleanupScroll();
      const targets = run(el);
      guard = window.setTimeout(() => forceVisible(targets), 1500);
    };

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > 0) fire();
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    function cleanupScroll() {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(safety);
    }

    raf = requestAnimationFrame(check);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const safety = window.setTimeout(fire, 2500);

    return () => {
      cleanupScroll();
      clearTimeout(guard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRevealTrigger((el) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay });
    return [el];
  });
  return (
    <div ref={ref} className={className} style={HIDDEN}>
      {children}
    </div>
  );
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRevealTrigger((el) => {
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
    });
    return items;
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal-item className={className} style={HIDDEN}>
      {children}
    </div>
  );
}
