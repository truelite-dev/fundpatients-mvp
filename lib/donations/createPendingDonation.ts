import "server-only";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { DonationRequest } from "@/lib/donations/schema";

export async function createPendingDonation(
  input: DonationRequest & { currency: "NGN" | "USD" | "EUR"; provider: "paystack" | "stripe" }
) {
  const supabase = createServiceRoleClient();

  const { data: activeCase, error: caseError } = await supabase
    .from("cases")
    .select("id, status")
    .eq("id", input.caseId)
    .in("status", ["published", "fully_funded"])
    .maybeSingle();

  if (caseError || !activeCase) {
    throw new Error("Case not found or not accepting donations.");
  }

  const { data, error } = await supabase
    .from("donations")
    .insert({
      case_id: input.caseId,
      donor_name: input.isAnonymous ? null : input.donorName || null,
      donor_email: input.donorEmail,
      amount: input.amount,
      tip_amount: input.tipAmount,
      currency: input.currency,
      is_recurring: input.isRecurring,
      relationship_to_patient: input.relationshipToPatient || null,
      message: input.message || null,
      is_anonymous: input.isAnonymous,
      payment_provider: input.provider,
      status: "pending",
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error("Could not create donation record.");
  }

  return data.id as string;
}
