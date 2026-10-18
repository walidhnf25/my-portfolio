"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { PENDING_SCROLL_KEY } from "@/components/providers/SmoothScroll";

/**
 * Link from a detail page back to a home-page section.
 *
 * Navigating to `/#section` is broken here: the App Router merges the new hash
 * onto whatever hash `/` already carries in history, producing URLs like
 * `/#projects#blog`. So this never puts the section in the URL. It stashes
 * the target and pushes a clean `/`; SmoothScroll's reset reads the stash on mount
 * and scrolls there. Result: a clean URL and an actual smooth scroll to the
 * section — the plain hash link delivered neither.
 *
 * A real `<a href>` is kept so right-click, middle-click, and crawlers still see a
 * meaningful target; only the left-click is intercepted.
 */
export function SectionLink({
  section,
  className,
  children,
}: {
  section: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <a
      href={`/#${section}`}
      className={className}
      onClick={(e) => {
        // Let modified clicks (new tab, etc.) use the real href.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        sessionStorage.setItem(PENDING_SCROLL_KEY, section);
        router.push("/");
      }}
    >
      {children}
    </a>
  );
}
