import type { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import { prisma } from '../../lib/prisma.js'
import { AdminRejectRequestSchema } from '@patitas/types'
import type { Prisma } from '../../../generated/prisma/client.js'

function serializeAdminRequest(record: {
  id: string
  foundation_name: string
  country: string
  city: string
  contact_phone: string
  contact_email: string
  brief_description: string
  status: string
  rejection_reason: string | null
  created_at: Date
  reviewed_at: Date | null
  users_foundation_requests_user_idTousers: {
    id: string
    name: string
    email: string
    avatar_url: string | null
  }
}) {
  return {
    id: record.id,
    foundation_name: record.foundation_name,
    country: record.country,
    city: record.city,
    contact_phone: record.contact_phone,
    contact_email: record.contact_email,
    brief_description: record.brief_description,
    status: record.status,
    rejection_reason: record.rejection_reason,
    created_at: record.created_at.toISOString(),
    reviewed_at: record.reviewed_at?.toISOString() ?? null,
    user: {
      id: record.users_foundation_requests_user_idTousers.id,
      name: record.users_foundation_requests_user_idTousers.name,
      email: record.users_foundation_requests_user_idTousers.email,
      avatar_url: record.users_foundation_requests_user_idTousers.avatar_url,
    },
  }
}

function generateSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

async function findUniqueSlugTx(
  tx: Prisma.TransactionClient,
  base: string,
  max = 50,
): Promise<string> {
  const existing = await tx.foundations.findUnique({ where: { slug: base } })
  if (!existing) return base

  for (let counter = 2; counter <= max; counter++) {
    const candidate = `${base}-${counter}`
    const conflict = await tx.foundations.findUnique({ where: { slug: candidate } })
    if (!conflict) return candidate
  }

  // Fallback: guaranteed unique
  return `${base}-${randomUUID().slice(0, 8)}`
}

export async function getRequests(req: Request, res: Response) {
  const page = Math.max(1, parseInt(String(req.query['page'] ?? '1'), 10) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query['limit'] ?? '15'), 10) || 15))
  const status = req.query['status'] as string | undefined
  const city = req.query['city'] as string | undefined

  const where: Prisma.foundation_requestsWhereInput = {}
  if (status && ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'].includes(status)) {
    where['status'] = status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  }
  if (city) {
    where['city'] = { contains: city, mode: 'insensitive' }
  }

  const [total, records] = await Promise.all([
    prisma.foundation_requests.count({ where }),
    prisma.foundation_requests.findMany({
      where,
      include: { users_foundation_requests_user_idTousers: true },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ])

  res.json({
    data: records.map(serializeAdminRequest),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}

export async function approveRequest(req: Request, res: Response) {
  const requestId = req.params['requestId'] as string | undefined
  if (!requestId) { res.status(400).json({ error: 'ID requerido' }); return }

  const record = await prisma.foundation_requests.findFirst({
    where: { id: requestId, status: 'PENDING' },
    include: { users_foundation_requests_user_idTousers: true },
  })

  if (!record) {
    res.status(404).json({ error: 'Solicitud no encontrada o no está pendiente' })
    return
  }

  const updatedRequest = await prisma.$transaction(async (tx) => {
    const baseSlug = generateSlug(record.foundation_name)
    const slug = await findUniqueSlugTx(tx, baseSlug)

    const foundation = await tx.foundations.create({
      data: {
        name: record.foundation_name,
        slug,
        city: record.city,
        country: record.country,
        phone: record.contact_phone,
        email: record.contact_email,
        status: 'DRAFT',
        is_verified: false,
      },
    })

    await tx.users.update({
      where: { id: record.user_id },
      data: { role: 'FOUNDATION_ADMIN', foundation_id: foundation.id },
    })

    return tx.foundation_requests.update({
      where: { id: record.id },
      data: {
        status: 'APPROVED',
        reviewed_by: req.user!.id,
        reviewed_at: new Date(),
      },
      include: { users_foundation_requests_user_idTousers: true },
    })
  })

  res.json({ data: serializeAdminRequest(updatedRequest) })
}

export async function getStats(_req: Request, res: Response) {
  const [total, pending, cities] = await Promise.all([
    prisma.foundation_requests.count(),
    prisma.foundation_requests.count({ where: { status: 'PENDING' } }),
    prisma.foundation_requests.findMany({
      select: { city: true },
      distinct: ['city'],
    }),
  ])
  res.json({ total, pending, uniqueCities: cities.length })
}

export async function rejectRequest(req: Request, res: Response) {
  const parsed = AdminRejectRequestSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors })
    return
  }

  const requestId = req.params['requestId'] as string | undefined
  if (!requestId) { res.status(400).json({ error: 'ID requerido' }); return }

  const record = await prisma.foundation_requests.findFirst({
    where: { id: requestId, status: 'PENDING' },
  })

  if (!record) {
    res.status(404).json({ error: 'Solicitud no encontrada o no está pendiente' })
    return
  }

  const updated = await prisma.foundation_requests.update({
    where: { id: record.id },
    data: {
      status: 'REJECTED',
      rejection_reason: parsed.data.reason,
      reviewed_by: req.user!.id,
      reviewed_at: new Date(),
    },
    include: { users_foundation_requests_user_idTousers: true },
  })

  res.json({ data: serializeAdminRequest(updated) })
}
