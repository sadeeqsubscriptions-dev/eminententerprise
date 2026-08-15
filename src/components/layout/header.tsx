"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, Search, Heart, Scale, ChevronRight } from "lucide-react";
import type { BrandKey } from "@/config/site";
import { CONTACT, NAV } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const PROPERTY_TYPE_LINKS = [
  { label: "Houses", href: "/properties?type=House" },
  { label: "Flats & Apartments", href: "/properties?type=Flat%2FApartment" },
  { label: "Residential Plots", href: "/properties?type=Residential+Plot" },
  { label: "Commercial", href: "/properties?category=commercial" },
];

export function Header({ brand }: { brand: BrandKey }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isBuraq = brand === "buraq";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b",
        isBuraq
          ? "border-cream-500 bg-[var(--color-nav-surface)]"
          : "border-navy-700 bg-[var(--color-nav-surface)]",
      )}
    >
      {/* Utility bar */}
      <div
        className={cn(
          "hidden items-center justify-between px-6 py-1.5 text-[0.6875rem] uppercase tracking-wider lg:flex",
          isBuraq ? "bg-navy-900 text-cream-200" : "bg-navy-900 text-navy-200",
        )}
      >
        <div className="flex items-center gap-4">
          <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 hover:text-gold-300">
            <Phone className="h-3 w-3" aria-hidden="true" /> {CONTACT.phone}
          </a>
          <span className="text-navy-600" aria-hidden="true">|</span>
          <span>{CONTACT.serviceRegion}</span>
        </div>
        <BrandSwitcher brand={brand} compact />
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={isBuraq ? "/construction" : "/"} className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg uppercase tracking-tight",
              isBuraq ? "text-navy-800" : "text-navy-800",
            )}
          >
            {isBuraq ? "Buraq Eminent" : "Eminent Enterprises"}
          </span>
          <span className="text-[0.625rem] uppercase tracking-[0.2em] text-accent-strong">
            {isBuraq ? "Constructors" : "Real Estate Solutions"}
          </span>
        </Link>

        <NavigationMenu className="hidden max-w-none flex-1 justify-center xl:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
              <NavigationMenuContent>
                <PropertiesMega />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ServicesMega brand={brand} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/projects">Projects</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/construction">Construction</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/areas">Areas</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink href="/insights">Insights</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>More</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MoreMega />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/shortlist"
            aria-label="View shortlist"
            className="hidden h-11 w-11 items-center justify-center text-ink-secondary transition-colors hover:text-accent-strong sm:inline-flex"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/compare"
            aria-label="Compare properties"
            className="hidden h-11 w-11 items-center justify-center text-ink-secondary transition-colors hover:text-accent-strong sm:inline-flex"
          >
            <Scale className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Button asChild variant="outline" size="icon" className="xl:hidden">
            <Link href="/properties" aria-label="Search properties">
              <Search />
            </Link>
          </Button>
          <Button asChild variant="primary" size="md" className="hidden xl:inline-flex">
            <Link href="/properties">Search Properties</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full max-w-sm flex-col p-0">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <MobileNav brand={brand} onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block px-3 py-2 text-body-sm font-semibold uppercase tracking-wide text-current transition-colors hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-strong"
      >
        {children}
      </Link>
    </NavigationMenuLink>
  );
}

function BrandSwitcher({ brand, compact = false }: { brand: BrandKey; compact?: boolean }) {
  return (
    <div
      className={cn(
        "inline-flex border",
        compact ? "border-navy-700" : "border-border-hairline",
      )}
      role="group"
      aria-label="Switch brand"
    >
      <Link
        href="/"
        className={cn(
          "px-3 py-1 text-[0.6875rem] uppercase tracking-wider transition-colors",
          brand === "eminent" ? "bg-gold-500 text-navy-900" : "text-navy-200 hover:text-gold-300",
        )}
        aria-current={brand === "eminent" ? "page" : undefined}
      >
        Eminent
      </Link>
      <Link
        href="/construction"
        className={cn(
          "px-3 py-1 text-[0.6875rem] uppercase tracking-wider transition-colors",
          brand === "buraq" ? "bg-gold-500 text-navy-900" : "text-navy-200 hover:text-gold-300",
        )}
        aria-current={brand === "buraq" ? "page" : undefined}
      >
        Buraq
      </Link>
    </div>
  );
}

