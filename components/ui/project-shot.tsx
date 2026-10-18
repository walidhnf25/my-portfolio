import { ImageIcon } from "lucide-react";

/**
 * Generated placeholder standing in for a real screenshot.
 *
 * No image file: a themed gradient panel with a caption, so the detail layout
 * can be built and reviewed before any screenshots exist. Swapping in a real
 * <Image> later means replacing this component at its call sites, nothing else.
 *
 * The hue offset is derived from `index` so a gallery of these reads as a set of
 * distinct shots rather than one tile repeated. Kept in the accent's family via
 * hue-rotate on theme tokens, so it still tracks light/dark.
 */
export function ProjectShot({
  caption,
  index = 0,
  aspect = "16 / 10",
  className,
  placeholderLabel = "Placeholder",
}: {
  caption: string;
  /** Localized word for "Placeholder". */
  placeholderLabel?: string;
  index?: number;
  aspect?: string;
  className?: string;
}) {
  const shift = (index * 24) % 360;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-muted ${className ?? ""}`}
      style={{ aspectRatio: aspect }}
      aria-hidden="true"
    >
      {/* Tinted wash, rotated per shot so neighbours differ. */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          filter: `hue-rotate(${shift}deg)`,
          background:
            "radial-gradient(120% 90% at 20% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%), radial-gradient(100% 80% at 100% 100%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%)",
        }}
      />
      {/* Faint grid, so the panel reads as a UI surface, not a solid swatch. */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <ImageIcon className="h-6 w-6" />
        <span className="font-mono text-xs uppercase tracking-[0.15em]">{caption}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {placeholderLabel}
        </span>
      </div>
    </div>
  );
}
