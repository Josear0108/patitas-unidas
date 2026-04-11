import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { verificationService } from '../api/verificationService'
import type { FoundationRequestCreate } from '@patitas/types'

export const verificationKeys = {
  mine: ['verification', 'mine'] as const,
}

/**
 * Obtiene la solicitud de verificación del usuario autenticado.
 * Retorna null si no tiene ninguna solicitud activa.
 */
export function useMyRequest() {
  return useQuery({
    queryKey: verificationKeys.mine,
    queryFn: () => verificationService.getMyRequest(),
    retry: false,
  })
}

/**
 * Crea una nueva solicitud de verificación de fundación.
 * Al completarse, invalida el caché para reflejar el nuevo estado.
 */
export function useCreateRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FoundationRequestCreate) =>
      verificationService.createRequest(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: verificationKeys.mine })
    },
  })
}

/**
 * Cancela la solicitud de verificación activa del usuario.
 * Al completarse, invalida el caché para reflejar el estado CANCELLED.
 */
export function useCancelRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => verificationService.cancelRequest(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: verificationKeys.mine })
    },
  })
}
