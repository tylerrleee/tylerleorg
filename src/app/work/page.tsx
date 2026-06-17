import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Tyler Le",
  description:
    "Leadership at the Vietnamese Student Organization at the University of Florida — cultural shows, the Pho Fundraiser, and mentorship.",
};

type Pillar = {
  title: string;
  image?: { src: string; width: number; height: number };
  stats: string[];
  body: string;
};

const pillars: Pillar[] = [
  {
    title: "Cultural Shows",
    image: { src: "/images/work/cultureshow.jpg", width: 2000, height: 1333 },
    stats: [
      "1,400+ attendees",
      "120 volunteers",
      "$22,000 budget",
      "First in 52 years",
    ],
    body: "Our cultural shows are the big hits. Each semester we celebrate Vietnamese holidays — Mid-Autumn and Lunar New Year — bringing the culture to campus through dance groups, performances, catering, and event programming. This year we expanded the show from the 800-seat Reitz Student Union Ballroom to the Curtis M. Phillips Center for the Performing Arts. Through contingency planning with UF's AV team, our faculty advisor, and budget allocation from Student Government, we grew to over 1,400 attendees, 120 volunteers, and a $22,000 budget. For the first time in the organization's 52 years, we could accommodate larger dance groups, live-stream the show, and host more of our community alongside the Performing Arts Center's staff.",
  },
  {
    title: "Pho Fundraiser",
    image: { src: "/images/work/vso-pho.jpg", width: 2000, height: 1333 },
    stats: [
      "$3,000+ in 8 hours",
      "300+ served",
      "40+ volunteers",
      "100% to Vietnam Health Clinic",
    ],
    body: "The Pho Fundraiser is VSO's premier annual philanthropic event. What began as a small campus initiative has grown into a large-scale community event where over 40 officers and volunteers serve more than 300 students and Gainesville residents. It celebrates Vietnamese culture while raising awareness for healthcare disparities in rural Vietnam, and it's remarkably efficient — generating over $3,000 in just eight hours. 100% of the proceeds support the Vietnam Health Clinic (VHC), a non-profit that deploys mobile clinics offering free exams, treatments, and medications to underserved villages. Beyond the funds, the event doubles as a leadership and cultural workshop: volunteers learn traditional cooking techniques from alumni and gain hands-on experience in large-scale logistics, budgeting, marketing, and sponsorship.",
  },
  {
    title: "Mentor–Mentee (Anh Chi Em)",
    image: { src: "/images/work/vso-ace.jpg", width: 2000, height: 1333 },
    stats: ["300+ member community", "Mentor–mentee matching"],
    body: "With a student community of over 300, we run a mentor–mentee program where our Public Relations director matches members across different perspectives into family groups. These groups bond and build long-lasting connections that carry on as they mentor the underclassmen who follow them.",
  },
];

export default function WorkPage() {
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

        {/* Header */}
        <header className="mt-8">
          <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.18em] text-zinc-400">
            LEADERSHIP · President · formerly External VP
          </p>
          <h1 className="mt-2 font-[var(--font-editorial)] text-5xl font-extralight leading-tight text-black lg:text-6xl">
            Vietnamese Student Organization
          </h1>
          <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed text-zinc-600">
            <p>
              Outside of classes and runs, I spent the bulk of my time as the President of the Vietnamese Student Organization at
              the University of Florida.
            </p>
            <p>
              It&apos;s a cultural organization founded in 1973, when some of the first Vietnamese
              immigrants came to the U.S. for opportunity and education, and wanted a place that
              felt like home on a distant continent. What started as a dinner gathering over
              Vietnamese food in Gainesville has grown into an annually celebrated community that
              roughly 19 student leaders pour themselves into. As President, I oversee the
              organization&apos;s overall operations.
            </p>
          </div>
        </header>

        {/* Org hero image */}
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-black/10">
          <Image
            src="/images/work/vso-org.jpg"
            alt="Vietnamese Student Organization leadership team"
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Pillars */}
        <div className="mt-14 space-y-16">
          {pillars.map((pillar) => (
            <section key={pillar.title}>
              <h2 className="font-[var(--font-editorial)] text-3xl font-extralight text-black">
                {pillar.title}
              </h2>

              {pillar.image && (
                <div className="relative mt-5 aspect-[3/2] w-full overflow-hidden rounded-2xl ring-1 ring-black/10">
                  <Image
                    src={pillar.image.src}
                    alt={pillar.title}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Stat row */}
              <div className="mt-5 flex flex-wrap gap-2">
                {pillar.stats.map((stat) => (
                  <span
                    key={stat}
                    className="font-[family-name:var(--font-geist-mono)] rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs tracking-[0.04em] text-zinc-600"
                  >
                    {stat}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-base leading-relaxed text-zinc-700">{pillar.body}</p>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 border-t border-zinc-200 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back to home
          </Link>
        </div>
      </article>
    </main>
  );
}
