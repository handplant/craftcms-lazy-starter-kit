import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const host = process.env.DDEV_HOSTNAME

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',

  build: {
    sourcemap: false,
    emptyOutDir: true,
    manifest: true,
    outDir: 'web/dist/',

    rollupOptions: {
      input: {
        app: 'src/js/app.js',
        map: 'src/js/map.js',
      },
    },
  },

  plugins: [
    tailwindcss(),
  ],

  publicDir: './src/public',

  server: {
    cors: {
      origin: `https://${host}`,
      credentials: true,
    },
    hmr: {
      host: host,
    },
    allowedHosts: [host],
    fs: {
      strict: false,
    },
    host: '0.0.0.0',
    origin: 'http://localhost:3000',
    port: 3000,
    strictPort: true,
  },
}))
