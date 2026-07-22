export const metadata = { title: "Thank You" };

export default function DonateThankYouPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold text-brand-forest">Thank you.</h1>
      <p className="mt-2 text-brand-muted-sage">
        Your donation is being processed. We&apos;ll send a confirmation to your email once
        payment is confirmed.
      </p>
    </main>
  );
}
