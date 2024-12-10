// components/home/HowItWorks.vue
<template>
    <div class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div class="max-w-4xl mx-auto">
                <div v-for="(step, index) in steps" :key="index" class="mb-8 last:mb-0">
                    <div class="flex items-start">
                        <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            {{ index + 1 }}
                        </div>
                        <div class="ml-4">
                            <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
                            <p class="text-gray-600">{{ step.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const steps = [
    {
        title: "Connect Your Databases",
        description: "Securely connect your source and target databases using our intuitive interface."
    },
    {
        title: "Configure Your Stream",
        description: "Choose between one-time migration or continuous replication, and customize your data mapping."
    },
    {
        title: "Start & Monitor",
        description: "Launch your data stream and monitor progress through our real-time dashboard."
    },
    {
        title: "Monitor & Scale",
        description: "Track your data streams through our intuitive dashboard. Scale up your deployment as needed with our distributed architecture."
    }
]
</script>