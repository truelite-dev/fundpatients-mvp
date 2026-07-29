"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

const R = 80;
const CX = 110;
const CY = 100;
const START_ANGLE = 135; // degrees in SVG coord space (CW from positive-x axis)
const TOTAL_SWEEP = 270;

function polar(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: +(CX + R * Math.cos(rad)).toFixed(2),
    y: +(CY + R * Math.sin(rad)).toFixed(2),
  };
}

const ARC_START = polar(START_ANGLE);
const ARC_END = polar(START_ANGLE + TOTAL_SWEEP);

const BG_PATH = `M ${ARC_START.x} ${ARC_START.y} A ${R} ${R} 0 1 1 ${ARC_END.x} ${ARC_END.y}`;

function progressPath(percent: number) {
  if (percent <= 0) return "";
  const sweep = (Math.min(100, percent) / 100) * TOTAL_SWEEP;
  const end = polar(START_ANGLE + sweep);
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${ARC_START.x} ${ARC_START.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

type Props = {
  id: string;
  goal_amount: number;
  currency: string;
  amount_raised: number;
  supporter_count?: number;
};

export function DonationGauge({ id, goal_amount, currency, amount_raised, supporter_count = 0 }: Props) {
  const percent = goal_amount > 0
    ? Math.min(100, Math.round((amount_raised / goal_amount) * 100))
    : 0;
  const amountLeft = Math.max(0, goal_amount - amount_raised);
  const dot = polar(START_ANGLE + (percent / 100) * TOTAL_SWEEP);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="p-5">
      {/* Donor pill */}
      <div className="flex justify-center">
        <span className="rounded-full bg-brand-soft-sage px-4 py-1 text-xs font-semibold text-brand-forest">
          {supporter_count} {supporter_count === 1 ? "Donor" : "Donors"}
        </span>
      </div>

      {/* SVG gauge */}
      <svg viewBox="0 0 220 183" className="mt-1 w-full" aria-hidden>
        {/* Background arc */}
        <path d={BG_PATH} fill="none" stroke="#e2e8e3" strokeWidth={7} strokeLinecap="round" />

        {/* Progress arc */}
        {percent > 0 && (
          <motion.path
            d={progressPath(percent)}
            fill="none"
            stroke="#1a6b2a"
            strokeWidth={7}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}

        {/* Indicator dot */}
        {percent > 0 && (
          <motion.circle
            cx={dot.x}
            cy={dot.y}
            r={7}
            fill="#f5c542"
            stroke="white"
            strokeWidth={2.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          />
        )}

        {/* Center labels */}
<text x={CX} y={CY - 8} textAnchor="middle" fill="#0b1f0e" fontSize={15} fontWeight="700" fontFamily="inherit">
          {formatCurrency(amount_raised, currency)}
        </text>
        <text x={CX} y={CY + 8} textAnchor="middle" fill="#6b7c6e" fontSize={9} fontFamily="inherit">
          {formatCurrency(amountLeft, currency)} left
        </text>

        {/* 0% / 100% end labels */}
        <text x={ARC_START.x} y={ARC_START.y + 18} textAnchor="middle" fill="#6b7c6e" fontSize={8} fontFamily="inherit">0%</text>
        <text x={ARC_END.x} y={ARC_END.y + 18} textAnchor="middle" fill="#6b7c6e" fontSize={8} fontFamily="inherit">100%</text>
      </svg>

      </div>

      {/* Donate CTA — card footer */}
      <Link
        href={`/donate?case=${id}`}
        className="flex w-full items-center justify-center gap-2 border-t border-border bg-brand-deep-green py-4 text-base font-semibold text-white transition hover:bg-brand-forest"
      >
        <Heart className="h-4 w-4" />
        Donate now
      </Link>
    </div>
  );
}
