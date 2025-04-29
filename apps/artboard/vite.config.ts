/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  base: "",

  cacheDir: "../../node_modules/.vite/artboard",

  build: {
    sourcemap: true,
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      external: ['html2pdf.js'],
      output: {
        globals: {
          'html2pdf.js': 'html2pdf'
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },

  server: {
    host: '0.0.0.0',
    port: 6173,
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
    allowedHosts: [
      'cv-vbbuilder-ltpiax-b07da2-13-48-133-111.traefik.me'
    ],
    hmr: {
      protocol: 'ws',
      host: 'cv-vbbuilder-ltpiax-b07da2-13-48-133-111.traefik.me',
      port: 443,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  plugins: [react(), nxViteTsPaths()],

  resolve: {
    alias: {
      "@/artboard/": `${searchForWorkspaceRoot(process.cwd())}/apps/artboard/src/`,
    },
  },
});
