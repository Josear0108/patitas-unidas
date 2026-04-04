import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'

/**
 * Página /auth/callback
 *
 * El backend de Google OAuth redirige aquí con ?token=JWT después de que
 * el usuario se autenticó con Google. Esta página:
 * 1. Lee el token de la URL
 * 2. Lo guarda en localStorage
 * 3. Invalida la query de auth para que useAuth() recargue el usuario
 * 4. Redirige al home
 *
 * Si no hay token en la URL, redirige al home de todos modos
 * (el usuario verá la UI como no autenticado).
 */
export function AuthCallbackPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }) // Invalida la query de auth para que useAuth() recargue el usuario
    navigate('/')
  }, [navigate, queryClient])

  return (
    <div className="flex items-center justify-center min-h-screen gap-3">
      <Spinner className="h-8 w-8" />
      <p className="text-muted-foreground">Iniciando sesión...</p>
    </div>
  )
}
