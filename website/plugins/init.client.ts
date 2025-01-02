import { defineNuxtPlugin } from '#app'
import type Clerk from '@clerk/clerk-js'

export default defineNuxtPlugin(async (nuxtApp) => {
    // Only run on client-side
    if (process.server) return

    const clerk = nuxtApp.$clerk as Clerk
    const { initApp } = useAppState()

    // Wait for Clerk to be fully loaded before doing anything
    if (!clerk.loaded) {
        await new Promise<void>((resolve) => {
            clerk.load().then(() => resolve())
        })
    }

    // Initialize only once when Clerk is ready and user is signed in
    if (clerk.user?.id) {
        await initApp()
    }

    // Watch for future sign-in events only
    clerk.addListener((event) => {
        // Only initialize on new sign-ins, not on initial load
        if (event.user?.id && !clerk.user) {
            initApp()
        }
    })
}) 
