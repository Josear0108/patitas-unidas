import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { AuthUserSchema, type AuthUser } from '@patitas/types'

export type { AuthUser }

const AUTH_KEY = ['auth', 'me'] as const

/**
 * Llama a /auth/me y expone el usuario autenticado.
 *
 * El estado de autenticación se determina exclusivamente llamando a /auth/me.
 * Si la cookie httpOnly está ausente o expirada, el backend responde 401
 * y query.data queda como null (usuario no autenticado).
 * logout() limpia el caché de TanStack Query y espera a que el backend
 * invalide la cookie antes de redirigir.
 */
export function useAuth() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: AUTH_KEY,
    queryFn: async (): Promise<AuthUser> => {
      const res = await apiClient.get('/auth/me')
      return AuthUserSchema.parse(res.data)
    },
    // Reintentos no son útiles aquí — si falla es porque el token expiró
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutos
  })

  async function logout() {
    queryClient.clear()
    try { await apiClient.post('/auth/logout') } catch { /* ignore */ }
    window.location.href = '/'
  }

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
    logout,
  }
}
