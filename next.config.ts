import type { NextConfig } from "next";
import API from "@/config";

const nextConfig: NextConfig = {
  env:
      {
          API:API,
      }
  
};

export default nextConfig;
