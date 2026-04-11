import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'

/**
 * Página /auth/callback
 *
 * Google OAuth redirige aquí tras una autenticación exitosa. El JWT ya fue
 * establecido como cookie httpOnly por el backend; no hay token en la URL.
 * Esta página invalida la caché de /auth/me para que React vuelva a obtener
 * el usuario autenticado y luego navega al home.
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
