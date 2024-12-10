<template>
    <div class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-4">Two Powerful Capabilities</h2>
            <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Whether you need to migrate your entire database or keep systems synchronized in real-time, DBConvert
                Streams has you covered
            </p>
            <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <!-- Data Migration Card -->
                <div class="bg-blue-50 p-8 rounded-xl">
                    <ArrowRightLeft class="h-12 w-12 text-blue-600 mb-4" />
                    <h3 class="text-2xl font-semibold mb-4">Fast Data Migration</h3>
                    <p class="text-gray-600 mb-4">
                        Migrate large databases quickly and reliably using our intelligent chunking technology.
                        Perfect for database upgrades, cloud migrations, or creating development environments.
                    </p>
                    <ul class="space-y-2">
                        <li v-for="feature in migrationFeatures" :key="feature" class="flex items-center text-gray-600">
                            <Zap class="h-5 w-5 text-blue-600 mr-2" />
                            {{ feature }}
                        </li>
                    </ul>
                </div>

                <!-- Real-time Replication Card -->
                <div class="bg-blue-50 p-8 rounded-xl">
                    <ArrowRightLeft class="h-12 w-12 text-blue-600 mb-4" />
                    <h3 class="text-2xl font-semibold mb-4">Real-time Replication</h3>
                    <p class="text-gray-600 mb-4">
                        Keep your databases synchronized with continuous, low-latency Change Data Capture (CDC).
                        Ideal for real-time analytics, disaster recovery, or distributed systems.
                    </p>
                    <ul class="space-y-2">
                        <li v-for="feature in replicationFeatures" :key="feature"
                            class="flex items-center text-gray-600">
                            <Zap class="h-5 w-5 text-blue-600 mr-2" />
                            {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Zap, ArrowRightLeft} from 'lucide-vue-next'
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