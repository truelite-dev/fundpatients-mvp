import { createClient } from "@/lib/supabase/server";

export type CaseComment = {
  id: string;
  body: string;
  author_name: string | null;
  created_at: string;
};

export async function listCaseComments(caseId: string): Promise<CaseComment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("case_comments")
    .select("id, body, author_name, created_at")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false });
  return data ?? [];
}
