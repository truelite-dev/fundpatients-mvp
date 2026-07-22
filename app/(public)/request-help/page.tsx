import { RequestHelpForm } from "@/components/public/RequestHelpForm";

export const metadata = { title: "Request Help" };

export default function RequestHelpPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">Request help</h1>
      <p className="mt-2 text-brand-muted-sage">
        This is step 1 of the request. An administrator will follow up by email once your
        submission is reviewed.
      </p>
      <RequestHelpForm />
    </main>
  );
}
