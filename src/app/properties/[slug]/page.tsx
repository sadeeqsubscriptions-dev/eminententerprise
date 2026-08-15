import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getAllProperties, getPropertyBySlug, getSimilarProperties } from "@/lib/repositories/property-repository";
import { getAgentById } from "@/lib/repositories/agent-repository";
import { getLocationBySlug } from "@/data/locations";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { GalleryLightbox } from "@/components/property/gallery-lightbox";
import { SpecTable } from "@/components/property/spec-table";
import { AgentCard } from "@/components/property/agent-card";
import { PriceTag } from "@/components/property/price-tag";
import { ShortlistButton } from "@/components/property/shortlist-button";
import { CompareButton } from "@/components/property/compare-button";
import { ShareButton } from "@/components/property/share-button";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyMap } from "@/components/property/property-map";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { UnitConverterWidget } from "@/components/shared/unit-converter-widget";
import { SurveyLine } from "@/components/brand/survey-line";
import { formatPKR } from "@/lib/format-pkr";
import { CONTACT } from "@/config/site";
import { PropertyImage } from "@/components/media/property-image";

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  const description = property.description.slice(0, 155);
  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      images: property.images[0] ? [{ url: property.images[0].src }] : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgentById(property.agentId);
  const similar = getSimilarProperties(property, 4);
  const location = getLocationBySlug(property.location.areaSlug);
  const areaAverage = location?.basePricePerMarla;
  const vsAverage =
    property.pricePerMarla && areaAverage ? ((property.pricePerMarla - areaAverage) / areaAverage) * 100 : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${CONTACT.websiteHref}/properties/${property.slug}`,
    datePosted: property.addedAt,
    image: property.images.map((i) => i.src),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location.area,
      addressRegion: property.location.cityLabel,
      addressCountry: "PK",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "PKR",
      availability: property.pakistanFields.possession === "Ready" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: CONTACT.websiteHref },
      { "@type": "ListItem", position: 2, name: "Properties", item: `${CONTACT.websiteHref}/properties` },
      { "@type": "ListItem", position: 3, name: property.title, item: `${CONTACT.websiteHref}/properties/${property.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
          { label: property.location.cityLabel, href: `/properties?city=${property.location.city}` },
          { label: property.title },
        ]}
      />

      <div className="mt-4">
        <GalleryLightbox images={property.images} title={property.title} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">{property.purpose === "buy" ? "For Sale" : "For Rent"}</Badge>
            {property.isFeatured && <Badge variant="accent">Featured</Badge>}
            {property.isVerified && <Badge variant="verified">Verified</Badge>}
            <Badge variant="outline">{property.pakistanFields.approval}</Badge>
            <span className="font-tabular-nums text-body-sm text-ink-muted">Ref: {property.ref}</span>
          </div>

          <h1 className="mt-3 text-display-md">{property.title}</h1>
          <p className="mt-1 text-body-lg text-ink-secondary">
            {property.location.area}, {property.location.cityLabel}
          </p>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-y border-border-hairline py-5">
            <div>
              <PriceTag amount={property.price} perMonth={property.priceUnit === "month"} size="lg" />
              {property.pricePerMarla && (
                <p className="mt-1 font-tabular-nums text-body-sm text-ink-secondary">
                  {formatPKR(property.pricePerMarla).short} per Marla
                  {typeof vsAverage === "number" && (
                    <span className={`ml-2 inline-flex items-center gap-1 ${vsAverage > 0 ? "text-danger" : "text-success"}`}>
                      {vsAverage > 0 ? <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> : <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />}
                      {Math.abs(vsAverage).toFixed(0)}% {vsAverage > 0 ? "above" : "below"} area average
                    </span>
                  )}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ShortlistButton propertyId={property.id} variant="labelled" />
              <CompareButton propertyId={property.id} className="static bg-transparent text-ink-secondary shadow-none hover:text-accent-strong" />
              <ShareButton title={property.title} path={`/properties/${property.slug}`} />
            </div>
          </div>

          <Tabs defaultValue="overview" className="mt-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {property.floorPlans.length > 0 && <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>}
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="converter">Area Converter</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <p className="whitespace-pre-line text-body-lg text-ink-secondary">{property.description}</p>

              <Separator className="my-8" />
              <SpecTable property={property} />

              {property.amenities.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <h3 className="mb-4 text-heading-lg uppercase text-ink-primary">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {property.amenities.map((a) => (
                      <span key={a} className="border border-border-hairline px-3 py-2 text-body-sm text-ink-primary">
                        {a}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {property.features.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <h3 className="mb-4 text-heading-lg uppercase text-ink-primary">Features</h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {property.features.map((f) => (
                      <li key={f} className="text-body-sm text-ink-secondary">
                        — {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </TabsContent>

            {property.floorPlans.length > 0 && (
              <TabsContent value="floorplan">
                <div className="grid gap-4 sm:grid-cols-2">
                  {property.floorPlans.map((fp) => (
                    <div key={fp.src} className="relative aspect-[4/3] border border-border-hairline">
                      <PropertyImage src={fp.src} alt={fp.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            <TabsContent value="location">
              <PropertyMap
                markers={[{ id: property.id, lat: property.location.coords.lat, lng: property.location.coords.lng, label: property.location.area }]}
                center={[property.location.coords.lat, property.location.coords.lng]}
                zoom={14}
                fitToMarkers={false}
                height={420}
              />
            </TabsContent>

            <TabsContent value="converter">
              <UnitConverterWidget initialSqft={property.area.sqft} />
            </TabsContent>
          </Tabs>

          {similar.length > 0 && (
            <>
              <SurveyLine className="my-10" />
              <h2 className="mb-5 text-display-sm">Similar Properties</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-5">
            {agent && <AgentCard agent={agent} propertyRef={property.ref} propertyTitle={property.title} />}
            <MortgageSnippet price={property.price} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function MortgageSnippet({ price }: { price: number }) {
  const downPayment = price * 0.2;
  const loan = price - downPayment;
  const monthlyRate = 0.19 / 12;
  const months = 15 * 12;
  const monthly = (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="border border-border-hairline bg-surface-sunken p-5">
      <p className="text-heading-sm uppercase text-ink-secondary">Estimated Instalment</p>
      <p className="mt-2 font-tabular-nums text-2xl font-semibold text-navy-800">{formatPKR(monthly, { perMonth: true }).short}</p>
      <p className="mt-1 text-body-sm text-ink-muted">Based on 20% down payment, 15-year tenure, ~19% indicative markup.</p>
      <a href="/tools/mortgage-calculator" className="mt-3 inline-block text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline">
        Open Full Calculator →
      </a>
    </div>
  );
}
