import type { Campaign } from '@/features/donations/types/donation';

/**
 * Datos mock de campañas de donación para desarrollo
 * TODO: Reemplazar con llamadas a API real
 */
export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Cirugía Urgente para Max",
    slug: "cirugia-urgente-max",
    foundationId: 1,
    animalId: 1,
    coverImage: "/patitas-unidas/assets/patita_1.jpg",
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
    raised: 450,
    goal: 800,
    currency: "USD",
    donors: 23,
    daysLeft: 5,
    createdAt: "2024-11-15",
    urgency: "high",
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
      { name: "María González", amount: 100, days: 2 },
      { name: "Carlos Ruiz", amount: 50, days: 3 },
      { name: "Ana Martínez", amount: 50, days: 5 },
    ],
    rewards: [
      {
        amount: 10,
        title: "Agradecimiento Digital",
        description: "Recibirás un email de agradecimiento personalizado con fotos de Max.",
      },
      {
        amount: 25,
        title: "Actualización Exclusiva",
        description: "Actualizaciones semanales sobre la recuperación de Max por WhatsApp.",
      },
      {
        amount: 50,
        title: "Video Personalizado",
        description: "Max te enviará un video de agradecimiento cuando se recupere.",
      },
      {
        amount: 100,
        title: "Certificado de Impacto",
        description: "Certificado físico firmado + foto impresa de Max + todos los beneficios anteriores.",
      },
    ],
  },
  {
    id: 2,
    title: "Alimento para 45 animales - Mes de Diciembre",
    slug: "alimento-diciembre",
    foundationId: 1,
    coverImage: "/patitas-unidas/assets/patita_2.jpg",
    description: `Necesitamos tu ayuda para alimentar a los 45 animales que actualmente están bajo nuestro cuidado durante el mes de diciembre.

    El costo mensual de alimento de alta calidad incluye:
    • Alimento seco para perros (adultos y cachorros)
    • Alimento para gatos
    • Suplementos vitamínicos
    • Snacks saludables para entrenamiento

    Cada animal consume aproximadamente $45 USD al mes en alimento de calidad.
    Tu donación garantiza que ningún animal pase hambre y reciba la nutrición que necesita.`,
    raised: 1200,
    goal: 2000,
    currency: "USD",
    donors: 67,
    daysLeft: 12,
    createdAt: "2024-11-01",
    urgency: "medium",
    updates: [
      {
        date: "2024-11-25",
        message: "¡Increíble! Ya cubrimos el 60% del mes gracias a ustedes. Seguimos adelante.",
      },
    ],
    topDonors: [
      { name: "Pedro Sánchez", amount: 200, days: 1 },
      { name: "Laura Díaz", amount: 150, days: 4 },
      { name: "Fundación Amigos", amount: 100, days: 7 },
    ],
    rewards: [
      {
        amount: 20,
        title: "Foto Mensual",
        description: "Recibirás una foto mensual de todos los animales bien alimentados.",
      },
      {
        amount: 45,
        title: "Apadrina un Animal",
        description: "Recibirás updates mensuales del animal que elijas apadrinar.",
      },
      {
        amount: 100,
        title: "Visita al Refugio",
        description: "Invitación especial para visitar el refugio y conocer a todos los animales.",
      },
    ],
  },
];
