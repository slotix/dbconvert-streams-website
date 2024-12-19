export default defineNuxtRouteMiddleware(async (to) => {
    const { $clerk } = useNuxtApp()
    const isSignedIn = $clerk.user?.id !== undefined

    // If user is not signed in, redirect to sign in
    if (!isSignedIn) {
        $clerk.openSignIn({
            redirectUrl: to.fullPath
        })
        return navigateTo('/')
    }
}) 