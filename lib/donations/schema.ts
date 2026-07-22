import { z } from "zod";

export const donationRequestSchema = z.object({
  caseId: z.string().uuid(),
  amount: z.coerce.number().positive(),
  tipAmount: z.coerce.number().min(0).default(0),
  isRecurring: z.boolean().default(false),
  donorName: z.string().trim().max(200).optional().or(z.literal("")),
  donorEmail: z.string().trim().email(),
  relationshipToPatient: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  isAnonymous: z.boolean().default(false),
});

export type DonationRequest = z.infer<typeof donationRequestSchema>;
