import { Animal } from "../types/animal";

// Datos quemados simulando respuesta de API
const ANIMALES: Animal[] = [
    {
        id: 1,
        name: "Maximiliano",
        type: "Perro",
        state: "Urgente",
        tag: "Sociable",
        age: "Adulto",
        description: "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
        image: "/patitas-unidas/assets/patita_1.jpg",
        fundacionId: 1,
      },
      {
        id: 10,
        name: "Antonia",
        type: "Gato",
        state: "Urgente",
        tag: "Juguetón",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_10.jpg",
        fundacionId: 2,
      },
      {
        id: 2,
        name: "Sasha",
        type: "Perro",
        state: "Nuevo",
        tag: "Juguetón",
        age: "Cachorro",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_2.jpg",
        fundacionId: 1,
      },
      {
        id: 3,
        name: "Drax",
        type: "Perro",
        state: "Urgente",
        tag: "Tranquilo",
        age: "Cachorro",
        description: "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
        image: "/patitas-unidas/assets/patita_3.jpg",
        fundacionId: 3,
      },
      {
        id: 4,
        name: "Tobhias",
        type: "Perro",
        state: "Urgente",
        tag: "Tranquilo",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_4.jpg",
        fundacionId: 1,
      },
      {
        id: 5,
        name: "Blanca nieves",
        type: "Gato",
        state: "Nuevo",
        tag: "Independiente",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_5.jpg",
        fundacionId: 2,
      },
      {
        id: 7,
        name: "Nina",
        type: "Gato",
        state: "Tranquilo",
        age: "Cachorro",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_7.jpg",
        fundacionId: 3,
      },
      {
        id: 8,
        name: "Blue",
        type: "Gato",
        state: "Juguetón",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_8.jpg",
        fundacionId: 2,
      },
      {
        id: 9,
        name: "Pelusa",
        type: "Perro",
        state: "Urgente",
        tag: "Juguetón",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_9.jpg",
        fundacionId: 1,
      },
      {
        id: 6,
        name: "Francheska",
        type: "Gato",
        state: "Urgente",
        tag: "Independiente",
        age: "Cachorro",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/patita_6.jpg",
        fundacionId: 3,
      },
      {
        id: 6,
        name: "Tyson",
        type: "Perro",
        state: "No adopción",
        tag: "Lindo",
        age: "Adulto",
        description: "Perro lindo y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/assets/tyson.jpg",
        fundacionId: 2,
      },
];

const ANIMALES_APADRINAMIENTO: Animal[] = [
  {
    id: 101,
    name: "Luna",
    type: "Gato",
    age: "Adulto",
    description: "Requiere cirugía y cuidados post-operatorios.",
    image: "/assets/patita_apadrina_1.jpg",
    state: "Necesita ayuda",
    tag: "Especial",
  },
  {
    id: 102,
    name: "Max",
    type: "Perro",
    age: "Cachorro",
    description: "Necesita tratamiento médico y alimentación especial.",
    image: "/assets/patita_apadrina_2.jpg",
    state: "Necesita ayuda",
    tag: "Tratamiento",
  },
  {
    id: 103,
    name: "Milo",
    type: "Gato",
    age: "Adulto",
    description: "Requiere medicación diaria para su recuperación.",
    image: "/assets/patita_apadrina_3.jpg",
    state: "Necesita ayuda",
    tag: "Medicamentos",
  },
  {
    id: 104,
    name: "Nina",
    type: "Perro",
    age: "Cachorro",
    description: "Recuperándose de una fractura, necesita fisioterapia.",
    image: "/assets/patita_apadrina_4.jpg",
    state: "Necesita ayuda",
    tag: "Fisioterapia",
  },
];

export const animalService = {
  getAnimales: async (): Promise<Animal[]> => {
    // Simula una llamada a API con un pequeño retardo
    return new Promise((resolve) => {
      setTimeout(() => resolve(ANIMALES), 500);
    });
  },
  getApadrinables: async (): Promise<Animal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ANIMALES_APADRINAMIENTO), 500);
    });
  },
  getAnimalesPorFundacion: async (fundacionId: number): Promise<Animal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ANIMALES.filter(a => a.fundacionId === fundacionId)), 500);
    });
  },
}; 