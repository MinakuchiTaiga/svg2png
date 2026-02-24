import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? "/svg2png/" : "/",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
