import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DesktopMock, PhoneMock } from "@/components/ui/ProjectMockups";
import { ProjectLink } from "@/components/ui/ProjectLink";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProjectNav } from "@/components/work/ProjectNav";
import { ProjectDemo } from "@/components/work/ProjectDemo";
import { ScreenGallery } from "@/components/work/ScreenGallery";
import { Reveal } from "@/components/work/Reveal";
import {
  categoryLabels,
  getProject,
  getProjectNeighbours,
  getScreens,
  projects,
  toneFor,
} from "@/data/projects";
import { siteConfig } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const screens = getScreens(project);
  const image = screens.desktop[0] ?? screens.mobile[0];
  return {
    title: project.name,
    description: `${project.tagline} ${project.overview}`,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "website",
      url: `/work/${slug}`,
      siteName: siteConfig.name,
      title: `${project.name} — ${project.tagline}`,
      description: project.overview,
      images: image ? [{ url: image.src, alt: image.alt }] : undefined,
    },
  };
}

const eyebrow = "text-xs font-bold tracking-[0.16em] text-amber-deep uppercase";
const sectionTitle = "mt-2 font-display text-2xl leading-tight font-extrabold tracking-tighter sm:text-3xl";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { index, next } = getProjectNeighbours(slug);
  const tone = toneFor(index);
  const nextTone = toneFor(projects.indexOf(next));
  const screens = getScreens(project);
  const number = String(index + 1).padStart(2, "0");

  const fg = tone.dark ? "text-cream" : "text-ink";
  const fgSoft = tone.dark ? "text-cream/80" : "text-ink/80";
  const taglineColor = tone.dark ? "text-amber" : "text-ink";
  const chipBorder = tone.dark ? "border-cream/60" : "border-ink";
  const secondary = tone.dark ? "light" : "outline";

  return (
    <>
      <ProjectNav name={project.name} />
      <main id="main">
        {/* Hero: same colour as the card it grew from, so the transition lands seamlessly */}
        <section
          aria-labelledby="project-title"
          className={`relative overflow-hidden px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 ${fg}`}
          style={{ backgroundColor: tone.hex }}
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full border-[4rem] ${tone.ring}`}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <Link
                href="/#work"
                className="fade-up inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                style={{ ["--d" as string]: 200 }}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All projects
              </Link>

              <div
                className="fade-up mt-4 flex flex-wrap items-center gap-3"
                style={{ ["--d" as string]: 280 }}
              >
                <p className="text-xs font-bold tracking-[0.14em] uppercase">
                  {number} <span className="opacity-50">/</span> {categoryLabels[project.category]}
                </p>
                <span className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${chipBorder}`}>
                  {project.status}
                </span>
              </div>

              <h1
                id="project-title"
                className="mt-5 font-display text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.02] font-extrabold tracking-tighter"
              >
                {project.name.split(" ").map((word, i) => (
                  <span key={`${word}-${i}`}>
                    <span className="word-mask">
                      <span className="word-rise" style={{ ["--i" as string]: i + 2 }}>
                        {word}
                      </span>
                    </span>{" "}
                  </span>
                ))}
              </h1>

              <p
                className={`fade-up mt-4 font-serif text-xl leading-snug italic sm:text-2xl ${taglineColor}`}
                style={{ ["--d" as string]: 650 }}
              >
                {project.tagline}
              </p>
              <p
                className={`fade-up mt-4 max-w-xl text-[0.95rem] leading-relaxed sm:text-base ${fgSoft}`}
                style={{ ["--d" as string]: 750 }}
              >
                {project.overview}
              </p>

              <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ ["--d" as string]: 850 }}>
                {project.links.live ? (
                  <Button href={project.links.live} external variant="primary">
                    Live Preview
                  </Button>
                ) : (
                  <Button variant="light" arrow={false} disabled>
                    Live preview coming soon
                  </Button>
                )}
                {project.links.repo && (
                  <Button href={project.links.repo} external variant={secondary}>
                    View Code
                  </Button>
                )}
                {project.links.download && (
                  <Button href={project.links.download} external variant={secondary}>
                    Download
                  </Button>
                )}
              </div>
            </div>

            <div className="fade-up" style={{ ["--d" as string]: 500 }}>
              {project.category === "mobile" ? (
                <div className="mx-auto flex w-full max-w-sm items-end justify-center gap-4 sm:gap-6">
                  <div className="w-[42%] translate-y-6 -rotate-6">
                    <PhoneMock name={project.name} src={project.mobileImage} />
                  </div>
                  <div className="w-[42%] -translate-y-3 rotate-[5deg]">
                    <PhoneMock name={project.name} src={project.mobileImageSecondary} />
                  </div>
                </div>
              ) : (
                <div className="relative mx-auto w-full max-w-xl pb-6">
                  <DesktopMock project={project} priority />
                  {project.hasMobileView && (
                    <div className="absolute -right-1 bottom-0 w-[24%] min-w-[5rem] rotate-[5deg] sm:-right-5">
                      <PhoneMock name={project.name} src={project.mobileImage} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Short looping demo (shown only when one is added) */}
        {project.demo && (
          <section aria-labelledby="demo-title" className="px-5 pt-14 sm:px-8 sm:pt-20">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mb-8 text-center">
                <p className={eyebrow}>In action</p>
                <h2 id="demo-title" className={sectionTitle}>
                  See it <span className="font-serif font-normal text-amber-deep italic">move.</span>
                </h2>
              </Reveal>
              <Reveal>
                <ProjectDemo demo={project.demo} name={project.name} />
              </Reveal>
            </div>
          </section>
        )}

        {/* Overview + highlights */}
        <section className="px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <p className={eyebrow}>Overview</p>
              <h2 className={sectionTitle}>What this project is about</h2>
              <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">{project.overview}</p>
              {project.caseStudy.challenge && (
                <div className="mt-8">
                  <p className={eyebrow}>The challenge</p>
                  <p className="mt-2 text-base leading-relaxed text-mute sm:text-lg">
                    {project.caseStudy.challenge}
                  </p>
                </div>
              )}
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-[1.5rem] border-2 border-ink bg-ink p-6 text-cream shadow-[6px_6px_0_0_var(--color-amber)] sm:p-8">
                <p className="text-xs font-bold tracking-[0.16em] text-amber uppercase">Highlights</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-cream/85">
                  {project.caseStudy.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key features */}
        <section aria-labelledby="features-title" className="bg-cream-deep px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10 text-center">
              <p className={eyebrow}>Features</p>
              <h2 id="features-title" className={sectionTitle}>
                What it can do
              </h2>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((f, i) => (
                <li key={f}>
                  <Reveal delay={(i % 3) * 0.08} className="h-full">
                    <div className="flex h-full items-start gap-3 rounded-2xl border-2 border-ink bg-paper p-5 text-sm font-medium shadow-[3px_3px_0_0_var(--color-ink)] transition-transform duration-300 hover:-translate-y-1">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber">
                        <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden="true" />
                      </span>
                      {f}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tech */}
        <section aria-labelledby="stack-title" className="px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              <p className={eyebrow}>Tech stack</p>
              <h2 id="stack-title" className={sectionTitle}>
                Built with
              </h2>
              <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-sm font-semibold transition-colors duration-200 hover:bg-amber"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Screens */}
        <section aria-labelledby="screens-title" className="bg-cream-deep px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10 text-center">
              <p className={eyebrow}>Screens</p>
              <h2 id="screens-title" className={sectionTitle}>
                Every screen, up close
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-mute sm:text-base">
                Tap or click any screen to view it full size.
              </p>
            </Reveal>
            <ScreenGallery name={project.name} desktop={screens.desktop} mobile={screens.mobile} />
          </div>
        </section>

        {/* Next project */}
        <section aria-labelledby="next-title" className="px-5 pt-14 pb-8 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <p id="next-title" className={`${eyebrow} mb-4 text-center`}>
              Next project
            </p>
            <div data-transition-card>
              <div
                data-media
                className="overflow-hidden rounded-[1.75rem] border-2 border-ink shadow-[6px_6px_0_0_var(--color-ink)]"
                style={{ backgroundColor: nextTone.hex }}
              >
                <ProjectLink
                  href={`/work/${next.slug}`}
                  label={next.name}
                  hex={nextTone.hex}
                  dark={nextTone.dark}
                  className={`group flex items-center justify-between gap-6 p-7 sm:p-12 ${
                    nextTone.dark ? "text-cream" : "text-ink"
                  }`}
                >
                  <span>
                    <span className="block font-display text-[clamp(2rem,6vw,4.5rem)] leading-none font-extrabold tracking-tighter">
                      {next.name}
                    </span>
                    <span className="mt-3 block font-serif text-lg italic sm:text-xl">{next.tagline}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-amber transition-transform duration-500 group-hover:-rotate-45 sm:h-16 sm:w-16"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </span>
                </ProjectLink>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-14 sm:px-8 sm:py-20">
          <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[1.5rem] border-2 border-dashed border-ink/40 p-6 sm:flex-row sm:items-center sm:p-8">
            <p className="max-w-md font-display text-lg font-bold tracking-tight sm:text-xl">
              Want something like this for your business? Let&apos;s talk.
            </p>
            <Button href="/#contact">Start a Project</Button>
          </Reveal>
        </section>
      </main>

      <footer className="bg-ink px-5 py-8 text-cream sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-cream/70">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
          <Link href="/" className="font-semibold text-cream transition-colors hover:text-amber">
            Back to home
          </Link>
        </div>
      </footer>
      <WhatsAppButton />
    </>
  );
}
