import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  goalAmount: z.coerce.number().positive(),
  currency: z.enum(["NGN", "USD", "EUR"]),
  beneficiaryName: z.string().trim().min(1).max(200),
  requesterName: z.string().trim().min(1).max(200),
  requesterPhone: z.string().trim().min(1).max(30),
  requesterEmail: z.string().trim().email(),
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { goalAmount, currency, beneficiaryName, requesterName, requesterPhone, requesterEmail } =
    parsed.data;

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("cases")
    .insert({
      goal_amount: goalAmount,
      currency,
      beneficiary_name: beneficiaryName,
      title: `Help ${beneficiaryName}`,
      requester_name: requesterName,
      requester_phone: requesterPhone,
      requester_email: requesterEmail,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[api/request-help] insert failed", error);
    return NextResponse.json({ error: "Could not submit your request." }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
