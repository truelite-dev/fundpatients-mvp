import { TellAFriendCard } from "@/components/dashboard/TellAFriendCard";
import { TopDonationsCard } from "@/components/dashboard/TopDonationsCard";
import { UpdatesFeed } from "@/components/dashboard/UpdatesFeed";
import { Reveal } from "@/components/motion/Reveal";
import { getDonorActivity, getTopDonations } from "@/lib/donor";

export const metadata = { title: "Overview" };

export default async function OverviewPage() {
  const [groups, topDonations] = await Promise.all([getDonorActivity(), getTopDonations()]);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
      <Reveal>
        <UpdatesFeed groups={groups} />
      </Reveal>
      <div className="flex flex-col gap-4">
        <Reveal delay={0.1}>
          <TopDonationsCard donations={topDonations} />
        </Reveal>
        <Reveal delay={0.2}>
          <TellAFriendCard />
        </Reveal>
      </div>
    </div>
  );
}
