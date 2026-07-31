import { createClient } from "@/lib/supabase/server";
import type { CaseSummary } from "@/lib/cases";

export type ApprovedOrganization = {
  id: string;
  name: string;
  specialization: string | null;
  year_established: number | null;
  contact_phone: string | null;
  case_count?: number;
};

export type OrganizationDetail = ApprovedOrganization & {
  contact_email: string;
  created_at: string;
};

export async function listApprovedOrganizations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("id, name, specialization, year_established, contact_phone")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as ApprovedOrganization[];
}

export async function getOrganizationById(id: string): Promise<OrganizationDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("id, name, specialization, year_established, contact_phone, contact_email, created_at")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error) return null;
  return data as OrganizationDetail;
}

export async function listCasesByOrganization(orgId: string): Promise<CaseSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cases")
    .select("id, title, description, goal_amount, currency, amount_raised, cover_image_url, location")
    .eq("organization_id", orgId)
    .in("status", ["published", "fully_funded"])
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CaseSummary[];
}
