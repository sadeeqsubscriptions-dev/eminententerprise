import type { Metadata } from "next";
import Link from "next/link";
import { Gem, Clock3, MessagesSquare, Users2, CheckCircle2, ArrowRight, Calculator, Building2 } from "lucide-react";
import { BURAQ } from "@/config/site";
import { getFeaturedConstructionProjects } from "@/lib/repositories/construction-repository";
import { buildWhatsAppLink, whatsAppConstructionMessage } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SurveyLine } from "@/components/brand/survey-line";
import { PropertyImage } from "@/components/media/property-image";
import { BeforeAfterSlider } from "@/components/construction/before-after-slider";
import { ProcessTimeline } from "@/components/construction/process-timeline";

export const metadata: Metadata = {
  title: "Buraq Eminent Constructors",
  description:
    "Buraq Eminent Constructors brings new construction, renovation and interior fit-out services to the twin cities and hill regions — backed by 10 years of Eminent Enterprises real estate expertise.",
};

const PILLAR_ICONS = [Gem, Clock3, MessagesSquare, Users2];

export default function ConstructionLandingPage() {
  const featuredProjects = getFeaturedConstructionProjects(3);
  const heroProject = featuredProjects[0];
  const services = [...BURAQ.services].sort((a, b) => a.order - b.order);
  const whatsappHref = buildWhatsAppLink(whatsAppConstructionMessage());

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Construction" }]} />
      </div>

      {/* ---------------------------------------------------------------- HERO */}
      <section className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-4">
          <div className="relative z-10 lg:pr-10">
            <Badge variant="accent">{BURAQ.badge}</Badge>
            <h1 className="mt-4 text-display-lg sm:text-display-xl">{BURAQ.heroHeadline}</h1>
            <p className="mt-5 max-w-lg text-body-lg text-ink-secondary">{BURAQ.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Discuss Your Project on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/construction/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-border-hairline bg-navy-100 sm:aspect-[16/10] lg:-mr-6 lg:aspect-[4/3.2]">
            {heroProject?.afterImages[0] && (
              <PropertyImage
                src={heroProject.afterImages[0].src}
                alt={heroProject.afterImages[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        <SurveyLine className="mt-12" label="Buraq Eminent Constructors" />
      </section>

      {/* ---------------------------------------------------------------- SUB-POSITIONING / ARCHITECT PANEL */}
      <section className="mt-16 bg-surface-inverted py-16 text-ink-inverted">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-display-sm">{BURAQ.subPositioning}</h2>
              <p className="mt-4 max-w-md text-body-lg text-ink-inverted-muted">{BURAQ.subPositioningBody}</p>
            </div>
            <div className="border-t border-border-inverted pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <p className="flex items-center gap-2 text-label uppercase tracking-widest text-gold-300">
                <Building2 className="h-4 w-4" aria-hidden="true" /> Working With Architects
              </p>
              <p className="mt-3 text-body-md text-ink-inverted-muted">
                Every Buraq project begins with a partnership between our construction team and an independent
                architect matched to your site, budget and vision. From first concept sketches through to final
                structural sign-off, the same design panel stays involved — so what gets approved on paper is
                exactly what gets built on site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- PILLARS */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-border-hairline bg-border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {BURAQ.pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Gem;
            return (
              <div key={pillar} className="flex flex-col items-start gap-3 bg-surface-raised p-6">
                <Icon className="h-6 w-6 text-accent-strong" aria-hidden="true" />
                <p className="text-heading-sm uppercase text-ink-primary">{pillar}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- SERVICES (sanctioned literal 1–5 sequence) */}
      <section className="bg-surface-warm py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <h2 className="text-display-sm">Our Services</h2>
          <p className="mt-2 max-w-2xl text-body-md text-ink-secondary">
            A construction project moves through the same five stages, in order — here&apos;s where Buraq fits into
            each one.
          </p>

          <ol className="mt-8 flex flex-col divide-y divide-border-hairline border-y border-border-hairline">
            {services.map((service) => (
              <li key={service.slug} className="group">
                <Link
                  href={`/construction/services/${service.slug}`}
                  className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:gap-8"
                >
                  <span className="font-tabular-nums text-display-sm text-accent-strong sm:w-16 sm:shrink-0">
                    {String(service.order).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-heading-lg uppercase text-ink-primary group-hover:text-navy-800">{service.name}</h3>
                    <p className="mt-1 max-w-2xl text-body-sm text-ink-secondary">{service.description}</p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-strong"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- WHY CHOOSE */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="text-display-sm">Why Choose Buraq</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {BURAQ.whyChoose.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-body-md text-ink-primary">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" aria-hidden="true" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <p className="font-accent text-2xl italic text-ink-secondary lg:pl-10 lg:text-3xl">
            &ldquo;{BURAQ.signatureLines[0]}&rdquo;
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- PORTFOLIO SLIDER */}
      {featuredProjects.length > 0 && (
        <section className="bg-surface-warm py-16">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-display-sm">See The Difference</h2>
                <p className="mt-2 max-w-xl text-body-md text-ink-secondary">
                  Drag the divider to compare before and after on a few of our recent builds.
                </p>
              </div>
              <Link href="/construction/portfolio" className="text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline">
                Full Portfolio →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <div key={project.id} className="flex flex-col gap-3">
                  <BeforeAfterSlider project={project} />
                  <Link href={`/construction/portfolio/${project.slug}`} className="text-body-md font-semibold text-ink-primary hover:text-navy-800">
                    {project.title}
                  </Link>
                  <p className="text-body-sm text-ink-secondary">{project.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- PROCESS TIMELINE */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6">
        <h2 className="text-display-sm">How A Buraq Project Runs</h2>
        <p className="mt-2 max-w-2xl text-body-md text-ink-secondary">
          A simple, five-stage process from first conversation to final handover.
        </p>
        <div className="mt-8">
          <ProcessTimeline />
        </div>
      </section>

      {/* ---------------------------------------------------------------- ESTIMATOR CTA */}
      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
        <div className="flex flex-col items-start gap-6 border border-border-hairline bg-surface-inverted p-8 text-ink-inverted sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-start gap-4">
            <Calculator className="h-9 w-9 shrink-0 text-gold-300" aria-hidden="true" />
            <div>
              <h2 className="text-heading-lg uppercase text-white">Get An Indicative Build Cost</h2>
              <p className="mt-2 max-w-md text-body-md text-ink-inverted-muted">
                Enter your covered area, storeys and finish level for a quick, indicative cost breakdown — no
                obligation, no waiting.
              </p>
            </div>
          </div>
          <Button asChild variant="primary" size="lg" className="shrink-0">
            <Link href="/construction/estimate">Open Cost Estimator</Link>
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <SurveyLine className="mb-4" />
      </div>

      {/* ---------------------------------------------------------------- CLOSING CTA */}
      <section className="bg-surface-inverted-deep py-20 text-center text-ink-inverted">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="font-accent text-3xl italic text-white sm:text-4xl">{BURAQ.signatureLines[2]}</p>
          <p className="mt-4 text-body-md text-ink-inverted-muted">
            Tell us about your plot, your renovation, or your project idea — we&apos;ll respond directly on WhatsApp.
          </p>
          <Button asChild variant="whatsapp" size="lg" className="mt-7 w-full sm:w-auto">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Start a WhatsApp Conversation
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
