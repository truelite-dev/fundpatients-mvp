// Funding progress -> bar colour. Warm = just started, green = nearly there.
// Classes are written out in full so Tailwind can see them.
const STAGES = [
  { min: 75, bar: "bg-brand-deep-green" },
  { min: 50, bar: "bg-lime-500" },
  { min: 25, bar: "bg-amber-500" },
  { min: 0, bar: "bg-rose-500" },
] as const;

export function fundingBarClass(percent: number) {
  return STAGES.find((s) => percent >= s.min)!.bar;
}
