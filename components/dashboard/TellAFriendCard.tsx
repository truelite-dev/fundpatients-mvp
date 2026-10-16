import { MessageCircle, Share2 } from "lucide-react";

const message = encodeURIComponent("Help patients get the care they need — join me on FundPatients.");

export function TellAFriendCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-forest from-45% to-[#1d5a28] p-5 text-white sm:p-6">
      {/* Soft mint glow, same idea as the footer's. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-brand-mint/25 blur-3xl"
      />
      <h2 className="relative font-display text-lg font-semibold">Tell a friend about FundPatients</h2>
      <p className="relative mt-2 text-sm text-white/70">
        Every share helps a patient reach their goal faster.
      </p>
      <div className="relative mt-4 flex gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-mint px-4 py-2 text-sm font-medium text-brand-forest transition hover:bg-white"
        >
          <Share2 className="h-4 w-4" />
          Twitter
        </a>
        <a
          href={`https://wa.me/?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}
