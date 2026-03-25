import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'
import type { animal_type, animal_size } from '../../../generated/prisma/client.js'

function computeAgeText(birthDate: Date | null): string {
  if (!birthDate) return 'Edad desconocida'
  const months =
    (new Date().getFullYear() - birthDate.getFullYear()) * 12 +
    (new Date().getMonth() - birthDate.getMonth())
  if (months < 12) return `${months} ${months === 1 ? 'mes' : 'meses'}`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'año' : 'años'}`
}

function computeDaysWaiting(rescuedAt: Date | null, createdAt: Date): number {
  const from = rescuedAt ?? createdAt
  return Math.floor((Date.now() - from.getTime()) / 86_400_000)
}

function str(val: unknown): string | undefined {
  return typeof val === 'string' ? val : undefined
}

export async function getAnimals(req: Request, res: Response) {
  const type = str(req.query['type'])
  const size = str(req.query['size'])
  const isUrgent = req.query['is_urgent'] === 'true'
  const search = str(req.query['search'])
  const foundationId = str(req.query['foundation_id'])

  const animals = await prisma.animals.findMany({
    where: {
      status: 'AVAILABLE',
      ...(type ? { type: type as animal_type } : {}),
      ...(size ? { size: size as animal_size } : {}),
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
    },
    include: {
      animal_photos: { where: { is_primary: true }, select: { url: true } },
    },
    orderBy: [{ is_urgent: 'desc' }, { created_at: 'desc' }],
  })

  const result = animals.map(a => ({
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
  }))

  res.json(result)
}

export async function getAnimalById(req: Request, res: Response) {
  const id = String(req.params['id'])

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

  const animalsRescued = await prisma.animals.count({
    where: { foundation_id: animal.foundation_id, status: 'ADOPTED' },
  })

  const primaryPhoto = animal.animal_photos.find(p => p.is_primary)

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
}
