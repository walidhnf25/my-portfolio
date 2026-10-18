import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { SectionLink } from "@/components/ui/section-link";
import { getPosts } from "@/lib/blog";
import { hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).blog;

  return {
    title: t.metaTitle,
    description: t.description,
    alternates: {
      canonical: localePath(lang, "/blog"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "/blog")])),
    },
  };
}

export default async function BlogIndexPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).blog;
  const posts = getPosts(lang);

  return (
    <main className="section-anchor relative">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8">
        <SectionLink
          section="home"
          className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {t.backHome}
        </SectionLink>

        <header className="mt-8 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              {t.eyebrow}
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            {t.title} <span className="text-gradient-accent">{t.accent}</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.description}
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={lang} labels={t} />
          ))}
        </div>
      </div>
    </main>
  );
}
