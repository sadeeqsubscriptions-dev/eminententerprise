import type { Metadata } from "next";
import Link from "next/link";
import { MapPinned, TrendingUp, ShieldCheck, Handshake, ArrowRight, Globe2, Home as HomeIcon } from "lucide-react";
import { EMINENT, BURAQ, GROUP, CONTACT } from "@/config/site";
import { getFeaturedProperties } from "@/lib/repositories/property-repository";
import { getFeaturedConstructionProjects } from "@/lib/repositories/construction-repository";
import { getAllArticles } from "@/lib/repositories/article-repository";
import { TRUST_STATS } from "@/data/trust-stats";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyImage } from "@/components/media/property-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SurveyLine } from "@/components/brand/survey-line";
import { HeroSearch } from "@/components/home/hero-search";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/home/section-reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Eminent Enterprises is a trusted real estate advisory and property services firm in Islamabad & Rawalpindi, working alongside Buraq Eminent Constructors.",
};

const PILLAR_ICONS = [MapPinned, TrendingUp, ShieldCheck, Handshake];

export default function HomePage() {
  const featuredProperties = getFeaturedProperties(8);
  const featuredProjects = getFeaturedConstructionProjects(3);
  const articles = getAllArticles().slice(0, 3);

  return (
    <div>
      {/* HERO — search instrument, asymmetric split */}
      <section className="relative overflow-hidden bg-surface-inverted-deep">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
          <PropertyImage
            src="https://picsum.photos/seed/eminent-hero-skyline/1400/1600"
            alt="Aerial view of a planned housing sector in Islamabad"
            fill
            sizes="52vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-28 lg:pt-24">
          <p className="text-label font-semibold uppercase tracking-widest text-accent">{EMINENT.positioning}</p>
          <h1 className="mt-3 max-w-2xl text-display-lg text-paper sm:text-display-xl">{EMINENT.heroHeadline}</h1>
          <p className="mt-5 max-w-lg text-body-lg text-ink-inverted-muted">{EMINENT.subPositioningBody}</p>

          <div className="mt-9 max-w-xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      <SurveyLine className="mx-auto my-2 max-w-[1440px] px-4 sm:px-6" />

      {/* GROUP positioning */}
      <SectionReveal>
        <section className="mx-auto max-w-[820px] px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-display-md">{GROUP.headline}</h2>
          <p className="mt-4 text-body-lg text-ink-secondary">{GROUP.body}</p>
        </section>
      </SectionReveal>

      {/* TWO-BRAND SPLIT */}
      <SectionReveal>
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-8 bg-surface-inverted px-6 py-14 sm:px-10 lg:px-16">
            <div>
              <p className="text-label font-semibold uppercase tracking-widest text-accent">Real Estate Advisory</p>
              <h3 className="mt-3 text-display-sm text-paper">{EMINENT.name}</h3>
              <p className="mt-4 max-w-md text-body-md text-ink-inverted-muted">{EMINENT.boilerplate}</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="w-fit border-white/30 text-paper hover:border-accent">
              <Link href="/properties">
                Explore Properties <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-surface-warm px-6 py-14 sm:px-10 lg:px-16">
            <div>
              <p className="text-label font-semibold uppercase tracking-widest text-accent-strong">Construction</p>
              <h3 className="mt-3 text-display-sm text-ink-primary">{BURAQ.name}</h3>
              <p className="mt-4 max-w-md text-body-md text-ink-secondary">{BURAQ.intro}</p>
            </div>
            <Button asChild size="lg" className="w-fit">
              <Link href="/construction">
                Discover Buraq <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </SectionReveal>

      {/* FEATURED LISTINGS */}
      {featuredProperties.length > 0 && (
        <SectionReveal>
          <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-label font-semibold uppercase tracking-widest text-accent-strong">Handpicked</p>
                <h2 className="mt-2 text-display-sm">Featured Listings</h2>
              </div>
              <Link href="/properties" className="flex items-center gap-1 text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline">
                View All Properties <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
              {featuredProperties.map((p) => (
                <PropertyCard key={p.id} property={p} className="w-[280px] shrink-0 snap-start sm:w-[320px]" />
              ))}
            </div>
          </section>
        </SectionReveal>
      )}

      {/* FOUR PILLARS */}
      <SectionReveal>
        <section className="bg-surface-sunken px-4 py-16 sm:px-6 sm:py-20">
          <StaggerGroup className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 sm:grid-cols-4">
            {EMINENT.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
              return (
                <StaggerItem key={pillar} className="flex flex-col items-center gap-3 border border-border-hairline bg-surface-raised px-4 py-8 text-center">
                  <Icon className="h-7 w-7 text-accent-strong" aria-hidden="true" />
                  <p className="text-body-sm font-semibold uppercase tracking-wide text-ink-primary">{pillar}</p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>
      </SectionReveal>

      {/* FEATURED BURAQ PROJECTS */}
      {featuredProjects.length > 0 && (
        <SectionReveal>
          <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-label font-semibold uppercase tracking-widest text-accent-strong">Buraq Eminent Constructors</p>
                <h2 className="mt-2 text-display-sm">Recent Construction Work</h2>
              </div>
              <Link href="/construction/portfolio" className="flex items-center gap-1 text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline">
                View Portfolio <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => {
                const cover = project.afterImages[0] ?? project.beforeImages[0];
                return (
                  <Link
                    key={project.id}
                    href={`/construction/portfolio/${project.slug}`}
                    className="group flex flex-col border border-border-hairline bg-surface-raised shadow-card transition-shadow hover:shadow-raised"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                      {cover && (
                        <PropertyImage
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <Badge variant="accent" className="absolute left-3 top-3">
                        {project.qualityTier}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1.5 p-4">
                      <p className="font-semibold text-ink-primary">{project.title}</p>
                      <p className="text-body-sm text-ink-secondary">{project.location}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </SectionReveal>
      )}

      {/* AUDIENCE SPLIT */}
      <SectionReveal>
        <section className="bg-surface-inverted px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2">
            <div className="border-t-2 border-accent pt-5">
              <HomeIcon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-3 text-heading-lg uppercase text-paper">For Local Clients</h3>
              <p className="mt-3 text-body-md text-ink-inverted-muted">{EMINENT.audienceSplit.local}</p>
            </div>
            <div className="border-t-2 border-accent pt-5">
              <Globe2 className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-3 text-heading-lg uppercase text-paper">For International Clients</h3>
              <p className="mt-3 text-body-md text-ink-inverted-muted">{EMINENT.audienceSplit.international}</p>
              <Link href="/overseas" className="mt-3 inline-flex items-center gap-1 text-body-sm font-semibold uppercase tracking-wide text-accent hover:underline">
                Overseas Pakistanis Hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* INSIGHTS TEASER */}
      {articles.length > 0 && (
        <SectionReveal>
          <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-label font-semibold uppercase tracking-widest text-accent-strong">Insights</p>
                <h2 className="mt-2 text-display-sm">Latest From Our Desk</h2>
              </div>
              <Link href="/insights" className="flex items-center gap-1 text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline">
                All Insights <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/insights/${article.slug}`}
                  className="group flex flex-col border border-border-hairline bg-surface-raised shadow-card transition-shadow hover:shadow-raised"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                    <PropertyImage
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <Badge variant="neutral" className="w-fit">
                      {article.category}
                    </Badge>
                    <p className="line-clamp-2 font-semibold text-ink-primary">{article.title}</p>
                    <p className="mt-auto text-body-sm text-ink-muted">
                      {new Date(article.publishedAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })} · {article.readMinutes} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </SectionReveal>
      )}

      {/* TRUST BAND */}
      <SectionReveal>
        <section className="bg-surface-warm px-4 py-14 sm:px-6">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center sm:flex-row sm:items-stretch sm:justify-between sm:text-left">
            <div className="sm:max-w-xs">
              <p className="text-label font-semibold uppercase tracking-widest text-accent-strong">Track Record</p>
              <p className="mt-2 text-heading-lg uppercase text-ink-primary">{EMINENT.credentialBadge}</p>
              <p className="mt-2 text-body-sm text-ink-muted">Figures below are indicative of our scale, not audited public statistics.</p>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="border-l-2 border-accent-strong pl-4 text-left">
                  <p className="font-tabular-nums text-display-sm text-navy-800">{stat.value}</p>
                  <p className="mt-1 text-body-sm text-ink-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SurveyLine className="mx-auto my-2 max-w-[1440px] px-4 sm:px-6" />

      {/* CLOSING CTA */}
      <SectionReveal>
        <section className="bg-surface-inverted-deep px-4 py-20 text-center sm:px-6">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-display-md text-paper">{EMINENT.closingCta.headline}</h2>
            <p className="mt-4 text-body-lg text-ink-inverted-muted">{EMINENT.closingCta.body}</p>
            <p className="mt-2 text-body-sm uppercase tracking-wide text-accent">{EMINENT.closingCta.signature}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="whatsapp" size="lg">
                <a href={buildWhatsAppLink("Hi Eminent Enterprises, I'd like to know more about your services.")} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
