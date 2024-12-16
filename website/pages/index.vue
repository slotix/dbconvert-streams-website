<template>
  <main>
    <HeroSection />
    <CapabilitiesSection />
    <FeaturesSection />
    <DatabasesSection />
    <HowItWorks />
    <CallToAction />
  </main>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import CapabilitiesSection from '~/components/home/CapabilitiesSection.vue'
import FeaturesSection from '~/components/home/FeaturesSection.vue'
import DatabasesSection from '~/components/home/DatabasesSection.vue'
import HowItWorks from '~/components/home/HowItWorks.vue'
import CallToAction from '~/components/home/CallToAction.vue'

useHead({
  title: 'DBConvert Streams - Database Migration & Replication Platform',
  meta: [
    {
      name: 'description',
      content: 'Enterprise-grade platform for database migration and real-time replication. Support for MySQL, PostgreSQL, and cloud databases with minimal latency.'
    },
    {
      property: 'og:title',
      content: 'DBConvert Streams - Modern Database Migration & Replication'
    },
    {
      property: 'og:description',
      content: 'Transform your data infrastructure with real-time CDC replication and efficient database migration. Enterprise-ready solution for modern data needs.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'DBConvert Streams Platform'
    },
    {
      name: 'twitter:description',
      content: 'Modern solution for database migration and real-time replication. Built for enterprise scalability and reliability.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://streams.dbconvert.com'
    }
  ]
})

definePageMeta({
  name: 'index'
})
</script>