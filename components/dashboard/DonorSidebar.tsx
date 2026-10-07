"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Home, Settings, Star, User } from "lucide-react";
import { DonationTotal } from "@/components/dashboard/DonationTotal";
import type { Donor } from "@/lib/donor";

const primaryNav = [
  { href: "/users/overview", label: "All Updates", icon: Home },
  { href: "/users/donations", label: "Donations", icon: Gift },
  { href: "/users/following", label: "Following", icon: Star },
];
const secondaryNav = [
  { href: "/users/settings", label: "Settings", icon: Settings },
  { href: "/users/profile", label: "Profile", icon: User },
];

function memberSince(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function DonorSidebar({ donor }: { donor: Donor }) {
  const pathname = usePathname();

  function NavLink({ href, label, icon: Icon }: (typeof primaryNav)[number]) {
    const active = pathname === href;
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
          active
            ? "bg-brand-deep-green text-white"
            : "text-brand-forest hover:bg-brand-soft-sage"
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    );
  }

  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-3xl bg-gradient-to-b from-brand-soft-sage to-white p-5 sm:p-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <div
            aria-hidden
            className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-brand-forest font-display text-lg font-semibold text-brand-mint"
          >
            {donor.firstName[0]}
            {donor.lastName[0]}
          </div>
          <h2 className="font-display text-lg font-semibold text-brand-forest">
            Welcome {donor.firstName}
          </h2>
          <DonationTotal amount={donor.totalDonated} currency={donor.currency} />
          <p className="text-xs text-brand-muted-sage">Since {memberSince(donor.memberSince)}</p>
        </div>

        <nav
          aria-label="Dashboard"
          className="mt-5 flex gap-1 overflow-x-auto rounded-2xl bg-white p-2 lg:flex-col lg:overflow-visible"
        >
          {primaryNav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
          <div className="mx-1 my-1 hidden border-t border-border lg:block" />
          {secondaryNav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="mt-5 hidden text-xs text-brand-muted-sage lg:block">
          <p>© 2026 FundPatients. All Rights Reserved.</p>
          <p className="mt-1 flex gap-2 text-brand-deep-green">
            <Link href="/about" className="hover:underline">About us</Link>
            <span>|</span>
            <Link href="/about" className="hover:underline">Terms</Link>
            <span>|</span>
            <Link href="/about" className="hover:underline">Privacy policy</Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
