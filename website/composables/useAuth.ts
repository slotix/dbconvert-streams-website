import { useNuxtApp } from '#app'

export function useAuth() {
    const { $clerk } = useNuxtApp()

    const getToken = async (): Promise<string> => {
        if (!$clerk.loaded) {
            await $clerk.load()
        }

        try {
            // Force a session check/refresh
            await $clerk.session?.touch()

            const session = $clerk.session
            if (!session) {
                throw new Error('No active session')
            }

            // Get token from the session
            const token = await session.getToken()
            if (!token) {
                throw new Error('No token available')
            }
            return token
        } catch (error) {
            console.error('Failed to get token:', error)
            throw error
        }
    }

    return {
        getToken
    }
} 