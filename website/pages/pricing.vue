<template>
    <div class=" bg-gray-50">
        <!-- Hero Section -->
        <section class="bg-gradient-to-b from-primary-dark to-primary text-white">
            <div class="container mx-auto px-4 py-16">
                <div class="max-w-3xl mx-auto text-center space-y-8">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.8s_ease-out_forwards]">
                        Simple, Transparent
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                            Pricing
                        </span>
                    </h1>
                    <p class="text-xl mb-8 text-gray-100 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">
                        Choose the plan that best fits your needs. All plans include full feature access.
                    </p>
                </div>
            </div>
        </section>

        <!-- Pricing Table Section -->
        <section class="py-16 bg-gradient-to-b from-primary-light to-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
                <PricingTable />
            </div>
        </section>

        <!-- Help Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <div
                    class="max-w-4xl mx-auto bg-gradient-to-r from-primary-light/20 to-primary-light/10 rounded-2xl p-8">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-4">Need Help?</h3>
                    <p class="text-gray-600">
                        If you have any questions about our pricing or need assistance choosing a plan,
                        please don't hesitate to <NuxtLink to="mailto:streams@dbconvert.com" class="text-primary hover:text-primary-dark">
                            contact our support
                            team</NuxtLink>.
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-primary text-white">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4 max-w-2xl mx-auto">
                    Ready to Get Started?
                </h2>
                <p class="text-xl mb-8">
                    Start your data migration and replication journey today
                </p>
                <NuxtLink to="/get-started"
                    class="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all duration-200 inline-flex items-center group">
                    Get Started
                    <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

useHead({
  title: 'Pricing - DBConvert Streams',
  meta: [
    {
      name: 'description',
      content: 'Flexible pricing plans for database migration and replication. Choose the right plan for your business needs, from startups to enterprise solutions.'
    },
    {
      property: 'og:title',
      content: 'DBConvert Streams Pricing - Migration & Replication Plans'
    },
    {
      property: 'og:description',
      content: 'Transparent pricing for database migration and real-time replication. Scale your data infrastructure with our flexible plans.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: 'DBConvert Streams Pricing Plans'
    },
    {
      name: 'twitter:description',
      content: 'Find the right plan for your database migration and replication needs. Flexible pricing for businesses of all sizes.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://streams.dbconvert.com/pricing'
    }
  ]
})

definePageMeta({
  title: 'Pricing - DBConvert Streams'
})
</script>