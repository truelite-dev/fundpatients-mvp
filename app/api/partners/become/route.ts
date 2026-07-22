import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  contactEmail: z.string().trim().email(),
  contactPhone: z.string().trim().max(30).optional().or(z.literal("")),
  specialization: z.string().trim().min(1).max(200),
  yearEstablished: z.coerce.number().int().min(1800).max(new Date().getFullYear()),
  reason: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, contactEmail, contactPhone, specialization, yearEstablished, reason } =
    parsed.data;

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("organizations")
    .insert({
      name,
      contact_email: contactEmail,
      contact_phone: contactPhone || null,
      specialization,
      year_established: yearEstablished,
      reason: reason || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[api/partners/become] insert failed", error);
    return NextResponse.json({ error: "Could not submit your application." }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
