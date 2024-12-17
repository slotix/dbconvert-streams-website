<template>
    <div>
        <!-- Toggle Monthly/Yearly -->
        <div class="flex justify-center mb-12">
            <div class="bg-primary/10 rounded-lg p-1">
                <button class="px-8 py-3 rounded-md text-lg font-medium font-ui transition-all duration-200"
                    :class="{ 'bg-primary text-white shadow-lg': !isYearly, 'text-primary hover:bg-primary/5': isYearly }"
                    @click="isYearly = false">
                    Monthly
                </button>
                <button class="px-8 py-3 rounded-md text-lg font-medium font-ui transition-all duration-200"
                    :class="{ 'bg-primary text-white shadow-lg': isYearly, 'text-primary hover:bg-primary/5': !isYearly }"
                    @click="isYearly = true">
                    Yearly
                </button>
            </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <!-- Starter Plan -->
            <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div class="mb-4">
                    <h3 class="text-2xl font-display font-bold text-gray-900">{{ prices.starter.name }}</h3>
                </div>
                <p class="text-4xl font-bold mb-4 text-primary">${{ getPrice('starter') }}<span
                        class="text-lg font-normal text-gray-600">/mo</span></p>
                <div class="text-gray-600 mb-8 text-sm leading-relaxed">{{ prices.starter.description }}</div>
                <ul class="space-y-4 mb-8">
                    <li v-for="feature in prices.starter.features" :key="feature"
                        class="flex items-center text-gray-700">
                        <CheckCircle class="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{{ feature }}</span>
                    </li>
                </ul>
                <button @click="checkout('starter')"
                    class="w-full bg-primary text-white font-ui py-3 px-6 rounded-xl font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center group">
                    Subscribe Now
                    <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <!-- Professional Plan -->
            <div
                class="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary relative transform hover:scale-105 transition-all duration-300">
                <div
                    class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2 rounded-full text-sm  font-ui shadow-lg">
                    Most Popular
                </div>
                <div class="mb-4">
                    <h3 class="text-2xl font-display font-bold text-gray-900">{{ prices.professional.name }}</h3>
                </div>
                <p class="text-4xl font-bold mb-4 text-primary">${{ getPrice('professional') }}<span
                        class="text-lg font-normal text-gray-600">/mo</span></p>
                <div class="text-gray-600 mb-8 text-sm leading-relaxed">{{ prices.professional.description }}</div>
                <ul class="space-y-4 mb-8">
                    <li v-for="feature in prices.professional.features" :key="feature"
                        class="flex items-center text-gray-700">
                        <CheckCircle class="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{{ feature }}</span>
                    </li>
                </ul>
                <button @click="checkout('professional')"
                    class="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center group">
                    Subscribe Now
                    <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <!-- Enterprise Plan -->
            <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div class="mb-4">
                    <h3 class="text-2xl font-bold text-gray-900">{{ prices.enterprise.name }}</h3>
                </div>
                <p class="text-4xl font-bold mb-4 text-primary">${{ getPrice('enterprise') }}<span
                        class="text-lg font-normal text-gray-600">/mo</span></p>
                <div class="text-gray-600 mb-8 text-sm leading-relaxed">{{ prices.enterprise.description }}</div>
                <ul class="space-y-4 mb-8">
                    <li v-for="feature in prices.enterprise.features" :key="feature"
                        class="flex items-center text-gray-700">
                        <CheckCircle class="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{{ feature }}</span>
                    </li>
                </ul>
                <button @click="checkout('enterprise')"
                    class="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center group">
                    Subscribe Now
                    <ArrowRight class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { CheckCircle, ArrowRight } from 'lucide-vue-next'

const config = useRuntimeConfig()
const stripeKey = config.public.stripeKey
const isYearly = ref(false)

// Pricing configuration
const prices = {
    starter: {
        monthly: 99,
        yearly: 84.08,
        name: 'DBConvert Streams Starter',
        transfer: '15 GB',
        description: 'Perfect for small-scale operations and initial data migration projects. Includes all essential features with basic support.',
        features: [
            '15 GB monthly transfer',
            'Multi-database support',
            'Basic support included',
            'API access included'
        ]
    },
    professional: {
        monthly: 449,
        yearly: 381.58,
        name: 'DBConvert Streams Professional',
        transfer: '75 GB',
        description: 'Ideal for growing businesses with medium-scale data operations. Includes priority support and higher transfer limits.',
        features: [
            '75 GB monthly transfer',
            'Multi-database support',
            'Priority support',
            'API access included'
        ]
    },
    enterprise: {
        monthly: 899,
        yearly: 764.17,
        name: 'DBConvert Streams Enterprise',
        transfer: '200 GB',
        description: 'For large-scale operations requiring high-volume data transfer. Includes our highest level of support and resources.',
        features: [
            '200 GB monthly transfer',
            'Multi-database support',
            'Priority support',
            'API access included'
        ]
    }
}

// Computed functions to get current prices
const getPrice = (plan: keyof typeof prices) => {
    return isYearly.value ? prices[plan].yearly : prices[plan].monthly
}

const priceIds = {
    price_starter_monthly: 'price_1Q5E1PFLYDY9wte9W5BWeEGD',
    price_professional_monthly: 'price_1Q5EyuFLYDY9wte9KyUwY2qK',
    price_enterprise_monthly: 'price_1Q5F3tFLYDY9wte9SIBijPeS',
    price_starter_yearly: 'price_1Q5DtRFLYDY9wte9Rfrjs7r8',
    price_professional_yearly: 'price_1Q5EyuFLYDY9wte9N6AR9xqL',
    price_enterprise_yearly: 'price_1Q5F3tFLYDY9wte9AxTunxzu'
}

// Helper function to get the correct price ID
const getPriceId = (plan: 'starter' | 'professional' | 'enterprise') => {
    const billing = isYearly.value ? 'yearly' : 'monthly'
    return priceIds[`price_${plan}_${billing}` as keyof typeof priceIds]
}

const checkout = async (plan: 'starter' | 'professional' | 'enterprise') => {
    try {
        const stripe = await loadStripe(stripeKey)
        if (!stripe) throw new Error('Stripe failed to load')

        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: getPriceId(plan), quantity: 1 }],
            mode: 'subscription',
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/pricing`,
        })

        if (error) {
            console.error('Error:', error)
        }
    } catch (err) {
        console.error('Failed to redirect to checkout:', err)
    }
}
</script>

<style scoped>
.pricing-card {
    @apply relative overflow-hidden;
}
</style>