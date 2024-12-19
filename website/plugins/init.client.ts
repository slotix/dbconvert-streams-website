import { defineNuxtPlugin } from '#app'
import type Clerk from '@clerk/clerk-js'

export default defineNuxtPlugin(async (nuxtApp) => {
    // Only run on client-side
    if (process.server) return

    const clerk = nuxtApp.$clerk as Clerk
    const { initApp } = useAppState()

    // Initialize when the user is already signed in
    if (clerk.user?.id) {
        await initApp()
    }

    // Watch for sign-in state changes
    clerk.addListener((event) => {
        // Check if the event indicates a successful sign-in
        if (event.user && event.user.id) {
            initApp()
        }
    })
}) 