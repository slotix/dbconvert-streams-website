// components/home/DatabasesSection.vue
<template>
    <div class="py-24 bg-gradient-to-b from-white to-primary-light">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-6">Supported Databases</h2>
            <p class="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
                Connect and sync data seamlessly between all major database platforms
            </p>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
                <div v-for="db in databases" :key="db.name" 
                     class="flex flex-col items-center p-6 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
                    <div class="mb-6">
                        <img :src="db.icon" 
                             :alt="db.name" 
                             class="w-40 h-40 object-contain hover:scale-110 transition-transform duration-300"
                             loading="lazy">
                    </div>
                    <span class="text-gray-800 text-xl font-medium">{{ db.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import mysqlIcon from '@/assets/images/components/home/mysql.png'
import postgresIcon from '@/assets/images/components/home/postgresql.png'
import amazonRdsIcon from '@/assets/images/components/home/aws.png'
import googleCloudIcon from '@/assets/images/components/home/google-sql.png'
import azureIcon from '@/assets/images/components/home/azure.png'

const databases = [
    { name: "MySQL", icon: mysqlIcon },
    { name: "PostgreSQL", icon: postgresIcon },
    { name: "Amazon RDS/ Aurora", icon: amazonRdsIcon },
    { name: "Google Cloud SQL", icon: googleCloudIcon },
    { name: "Azure Database", icon: azureIcon },
]
</script>