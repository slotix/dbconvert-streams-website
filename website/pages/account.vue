<template>
    <ClientOnly>
        <div v-if="mounted && initialized">
            <!-- Existing template content -->
            <div class="">
                <!-- Hero Section -->
                <section class="bg-gradient-to-b from-primary-dark to-primary text-white relative overflow-hidden">
                    <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
                    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div class="max-w-3xl mx-auto text-center space-y-8 relative">
                            <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
                                Account
                                <span
                                    class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                                    Dashboard
                                </span>
                            </h1>
                            <p class="text-xl mb-8 text-gray-100 animate-fade-in-delay">
                                Manage your account, view usage, and access your API key
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Main Content -->
                <main class="py-8 sm:py-16 -mt-8 bg-gradient-to-b from-primary to-primary-light">
                    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            <!-- API Key Section -->
                            <div
                                class="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-soft hover:shadow-xl transition-shadow duration-300">
                                <div>
                                    <h2 class="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-1">API Key
                                    </h2>
                                    <p class="text-gray-500 text-sm mb-4 sm:mb-6">Use this key to authenticate your API
                                        requests
                                    </p>
                                </div>
                                <div class="space-y-4">
                                    <div class="p-4 bg-gray-50 rounded-lg">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="text-gray-600 text-sm">API Key</span>
                                            <button @click="copyApiKey"
                                                class="flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary rounded-lg transition-colors">
                                                <Copy class="h-4 w-4" />
                                                <span class="text-sm">Copy</span>
                                            </button>
                                        </div>
                                        <div class="font-mono text-gray-900 break-all">
                                            {{ maskedApiKey }}
                                        </div>
                                    </div>
                                    <button @click="regenerateApiKey"
                                        class="mt-2 inline-flex w-full items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200 font-semibold">
                                        <RefreshCw class="mr-2 h-4 w-4" />
                                        Regenerate API Key
                                    </button>
                                </div>
                            </div>

                            <!-- Subscription Section -->
                            <div
                                class="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-soft hover:shadow-xl transition-shadow duration-300">
                                <div>
                                    <h2 class="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-1">Current
                                        Plan</h2>
                                    <p class="text-gray-500 text-sm mb-4 sm:mb-6">Your subscription and usage limits</p>
                                </div>
                                <div v-if="userData?.subscription" class="space-y-4">
                                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span class="text-gray-600">Plan Name</span>
                                        <span class="font-semibold text-gray-900">{{ userData.subscription.name
                                            }}</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span class="text-gray-600">Monthly Limit</span>
                                        <span class="font-semibold text-gray-900">{{
                                            formatBytes(userData.subscription.monthly_limit) }}</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span class="text-gray-600">Status</span>
                                        <span class="font-semibold text-primary">{{ userData.subscriptionStatus
                                            }}</span>
                                    </div>
                                    <NuxtLink to="/pricing"
                                        class="mt-6 inline-flex w-full items-center justify-center bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors duration-200 font-semibold">
                                        Upgrade Plan
                                        <ArrowRight class="ml-2 h-5 w-5" />
                                    </NuxtLink>
                                </div>
                            </div>

                            <!-- Usage Section -->
                            <div
                                class="md:col-span-2 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-soft hover:shadow-xl transition-shadow duration-300">
                                <div>
                                    <h2 class="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-1">Usage
                                        Statistics</h2>
                                    <p class="text-gray-500 text-sm mb-4 sm:mb-8">Monitor your data transfer usage over
                                        time</p>
                                </div>

                                <!-- Current Period Usage -->
                                <div class="mb-12">
                                    <h3 class="text-lg font-semibold mb-4 text-gray-900">Current Period Usage</h3>
                                    <div class="bg-gray-100 rounded-full h-4 mb-2">
                                        <div class="bg-primary rounded-full h-4 transition-all duration-1000 ease-out"
                                            :style="{ width: `${usagePercentage}%` }">
                                        </div>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                        <span class="text-gray-600">{{
                                            formatBytes(userData?.subscriptionPeriodUsage?.data_volume || 0) }}
                                            used</span>
                                        <span class="text-gray-600">{{ formatBytes(userData?.subscription?.monthly_limit
                                            || 0)
                                            }} limit</span>
                                    </div>
                                </div>

                                <!-- Monthly Usage Chart -->
                                <div class="mb-12">
                                    <h3 class="text-lg font-semibold mb-4 text-gray-900">Monthly Usage</h3>
                                    <div class="h-64 bg-gray-50 rounded-xl p-4">
                                        <Bar v-if="monthlyChartData" :data="monthlyChartData" :options="chartOptions" />
                                    </div>
                                </div>

                                <!-- Daily Usage Chart -->
                                <div>
                                    <h3 class="text-lg font-semibold mb-4 text-gray-900">Daily Usage</h3>
                                    <div class="h-64 bg-gray-50 rounded-xl p-4">
                                        <Bar v-if="dailyChartData" :data="dailyChartData" :options="chartOptions" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <div v-else class="min-h-screen flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    </ClientOnly>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Copy, RefreshCw, ArrowRight } from 'lucide-vue-next'
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
import { useAppState } from '~/composables/useAppState'

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
const toast = useToast()

// Add mounted state
const mounted = ref(false)
const initialized = ref(false)
const { $clerk } = useNuxtApp()

onMounted(async () => {
    try
    {
        await $clerk.load()
        initialized.value = true
    } catch (error)
    {
        console.error('Failed to initialize Clerk:', error)
    } finally
    {
        mounted.value = true
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
        try
        {
            await navigator.clipboard.writeText(userData.value.apiKey)
            toast.success('API key copied to clipboard!')
        } catch (error)
        {
            toast.error('Failed to copy API key')
        }
    }
}

const regenerateApiKey = async () => {
    try
    {
        // TODO: Implement API key regeneration
        console.log('Regenerate API key')
        toast.info('API key regeneration not implemented yet')
    } catch (error)
    {
        toast.error('Failed to regenerate API key')
    }
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
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
                callback: (value) => formatBytes(value),
                color: '#6B7280'
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#6B7280'
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: 'white',
            titleColor: '#111827',
            titleFont: {
                family: 'Plus Jakarta Sans',
                weight: '600'
            },
            bodyColor: '#6B7280',
            bodyFont: {
                family: 'Inter'
            },
            borderColor: '#E5E7EB',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
                label: (context) => `Usage: ${formatBytes(context.raw)}`
            }
        }
    }
}

// Monthly usage chart data
const monthlyChartData = computed(() => {
    const usage = userData.value?.monthlyUsage
    if (!usage?.length) return null

    return {
        labels: usage.map(item => {
            const date = new Date(item.month)
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        }),
        datasets: [{
            data: usage.map(item => item.data_volume),
            backgroundColor: '#0F7C94',
            borderRadius: 6,
            maxBarThickness: 40
        }]
    }
})

// Daily usage chart data
const dailyChartData = computed(() => {
    const usage = userData.value?.dailyUsage
    if (!usage?.length) return null

    return {
        labels: usage.map(item => {
            const date = new Date(item.date)
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }),
        datasets: [{
            data: usage.map(item => item.data_volume),
            backgroundColor: '#0F7C94',
            borderRadius: 6,
            maxBarThickness: 40
        }]
    }
})
</script>