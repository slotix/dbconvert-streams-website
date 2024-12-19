import axios from 'axios'
import type { AxiosError, AxiosInstance } from 'axios'
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
            const response: ApiResponse<UserData> = await backendClient.get('/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return handleUnauthorizedError(error as AxiosError)
        }
    }
} 