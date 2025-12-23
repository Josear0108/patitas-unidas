import type { Foundation } from '@/features/foundations/types/foundation';

/**
 * Datos mock de fundaciones para desarrollo
 * TODO: Reemplazar con llamadas a API real
 */
export const mockFoundations: Foundation[] = [
  {
    id: 1,
    name: "Fundación Huellitas Felices",
    tagline: "Rescatando vidas desde 2018",
    logo: "/patitas-unidas/assets/fundacion_1.png",
    coverImage: "/patitas-unidas/assets/fundacion_1.png",
    location: "Bogotá, Colombia",
    founded: 2018,
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
      adoptionsCompleted: 189,
      volunteers: 23,
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
    currentAnimals: [
      {
        id: 1,
        name: "Max",
        image: "/patitas-unidas/assets/patita_1.jpg",
        urgent: true,
      },
      {
        id: 3,
        name: "Rocky",
        image: "/patitas-unidas/assets/patita_6.jpg",
        urgent: true,
      },
      {
        id: 4,
        name: "Michi",
        image: "/patitas-unidas/assets/patita_8.jpg",
        urgent: false,
      },
    ],
    activeCampaigns: [
      {
        id: 1,
        name: "Cirugía urgente para Max",
        raised: 450,
        goal: 800,
        daysLeft: 5,
      },
      {
        id: 2,
        name: "Alimento para 45 animales",
        raised: 1200,
        goal: 2000,
        daysLeft: 12,
      },
    ],
    verified: true,
    // Propiedades para lista
    animalsRescued: 234,
    volunteers: 23,
  },
  {
    id: 2,
    name: "Refugio Patitas al Rescate",
    location: "Medellín",
    logo: "/patitas-unidas/assets/fundacion_2.png",
    verified: true,
    animalsRescued: 156,
    volunteers: 18,
  },
  {
    id: 3,
    name: "Adopta un Amigo",
    location: "Cali",
    logo: "/patitas-unidas/assets/fundacion_3.png",
    verified: true,
    animalsRescued: 198,
    volunteers: 15,
  },
  {
    id: 4,
    name: "Corazones Peludos",
    location: "Barranquilla",
    logo: "/patitas-unidas/assets/fundacion_1.png",
    verified: false,
    animalsRescued: 87,
    volunteers: 12,
  },
];
