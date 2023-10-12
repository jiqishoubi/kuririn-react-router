import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 打包生成 .d.ts 声明文件
    dts({
      include: [path.resolve(__dirname, 'src/kuririn-react-router/**/*')],
      outDir: path.resolve(__dirname, 'dist/types'),
      exclude: [path.resolve(__dirname, 'node_modules/**/*')],
    }),
  ],
  server: {
    port: 6002,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: './',
  define: {
    global: 'window', // 为了修复 react-codemirror2 'global is not define'
    // BASE_HOST: JSON.stringify(BASE_HOST),
  },
  // 打包库模式
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/kuririn-react-router/index.ts'),
      name: 'kuririn-react-router',
      fileName: 'index',
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime', //
        'react-dom',
        'mobx',
        'mobx-react',
      ], // 确保外部化处理那些你不想打包进库的依赖
      output: [
        {
          format: 'es',
          dir: path.resolve(__dirname, 'dist/es'),
        },
        {
          format: 'cjs',
          dir: path.resolve(__dirname, 'dist/lib'),
        },
      ],
    },
  },
})
