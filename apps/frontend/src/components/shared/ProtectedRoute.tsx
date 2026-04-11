import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import type { AuthUser } from '@/features/auth'
import { Spinner } from '@/components/ui/spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  role?: AuthUser['role'] | AuthUser['role'][]
}

/**
 * Protege rutas que requieren autenticación (y opcionalmente un rol específico).
 * - Si el estado de auth aún se está cargando → muestra un spinner centrado.
 * - Si el usuario no está autenticado → redirige a la raíz.
 * - Si `role` está definido y user.role !== role → redirige a la raíz.
 * - Si está autenticado (y tiene el rol correcto) → renderiza los children.
 */
export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, user } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (role !== undefined && !(Array.isArray(role) ? role.includes(user!.role) : user?.role === role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
