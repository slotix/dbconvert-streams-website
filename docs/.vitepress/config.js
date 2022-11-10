import { SearchPlugin } from "vitepress-plugin-search";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import { defineConfig } from "vitepress";

const links = [];

export default defineConfig({
  lang: "en-US",
  title: "DBConvert Stream",
  description:
    "data integration and streaming distributed platform to replicate data between databases",
  cleanUrls: "with-subfolders",
  head: [
    [
      "script", //id: 'G-0VERWKD2YW'
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-0VERWKD2YW",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-0VERWKD2YW');",
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/assets/favicons/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/favicons/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "/assets/favicons/site.webmanifest" }],
    // ['link', { rel: "mask-icon", href: "/assets/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    ["link", { rel: "shortcut icon", href: "/assets/favicons/favicon.ico" }],
    ["meta", { name: "msapplication-TileColor", content: "#3a0839" }],
    // ['meta', { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
    ["meta", { name: "theme-color", content: "#ffffff" }],
  ],
  lastUpdated: true,
  lastUpdatedText: "Updated Date",
  themeConfig: {
    siteTitle: "DBConvert Stream",
    logo: "/images/dbconvert-stream-logo.svg",
    nav: [
      { text: "Home", link: "/" },
      { text: "Usage", link: "/usage" },
      {
        text: "Dropdown Menu",
        items: [
          { text: "Item A", link: "/item-1" },
          { text: "Item B", link: "/item-2" },
          { text: "Item C", link: "/item-3" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Guide",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          {
            text: "What is DBConvert Stream?",
            link: "/guide/what-is-dbconvert-stream",
          },
          { text: "Install", link: "/guide/install" },
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "API Reference", link: "/guide/api" },
          { text: "Statuses", link: "/guide/status" },
        ],
      },
      {
        text: "Sources",
        collapsible: true,
        items: [
          {
            text: "What is Change Data Capture?",
            link: "/sources/what-is-cdc",
          },
          { text: "Source configuration.", link: "/sources/source-config" },
          { text: "MySQL/ MariaDB CDC Reader", link: "/sources/mysql/" },
          { text: "PostgreSQL CDC Reader", link: "/sources/postgresql/" },
        ],
      },
      {
        text: "Targets",
        collapsible: true,
        items: [
          {
            text: "Conversion of tables structures.",
            link: "/targets/translate-ddl",
          },
          { text: "Target configuration.", link: "/targets/target-config" },
          { text: "MySQL/ MariaDB Writer", link: "/targets/mysql/" },
          { text: "PostgreSQL Writer", link: "/targets/postgresql/" },
        ],
      },
      {
        text: "",
        collapsible: false,
        items: [{ text: "Glossary", link: "/glossary" }],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/slotix/dbconvert-stream-docs",
      },
      { icon: "twitter", link: "..." },
    ],
    editLink: {
      pattern:
        "https://github.com/slotix/dbconvert-stream-docs/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "DBConvert Stream - event driven replication for databases",
      copyright: "Copyright © 2022 Slotix s.r.o.",
    },
    plugins: [SearchPlugin()],
    // algolia: {}
  },
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: "https://stream.dbconvert.com",
    });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on("finish", r));
  },
});
