import Link from "next/link";
import { CreditCard, Gift, HeartHandshake } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Donation } from "@/lib/donor";

export function DonationHistoryRow({ donation: d }: { donation: Donation }) {
  const pending = d.status === "pending";
  const amount = formatCurrency(d.amount, d.currency);
  const when = new Date(d.createdAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <li className="flex items-start gap-4 py-4">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
          pending ? "bg-gray-100 text-brand-muted-sage" : "bg-brand-soft-sage text-brand-deep-green"
        }`}
      >
        {d.caseTitle ? <HeartHandshake className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
      </span>

      <div className="min-w-0 flex-1">
        <p className={`flex flex-wrap items-center gap-2 text-sm font-semibold ${pending ? "text-brand-muted-sage" : "text-brand-deep-green"}`}>
          {pending ? `Awaiting payment: ${amount}` : `You donated ${amount}`} ({d.frequency})
          {pending && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
              Pending
            </span>
          )}
        </p>
        {d.caseHref ? (
          <Link href={d.caseHref} className="mt-0.5 block text-sm text-brand-forest hover:underline">
            {d.caseTitle}
          </Link>
        ) : (
          <p className="mt-0.5 text-sm text-brand-forest">General Donation</p>
        )}
        <p className="mt-1 text-xs text-brand-muted-sage">{when}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-brand-muted-sage">
          <CreditCard className="h-3.5 w-3.5" />
          Via: {d.method}
        </p>
      </div>
    </li>
  );
}
