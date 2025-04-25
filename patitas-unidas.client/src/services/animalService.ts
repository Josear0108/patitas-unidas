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
        image: "@/assets/patita_1.jpg",
      },
      {
        id: 10,
        name: "Antonia",
        type: "Gato",
        state: "Urgente",
        tag: "Juguetón",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_10.jpg",
      },
      {
        id: 2,
        name: "Sasha",
        type: "Perro",
        state: "Nuevo",
        tag: "Juguetón",
        age: "Cachorro",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_2.jpg",
      },
      {
        id: 3,
        name: "Drax",
        type: "Perro",
        state: "Urgente",
        tag: "Tranquilo",
        age: "Cachorro",
        description: "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
        image: "/patitas-unidas/src/assets/patita_3.jpg",
      },
      {
        id: 4,
        name: "Tobhias",
        type: "Perro",
        state: "Urgente",
        tag: "Tranquilo",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_4.jpg",
      },
      {
        id: 5,
        name: "Blanca nieves",
        type: "Gato",
        state: "Nuevo",
        tag: "Independiente",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_5.jpg",
      },
      {
        id: 7,
        name: "Nina",
        type: "Gato",
        state: "Tranquilo",
        age: "Cachorro",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_7.jpg",
      },
      {
        id: 8,
        name: "Blue",
        type: "Gato",
        state: "Juguetón",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_8.jpg",
      },
      {
        id: 9,
        name: "Pelusa",
        type: "Perro",
        state: "Urgente",
        tag: "Juguetón",
        age: "Adulto",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_9.jpg",
      },
      {
        id: 6,
        name: "Francheska",
        type: "Gato",
        state: "Urgente",
        tag: "Independiente",
        age: "Cachorro",
        description: "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
        image: "/patitas-unidas/src/assets/patita_6.jpg",
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
}; 