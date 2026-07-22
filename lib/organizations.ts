import { createClient } from "@/lib/supabase/server";

export type ApprovedOrganization = {
  id: string;
  name: string;
  specialization: string | null;
};

export async function listApprovedOrganizations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("id, name, specialization")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as ApprovedOrganization[];
}
