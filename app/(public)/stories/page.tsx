import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listPublishedCases, listAlmostFundedCases } from "@/lib/cases";
import { CaseCard } from "@/components/public/CaseCard";
import { FeaturedCasesSlider } from "@/components/public/FeaturedCasesSlider";

export const metadata = { title: "Stories" };

const PER_PAGE = 12;

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ recurring?: string; page?: string }>;
}) {
  const { recurring, page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const [featuredCases, allCases] = await Promise.all([
    listAlmostFundedCases(5),
    listPublishedCases(),
  ]);

  const featuredIds = new Set(featuredCases.map((c) => c.id));
  const remainingCases = allCases.filter((c) => !featuredIds.has(c.id));

  const totalPages = Math.max(1, Math.ceil(remainingCases.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageCases = remainingCases.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (recurring === "true") params.set("recurring", "true");
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/stories${qs ? `?${qs}` : ""}`;
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-16 pt-4">
      {featuredCases.length > 0 && (
        <div className="mt-10">
          <FeaturedCasesSlider cases={featuredCases} />
        </div>
      )}

      {pageCases.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageCases.map((c) => (
            <CaseCard key={c.id} case={c} recurring={recurring === "true"} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {currentPage > 1 ? (
            <Link
              href={pageHref(currentPage - 1)}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green hover:text-brand-deep-green"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-muted-sage/40 cursor-not-allowed">
              <ChevronLeft className="h-4 w-4" /> Previous
            </span>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageHref(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                  p === currentPage
                    ? "bg-brand-deep-green text-white"
                    : "text-brand-forest hover:bg-brand-soft-sage"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={pageHref(currentPage + 1)}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green hover:text-brand-deep-green"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-muted-sage/40 cursor-not-allowed">
              Next <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
      )}
    </main>
  );
}
