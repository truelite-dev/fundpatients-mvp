import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { Reveal } from "@/components/motion/Reveal";
import { getNotificationSettings, getPaymentMethod } from "@/lib/donor";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const [settings, card] = await Promise.all([getNotificationSettings(), getPaymentMethod()]);

  return (
    <Reveal className="rounded-3xl bg-white p-5 sm:p-8">
      <h1 className="font-display text-2xl font-semibold text-brand-forest">Settings</h1>
      <p className="mt-1 text-sm text-brand-muted-sage">Manage system configurations</p>
      <SettingsForm initial={settings} card={card} />
    </Reveal>
  );
}
