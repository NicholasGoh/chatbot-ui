import { defineConfig } from 'vite';
import path from 'path';
import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  plugins: [
    VitePluginRadar({
      // Google Analytics tag injection
      // TODO: https://github.com/stafyniaksacha/vite-plugin-radar/blob/v0.10.0/README.md?plain=1#L90
      // might need custom events for more analysis
      analytics: {
        id: 'G-TECW05ZKH4',
      },
    }),
  ],
});
