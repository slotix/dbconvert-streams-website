<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <section class="bg-gradient-to-b from-primary-dark to-primary text-white">
            <div class="container mx-auto px-4 py-16">
                <div class="max-w-3xl mx-auto text-center space-y-8">
                    <h1 class="text-4xl md:text-6xl font-display font-bold mb-6">
                        Account
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                            Dashboard
                        </span>
                    </h1>
                    <p class="text-xl mb-8 text-gray-100">
                        Manage your account, view usage, and access your API key
                    </p>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <main class="py-12">
            <div class="container mx-auto px-4">
                <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <!-- API Key Section -->
                    <div class="bg-white p-8 rounded-2xl shadow-xl">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-display font-bold">API Key</h2>
                            <button @click="regenerateApiKey" class="text-primary hover:text-primary-dark">
                                <RefreshCw class="h-5 w-5" />
                            </button>
                        </div>
                        <div class="relative">
                            <input type="text" :value="maskedApiKey" readonly
                                class="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-700 font-mono text-sm" />
                            <button @click="copyApiKey"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary">
                                <Copy class="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Subscription Section -->
                    <div class="bg-white p-8 rounded-2xl shadow-xl">
                        <h2 class="text-2xl font-display font-bold mb-6">Current Plan</h2>
                        <div v-if="userData?.subscription" class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Plan Name</span>
                                <span class="font-semibold">{{ userData.subscription.name }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Monthly Limit</span>
                                <span class="font-semibold">{{ formatBytes(userData.subscription.monthly_limit)
                                    }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Status</span>
                                <span class="font-semibold">{{ userData.subscriptionStatus }}</span>
                            </div>
                            <NuxtLink to="/pricing"
                                class="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200">
                                Upgrade Plan
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Usage Section -->
                    <div class="md:col-span-2 bg-white p-8 rounded-2xl shadow-xl">
                        <h2 class="text-2xl font-display font-bold mb-6">Usage Statistics</h2>

                        <!-- Current Period Usage -->
                        <div class="mb-8">
                            <h3 class="text-lg font-semibold mb-4">Current Period Usage</h3>
                            <div class="bg-gray-100 rounded-full h-4 mb-2">
                                <div class="bg-primary rounded-full h-4" :style="{ width: `${usagePercentage}%` }">
                                </div>
                            </div>
                            <div class="flex justify-between text-sm text-gray-600">
                                <span>{{ formatBytes(userData?.subscriptionPeriodUsage?.data_volume || 0) }} used</span>
                                <span>{{ formatBytes(userData?.subscription?.monthly_limit || 0) }} limit</span>
                            </div>
                        </div>

                        <!-- Monthly Usage Chart -->
                        <div class="mb-8">
                            <h3 class="text-lg font-semibold mb-4">Monthly Usage</h3>
                            <div class="h-64">
                                <Bar v-if="monthlyChartData" :data="monthlyChartData" :options="chartOptions" />
                            </div>
                        </div>

                        <!-- Daily Usage Chart -->
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Daily Usage</h3>
                            <div class="h-64">
                                <Bar v-if="dailyChartData" :data="dailyChartData" :options="chartOptions" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Copy, RefreshCw } from 'lucide-vue-next'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

// Page meta
definePageMeta({
    middleware: 'auth'
})

const { userData, initApp } = useAppState()

// Add initialization and debugging
onMounted(async () => {
    console.log('Account page mounted')
    try
    {
        await initApp()
        console.log('User data after init:', userData.value)
    } catch (error)
    {
        console.error('Failed to initialize app:', error)
    }
})

// Add watcher for userData changes
watch(userData, (newValue) => {
    console.log('userData changed:', newValue)
}, { deep: true })

// Format bytes to human readable format
const formatBytes = (bytes) => {
    if (!bytes) return '0 B'
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

// API Key handling
const maskedApiKey = computed(() => {
    const key = userData.value?.apiKey
    if (!key) return '••••••••••••••••'
    return `${key.slice(0, 4)}${'•'.repeat(key.length - 8)}${key.slice(-4)}`
})

const copyApiKey = async () => {
    if (userData.value?.apiKey)
    {
        await navigator.clipboard.writeText(userData.value.apiKey)
        // TODO: Show success notification
    }
}

const regenerateApiKey = async () => {
    // TODO: Implement API key regeneration
    console.log('Regenerate API key')
}

// Usage calculations
const usagePercentage = computed(() => {
    const volume = userData.value?.subscriptionPeriodUsage?.data_volume || 0
    const limit = userData.value?.subscription?.monthly_limit || 0
    if (!volume || !limit) return 0
    return Math.min((volume / limit) * 100, 100)
})

// Chart configurations
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: (value) => formatBytes(value)
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}

// Monthly usage chart data
const monthlyChartData = computed(() => {
    const usage = userData.value?.monthlyUsage
    if (!usage?.length) return null

    return {
        labels: usage.map(item => {
            // Format date string to show only month and year
            const date = new Date(item.month)
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        }),
        datasets: [{
            data: usage.map(item => item.data_volume),
            backgroundColor: '#0F7C94', // Primary color from tailwind config
            borderRadius: 4
        }]
    }
})

// Daily usage chart data
const dailyChartData = computed(() => {
    const usage = userData.value?.dailyUsage
    if (!usage?.length) return null

    return {
        labels: usage.map(item => {
            // Format date string to show only day and month
            const date = new Date(item.date)
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }),
        datasets: [{
            data: usage.map(item => item.data_volume),
            backgroundColor: '#0F7C94', // Primary color from tailwind config
            borderRadius: 4
        }]
    }
})
</script>