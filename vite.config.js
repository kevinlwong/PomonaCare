// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace this with the hostname of your ngrok tunnel (without https://)
// const allowedNgrokHost = "872b-47-149-6-197.ngrok-free.app";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from network
    port: 5173,
    strictPort: true,
    allowedHosts: ['.ngrok-free.app'],
  },
});
