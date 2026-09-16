import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 替换 __dirname
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  // 新增：解决Windows文件监听，热更新失效
  server: {
    watch: {
      usePolling: true,
      interval: 500
    }
  }
})
