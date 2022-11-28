// import { SearchPlugin } from "vitepress-plugin-search";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import { defineConfig } from "vitepress";
// import Components from "unplugin-vue-components/vite"
// import { ArcoResolver } from "unplugin-vue-components/resolvers"

const links = [];

export default defineConfig({
  lang: "en-US",
  title: "DBConvert Streams Beta",
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
    siteTitle: "DBConvert Streams Beta",
    logo: "/images/dbconvert-stream-logo.svg",
    nav: [
      { text: "Download", link: "dbs-releases" },
      { text: "Blog", link: "https://dbconvert.com/blog/" },
      //   { text: "Usage", link: "/usage" },
      //   {
      //     text: "Dropdown Menu",
      //     items: [
      //       { text: "Item A", link: "/item-1" },
      //       { text: "Item B", link: "/item-2" },
      //       { text: "Item C", link: "/item-3" },
      //     ],
      //   },
    ],
    sidebar: [
      {
        text: "Guide",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          {
            text: "How it works?",
            link: "/guide/how-it-works",
          },
          { text: "Run DBS Docker containers", link: "/guide/dbs-docker" },
          { text: "Install & Run DBS binaries", link: "/guide/install" },
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
        items: [
          { text: "Glossary", link: "/glossary" },
          { text: "Releases", link: "/dbs-releases" },
          { text: "EULA", link: "/eula" },
          { text: "Contact us", link: "/contact-us" },
        ],
      },
    ],
    socialLinks: [
      // {
      //   icon: "github",
      //   link: "https://github.com/slotix/dbconvert-stream-docs",
      // },
      { icon: "facebook", link: "https://facebook.com/DBConvert" },
      { icon: "twitter", link: "https://twitter.com/dbconvert" },
    ],
    editLink: {
      pattern:
        "https://github.com/slotix/dbconvert-stream-docs/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "DBConvert Streams - event driven replication for databases",
      copyright: "Copyright © 2022 Slotix s.r.o.",
    },
    plugins: [
      // SearchPlugin({
      // encode: false,
      // tokenize: 'full'
      // }),
      // Components({
      //   dirs: ['.vitepress/theme/Components'],
      //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      //   resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })]
      // })
    ],
    // ssr: { noExternal: ['@arco-design/web-vue'] }
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
