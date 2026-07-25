import { FileHeart, HandCoins, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: FileHeart,
    title: "Browse a story",
    body: "Find a case that resonates with you among verified patients.",
    number: "01",
  },
  {
    icon: HandCoins,
    title: "Choose an amount",
    body: "Give once or set up a recurring monthly gift, in NGN, USD, or EUR.",
    number: "02",
  },
  {
    icon: TrendingUp,
    title: "Track the impact",
    body: "Follow the case and see updates as their treatment progresses.",
    number: "03",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-brand-forest px-6 py-28">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-mint/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-mint uppercase">
            How it works
          </p>
          <h2 className="mt-3 font-display font-semibold text-white">
            Simple. Transparent. Impactful.
          </h2>
          <p className="mt-3 text-brand-soft-sage/70">
            Support a life-changing case in three straightforward steps.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="relative flex flex-col rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm">
                {/* Large step number watermark */}
                <span className="absolute top-5 right-6 font-display text-6xl font-bold leading-none text-white/5 select-none">
                  {s.number}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint/15">
                  <s.icon className="h-6 w-6 text-brand-mint" strokeWidth={1.5} />
                </div>

                <p className="mt-6 text-[10px] font-semibold tracking-widest text-brand-mint/70 uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
