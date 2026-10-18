import { MetadataRoute } from 'next'
import { postMetas } from '@/lib/blog/posts'
import { projects, projectSlug } from '@/lib/portfolio'
import { localePath, locales } from '@/lib/i18n/config'

const SITE = 'https://aboutwal.id'

/** One entry per locale, each pointing at its sibling via hreflang alternates. */
function entry(
  path: string,
  changeFrequency: 'weekly' | 'monthly',
  priority: number,
  lastModified: Date = new Date()
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, SITE + localePath(l, path)]))
  return locales.map((l) => ({
    url: SITE + localePath(l, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry('/', 'weekly', 1),
    ...entry('/blog', 'weekly', 0.8),
    ...projects.flatMap((p) => entry(`/projects/${projectSlug(p.title)}`, 'monthly', 0.7)),
    ...postMetas.flatMap((post) => entry(`/blog/${post.slug}`, 'monthly', 0.6, new Date(post.date))),
  ]
}
