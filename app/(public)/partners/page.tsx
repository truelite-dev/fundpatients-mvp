import Link from "next/link";
import { listApprovedOrganizations } from "@/lib/organizations";

export const metadata = { title: "Partners" };

export default async function PartnersPage() {
  const organizations = await listApprovedOrganizations();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">Our partners</h1>
      <p className="mt-2 text-brand-muted-sage">
        Alternatively, beneficiaries can be added by our FundPatients administrators after
        verification from our medical partners.
      </p>

      {organizations.length === 0 ? (
        <p className="mt-10 text-brand-muted-sage">No approved partners yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <div key={org.id} className="rounded-lg border border-border p-4">
              <h2 className="font-display text-lg font-semibold text-brand-forest">{org.name}</h2>
              {org.specialization && (
                <p className="mt-1 text-sm text-brand-muted-sage">{org.specialization}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <Link
        href="/partners/become"
        className="mt-10 inline-block rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest"
      >
        Become a partner
      </Link>
    </main>
  );
}
