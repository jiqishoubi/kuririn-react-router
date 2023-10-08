import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 这里设置请求域名
const BASE_HOST = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://tuikeapit.bld365.com'
  }
  return 'https://tuikeapi.bld365.com'
})()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: './',
  define: {
    global: 'window', // 为了修复 react-codemirror2 'global is not define'
    BASE_HOST: JSON.stringify(BASE_HOST),
  },
})
