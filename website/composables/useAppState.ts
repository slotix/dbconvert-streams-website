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
            if (!result?.apiKey) {
                throw new Error('No API key received')
            }

            // Just update the API key since that's all that changes
            if (userData.value) {
                userData.value.apiKey = result.apiKey
            }
            toast.success('API key updated successfully')
        } catch (error) {
            if (error instanceof Error) {
                console.error('Failed to update API key:', error.message)
                if (error.message.includes('Authentication error')) {
                    toast.error('Session expired. Please refresh the page and try again.')
                } else {
                    toast.error('Failed to update API key. Please try again.')
                }
            } else {
                console.error('Failed to update API key:', error)
                toast.error('Failed to update API key. Please try again.')
            }
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