import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  // 连接后端服务时使用 server.proxy 设置代理
  // 当请求路径以 api 开头，说明调用的是真实后端服务
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3001',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})