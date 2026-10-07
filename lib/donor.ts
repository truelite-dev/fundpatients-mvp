import { listPublishedCases, type CaseSummary } from "@/lib/cases";
import {
  mockActivity,
  mockDonor,
  mockStoryRelations,
  mockTopDonations,
  type ActivityGroup,
  type Donor,
  type TopDonation,
} from "@/lib/mock/donor";

export type { ActivityGroup, ActivityItem, ActivityItemType, Donor, TopDonation } from "@/lib/mock/donor";

// Data-access layer for the donor dashboard. Mock-backed for now; swap the
// bodies for Supabase queries when auth lands — signatures stay the same.

export async function getDonorSession(): Promise<Donor> {
  return mockDonor;
}

export async function getDonorActivity(): Promise<ActivityGroup[]> {
  return mockActivity;
}

export type TopDonationsPeriod = "today" | "week" | "month" | "all";

export async function getTopDonations(period: TopDonationsPeriod = "today"): Promise<TopDonation[]> {
  void period;
  return mockTopDonations;
}

export type MyStory = CaseSummary & { donatedAmount: number; following: boolean };
export type MyStoriesFilter = "all" | "donated" | "following";

// Stories the donor has given to and/or follows. Mock relations over real
// published cases; swap for donations + case_follows queries with auth.
export async function getMyStories(filter: MyStoriesFilter = "all"): Promise<MyStory[]> {
  const cases = await listPublishedCases();
  const stories = mockStoryRelations.flatMap((relation, i) =>
    cases[i] ? [{ ...cases[i], ...relation }] : []
  );
  if (filter === "donated") return stories.filter((s) => s.donatedAmount > 0);
  if (filter === "following") return stories.filter((s) => s.following);
  return stories;
}
