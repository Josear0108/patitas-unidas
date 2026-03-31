import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'
import { Prisma } from '../../../generated/prisma/client.js'
import { AnimalQuerySchema, AnimalParamSchema, PaginationQuerySchema } from '@patitas/types'

// =============================================================================
// Helpers privados
// =============================================================================

/** Texto de edad legible a partir de fecha de nacimiento. Ej: "3 meses", "2 años". */
function computeAgeText(birthDate: Date | null): string {
  if (!birthDate) return 'Edad desconocida'
  const months =
    (new Date().getFullYear() - birthDate.getFullYear()) * 12 +
    (new Date().getMonth() - birthDate.getMonth())
  if (months < 12) return `${months} ${months === 1 ? 'mes' : 'meses'}`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'año' : 'años'}`
}

/** Días desde que el animal fue rescatado o registrado en el sistema. */
function computeDaysWaiting(rescuedAt: Date | null, createdAt: Date): number {
  const from = rescuedAt ?? createdAt
  return Math.floor((Date.now() - from.getTime()) / 86_400_000)
}

// =============================================================================
// Endpoints
// =============================================================================

/**
 * GET /api/v1/animals?page=1&limit=20
 * Lista animales disponibles con filtros opcionales: type, size, is_urgent, foundation_id, search.
 * El campo search busca por nombre, ciudad o barrio (case-insensitive).
 * Retorna respuesta paginada con metadata: total, page, limit, totalPages.
 */
export async function getAnimals(req: Request, res: Response) {
  const filterParsed = AnimalQuerySchema.safeParse(req.query)
  if (!filterParsed.success) {
    res.status(400).json({ error: 'Parámetros inválidos', details: filterParsed.error.flatten().fieldErrors })
    return
  }

  const pageParsed = PaginationQuerySchema.safeParse(req.query)
  if (!pageParsed.success) {
    res.status(400).json({ error: 'Parámetros de paginación inválidos', details: pageParsed.error.flatten().fieldErrors })
    return
  }

  const { type, size, is_urgent: isUrgent, foundation_id: foundationId, search } = filterParsed.data
  const { page, limit } = pageParsed.data

  const where = {
    status: 'AVAILABLE' as const,
    ...(type ? { type } : {}),
    ...(size ? { size } : {}),
    ...(isUrgent ? { is_urgent: true } : {}),
    ...(foundationId ? { foundation_id: foundationId } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { city: { contains: search, mode: 'insensitive' as const } },
            { neighborhood: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  try {
    // Dos queries en paralelo: datos de la página + conteo total
    const [animals, total] = await Promise.all([
      prisma.animals.findMany({
        where,
        include: {
          animal_photos: { where: { is_primary: true }, select: { url: true } },
        },
        orderBy: [{ is_urgent: 'desc' }, { created_at: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.animals.count({ where }),
    ])

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=120')
    res.json({
      data: animals.map(a => ({
        id: a.id,
        name: a.name,
        type: a.type,
        breed: a.breed,
        size: a.size,
        gender: a.gender,
        ageText: computeAgeText(a.birth_date),
        location: [a.city, a.neighborhood].filter(Boolean).join(', ') || null,
        imageUrl: a.animal_photos[0]?.url ?? null,
        isUrgent: a.is_urgent,
        daysWaiting: computeDaysWaiting(a.rescued_at, a.created_at),
        foundationId: a.foundation_id,
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
 * GET /api/v1/animals/:id
 * Retorna el detalle completo de un animal por UUID, incluyendo fotos,
 * rasgos de personalidad, requisitos del hogar e info de su fundación.
 */
export async function getAnimalById(req: Request, res: Response) {
  const parsed = AnimalParamSchema.safeParse(req.params)
  if (!parsed.success) {
    res.status(400).json({ error: 'ID inválido' })
    return
  }

  const { id } = parsed.data

  try {
    const animal = await prisma.animals.findUnique({
      where: { id },
      include: {
        animal_photos: { orderBy: { order: 'asc' } },
        animal_traits: true,
        foundations: {
          select: { id: true, name: true, city: true, country: true },
        },
      },
    })

    if (!animal) {
      res.status(404).json({ error: 'Animal no encontrado' })
      return
    }

    // Segunda query necesaria: Prisma no soporta _count con where en includes anidados
    const animalsRescued = await prisma.animals.count({
      where: { foundation_id: animal.foundation_id, status: 'ADOPTED' },
    })

    const primaryPhoto = animal.animal_photos.find(p => p.is_primary)

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=120')
    res.json({
      id: animal.id,
      name: animal.name,
      type: animal.type,
      breed: animal.breed,
      size: animal.size,
      gender: animal.gender,
      birthDate: animal.birth_date?.toISOString() ?? null,
      ageText: computeAgeText(animal.birth_date),
      location: [animal.city, animal.neighborhood].filter(Boolean).join(', ') || null,
      imageUrl: primaryPhoto?.url ?? animal.animal_photos[0]?.url ?? null,
      imageUrls: animal.animal_photos.map(p => p.url),
      isUrgent: animal.is_urgent,
      daysWaiting: computeDaysWaiting(animal.rescued_at, animal.created_at),
      description: animal.description,
      isVaccinated: animal.is_vaccinated,
      isNeutered: animal.is_neutered,
      isDewormed: animal.is_dewormed,
      hasMicrochip: animal.has_microchip,
      lastCheckupAt: animal.last_checkup_at?.toISOString() ?? null,
      personality: animal.animal_traits
        .filter(t => t.type === 'PERSONALITY')
        .map(t => t.description),
      requirements: animal.animal_traits
        .filter(t => t.type === 'HOME_REQUIREMENT')
        .map(t => t.description),
      foundationId: animal.foundation_id,
      foundation: {
        id: animal.foundations.id,
        name: animal.foundations.name,
        location: [animal.foundations.city, animal.foundations.country].filter(Boolean).join(', '),
        animalsRescued,
      },
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: 'Animal no encontrado' })
      return
    }
    throw err
  }
}
