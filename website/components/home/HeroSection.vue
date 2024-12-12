<template>
    <div class="bg-gradient-to-b from-primary-dark to-primary text-white min-h-screen flex items-center">
        <div class="container mx-auto px-4 py-16 space-y-16">
            <!-- Hero Content -->
            <div class="max-w-3xl mx-auto text-center space-y-8">
                <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.8s_ease-out_forwards]">
                    Database Migration & Replication
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
                        Made Simple
                    </span>
                </h1>
                <p class="text-xl mb-8 text-gray-100 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">
                    Seamlessly migrate and synchronize your databases with our powerful, reliable platform
                </p>
                <div
                    class="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-[fadeIn_0.8s_ease-out_0.4s_forwards] opacity-0">
                    <button
                        class="group bg-secondary hover:bg-secondary-dark px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
                        Get Started
                        <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        class="border border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
                        View Documentation
                    </button>
                </div>
            </div>

            <!-- Screenshot Carousel -->
            <div class="max-w-6xl mx-auto animate-[fadeInUp_1s_ease-out_0.6s_forwards] opacity-0">
                <div class="relative browser-frame bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
                    <!-- Browser Frame Header -->
                    <div
                        class="bg-gray-900/50 px-4 py-3 border-b border-gray-700/50 flex items-center backdrop-blur-sm">
                        <div class="flex space-x-2">
                            <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div class="mx-auto text-gray-300 text-sm font-medium">DBConvert Streams</div>
                    </div>

                    <!-- Carousel Container -->
                    <div class="relative group">
                        <div class="overflow-hidden bg-black/20 aspect-video">
                            <div class="flex transition-transform duration-500 ease-out h-full"
                                :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
                                <div v-for="(screenshot, index) in screenshots" :key="index"
                                    class="w-full flex-shrink-0 relative flex items-center justify-center p-4">
                                    <img :src="screenshot.image" :alt="screenshot.title"
                                        class="max-w-full max-h-full object-contain">
                                </div>
                            </div>
                        </div>

                        <!-- Navigation Buttons -->
                        <button @click="prevSlide"
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronLeft class="h-6 w-6 text-white" />
                        </button>
                        <button @click="nextSlide"
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronRight class="h-6 w-6 text-white" />
                        </button>

                        <!-- Slide Indicators -->
                        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            <button v-for="(_, index) in screenshots" :key="index" @click="setSlide(index)"
                                class="w-2 h-2 rounded-full transition-all duration-200"
                                :class="index === activeSlide ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'

// Import images
import startDashboard from '~/assets/images/components/home/start-dashboard.png'
import connectionDashboard from '~/assets/images/components/home/connection-dashboard.png'
import streamDashboard from '~/assets/images/components/home/stream-dashboard.png'
import monitoringDashboard from '~/assets/images/components/home/monitoring-dashboard.png'
import userDashboard from '~/assets/images/components/home/user-dashboard.png'

const activeSlide = ref(0)
const screenshots = ref([
    { title: 'Start Page', image: startDashboard },
    { title: 'Connection Dashboard', image: connectionDashboard },
    { title: 'Stream Configuration', image: streamDashboard },
    { title: 'Monitoring Dashboard', image: monitoringDashboard },
    { title: 'User Dashboard', image: userDashboard }
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
</script>