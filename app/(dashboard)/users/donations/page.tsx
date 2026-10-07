import Link from "next/link";
import { DonationHistoryRow } from "@/components/dashboard/DonationHistoryRow";
import { DonationsOverview } from "@/components/dashboard/DonationsOverview";
import { RightRail } from "@/components/dashboard/RightRail";
import { Reveal } from "@/components/motion/Reveal";
import { getDonations, getDonationSummary } from "@/lib/donor";

export const metadata = { title: "My donations" };

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "history", label: "History" },
];

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: raw } = await searchParams;
  const tab = raw === "history" ? "history" : "overview";
  const [summary, donations] = await Promise.all([getDonationSummary(), getDonations()]);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
      <Reveal className="rounded-3xl bg-white p-5 sm:p-8">
        <h1 className="font-display text-2xl font-semibold text-brand-forest">My Donations</h1>
        <p className="mt-1 text-sm text-brand-muted-sage">Manage your contributions</p>

        <nav aria-label="Donations" className="mt-5 inline-flex rounded-full bg-brand-soft-sage p-1">
          {tabs.map((t) => (
            <Link
              key={t.value}
              href={t.value === "overview" ? "/users/donations" : `/users/donations?tab=${t.value}`}
              aria-current={t.value === tab ? "page" : undefined}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition ${
                t.value === tab ? "bg-white text-brand-forest shadow-sm" : "text-brand-muted-sage hover:text-brand-forest"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        {tab === "overview" ? (
          <DonationsOverview summary={summary} donations={donations} />
        ) : donations.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-brand-soft-sage px-6 py-10 text-center text-sm text-brand-muted-sage">
            No donations yet.{" "}
            <Link href="/stories" className="font-medium text-brand-deep-green hover:underline">
              Discover stories
            </Link>
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {donations.map((d) => (
              <DonationHistoryRow key={d.id} donation={d} />
            ))}
          </ul>
        )}
      </Reveal>
      <RightRail />
    </div>
  );
}
