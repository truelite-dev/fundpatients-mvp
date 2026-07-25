import Image from "next/image";
import { gradientForSeed } from "@/lib/placeholderGradient";

export function CasePlaceholder({
  seed,
  className,
  iconClassName,
}: {
  seed: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradientForSeed(seed)} ${className ?? ""}`}
    >
      <Image
        src="/images/brand/giving-hands-white.svg"
        alt=""
        aria-hidden
        width={48}
        height={48}
        className={iconClassName ?? "h-10 w-10 opacity-70"}
      />
    </div>
  );
}
