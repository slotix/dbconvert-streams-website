// components/layout/TheFooter.vue
<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <div v-for="(section, index) in footerSections" :key="index">
          <h3 class="font-semibold text-white mb-4">{{ section.title }}</h3>
          <ul class="space-y-2">
            <li v-for="item in section.items" :key="item.text">
              <a :href="item.link" class="hover:text-white">{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-12 pt-8 text-center">
        <p>© {{ new Date().getFullYear() }} DBConvert Streams. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerSections = [
  {
    title: 'Product',
    items: [
      { text: 'Features', link: '/features' },
      { text: 'Documentation', link: '/docs' },
      { text: 'Pricing', link: '/pricing' },
      { text: 'Security', link: '/security' }
    ]
  },
  {
    title: 'Resources',
    items: [
      { text: 'Blog', link: '/blog' },
      { text: 'Case Studies', link: '/case-studies' },
      { text: 'Webinars', link: '/webinars' },
      { text: 'Support', link: '/support' }
    ]
  },
  {
    title: 'Company',
    items: [
      { text: 'About', link: '/about' },
      { text: 'Careers', link: '/careers' },
      { text: 'Contact', link: '/contact' },
      { text: 'Partners', link: '/partners' }
    ]
  },
  {
    title: 'Legal',
    items: [
      { text: 'Privacy Policy', link: '/privacy' },
      { text: 'Terms of Service', link: '/terms' },
      { text: 'Cookie Policy', link: '/cookies' },
      { text: 'GDPR', link: '/gdpr' }
    ]
  }
]
</script>