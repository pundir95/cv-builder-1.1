/// <reference types='vitest' />

import path from "node:path";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/ui",

  server: {
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
    allowedHosts: [
      'cv-vbbuilder-ltpiax-b07da2-13-48-133-111.traefik.me'
    ]
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(import.meta.dirname, "tsconfig.lib.json"),
    }),
  ],

  build: {
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      name: "ui",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [/^react.*/, /^@radix-ui\/*/],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
