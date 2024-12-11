<template>
  <footer class="bg-primary ">
    <div class="container mx-auto px-4 py-16">
      <div class="grid md:grid-cols-4 gap-12">
        <div v-for="(section, index) in footerSections" :key="index">
          <h3 class="font-bold text-lg text-white mb-6">{{ section.title }}</h3>
          <ul class="space-y-3">
            <li v-for="item in section.items" :key="item.text">
              <a :href="item.link" 
                 class="text-gray-300 hover:text-white transition-colors duration-200">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 mt-16 pt-8 text-center text-white">
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