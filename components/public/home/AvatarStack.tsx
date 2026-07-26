"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function AvatarStack({ avatars }: { avatars: string[] }) {
  return (
    <div className="mx-auto mt-6 flex w-[85%] py-8">
      {avatars.map((src, j) => (
        <motion.div
          key={j}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: j * 0.12 }}
          className={`relative aspect-square flex-1 overflow-hidden rounded-full ring-4 ring-background ${j > 0 ? "-ml-6" : ""}`}
        >
          <Image src={src} alt="" fill unoptimized className="object-cover" />
        </motion.div>
      ))}
    </div>
  );
}
