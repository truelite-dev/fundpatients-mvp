import { TellAFriendCard } from "@/components/dashboard/TellAFriendCard";
import { TopDonationsCard } from "@/components/dashboard/TopDonationsCard";
import { Reveal } from "@/components/motion/Reveal";
import { getTopDonations } from "@/lib/donor";

// Right-hand column shared by Overview and Donations.
export async function RightRail() {
  const topDonations = await getTopDonations();

  return (
    <div className="flex flex-col gap-4">
      <Reveal delay={0.1}>
        <TopDonationsCard donations={topDonations} />
      </Reveal>
      <Reveal delay={0.2}>
        <TellAFriendCard />
      </Reveal>
    </div>
  );
}
