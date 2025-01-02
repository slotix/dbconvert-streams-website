import { ref } from 'vue'
import { useState } from '#app'
import { api } from '~/utils/api'
import type { UserData } from '~/types/user'
import { useToast } from 'vue-toastification'

export function useAppState() {
    const userData = useState<UserData | null>('userData', () => null)
    const isInitialized = useState<boolean>('isInitialized', () => false)
    const { getToken } = useAuth()
    const toast = useToast()


    const userDataFromSentry = async (token: string) => {
        try {
            console.log('Fetching user data from sentry...')
            const response = await api.getUserDataFromSentry(token)
            console.log('Received user data:', response)
            userData.value = response
        } catch (error) {
            toast.error('Failed to fetch user data')
            console.error('Error fetching user data:', error)
            userData.value = null
            throw error
        }
    }

    const updateApiKey = async () => {
        try {
            const token = await getToken()
            if (!token) {
                throw new Error('No token provided')
            }

            const result = await api.updateApiKey(token)
            if (result.apiKey) {
                 userData.value!.apiKey = result.apiKey
                // await initApp() // Refresh user data
                toast.success('API key regenerated successfully')
            }
        } catch (error) {
            console.error('Failed to regenerate API key:', error)
            toast.error('Failed to regenerate API key: ' + error)
        }
    }

    const initApp = async (): Promise<'success' | 'failed'> => {
        if (isInitialized.value && userData.value) {
            // toast.info('App already initialized with user data')
            console.log('App already initialized with user data')
            return 'success'
        }

        toast.info('Initializing App')
        console.log('Initializing App')
        try {
            const token = await getToken()
            if (!token) {
                throw new Error('No token provided')
            }

            await userDataFromSentry(token)

            isInitialized.value = true
            toast.success('App initialized successfully')
            return 'success'
        } catch (error) {
            toast.error('Failed to initialize app')
            console.error('Failed to initialize app:', error)
            isInitialized.value = false
            return 'failed'
        }
    }

    return {
        userData,
        isInitialized,
        initApp,
        userDataFromSentry,
        updateApiKey
    }
} 