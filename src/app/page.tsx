import { SurveyLine } from "@/components/brand/survey-line";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6">
      <p className="text-label uppercase tracking-widest text-accent-strong">Under construction</p>
      <h1 className="mt-2 text-display-xl">Your Property. Our Expertise. Lasting Value.</h1>
      <SurveyLine className="mt-8 max-w-md" label="Homepage build — Phase 10" />
    </div>
  );
}
