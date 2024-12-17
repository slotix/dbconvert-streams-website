<template>
  <div>
    <!-- Header Section -->
    <section class="relative bg-gradient-to-b from-primary-dark to-primary pt-16 sm:pt-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-8">
            <div class="w-20 h-20 mx-auto relative">
              <div class="w-20 h-20 rounded-full border-4 border-green-500 relative">
                <LucideCheck class="w-12 h-12 text-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
          <h1 class="text-4xl font-display font-bold tracking-tight text-green-300 sm:text-5xl">
            Subscription Successful
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
            Welcome to DBConvert Streams! We're excited to have you onboard.
          </p>
        </div>
      </div>
    </section>

    <!-- Success Content -->
    <main class="relative bg-gradient-to-b from-primary to-primary-light">
      <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <div class="text-center">
              <h2 class="text-2xl font-display font-semibold leading-7 text-gray-900">
                Your subscription has been confirmed!
              </h2>
              
              <p class="mt-4 text-lg leading-8 text-gray-600">
                You'll receive a confirmation email shortly with all the details of your subscription.
              </p>

              <div class="mt-10 flex flex-col items-center gap-6">
                <NuxtLink 
                  to="/get-started"
                  class="rounded-md font-ui bg-secondary-dark px-8 py-3.5 text-center text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Get Started with DBConvert Streams
                  <LucideArrowRight class="ml-2 -mr-1 h-5 w-5 inline-block" />
                </NuxtLink>
                
                <div class="flex items-center gap-x-8">
                  <NuxtLink 
                    to="/contact"
                    class="group inline-flex font-ui items-center text-base font-semibold text-gray-900 hover:text-primary-600"
                  >
                    <LucideHeadphones class="mr-2 h-5 w-5 text-gray-400 group-hover:text-primary-600" />
                    Contact Support
                  </NuxtLink>
                  
                  <NuxtLink 
                    to="/"
                    class="group inline-flex font-ui items-center text-base font-semibold text-gray-900 hover:text-primary-600"
                  >
                    <LucideHome class="mr-2 h-5 w-5 text-gray-400 group-hover:text-primary-600" />
                    Return to Homepage
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  title: 'Subscription Successful - DBConvert Streams',
  description: 'Thank you for subscribing to DBConvert Streams'
})

useHead({
  title: 'Subscription Successful - DBConvert Streams',
  meta: [
    {
      name: 'description',
      content: 'Thank you for subscribing to DBConvert Streams. Get started with your database migration and replication journey.'
    }
  ]
})
</script>

<style>
@keyframes bounce-x {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

@keyframes scale-in {
  from { transform: translate(-50%, -50%) scale(0); }
  to { transform: translate(-50%, -50%) scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 