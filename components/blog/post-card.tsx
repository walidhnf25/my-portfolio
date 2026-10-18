import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { formatPostDate, readingMinutes, type Post } from "@/lib/blog";
import { fmt, localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

export function PostCard({
  post,
  locale,
  labels,
}: {
  post: Post;
  locale: Locale;
  labels: Dictionary["blog"];
}) {
  return (
    <Link href={localePath(locale, `/blog/${post.slug}`)} className="block h-full">
      <SpotlightCard className="flex h-full flex-col">
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <span className="text-accent">{formatPostDate(post.date, locale)}</span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {fmt(labels.minRead, { n: readingMinutes(post) })}
            </span>
          </div>
          <h3 className="mt-4 font-display text-xl font-bold leading-tight">{post.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-bright">
            {labels.readArticle} <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}
