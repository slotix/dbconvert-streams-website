<template>
  <div class=" bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-dark to-primary text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-3xl mx-auto text-center space-y-8">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.8s_ease-out_forwards]">
            Contact
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
              Us
            </span>
          </h1>
          <p class="text-xl mb-8 text-gray-100 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">
            Get in touch with our team for any questions or support needs
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <div class="bg-white p-8 rounded-2xl shadow-xl">
      <h2 class="text-2xl font-bold mb-6">Send us a Message</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input v-model="name" type="text" id="name" name="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" id="email" name="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea v-model="message" id="message" name="message" rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"></textarea>
        </div>
        <button type="submit"
          class="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200">
          Send Message
        </button>
        <p v-if="statusMessage" class="mt-4 text-center">{{ statusMessage }}</p>
      </form>
    </div>
    <!-- Contact Information -->
    <section class="py-24 bg-gradient-to-b from-primary to-primary-light">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <!-- Contact Details -->
          <div class="bg-white p-8 rounded-2xl shadow-xl">
            <h2 class="text-2xl font-bold mb-6">Headquarters</h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <Building2 class="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p class="font-semibold">Slotix s.r.o.</p>
                  <p>Steinov dvor 2</p>
                  <p>Bratislava 811 07</p>
                  <p>Slovak Republic</p>
                </div>
              </div>
              <div class="flex items-center">
                <Mail class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                <a href="mailto:streams@dbconvert.com" class="text-primary hover:text-primary-dark">
                  streams@dbconvert.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Building2, Mail } from 'lucide-vue-next'
import { ref } from 'vue'

// Update meta information with more SEO-friendly content
useHead({
  title: 'Contact Us - DBConvert Streams',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with DBConvert Streams team for database migration and replication support. Contact us for questions about our enterprise data solutions.'
    },
    // Open Graph meta tags for better social sharing
    {
      property: 'og:title',
      content: 'Contact DBConvert Streams - Database Migration & Replication Support'
    },
    {
      property: 'og:description',
      content: 'Contact our team for support with database migration, real-time replication, and enterprise data solutions. We\'re here to help with your data integration needs.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    // Twitter Card meta tags
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: 'Contact DBConvert Streams Support'
    },
    {
      name: 'twitter:description',
      content: 'Get expert support for database migration and replication. Contact our team for enterprise data solutions.'
    }
  ],
  // Add canonical URL to prevent duplicate content issues
  link: [
    {
      rel: 'canonical',
      href: 'https://streams.dbconvert.com/contact'
    }
  ]
})

// Keep existing page meta
definePageMeta({
  title: 'Contact Us - DBConvert Streams',
  name: 'contact'
})

const name = ref('')
const email = ref('')
const message = ref('')
const statusMessage = ref('')
const toast = useToast()

const submitForm = async () => {
  try
  {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value
      })
    })
    const data = await response.json()
    statusMessage.value = data.message
    if (response.ok)
    {
      name.value = ''
      email.value = ''
      message.value = ''
    }
  } catch (error)
  {
    toast.error('Failed to send the message')
    console.error(error)
    statusMessage.value = 'Failed to send the message.'
  }
}
</script>