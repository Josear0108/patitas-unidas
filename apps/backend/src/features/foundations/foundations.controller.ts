import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'
import { Prisma } from '../../../generated/prisma/client.js'
import { FoundationParamSchema, PaginationQuerySchema } from '@patitas/types'

// =============================================================================
// Helpers privados
// =============================================================================

/**
 * Años desde la fundación hasta hoy.
 * Nota: usa solo el año, no mes/día — puede reportar un año más si founded_at
 * es en diciembre y se consulta en enero del año siguiente.
 */
function computeYearsActive(foundedAt: Date | null): number {
  if (!foundedAt) return 0
  return new Date().getFullYear() - foundedAt.getFullYear()
}

/** Construye el string de ubicación combinando ciudad y país. */
function buildLocation(city: string | null, country: string): string {
  return city ? `${city}, ${country}` : country
}

// =============================================================================
// Endpoints
// =============================================================================

/**
 * GET /api/v1/foundations?page=1&limit=20
 * Lista todas las fundaciones con status PUBLIC.
 * El conteo de animales rescatados se calcula con groupBy para evitar N+1.
 * Retorna respuesta paginada con metadata: total, page, limit, totalPages.
 */
export async function getFoundations(req: Request, res: Response) {
  const pageParsed = PaginationQuerySchema.safeParse(req.query)
  if (!pageParsed.success) {
    res.status(400).json({ error: 'Parámetros de paginación inválidos', details: pageParsed.error.flatten().fieldErrors })
    return
  }

  const { page, limit } = pageParsed.data
  const where = { status: 'PUBLIC' as const }

  try {
    const [foundations, total] = await Promise.all([
      prisma.foundations.findMany({
        where,
        include: {
          _count: { select: { animals: true } },
          foundation_achievements: { select: { description: true } },
        },
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.foundations.count({ where }),
    ])

    // Una sola query agrupa los animales adoptados por fundación
    const rescuedCounts = await prisma.animals.groupBy({
      by: ['foundation_id'],
      where: {
        foundation_id: { in: foundations.map(f => f.id) },
        status: 'ADOPTED',
      },
      _count: { id: true },
    })

    const rescuedMap = new Map(rescuedCounts.map(r => [r.foundation_id, r._count.id]))

    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
    res.json({
      data: foundations.map(f => ({
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
      })),
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
 * GET /api/v1/foundations/:id
 * Retorna el detalle completo de una fundación pública por UUID.
 * Incluye hasta 8 animales disponibles (preview) y 4 campañas activas.
 * currentAnimals usa _count con where para el total real, independiente del slice de 8.
 */
export async function getFoundationById(req: Request, res: Response) {
  const parsed = FoundationParamSchema.safeParse(req.params)
  if (!parsed.success) {
    res.status(400).json({ error: 'ID inválido' })
    return
  }

  const { id } = parsed.data

  try {
    const foundation = await prisma.foundations.findFirst({
      where: { id, status: 'PUBLIC' },
      include: {
        // _count con where para el total real de animales disponibles
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

    // Segunda query necesaria: Prisma no soporta _count con where en includes anidados
    const animalsRescued = await prisma.animals.count({
      where: { foundation_id: foundation.id, status: 'ADOPTED' },
    })

    res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=300')
    res.json({
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
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: 'Fundación no encontrada' })
      return
    }
    throw err
  }
}
