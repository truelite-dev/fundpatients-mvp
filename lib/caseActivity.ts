import { createClient } from "@/lib/supabase/server";

export type CaseUpdate = {
  id: string;
  case_id: string;
  body: string;
  published_at: string;
};

export type PublicDonation = {
  id: string;
  case_id: string;
  display_name: string;
  amount: number;
  currency: string;
  message: string | null;
  created_at: string;
};

export async function listCaseUpdates(caseId: string): Promise<CaseUpdate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("case_updates")
    .select("id, case_id, body, published_at")
    .eq("case_id", caseId)
    .order("published_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data ?? []) as CaseUpdate[];
}

export async function listCasePublicDonations(caseId: string): Promise<PublicDonation[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("case_public_donations")
    .select("id, case_id, display_name, amount, currency, message, created_at")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data ?? []) as PublicDonation[];
}
