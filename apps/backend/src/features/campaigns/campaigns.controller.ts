import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'
import type { campaign_status, campaign_type, Prisma } from '../../../generated/prisma/client.js'

function computeDaysLeft(endDate: Date | null): number | null {
  if (!endDate) return null
  return Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / 86_400_000))
}

function str(val: unknown): string | undefined {
  return typeof val === 'string' ? val : undefined
}

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

export async function getCampaigns(req: Request, res: Response) {
  const status = str(req.query['status'])
  const type = str(req.query['type'])
  const isUrgent = req.query['is_urgent'] === 'true'
  const foundationId = str(req.query['foundation_id'])

  const campaigns = await prisma.campaigns.findMany({
    where: {
      status: (status ?? 'ACTIVE') as campaign_status,
      ...(type ? { type: type as campaign_type } : {}),
      ...(isUrgent ? { is_urgent: true } : {}),
      ...(foundationId ? { foundation_id: foundationId } : {}),
    },
    orderBy: [{ is_urgent: 'desc' }, { created_at: 'desc' }],
  })

  res.json(campaigns.map(mapCampaign))
}

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

export async function getCampaignById(req: Request, res: Response) {
  const campaign = await fetchCampaignWithDetails({ id: String(req.params['id']) })
  if (!campaign) { res.status(404).json({ error: 'Campaña no encontrada' }); return }
  res.json(buildCampaignDetailResponse(campaign))
}

export async function getCampaignBySlug(req: Request, res: Response) {
  const campaign = await fetchCampaignWithDetails({ slug: String(req.params['slug']) })
  if (!campaign) { res.status(404).json({ error: 'Campaña no encontrada' }); return }
  res.json(buildCampaignDetailResponse(campaign))
}
