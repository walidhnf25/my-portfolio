"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PostCard } from "@/components/blog/post-card";
import { sortedPosts } from "@/lib/blog";

export default function Blog() {
  return (
    <section id="blog" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Notes on building"
            accent="better software"
            description="Short reads on clean code, production readiness, and scalability."
          />
          <Link
            href="/blog"
            className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
          >
            All posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <RevealItem key={post.slug}>
              <PostCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
