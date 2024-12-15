import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";
import type { PluginOption } from 'vite';

const options = {
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "Search docs",
};

export default defineConfig({
  plugins: [SearchPlugin(options) as PluginOption],
  base: '/docs/',
  build: {
    outDir: '../website/public/docs',
    emptyOutDir: true
  }
});
