// components/home/DatabasesSection.vue
<template>
    <div class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-4">Supported Databases</h2>
            <p class="text-center text-gray-600 mb-12">
                Connect and sync data between major database platforms
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div v-for="db in databases" :key="db" class="flex items-center justify-center">
                    <div class="text-center">
                        <Database class="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <span class="text-gray-700">{{ db }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Database } from 'lucide-vue-next'

const databases = [
    "MySQL", "PostgreSQL", "MariaDB", "Amazon RDS",
    "Aurora", "Google Cloud SQL", "Azure Database", "CockroachDB"
]
</script>