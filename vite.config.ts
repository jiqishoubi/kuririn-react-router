import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const _external = Object.keys({
  ...(pkg.devDependencies || {}),
  ...(pkg.peerDependencies || {}),
}).reduce((calc, item) => {
  return Array.from(new Set([...calc, item]))
}, [])

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
  /**
   * 打包库模式
   * Packaging Library Mode
   */
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/kuririn-react-router/index.ts'),
      name: 'kuririn-react-router',
      fileName: 'index',
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        ..._external, //
        'react/jsx-runtime',
        'history',
      ],
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
