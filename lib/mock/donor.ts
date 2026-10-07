// Mock fixtures for the donor dashboard. Replaced by Supabase reads behind
// lib/donor.ts in a later phase — UI never imports this file directly.

export type Donor = {
  id: string;
  firstName: string;
  lastName: string;
  memberSince: string;
  totalDonated: number;
  currency: string;
};

export type ActivityItemType = "donation" | "follow" | "comment" | "admin" | "thank-you";

export type ActivityItem = {
  id: string;
  type: ActivityItemType;
  actor: string;
  amount?: number;
  currency?: string;
  body?: string;
  createdAt: string;
};

export type ActivityGroup = {
  id: string;
  caseTitle: string;
  caseHref: string;
  isNew?: boolean;
  items: ActivityItem[];
};

export type TopDonation = {
  id: string;
  donor: string;
  amount: number;
  currency: string;
  caseTitle: string;
};

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const DAY = 60 * 24;

export const mockDonor: Donor = {
  id: "donor-1",
  firstName: "Temisan",
  lastName: "James",
  memberSince: "2026-01-15T00:00:00.000Z",
  totalDonated: 1_250_000,
  currency: "NGN",
};

export const mockActivity: ActivityGroup[] = [
  {
    id: "g1",
    caseTitle: "Help Jennifer Regain Her Health",
    caseHref: "/stories",
    isNew: true,
    items: [
      { id: "g1-1", type: "thank-you", actor: "FundPatients", amount: 100_000, currency: "NGN", createdAt: ago(25) },
      { id: "g1-2", type: "comment", actor: "Drakes Lemon", body: "I know Jennifer, I pray for speedy recovery. Amen.", createdAt: ago(90) },
      { id: "g1-3", type: "admin", actor: "Admin", body: "Surgery completed and successful.", createdAt: ago(3 * 60) },
      { id: "g1-4", type: "follow", actor: "James Diko", createdAt: ago(5 * 60) },
    ],
  },
  {
    id: "g2",
    caseTitle: "Lung Collapse",
    caseHref: "/stories",
    items: [
      { id: "g2-1", type: "donation", actor: "Anonymous", amount: 50_000, currency: "NGN", createdAt: ago(2 * DAY) },
      { id: "g2-2", type: "donation", actor: "Adeola", amount: 20_000, currency: "NGN", createdAt: ago(6 * DAY) },
      { id: "g2-3", type: "comment", actor: "Renike James", body: "Please help her.", createdAt: ago(7 * DAY) },
    ],
  },
  {
    id: "g3",
    caseTitle: "Dental Care",
    caseHref: "/stories",
    items: [
      { id: "g3-1", type: "admin", actor: "Admin", body: "Please help, time is ticking!", createdAt: ago(12 * DAY) },
      { id: "g3-2", type: "donation", actor: "Tomi Damilola", amount: 15_000, currency: "NGN", createdAt: ago(20 * DAY) },
    ],
  },
  {
    id: "g4",
    caseTitle: "Eye Surgery",
    caseHref: "/stories",
    items: [
      { id: "g4-1", type: "donation", actor: "Anonymous", amount: 75_000, currency: "NGN", createdAt: ago(40 * DAY) },
      { id: "g4-2", type: "follow", actor: "Dorian Mcroow", createdAt: ago(45 * DAY) },
    ],
  },
];

export const mockTopDonations: TopDonation[] = [];
