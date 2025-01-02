import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'
import type { UserData } from '~/types/user'

export interface ApiResponse<T> {
    data: T
    status: number
}

const backendClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8019',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

const toast = useToast()

export const api = {
    getUserDataFromSentry: async (token: string): Promise<UserData> => {
        try {
            console.log('Making API request with token:', token ? 'present' : 'missing')
            const response = await backendClient.get('/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('API Response:', response.data)

            if (!response.data) {
                throw new Error('No data received from API')
            }

            return response.data
        } catch (error) {
            console.error('API Error:', error)
            if (error instanceof AxiosError && error.response?.status === 401) {
                console.error('Authentication error - please try refreshing the page')
                throw new Error('Authentication error - please try refreshing the page')
            }
            throw error
        }
    },

    updateApiKey: async (token: string): Promise<{ apiKey: string }> => {
        try {
            const response = await backendClient.patch(
                '/user/api-key',
                {},
                { headers: { Authorization: `Bearer ${token}` } })

            if (!response.data?.apiKey) {
                throw new Error('No API key received from server')
            }

            return response.data
        } catch (error) {
            console.error('API Key update error:', error)
            if (error instanceof AxiosError && error.response?.status === 401) {
                throw new Error('Authentication error - please try refreshing the page')
            }
            throw error
        }
    }
} 