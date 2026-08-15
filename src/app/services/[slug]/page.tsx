import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EMINENT } from "@/config/site";
import { getFeaturedProperties } from "@/lib/repositories/property-repository";
import type { EnquiryReason } from "@/types";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SurveyLine } from "@/components/brand/survey-line";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PropertyCard } from "@/components/property/property-card";

const REASON_BY_SLUG: Record<string, EnquiryReason> = {
  "property-sale-purchase": "Buy/Sell",
  "investment-portfolio-management": "Investment",
  "property-management-allied-services": "Property Management",
};

export function generateStaticParams() {
  return EMINENT.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = EMINENT.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return { title: service.name, description: service.description };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = EMINENT.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const reason = REASON_BY_SLUG[service.slug];
  const showListings = service.slug === "property-sale-purchase";
  const featured = showListings ? getFeaturedProperties(3) : [];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]} />

      <div className="mt-4 max-w-2xl">
        <h1 className="text-display-lg">{service.name}</h1>
        <p className="mt-4 text-body-lg text-ink-secondary">{service.description}</p>
      </div>

      <SurveyLine className="my-10" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
        <div>
          <h2 className="text-heading-lg uppercase text-ink-primary">Why Work With Eminent</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {EMINENT.whyChoose.map((reasonItem) => (
              <li key={reasonItem} className="flex items-start gap-2.5 border-b border-border-hairline pb-3 text-body-md text-ink-primary last:border-0">
                {reasonItem}
              </li>
            ))}
          </ul>

          {showListings && featured.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-heading-lg uppercase text-ink-primary">Featured Listings</h2>
                <Link href="/properties" className="flex items-center gap-1 text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline">
                  View All <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {featured.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-border-hairline bg-surface-raised p-6 shadow-card">
            <h2 className="text-heading-md uppercase text-ink-primary">Enquire About {service.name}</h2>
            <p className="mt-2 text-body-sm text-ink-secondary">Tell us a bit about what you need — our team will get back to you.</p>
            <div className="mt-5">
              <EnquiryForm defaultReason={reason} showReason submitLabel="Send Enquiry" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
