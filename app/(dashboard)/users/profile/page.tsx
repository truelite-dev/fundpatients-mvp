import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { Reveal } from "@/components/motion/Reveal";
import { getProfile } from "@/lib/donor";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <Reveal className="rounded-3xl bg-white p-5 sm:p-8">
      <ProfileForm initial={profile} />
    </Reveal>
  );
}
