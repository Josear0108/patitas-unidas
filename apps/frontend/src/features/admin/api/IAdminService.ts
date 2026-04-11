import type { AdminFoundationRequest, AdminRequestListResponse } from '@patitas/types'

export interface AdminRequestsParams {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  city?: string
  page?: number
  limit?: number
}

export interface IAdminService {
  getRequests(params?: AdminRequestsParams): Promise<AdminRequestListResponse>
  approveRequest(requestId: string): Promise<AdminFoundationRequest>
  rejectRequest(requestId: string, reason: string): Promise<AdminFoundationRequest>
}
