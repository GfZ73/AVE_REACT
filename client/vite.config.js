import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
    // USUŃ CAŁY PROXY – nie będzie potrzebny na produkcji
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})