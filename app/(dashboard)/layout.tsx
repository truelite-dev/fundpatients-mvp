import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getDonorSession } from "@/lib/donor";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const donor = await getDonorSession();

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <DashboardShell donor={donor}>{children}</DashboardShell>
      </div>
      <SiteFooter />
    </>
  );
}
