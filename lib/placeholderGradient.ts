const GRADIENTS = [
  "from-brand-deep-green to-brand-forest",
  "from-brand-mint to-brand-deep-green",
  "from-brand-forest to-brand-muted-sage",
  "from-brand-muted-sage to-brand-deep-green",
];

// Deterministic per id so the same case always renders the same placeholder art.
export function gradientForSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}
