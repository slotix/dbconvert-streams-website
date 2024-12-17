<template>
    <div class="py-24 bg-white bg-gradient-to-b from-primary-light to-white">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-display font-bold text-center mb-16">How It Works</h2>
            <div class="max-w-4xl mx-auto">
                <div v-for="(step, index) in steps" :key="index" 
                     class="mb-20 last:mb-0 flex group">
                    <div class="relative">
                        <div class="bg-primary text-white rounded-full w-12 h-12 
                                  flex items-center justify-center flex-shrink-0 
                                  font-bold text-lg shadow-lg 
                                  group-hover:scale-110 transition-transform duration-300
                                  relative z-10">
                            {{ index + 1 }}
                        </div>
                        <div v-if="index !== steps.length - 1" 
                             class="absolute top-12 bottom-0 left-1/2 w-0.5 
                                    bg-gradient-to-b from-primary to-primary/30
                                    h-24 transform -translate-x-1/2">
                        </div>
                    </div>
                    <div class="ml-8">
                        <h3 class="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                            {{ step.title }}
                        </h3>
                        <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
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