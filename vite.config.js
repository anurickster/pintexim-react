import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import driveProxyPlugin from './src/dev/driveProxyPlugin.js'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), driveProxyPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/gdrive': {
        target: 'https://drive.google.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gdrive/, ''),
      },
    },
  },
})
