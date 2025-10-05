import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "qkthgs56";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const token = import.meta.env.VITE_SANITY_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-09-29",
  token,
  // With a token, Sanity recommends disabling CDN to avoid stale data
  useCdn: !token,
});
