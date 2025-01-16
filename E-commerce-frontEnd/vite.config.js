import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external access to the Vite dev server
    port: 3000, // Port for your React app
    proxy: {
      '/api': { // Proxy requests starting with /api to the backend
        target: 'http://192.168.1.109:8080', // Replace with your Spring Boot backend IP and port
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix if needed
      },
    },
  },
});
