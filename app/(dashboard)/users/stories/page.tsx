import Link from "next/link";
import { MyStoryRow } from "@/components/dashboard/MyStoryRow";
import { Reveal } from "@/components/motion/Reveal";
import { getMyStories, type MyStoriesFilter } from "@/lib/donor";

export const metadata = { title: "My stories" };

const filters: { value: MyStoriesFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "donated", label: "Donated" },
  { value: "following", label: "Following" },
];

const emptyCopy: Record<MyStoriesFilter, string> = {
  all: "You haven't donated to or followed any stories yet.",
  donated: "You haven't donated to any stories yet.",
  following: "You aren't following any stories yet.",
};

export default async function MyStoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: raw } = await searchParams;
  const filter: MyStoriesFilter = filters.some((f) => f.value === raw) ? (raw as MyStoriesFilter) : "all";
  const stories = await getMyStories(filter);

  return (
    <Reveal className="rounded-3xl bg-white p-5 sm:p-8">
      <h1 className="font-display text-2xl font-semibold text-brand-forest">My stories</h1>
      <p className="mt-1 text-sm text-brand-muted-sage">Stories you&apos;ve donated to or follow</p>

      <nav aria-label="Filter stories" className="mt-5 flex gap-2">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={f.value === "all" ? "/users/stories" : `/users/stories?filter=${f.value}`}
            aria-current={f.value === filter ? "page" : undefined}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              f.value === filter
                ? "bg-brand-deep-green text-white"
                : "border border-border text-brand-forest hover:bg-brand-soft-sage"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {stories.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-brand-soft-sage px-6 py-10 text-center">
          <p className="text-sm text-brand-muted-sage">{emptyCopy[filter]}</p>
          <Link href="/stories" className="mt-3 inline-block text-sm font-medium text-brand-deep-green hover:underline">
            Discover stories
          </Link>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {stories.map((story) => (
            <MyStoryRow key={story.id} story={story} />
          ))}
        </ul>
      )}
    </Reveal>
  );
}
