"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/portfolio";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrollTo = useScrollTo();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const sections = navItems.map((i) => i.href.slice(1));
      const current = sections.find((s) => {
        const el = document.getElementById(s);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });
      if (current) setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    scrollTo(href.slice(1));
    setOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          // Layer order, top down: menu panel (85) > ScrollRat (80) > header
          // (75) > menu scrim (65) > page. The rat clears the header bar so it
          // stays visible at the top of its range, but never covers an open
          // menu; the header stays above the scrim so its close button does not
          // dim along with the page behind it.
          "fixed inset-x-0 top-0 z-[75] transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Extra right padding on phones only: the ScrollRat column runs down
            that edge, and its house sits level with the theme toggle. From sm up
            the centred max-w-6xl container already clears it. */}
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 pr-11 sm:px-6 lg:px-8">
          <button
            onClick={() => go("#home")}
            aria-label="Walid Hanif Ataullah, back to top"
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
                    active === id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active === id && (
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
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
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
                        active === id
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
