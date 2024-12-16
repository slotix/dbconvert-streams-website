<template>
  <div class="py-16 bg-gradient-to-b from-white to-primary-light">
    <div class="container mx-auto px-4">
      <div class="bg-primary text-white rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="mb-8 text-lg">Start migrating and synchronizing your databases today</p>
        <NuxtLink to="/get-started"
          class="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-dark inline-flex items-center">
          Get Started Now
          <ArrowRight class="ml-2 h-5 w-5" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>