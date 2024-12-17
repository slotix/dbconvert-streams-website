<template>
    <div class="py-24 bg-gradient-to-b from-white to-primary-light">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-display font-bold text-center mb-6">Supported Databases</h2>
            <p class="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
                Connect and sync data seamlessly between all major database platforms
            </p>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
                <div v-for="db in databases" :key="db.name"
                    class="flex flex-col items-center p-6 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
                    <div class="mb-6">
                        <NuxtImg :src="db.icon" :alt="db.name"
                            class="w-40 h-40 object-contain hover:scale-110 transition-transform duration-300"
                            format="webp" quality="80" />
                    </div>
                    <span class="text-gray-800 text-xl font-medium">{{ db.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const mysqlIcon = '/images/databases/mysql.png'
const postgresIcon = '/images/databases/postgresql.png'
const amazonRdsIcon = '/images/databases/aws.png'
const googleCloudIcon = '/images/databases/google-sql.png'
const azureIcon = '/images/databases/azure.png'

const databases = [
    { name: "MySQL", icon: mysqlIcon },
    { name: "PostgreSQL", icon: postgresIcon },
    { name: "Amazon RDS/ Aurora", icon: amazonRdsIcon },
    { name: "Google Cloud SQL", icon: googleCloudIcon },
    { name: "Azure Database", icon: azureIcon },
]
</script>