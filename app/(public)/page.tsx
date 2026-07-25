import { HeroCarousel } from "@/components/public/home/HeroCarousel";
import { WaysToDonate } from "@/components/public/home/WaysToDonate";
import { StoriesPreview } from "@/components/public/home/StoriesPreview";
import { HowItWorks } from "@/components/public/home/HowItWorks";
import { Testimonials } from "@/components/public/home/Testimonials";
import { PartnerCTA } from "@/components/public/home/PartnerCTA";
import { Reveal } from "@/components/motion/Reveal";
import { listTopCases } from "@/lib/cases";

export default async function Home() {
  const topCases = await listTopCases(5);

  return (
    <main className="flex flex-1 flex-col">
      <div className="pt-5">
        <HeroCarousel cases={topCases} />
      </div>
      <Reveal>
        <WaysToDonate />
      </Reveal>
      <Reveal>
        <StoriesPreview />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <PartnerCTA />
      </Reveal>
    </main>
  );
}
