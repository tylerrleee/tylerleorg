import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, getProjectIndex } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found — Tyler Le" };
  return {
    title: `${project.name} — Tyler Le`,
    description: project.blurb,
    openGraph: {
      title: `${project.name} — Tyler Le`,
      description: project.blurb,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = getProjectIndex(slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <main className="flex w-full flex-1 justify-center bg-white">
      <article className="w-full max-w-3xl px-6 py-10 lg:py-16">
        {/* Back link — escape route */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <header className="mt-8">
          <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.18em] text-zinc-400">
            {project.year} · {project.role}
          </p>
          <h1 className="mt-2 font-[var(--font-editorial)] text-5xl font-extralight leading-tight text-black lg:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">{project.blurb}</p>
        </header>

        {/* Hero image */}
        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-black/10">
          <Image
            src={project.image}
            alt={`${project.name} project preview`}
            fill
            priority
            unoptimized={project.image.endsWith(".svg")}
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Tags + external links */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-geist-mono)] rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs tracking-[0.06em] text-zinc-600"
            >
              {tag}
            </span>
          ))}

          <div className="ml-auto flex flex-wrap gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-4 text-sm text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Code
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-300 px-4 text-sm text-black transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Live demo
              </a>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 space-y-4 text-base leading-relaxed text-zinc-700">
          {project.description.split("\n").filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Figures — UI screenshots / diagrams (intrinsic sizing, never cropped) */}
        {project.figures && project.figures.length > 0 && (
          <div className="mt-10 space-y-8">
            {project.figures.map((fig) => (
              <figure key={fig.src}>
                <Image
                  src={fig.src}
                  alt={fig.caption ?? `${project.name} figure`}
                  width={fig.width}
                  height={fig.height}
                  unoptimized={fig.src.endsWith(".svg")}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="h-auto w-full rounded-xl ring-1 ring-black/10"
                />
                {fig.caption && (
                  <figcaption className="font-[family-name:var(--font-geist-mono)] mt-3 text-xs leading-relaxed tracking-[0.04em] text-zinc-400">
                    {fig.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Outcome highlight */}
        {project.outcome && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.22em] text-zinc-400">
              OUTCOME
            </p>
            <p className="mt-1 text-base text-black">{project.outcome}</p>
          </div>
        )}

        {/* Prev / next project nav — spatial continuity */}
        <nav className="mt-14 flex items-stretch justify-between gap-4 border-t border-zinc-200 pt-6">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-1 flex-col gap-0.5 rounded-xl px-2 py-2 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
            >
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.18em] text-zinc-400">
                ← PREVIOUS
              </span>
              <span className="text-sm text-black group-hover:text-zinc-600">{prev.name}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-1 flex-col items-end gap-0.5 rounded-xl px-2 py-2 text-right transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
            >
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.18em] text-zinc-400">
                NEXT →
              </span>
              <span className="text-sm text-black group-hover:text-zinc-600">{next.name}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      </article>
    </main>
  );
}
