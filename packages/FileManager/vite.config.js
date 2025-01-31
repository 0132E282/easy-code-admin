import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public/js', // Đặt thư mục output cho các file JS biên dịch
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
})
