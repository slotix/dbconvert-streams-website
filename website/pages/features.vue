<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-primary-dark text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-4">
          Features
        </h1>
        <p class="text-xl text-center max-w-3xl mx-auto">
          Modern data replication and migration features for enterprise database management
        </p>
      </div>
    </section>

    <!-- Mode Selector -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex justify-center mb-8">
          <div class="inline-flex rounded-lg border border-gray-200">
            <button
              :class="`px-6 py-3 rounded-l-lg ${
                activeTab === 'cdc' 
                  ? 'bg-primary-dark text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`"
              @click="activeTab = 'cdc'"
            >
              CDC Replication
            </button>
            <button
              :class="`px-6 py-3 rounded-r-lg ${
                activeTab === 'migration' 
                  ? 'bg-primary-dark text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`"
              @click="activeTab = 'migration'"
            >
              Data Migration
            </button>
          </div>
        </div>

        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-4">
            {{ modes[activeTab].title }}
          </h2>
          <p class="text-gray-600 mb-8">
            {{ modes[activeTab].description }}
          </p>

          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div v-for="(point, index) in modes[activeTab].points" 
                 :key="index" 
                 class="bg-gray-50 p-6 rounded-lg">
              <div class="text-primary mb-4">
                <component :is="point.icon" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-semibold mb-2">
                {{ point.title }}
              </h3>
              <p class="text-gray-600">
                {{ point.description }}
              </p>
            </div>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Common Use Cases</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="(useCase, index) in modes[activeTab].useCases" 
                   :key="index" 
                   class="flex items-center">
                <span class="w-2 h-2 bg-primary rounded-full mr-2"></span>
                <span class="text-gray-600">{{ useCase }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Features -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Enterprise Features
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in enterpriseFeatures" 
               :key="index"
               class="bg-white p-6 rounded-lg shadow-sm">
            <component :is="feature.icon" class="w-12 h-12 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">
              {{ feature.title }}
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(item, itemIndex) in feature.items" 
                  :key="itemIndex">
                • {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Databases -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Supported Databases
        </h2>
        <div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div v-for="(category, index) in databases" 
               :key="index" 
               class="bg-gray-50 p-6 rounded-lg">
            <Database class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-4">{{ category.name }}</h3>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(db, dbIndex) in category.variants" 
                  :key="dbIndex">
                • {{ db }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Integration -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Technical Integration
        </h2>
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div v-for="(integration, index) in technicalIntegrations" 
               :key="index"
               class="bg-white p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">{{ integration.title }}</h3>
            <p class="text-gray-600 mb-4">{{ integration.description }}</p>
            <ul class="space-y-2 text-gray-600">
              <li v-for="(feature, featureIndex) in integration.features" 
                  :key="featureIndex">
                • {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-dark text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-xl mb-8">
          Start your data migration and replication journey today
        </p>
        <button class="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-colors">
          Get Started
        </button>
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
  Server
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