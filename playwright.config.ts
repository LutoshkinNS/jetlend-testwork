import { defineConfig } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./src",
  testMatch: "**/*.spec.ts",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL,
  },
  webServer: {
    command: "npm run dev",
    url: process.env.PLAYWRIGHT_BASE_URL,
    reuseExistingServer: true,
  },
});
