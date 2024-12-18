<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <section class="bg-gradient-to-b from-primary-dark to-primary text-white flex items-center">
            <div class="container mx-auto px-4 py-16 space-y-16">
                <div class="max-w-3xl mx-auto text-center space-y-8">
                    <h1
                        class="text-4xl md:text-6xl font-display font-bold mb-6 animate-[fadeIn_0.8s_ease-out_forwards]">
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

        <!-- Industry Solutions -->
        <section class="py-24 bg-gradient-to-b from-primary to-primary-light">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-display font-bold text-center mb-12">Industry Solutions</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div v-for="(industry, index) in industrySolutions" :key="index"
                        class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <component :is="industry.icon" class="w-8 h-8 text-primary mb-4" />
                        <h3 class="text-xl font-display font-semibold mb-3">{{ industry.title }}</h3>
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

        <!-- Common Use Cases -->
        <section class="py-24 bg-gradient-to-b from-primary-light to-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-display font-bold text-center mb-12">Common Use Cases</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div v-for="(solution, index) in commonUseCases" :key="index"
                        class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <component :is="solution.icon" class="w-8 h-8 text-primary mb-4" />
                        <h3 class="text-xl font-display font-semibold mb-3">{{ solution.title }}</h3>
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
        <!-- Technical Patterns -->
        <section class="py-24 bg-gradient-to-b from-white to-primary-light">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-display font-bold text-center mb-12">Technical Patterns</h2>

                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div v-for="(solution, index) in technicalPatterns" :key="index"
                        class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <component :is="solution.icon" class="w-8 h-8 text-primary mb-4" />
                        <h3 class="text-xl font-display font-semibold mb-3">{{ solution.title }}</h3>
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



        <!-- CTA Section -->
        <section class="py-16 bg-primary text-white">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-display font-bold mb-4">Ready to Transform Your Data Infrastructure?</h2>
                <p class="text-xl mb-8">Start your journey to real-time data operations today</p>
                <div class="flex flex-wrap justify-center gap-4">
                    <NuxtLink to="/get-started"
                        class="bg-secondary text-white font-ui px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all duration-200 inline-flex items-center group">
                        Get Started Free
                        <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
useHead({
    title: 'Use Cases - DBConvert Streams',
    meta: [
        {
            name: 'description',
            content: 'Explore real-world applications of DBConvert Streams: real-time analytics, disaster recovery, cloud migration, and more.'
        },
        {
            property: 'og:title',
            content: 'DBConvert Streams Use Cases - Database Solutions'
        },
        {
            property: 'og:description',
            content: 'Discover how businesses use DBConvert Streams for database migration, real-time replication, and data integration across different scenarios.'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: 'DBConvert Streams Use Cases'
        },
        {
            name: 'twitter:description',
            content: 'See how organizations leverage DBConvert Streams for database migration, replication, and real-time data integration.'
        }
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://streams.dbconvert.com/solutions'
        }
    ]
})

definePageMeta({
    title: 'Solutions - DBConvert Streams',
    name: 'solutions'
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

const commonUseCases = [
    {
        icon: BarChart2,
        title: 'Real-Time Analytics',
        description: 'Turn Data into Instant Insights',
        points: [
            'CDC-based data streaming to analytics platforms',
            'Parallel processing for high-volume data transfers',
            'Custom transformation during replication',
            'Optimized batch sizes for analytics workloads'
        ],
        docLink: '/streams/stream-configuration-guide#analytics-setup'
    },
    // Cloud Migration - make more technical
    {
        icon: Cloud,
        title: 'Cloud Migration',
        description: 'Seamless Path to the Cloud',
        points: [
            'Automated schema conversion between database types',
            'Parallel data transfer with configurable batch sizes',
            'Real-time validation with checksum comparison',
            'Incremental migration support with CDC mode'
        ],
        docLink: '/guide/cloud-migration'
    },
    // Multi-Region - add technical specifics
    {
        icon: Globe,
        title: 'Multi-Region Operations',
        description: 'Connect Your Global Business',
        points: [
            'Multi-master replication support',
            'Configurable conflict resolution strategies',
            'Low-latency change propagation',
            'Cross-region consistency monitoring'
        ],
        docLink: '/streams/multi-region-setup'
    },
    // Development & Testing - enhance technical detail
    {
        icon: Code2,
        title: 'Development & Testing',
        description: 'Accelerate Your Development',
        points: [
            'Automated test data subsetting and masking',
            'Scheduled environment refresh automation',
            'Custom data filtering for specific test cases',
            'Production data simulation with CDC replay'
        ],
        docLink: '/guide/development-setup'
    }
]

const industrySolutions = [
{
        icon: ShoppingCart,
        title: 'E-Commerce',
        description: 'Stay Ahead of Customer Demands',
        points: [
            'Real-time inventory synchronization using CDC mode',
            'Multi-region database replication for global operations',
            'Automated cache invalidation for product updates',
            'Cross-platform order status synchronization'
        ],
        docLink: '/solutions/ecommerce'
    },
    // Financial Services - add technical implementation details
    {
        icon: Landmark,
        title: 'Financial Services',
        description: 'Secure, Compliant, Real-Time',
        points: [
            'SSL/TLS encrypted data transfer with audit logging',
            'Real-time transaction replication with consistency checks',
            'Automated compliance data tracking and reporting',
            'Multi-region failover support for high availability'
        ],
        docLink: '/solutions/financial-services'
    },
    // Healthcare - enhance security aspects
    {
        icon: Heart,
        title: 'Healthcare',
        description: 'Connect Critical Care Systems',
        points: [
            'HIPAA-compliant data replication workflows',
            'Secure patient data synchronization with encryption',
            'Real-time EMR system integration',
            'Automated audit trail generation'
        ],
        docLink: '/solutions/healthcare'
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
        ],
        docLink: '/solutions/manufacturing'
    }
    // Keep E-commerce and Manufacturing as they are - good balance of technical/business focus
]

const technicalPatterns = [
    // Event-Driven Systems - add implementation specifics
    {
        icon: Zap,
        title: 'Event-Driven Systems',
        description: 'Build Responsive Applications',
        points: [
            'Change data capture with configurable filters',
            'Event stream processing with custom transformations',
            'Webhook integration for external systems',
            'Scalable message queue integration'
        ],
        docLink: '/patterns/event-driven'
    },
    // Search & Cache - enhance technical details
    {
        icon: Search,
        title: 'Search & Cache',
        description: 'Maximize Performance',
        points: [
            'Real-time Elasticsearch/Solr index updates',
            'Automated cache invalidation triggers',
            'Custom transformation for search optimization',
            'Configurable consistency levels'
        ],
        docLink: '/patterns/search-cache'
    },
    // Mobile & IoT - add specific technical capabilities
    {
        icon: Smartphone,
        title: 'Mobile & IoT',
        description: 'Connect Every Device',
        points: [
            'Bi-directional sync with conflict resolution',
            'Real-time data streaming with delta compression',
            'Batch processing for offline device sync',
            'Scalable message delivery with backpressure handling'
        ],
        docLink: '/patterns/mobile-iot'
    }
]
</script>