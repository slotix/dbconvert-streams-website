<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <section class="bg-gradient-to-b from-primary-dark to-primary text-white flex items-center">
            <div class="container mx-auto px-4 py-16 space-y-16">
                <div class="max-w-3xl mx-auto text-center space-y-8">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.8s_ease-out_forwards]">
                        Start Your Data Journey
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                            Made Simple
                        </span>
                    </h1>
                    <p class="text-xl mb-8 text-gray-100 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">
                        Begin in Minutes, Not Days. Transform your database operations with DBConvert Streams.
                    </p>
                </div>
            </div>
        </section>

        <!-- Three Steps Section -->
        <section class="py-24 bg-gradient-to-b from-primary to-primary-light">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12 text-white">
                    Three Simple Steps to Success
                </h2>
                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div v-for="(step, index) in steps" :key="index"
                        class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                        <div class="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                            {{ index + 1 }}
                        </div>
                        <h3 class="text-xl font-semibold mb-4">{{ step.title }}</h3>
                        <ul class="space-y-3">
                            <li v-for="(item, itemIndex) in step.items" :key="itemIndex" 
                                class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                                <span class="text-gray-600">{{ item }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Screenshot Showcase -->
        <section class="py-24 bg-white bg-gradient-to-b from-primary-light white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">
                    See It In Action
                </h2>

                <div class="relative browser-frame bg-white rounded-xl shadow-2xl overflow-hidden">
                    <!-- Browser Frame Header -->
                    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
                        <div class="flex space-x-2">
                            <div class="w-3 h-3 rounded-full bg-red-400"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div class="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div class="mx-auto text-gray-500 text-sm font-medium">DBConvert Streams Dashboard</div>
                    </div>

                    <!-- Carousel Container -->
                    <div class="relative group">
                        <div class="overflow-hidden" style="aspect-ratio: 16/9;">
                            <div class="flex transition-transform duration-500 ease-out"
                                :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
                                <div v-for="(screenshot, index) in screenshots" :key="index"
                                    class="w-full flex-shrink-0 relative">
                                    <img :src="screenshot.image" :alt="screenshot.title"
                                        class="w-full h-full object-cover">
                                    <!-- Caption -->
                                    <div
                                        class="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm">
                                        <h3 class="text-lg font-semibold">{{ screenshot.title }}</h3>
                                        <p class="text-sm text-gray-200">{{ screenshot.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Navigation Buttons -->
                        <button @click="prevSlide"
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronLeft class="h-6 w-6 text-gray-800" />
                        </button>
                        <button @click="nextSlide"
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronRight class="h-6 w-6 text-gray-800" />
                        </button>

                        <!-- Slide Indicators -->
                        <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            <button v-for="(_, index) in screenshots" :key="index" @click="setSlide(index)"
                                class="w-2 h-2 rounded-full transition-all duration-200"
                                :class="[index === activeSlide ? 'bg-white w-4' : 'bg-white/50']">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Setup Options -->
        <section class="py-24 bg-gradient-to-b from-white to-primary-light">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">
                    Choose Your Setup Path
                </h2>
                <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <!-- Business Users -->
                    <div class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                        <div class="flex items-center gap-3 mb-8">
                            <MousePointerClick class="h-8 w-8 text-primary" />
                            <h3 class="text-2xl font-bold">Intuitive Web Interface</h3>
                        </div>
                        <p class="text-gray-600 mb-8">
                            Perfect for business users and quick setups
                        </p>
                        <ul class="space-y-4 mb-8">
                            <li v-for="(feature, index) in webInterface" :key="index"
                                class="flex items-start">
                                <CheckCircle class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span class="text-gray-700">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Developers -->
                    <div class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                        <div class="flex items-center gap-3 mb-8">
                            <Code2 class="h-8 w-8 text-primary" />
                            <h3 class="text-2xl font-bold">API Integration</h3>
                        </div>
                        <p class="text-gray-600 mb-8">
                            For developers and advanced automation
                        </p>
                        <ul class="space-y-4 mb-8">
                            <li v-for="(feature, index) in apiFeatures" :key="index"
                                class="flex items-start">
                                <component :is="feature.icon" class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <span class="text-gray-900 font-medium">{{ feature.title }}</span>
                                    <p class="text-gray-600">{{ feature.description }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Plans Section -->
        <section class="py-24 bg-white bg-gradient-to-b from-primary-light to-primary">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-6">Choose Your Plan</h2>
                    <p class="text-xl text-gray-600">Begin your journey with DBConvert Streams</p>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-8">
                    <div class="grid md:grid-cols-2 gap-12">
                        <!-- Features List -->
                        <div class="space-y-6">
                            <ul class="space-y-4">
                                <li class="flex items-start">
                                    <CheckCircle class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <span class="text-gray-900 font-medium">Flexible Plans</span>
                                        <p class="text-gray-600">Multiple plans based on your data transfer needs</p>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <CheckCircle class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <span class="text-gray-900 font-medium">Full Feature Access</span>
                                        <p class="text-gray-600">All plans include complete platform functionality</p>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <CheckCircle class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <span class="text-gray-900 font-medium">Flexible Billing</span>
                                        <p class="text-gray-600">Choose monthly or yearly billing options</p>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <CheckCircle class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <span class="text-gray-900 font-medium">Priority Support</span>
                                        <p class="text-gray-600">Premium support for paying customers</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-col justify-center space-y-6">
                            <NuxtLink to="/pricing"
                                class="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-center text-lg">
                                View Pricing Plans
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-primary-dark text-white">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4 max-w-2xl mx-auto">
                    Ready to Transform Your Data Infrastructure?
                </h2>
                <p class="text-xl mb-8">
                    Start your free trial today
                </p>
                <div class="flex flex-col sm:flex-row gap-6 justify-center">
                    <NuxtLink to="/signup"
                        class="bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg">
                        Start Free Trial
                    </NuxtLink>
                    <NuxtLink to="/contact"
                        class="border border-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg">
                        Contact Sales
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import {
    CheckCircle,
    Code2,
    ArrowRight,
    MousePointerClick,
    Workflow,
    Settings,
    Network,
    ChevronLeft,
    ChevronRight
} from 'lucide-vue-next'

// Import screenshots
import startDashboard from '~/assets/images/screenshots/screenshot-start.webp'
import connectionDashboard from '~/assets/images/screenshots/screenshot-connections.webp'
import streamDashboard from '~/assets/images/screenshots/screenshot-streams.webp'
import monitoringDashboard from '~/assets/images/screenshots/screenshot-monitoring.webp'

const activeSlide = ref(0)
const screenshots = ref([
    {
        title: 'Quick Start Dashboard',
        description: 'Get started with our intuitive setup wizard',
        image: startDashboard
    },
    {
        title: 'Database Connections',
        description: 'Easily connect to your databases with our secure connection manager',
        image: connectionDashboard
    },
    {
        title: 'Stream Configuration',
        description: 'Configure your data streams with our visual interface',
        image: streamDashboard
    },
    {
        title: 'Real-time Monitoring',
        description: 'Monitor your data transfers with detailed analytics',
        image: monitoringDashboard
    }
])

const nextSlide = () => {
    activeSlide.value = (activeSlide.value + 1) % screenshots.value.length
}

const prevSlide = () => {
    activeSlide.value = activeSlide.value === 0
        ? screenshots.value.length - 1
        : activeSlide.value - 1
}

const setSlide = (index) => {
    activeSlide.value = index
}

const steps = [
    {
        title: 'Sign Up & Connect',
        items: [
            'Sign in with GitHub, Google, or Microsoft',
            'Access your personalized dashboard',
            'Create connections to your databases'
        ]
    },
    {
        title: 'Configure Your Stream',
        items: [
            'Choose migration or replication mode',
            'Select tables and data to transfer',
            'Configure custom filters and transformations'
        ]
    },
    {
        title: 'Monitor your stream',
        items: [
            'Track transfer progress in real-time',
            'Monitor performance metrics',
            'Access detailed system logs'
        ]
    }
]

const webInterface = [
    'Point-and-click database connection setup',
    'Visual table selection and mapping',
    'Simple mode selection between migration and replication',
    'Real-time validation and monitoring'
]

const apiFeatures = [
    {
        icon: Workflow,
        title: 'Programmatic Control',
        description: 'Full stream management through API endpoints'
    },
    {
        icon: Settings,
        title: 'Automation',
        description: 'Create and manage streams programmatically'
    },
    {
        icon: Network,
        title: 'System Integration',
        description: 'Seamless integration with your existing tools'
    }
]

// Meta information
useHead({
    title: 'Get Started - DBConvert Streams',
    meta: [
        { name: 'description', content: 'Start your data journey with DBConvert Streams. Set up your database migration and replication in minutes with our intuitive interface.' }
    ]
})
</script>

<style scoped>
.bg-grid-white {
    mask-image: linear-gradient(to bottom, transparent, 20%, white, 80%, transparent);
}

.bg-grid-primary {
    mask-image: linear-gradient(to bottom, transparent, 5%, white, 95%, transparent);
}
</style>