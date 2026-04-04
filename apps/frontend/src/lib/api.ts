import axios from 'axios'

const BASE_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:3000/api/v1'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Envía cookies con cada petición
})

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.error ?? `HTTP ${error.response?.status}`
    return Promise.reject(new Error(message))
  }
)

export async function apiFetch<T>(path: string, options?: Parameters<typeof apiClient.request>[0]): Promise<T> {
  const res = await apiClient.request<T>({ url: path, ...options })
  return res.data
}
