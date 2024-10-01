import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist', // Thư mục chứa file build
    assetsDir: 'assets', // Thư mục chứa các tệp tài nguyên (hình ảnh, CSS, JS) trong dist
    sourcemap: false, // Có hoặc không tạo file sourcemap
  },
})
