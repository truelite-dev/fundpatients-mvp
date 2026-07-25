import { FileHeart, HandCoins, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: FileHeart,
    title: "Browse a story",
    body: "Find a case that resonates with you among verified patients.",
  },
  {
    icon: HandCoins,
    title: "Choose an amount",
    body: "Give once or set up a recurring monthly gift, in NGN, USD, or EUR.",
  },
  {
    icon: TrendingUp,
    title: "Track the impact",
    body: "Follow the case and see updates as their treatment progresses.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display font-semibold text-brand-forest">
          How FundPatients Works
        </h2>
        <p className="mt-2 text-brand-muted-sage">
          Directly support individuals facing urgent medical expenses and help them access vital
          care.
        </p>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15} className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft-sage">
                <s.icon className="h-8 w-8 text-brand-deep-green" strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-xs font-semibold text-brand-muted-sage">STEP {i + 1}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-brand-forest">
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs text-base text-brand-muted-sage">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
