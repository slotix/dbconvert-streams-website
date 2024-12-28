export default defineNuxtRouteMiddleware(async (to) => {
    // Skip middleware on server-side
    if (process.server) return

    const nuxtApp = useNuxtApp()
    const protectedRoutes = ['/account']

    if (protectedRoutes.includes(to.path)) {
        // Wait for Clerk to be available
        if (!nuxtApp.$clerk) {
            console.log('Clerk not available, redirecting...')
            return navigateTo('/')
        }

        // Wait for Clerk to be loaded
        await nuxtApp.$clerk.load()

        // Check authentication after Clerk is loaded
        if (!nuxtApp.$clerk?.user) {
            console.log('User not authenticated, redirecting...')
            return navigateTo('/')
        }
    }
})
