import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Users, TrendingUp, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = { title: "About | FundPatients" };

const stats = [
  { value: "₦2.4B+", label: "Raised for patients" },
  { value: "1,200+", label: "Cases funded" },
  { value: "48,000+", label: "Donors nationwide" },
  { value: "62", label: "Verified medical partners" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Radical transparency",
    body: "Every naira is tracked from donor to patient. We publish real-time updates on every case and share verified receipts from our medical partners.",
  },
  {
    icon: Heart,
    title: "Human first",
    body: "Behind every case is a person. We write stories, not statistics — because empathy is what moves people to give.",
  },
  {
    icon: Users,
    title: "Community-powered",
    body: "We believe healthcare is a communal responsibility. FundPatients is built on the idea that when we show up for each other, no one faces illness alone.",
  },
  {
    icon: TrendingUp,
    title: "Verified impact",
    body: "We partner only with licensed medical institutions. Every case is reviewed before it goes live, and funds are released directly to hospitals — never to individuals.",
  },
];

const milestones = [
  { year: "2021", event: "FundPatients founded after a personal experience with medical fundraising in Lagos." },
  { year: "2022", event: "First 100 cases funded. Partnered with 8 hospitals across Lagos and Abuja." },
  { year: "2023", event: "₦500M raised. Launched medical partner verification programme." },
  { year: "2024", event: "Expanded to 6 states. Introduced recurring donations and anonymous giving." },
  { year: "2025", event: "₦2.4B raised across 1,200+ cases. 62 verified medical institution partners." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative mx-[12px] mt-8 mb-6 overflow-hidden rounded-3xl bg-[radial-gradient(150%_140%_at_15%_15%,var(--brand-deep-green)_0%,var(--brand-forest)_55%)] px-8 py-20 sm:mx-[20px] sm:px-14 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-mint/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-brand-mint/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="font-serif text-2xl text-brand-mint italic sm:text-3xl">
            Our mission
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            No one should lose their life to a bill.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-xl">
            FundPatients is a Nigerian medical crowdfunding platform that connects patients facing urgent healthcare costs with a community of donors — transparently, safely, and with dignity.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/stories"
              className="w-full rounded-full bg-brand-mint px-6 py-3 text-center font-medium text-brand-forest transition hover:bg-white sm:w-auto"
            >
              See patient stories
            </Link>
            <Link
              href="/partners"
              className="w-full rounded-full border border-white/30 px-6 py-3 text-center font-medium text-white transition hover:bg-white/10 sm:w-auto"
            >
              Become a partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <Reveal>
        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-semibold text-brand-deep-green sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-brand-muted-sage">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Our Story ── */}
      <Reveal>
        <section className="mx-[12px] mb-6 overflow-hidden rounded-3xl bg-brand-soft-sage px-8 py-16 sm:mx-[20px] sm:px-14 sm:py-20">
          <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="font-serif text-2xl text-brand-deep-green italic sm:text-3xl">Our story</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
                Born from a personal crisis, built for everyone
              </h2>
              <p className="mt-5 leading-relaxed text-brand-muted-sage">
                In 2021, our co-founder Adaeze watched her cousin&apos;s cancer treatment stall for three weeks — not because treatment wasn&apos;t available, but because the family couldn&apos;t raise the upfront deposit fast enough. The hospital couldn&apos;t start. Time was running out. Friends and family tried to help, but coordinating collections over WhatsApp was chaotic.
              </p>
              <p className="mt-4 leading-relaxed text-brand-muted-sage">
                That experience sparked a question: why wasn&apos;t there a trusted, structured way to raise medical funds in Nigeria — one where the hospital was involved from day one, where donors could see exactly where their money went, and where the patient didn&apos;t have to beg?
              </p>
              <p className="mt-4 leading-relaxed text-brand-muted-sage">
                FundPatients was the answer. We built it so that the next family wouldn&apos;t have to lose three weeks.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              {/* Pullquote */}
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <Quote className="h-8 w-8 text-brand-mint" />
                <p className="mt-4 font-display text-xl font-semibold leading-snug text-brand-forest">
                  &ldquo;We didn&apos;t want to build a charity. We wanted to build infrastructure — the kind that means a family never has to scramble again.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-deep-green font-display text-sm font-semibold text-white">AO</div>
                  <div>
                    <p className="text-sm font-semibold text-brand-forest">Adaeze Okonkwo</p>
                    <p className="text-xs text-brand-muted-sage">Co-founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── How it works ── */}
      <Reveal>
        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-14">
          <div className="text-center">
            <p className="font-serif text-2xl text-brand-deep-green italic sm:text-3xl">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
              Transparent from day one
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-muted-sage">
              We designed every step so that donors always know what they&apos;re funding and patients always know help is on the way.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Case submitted", body: "A patient or family submits their case. We review it with our medical partner — the hospital confirms the diagnosis, treatment plan, and cost." },
              { step: "02", title: "Community donates", body: "The verified case goes live. Donors give any amount. Every donation is logged in real time. The patient's family gets notified as funds come in." },
              { step: "03", title: "Funds released directly", body: "Once funded, money is transferred straight to the hospital — not the patient. The hospital confirms receipt and sends us a treatment update." },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-border bg-background p-6">
                <span className="font-display text-4xl font-semibold text-brand-soft-sage">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-brand-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted-sage">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Values ── */}
      <Reveal>
        <section className="mx-[12px] mb-6 overflow-hidden rounded-3xl bg-brand-forest px-8 py-16 sm:mx-[20px] sm:px-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="font-serif text-2xl text-brand-mint italic sm:text-3xl">What we stand for</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Our values</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mint/10">
                    <v.icon className="h-5 w-5 text-brand-mint" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Timeline ── */}
      <Reveal>
        <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-14">
          <div className="text-center">
            <p className="font-serif text-2xl text-brand-deep-green italic sm:text-3xl">Our journey</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
              Four years, one mission
            </h2>
          </div>
          <div className="mt-12 space-y-0">
            {milestones.map((m) => (
              <div key={m.year} className="relative flex gap-6 pb-10 last:pb-0">
                <div aria-hidden className="w-px self-stretch bg-brand-deep-green/20" />
                <div className="pt-1.5 pb-2">
                  <p className="font-serif text-3xl leading-none text-brand-deep-green italic">{m.year}</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-muted-sage">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="mx-[12px] mb-6 overflow-hidden rounded-3xl bg-brand-soft-sage px-8 py-16 text-center sm:mx-[20px] sm:px-14 sm:py-20">
          <h2 className="font-display text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
            Ready to make a difference?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted-sage">
            Browse verified cases and give directly to someone&apos;s recovery. Every amount counts — even ₦1,000 can cover a day of medication.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-full bg-brand-deep-green px-6 py-3 font-medium text-white transition hover:bg-brand-forest"
            >
              Browse cases <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/request-help"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-brand-forest transition hover:border-brand-deep-green"
            >
              Request help
            </Link>
          </div>
        </section>
      </Reveal>

    </div>
  );
}
