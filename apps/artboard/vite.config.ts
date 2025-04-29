/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  base: "/artboard/",

  cacheDir: "../../node_modules/.vite/artboard",

  build: {
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ['html2pdf.js'],
      output: {
        globals: {
          'html2pdf.js': 'html2pdf'
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
      protocol: 'ws', // Use 'wss' if Traefik uses HTTPS
      host: 'cv-vbbuilder-ltpiax-b07da2-13-48-133-111.traefik.me',
      port: 443, // Public-facing port
    },
  },

  plugins: [react(), nxViteTsPaths()],

  resolve: {
    alias: {
      "@/artboard/": `${searchForWorkspaceRoot(process.cwd())}/apps/artboard/src/`,
    },
  },
});
