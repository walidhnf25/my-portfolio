"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getNavItems, navIdForPath, NAV_IDS } from "@/lib/portfolio";
import { isHomePath } from "@/lib/i18n/config";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useI18n } from "@/components/providers/LocaleProvider";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrollTo = useScrollTo();
  const { t } = useI18n();
  const navItems = getNavItems(t);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const onHome = isHomePath(pathname);
  // Home tracks the scroll position. A detail page has no sections to scroll
  // through, so it lights the item it belongs to: a project → Projects, a post → Blog.
  const activeId = onHome ? active : (navIdForPath(pathname) ?? "");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (!onHome) return;
      const sections: string[] = [...NAV_IDS];
      // Active = the last section whose top has crossed the vertical centre of
      // the viewport, i.e. the section the centre line currently sits in. A line
      // near the very top (the old 180px) read fine scrolling up but lagged going
      // down — the highlight clung to the outgoing section until the incoming one
      // climbed all the way to the navbar, long after it had taken over the
      // screen. Anchoring to the centre makes the active item match whatever you
      // are looking at, identically in both directions, and leaves ~half a
      // viewport of tolerance so a slightly short click-landing still lights the
      // right item.
      const line = Math.round(window.innerHeight * 0.5);
      let current = sections[0];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= line) current = s;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Re-run on every route change, so coming back to the home page recomputes the
    // active section instead of keeping whatever it was when the visitor left.
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const go = (href: string) => {
    scrollTo(href.slice(1));
    setOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          // Layer order, top down: menu panel (85) > scroll indicator (80) >
          // header (75) > menu scrim (65) > page. The indicator clears the header
          // bar so its rod stays visible at the top of its range, but never
          // covers an open menu; the header stays above the scrim so its close
          // button does not dim along with the page behind it.
          "fixed inset-x-0 top-0 z-[75] transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-xl light:bg-white/55"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Extra right padding on phones only: the scroll-indicator column runs
            down that edge, its rod level with the theme toggle. The hamburger has
            to sit clear of the rod's near (tip) end — pr-14 (56px) leaves a small,
            even gap (neither touching as pr-11 did, nor drifting far as pr-16).
            From sm up the centred max-w-6xl container already clears the column,
            so it resets. */}
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 pr-14 sm:px-6 lg:px-8">
          <button
            onClick={() => go("#home")}
            aria-label={t.common.backToTop}
            className="group flex min-h-11 items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <Image
              src="/logo-mark.png"
              alt=""
              width={64}
              height={64}
              priority
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="hidden sm:inline">
              Walid<span className="text-accent">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              return (
                <button
                  key={item.name}
                  onClick={() => go(item.href)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeId === id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {activeId === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-muted"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t.common.toggleMenu}
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[65] bg-background/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-3 top-20 z-[85] rounded-2xl border border-border bg-card/90 p-3 backdrop-blur-xl lg:hidden"
            >
              <div className="grid gap-1">
                {navItems.map((item, i) => {
                  const id = item.href.slice(1);
                  return (
                    <button
                      key={item.name}
                      onClick={() => go(item.href)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                        activeId === id
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
