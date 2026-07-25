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

// Returns the `limit` published cases closest to their funding goal (by %).
// Sorted in JS since Supabase JS client can't ORDER BY a computed ratio.
export async function listAlmostFundedCases(limit = 5) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cases")
    .select("id, title, description, goal_amount, currency, amount_raised, cover_image_url, location")
    .eq("status", "published")
    .gt("goal_amount", 0);

  if (error) throw error;
  return (data as CaseSummary[])
    .sort((a, b) => b.amount_raised / b.goal_amount - a.amount_raised / a.goal_amount)
    .slice(0, limit);
}

export type CaseDetail = CaseSummary & {
  status: string;
  published_at: string | null;
  supporter_count: number;
  organizations: { name: string; specialization: string | null } | null;
};

export async function getCaseById(id: string): Promise<CaseDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cases")
    .select(
      "id, title, description, goal_amount, currency, amount_raised, cover_image_url, location, published_at, status, supporter_count, organizations(name, specialization)"
    )
    .eq("id", id)
    .in("status", ["published", "fully_funded", "closed"])
    .maybeSingle();

  if (error) throw error;
  return data as CaseDetail | null;
}
