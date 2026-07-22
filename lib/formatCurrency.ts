const SYMBOLS: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
};

export function formatCurrency(amount: number, currency: string) {
  const symbol = SYMBOLS[currency] ?? currency;
  return `${symbol}${amount.toLocaleString()}`;
}
