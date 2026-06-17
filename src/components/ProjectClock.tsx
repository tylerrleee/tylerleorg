"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback, type KeyboardEvent } from "react";
import type { Project } from "@/data/projects";

export type { Project };

export default function ProjectClock({ projects, className }: { projects: Project[]; className?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Observe panels via querySelectorAll — avoids ref-forwarding issues with <Link> in React 19.
  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;
    const panels = root.querySelectorAll<HTMLElement>("[data-index]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.index));
          }
        });
      },
      { root, threshold: 0.6 },
    );
    panels.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [projects]);

  const goTo = useCallback(
    (i: number) => {
      const root = viewportRef.current;
      if (!root) return;
      const clamped = Math.max(0, Math.min(projects.length - 1, i));
      // Scroll to the target panel's real position so it lands exactly on a snap
      // point — a computed `i * clientHeight` can miss it, and `scroll-snap-type:
      // mandatory` then snaps straight back, making the buttons appear to do nothing.
      const target = root.querySelector<HTMLElement>(`[data-index="${clamped}"]`);
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      root.scrollTo({ top: target.offsetTop, behavior: reduce ? "auto" : "smooth" });
    },
    [projects.length],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); goTo(active - 1); }
  };

  const atRest = projects.length === 0;

  return (
    <div className={className ?? "mx-auto"} style={className ? undefined : { width: "clamp(360px, 32vw, 500px)" }}>
      {/* Glass window */}
      <div
        className="glass-window relative overflow-hidden rounded-2xl ring-1 ring-black/10"
        style={{ aspectRatio: "1.5 / 1" }}
      >
        {atRest ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.22em] text-zinc-500">
              NEW WORK, COMING SOON
            </p>
          </div>
        ) : (
          <>
            {/* Scroll viewport — fills the window */}
            <div
              ref={viewportRef}
              onKeyDown={onKeyDown}
              tabIndex={0}
              role="region"
              aria-label="Selected projects"
              className="glass-viewport absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/70"
            >
              {projects.map((p, i) => (
                <Link
                  key={p.slug}
                  data-index={i}
                  href={`/work/${p.slug}`}
                  className="glass-panel group relative block h-full w-full overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/70"
                >
                  <Image
                    src={p.image}
                    alt={`${p.name} project preview`}
                    fill
                    sizes="(min-width: 1024px) 32vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  {/* Frosted index chip */}
                  <span className="glass-chip font-[family-name:var(--font-geist-mono)] absolute right-3 top-3 rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] tracking-[0.08em] text-white">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>

                  {/* Caption — strong scrim for legibility over any image */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-12 pt-10">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-[var(--font-editorial)] text-[22px] font-extralight leading-tight text-[#fbf8f1]">
                        {p.name}
                      </p>
                      <span className="font-[family-name:var(--font-geist-mono)] shrink-0 text-[11px] tracking-[0.08em] text-white/80">
                        {p.year}
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-white/90">
                      {p.blurb}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {p.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="glass-chip font-[family-name:var(--font-geist-mono)] rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[9.5px] tracking-[0.08em] text-white/85"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="font-[family-name:var(--font-geist-mono)] ml-auto inline-flex items-center gap-1 text-[10px] tracking-[0.08em] text-white/90 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
                        VIEW PROJECT
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            

            {/* Prev / next — frosted glass pills, >=44px touch targets */}
            <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous project"
                className="glass-nav pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Next project"
                className="glass-nav pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            {/* Screen-reader live position */}
            <p className="sr-only" aria-live="polite">
              Project {active + 1} of {projects.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
