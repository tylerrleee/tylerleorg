import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="flex w-full flex-1 items-center justify-center bg-white px-6 py-20">
      <div className="text-center">
        <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.22em] text-zinc-400">
          404
        </p>
        <h1 className="mt-3 font-[var(--font-editorial)] text-4xl font-extralight text-black">
          Project not found
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          That project doesn&apos;t exist (or hasn&apos;t been published yet).
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to home
        </Link>
      </div>
    </main>
  );
}
