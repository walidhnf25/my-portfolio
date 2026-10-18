import { intlLocale, type Locale } from "@/lib/i18n/config";
import { postMetas } from "./posts";
import contentEn from "./content/en";
import contentId from "./content/id";
import type { Block, Post, PostContent } from "./types";

export type { Block, Post, PostContent, PostMeta, PostSection } from "./types";

const content: Record<Locale, Record<string, PostContent>> = { en: contentEn, id: contentId };

/** Every post in a locale, newest first. */
export function getPosts(locale: Locale): Post[] {
  return postMetas
    .map((meta) => ({ ...meta, ...content[locale][meta.slug] }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string, locale: Locale): Post | undefined {
  const meta = postMetas.find((m) => m.slug === slug);
  return meta ? { ...meta, ...content[locale][slug] } : undefined;
}

/** Slugs are shared by every locale, so static params are too. */
export const postSlugs = postMetas.map((m) => m.slug);

export function postCover(post: Pick<Post, "slug">): string {
  return `/blog/${post.slug}/slide-01.png`;
}

export function postSlides(post: Pick<Post, "slug" | "slideCount">): { src: string; n: number }[] {
  return Array.from({ length: post.slideCount }, (_, i) => ({
    n: i + 1,
    src: `/blog/${post.slug}/slide-${String(i + 1).padStart(2, "0")}.png`,
  }));
}

/** "17 Oct 2026" / "17 Okt 2026". Fixed locale and UTC so server and client agree. */
export function formatPostDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(intlLocale[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function blockWords(b: Block): number {
  const count = (s: string) => s.split(/\s+/).filter(Boolean).length;
  switch (b.type) {
    case "p":
    case "note":
    case "quote":
      return count(b.text);
    case "list":
      return b.items.reduce((n, s) => n + count(s), 0);
    case "cards":
      return b.items.reduce(
        (n, c) =>
          n + count(c.title) + count(c.text ?? "") + (c.points ?? []).reduce((m, s) => m + count(s), 0),
        0
      );
    case "code":
      return 0;
  }
}

/** Reading time in whole minutes at ~200 wpm, prose only (code is skimmed). */
export function readingMinutes(post: Post): number {
  const blocks = [
    ...post.intro,
    ...post.sections.flatMap((s) => s.blocks),
    ...post.takeaway.blocks,
  ];
  const words = blocks.reduce((n, b) => n + blockWords(b), 0);
  return Math.max(1, Math.round(words / 200));
}
