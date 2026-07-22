import { notFound } from "next/navigation";
import { getCaseById } from "@/lib/cases";
import { formatCurrency } from "@/lib/formatCurrency";
import { DonateForm } from "@/components/public/DonateForm";

export const metadata = { title: "Donate" };

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ case?: string }>;
}) {
  const { case: caseId } = await searchParams;
  if (!caseId) notFound();

  const activeCase = await getCaseById(caseId);
  if (!activeCase) notFound();

  const left = Math.max(0, activeCase.goal_amount - activeCase.amount_raised);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">
        {activeCase.title}
      </h1>
      <p className="mt-1 text-brand-muted-sage">
        {formatCurrency(left, activeCase.currency)} left of{" "}
        {formatCurrency(activeCase.goal_amount, activeCase.currency)}
      </p>

      <DonateForm caseId={activeCase.id} defaultCurrency={activeCase.currency as "NGN" | "USD" | "EUR"} />
    </main>
  );
}
