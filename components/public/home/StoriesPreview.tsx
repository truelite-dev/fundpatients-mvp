import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listPublishedCases, listAlmostFundedCases } from "@/lib/cases";
import { CaseCard } from "@/components/public/CaseCard";
import { FeaturedCasesSlider } from "@/components/public/FeaturedCasesSlider";
import { Reveal } from "@/components/motion/Reveal";

export async function StoriesPreview() {
  const [featuredCases, allCases] = await Promise.all([
    listAlmostFundedCases(5),
    listPublishedCases(),
  ]);
  const featuredIds = new Set(featuredCases.map((c) => c.id));
  const cases = allCases.filter((c) => !featuredIds.has(c.id)).slice(0, 6);

  return (
    <section className="w-full bg-gradient-to-b from-white to-[var(--page-background)] py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-deep-green uppercase">
            Stories
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl lg:text-5xl">
            Every Donation Makes a Difference.
            <br className="hidden sm:block" /> Every Life Matters.
          </h2>
          <p className="mt-3 text-brand-muted-sage">
            Support individuals facing urgent medical expenses and help them access vital care.
          </p>
        </div>

        {featuredCases.length > 0 && (
          <div className="mt-14">
            <FeaturedCasesSlider cases={featuredCases} />
          </div>
        )}

        {cases.length === 0 ? (
          <p className="mt-14 text-center text-brand-muted-sage">
            Stories are on their way — check back soon.
          </p>
        ) : (
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            {cases.map((c, i) => (
              <Reveal
                key={c.id}
                delay={(i % 3) * 0.1}
                className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <CaseCard case={c} className="h-full" />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green hover:text-brand-deep-green"
          >
            View more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
