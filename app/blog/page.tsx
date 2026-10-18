import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { SectionLink } from "@/components/ui/section-link";
import { sortedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Walid Hanif Ataullah",
  description:
    "Short reads on clean code, production readiness, and scalability.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <main className="section-anchor relative">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8">
        <SectionLink
          section="home"
          className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </SectionLink>

        <header className="mt-8 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Blog</span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Notes on building <span className="text-gradient-accent">better software</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Short reads on clean code, production readiness, and scalability.
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i === 0} />
          ))}
        </div>
      </div>
    </main>
  );
}
