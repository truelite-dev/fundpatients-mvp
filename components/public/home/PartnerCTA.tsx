import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function PartnerCTA() {
  return (
    <section className="relative mx-[12px] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-forest to-brand-deep-green py-24 sm:mx-[20px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand-mint/10 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-[1120px] px-8 sm:px-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Become a FundPatients partner
            </h2>
            <p className="mt-3 max-w-md text-brand-soft-sage/90">
              Join our network of verified medical institutions and help connect your patients
              with donors who want to help.
            </p>
          </div>
          <div className="flex justify-start sm:justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Stethoscope className="h-10 w-10 text-brand-mint" strokeWidth={1.25} />
            </div>
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
