import Link from "next/link";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import type { BrandKey } from "@/config/site";
import { CONTACT, EMINENT, BURAQ, NAV } from "@/config/site";
import { SurveyLine } from "@/components/brand/survey-line";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-1.4V15.2a5.4 5.4 0 1 1-4.68-5.35v2.6a2.8 2.8 0 1 0 1.97 2.68V2h2.55a4.28 4.28 0 0 0 3.9 4.24z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer({ brand }: { brand: BrandKey }) {
  const isBuraq = brand === "buraq";
  return (
    <footer className="border-t border-navy-700 bg-surface-inverted-deep text-ink-inverted-muted">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
        <SurveyLine inverted className="mb-10" ticks={20} />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-display text-heading-lg uppercase text-white">
              {isBuraq ? BURAQ.name : EMINENT.name}
            </p>
            <p className="mt-3 max-w-sm text-body-sm text-ink-inverted-muted">
              {isBuraq ? BURAQ.positioning : EMINENT.boilerplate}
            </p>
            <div className="mt-5 flex items-start gap-2 text-body-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
              <span>{CONTACT.officeAddress}</span>
            </div>
            <div className="mt-3 flex flex-col gap-2 text-body-sm">
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" /> {CONTACT.phone}
              </a>
              <a
                href={buildWhatsAppLink("Hi, I'd like to know more about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-300"
              >
                <MessageCircle className="h-4 w-4 text-gold-300" aria-hidden="true" /> {CONTACT.mobile} (WhatsApp)
              </a>
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={CONTACT.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eminent Enterprises on Instagram"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.tiktok.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eminent Enterprises on TikTok"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Properties" links={[...NAV.properties, { label: "Compare", href: "/compare" }]} />
          <FooterColumn
            title="Eminent Enterprises"
            links={[{ label: "Services", href: "/services" }, { label: "About the Group", href: "/about" }, ...NAV.services]}
          />
          <FooterColumn
            title="Buraq Eminent"
            links={[{ label: "Overview", href: "/construction" }, { label: "Portfolio", href: "/construction/portfolio" }, { label: "Cost Estimator", href: "/construction/estimate" }]}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Tools" links={[...NAV.tools]} />
          <FooterColumn
            title="Resources"
            links={[
              { label: "Area Guides", href: "/areas" },
              { label: "Market Insights", href: "/insights" },
              { label: "Overseas Pakistanis", href: "/overseas" },
              { label: "List Your Property", href: "/list-your-property" },
            ]}
          />
          <FooterColumn title="Company" links={[{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Shortlist", href: "/shortlist" }]} />
          <FooterColumn title="Legal" links={[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }]} />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-body-sm text-ink-inverted-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Eminent Enterprises (Pvt.) Ltd. &amp; Buraq Eminent Constructors (Pvt.) Ltd. All rights reserved.</p>
          <p className="font-tabular-nums text-label uppercase tracking-widest text-gold-300">{CONTACT.website}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-label uppercase tracking-widest text-gold-300">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-body-sm hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
