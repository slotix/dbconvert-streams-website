<template>
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div class="container mx-auto px-4 py-16">
            <div class="max-w-3xl mx-auto text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    Database Migration & Replication Made Simple
                </h1>
                <p class="text-xl mb-8">
                    Seamlessly migrate and synchronize your databases with our powerful, reliable platform
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center">
                        Get Started
                        <ArrowRight class="ml-2 h-5 w-5" />
                    </button>
                    <button
                        class="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center">
                        View Documentation
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>