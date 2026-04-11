import { useState } from 'react'
import type { AdminFoundationRequest } from '@patitas/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const MIN_REASON_LENGTH = 10

interface RejectRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: AdminFoundationRequest
  onConfirm: (reason: string) => void
  isPending: boolean
}

/**
 * Modal para rechazar una solicitud de verificación.
 * Requiere que el admin escriba una razón de al menos 10 caracteres
 * que el solicitante verá en su panel.
 */
export function RejectRequestModal({
  open,
  onOpenChange,
  request,
  onConfirm,
  isPending,
}: RejectRequestModalProps) {
  const [reason, setReason] = useState('')

  const isValid = reason.trim().length >= MIN_REASON_LENGTH

  function handleConfirm() {
    if (!isValid || isPending) return
    onConfirm(reason.trim())
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isPending) {
      setReason('')
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rechazar solicitud</DialogTitle>
          <DialogDescription>
            Escribe la razón del rechazo. El solicitante la verá en su panel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Foundation name highlight */}
          <div className="rounded-md border bg-muted/50 px-4 py-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
              Fundación
            </p>
            <p className="font-semibold text-sm">{request.foundation_name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {request.user.name} · {request.city}, {request.country}
            </p>
          </div>

          {/* Reason textarea */}
          <div className="space-y-1.5">
            <label
              htmlFor="rejection-reason"
              className="text-sm font-medium leading-none"
            >
              Razón del rechazo
            </label>
            <Textarea
              id="rejection-reason"
              placeholder="Ej: La documentación presentada no cumple con los requisitos mínimos exigidos..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isPending}
              rows={4}
              className="resize-none"
            />
            <div className="flex items-center justify-between">
              {!isValid && reason.length > 0 ? (
                <p className="text-xs text-destructive">
                  Mínimo {MIN_REASON_LENGTH} caracteres
                </p>
              ) : (
                <span />
              )}
              <p
                className={`text-xs ml-auto ${
                  reason.length < MIN_REASON_LENGTH
                    ? 'text-muted-foreground'
                    : 'text-primary'
                }`}
              >
                {reason.length} caracteres
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isValid || isPending}
          >
            {isPending ? 'Rechazando...' : 'Rechazar solicitud'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
