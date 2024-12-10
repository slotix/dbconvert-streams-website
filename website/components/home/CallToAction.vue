<template>
  <div class="py-16">
    <div class="container mx-auto px-4">
      <div class="bg-blue-600 text-white rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-8">
          Start migrating and synchronizing your databases today with our powerful platform
        </p>
        <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center">
          Get Started Now
          <ArrowRight class="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>