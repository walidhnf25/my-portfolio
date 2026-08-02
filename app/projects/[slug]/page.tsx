import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectShot } from "@/components/ui/project-shot";
import { SectionLink } from "@/components/ui/section-link";
import { getProjectBySlug, projects, projectSlug } from "@/lib/portfolio";

// Every project is known at build time, so prerender them all. Next 16 passes
// `params` as a Promise to page, generateMetadata, and generateStaticParams.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p.title) }));
}

// Reject any slug that is not one we generated, rather than rendering an empty
// shell for a typo'd URL.
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Walid Hanif Ataullah`,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // First shot headlines the hero; the rest fill the gallery below.
  const [heroShot, ...restShots] = project.gallery;

  // Placeholder shape follows the app type: a landscape browser frame for web,
  // a tall phone frame for mobile.
  const isMobile = project.platform === "mobile";
  const shotAspect = isMobile ? "9 / 16" : "16 / 10";
  // A web gallery stretches its landscape shots across a grid, which stays short
  // and tidy. Portrait phone shots stretched the same way balloon to ~650px tall,
  // so the mobile gallery instead lays phones out at a fixed device width and
  // lets them wrap — two per row on small screens, natural size beyond.
  const galleryClass = isMobile
    ? "flex flex-wrap gap-5"
    : "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  const galleryItemClass = isMobile ? "w-[calc(50%-10px)] sm:w-[190px]" : "";

  return (
    <main className="section-anchor relative">
      {/* pt clears the fixed navbar; tighter on mobile where 112px was dead
          space above the fold. max-width matches the home sections. */}
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8">
        <SectionLink
          section="projects"
          className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to projects
        </SectionLink>

        {/* Hero: copy on the left, featured shot on the right ---------- */}
        <section className="mt-8 grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em]">
              <span className="text-accent">{project.category}</span>
              <span className="text-border">·</span>
              <span className="text-muted-foreground">{project.date}</span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl sm:leading-[1.05] lg:text-5xl">
              {project.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-bright"
              >
                Visit live site <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="font-mono text-xs text-muted-foreground">
                <span className="text-muted-foreground/60">Role — </span>
                {project.role}
              </span>
            </div>
          </div>

          {/* Web fills the column with a landscape shot. Mobile shows a single
              phone at the same fixed width as the gallery cards, so the hero
              placeholder and the gallery read as one consistent size. */}
          <div className="lg:col-span-2">
            <ProjectShot
              caption={heroShot}
              index={0}
              aspect={shotAspect}
              className={isMobile ? "mx-auto w-full max-w-[190px]" : undefined}
            />
          </div>
        </section>

        {/* My contribution: a single summary ------------------------- */}
        <section className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            My contribution
          </h2>
          <div className="mt-5 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.contribution}
            </p>
          </div>
        </section>

        {/* Tech stack ------------------------------------------------- */}
        <section className="mt-14">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Built with
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </section>

        {/* Gallery: dummy placeholders until real screenshots land. --- */}
        {restShots.length > 0 && (
          <section className="mt-14">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Gallery
            </h2>
            <div className={`mt-5 ${galleryClass}`}>
              {restShots.map((caption, i) => (
                <div key={caption} className={galleryItemClass}>
                  <ProjectShot caption={caption} index={i + 1} aspect={shotAspect} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer nav back ------------------------------------------- */}
        <div className="mt-16 border-t border-border pt-8">
          <SectionLink
            section="projects"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </SectionLink>
        </div>
      </div>
    </main>
  );
}
