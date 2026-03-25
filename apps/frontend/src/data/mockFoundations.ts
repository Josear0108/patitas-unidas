import type { Foundation } from '@/features/foundations/types/foundation';

/**
 * Datos mock de fundaciones para desarrollo
 * TODO: Reemplazar con llamadas a API real
 */
export const mockFoundations: Foundation[] = [
  {
    id: '1',
    name: "Fundación Huellitas Felices",
    slug: "huellitas-felices",
    tagline: "Rescatando vidas desde 2018",
    logoUrl: "/paw-print-logo.png",
    bannerUrl: "/animal-shelter-volunteers.jpg",
    location: "Bogotá, Colombia",
    foundedYear: 2018,
    description: `Fundación Huellitas Felices nace del amor por los animales y el compromiso con su bienestar.
Somos una organización sin ánimo de lucro dedicada al rescate, rehabilitación y reubicación de perros y gatos
en situación de calle o abandono.

Operamos con recursos limitados pero con un corazón enorme. Cada donación, adopción y gesto de apoyo nos permite
continuar nuestra misión de darle una segunda oportunidad a los animales más vulnerables de nuestra comunidad.`,
    mission:
      "Reducir el número de animales en situación de calle a través de rescate, rehabilitación y adopción responsable.",
    vision: "Un mundo donde cada animal tenga un hogar amoroso y los recursos necesarios para una vida digna.",
    stats: {
      animalsRescued: 234,
      currentAnimals: 45,
      yearsActive: 7,
    },
    contact: {
      phone: "+57 320 123 4567",
      email: "contacto@huellitasfelices.org",
      website: "www.huellitasfelices.org",
    },
    achievements: [
      "Mayor tasa de adopción exitosa en Bogotá 2023",
      "Alianza con 12 veterinarias locales",
      "Programa de esterilización gratuita",
      "100% transparencia en donaciones",
    ],
    animals: [
      {
        id: '1',
        name: "Max",
        imageUrl: "/happy-golden-retriever.png",
        isUrgent: true,
      },
      {
        id: '3',
        name: "Rocky",
        imageUrl: "/large-friendly-dog.jpg",
        isUrgent: true,
      },
      {
        id: '5',
        name: "Toby",
        imageUrl: "/senior-friendly-dog.jpg",
        isUrgent: false,
      },
    ],
    activeCampaigns: [
      {
        id: '1',
        title: "Cirugía urgente para Max",
        raisedAmount: 450,
        goalAmount: 800,
        daysLeft: 5,
      },
      {
        id: '2',
        title: "Alimento para 45 animales",
        raisedAmount: 1200,
        goalAmount: 2000,
        daysLeft: 12,
      },
    ],
    isVerified: true,
  },
  {
    id: '2',
    name: "Refugio Patitas al Rescate",
    slug: "patitas-al-rescate",
    location: "Medellín",
    logoUrl: "/paw-print-logo.png",
    isVerified: true,
    stats: {
      animalsRescued: 156,
      currentAnimals: 32,
      yearsActive: 5,
    },
  },
  {
    id: '3',
    name: "Adopta un Amigo",
    slug: "adopta-un-amigo",
    location: "Cali",
    logoUrl: "/paw-print-logo.png",
    isVerified: true,
    stats: {
      animalsRescued: 198,
      currentAnimals: 28,
      yearsActive: 4,
    },
  },
  {
    id: '4',
    name: "Corazones Peludos",
    slug: "corazones-peludos",
    location: "Barranquilla",
    logoUrl: "/paw-print-logo.png",
    isVerified: false,
    stats: {
      animalsRescued: 87,
      currentAnimals: 19,
      yearsActive: 3,
    },
  },
];
