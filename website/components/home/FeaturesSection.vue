// components/home/FeaturesSection.vue
<template>
    <div class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div v-for="feature in features" :key="feature.title" class="text-center">
                    <component :is="feature.icon" class="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
                    <p class="text-gray-600">{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Shield, Zap, Database, LineChart } from 'lucide-vue-next'

const features = [
    {
        title: "Enterprise Security",
        description: "Bank-grade encryption and security features to keep your data safe",
        icon: Shield
    },
    {
        title: "High Performance",
        description: "Optimized for speed with intelligent data chunking and parallel processing",
        icon: Zap
    },
    {
        title: "Multiple Databases",
        description: "Support for MySQL, PostgreSQL, MariaDB, and more",
        icon: Database
    },
    {
        title: "Performance Monitoring",
        description: "Monitor your data streams with comprehensive dashboards and real-time metrics",
        icon: LineChart
    }
]
</script>