function PropertiesMega() {
  return (
    <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-4">
      <MegaColumn title="Browse by purpose" links={NAV.properties} />
      <MegaColumn title="Property types" links={PROPERTY_TYPE_LINKS} />
      <MegaColumn
        title="Explore locations"
        links={[
          { label: "Islamabad", href: "/properties?city=islamabad" },
          { label: "Rawalpindi", href: "/properties?city=rawalpindi" },
          { label: "Hill Regions", href: "/properties?city=hills" },
          { label: "All Area Guides", href: "/areas" },
        ]}
      />
      <div className="flex flex-col justify-between border-l border-border-hairline pl-8">
        <div>
          <p className="font-display text-heading-md uppercase text-navy-800">Eminent Estimate</p>
          <p className="mt-2 text-body-sm text-ink-secondary">
            Get an instant, indicative property valuation using local price-per-marla data.
          </p>
        </div>
        <Link
          href="/tools/eminent-estimate"
          className="mt-4 inline-flex items-center gap-1 text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline"
        >
          Try the tool <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function ServicesMega({ brand }: { brand: BrandKey }) {
  const isBuraq = brand === "buraq";
  return (
    <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <p className="text-label uppercase tracking-widest text-ink-muted">
          {isBuraq ? "Buraq Eminent Constructors" : "Eminent Enterprises"}
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {(isBuraq ? NAV.construction.slice(1, 6) : NAV.services).map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="block py-1.5 text-body-md font-medium text-ink-primary hover:text-accent-strong">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-l border-border-hairline pl-8">
        <p className="font-display text-heading-md uppercase text-navy-800">
          {isBuraq ? "Need real estate advisory?" : "Planning to build?"}
        </p>
        <p className="mt-2 text-body-sm text-ink-secondary">
          {isBuraq
            ? "Eminent Enterprises handles sale, purchase and portfolio management."
            : "Buraq Eminent Constructors brings 10 years of real estate expertise to construction."}
        </p>
        <Link
          href={isBuraq ? "/services" : "/construction"}
          className="mt-4 inline-flex items-center gap-1 text-body-sm font-semibold uppercase tracking-wide text-accent-strong hover:underline"
        >
          {isBuraq ? "Eminent Enterprises" : "Buraq Eminent Constructors"} <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function MoreMega() {
  return (
    <div className="grid grid-cols-2 gap-2 p-6 sm:grid-cols-4">
      {[
        { label: "Overseas Pakistanis", href: "/overseas" },
        { label: "About the Group", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "List Your Property", href: "/list-your-property" },
        { label: "Shortlist", href: "/shortlist" },
        { label: "Compare", href: "/compare" },
        { label: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
        { label: "Area Converter", href: "/tools/area-converter" },
      ].map((l) => (
        <Link key={l.href} href={l.href} className="px-2 py-2 text-body-sm font-medium text-ink-primary hover:text-accent-strong">
          {l.label}
        </Link>
      ))}
    </div>
  );
}

function MegaColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-label uppercase tracking-widest text-ink-muted">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-body-md text-ink-primary hover:text-accent-strong">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileNav({ brand, onNavigate }: { brand: BrandKey; onNavigate: () => void }) {
  const groups: { title: string; links: { label: string; href: string }[] }[] = [
    { title: "Properties", links: [...NAV.properties] },
    { title: "Eminent Enterprises", links: [{ label: "Services", href: "/services" }, ...NAV.services] },
    { title: "Buraq Eminent Constructors", links: [...NAV.construction] },
    { title: "Tools", links: [...NAV.tools] },
    {
      title: "More",
      links: [
        { label: "Area Guides", href: "/areas" },
        { label: "Insights", href: "/insights" },
        { label: "Overseas Pakistanis", href: "/overseas" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "List Your Property", href: "/list-your-property" },
      ],
    },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="border-b border-border-hairline p-5">
        <BrandSwitcher brand={brand} />
      </div>
      <nav className="flex flex-1 flex-col gap-6 p-5" aria-label="Mobile">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-label uppercase tracking-widest text-ink-muted">{g.title}</p>
            <ul className="mt-2 flex flex-col">
              {g.links.map((l) => (
                <li key={l.href}>
                  <SheetClose asChild>
                    <Link
                      href={l.href}
                      onClick={onNavigate}
                      className="block min-h-11 py-2.5 text-body-md font-medium text-ink-primary"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-border-hairline p-5">
        <Button asChild variant="primary" size="lg" className="w-full">
          <Link href="/properties" onClick={onNavigate}>
            Search Properties
          </Link>
        </Button>
      </div>
    </div>
  );
}
