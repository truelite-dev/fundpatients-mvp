import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseById } from "@/lib/cases";
import { formatCurrency } from "@/lib/formatCurrency";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const activeCase = await getCaseById(caseId);

  if (!activeCase) notFound();

  const percent = Math.min(
    100,
    Math.round((activeCase.amount_raised / activeCase.goal_amount) * 100)
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      {activeCase.location && (
        <p className="text-sm text-brand-muted-sage">{activeCase.location}</p>
      )}
      <h1 className="mt-2 font-display text-3xl font-semibold text-brand-forest">
        {activeCase.title}
      </h1>

      <div className="mt-6 rounded-lg border border-border p-4">
        <p className="text-2xl font-semibold text-brand-forest">
          {formatCurrency(activeCase.amount_raised, activeCase.currency)}
        </p>
        <p className="text-sm text-brand-muted-sage">
          raised of {formatCurrency(activeCase.goal_amount, activeCase.currency)} goal ({percent}%)
        </p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-soft-sage">
          <div className="h-full bg-brand-deep-green" style={{ width: `${percent}%` }} />
        </div>
        <Link
          href={`/donate?case=${activeCase.id}`}
          className="mt-4 inline-block rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest"
        >
          Donate now
        </Link>
      </div>

      <p className="mt-8 whitespace-pre-line text-brand-muted-sage">{activeCase.description}</p>
    </main>
  );
}
