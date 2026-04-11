import {
  AdminFoundationRequestSchema,
  AdminRequestListResponseSchema,
} from '@patitas/types'
import type { AdminFoundationRequest, AdminRequestListResponse } from '@patitas/types'
import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import type { AdminRequestsParams, IAdminService } from './IAdminService'

// ---------------------------------------------------------------------------
// Mock data — representa el estado inicial del panel admin sin backend
// ---------------------------------------------------------------------------

const NOW = new Date()

function daysAgo(days: number): string {
  const d = new Date(NOW)
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

function hoursAgo(hours: number): string {
  const d = new Date(NOW)
  d.setHours(d.getHours() - hours)
  return d.toISOString()
}

const MOCK_REQUESTS: AdminFoundationRequest[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    foundation_name: 'Refugio Esperanza Animal',
    country: 'Ecuador',
    city: 'Quito',
    contact_phone: '0991234567',
    contact_email: 'carlos@esperanzaanimal.org',
    brief_description:
      'Refugio de rescate y adopción responsable con más de 10 años de trayectoria en Quito. Atendemos perros y gatos en situación de calle, brindamos atención veterinaria de emergencia y promovemos la adopción responsable a través de campañas comunitarias.',
    status: 'PENDING',
    rejection_reason: null,
    created_at: hoursAgo(3),
    reviewed_at: null,
    user: {
      id: 'aaaa1111-aaaa-1111-aaaa-aaaaaaaaaaaa',
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@gmail.com',
      avatar_url: null,
    },
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    foundation_name: 'Patitas Felices Guayaquil',
    country: 'Ecuador',
    city: 'Guayaquil',
    contact_phone: '0987654321',
    contact_email: 'elena@patitasfelices.org',
    brief_description:
      'Fundación dedicada al rescate de animales maltratados y abandonados en la región costera del Ecuador. Contamos con un equipo de 20 voluntarios activos, clínica veterinaria propia y programa de esterilización gratuita para familias de bajos recursos.',
    status: 'PENDING',
    rejection_reason: null,
    created_at: daysAgo(1),
    reviewed_at: null,
    user: {
      id: 'bbbb2222-bbbb-2222-bbbb-bbbbbbbbbbbb',
      name: 'Elena Rodríguez',
      email: 'elena.rodriguez@gmail.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    },
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    foundation_name: 'Hogar Animal Cuenca',
    country: 'Ecuador',
    city: 'Cuenca',
    contact_phone: '0976543210',
    contact_email: 'roberto@hogaranimal.org',
    brief_description:
      'Organización sin fines de lucro enfocada en el bienestar animal en la sierra austral del Ecuador. Gestionamos un hogar de paso con capacidad para 80 animales, coordinamos redes de hogares de tránsito y realizamos jornadas de adopción mensualmente en Cuenca y sus alrededores.',
    status: 'PENDING',
    rejection_reason: null,
    created_at: daysAgo(3),
    reviewed_at: null,
    user: {
      id: 'cccc3333-cccc-3333-cccc-cccccccccccc',
      name: 'Roberto Silva',
      email: 'roberto.silva@gmail.com',
      avatar_url: null,
    },
  },
]

// Internal mutable state so approve/reject mutations are reflected in the mock
let _mockRequests: AdminFoundationRequest[] = MOCK_REQUESTS.map((r) => ({ ...r }))

function applyParamFilters(
  requests: AdminFoundationRequest[],
  params?: AdminRequestsParams,
): AdminFoundationRequest[] {
  let filtered = [...requests]

  if (params?.status) {
    filtered = filtered.filter((r) => r.status === params.status)
  }
  if (params?.city) {
    filtered = filtered.filter((r) =>
      r.city.toLowerCase().includes(params.city!.toLowerCase()),
    )
  }

  return filtered
}

const mockService: IAdminService = {
  async getRequests(params?: AdminRequestsParams): Promise<AdminRequestListResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    const filtered = applyParamFilters(_mockRequests, params)
    const page = params?.page ?? 1
    const limit = params?.limit ?? 15
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return {
      data: paginated,
      meta: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
      },
    }
  },

  async approveRequest(requestId: string): Promise<AdminFoundationRequest> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const idx = _mockRequests.findIndex((r) => r.id === requestId)
    if (idx === -1) throw new Error('Solicitud no encontrada')

    _mockRequests[idx] = {
      ..._mockRequests[idx]!,
      status: 'APPROVED',
      reviewed_at: new Date().toISOString(),
    }

    return _mockRequests[idx]!
  },

  async rejectRequest(requestId: string, reason: string): Promise<AdminFoundationRequest> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const idx = _mockRequests.findIndex((r) => r.id === requestId)
    if (idx === -1) throw new Error('Solicitud no encontrada')

    _mockRequests[idx] = {
      ..._mockRequests[idx]!,
      status: 'REJECTED',
      rejection_reason: reason,
      reviewed_at: new Date().toISOString(),
    }

    return _mockRequests[idx]!
  },
}

// ---------------------------------------------------------------------------
// Real service — calls the backend API and validates with Zod schemas
// ---------------------------------------------------------------------------

const realService: IAdminService = {
  async getRequests(params?: AdminRequestsParams): Promise<AdminRequestListResponse> {
    const res = await apiClient.get('/admin/requests', { params })
    return AdminRequestListResponseSchema.parse(res.data)
  },

  async approveRequest(requestId: string): Promise<AdminFoundationRequest> {
    const res = await apiClient.patch(`/admin/requests/${requestId}/approve`)
    return AdminFoundationRequestSchema.parse(res.data.data)
  },

  async rejectRequest(requestId: string, reason: string): Promise<AdminFoundationRequest> {
    const res = await apiClient.patch(`/admin/requests/${requestId}/reject`, { reason })
    return AdminFoundationRequestSchema.parse(res.data.data)
  },
}

export const adminService: IAdminService = USE_REAL_API ? realService : mockService
