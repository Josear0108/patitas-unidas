import { z } from 'zod'
import { PaginatedResponseSchema } from './pagination.schema.js'

export const FoundationRequestCreateSchema = z.object({
  foundation_name: z.string().min(1).max(255),
  country: z.string().default('Colombia'),
  city: z.string().min(1).max(255),
  contact_phone: z.string().regex(/^\d+$/, 'Solo números').max(50),
  contact_email: z.string().email(),
  brief_description: z.string().min(50).max(500),
})
export type FoundationRequestCreate = z.infer<typeof FoundationRequestCreateSchema>

export const FoundationRequestSchema = z.object({
  id: z.string().uuid(),
  foundation_name: z.string(),
  country: z.string(),
  city: z.string(),
  contact_phone: z.string(),
  contact_email: z.string(),
  brief_description: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']),
  rejection_reason: z.string().nullable(),
  created_at: z.string(),
  reviewed_at: z.string().nullable(),
})
export type FoundationRequest = z.infer<typeof FoundationRequestSchema>

export const AdminFoundationRequestSchema = z.object({
  id: z.string().uuid(),
  foundation_name: z.string(),
  country: z.string(),
  city: z.string(),
  contact_phone: z.string(),
  contact_email: z.string(),
  brief_description: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']),
  rejection_reason: z.string().nullable(),
  created_at: z.string(),
  reviewed_at: z.string().nullable(),
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    avatar_url: z.string().nullable(),
  }),
})
export type AdminFoundationRequest = z.infer<typeof AdminFoundationRequestSchema>

export const AdminRejectRequestSchema = z.object({
  reason: z.string().min(10, 'La razón debe tener al menos 10 caracteres'),
})
export type AdminRejectRequest = z.infer<typeof AdminRejectRequestSchema>

export const AdminRequestListResponseSchema = PaginatedResponseSchema(AdminFoundationRequestSchema)
export type AdminRequestListResponse = z.infer<typeof AdminRequestListResponseSchema>
