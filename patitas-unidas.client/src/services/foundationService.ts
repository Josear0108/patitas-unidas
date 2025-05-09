import { Foundation } from "../types/foundation";

// Mock de fundaciones
const FOUNDATIONS: Foundation[] = [
  {
    id: 1,
    name: "Huellitas de Amor",
    description: "Rescatamos y damos en adopción animales en situación de calle en Bogotá.",
    city: "Bogotá",
    logo: "/patitas-unidas/assets/fundacion_1.png",
    email: "huellitas@correo.com",
    phone: "573214406924",
    contact: [ {socialMedia: "instagram", url: "https://instagram.com/patitasunidas_co"}, {socialMedia: "whatsapp", url: "https://wa.me/573214406924"} ],
  },
  {
    id: 2,
    name: "Patitas Felices",
    description: "Apoyamos campañas de esterilización y adopción responsable en Medellín.",
    city: "Medellín",
    logo: "/patitas-unidas/assets/fundacion_2.png",
    email: "felices@correo.com",
    phone: "573214406924",
    contact: [ {socialMedia: "instagram", url: "https://instagram.com/patitasunidas_co"}, {socialMedia: "whatsapp", url: "https://wa.me/573214406924"}, {socialMedia: "facebook", url: "https://facebook.com/patitasunidas_co"} ],
  },
  {
    id: 3,
    name: "Amigos Peludos",
    description: "Ofrecemos hogar de paso y atención veterinaria en Cali.",
    city: "Cali",
    logo: "/patitas-unidas/assets/fundacion_3.png",
    email: "peludos@correo.com",
    phone: "573214406924",
    contact: [ {socialMedia: "instagram", url: "https://instagram.com/patitasunidas_co"}, {socialMedia: "whatsapp", url: "https://wa.me/573214406924"} ],
  },
  {
    id: 4,
    name: "Amigos Peludos 4",
    description: "Ofrecemos hogar de paso y atención veterinaria en Cali.",
    city: "Cali",
    logo: "/patitas-unidas/assets/fundacion_3.png",
    email: "peludos@correo.com",
    phone: "573214406924",
    contact: [ {socialMedia: "instagram", url: "https://instagram.com/patitasunidas_co"}, {socialMedia: "whatsapp", url: "https://wa.me/573214406924"} ],
  },
  {
    id: 5,
    name: "Amigos Peludos 5",
    description: "Ofrecemos hogar de paso y atención veterinaria en Cali.",
    city: "Cali",
    logo: "/patitas-unidas/assets/fundacion_3.png",
    email: "peludos@correo.com",
    phone: "573214406924",
    contact: [ {socialMedia: "instagram", url: "https://instagram.com/patitasunidas_co"}, {socialMedia: "whatsapp", url: "https://wa.me/573214406924"} ],
  },
  {
    id: 6,
    name: "Amigos Peludos 6",
    description: "Ofrecemos hogar de paso y atención veterinaria en Cali.",
    city: "Cali",
    logo: "/patitas-unidas/assets/fundacion_3.png",
    email: "peludos@correo.com",
    phone: "573214406924",
    contact: [ {socialMedia: "instagram", url: "https://instagram.com/patitasunidas_co"}, {socialMedia: "whatsapp", url: "https://wa.me/573214406924"} ],
  }
];

export const foundationService = {
  getFoundations: async (): Promise<Foundation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FOUNDATIONS), 500);
    });
  },
  getFoundationById: async (id: number): Promise<Foundation | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FOUNDATIONS.find(f => f.id === id)), 500);
    });
  }
}; 