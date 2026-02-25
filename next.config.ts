import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // penting supaya next/image tidak error saat static
  },
};

export default nextConfig;