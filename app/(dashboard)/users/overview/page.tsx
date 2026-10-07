import { RightRail } from "@/components/dashboard/RightRail";
import { UpdatesFeed } from "@/components/dashboard/UpdatesFeed";
import { Reveal } from "@/components/motion/Reveal";
import { getDonorActivity } from "@/lib/donor";

export const metadata = { title: "Overview" };

export default async function OverviewPage() {
  const groups = await getDonorActivity();

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
      <Reveal>
        <UpdatesFeed groups={groups} />
      </Reveal>
      <RightRail />
    </div>
  );
}
