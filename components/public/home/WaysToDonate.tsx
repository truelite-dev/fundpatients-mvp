import Link from "next/link";
import { HeartHandshake, Wallet } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const options = [
  {
    eyebrow: "Cases",
    title: "Donate to a specific case",
    body: "Choose a story that speaks to you and support that person's care directly.",
    href: "/stories",
    cta: "View cases",
    icon: HeartHandshake,
  },
  {
    eyebrow: "Recurring",
    title: "Support monthly",
    body: "Set up a recurring gift to a case and help carry their treatment to the finish line.",
    href: "/stories?recurring=true",
    cta: "Learn more",
    icon: Wallet,
  },
];

export function WaysToDonate() {
  return (
    <section className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute bg-brand-soft-sage"
        style={{
          top: "14%",
          left: "50%",
          width: "820px",
          height: "820px",
          WebkitMaskImage: "url(/images/brand/giving-hands-white.svg)",
          maskImage: "url(/images/brand/giving-hands-white.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl lg:text-5xl">Ways to donate</h2>
          <p className="mt-2 text-brand-muted-sage">
            Support individuals facing urgent medical expenses and help them access vital care.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {options.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1} className="h-full">
              <div className="flex h-full min-h-[420px] flex-col rounded-2xl bg-background/70 p-12 shadow-[0_40px_80px_-30px_rgba(11,31,14,0.15)] backdrop-blur-sm transition hover:shadow-[0_50px_100px_-30px_rgba(11,31,14,0.22)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft-sage">
                  <o.icon className="h-6 w-6 text-brand-deep-green" strokeWidth={1.5} />
                </div>
                <div className="mt-auto">
                  <p className="text-xs font-semibold tracking-wide text-brand-muted-sage uppercase">
                    {o.eyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-brand-forest">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-base text-brand-muted-sage">{o.body}</p>
                  <Link
                    href={o.href}
                    className="mt-6 inline-block w-fit rounded-full bg-brand-deep-green px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-forest"
                  >
                    {o.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
