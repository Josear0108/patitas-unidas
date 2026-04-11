import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'
import { FoundationRequestCreateSchema } from '@patitas/types'

function serializeRequest(req: {
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
}) {
  return {
    id: req.id,
    foundation_name: req.foundation_name,
    country: req.country,
    city: req.city,
    contact_phone: req.contact_phone,
    contact_email: req.contact_email,
    brief_description: req.brief_description,
    status: req.status,
    rejection_reason: req.rejection_reason,
    created_at: req.created_at.toISOString(),
    reviewed_at: req.reviewed_at?.toISOString() ?? null,
  }
}

export async function getMyRequest(req: Request, res: Response) {
  const record = await prisma.foundation_requests.findFirst({
    where: { user_id: req.user!.id },
    orderBy: { created_at: 'desc' },
  })

  if (!record) {
    res.json({ data: null })
    return
  }

  res.json({ data: serializeRequest(record) })
}

export async function createRequest(req: Request, res: Response) {
  const parsed = FoundationRequestCreateSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors })
    return
  }

  if (req.user!.foundation_id !== null) {
    res.status(409).json({ error: 'Ya tienes una fundación registrada' })
    return
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.foundation_requests.findFirst({
        where: { user_id: req.user!.id, status: 'PENDING' },
      })
      if (existing) return null
      return tx.foundation_requests.create({
        data: {
          ...parsed.data,
          user_id: req.user!.id,
        },
      })
    })

    if (!result) {
      res.status(409).json({ error: 'Ya tienes una solicitud pendiente' })
      return
    }

    res.status(201).json({ data: serializeRequest(result) })
  } catch (err: any) {
    if (err?.code === 'P2002') {
      res.status(409).json({ error: 'Ya tienes una solicitud pendiente' })
      return
    }
    throw err
  }
}

export async function cancelMyRequest(req: Request, res: Response) {
  const record = await prisma.foundation_requests.findFirst({
    where: { user_id: req.user!.id, status: 'PENDING' },
  })

  if (!record) {
    res.status(404).json({ error: 'No tienes una solicitud pendiente' })
    return
  }

  const updated = await prisma.foundation_requests.update({
    where: { id: record.id },
    data: { status: 'CANCELLED' },
  })

  res.json({ data: serializeRequest(updated) })
}
