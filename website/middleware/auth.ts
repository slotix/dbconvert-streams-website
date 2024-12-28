export default defineNuxtRouteMiddleware(async (to) => {
    // Only run on client-side
    if (process.client) {
        const { $clerk } = useNuxtApp()

        // Wait for Clerk to initialize
        await $clerk.load()

        const isSignedIn = $clerk.user?.id !== undefined

        // If user is not signed in, redirect to sign in
        if (!isSignedIn) {
            $clerk.openSignIn({
                redirectUrl: to.fullPath
            })
            return navigateTo('/')
        }
    }
}) 