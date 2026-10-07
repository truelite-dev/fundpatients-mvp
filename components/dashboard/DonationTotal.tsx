"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

export function DonationTotal({ amount, currency }: { amount: number; currency: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <p className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-deep-green">
      <span>{visible ? formatCurrency(amount, currency) : `${currency} •••••••`} donated</span>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide total donated" : "Show total donated"}
        aria-pressed={visible}
        className="text-brand-muted-sage transition hover:text-brand-deep-green"
      >
        {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
    </p>
  );
}
