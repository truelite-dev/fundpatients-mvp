import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  const stripe = getStripeClient();
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("[api/donations/stripe/webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { id: string; metadata?: { donationId?: string } };
    const donationId = session.metadata?.donationId;
    if (donationId) {
      const supabase = createServiceRoleClient();

      const { data: donation } = await supabase
        .from("donations")
        .select("id, case_id, amount, status")
        .eq("id", donationId)
        .maybeSingle();

      if (donation && donation.status !== "paid") {
        await supabase.from("donations").update({ status: "paid" }).eq("id", donation.id);
        await supabase.rpc("increment_case_amount_raised", {
          p_case_id: donation.case_id,
          p_amount: donation.amount,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
