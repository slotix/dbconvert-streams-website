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
                        <div
                            class="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                            {{ index + 1 }}
                        </div>
                        <h3 class="text-xl font-semibold mb-4">{{ step.title }}</h3>
                        <ul class="space-y-3">
                            <li v-for="(item, itemIndex) in step.items" :key="itemIndex" class="flex items-start">
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

                <div class="relative browser-frame bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
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
                        <div class="overflow-hidden" style="aspect-ratio: 4/3;">
                            <div class="flex transition-transform duration-500 ease-out"
                                :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
                                <div v-for="(screenshot, index) in screenshots" :key="index"
                                    class="w-full flex-shrink-0 relative">
                                    <img :src="screenshot.image" :alt="screenshot.title"
                                        class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>

                        <!-- Caption - Moved outside the image -->
                        <div class="text-center py-6 px-8 bg-white border-t border-gray-100">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">
                                {{ screenshots[activeSlide].title }}
                            </h3>
                            <p class="text-gray-600 mb-4">
                                {{ screenshots[activeSlide].description }}
                            </p>
                            
                            <!-- Slide Indicators - Moved here -->
                            <div class="flex justify-center space-x-2 mt-4">
                                <button v-for="(_, index) in screenshots" :key="index" @click="setSlide(index)"
                                    class="w-2 h-2 rounded-full transition-all duration-200"
                                    :class="[index === activeSlide ? 'bg-primary w-4' : 'bg-gray-300 hover:bg-gray-400']">
                                </button>
                            </div>
                        </div>

                        <!-- Navigation Buttons -->
                        <button @click="prevSlide"
                            class="absolute left-4 top-1/3 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronLeft class="h-6 w-6 text-gray-800" />
                        </button>
                        <button @click="nextSlide"
                            class="absolute right-4 top-1/3 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronRight class="h-6 w-6 text-gray-800" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Setup Options -->
        <section class="py-24 bg-gradient-to-b from-white to-primary-light">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">
                    Two Ways to Use DBConvert Streams
                </h2>
                <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <!-- Business Users -->
                    <div
                        class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                        <div class="flex items-center gap-3 mb-8">
                            <MousePointerClick class="h-8 w-8 text-primary" />
                            <h3 class="text-2xl font-bold">Intuitive Web Interface</h3>
                        </div>
                        <p class="text-gray-600 mb-8">
                            Perfect for business users and quick setups
                        </p>
                        <ul class="space-y-4 mb-8">
                            <li v-for="(feature, index) in webInterface" :key="index" class="flex items-start">
                                <CheckCircle class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span class="text-gray-700">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Developers -->
                    <div
                        class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                        <div class="flex items-center gap-3 mb-8">
                            <Code2 class="h-8 w-8 text-primary" />
                            <h3 class="text-2xl font-bold">API Integration</h3>
                        </div>
                        <p class="text-gray-600 mb-8">
                            For developers and advanced automation
                        </p>
                        <ul class="space-y-4 mb-8">
                            <li v-for="(feature, index) in apiFeatures" :key="index" class="flex items-start">
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
import addMysqlConnection from '~/assets/images/screenshots/screenshot-add-mysql-connection.webp'
import addPostgresConnection from '~/assets/images/screenshots/screenshot-add-postgres-connection.webp'
import editStreamCdcConfig from '~/assets/images/screenshots/screenshot-edit-stream-cdc-config.webp'
import editStreamConvertConfig from '~/assets/images/screenshots/screenshot-edit-stream-convert-config.webp'
import editStreamSelectSource from '~/assets/images/screenshots/screenshot-edit-stream-select-source.webp'
import editStreamSelectTarget from '~/assets/images/screenshots/screenshot-edit-stream-select-target.webp'
import connectionTableView from '~/assets/images/screenshots/screenshot-connection-table-view.webp'
import userDashboard from '~/assets/images/screenshots/screenshot-user.webp'

const activeSlide = ref(0)
const screenshots = ref([
    {
        title: 'Quick Start Dashboard',
        description: 'Get started with our intuitive setup wizard that guides you through each step',
        image: startDashboard
    },
    {
        title: 'Database Connections Overview',
        description: 'Manage all your database connections from a central dashboard',
        image: connectionDashboard
    },
    {
        title: 'Table View',
        description: 'Switch between table view and cards view to see your connections and streams',
        image: connectionTableView
    },
    {
        title: 'MySQL Connection Setup',
        description: 'Easily configure MySQL connections with built-in SSL support and connection testing',
        image: addMysqlConnection
    },
    {
        title: 'PostgreSQL Connection Setup',
        description: 'Set up PostgreSQL connections with advanced configuration options',
        image: addPostgresConnection
    },
    {
        title: 'Streams Overview',
        description: 'Add a new stream or edit an existing stream to start transferring data',
        image: streamDashboard
    },
    {
        title: 'Edit Stream - Source Selection',
        description: 'Select source database to transfer data from',
        image: editStreamSelectSource
    },
    {
        title: 'Edit Stream - CDC Configuration',
        description: 'Configure Change Data Capture settings for real-time replication',
        image: editStreamCdcConfig
    },
    {
        title: 'Edit Stream - Data Conversion Settings',
        description: 'Fine-tune your data conversion and transformation rules',
        image: editStreamConvertConfig
    },
    {
        title: 'Edit Stream - Target Selection',
        description: 'Select target database to transfer data to',
        image: editStreamSelectTarget
    },
    {
        title: 'Performance Monitoring',
        description: 'Monitor your data transfers with detailed analytics and metrics',
        image: monitoringDashboard
    },
    {
        title: 'User Dashboard',
        description: 'Review your statistics and usage. Manage your API keys',
        image: userDashboard
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