import { ref } from 'vue'
import { api } from '~/utils/api'
import type { UserData } from '~/types/user'

export function useAppState() {
    const userData = ref<UserData | null>(null)
    const isInitialized = ref(false)
    const { getToken } = useAuth()

    const showNotification = (message: string, type: 'info' | 'error' | 'success') => {
        // TODO: Implement notification system
        console.log(`${type}: ${message}`)
    }

    const userDataFromSentry = async (token: string) => {
        try {
            const response = await api.getUserDataFromSentry(token)
            userData.value = response
        } catch (error) {
            showNotification('Failed to fetch user data', 'error')
            userData.value = null
            throw error
        }
    }

    const initApp = async (): Promise<'success' | 'failed'> => {
        showNotification('Initializing App', 'info')

        try {
            const token = await getToken()
            if (!token) {
                throw new Error('No token provided')
            }

            await userDataFromSentry(token)

            isInitialized.value = true
            showNotification('App initialized successfully', 'success')
            return 'success'
        } catch (error) {
            showNotification('Failed to initialize app', 'error')
            isInitialized.value = false
            return 'failed'
        }
    }

    return {
        userData,
        isInitialized,
        initApp,
        userDataFromSentry
    }
} 