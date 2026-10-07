import { DonorSidebar } from "@/components/dashboard/DonorSidebar";
import { Reveal } from "@/components/motion/Reveal";
import type { Donor } from "@/lib/donor";

export function DashboardShell({ donor, children }: { donor: Donor; children: React.ReactNode }) {
  return (
    <div className="mx-[12px] mb-6 mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mx-[20px] lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
      <Reveal className="lg:sticky lg:top-24">
        <DonorSidebar donor={donor} />
      </Reveal>
      <main>{children}</main>
    </div>
  );
}
