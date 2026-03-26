import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const ddevHost = process.env.DDEV_HOSTNAME

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
    ...(ddevHost ? {
      cors: {
        origin: `https://${ddevHost}`,
        credentials: true,
      },
      hmr: {
        host: ddevHost,
      },
      allowedHosts: [ddevHost],
    } : {}),
    host: '0.0.0.0',
    origin: 'http://localhost:3000',
    port: 3000,
    strictPort: true,
  },
}))
