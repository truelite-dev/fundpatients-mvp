import { listPublishedCases, type CaseSummary } from "@/lib/cases";
import {
  mockActivity,
  mockDonations,
  mockDonor,
  mockNotificationSettings,
  mockPaymentMethod,
  mockRecurringAmount,
  mockStoryRelations,
  mockTopDonations,
  type ActivityGroup,
  type Donation,
  type Donor,
  type NotificationSettings,
  type PaymentMethod,
  type TopDonation,
} from "@/lib/mock/donor";

export type {
  ActivityGroup,
  ActivityItem,
  ActivityItemType,
  Donation,
  Donor,
  NotificationKey,
  NotificationSettings,
  PaymentMethod,
  TopDonation,
} from "@/lib/mock/donor";

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

export type DonationSummary = {
  totalPaid: number;
  currency: string;
  firstDonationAt: string | null;
  pendingCount: number;
  nextDueAmount: number;
  nextPaymentDate: string;
  paymentMethod: PaymentMethod;
};

export async function getDonations(): Promise<Donation[]> {
  return [...mockDonations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Recurring gifts fall on the 17th; next due is the upcoming 17th.
function nextMonthlyDate(day = 17) {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), day);
  if (d <= now) d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

export async function getDonationSummary(): Promise<DonationSummary> {
  const paid = mockDonations.filter((d) => d.status === "paid");
  const first = [...paid].sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0];
  return {
    totalPaid: paid.reduce((sum, d) => sum + d.amount, 0),
    currency: "NGN",
    firstDonationAt: first?.createdAt ?? null,
    pendingCount: mockDonations.filter((d) => d.status === "pending").length,
    nextDueAmount: mockRecurringAmount,
    nextPaymentDate: nextMonthlyDate(),
    paymentMethod: mockPaymentMethod,
  };
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  return mockNotificationSettings;
}

export async function getPaymentMethod(): Promise<PaymentMethod> {
  return mockPaymentMethod;
}
