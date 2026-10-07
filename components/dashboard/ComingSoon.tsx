import { Reveal } from "@/components/motion/Reveal";

export function ComingSoon({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Reveal className="rounded-3xl bg-white p-6 sm:p-8">
      <h1 className="font-display text-2xl font-semibold text-brand-forest">{title}</h1>
      <p className="mt-1 text-sm text-brand-muted-sage">{subtitle}</p>
      <div className="mt-8 rounded-2xl bg-brand-soft-sage px-6 py-10 text-center">
        <p className="font-display text-lg font-semibold text-brand-deep-green">Coming soon</p>
        <p className="mt-1 text-sm text-brand-muted-sage">
          This part of your dashboard is still being built.
        </p>
      </div>
    </Reveal>
  );
}
