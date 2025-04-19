// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace this with the hostname of your ngrok tunnel (without https://)
const allowedNgrokHost = 'fcb1-47-149-6-197.ngrok-free.app'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173,
    strictPort: true,
    allowedHosts: [allowedNgrokHost]
  },
})
