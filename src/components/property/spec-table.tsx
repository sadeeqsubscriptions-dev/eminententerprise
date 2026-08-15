import { Check, X } from "lucide-react";
import type { Property } from "@/types";
import { formatAreaAuto } from "@/lib/area";

export function SpecTable({ property }: { property: Property }) {
  const p = property.pakistanFields;

  const generalSpecs: [string, string][] = [
    ["Type", property.type],
    ["Area", formatAreaAuto(property.area.sqft)],
    ...(property.beds ? ([["Bedrooms", String(property.beds)]] as [string, string][]) : []),
    ...(property.baths ? ([["Bathrooms", String(property.baths)]] as [string, string][]) : []),
    ...(p.floors ? ([["Floors", String(p.floors)]] as [string, string][]) : []),
    ["Possession", p.possession],
    ["Approval", p.approval],
    ["Plot Documentation", p.plotFileOrRegistry],
  ];

  const flagSpecs: [string, boolean][] = [
    ["Corner Plot", p.cornerPlot],
    ["Boulevard Facing", p.boulevardFacing],
    ["Park Facing", p.parkFacing],
    ["Gas Available", p.gasAvailable],
    ["Electricity Available", p.electricityAvailable],
    ["Sewerage", p.sewerage],
    ["Servant Quarter", p.servantQuarter],
    ["Basement", p.basement],
  ];

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="mb-4 text-heading-lg uppercase text-ink-primary">Property Details</h3>
        <dl className="divide-y divide-border-hairline border-t border-border-hairline">
          {generalSpecs.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-body-sm text-ink-secondary">{label}</dt>
              <dd className="text-body-sm font-semibold text-ink-primary">{value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-body-sm text-ink-secondary">Water Source</dt>
            <dd className="text-body-sm font-semibold text-ink-primary">{p.waterSource}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="mb-4 text-heading-lg uppercase text-ink-primary">Pakistan-Specific Details</h3>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {flagSpecs.map(([label, value]) => (
            <li key={label} className="flex items-center gap-2 text-body-sm">
              {value ? (
                <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <X className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
              )}
              <span className={value ? "text-ink-primary" : "text-ink-muted"}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
