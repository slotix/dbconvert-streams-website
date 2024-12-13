// components/home/FeaturesSection.vue
<template>
    <div class="py-24 bg-gradient-to-b from-primary-light to-white">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-16">Key Features</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div v-for="feature in features" :key="feature.title"
                    class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center border border-gray-100">
                    <div class="mb-8">
                        <img :src="feature.icon"
                            class="w-40 h-40 object-contain mx-auto hover:scale-105 transition-transform duration-300"
                            :alt="feature.title">
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-gray-800">{{ feature.title }}</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import securityIcon from '@/assets/images/components/home/security.png'
import performanceIcon from '@/assets/images/components/home/performance.png'
import databasesIcon from '@/assets/images/components/home/databases.png'
import monitoringIcon from '@/assets/images/components/home/monitoring.png'

const features = [
    {
        title: "High Performance",
        description: "Optimized for speed with intelligent data chunking and parallel processing",
        icon: performanceIcon
    },
    {
        title: "Multiple Databases",
        description: "Support for MySQL, PostgreSQL, MariaDB, and more",
        icon: databasesIcon
    },
    {
        title: "Performance Monitoring",
        description: "Monitor your data streams with comprehensive dashboards and real-time metrics",
        icon: monitoringIcon
    },
    {
        title: "Enterprise Security",
        description: "Bank-grade encryption and security features to keep your data safe",
        icon: securityIcon
    },
]
</script>
