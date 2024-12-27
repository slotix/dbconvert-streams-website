import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'
import type { UserData } from '~/types/user'

export interface ApiResponse<T> {
    data: T
    status: number
}

const backendClient: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8020/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

const toast = useToast()

export const handleUnauthorizedError = (error: AxiosError) => {
    if (error.response?.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        navigateTo('/login')
    }
    throw error
}

export const api = {
    getUserDataFromSentry: async (token: string): Promise<UserData> => {
        try {
            toast.info('Fetching user data from sentry')
            console.log('Making API request with token:', token ? 'present' : 'missing')
            const response = await backendClient.get('/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success('User data fetched from sentry')
            console.log('API Response:', response.data)

            if (!response.data) {
                throw new Error('No data received from API')
            }

            return response.data
        } catch (error) {
            toast.error('Failed to fetch user data')
            console.error('API Error:', error)
            if (error instanceof AxiosError) {
                return handleUnauthorizedError(error)
            }
            throw error
        }
    }
} 