import { FoundationRequestSchema } from '@patitas/types'
import type { FoundationRequest, FoundationRequestCreate } from '@patitas/types'
import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import type { IVerificationService } from './IVerificationService'

// Estado mock interno: simula que el usuario no tiene solicitud al inicio.
// En una sesión mock, se actualiza al crear / cancelar para reflejar el flujo completo.
let _mockRequest: FoundationRequest | null = null

const mockService: IVerificationService = {
  async getMyRequest() {
    return _mockRequest
  },

  async createRequest(data: FoundationRequestCreate) {
    const request: FoundationRequest = {
      id: crypto.randomUUID(),
      foundation_name: data.foundation_name,
      country: data.country,
      city: data.city,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
      brief_description: data.brief_description,
      status: 'PENDING',
      rejection_reason: null,
      created_at: new Date().toISOString(),
      reviewed_at: null,
    }
    _mockRequest = request
    return request
  },

  async cancelRequest() {
    if (!_mockRequest) {
      throw new Error('No hay solicitud activa para cancelar')
    }
    _mockRequest = { ..._mockRequest, status: 'CANCELLED' }
    return _mockRequest
  },
}

const realService: IVerificationService = {
  async getMyRequest() {
    const res = await apiClient.get('/verification/mine')
    // El backend retorna { data: FoundationRequest | null }
    if (res.data.data === null) return null
    return FoundationRequestSchema.parse(res.data.data)
  },

  async createRequest(data: FoundationRequestCreate) {
    const res = await apiClient.post('/verification/requests', data)
    return FoundationRequestSchema.parse(res.data.data)
  },

  async cancelRequest() {
    const res = await apiClient.patch('/verification/requests/mine/cancel')
    return FoundationRequestSchema.parse(res.data.data)
  },
}

export const verificationService: IVerificationService = USE_REAL_API
  ? realService
  : mockService
