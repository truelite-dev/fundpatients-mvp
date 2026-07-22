import Link from "next/link";
import { listPublishedCases } from "@/lib/cases";
import { formatCurrency } from "@/lib/formatCurrency";

export const metadata = { title: "Stories" };

export default async function StoriesPage() {
  const cases = await listPublishedCases();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">Stories</h1>
      <p className="mt-2 text-brand-muted-sage">
        Support individuals facing urgent medical expenses and help them access vital care.
      </p>

      {cases.length === 0 ? (
        <p className="mt-10 text-brand-muted-sage">No published cases yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/stories/${c.id}`}
              className="flex flex-col gap-2 rounded-lg border border-border p-4 hover:border-brand-deep-green"
            >
              <p className="text-sm text-brand-deep-green">
                {formatCurrency(c.amount_raised, c.currency)} raised
              </p>
              <h2 className="font-display text-lg font-semibold text-brand-forest">{c.title}</h2>
              <p className="line-clamp-3 text-sm text-brand-muted-sage">{c.description}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
