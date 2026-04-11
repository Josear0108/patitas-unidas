import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../api/adminService'
import type { AdminRequestsParams } from '../api/IAdminService'
import { apiClient } from '../../../lib/api'

export interface AdminStats {
  total: number
  pending: number
  uniqueCities: number
}

export const adminKeys = {
  all: ['admin'] as const,
  requests: (params?: AdminRequestsParams) =>
    ['admin', 'requests', params ?? {}] as const,
  stats: ['admin', 'stats'] as const,
}

/**
 * Obtiene los KPIs globales del panel admin desde el endpoint /admin/stats.
 */
export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: adminKeys.stats,
    queryFn: () => apiClient.get('/admin/stats').then((r) => r.data),
  })
}

/**
 * Obtiene la lista paginada de solicitudes de verificación de fundaciones.
 * Acepta parámetros opcionales de filtrado y paginación.
 */
export function useAdminRequests(params?: AdminRequestsParams) {
  return useQuery({
    queryKey: adminKeys.requests(params),
    queryFn: () => adminService.getRequests(params),
    retry: false,
  })
}

/**
 * Aprueba una solicitud de verificación.
 * Invalida el caché de solicitudes para reflejar el nuevo estado.
 */
export function useApproveRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestId: string) => adminService.approveRequest(requestId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] })
    },
  })
}

/**
 * Rechaza una solicitud de verificación con una razón obligatoria.
 * Invalida el caché de solicitudes para reflejar el nuevo estado.
 */
export function useRejectRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ requestId, reason }: { requestId: string; reason: string }) =>
      adminService.rejectRequest(requestId, reason),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] })
    },
  })
}
