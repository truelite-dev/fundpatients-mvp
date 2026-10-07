import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a second dev server (local-Supabase testing, see CLAUDE.md) run next to the
  // default one without fighting over the .next lock. Unset in CI/Vercel.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
