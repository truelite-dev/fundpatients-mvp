import { BecomePartnerForm } from "@/components/public/BecomePartnerForm";

export const metadata = { title: "Become a Partner" };

export default function BecomePartnerPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">
        Become a FundPatients partner
      </h1>
      <p className="mt-2 text-brand-muted-sage">
        Fill and submit this form. An administrator will review your application and follow up by
        email.
      </p>
      <BecomePartnerForm />
    </main>
  );
}
