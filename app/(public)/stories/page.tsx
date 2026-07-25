import { listPublishedCases, listAlmostFundedCases } from "@/lib/cases";
import { CaseCard } from "@/components/public/CaseCard";
import { FeaturedCasesSlider } from "@/components/public/FeaturedCasesSlider";

export const metadata = { title: "Stories" };

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ recurring?: string }>;
}) {
  const { recurring } = await searchParams;
  const [featuredCases, allCases] = await Promise.all([
    listAlmostFundedCases(5),
    listPublishedCases(),
  ]);

  const featuredIds = new Set(featuredCases.map((c) => c.id));
  const remainingCases = allCases.filter((c) => !featuredIds.has(c.id));

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">Stories</h1>
      <p className="mt-2 text-brand-muted-sage">
        Support individuals facing urgent medical expenses and help them access vital care.
      </p>

      {featuredCases.length > 0 && (
        <div className="mt-10">
          <FeaturedCasesSlider cases={featuredCases} />
        </div>
      )}

      {remainingCases.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remainingCases.map((c) => (
            <CaseCard key={c.id} case={c} recurring={recurring === "true"} />
          ))}
        </div>
      )}
    </main>
  );
}
