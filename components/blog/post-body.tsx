import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Block } from "@/lib/blog";

const TONE = {
  bad: "border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400",
  good: "border-accent/30 bg-accent/10 text-accent",
  neutral: "border-border bg-muted text-muted-foreground",
};

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-[1.8] text-muted-foreground sm:text-lg">{block.text}</p>;

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {block.ordered ? (
                <span className="mt-1 w-5 shrink-0 font-mono text-sm text-accent">{i + 1}.</span>
              ) : (
                <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case "cards":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {block.items.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm"
            >
              <h4 className="font-display text-base font-bold text-foreground">{c.title}</h4>
              {c.text && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              )}
              {c.points && (
                <ul className="mt-3 space-y-1.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );

    case "code":
      return (
        <figure>
          {block.label && (
            <figcaption
              className={cn(
                "mb-2 inline-flex rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em]",
                TONE[block.tone ?? "neutral"]
              )}
            >
              {block.label}
            </figcaption>
          )}
          {/* tabIndex so keyboard users can scroll a long line sideways. */}
          <pre
            tabIndex={0}
            className="overflow-x-auto rounded-2xl border border-border bg-[#0b1220] p-5 font-mono text-[13px] leading-relaxed text-slate-100 sm:text-sm"
          >
            <code>{block.code}</code>
          </pre>
        </figure>
      );

    case "note":
      return (
        <aside className="flex gap-3 rounded-2xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>{block.text}</p>
        </aside>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-accent/50 pl-5 font-display text-lg italic leading-relaxed text-foreground sm:text-xl">
          {block.text}
        </blockquote>
      );
  }
}

/** A run of blocks with consistent vertical rhythm. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}
