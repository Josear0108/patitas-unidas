import type { Campaign } from '@/features/donations/types/donation';

/**
 * Datos mock de campañas de donación para desarrollo
 * TODO: Reemplazar con llamadas a API real
 */
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: "Cirugía Urgente para Max",
    slug: "cirugia-urgente-max",
    foundationId: '1',
    animalId: '1',
    imageUrl: "/dog-at-veterinary-clinic.jpg",
    description: `Max necesita una cirugía urgente de cadera debido a una lesión que sufrió antes de ser rescatado.
    Sin esta intervención, Max sufre de dolor constante y su movilidad está severamente limitada.

    La cirugía cuesta $800 USD e incluye:
    • Radiografías pre-operatorias
    • Cirugía de reconstrucción de cadera
    • Medicamentos post-operatorios
    • 3 consultas de seguimiento
    • Fisioterapia durante 6 semanas

    Max es un perro joven y lleno de vida. Con esta cirugía podrá volver a correr, jugar y disfrutar de una vida sin dolor.
    Tu ayuda puede cambiar completamente su futuro.`,
    raisedAmount: 450,
    goalAmount: 800,
    currency: "USD",
    donorCount: 23,
    daysLeft: 5,
    createdAt: "2024-11-15",
    isUrgent: true,
    updates: [
      {
        date: "2024-11-28",
        message: "¡Gracias! Ya alcanzamos el 56% de la meta. Max está programado para cirugía el próximo viernes.",
      },
      {
        date: "2024-11-20",
        message: "El veterinario confirmó que la cirugía es viable. Necesitamos completar la meta en 7 días.",
      },
    ],
    topDonors: [
      { name: "María González", amount: 100, daysAgo: 2 },
      { name: "Carlos Ruiz", amount: 50, daysAgo: 3 },
      { name: "Ana Martínez", amount: 50, daysAgo: 5 },
    ],
    rewards: [
      {
        minimumAmount: 10,
        title: "Agradecimiento Digital",
        description: "Recibirás un email de agradecimiento personalizado con fotos de Max.",
      },
      {
        minimumAmount: 25,
        title: "Actualización Exclusiva",
        description: "Actualizaciones semanales sobre la recuperación de Max por WhatsApp.",
      },
      {
        minimumAmount: 50,
        title: "Video Personalizado",
        description: "Max te enviará un video de agradecimiento cuando se recupere.",
      },
      {
        minimumAmount: 100,
        title: "Certificado de Impacto",
        description: "Certificado físico firmado + foto impresa de Max + todos los beneficios anteriores.",
      },
    ],
  },
  {
    id: '2',
    title: "Alimento para 45 animales - Mes de Diciembre",
    slug: "alimento-diciembre",
    foundationId: '1',
    imageUrl: "/animal-shelter-feeding.jpg",
    description: `Necesitamos tu ayuda para alimentar a los 45 animales que actualmente están bajo nuestro cuidado durante el mes de diciembre.

    El costo mensual de alimento de alta calidad incluye:
    • Alimento seco para perros (adultos y cachorros)
    • Alimento para gatos
    • Suplementos vitamínicos
    • Snacks saludables para entrenamiento

    Cada animal consume aproximadamente $45 USD al mes en alimento de calidad.
    Tu donación garantiza que ningún animal pase hambre y reciba la nutrición que necesita.`,
    raisedAmount: 1200,
    goalAmount: 2000,
    currency: "USD",
    donorCount: 67,
    daysLeft: 12,
    createdAt: "2024-11-01",
    isUrgent: false,
    updates: [
      {
        date: "2024-11-25",
        message: "¡Increíble! Ya cubrimos el 60% del mes gracias a ustedes. Seguimos adelante.",
      },
    ],
    topDonors: [
      { name: "Pedro Sánchez", amount: 200, daysAgo: 1 },
      { name: "Laura Díaz", amount: 150, daysAgo: 4 },
      { name: "Fundación Amigos", amount: 100, daysAgo: 7 },
    ],
    rewards: [
      {
        minimumAmount: 20,
        title: "Foto Mensual",
        description: "Recibirás una foto mensual de todos los animales bien alimentados.",
      },
      {
        minimumAmount: 45,
        title: "Apadrina un Animal",
        description: "Recibirás updates mensuales del animal que elijas apadrinar.",
      },
      {
        minimumAmount: 100,
        title: "Visita al Refugio",
        description: "Invitación especial para visitar el refugio y conocer a todos los animales.",
      },
    ],
  },
];
