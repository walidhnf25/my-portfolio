import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MessageCircleQuestion } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionLink } from "@/components/ui/section-link";
import { Blocks } from "@/components/blog/post-body";
import { SlideViewer } from "@/components/blog/slide-viewer";
import { Toc } from "@/components/blog/toc";
import {
  formatPostDate,
  getPostBySlug,
  postCover,
  postSlides,
  posts,
  readingMinutes,
} from "@/lib/blog";

// Every post is known at build time, so prerender them all. Next 16 passes
// `params` as a Promise to page, generateMetadata, and generateStaticParams.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Reject any slug we did not generate rather than render an empty shell.
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} | Walid Hanif Ataullah`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ["Walid Hanif Ataullah"],
      tags: post.tags,
      images: [{ url: postCover(post), width: 1080, height: 1350, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const sectionId = (i: number) => `section-${i + 1}`;
  const toc = post.sections.map((s, i) => ({ id: sectionId(i), label: s.kicker }));

  return (
    // overflow-x-clip, not overflow-hidden: hidden makes <main> a scroll container
    // and silently breaks the sticky contents sidebar.
    <main className="section-anchor relative overflow-x-clip">
      {/* Soft accent glow behind the header, echoing the scene background. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 90% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />

      {/* Same frame as the project detail page: max-w-6xl, same padding. */}
      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8">
        <SectionLink
          section="blog"
          className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to blog
        </SectionLink>

        {/* Hero: copy on the left, title slide on the right ------------ */}
        <header className="mt-8 grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <time dateTime={post.date} className="text-accent">
                {formatPostDate(post.date)}
              </time>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingMinutes(post)} min read
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl sm:leading-[1.05] lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <SlideViewer slides={postSlides(post)} title={post.title} />
          </div>
        </header>

        {/* Body: article on the left, sticky contents on the right ---- */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            {/* Intro */}
            <div className="border-l-2 border-accent/40 pl-5 sm:pl-6">
              <Blocks blocks={post.intro} />
            </div>

            {post.sections.map((s, i) => (
              <section key={s.kicker} id={sectionId(i)} className="section-anchor mt-16">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")} · {s.kicker}
                </div>
                <h2 className="mt-3 mb-6 font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  {s.heading}
                </h2>
                <Blocks blocks={s.blocks} />
              </section>
            ))}

            {/* Takeaway */}
            <section className="mt-16 rounded-3xl border border-accent/30 bg-card/60 p-6 backdrop-blur-sm sm:p-8">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Takeaway</div>
              <h2 className="mt-3 mb-6 font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                {post.takeaway.heading}
              </h2>
              <Blocks blocks={post.takeaway.blocks} />
            </section>

            {/* Closing question */}
            <aside className="mt-6 flex gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm sm:p-6">
              <MessageCircleQuestion className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  Pertanyaan penutup
                </div>
                <p className="mt-1.5 font-display text-lg leading-snug text-foreground">
                  {post.closingQuestion}
                </p>
              </div>
            </aside>
          </article>

          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm">
              <Toc items={toc} />
            </div>
          </aside>
        </div>


        {/* Footer nav back ------------------------------------------- */}
        <div className="mt-16 border-t border-border pt-8">
          <SectionLink
            section="blog"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All posts
          </SectionLink>
        </div>
      </div>
    </main>
  );
}
