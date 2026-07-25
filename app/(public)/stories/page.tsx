import { listPublishedCases } from "@/lib/cases";
import { CaseCard } from "@/components/public/CaseCard";

export const metadata = { title: "Stories" };

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ recurring?: string }>;
}) {
  const { recurring } = await searchParams;
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
            <CaseCard key={c.id} case={c} recurring={recurring === "true"} />
          ))}
        </div>
      )}
    </main>
  );
}
