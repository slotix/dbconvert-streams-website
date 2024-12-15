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
  title: "DBConvert Streams",
  description:
    "data integration and streaming distributed platform to replicate data between databases",
  cleanUrls: true,
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
        href: "/favicons/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "/favicons/site.webmanifest" }],
    ["link", { rel: "shortcut icon", href: "/favicons/favicon.ico" }],
    ["meta", { name: "msapplication-TileColor", content: "#0F7C94" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],
  ],
  lastUpdated: true,
  lastUpdatedText: "Updated Date",
  themeConfig: {
    siteTitle: "DBConvert Streams",
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
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Dashboard and UI Guide", link: "/guide/dashboard-ui-guide" },
          { text: "Run DBS Docker containers", link: "/guide/dbs-docker" },
          { text: "Deploy DBS to Amazon EC2", link: "/guide/deploy-ec2" },
          { text: "Install & Run DBS binaries", link: "/guide/install" },
          { text: "API Reference", link: "/guide/api" },
          { text: "Logging flags overview", link: "/guide/logging" },
        ],
      },
      {
        text: "Connections",
        collapsible: true,
        items: [
          { text: "Connection Management", link: "/connections/connection-management" },
          { text: "MySQL CDC Reader Configuration", link: "/connections/mysql-cdc-source-configuration" },
          { text: "PostgreSQL CDC Reader Configuration", link: "/connections/postgres-cdc-source-configuration" },
          { text: "MySQL Conversion Mode Configuration", link: "/connections/mysql-conversion-configuration" },
          { text: "PostgreSQL Conversion Mode Configuration", link: "/connections/postgres-conversion-configuration" },
          { text: "Amazon RDS MySQL", link: "/connections/amazon-rds" },
          { text: "AWS Aurora MySQL", link: "/connections/aws-aurora-mysql" },
          { text: "AWS Aurora PostgreSQL", link: "/connections/aws-aurora-postgres" },
          { text: "Azure Database Connection Guide", link: "/connections/azure-database-configuration" },
          { text: "Google Cloud SQL Connection Guide", link: "/connections/google-cloud-sql" },
          { text: "DigitalOcean CDC Setup Guide", link: "/connections/do-database-cdc" },
        ],
      },
      {
        text: "Streams",
        collapsible: true,
        items: [
          { text: "Understanding Streams", link: "/streams/understanding-streams" },
          { text: "Types of Streams: CDC vs Conversion", link: "/streams/type-of-streams-cdc-conversion" },
          { text: "Stream States and Lifecycle", link: "/streams/stream-states-lifecycle" },
          { text: "Stream Configuration Guide", link: "/streams/stream-configuration-guide" },
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
          { text: "MySQL/ MariaDB Reader", link: "/sources/mysql/mysql-server" },
          { text: "MySQL Reader properties", link: "/sources/mysql/reader-properties" },
          { text: "PostgreSQL Reader", link: "/sources/postgresql/postgresql-server" },
          { text: "Custom SQL Queries", link: "/sources/custom-query-parameter" },
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
        text: "Network & Security",
        collapsible: true,
        items: [
          { text: "Enabling External Access to AWS Aurora", link: "/network-security/aurora-external-access" },
          { text: "Authentication Guide", link: "/network-security/authentication" },
          { text: "SSL Configuration and Security Best Practices Guide", link: "/network-security/ssl-configuration" },
          { text: "Secure Credential Management with HashiCorp Vault", link: "/network-security/credential-management" },
        ],
      },
      {
        text: "",
        collapsible: false,
        items: [
          { text: "Pricing Plans", link: "/pricing" },
          { text: "Glossary", link: "/glossary" },
          { text: "Releases", link: "/releases-2024" },
          { text: "Release History (2022-2023)", link: "/dbs-releases" },
          { text: "FAQ", link: "/faq" },
          { text: "Contact us", link: "/contact-us" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/slotix/dbconvert-streams-public" },
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
  base: '/docs/',
  outDir: '../website/public/docs',
});
