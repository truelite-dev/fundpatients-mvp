import Link from "next/link";

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

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border px-6 py-10 text-sm text-brand-muted-sage">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 font-medium text-brand-forest">{col.title}</h3>
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
      </div>
      <p className="mx-auto mt-8 max-w-5xl">© {new Date().getFullYear()} FundPatients. All Rights Reserved.</p>
    </footer>
  );
}
