import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = searchParams.get('token')

    if (token) {
      localStorage.setItem('token', token)
      // Forzamos que useAuth() vuelva a pedir /auth/me con el nuevo token
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    }

    // Siempre redirigimos al home, con token o sin él
    navigate('/', { replace: true })
  }, [searchParams, navigate, queryClient])

  return (
    <div className="flex items-center justify-center min-h-screen gap-3">
      <Spinner className="h-8 w-8" />
      <p className="text-muted-foreground">Iniciando sesión...</p>
    </div>
  )
}
