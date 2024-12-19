import { defineNuxtPlugin } from '#app'
import Clerk from '@clerk/clerk-js'
import { clerkPlugin } from '@clerk/vue'

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()

    if (!config.public.clerkPublishableKey) {
        throw new Error('Missing Clerk publishable key in runtime config')
    }

    const clerk = new Clerk(config.public.clerkPublishableKey)
    await clerk.load()

    nuxtApp.vueApp.use(clerkPlugin, {
        publishableKey: config.public.clerkPublishableKey,
        clerk
    })

    return {
        provide: {
            clerk
        }
    }
})
