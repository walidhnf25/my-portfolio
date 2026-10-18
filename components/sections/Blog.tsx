"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  CarouselArrows,
  CarouselDots,
  CarouselSlide,
  CarouselTrack,
  useCardCarousel,
} from "@/components/ui/card-carousel";
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/blog";
import { useI18n } from "@/components/providers/LocaleProvider";
import { fmt } from "@/lib/i18n/config";

export default function Blog() {
  const { locale, t } = useI18n();
  const posts = getPosts(locale);
  const [viewport, carousel] = useCardCarousel();

  return (
    <section id="blog" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t.blog.eyebrow}
            title={t.blog.title}
            accent={t.blog.accent}
            description={t.blog.description}
          />
          <CarouselArrows
            carousel={carousel}
            previousLabel={t.common.previous}
            nextLabel={t.common.next}
          />
        </div>

        <CarouselTrack viewport={viewport}>
          {posts.map((post) => (
            <CarouselSlide key={post.slug}>
              <PostCard post={post} locale={locale} labels={t.blog} />
            </CarouselSlide>
          ))}
        </CarouselTrack>

        <CarouselDots carousel={carousel} label={(n) => fmt(t.common.goToSlide, { n })} />
      </div>
    </section>
  );
}
