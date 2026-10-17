import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Scale, Stethoscope, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TeamExplorer } from "@/components/public/TeamExplorer";
import { team } from "@/lib/team";

export const metadata = {
  title: "Our Team",
  description:
    "Meet the founding team behind FundPatients — operators, engineers and clinicians building trusted medical giving for Nigeria.",
};

const principles = [
  { icon: Stethoscope, title: "Clinically grounded", body: "Every decision starts from what's true for the patient and verified by the hospital." },
  { icon: Scale, title: "Accountable by default", body: "We publish where money goes. If we can't show it, we don't do it." },
  { icon: Zap, title: "Fast, because it matters", body: "Funds move in hours, not weeks. Urgency is a design constraint, not a slogan." },
  { icon: HeartHandshake, title: "Dignity first", body: "Patients are never asked to beg. Donors are never asked to guess." },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative mx-[12px] mt-4 md:mt-8 mb-6 overflow-hidden rounded-3xl bg-[color-mix(in_srgb,var(--brand-forest)_70%,var(--brand-deep-green))] px-8 py-20 sm:mx-[20px] sm:px-14 sm:py-28">
        {/* Dot-grid vignette: dense at the edges, fades out behind the text. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_center,var(--brand-mint)_0.55px,transparent_0.9px)] [background-size:11px_11px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_28%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_28%,black_100%)]"
        />
        {/* Oversized brand mark as a background watermark, fading out downward */}
        <Image
          src="/images/brand/giving-hands-lemon.svg"
          alt=""
          aria-hidden
          width={57}
          height={75}
          className="pointer-events-none absolute top-12 left-1/2 h-64 w-auto -translate-x-1/2 select-none opacity-[0.06] [mask-image:linear-gradient(to_bottom,black_45%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,black_45%,transparent_95%)] sm:top-16 sm:h-80"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl text-brand-mint italic sm:text-3xl">
            The founding team
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Behind every funded case, a team that shows up
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-lg">
            Get to know the people who review, verify and release funds — and why each of them said yes to this mission.
          </p>
        </div>
      </section>

      {/* ── Explorer ── */}
      <Reveal>
        <section className="relative mx-[12px] mb-6 rounded-3xl bg-brand-soft-sage/60 px-3 pt-12 pb-16 sm:mx-[20px] sm:px-14 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
          <div className="relative mx-auto max-w-6xl">
            <TeamExplorer members={team} />
          </div>
        </section>
      </Reveal>

      {/* ── Principles ── */}
      <Reveal>
        <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-24 sm:px-14 sm:pt-24 sm:pb-32">
          <div className="text-center">
            <p className="font-serif text-2xl text-brand-deep-green italic sm:text-3xl">How we work</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.1] text-brand-forest sm:text-5xl">
              Small team, high standards
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="bg-background p-8 transition hover:bg-brand-soft-sage/60">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft-sage">
                  <p.icon className="h-5 w-5 text-brand-deep-green" strokeWidth={1.5} />
                </div>
                <h3 className="mt-12 font-display text-2xl font-semibold text-brand-forest sm:mt-16 sm:text-3xl">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-brand-muted-sage">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="mx-[12px] mb-6 overflow-hidden rounded-3xl bg-brand-soft-sage px-8 py-16 text-center sm:mx-[20px] sm:px-14 sm:py-20">
          <h2 className="font-display text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
            Want to build this with us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted-sage">
            We&apos;re growing carefully. If you care about healthcare access and want to do the best work of your career, say hello.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:hello@fundpatients.com?subject=Joining%20the%20FundPatients%20team"
              className="inline-flex items-center gap-2 rounded-full bg-brand-deep-green px-6 py-3 font-medium text-white transition hover:bg-brand-forest"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-brand-forest transition hover:border-brand-deep-green"
            >
              Our story
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
