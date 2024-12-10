// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts','nuxt-lucide-icons'],
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
      ]
    }
  },
  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700],  // Modern, clean sans-serif
      'JetBrains Mono': [400, 700],   // Monospace for technical content
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: false,
    cssPath: '~/assets/css/main.css'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
})