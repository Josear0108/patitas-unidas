import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'
import type { Prisma } from '../../../generated/prisma/client.js'

function computeYearsActive(foundedAt: Date | null): number {
  if (!foundedAt) return 0
  return new Date().getFullYear() - foundedAt.getFullYear()
}

function buildLocation(city: string | null, country: string): string {
  return city ? `${city}, ${country}` : country
}

export async function getFoundations(_req: Request, res: Response) {
  const foundations = await prisma.foundations.findMany({
    where: { status: 'PUBLIC' },
    include: {
      _count: { select: { animals: true } },
      foundation_achievements: { select: { description: true } },
    },
    orderBy: { created_at: 'desc' },
  })

  const rescuedCounts = await prisma.animals.groupBy({
    by: ['foundation_id'],
    where: {
      foundation_id: { in: foundations.map(f => f.id) },
      status: 'ADOPTED',
    },
    _count: { id: true },
  })

  const rescuedMap = new Map(rescuedCounts.map(r => [r.foundation_id, r._count.id]))

  const result = foundations.map(f => ({
    id: f.id,
    name: f.name,
    slug: f.slug,
    tagline: f.tagline,
    logoUrl: f.logo_url,
    bannerUrl: f.banner_url,
    location: buildLocation(f.city, f.country),
    isVerified: f.is_verified,
    stats: {
      currentAnimals: f._count.animals,
      animalsRescued: rescuedMap.get(f.id) ?? 0,
      yearsActive: computeYearsActive(f.founded_at),
    },
    achievements: f.foundation_achievements.map(a => a.description),
  }))

  res.json(result)
}

export async function getFoundationById(req: Request, res: Response) {
  const id = String(req.params['id'])

  const where: Prisma.foundationsWhereInput = { id, status: 'PUBLIC' }

  const foundation = await prisma.foundations.findFirst({
    where,
    include: {
      _count: { select: { animals: { where: { status: 'AVAILABLE' } } } },
      foundation_achievements: { select: { description: true } },
      animals: {
        where: { status: 'AVAILABLE' },
        include: {
          animal_photos: { where: { is_primary: true }, select: { url: true } },
        },
        take: 8,
        orderBy: { is_urgent: 'desc' },
      },
      campaigns: {
        where: { status: 'ACTIVE' },
        take: 4,
        orderBy: { created_at: 'desc' },
      },
    },
  })

  if (!foundation) {
    res.status(404).json({ error: 'Fundación no encontrada' })
    return
  }

  const animalsRescued = await prisma.animals.count({
    where: { foundation_id: foundation.id, status: 'ADOPTED' },
  })

  const result = {
    id: foundation.id,
    name: foundation.name,
    slug: foundation.slug,
    tagline: foundation.tagline,
    description: foundation.description,
    mission: foundation.mission,
    vision: foundation.vision,
    logoUrl: foundation.logo_url,
    bannerUrl: foundation.banner_url,
    location: buildLocation(foundation.city, foundation.country),
    foundedYear: foundation.founded_at ? foundation.founded_at.getFullYear() : null,
    isVerified: foundation.is_verified,
    contact: {
      phone: foundation.phone,
      email: foundation.email,
      website: foundation.website,
    },
    stats: {
      currentAnimals: foundation._count.animals,
      animalsRescued,
      yearsActive: computeYearsActive(foundation.founded_at),
    },
    achievements: foundation.foundation_achievements.map(a => a.description),
    animals: foundation.animals.map(a => ({
      id: a.id,
      name: a.name,
      imageUrl: a.animal_photos[0]?.url ?? null,
      isUrgent: a.is_urgent,
    })),
    activeCampaigns: foundation.campaigns.map(c => {
      const daysLeft = c.end_date
        ? Math.max(0, Math.ceil((c.end_date.getTime() - Date.now()) / 86_400_000))
        : null
      return {
        id: c.id,
        title: c.title,
        raisedAmount: Number(c.raised_amount),
        goalAmount: c.goal_amount ? Number(c.goal_amount) : null,
        daysLeft,
      }
    }),
  }

  res.json(result)
}
