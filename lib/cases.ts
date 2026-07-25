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

// "Top" = highest amount raised among published cases — the closest proxy to
// "featured" until an admin CMS adds a real curation flag.
export async function listTopCases(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cases")
    .select("id, title, description, goal_amount, currency, amount_raised, cover_image_url, location")
    .in("status", ["published", "fully_funded"])
    .order("amount_raised", { ascending: false })
    .limit(limit);

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
