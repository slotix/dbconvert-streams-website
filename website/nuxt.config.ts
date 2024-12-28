import { defineNuxtConfig } from "nuxt/config";
import type { NuxtConfig } from '@nuxt/schema'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-lucide-icons',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],
  image: {
    format: ['webp', 'png'],
    provider: 'ipxStatic',
    dir: 'assets',
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  },
  css: ['~/assets/css/main.css'],
  components: {
    dirs: [
      '~/components',
      '~/components/layout',
      '~/components/home'
    ]
  },
  app: {
    head: {
      title: 'DBConvert Streams - Database Migration & Replication Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Powerful database migration and real-time replication platform'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest', type: 'application/manifest+json' }
      ],
      script: [
        {
          src: 'https://js.stripe.com/v3/',
          defer: true,
          crossorigin: "anonymous",
          async: true,
          id: 'stripe-js'
        },
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-0VERWKD2YW'
        },
        {
          children: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0VERWKD2YW');`
        }
      ]
    }
  },

  //@ts-ignore
  googleFonts: {
    families: {
      'Plus Jakarta Sans': [400, 500, 600, 700], // Headlines and hero text
      'Inter': [400, 500],          // Body text
      'DM Sans': [500, 700],        // UI elements
      'JetBrains Mono': [400, 700], // Primary code font
      'Fira Code': [400],           // Secondary code font
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    exposeConfig: false,
    viewer: false,
    cssPath: ["~/assets/css/main.css", { injectPosition: 0 }]
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
    public: {
      stripeKey: process.env.NUXT_PUBLIC_STRIPE_KEY,
      clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => [
        'stripe-pricing-table',
        'stripe-buy-button'
      ].includes(tag)
    }
  },
  // // @ts-expect-error: @nuxtjs/sitemap module options are not properly typed
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://streams.dbconvert.com',
    gzip: true,
    defaults: {
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    urls: [
      '/',
      '/get-started',
      '/features',
      '/pricing',
      '/solutions',
      '/contact',
      '/legal/terms',
      '/legal/privacy',
      '/legal/gdpr',
      '/legal/eula',
      '/legal/cookies',
      '/success',
    ],
    sitemapName: 'sitemap.xml',
  } as any
} satisfies NuxtConfig)