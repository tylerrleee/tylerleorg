"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="h-1 bg-zinc-800" />
      <nav className="flex items-center justify-between px-8 py-5 bg-white">
        <Link href="/" className="text-lg font-bold tracking-wide text-black">
          TYLER LE
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden sm:flex items-center gap-8">
            <Link
              href="/about"
              className="text-sm font-normal tracking-wide text-black hover:text-zinc-500 transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="work/impression"
              className="text-sm font-normal tracking-wide text-black hover:text-zinc-500 transition-colors"
            >
              PROJECTS
            </Link>
            <Link
              href="https://drive.google.com/file/d/1XLh7zPATjRJMhSv4RFNVKRuOh4w1bA33/view?usp=sharing"
              target='_blank'
              className="text-sm font-normal tracking-wide text-black hover:text-zinc-500 transition-colors"
            >
              RESUME
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center gap-1.5 w-6 h-6 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="block w-full h-px bg-black" />
            <span className="block w-full h-px bg-black" />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="flex flex-col items-end gap-4 px-8 py-6 bg-white border-t border-zinc-100 sm:hidden">
          <Link
            href="/about"
            className="text-sm tracking-wide text-black"
            onClick={() => setMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            href="/work"
            className="text-sm tracking-wide text-black"
            onClick={() => setMenuOpen(false)}
          >
            WORK
          </Link>
          <Link
            href="/resume"
            className="text-sm tracking-wide text-black"
            onClick={() => setMenuOpen(false)}
          >
            RESUME
          </Link>
        </div>
      )}
    </header>
  );
}
