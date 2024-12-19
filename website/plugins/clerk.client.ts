import { defineNuxtPlugin } from '#app'
import Clerk from '@clerk/clerk-js'
import { clerkPlugin } from '@clerk/vue'

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()

    const clerk = new Clerk(config.public.clerkPublishableKey)
    await clerk.load()

    nuxtApp.vueApp.use(clerkPlugin, { clerk })

    return {
        provide: {
            clerk
        }
    }
})
