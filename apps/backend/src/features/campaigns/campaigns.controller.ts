import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'
import { Prisma } from '../../../generated/prisma/client.js'
import type { campaign_status, campaign_type } from '../../../generated/prisma/client.js'
import { CampaignQuerySchema, CampaignParamSchema, CampaignSlugParamSchema, PaginationQuerySchema } from '@patitas/types'

// =============================================================================
// Helpers privados
// =============================================================================

/** Días restantes hasta end_date. Retorna null si la campaña no tiene fecha límite. */
function computeDaysLeft(endDate: Date | null): number | null {
  if (!endDate) return null
  return Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / 86_400_000))
}

/** Convierte una fila de Prisma al formato de respuesta de resumen. */
function mapCampaign(c: {
  id: string
  title: string
  slug: string
  foundation_id: string
  animal_id: string | null
  image_url: string | null
  description: string | null
  type: campaign_type
  status: campaign_status
  raised_amount: Prisma.Decimal
  goal_amount: Prisma.Decimal | null
  currency: string
  donor_count: number
  end_date: Date | null
  is_urgent: boolean
  created_at: Date
}) {
  return {
    id: c.id,
    title: c.title,
    slug: c.slug,
    foundationId: c.foundation_id,
    animalId: c.animal_id,
    imageUrl: c.image_url,
    description: c.description,
    type: c.type,
    status: c.status,
    raisedAmount: Number(c.raised_amount),
    goalAmount: c.goal_amount ? Number(c.goal_amount) : null,
    currency: c.currency,
    donorCount: c.donor_count,
    daysLeft: computeDaysLeft(c.end_date),
    isUrgent: c.is_urgent,
    createdAt: c.created_at.toISOString(),
  }
}

/**
 * Consulta una campaña por identificador único (id o slug) incluyendo
 * actualizaciones, recompensas y top 5 donantes ordenados por monto.
 */
async function fetchCampaignWithDetails(where: Prisma.campaignsWhereUniqueInput) {
  return prisma.campaigns.findUnique({
    where,
    include: {
      campaign_updates: { orderBy: { created_at: 'desc' } },
      campaign_rewards: { orderBy: { minimum_amount: 'asc' } },
      donations: {
        orderBy: { amount: 'desc' },
        take: 5,
        select: { donor_name: true, amount: true, created_at: true },
      },
    },
  })
}

/** Construye la respuesta detallada de una campaña a partir del resultado de Prisma. */
function buildCampaignDetailResponse(campaign: NonNullable<Awaited<ReturnType<typeof fetchCampaignWithDetails>>>) {
  return {
    ...mapCampaign(campaign),
    updates: campaign.campaign_updates.map(u => ({
      date: u.created_at.toISOString(),
      message: u.content,
    })),
    rewards: campaign.campaign_rewards.map(r => ({
      minimumAmount: Number(r.minimum_amount),
      title: r.title,
      description: r.description,
    })),
    topDonors: campaign.donations.map(d => ({
      name: d.donor_name,
      amount: Number(d.amount),
      daysAgo: Math.floor((Date.now() - d.created_at.getTime()) / 86_400_000),
    })),
  }
}

// =============================================================================
// Endpoints
// =============================================================================

/**
 * GET /api/v1/campaigns?page=1&limit=20
 * Lista campañas con filtros opcionales: status, type, is_urgent, foundation_id.
 * Por defecto retorna solo campañas ACTIVE.
 * Retorna respuesta paginada con metadata: total, page, limit, totalPages.
 */
export async function getCampaigns(req: Request, res: Response) {
  const filterParsed = CampaignQuerySchema.safeParse(req.query)
  if (!filterParsed.success) {
    res.status(400).json({ error: 'Parámetros inválidos', details: filterParsed.error.flatten().fieldErrors })
    return
  }

  const pageParsed = PaginationQuerySchema.safeParse(req.query)
  if (!pageParsed.success) {
    res.status(400).json({ error: 'Parámetros de paginación inválidos', details: pageParsed.error.flatten().fieldErrors })
    return
  }

  const { status, type, is_urgent: isUrgent, foundation_id: foundationId } = filterParsed.data
  const { page, limit } = pageParsed.data

  const where = {
    // Siempre se muestran solo campañas ACTIVE en el catálogo público
    status: 'ACTIVE' as const,
    ...(type ? { type } : {}),
    ...(isUrgent ? { is_urgent: true } : {}),
    ...(foundationId ? { foundation_id: foundationId } : {}),
  }

  try {
    const [campaigns, total] = await Promise.all([
      prisma.campaigns.findMany({
        where,
        orderBy: [{ is_urgent: 'desc' }, { created_at: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.campaigns.count({ where }),
    ])

    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
    res.json({
      data: campaigns.map(mapCampaign),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    throw err
  }
}

/**
 * GET /api/v1/campaigns/:id
 * Retorna el detalle completo de una campaña por UUID,
 * incluyendo actualizaciones, recompensas y top donantes.
 */
export async function getCampaignById(req: Request, res: Response) {
  const parsed = CampaignParamSchema.safeParse(req.params)
  if (!parsed.success) { res.status(400).json({ error: 'ID inválido' }); return }

  try {
    const campaign = await fetchCampaignWithDetails({ id: parsed.data.id })
    if (!campaign || campaign.status !== 'ACTIVE') { res.status(404).json({ error: 'Campaña no encontrada' }); return }
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
    res.json(buildCampaignDetailResponse(campaign))
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: 'Campaña no encontrada' })
      return
    }
    throw err
  }
}

/**
 * GET /api/v1/campaigns/slug/:slug
 * Igual que getCampaignById pero busca por slug en lugar de UUID.
 * Útil para URLs amigables en el frontend.
 */
export async function getCampaignBySlug(req: Request, res: Response) {
  const parsed = CampaignSlugParamSchema.safeParse(req.params)
  if (!parsed.success) { res.status(400).json({ error: 'Slug inválido' }); return }

  try {
    const campaign = await fetchCampaignWithDetails({ slug: parsed.data.slug })
    if (!campaign || campaign.status !== 'ACTIVE') { res.status(404).json({ error: 'Campaña no encontrada' }); return }
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
    res.json(buildCampaignDetailResponse(campaign))
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: 'Campaña no encontrada' })
      return
    }
    throw err
  }
}
