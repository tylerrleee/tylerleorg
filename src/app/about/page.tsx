import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Tyler Le",
  description:
    "Tyler Le — Data Science student at the University of Florida working in data analytics, data engineering, and machine learning.",
};

export default function AboutPage() {
  return (
    <main className="flex w-full flex-1 justify-center bg-white">
      <article className="w-full max-w-3xl px-6 py-10 lg:py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to home
        </Link>

        <div className="mt-8 grid gap-8 sm:grid-cols-[260px_1fr] sm:items-start">
          {/* Headshot */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-black/10">
            <Image
              src="/images/work/tle-headshot.jpg"
              alt="Tyler Le"
              fill
              priority
              sizes="(min-width: 640px) 260px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Intro */}
          <div>
            <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.18em] text-zinc-400">
              ABOUT
            </p>
            <h1 className="mt-2 font-[var(--font-editorial)] text-5xl font-extralight leading-tight text-black lg:text-6xl">
              Tyler Le
            </h1>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-600">
              <p>
                I&apos;m a Data Science student at the University of Florida. Originally from Vietnam, 
                I moved to Northern Virginia at age 10 and later to Sarasota, Florida. 
                Navigating these diverse environments taught me to deeply value cross-cultural 
                communication and collaboration across different areas of expertise.
              </p>
              <p>
                My background is in data analytics, data engineering, and machine learning. I enjoy
                building data products that help me inform decisions and take action.
              </p>
              <p>
                I thrive on building data products that drive informed decisions and actionable results. 
                For example, as an undergraduate researcher at the Gator Glaciology Lab, 
                I integrated CUDA and CuPy into our Markov Chain Monte Carlo (MCMC) codebase.
                By enabling parallel chain execution, we significantly reduced runtime and maximized the 
                efficiency of UF&apos;s HiPerGator supercomputing resources.
              </p>
              <p>
                I am highly analytical and value breaking down complex problems fundamentally before 
                diving into implementation. Outside of data science, I am a novice runner and videographer -- two 
                passions I picked up in college that constantly push my creative and physical boundaries.
              </p>
              
            </div>

            <div className="mt-6 text-sm text-zinc-500">
              See my{" "}
              <Link href="/" className="text-black underline underline-offset-2 hover:text-zinc-600">
                projects
              </Link>{" "}
              or what I do{" "}
              <Link href="/work" className="text-black underline underline-offset-2 hover:text-zinc-600">
                outside of class
              </Link>
              .
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
