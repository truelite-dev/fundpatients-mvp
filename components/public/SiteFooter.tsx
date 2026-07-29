import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.05 1.47-4.05 4.15v2.17H7.5v3.1h2.7V21h3.3Z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.6 10.6 20 3.7h-1.9l-5.6 6-4.4-6H3l6.7 9.1L3 20.3h1.9l5.9-6.3 4.6 6.3H21l-6.9-9.4Zm-2.1 2.2-.7-.9-5.4-7.3H8l4.4 5.9.7.9 5.6 7.7h-2.6l-4.6-6.3Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const columns = [
  {
    title: "Company",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Medical cases",
    links: [
      { href: "/request-help", label: "Request help" },
      { href: "/stories", label: "Explore stories" },
      { href: "/donate", label: "Make donation" },
    ],
  },
  {
    title: "Partners",
    links: [
      { href: "/partners", label: "Our partners" },
      { href: "/partners/become", label: "Become a partner" },
    ],
  },
];

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: XIcon, label: "X (Twitter)" },
  { icon: InstagramIcon, label: "Instagram" },
];

export function SiteFooter() {
  return (
    <footer className="relative mx-[12px] mb-4 overflow-hidden rounded-3xl bg-brand-forest text-base text-white/60 sm:mx-[20px]">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-brand-mint/10 blur-3xl"
      />
      {/* Footer head — partner CTA */}
      <Reveal>
        <div className="mx-auto w-full max-w-[1250px] px-8 py-12 sm:px-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Stethoscope className="h-6 w-6 text-brand-mint" strokeWidth={1.25} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Become a FundPatients partner
                </h3>
                <p className="mt-0.5 text-sm text-white/50">
                  Join our network of verified medical institutions supporting patients in need.
                </p>
              </div>
            </div>
            <Link
              href="/partners/become"
              className="w-full shrink-0 rounded-full bg-brand-mint px-6 py-3 text-center text-sm font-medium text-brand-forest transition hover:bg-white sm:w-fit"
            >
              Learn more
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Nav grid */}
      <Reveal>
        <div className="mx-auto w-full max-w-[1250px] px-8 py-12 sm:px-14">
          <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-base font-semibold text-white">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Ad card — spans 2 of the 5 columns */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:col-span-3 lg:col-span-2">
              <h3 className="font-display text-base font-semibold text-white">
                Fund a patient today
              </h3>
              <p className="mt-2 text-sm text-white/50">
                Browse real cases and make a direct impact on someone&apos;s recovery.
              </p>
              <Link
                href="/stories"
                className="mt-4 inline-block rounded-full bg-brand-mint px-4 py-2 text-sm font-medium text-brand-forest hover:bg-white"
              >
                View cases
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Bottom bar */}
      <div className="border-t border-white/10" />
      <div className="mx-auto w-full max-w-[1250px] px-8 py-6 sm:px-14">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm">© {new Date().getFullYear()} FundPatients. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs">Follow us</span>
            {socialLinks.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="rounded-full border border-white/20 p-2 transition hover:border-white hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
