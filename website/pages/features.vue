<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-dark to-primary text-white  flex items-center">
      <div class="container mx-auto px-4 py-16 space-y-16">
        <!-- Hero Content -->
        <div class="max-w-3xl mx-auto text-center space-y-8">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.8s_ease-out_forwards]">
            Migrate and Replicate Between
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
              Any Database
            </span>
          </h1>
          <p class="text-xl mb-8 text-gray-100 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">
            Transfer data between MySQL, PostgreSQL, and cloud databases in any combination.
            Our intelligent schema mapping handles all the complexity automatically.
          </p>
        </div>
      </div>

    </section>

    <!-- Mode Selector -->
    <section class="py-24 bg-gradient-to-b from-primary to-primary-light ">
      <div class="container mx-auto px-4">

        <div class="max-w-4xl mx-auto mb-16">
          <img src="@/assets/images/pages/features/replication-migration.webp" alt="Database Replication and Migration"
            class="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300" />
        </div>
        <div class="flex justify-center mb-8">
          <div class="inline-flex rounded-lg border border-gray-200">
            <button :class="`px-6 py-3 rounded-l-lg ${activeTab === 'cdc'
              ? 'bg-white text-primary-dark'
              : 'bg-transparent  hover:bg-white/10'
              }`" @click="activeTab = 'cdc'">
              CDC Replication
            </button>
            <button :class="`px-6 py-3 rounded-r-lg ${activeTab === 'migration'
              ? 'bg-white text-primary-dark'
              : 'bg-transparent hover:bg-white/10'
              }`" @click="activeTab = 'migration'">
              Data Migration
            </button>
          </div>
        </div>

        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-4 text-center">
            {{ modes[activeTab].title }}
          </h2>
          <p class="text-gray-800 mb-8 text-center">
            {{ modes[activeTab].description }}
          </p>

          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div v-for="(point, index) in modes[activeTab].points" :key="index"
              class="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div class="text-primary-dark mb-4">
                <component :is="point.icon" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-semibold mb-2">
                {{ point.title }}
              </h3>
              <p class="text-gray-700">
                {{ point.description }}
              </p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-xl">
            <h3 class="text-xl font-semibold mb-4">Common Use Cases</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="(useCase, index) in modes[activeTab].useCases" :key="index"
                class="flex items-center bg-primary-light/20 p-4 rounded-xl hover:bg-primary-light/30 transition-colors">
                <CheckCircle class="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span class="text-gray-700 font-medium">{{ useCase }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Universal Database Compatibility -->
    <section class="py-24 bg-gradient-to-b from-primary-light to-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-6">
          Universal Database Compatibility
        </h2>
        <p class="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">
          Transfer data between any supported databases in any combination. Our intelligent schema mapping handles all
          the complexity automatically.
        </p>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- SQL to SQL Migrations -->
          <div
            class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div class="flex items-center mb-6">
              <img :src="sqlToSql" alt="SQL to SQL" class="w-24  h-24 mr-3 object-contain" />
              <h3 class="text-xl font-semibold">SQL to SQL</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="path in sqlMigrationPaths" :key="path"
                class="flex items-center bg-gradient-to-r from-primary-light/20 to-primary-light/10 p-3 rounded-lg hover:from-primary-light/30 hover:to-primary-light/20 transition-colors">
                <ArrowRight class="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span class="text-gray-700">{{ path }}</span>
              </li>
            </ul>
          </div>

          <!-- Cloud Combinations -->
          <div
            class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div class="flex items-center mb-6">
              <img :src="cloudCombinations" alt="Cloud Combinations" class="w-24 h-24 mr-3 object-contain" />
              <h3 class="text-xl font-semibold">Cloud Combinations</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="path in cloudMigrationPaths" :key="path"
                class="flex items-center bg-gradient-to-r from-primary-light/20 to-primary-light/10 p-3 rounded-lg hover:from-primary-light/30 hover:to-primary-light/20 transition-colors">
                <ArrowRight class="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span class="text-gray-700">{{ path }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Features -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Enterprise Features
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in enterpriseFeatures" :key="index"
            class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <img :src="feature.icon" :alt="feature.title" class="w-40 h-40 object-contain mb-4" />
            <h3 class="text-xl font-semibold mb-2">
              {{ feature.title }}
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(item, itemIndex) in feature.items" :key="itemIndex" class="flex items-center">
                <CheckCircle class="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Databases -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Supported Databases
        </h2>
        <div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div v-for="(category, index) in databases" :key="index"
            class="p-6 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
            <img :src="category.icon" :alt="category.name" class="w-40 h-40 mb-6 object-contain" />
            <h3 class="text-xl font-semibold mb-4">{{ category.name }}</h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(db, dbIndex) in category.variants" :key="dbIndex" class="flex items-center">
                <CheckCircle class="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>{{ db }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Integration -->
    <section class="py-24 bg-gradient-to-b from-white to-primary-light">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Technical Integration
        </h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div v-for="(integration, index) in technicalIntegrations" :key="index"
            class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <h3 class="text-xl font-semibold mb-4">{{ integration.title }}</h3>
            <p class="text-gray-600 mb-4">{{ integration.description }}</p>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(feature, featureIndex) in integration.features" :key="featureIndex" class="flex items-center">
                <CheckCircle class="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-dark text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4 max-w-2xl mx-auto">
          Ready to Get Started?
        </h2>
        <p class="text-xl mb-8">
          Start your data migration and replication journey today
        </p>
        <NuxtLink to="/docs"
          class="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all duration-200 inline-flex items-center group">
          Get Started
          <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Features - DBConvert Streams'
})

import { ref } from 'vue'
import {
  Database,
  Zap,
  RefreshCw,
  Shield,
  Settings,
  MonitorCheck,
  LineChart,
  Lock,
  Cloud,
  Server,
  CheckCircle,
  ArrowRight
} from 'lucide-vue-next'

import mysqlIcon from '@/assets/images/databases/mysql.png'
import postgresIcon from '@/assets/images/databases/postgresql.png'
import cloudIcon from '@/assets/images/databases/cloud.png'
import deploymentIcon from '@/assets/images/features/deployment.png'
import performanceIcon from '@/assets/images/features/performance.png'
import monitoringIcon from '@/assets/images/features/monitoring.png'
import sqlToSql from '@/assets/images/pages/features/sql-to-sql.png'
import cloudCombinations from '@/assets/images/pages/features/cloud-combinations.png'

const activeTab = ref('cdc')

const modes = {
  cdc: {
    title: "Real-time CDC Replication",
    description: "Keep your databases synchronized with continuous, low-latency Change Data Capture",
    points: [
      {
        icon: Zap,
        title: "Zero-downtime Synchronization",
        description: "Maintain continuous data replication without impacting production systems"
      },
      {
        icon: Database,
        title: "Transaction Log-Based",
        description: "Read directly from database transaction logs for minimal source impact"
      },
      {
        icon: RefreshCw,
        title: "Complete Change Capture",
        description: "Capture all INSERT, UPDATE, and DELETE operations in real-time"
      }
    ],
    useCases: [
      "Real-time analytics pipelines",
      "Disaster recovery systems",
      "Cross-region data synchronization",
      "Event-driven architectures"
    ]
  },
  migration: {
    title: "Fast Data Migration",
    description: "Transfer large databases efficiently with intelligent chunking technology",
    points: [
      {
        icon: Settings,
        title: "Automatic Schema Conversion",
        description: "Intelligent mapping between different database types and versions"
      },
      {
        icon: Server,
        title: "Optimized Transfer",
        description: "Parallel processing and data chunking for maximum performance"
      },
      {
        icon: MonitorCheck,
        title: "Real-time Monitoring",
        description: "Track progress and performance through comprehensive dashboards"
      }
    ],
    useCases: [
      "Database version upgrades",
      "Cloud migrations",
      "Development environment setup",
      "Database consolidation"
    ]
  }
}

const enterpriseFeatures = [
  {
    icon: performanceIcon,
    title: "High Performance & Reliability",
    items: [
      "Intelligent schema mapping",
      "Parallel processing",
      "Data chunking"
    ]
  },
  {
    icon: monitoringIcon,
    title: "Advanced Monitoring",
    items: [
      "Stream status monitoring",
      "Transfer progress tracking",
      "Detailed system logs",
    ]
  },
  {
    icon: deploymentIcon,
    title: "Flexible Deployment",
    items: [
      "Multi-cloud support",
      "Docker containers",
      "On-premises installation"
    ]
  }
]

const databases = [
  {
    name: "MySQL & Compatible",
    type: "SQL",
    icon: mysqlIcon,
    variants: ["MySQL", "MariaDB", "SingleStore DB", "TiDB", "Percona", "Vitess"]
  },
  {
    name: "PostgreSQL & Compatible",
    type: "SQL",
    icon: postgresIcon,
    variants: ["PostgreSQL", "Greenplum", "YugabyteDB", "EDB Postgres", "Citus", "CockroachDB"]
  },
  {
    name: "Cloud Platforms",
    type: "Cloud",
    icon: cloudIcon,
    variants: ["Amazon RDS/Aurora", "Google Cloud SQL", "Azure Database", "DigitalOcean"]
  }
]

const technicalIntegrations = [
  {
    title: "NATS Integration",
    description: "High-performance message streaming system for reliable data transfer and component communication.",
    features: [
      "Message streaming",
      "Fault tolerance",
      "Horizontal scaling"
    ]
  },
  {
    title: "Vault Integration",
    description: "Secure credential management using HashiCorp Vault.",
    features: [
      "Database credentials storage",
      "SSL certificates management",
      "API keys protection"
    ]
  },
  {
    title: "Service Discovery",
    description: "HashiCorp Consul integration for robust service discovery and configuration management.",
    features: [
      "Automatic registration",
      "Health monitoring",
      "Dynamic configuration"
    ]
  }
]

const sqlMigrationPaths = [
  "MySQL to PostgreSQL",
  "PostgreSQL to MySQL",
  "MariaDB to PostgreSQL",
  "SingleStore to CockroachDB"
]

const cloudMigrationPaths = [
  "Amazon Aurora MySQL to Azure PostgreSQL",
  "Google Cloud SQL to Amazon RDS",
  "Azure Database to Amazon Aurora",
  "Any cloud to any on-premises database"
]
</script>