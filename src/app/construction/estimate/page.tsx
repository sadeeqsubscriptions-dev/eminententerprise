import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CostEstimator } from "@/components/construction/cost-estimator";

export const metadata: Metadata = {
  title: "Construction Cost Estimator",
  description:
    "Get an indicative construction cost estimate for your build — enter covered area, storeys, quality tier and scope for a quick breakdown by category.",
};

export default function ConstructionEstimatePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Construction", href: "/construction" },
          { label: "Cost Estimator" },
        ]}
      />

      <h1 className="mt-4 text-display-md">Construction Cost Estimator</h1>
      <p className="mt-3 max-w-2xl text-body-lg text-ink-secondary">
        A quick, indicative sense of what your build could cost — based on covered area, storeys, finish level and
        scope.
      </p>

      <div className="mt-8">
        <CostEstimator />
      </div>
    </div>
  );
}
