import { NextRequest, NextResponse } from "next/server";
import { donationRequestSchema } from "@/lib/donations/schema";
import { createPendingDonation } from "@/lib/donations/createPendingDonation";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = donationRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid donation." }, { status: 400 });
  }

  let donationId: string;
  try {
    donationId = await createPendingDonation({
      ...parsed.data,
      currency: "NGN",
      provider: "paystack",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not start donation." },
      { status: 400 }
    );
  }

  const totalKobo = Math.round((parsed.data.amount + parsed.data.tipAmount) * 100);
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: parsed.data.donorEmail,
      amount: totalKobo,
      currency: "NGN",
      reference: donationId,
      callback_url: `${origin}/donate/thank-you?donation=${donationId}`,
    }),
  });

  const paystackData = await paystackRes.json();

  if (!paystackRes.ok || !paystackData.status) {
    console.error("[api/donations/paystack/init] paystack error", paystackData);
    return NextResponse.json({ error: "Could not initialize payment." }, { status: 502 });
  }

  const supabase = createServiceRoleClient();
  await supabase
    .from("donations")
    .update({ payment_reference: donationId })
    .eq("id", donationId);

  return NextResponse.json({ url: paystackData.data.authorization_url }, { status: 201 });
}
