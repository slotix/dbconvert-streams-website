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
  title: "DBConvert Streams preview",
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
    siteTitle: "DBConvert Streams preview",
    logo: "/images/dbconvert-stream-logo.svg",
    nav: [
      { text: "Release Notes", link: "releases-2024" },
      { text: "Examples", link: "https://github.com/slotix/dbconvert-streams-public" },
      { text: "Blog", link: "https://dbconvert.com/blog/" },
    ],
    sidebar: [
      {
        text: "Guide",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          { text: "Target Audience", link: "/guide/target-audience" },
          { text: "Use Cases", link: "/guide/use-cases" },
          {
            text: "How it works?",
            link: "/guide/how-it-works",
          },
          { text: "Run DBS Docker containers", link: "/guide/dbs-docker" },
          { text: "Deploy DBS to Amazon EC2", link: "/guide/deploy-ec2" },
          { text: "Install & Run DBS binaries", link: "/guide/install" },
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "API Reference", link: "/guide/api" },
          { text: "Life cycle and statuses", link: "/guide/status" },
          { text: "Logging flags overview", link: "/guide/logging" },
        ],
      },
      {
        text: "Sources",
        collapsible: true,
        items: [
          {
            text: "Change Data Capture mode",
            link: "/sources/what-is-cdc",
          },
          {
            text: "Conversion mode",
            link: "/sources/conversion-mode",
          },
          { text: "Source configuration.", link: "/sources/source-config" },
          { text: "Custom SQL Queries", link: "/sources/custom-query-parameter" },
          { text: "MySQL/ MariaDB Reader", link: "/sources/mysql/mysql-server" },
          { text: "Amazon RDS MySQL/ Aurora", link: "/sources/mysql/amazon-rds" },
          { text: "MySQL Reader properties", link: "/sources/mysql/reader-properties" },
          { text: "PostgreSQL Reader", link: "/sources/postgresql/postgresql-server" },
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
          { text: "Releases", link: "/releases-2024" },
          { text: "Release History (2022-2023)", link: "/dbs-releases" },
          { text: "FAQ", link: "/faq" },
          { text: "EULA", link: "/eula" },
          { text: "Privacy Policy", link: "/privacy" },
          { text: "Contact us", link: "/contact-us" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/slotix/dbconvert-streams-public"},
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
      copyright: "Copyright © 2024 Slotix s.r.o.",
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
