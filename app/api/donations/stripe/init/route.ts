import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { donationRequestSchema } from "@/lib/donations/schema";
import { createPendingDonation } from "@/lib/donations/createPendingDonation";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";

const bodySchema = donationRequestSchema.extend({
  currency: z.enum(["USD", "EUR"]),
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid donation." }, { status: 400 });
  }

  const { currency, ...donation } = parsed.data;

  let donationId: string;
  try {
    donationId = await createPendingDonation({ ...donation, currency, provider: "stripe" });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not start donation." },
      { status: 400 }
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = getStripeClient();
  const totalAmount = donation.amount + donation.tipAmount;

  const session = await stripe.checkout.sessions.create({
    mode: donation.isRecurring ? "subscription" : "payment",
    customer_email: donation.donorEmail,
    client_reference_id: donationId,
    metadata: { donationId },
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: { name: "FundPatients donation" },
          unit_amount: Math.round(totalAmount * 100),
          ...(donation.isRecurring ? { recurring: { interval: "month" as const } } : {}),
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/donate/thank-you?donation=${donationId}`,
    cancel_url: `${origin}/donate?case=${donation.caseId}`,
  });

  const supabase = createServiceRoleClient();
  await supabase.from("donations").update({ payment_reference: session.id }).eq("id", donationId);

  return NextResponse.json({ url: session.url }, { status: 201 });
}
