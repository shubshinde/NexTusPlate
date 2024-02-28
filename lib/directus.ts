import { createDirectus, rest, authentication } from "@directus/sdk";

// Declare the type for process.env to include NEXT_PUBLIC_BACKEND_URL
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_URL: string;
      // Add other environment variables here if needed
    }
  }
}

const directus = createDirectus(process.env.NEXT_PUBLIC_BACKEND_URL)
  .with(authentication("cookie", { credentials: "include", autoRefresh: true }))
  .with(rest());

export default directus;
