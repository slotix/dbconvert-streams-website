<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-dark to-primary text-white py-24">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-6">
          Features
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">
            Overview
          </span>
        </h1>
        <p class="text-xl text-gray-100 text-center max-w-3xl mx-auto">
          Modern data replication and migration features for enterprise database management
        </p>
      </div>
    </section>

    <!-- Mode Selector -->
    <section class="py-24 bg-gradient-to-b from-primary to-primary-light text-white">
      <div class="container mx-auto px-4">
        <div class="flex justify-center mb-8">
          <div class="inline-flex rounded-lg border border-gray-200">
            <button
              :class="`px-6 py-3 rounded-l-lg ${
                activeTab === 'cdc' 
                  ? 'bg-white text-primary-dark' 
                  : 'bg-transparent text-white hover:bg-white/10'
              }`"
              @click="activeTab = 'cdc'"
            >
              CDC Replication
            </button>
            <button
              :class="`px-6 py-3 rounded-r-lg ${
                activeTab === 'migration' 
                  ? 'bg-white text-primary-dark' 
                  : 'bg-transparent text-white hover:bg-white/10'
              }`"
              @click="activeTab = 'migration'"
            >
              Data Migration
            </button>
          </div>
        </div>

        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-4 text-center">
            {{ modes[activeTab].title }}
          </h2>
          <p class="text-gray-100 mb-8 text-center">
            {{ modes[activeTab].description }}
          </p>

          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div v-for="(point, index) in modes[activeTab].points" 
                 :key="index" 
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
              <div v-for="(useCase, index) in modes[activeTab].useCases" 
                   :key="index" 
                   class="flex items-center bg-primary-light/20 p-4 rounded-xl hover:bg-primary-light/30 transition-colors">
                <CheckCircle class="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span class="text-gray-700 font-medium">{{ useCase }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Features -->
    <section class="py-24 bg-gradient-to-b from-primary-light to-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Enterprise Features
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in enterpriseFeatures" 
               :key="index"
               class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <component :is="feature.icon" class="w-12 h-12 text-primary-dark mb-4" />
            <h3 class="text-xl font-semibold mb-2">
              {{ feature.title }}
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(item, itemIndex) in feature.items" 
                  :key="itemIndex"
                  class="flex items-center">
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
          <div v-for="(category, index) in databases" 
               :key="index" 
               class="p-6 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
            <Database class="w-12 h-12 text-primary-dark mb-6" />
            <h3 class="text-xl font-semibold mb-4">{{ category.name }}</h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(db, dbIndex) in category.variants" 
                  :key="dbIndex"
                  class="flex items-center">
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
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div v-for="(integration, index) in technicalIntegrations" 
               :key="index"
               class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <h3 class="text-xl font-semibold mb-4">{{ integration.title }}</h3>
            <p class="text-gray-600 mb-4">{{ integration.description }}</p>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(feature, featureIndex) in integration.features" 
                  :key="featureIndex"
                  class="flex items-center">
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
        <NuxtLink 
          to="/docs" 
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
    icon: Shield,
    title: "Security First",
    items: [
      "SSL/TLS encryption",
      "HashiCorp Vault integration", 
      "API key authentication"
    ]
  },
  {
    icon: LineChart,
    title: "Advanced Monitoring",
    items: [
      "Real-time metrics",
      "Prometheus integration",
      "Custom dashboards"
    ]
  },
  {
    icon: Cloud,
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
    variants: ["MySQL", "MariaDB", "SingleStore DB", "TiDB", "Percona", "Vitess"]
  },
  {
    name: "PostgreSQL & Compatible",
    type: "SQL",
    variants: ["PostgreSQL", "Greenplum", "YugabyteDB", "EDB Postgres", "Citus", "CockroachDB"]
  },
  {
    name: "Cloud Platforms",
    type: "Cloud",
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
    title: "Service Discovery",
    description: "HashiCorp Consul integration for robust service discovery and configuration management.",
    features: [
      "Automatic registration",
      "Health monitoring", 
      "Dynamic configuration"
    ]
  }
]
</script> 