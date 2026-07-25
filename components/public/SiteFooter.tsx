import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

// lucide-react dropped brand/social glyphs, so these are small inline marks —
// no extra icon-pack dependency for three footer links.
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
    <footer className="mt-auto border-t border-border bg-brand-soft-sage/40 px-6 py-14 text-sm text-brand-muted-sage">
      <Reveal className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-medium text-brand-forest">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-deep-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-2xl border border-border bg-background p-6">
          <h3 className="font-display text-base font-semibold text-brand-forest">
            Become a FundPatients partner
          </h3>
          <p className="mt-2 text-sm text-brand-muted-sage">
            Join our network of verified medical institutions supporting patients in need.
          </p>
          <Link
            href="/partners/become"
            className="mt-4 inline-block rounded-full bg-brand-deep-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-forest"
          >
            Learn more
          </Link>
        </div>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
        <p>© {new Date().getFullYear()} FundPatients. All Rights Reserved.</p>
        <div className="flex items-center gap-3">
          <span className="text-xs">Follow us</span>
          {socialLinks.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="rounded-full border border-border p-2 transition hover:border-brand-deep-green hover:text-brand-deep-green"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
