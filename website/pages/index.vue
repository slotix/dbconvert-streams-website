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

definePageMeta({
  name: 'index'
})
</script>