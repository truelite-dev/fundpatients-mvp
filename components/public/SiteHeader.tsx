import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "Why FundPatients?" },
  { href: "/partners", label: "Partners" },
];

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
      <Link href="/" className="shrink-0">
        <Image src="/logos/logomark-lemon.svg" alt="FundPatients" width={140} height={40} priority />
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-brand-muted-sage md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-brand-deep-green">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3 text-sm">
        <Link href="/request-help" className="rounded-full border border-border px-4 py-2">
          Request Help
        </Link>
        <Link
          href="/donate"
          className="rounded-full bg-brand-deep-green px-4 py-2 text-white hover:bg-brand-forest"
        >
          Donate
        </Link>
        <Link href="/login" className="rounded-full border border-border px-4 py-2">
          Login
        </Link>
      </div>
    </header>
  );
}
