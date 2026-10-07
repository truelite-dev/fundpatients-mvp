"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, Menu, Search, Settings, User, X } from "lucide-react";
import type { Donor } from "@/lib/donor";

const storiesMenu = [
  { href: "/stories", label: "Discover stories" },
  { href: "/users/stories", label: "My stories" },
  { href: "/request-help", label: "New story — Request help" },
];

const userMenu = [
  { href: "/users/overview", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users/profile", label: "My Profile", icon: User },
  { href: "/users/settings", label: "Settings", icon: Settings },
];

const linkClass = (active: boolean) =>
  `relative whitespace-nowrap transition ${
    active ? "font-semibold text-brand-deep-green" : "hover:text-brand-deep-green"
  }`;

const panelClass =
  "absolute z-50 mt-3 min-w-[220px] rounded-2xl border border-border bg-white p-2 shadow-[0_16px_40px_-12px_rgba(11,31,14,0.18)]";
const itemClass =
  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-brand-forest transition hover:bg-brand-soft-sage";

// Owns open state; closes on outside click and Escape.
function Dropdown({
  renderTrigger,
  children,
  panelClassName = "",
}: {
  renderTrigger: (open: boolean, toggle: () => void) => React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  panelClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {renderTrigger(open, () => setOpen((o) => !o))}
      {open && (
        <div role="menu" className={`${panelClass} ${panelClassName}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}


function Avatar({ donor }: { donor: Donor }) {
  return (
    <span
      aria-hidden
      className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-forest text-xs font-semibold text-brand-mint"
    >
      {donor.firstName[0]}
      {donor.lastName[0]}
    </span>
  );
}

function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!open) {
      setOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    if (q) router.push(`/stories?q=${encodeURIComponent(q)}`);
    else setOpen(false);
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      className={`flex items-center rounded-full border transition-colors ${
        open ? "border-brand-deep-green" : "border-border hover:border-brand-deep-green"
      }`}
    >
      <button
        type="submit"
        aria-label="Search a case"
        className="shrink-0 rounded-full p-2 text-brand-muted-sage transition hover:text-brand-deep-green"
      >
        <Search className="h-4 w-4" />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "w-44 pr-2 opacity-100" : "w-0 opacity-0"}`}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          onBlur={() => !value && setOpen(false)}
          tabIndex={open ? 0 : -1}
          aria-label="Search a case"
          placeholder="Search a case"
          className="w-full bg-transparent text-sm text-brand-forest outline-none placeholder:text-brand-muted-sage"
        />
      </div>
    </form>
  );
}

export function DashboardHeader({ donor }: { donor: Donor }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const storiesActive = pathname.startsWith("/stories") || pathname === "/users/stories";

  return (
    <header className="sticky top-3 z-50 mx-[12px] mt-3 rounded-2xl bg-background/70 shadow-[0_8px_24px_-8px_rgba(11,31,14,0.10)] backdrop-blur-lg sm:mx-[20px] md:top-4 md:mt-0">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/users/overview" className="shrink-0" onClick={() => setMobileOpen(false)}>
            <Image src="/logos/logomark-dark.svg" alt="FundPatients" width={140} height={40} priority />
          </Link>

          <nav className="hidden items-center gap-6 text-base text-brand-forest lg:flex">
            <Link href="/users/overview" className={linkClass(pathname.startsWith("/users") && pathname !== "/users/stories")}>
              Home
            </Link>

            <Dropdown
              renderTrigger={(open, toggle) => (
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={open}
                  onClick={toggle}
                  className={`flex items-center gap-1 ${linkClass(storiesActive)}`}
                >
                  Stories
                  <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
                </button>
              )}
            >
              {(close) =>
                storiesMenu.map((item) => (
                  <Link key={item.href} href={item.href} role="menuitem" onClick={close} className={itemClass}>
                    {item.label}
                  </Link>
                ))
              }
            </Dropdown>

            <Link href="/about" className={linkClass(pathname.startsWith("/about"))}>
              Why FundPatients?
            </Link>
            <Link href="/partners" className={linkClass(pathname.startsWith("/partners"))}>
              Partners
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-3 text-sm lg:flex">
          <SearchBox />
          <Link href="/request-help" className="whitespace-nowrap rounded-full border border-border px-4 py-2">
            Request Help
          </Link>
          <Link
            href="/donate"
            className="rounded-full bg-brand-deep-green px-4 py-2 text-white hover:bg-brand-forest"
          >
            Donate
          </Link>

          <Dropdown
            panelClassName="right-0 min-w-[240px]"
            renderTrigger={(open, toggle) => (
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={toggle}
                className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition hover:border-brand-deep-green"
              >
                <Avatar donor={donor} />
                <span className="text-sm text-brand-forest">{donor.firstName}</span>
                <ChevronDown className={`h-4 w-4 text-brand-muted-sage transition ${open ? "rotate-180" : ""}`} />
              </button>
            )}
          >
            {(close) => (
              <>
                <div className="border-b border-border px-3 pb-3 pt-2">
                  <p className="text-sm font-semibold text-brand-forest">
                    {donor.firstName} {donor.lastName}
                  </p>
                  <p className="text-xs text-brand-muted-sage">{donor.email}</p>
                </div>
                <div className="py-1">
                  {userMenu.map(({ href, label, icon: Icon }) => (
                    <Link key={href} href={href} role="menuitem" onClick={close} className={itemClass}>
                      <Icon className="h-4 w-4 text-brand-muted-sage" />
                      {label}
                    </Link>
                  ))}
                </div>
                {/* Mock phase: there is no real session, so Logout just returns to /login. */}
                <Link
                  href="/login"
                  role="menuitem"
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl border-t border-border px-3 py-2 pt-3 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </>
            )}
          </Dropdown>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-full border border-border p-2 text-brand-forest lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-border px-6 py-4 lg:hidden">
          {[
            { href: "/users/overview", label: "Home" },
            { href: "/stories", label: "Discover stories" },
            { href: "/users/stories", label: "My stories" },
            { href: "/about", label: "Why FundPatients?" },
            { href: "/partners", label: "Partners" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-brand-forest hover:bg-brand-soft-sage"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
            <Link
              href="/request-help"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-border px-4 py-2 text-center text-sm"
            >
              Request Help
            </Link>
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-brand-deep-green px-4 py-2 text-center text-sm text-white"
            >
              Donate
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-red-200 px-4 py-2 text-center text-sm text-red-600"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
