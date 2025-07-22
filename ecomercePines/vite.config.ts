import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    host: true, // permite exponer en red pública
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      protocol: 'ws',
      host: 'f6c1901cdfb9.ngrok-free.app', // tu subdominio ngrok
    },
    allowedHosts: ['all'], // permite cualquier host externo
  },
  plugins: [react(), tailwindcss()],
});
