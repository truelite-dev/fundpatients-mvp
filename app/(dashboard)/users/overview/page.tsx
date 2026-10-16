import { RightRail } from "@/components/dashboard/RightRail";
import { UpdatesFeed } from "@/components/dashboard/UpdatesFeed";
import { Reveal } from "@/components/motion/Reveal";
import { getDonorActivity, getRecommendedStories } from "@/lib/donor";

export const metadata = { title: "Overview" };

export default async function OverviewPage() {
  const [groups, recommended] = await Promise.all([getDonorActivity(), getRecommendedStories()]);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 min-[1100px]:grid-cols-[minmax(0,1fr)_300px] min-[1100px]:items-start">
      <Reveal>
        <UpdatesFeed groups={groups} recommended={recommended} />
      </Reveal>
      <RightRail />
    </div>
  );
}
