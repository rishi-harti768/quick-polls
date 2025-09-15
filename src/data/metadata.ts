import type { ResponseMetadata } from "@/types/response.js";

export const metadata: ResponseMetadata = {
  service: "quick-polls-api",
  version: "1.0.0",
  timestamp: new Date().toISOString(),
};
