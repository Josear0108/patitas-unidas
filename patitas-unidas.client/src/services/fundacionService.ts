import { Fundacion } from "../types/fundacion";

// Mock de fundaciones
const FUNDACIONES: Fundacion[] = [
  {
    id: 1,
    nombre: "Huellitas de Amor",
    descripcion: "Rescatamos y damos en adopción animales en situación de calle en Bogotá.",
    ciudad: "Bogotá",
    logo: "/patitas-unidas/assets/fundacion_1.png",
    contacto: "huellitas@correo.com",
  },
  {
    id: 2,
    nombre: "Patitas Felices",
    descripcion: "Apoyamos campañas de esterilización y adopción responsable en Medellín.",
    ciudad: "Medellín",
    logo: "/patitas-unidas/assets/fundacion_2.png",
    contacto: "felices@correo.com",
  },
  {
    id: 3,
    nombre: "Amigos Peludos",
    descripcion: "Ofrecemos hogar de paso y atención veterinaria en Cali.",
    ciudad: "Cali",
    logo: "/patitas-unidas/assets/fundacion_3.png",
    contacto: "peludos@correo.com",
  }
];

export const fundacionService = {
  getFundaciones: async (): Promise<Fundacion[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FUNDACIONES), 500);
    });
  },
  getFundacionById: async (id: number): Promise<Fundacion | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FUNDACIONES.find(f => f.id === id)), 500);
    });
  }
}; 