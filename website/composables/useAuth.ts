import { useNuxtApp } from '#app'

export function useAuth() {
    const { $clerk } = useNuxtApp()

    const getToken = async (): Promise<string> => {
        const token = await $clerk.session?.getToken()
        if (!token) {
            throw new Error('No token available')
        }
        return token
    }

    return {
        getToken
    }
} 