import {
  mockActivity,
  mockDonor,
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
