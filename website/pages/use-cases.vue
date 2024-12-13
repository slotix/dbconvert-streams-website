<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <section class="bg-gradient-to-b from-primary-dark to-primary text-white flex items-center">
            <div class="container mx-auto px-4 py-16 space-y-16">
                <div class="max-w-3xl mx-auto text-center space-y-8">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.8s_ease-out_forwards]">
                        Transform Your
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                            Data Infrastructure
                        </span>
                    </h1>
                    <p class="text-xl mb-8 text-gray-100 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">
                        Power your business with real-time data solutions for any industry or use case
                    </p>
                </div>
            </div>
        </section>

        <!-- Popular Solutions -->
        <section class="py-24 bg-gradient-to-b from-primary to-primary-light">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Popular Solutions</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div v-for="(solution, index) in popularSolutions" :key="index"
                        class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <component :is="solution.icon" class="w-8 h-8 text-primary mb-4" />
                        <h3 class="text-xl font-semibold mb-3">{{ solution.title }}</h3>
                        <p class="text-gray-600 mb-4">{{ solution.description }}</p>
                        <ul class="space-y-2">
                            <li v-for="(point, pointIndex) in solution.points" :key="pointIndex"
                                class="flex items-start">
                                <CheckCircle class="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                <span class="text-gray-700">{{ point }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- Modern Architecture Solutions -->
        <section class="py-24 bg-gradient-to-b from-primary-light to-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Modern Architecture Solutions</h2>
                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div v-for="(solution, index) in architectureSolutions" :key="index"
                        class="bg-gradient-to-b from-primary-light/10 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <component :is="solution.icon" class="w-8 h-8 text-primary mb-4" />
                        <h3 class="text-xl font-semibold mb-3">{{ solution.title }}</h3>
                        <p class="text-gray-600 mb-4">{{ solution.description }}</p>
                        <ul class="space-y-2">
                            <li v-for="(point, pointIndex) in solution.points" :key="pointIndex"
                                class="flex items-start">
                                <CheckCircle class="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                <span class="text-gray-700">{{ point }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- Industry Solutions -->
        <section class="py-24 bg-gradient-to-b from-white to-primary-light">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Industry Solutions</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div v-for="(industry, index) in industrySolutions" :key="index"
                        class="bg-gradient-to-b from-primary-light/10 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <component :is="industry.icon" class="w-8 h-8 text-primary mb-4" />
                        <h3 class="text-xl font-semibold mb-3">{{ industry.title }}</h3>
                        <p class="text-gray-600 mb-4">{{ industry.description }}</p>
                        <ul class="space-y-2">
                            <li v-for="(point, pointIndex) in industry.points" :key="pointIndex"
                                class="flex items-start">
                                <CheckCircle class="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                <span class="text-gray-700">{{ point }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>




        <!-- CTA Section -->
        <section class="py-16 bg-primary-dark text-white">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4">Ready to Transform Your Data Infrastructure?</h2>
                <p class="text-xl mb-8">Start your journey to real-time data operations today</p>
                <div class="flex flex-wrap justify-center gap-4">
                    <NuxtLink to="/get-started"
                        class="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all duration-200 inline-flex items-center group">
                        Get Started Free
                        <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'Use Cases - DBConvert Streams',
    name: 'use-cases'
})

import {
    BarChart2,
    Cloud,
    Globe,
    Code2,
    ShoppingCart,
    Landmark,
    Heart,
    Factory,
    Zap,
    Search,
    Smartphone,
    CheckCircle,
    ArrowRight,
    Quote
} from 'lucide-vue-next'

const popularSolutions = [
    {
        icon: BarChart2,
        title: 'Real-Time Analytics',
        description: 'Turn Data into Instant Insights',
        points: [
            'Stream live data directly to analytics platforms',
            'Power real-time dashboards and reporting',
            'Make faster, data-driven decisions',
            'Zero impact on source database performance'
        ]
    },
    {
        icon: Cloud,
        title: 'Cloud Migration',
        description: 'Seamless Path to the Cloud',
        points: [
            'Zero-downtime migration to any cloud platform',
            'Maintain business operations during transition',
            'Automatic schema conversion',
            'Validate data consistency in real-time'
        ]
    },
    {
        icon: Globe,
        title: 'Multi-Region Operations',
        description: 'Connect Your Global Business',
        points: [
            'Keep databases synchronized across locations',
            'Enable distributed applications',
            'Ensure consistent customer experience',
            'Support disaster recovery'
        ]
    },
    {
        icon: Code2,
        title: 'Development & Testing',
        description: 'Accelerate Your Development',
        points: [
            'Create realistic test environments instantly',
            'Refresh staging data automatically',
            'Enable continuous integration testing',
            'Maintain data consistency across environments'
        ]
    }
]

const industrySolutions = [
    {
        icon: ShoppingCart,
        title: 'E-Commerce',
        description: 'Stay Ahead of Customer Demands',
        points: [
            'Keep inventory data synchronized',
            'Update pricing in real-time',
            'Maintain order status across platforms',
            'Enable seamless fulfillment'
        ]
    },
    {
        icon: Landmark,
        title: 'Financial Services',
        description: 'Secure, Compliant, Real-Time',
        points: [
            'Maintain transaction consistency',
            'Enable fraud detection systems',
            'Support regulatory compliance',
            'Create reliable audit trails'
        ]
    },
    {
        icon: Heart,
        title: 'Healthcare',
        description: 'Connect Critical Care Systems',
        points: [
            'Synchronize patient records safely',
            'Enable telemedicine platforms',
            'Maintain HIPAA compliance',
            'Coordinate care across facilities'
        ]
    },
    {
        icon: Factory,
        title: 'Manufacturing',
        description: 'Optimize Your Operations',
        points: [
            'Track production in real-time',
            'Coordinate supply chain systems',
            'Enable predictive maintenance',
            'Monitor equipment performance'
        ]
    }
]

const architectureSolutions = [
    {
        icon: Zap,
        title: 'Event-Driven Systems',
        description: 'Build Responsive Applications',
        points: [
            'Capture all database changes instantly',
            'Trigger automated workflows',
            'Enable real-time notifications',
            'Scale without complexity'
        ]
    },
    {
        icon: Search,
        title: 'Search & Cache',
        description: 'Maximize Performance',
        points: [
            'Update search indexes automatically',
            'Keep cache layers synchronized',
            'Maintain fast query performance',
            'Reduce database load'
        ]
    },
    {
        icon: Smartphone,
        title: 'Mobile & IoT',
        description: 'Connect Every Device',
        points: [
            'Push updates to mobile apps instantly',
            'Process sensor data in real-time',
            'Enable offline synchronization',
            'Scale to millions of devices'
        ]
    }
]

const successStories = [
    {
        quote: 'DBConvert Streams helped us maintain real-time inventory across 500+ stores, reducing oversells by 94% and improving customer satisfaction.',
        company: 'Global Retail Chain'
    },
    {
        quote: 'We seamlessly migrated 20TB of patient data to our new cloud platform with zero downtime and complete data integrity.',
        company: 'Leading Healthcare Provider'
    },
    {
        quote: 'Our real-time fraud detection system now processes transactions 200% faster thanks to DBConvert Streams\' CDC capabilities.',
        company: 'Financial Technology Startup'
    }
]
</script>