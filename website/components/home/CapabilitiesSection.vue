<template>
    <div class="py-24 text-white bg-gradient-to-b from-primary to-primary-light">
        <div class="container mx-auto px-4">
            <h2 class=" text-4xl font-bold text-center mb-4">Two Powerful Capabilities</h2>
            <p class=" text-center mb-16 max-w-2xl mx-auto">
                Whether you need to migrate your entire database or keep systems synchronized in real-time, DBConvert
                Streams has you covered
            </p>
            <div class="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">

                <!-- Real-time Replication Card -->
                <div
                    class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-100">
                    <div class="p-10 flex-1">
                        <h3 class="text-2xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors">
                            Real-time Replication
                        </h3>
                        <p class="text-gray-600 leading-relaxed mb-8">
                            Keep your databases synchronized with continuous, low-latency Change Data Capture (CDC).
                            Ideal for real-time analytics, disaster recovery, or distributed systems.
                        </p>
                        <ul class="space-y-4">
                            <li v-for="feature in replicationFeatures" :key="feature"
                                class="flex items-center text-gray-700 bg-primary-light/20 p-4 rounded-xl hover:bg-primary-light/30 transition-colors">
                                <CheckCircle class="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                <span class="font-medium">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="h-100 bg-gradient-to-br from-primary-light/20 to-primary-light/5">
                        <img src="@/assets/images/pages/home/replication.webp" alt="Replication"
                            class="w-full h-full object-cover" />
                    </div>
                </div>

                <!-- Data Migration Card -->
                <div
                    class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-100">
                    <div class="p-10 flex-1">
                        <h3 class="text-2xl font-bold mb-6 text-gray-800 group-hover:text-secondary transition-colors">
                            Fast Data Migration
                        </h3>
                        <p class="text-gray-600 leading-relaxed mb-8">
                            Migrate large databases quickly and reliably using our intelligent chunking technology.
                            Perfect for database upgrades, cloud migrations, or creating development environments.
                        </p>
                        <ul class="space-y-4">
                            <li v-for="feature in migrationFeatures" :key="feature"
                                class="flex items-center text-gray-700 bg-primary-light/20 p-4 rounded-xl hover:bg-primary-light/30 transition-colors">
                                <CheckCircle class="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                <span class="font-medium">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="h-100 bg-gradient-to-br from-primary-light/20 to-primary-light/5">
                        <img src="@/assets/images/pages/home/migration.webp" alt="Migration"
                            class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CheckCircle } from 'lucide-vue-next'
const migrationFeatures = [
    'Optimized for large-scale transfers',
    'Automatic schema conversion',
    'Real-time transfer monitoring'
]

const replicationFeatures = [
    'Zero-downtime synchronization',
    'Capture all database changes',
    'Minimal impact on source database'
]
</script>