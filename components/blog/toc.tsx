"use client";

import { useScrollTo } from "@/components/providers/SmoothScroll";

export type TocItem = { id: string; label: string };

/**
 * "On this page" list. Goes through useScrollTo (Lenis) rather than a plain
 * `#hash` link, which the smooth-scroll controller would otherwise fight.
 */
export function Toc({ items }: { items: TocItem[] }) {
  const scrollTo = useScrollTo();

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        On this page
      </p>
      <ol className="mt-3 space-y-0.5">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className="flex min-h-9 w-full items-start gap-3 rounded-lg py-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <span className="mt-0.5 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
