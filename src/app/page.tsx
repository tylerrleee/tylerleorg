import Link from "next/link";
import ProjectClock from "@/components/ProjectClock";
import { projects } from "@/data/projects";

const workHistory = [
  {
    date: "Present",
    title: "Data Products & Application Engineer Intern",
    company: "Trulieve",
    href: "/work/trulieve",
  },
  {
    date: "May '26 ",
    title: "Software Engineer Intern (part-time)",
    company: "UF SMASH Research Lab",
    href: "/work/uf-smash-research-lab",
  },
  {
    date: "Aug '25",
    title: "Undergraduate Researcher",
    company: "Gator Glaciology Lab",
    href: "/work/gator-glaciology-lab",
  },
  {
    date: "May '25",
    title: "Data Analytics Intern",
    company: "Blockchain Association Singapore",
    href: "/work/blockchain-association-singapore",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 w-full bg-white">
      {/* Mobile Layout */}
      <div className="flex flex-col w-full px-6 py-10 lg:hidden">
        {/* Social Links */}
        <div className="flex gap-4 mb-8">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      
        

        {/* Header */}
        <div className="text-center pt-16 pb-10">
          <p className="font-[var(--font-editorial)] text-2xl font-extralight text-zinc-500 mb-2">
            Hello!
          </p>
          <h1 className="font-[var(--font-editorial)] text-5xl font-extralight leading-tight text-black">
            i&apos;m tyler le.
          </h1>
        </div>

        {/* Work History */}
        <div className="flex flex-col border-t border-zinc-200 mb-10">
          {workHistory.map((entry) => (
            <div
              key={entry.href}
              className="flex flex-col gap-0.5 py-4 border-b border-zinc-100 px-1"
            >
              <span className="text-xs text-zinc-400">{entry.date}</span>
              <span className="text-sm text-black">{entry.title}</span>
              <span className="text-xs text-zinc-500">{entry.company}</span>
            </div>
          ))}
        </div>

        {/* Selected Projects */}
        <h2 className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.22em] text-zinc-400 mb-4">
          SELECTED PROJECTS
        </h2>
        <div className="flex justify-center mb-10">
          <ProjectClock projects={projects} />
        </div>

        {/* Availability & CTA */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-black">Looking for new opportunities!</span>
          <Link
            href="/work"
            className="bg-black text-white text-sm px-6 py-2 rounded-full hover:bg-zinc-800 transition-colors"
          >
            see what I do outside
          </Link>
        </div>
        <p className="text-sm text-zinc-500 text-right mb-10">based in Gainesville</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-10 text-xs text-zinc-500">
          <span>tyleee0105@gmail.com</span>
          <span>&copy; 2026</span>
        </div>
      </div>

      {/* Desktop 3-Column Layout */}
      <div className="hidden lg:grid lg:grid-cols-[280px_1fr_280px] w-full min-h-[calc(100vh-60px)]">
        {/* Left Column */}
        <div className="flex flex-col p-8 border-r border-zinc-100">
          <div className="flex flex-col gap-3 mb-10">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-black hover:text-zinc-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 text-black hover:text-zinc-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
          
        </div>

        {/* Center Column */}
        <div className="flex flex-col px-8 pb-8 pt-0">
          <div className="text-center mb-8 pt-6">
            <p className="font-[var(--font-editorial)] text-4xl font-extralight text-zinc-500 mb-3">
              Hello!
            </p>
            <h1 className="font-[var(--font-editorial)] text-7xl font-extralight leading-tight text-black">
              i&apos;m tyler le.
            </h1>
          </div>

          {/* Work History */}
          <div className="flex flex-col border-t border-zinc-200 mb-12">
            {workHistory.map((entry) => (
              <div
                key={entry.href}
                className="grid grid-cols-[100px_1fr_auto] items-center gap-4 py-4 border-b border-zinc-100 text-sm px-1"
              >
                <span className="text-zinc-400">{entry.date}</span>
                <span className="text-black">{entry.title}</span>
                <span className="text-zinc-500">{entry.company}</span>
              </div>
            ))}
          </div>

          {/* Selected Projects */}
          <div className="w-[75%] mx-auto">
            <h2 className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.22em] text-zinc-400 mb-4 text-center">
              SELECTED PROJECTS
            </h2>
            <ProjectClock projects={projects} className="w-full" />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between p-8 border-l border-zinc-100">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black">I go outside! </span>
                <Link
                  href="/work"
                  className="inline-block text-center bg-black text-white text-sm px-6 py-2 rounded-full hover:bg-zinc-800 transition-colors"
                >
                  see my hobbies
                </Link>
            </div>
            <p className="text-sm text-zinc-500 text-right">based in Gainesville, FL</p>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>tyleee0105@gmail.com</span>
            <span>&copy; 2026</span>
          </div>
        </div>
      </div>
    </main>
  );
}
