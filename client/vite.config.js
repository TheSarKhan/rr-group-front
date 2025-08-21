// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'
// import tailwindcss from '@tailwindcss/vite'
// import svgr from "vite-plugin-svgr";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),tailwindcss(),
//       svgr({
//         svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
//          include: "**/*.svg",
//         }),
//   ],
//   base: process.env.VITE_BASE_PATH || "/rrgroup/",
//   resolve: {
//     alias: {
//     "@": path.resolve(__dirname, "./src"),
//   },
// },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  base: process.env.VITE_BASE_PATH || "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://mescid.ilahiyyat.az',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/rrgroup/api'),
      },
      '/docs-proxy': {
        target: 'https://mescid.ilahiyyat.az',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/docs-proxy/, '/rrgroup/api-docs'),
      }
    }
  }
  
});
