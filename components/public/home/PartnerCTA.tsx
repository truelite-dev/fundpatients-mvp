import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function PartnerCTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-forest to-brand-deep-green px-8 py-14 sm:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand-mint/10 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display font-semibold text-white">
              Become a FundPatients partner
            </h2>
            <p className="mt-3 max-w-md text-brand-soft-sage/90">
              Join our network of verified medical institutions and help connect your patients
              with donors who want to help.
            </p>
          </div>
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Stethoscope className="h-10 w-10 text-brand-mint" strokeWidth={1.25} />
          </div>
        </div>
        <Link
          href="/partners/become"
          className="relative mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-brand-forest transition hover:bg-brand-soft-sage"
        >
          Learn more
        </Link>
      </div>
    </section>
  );
}
