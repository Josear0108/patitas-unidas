import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { z } from 'zod'

/**
 * Schema del usuario que retorna /auth/me.
 * Definido aquí porque no forma parte de los schemas compartidos de @patitas/types
 * (son datos del servidor de auth, no del dominio animal/fundación/campaña).
 */
const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  role: z.enum(['SUPER_ADMIN', 'FOUNDATION_ADMIN', 'VERIFIED_USER', 'VISITOR']),
  foundation_id: z.string().nullable(),
})

export type AuthUser = z.infer<typeof AuthUserSchema>

const AUTH_KEY = ['auth', 'me'] as const

/**
 * Lee el JWT de localStorage, llama a /auth/me y expone el usuario.
 *
 * - Si no hay token en localStorage → no hace ninguna petición (enabled: false).
 * - Si el token es inválido o expiró → la petición falla y el usuario queda como null.
 * - logout() borra el token y limpia el caché de TanStack Query.
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

  function logout() {
    localStorage.removeItem('token')
    queryClient.clear()
    // Llamada fire-and-forget al backend (no bloqueamos la UI)
    apiClient.post('/auth/logout').catch(() => {})
    // Recarga la página para que React lea localStorage desde cero
    window.location.href = '/'
  }

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
    logout,
  }
}
