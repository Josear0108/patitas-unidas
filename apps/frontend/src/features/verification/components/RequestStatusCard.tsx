import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import type { FoundationRequest } from '@patitas/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useCancelRequest } from '../hooks/useVerification'

interface RequestStatusCardProps {
  request: FoundationRequest
  onRetry: () => void
}

const STATUS_LABEL: Record<FoundationRequest['status'], string> = {
  PENDING: 'En revisión',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
  CANCELLED: 'Cancelada',
}

function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString))
}

function PendingCard({ request }: { request: FoundationRequest }) {
  const { mutate: cancelRequest, isPending } = useCancelRequest()
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleConfirmCancel() {
    cancelRequest(undefined, {
      onSuccess: () => setDialogOpen(false),
    })
  }

  return (
    <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 text-amber-500 shrink-0" />
        <h2 className="text-xl font-semibold">Solicitud en revisión</h2>
        <Badge variant="secondary" className="ml-auto">
          {STATUS_LABEL.PENDING}
        </Badge>
      </div>

      <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Fundación
          </p>
          <p className="font-medium mt-0.5">{request.foundation_name}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Fecha de solicitud
          </p>
          <p className="mt-0.5">{formatDate(request.created_at)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Ubicación
          </p>
          <p className="mt-0.5">
            {request.city}, {request.country}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Estamos revisando tu solicitud. Te notificaremos cuando tengamos una respuesta.
      </p>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Cancelar solicitud
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar solicitud?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción cancelará tu solicitud de verificación para{' '}
              <span className="font-medium text-foreground">{request.foundation_name}</span>.
              Podrás enviar una nueva solicitud en cualquier momento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Volver</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              disabled={isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isPending ? 'Cancelando...' : 'Sí, cancelar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function RejectedCard({
  request,
  onRetry,
}: {
  request: FoundationRequest
  onRetry: () => void
}) {
  return (
    <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
        <h2 className="text-xl font-semibold">Solicitud rechazada</h2>
        <Badge variant="destructive" className="ml-auto">
          {STATUS_LABEL.REJECTED}
        </Badge>
      </div>

      <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Fundación
          </p>
          <p className="font-medium mt-0.5">{request.foundation_name}</p>
        </div>
        {request.reviewed_at && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Revisada el
            </p>
            <p className="mt-0.5">{formatDate(request.reviewed_at)}</p>
          </div>
        )}
      </div>

      {request.rejection_reason && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Motivo del rechazo</AlertTitle>
          <AlertDescription>{request.rejection_reason}</AlertDescription>
        </Alert>
      )}

      <Button onClick={onRetry} className="w-full">
        Solicitar nuevamente
      </Button>
    </div>
  )
}

function ApprovedCard({ request }: { request: FoundationRequest }) {
  return (
    <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
        <h2 className="text-xl font-semibold">¡Solicitud aprobada!</h2>
        <Badge className="ml-auto bg-green-600 hover:bg-green-600/90 text-white border-transparent">
          {STATUS_LABEL.APPROVED}
        </Badge>
      </div>

      <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Fundación
          </p>
          <p className="font-medium mt-0.5">{request.foundation_name}</p>
        </div>
        {request.reviewed_at && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Aprobada el
            </p>
            <p className="mt-0.5">{formatDate(request.reviewed_at)}</p>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Ya puedes completar tu fundación y empezar a publicar animales en adopción.
      </p>

      <Button asChild className="w-full">
        <Link to="/mi-fundacion">Ir a Mi Fundación</Link>
      </Button>
    </div>
  )
}

/**
 * Muestra el estado actual de la solicitud de verificación del usuario.
 * Renderiza un componente distinto según el status de la solicitud.
 */
export function RequestStatusCard({ request, onRetry }: RequestStatusCardProps) {
  if (request.status === 'PENDING') {
    return <PendingCard request={request} />
  }

  if (request.status === 'REJECTED') {
    return <RejectedCard request={request} onRetry={onRetry} />
  }

  if (request.status === 'APPROVED') {
    return <ApprovedCard request={request} />
  }

  // CANCELLED es manejado por MyRequestsPage mostrando el formulario directamente
  return null
}
