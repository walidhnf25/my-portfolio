import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen, Building2, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionLink } from "@/components/ui/section-link";
import { getPublicationBySlug, publications, publicationSlug } from "@/lib/portfolio";

// Every publication is known at build time, so prerender them all.
export function generateStaticParams() {
  return publications.map((p) => ({ slug: publicationSlug(p.title) }));
}

// Reject any slug we did not generate rather than render an empty shell.
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) return { title: "Publication not found" };

  return {
    title: `${pub.title} | Walid Hanif Ataullah`,
    description: pub.abstract,
    openGraph: { title: pub.title, description: pub.abstract },
  };
}

export default async function PublicationDetailPage({ params }: Params) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();

  // Authors is a comma-joined string; split so my name can be marked out.
  const authorList = pub.authors.split(",").map((a) => a.trim());

  // The "at a glance" trio — the facts a reader scans first.
  const facts = [
    { label: "Indexing", value: pub.indexing },
    { label: "My Role", value: pub.role },
    { label: "Year", value: pub.year },
  ];

  return (
    <main className="section-anchor relative overflow-hidden">
      {/* Soft accent glow behind the header, echoing the scene background. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 90% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8">
        <SectionLink
          section="publications"
          className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to publications
        </SectionLink>

        {/* Header ----------------------------------------------------- */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge variant={pub.indexing === "Scopus" ? "solid" : "accent"}>
              {pub.indexing}
            </Badge>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              {pub.venue}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]">
            {pub.title}
          </h1>

          {/* Authors — my name gets the accent so the reader finds me fast. */}
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {authorList.map((name, i) => {
              const mine = name.includes("Walid");
              return (
                <span key={name}>
                  <span className={mine ? "font-semibold text-foreground" : undefined}>
                    {name}
                  </span>
                  {i < authorList.length - 1 && <span className="text-border">, </span>}
                </span>
              );
            })}
          </p>

          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-bright"
          >
            Read full paper <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        {/* At a glance: three stat tiles ------------------------------ */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                {f.label}
              </div>
              <div className="mt-2 font-display text-lg font-bold leading-tight text-gradient-accent">
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {/* Publisher / Venue as a compact card ------------------------ */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                Publisher
              </div>
              <div className="mt-0.5 text-sm font-medium text-foreground">
                {pub.publisher}
              </div>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-border sm:block" />
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              {pub.venueKind === "Journal" ? "Journal" : "Conference"}
            </div>
            <div className="mt-0.5 text-sm font-medium text-foreground">{pub.venue}</div>
          </div>
        </div>

        {/* Abstract — featured with an accent rule -------------------- */}
        <section className="mt-14">
          <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Quote className="h-4 w-4 text-accent" />
            Abstract
          </h2>
          <div className="mt-5 border-l-2 border-accent/40 pl-5 sm:pl-6">
            <p className="text-base leading-[1.8] text-muted-foreground sm:text-lg">
              {pub.abstract}
            </p>
          </div>
        </section>

        {/* Keywords --------------------------------------------------- */}
        <section className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Keywords
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {pub.tags.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </section>

        {/* Footer nav back ------------------------------------------- */}
        <div className="mt-16 border-t border-border pt-8">
          <SectionLink
            section="publications"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All publications
          </SectionLink>
        </div>
      </div>
    </main>
  );
}
