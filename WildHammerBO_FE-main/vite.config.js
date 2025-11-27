import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('http://localhost:9100'),
  },
  preview: {
    port: 9000,
    host: true,
    allowedHosts: [
      'admin.wildhammer.online',
      'localhost',
      '127.0.0.1'
    ]
  }
})
