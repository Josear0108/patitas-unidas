import { useState } from 'react'
import { Users } from 'lucide-react'
import { PageWrapper } from '@/components/shared'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth'
import { useMyRequest } from '../hooks/useVerification'
import { VerificationRequestForm } from '../components/VerificationRequestForm'
import { RequestStatusCard } from '../components/RequestStatusCard'

/**
 * Página de verificación de fundación del usuario autenticado.
 *
 * Flujo de estados:
 * - Sin solicitud (null) o solicitud CANCELLED → muestra el formulario
 * - Solicitud PENDING / REJECTED / APPROVED → muestra la tarjeta de estado
 * - El usuario puede forzar mostrar el formulario de nuevo via onRetry (caso REJECTED)
 */
export function MyRequestsPage() {
  const { user } = useAuth()
  const { data: request, isLoading } = useMyRequest()
  const [showForm, setShowForm] = useState(false)

  const shouldShowForm =
    showForm ||
    request === null ||
    request?.status === 'CANCELLED'

  return (
    <PageWrapper>
      {/* Hero pequeño */}
      <div className="text-center py-8 md:py-12 px-4">
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">
          Proceso de Verificación
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Verificar mi fundación
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Únete a nuestra red de refugios. Validamos cada historia para garantizar que la
          ayuda llegue a quienes más la necesitan.
        </p>
      </div>

      {/* Contenido dinámico */}
      <div className="container px-4 md:px-6 pb-16">
        <div className="max-w-lg mx-auto space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Spinner className="h-8 w-8" />
            </div>
          ) : shouldShowForm ? (
            <>
              <VerificationRequestForm userEmail={user?.email ?? ''} />
              {/* Social proof — debajo del form, antes del fold en desktop */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-4 py-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  Más de 150 fundaciones ya confían en nosotros
                </div>
              </div>
            </>
          ) : request != null ? (
            <RequestStatusCard
              request={request}
              onRetry={() => setShowForm(true)}
            />
          ) : null}
        </div>
      </div>
    </PageWrapper>
  )
}
