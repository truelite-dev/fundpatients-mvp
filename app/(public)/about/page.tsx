export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">About FundPatients</h1>
      <p className="mt-4 text-brand-muted-sage">
        FundPatients exists to make healthcare support more accessible, transparent, and
        human-centered — connecting patients in need with donors and verified medical partners.
      </p>
    </main>
  );
}
