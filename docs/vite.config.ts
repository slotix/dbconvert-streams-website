import { defineConfig } from "vite";


export default defineConfig({
  base: '/docs/',
  build: {
    outDir: '../website/public/docs',
    emptyOutDir: true
  }
});
