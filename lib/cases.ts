import { createClient } from "@/lib/supabase/server";

export type CaseSummary = {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  currency: string;
  amount_raised: number;
  cover_image_url: string | null;
  location: string | null;
};

export async function listPublishedCases() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cases")
    .select("id, title, description, goal_amount, currency, amount_raised, cover_image_url, location")
    .in("status", ["published", "fully_funded"])
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data as CaseSummary[];
}

export async function getCaseById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cases")
    .select(
      "id, title, description, goal_amount, currency, amount_raised, cover_image_url, location, published_at, status"
    )
    .eq("id", id)
    .in("status", ["published", "fully_funded", "closed"])
    .maybeSingle();

  if (error) throw error;
  return data;
}
