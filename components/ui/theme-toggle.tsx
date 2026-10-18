"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/components/providers/LocaleProvider";
import { useMounted } from "@/lib/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const { t } = useI18n();

  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      aria-label={t.common.toggleTheme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent lg:h-9 lg:w-9"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {mounted && !isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
