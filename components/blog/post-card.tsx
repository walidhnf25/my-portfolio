import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { formatPostDate, postCover, readingMinutes, type Post } from "@/lib/blog";
import { fmt, localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

export function PostCard({
  post,
  locale,
  labels,
  priority = false,
}: {
  post: Post;
  locale: Locale;
  labels: Dictionary["blog"];
  priority?: boolean;
}) {
  return (
    <Link href={localePath(locale, `/blog/${post.slug}`)} className="block h-full">
      <SpotlightCard className="flex h-full flex-col">
        {/* The carousel's title slide is portrait; crop to a landscape banner
            anchored at the top, where the headline sits. */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
          <Image
            src={postCover(post)}
            alt=""
            fill
            preload={priority}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

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
          <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-bright">
            {labels.readArticle} <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}
