import { useState } from 'react'
import type { AdminFoundationRequest } from '@patitas/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronDown, ChevronUp, Mail, Phone, MapPin } from 'lucide-react'
import { useApproveRequest, useRejectRequest } from '../hooks/useAdmin'
import { RejectRequestModal } from './RejectRequestModal'

interface RequestCardProps {
  request: AdminFoundationRequest
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function isNew(createdAt: string): boolean {
  const diff = Date.now() - new Date(createdAt).getTime()
  return diff < 24 * 60 * 60 * 1000
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const STATUS_BADGE: Record<
  AdminFoundationRequest['status'],
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  PENDING: { label: 'Pendiente', variant: 'secondary' },
  APPROVED: { label: 'Aprobada', variant: 'default' },
  REJECTED: { label: 'Rechazada', variant: 'destructive' },
  CANCELLED: { label: 'Cancelada', variant: 'outline' },
}

/**
 * Tarjeta individual de solicitud de verificación en el panel admin.
 * Permite ver detalles colapsables, aprobar y rechazar la solicitud.
 */
export function RequestCard({ request }: RequestCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)

  const approve = useApproveRequest()
  const reject = useRejectRequest()

  const isMutating = approve.isPending || reject.isPending
  const statusInfo = STATUS_BADGE[request.status]
  const showNew = isNew(request.created_at)

  function handleApprove() {
    if (isMutating) return
    approve.mutate(request.id)
  }

  function handleRejectConfirm(reason: string) {
    reject.mutate(
      { requestId: request.id, reason },
      {
        onSuccess: () => setRejectOpen(false),
      },
    )
  }

  const isPendingStatus = request.status === 'PENDING'

  return (
    <>
      <div className="rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
        {/* Main row */}
        <div className="flex items-start gap-4 p-4 md:p-5">
          {/* Avatar */}
          <div className="shrink-0">
            {request.user.avatar_url ? (
              <img
                src={request.user.avatar_url}
                alt={request.user.name}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {getInitials(request.user.name)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-base leading-tight truncate">
                {request.foundation_name}
              </h3>
              {showNew && (
                <Badge variant="default" className="text-[10px] px-1.5 py-0 shrink-0">
                  NUEVA
                </Badge>
              )}
              <Badge variant={statusInfo.variant} className="text-[10px] px-1.5 py-0 shrink-0">
                {statusInfo.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {request.user.name} · {formatDate(request.created_at)} · {request.city},{' '}
              {request.country}
            </p>
          </div>

          {/* Actions — desktop inline */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded((prev) => !prev)}
              className="gap-1"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ocultar
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Ver Detalles
                </>
              )}
            </Button>

            {isPendingStatus && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => setRejectOpen(true)}
                  disabled={isMutating}
                >
                  Rechazar
                </Button>
                <Button
                  size="sm"
                  onClick={handleApprove}
                  disabled={isMutating}
                >
                  {approve.isPending ? 'Aprobando...' : 'Aprobar'}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Actions — mobile stacked */}
        <div className="flex sm:hidden items-center gap-2 px-4 pb-4 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((prev) => !prev)}
            className="gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Ocultar
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Ver Detalles
              </>
            )}
          </Button>

          {isPendingStatus && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive hover:bg-destructive/10"
                onClick={() => setRejectOpen(true)}
                disabled={isMutating}
              >
                Rechazar
              </Button>
              <Button
                size="sm"
                onClick={handleApprove}
                disabled={isMutating}
              >
                {approve.isPending ? 'Aprobando...' : 'Aprobar'}
              </Button>
            </>
          )}
        </div>

        {/* Expanded details panel */}
        {expanded && (
          <>
            <Separator />
            <div className="p-4 md:p-5 space-y-4">
              {/* Description */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Descripción
                </p>
                <p className="text-sm leading-relaxed">{request.brief_description}</p>
              </div>

              {/* Contact info */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Datos de contacto
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <a
                      href={`mailto:${request.contact_email}`}
                      className="text-primary hover:underline truncate"
                    >
                      {request.contact_email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{request.contact_phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>
                      {request.city}, {request.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rejection reason if present */}
              {request.rejection_reason && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
                  <p className="text-xs font-medium text-destructive uppercase tracking-wide mb-1">
                    Razón de rechazo
                  </p>
                  <p className="text-sm">{request.rejection_reason}</p>
                </div>
              )}

              {/* Reviewed at */}
              {request.reviewed_at && (
                <p className="text-xs text-muted-foreground">
                  Revisada el {formatDate(request.reviewed_at)}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <RejectRequestModal
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        request={request}
        onConfirm={handleRejectConfirm}
        isPending={reject.isPending}
      />
    </>
  )
}
