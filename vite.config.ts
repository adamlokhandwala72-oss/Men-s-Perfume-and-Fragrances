import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Plugin to serve clean URLs in Vite dev server (e.g. /best-perfumes-for-men-under-3000 -> /best-perfumes-for-men-under-3000.html)
function cleanUrlsPlugin(): Plugin {
  return {
    name: 'clean-urls-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && !req.url.includes('.') && req.url !== '/') {
          const [cleanPath, query] = req.url.split('?');
          req.url = `${cleanPath}.html${query ? `?${query}` : ''}`;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [cleanUrlsPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          under3000: path.resolve(__dirname, 'best-perfumes-for-men-under-3000.html'),
          lastLonger: path.resolve(__dirname, 'how-to-make-perfume-last-longer.html'),
          edpVsEdt: path.resolve(__dirname, 'difference-between-edp-and-edt.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
