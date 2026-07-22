import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createServiceRoleClient } from "@/lib/supabase/server";

// Paystack signs the raw body with the secret key (HMAC SHA512) and sends it
// in x-paystack-signature — verify before trusting anything in the payload.
function isValidSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");
  const signatureBuf = Buffer.from(signature, "utf8");
  return expectedBuf.length === signatureBuf.length && timingSafeEqual(expectedBuf, signatureBuf);
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const donationId = event.data.reference as string;
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

  return NextResponse.json({ received: true });
}
