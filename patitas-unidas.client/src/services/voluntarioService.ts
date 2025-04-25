export interface OpcionVoluntariado {
    icon: string;
    titulo: string;
    descripcion: string;
  }
  
  export const voluntarioService = {
    getOpcionesVoluntariado: async (): Promise<OpcionVoluntariado[]> => {
      return [
        {
          icon: "icon-home",
          titulo: "Hogar de paso",
          descripcion: "Ofrece un espacio temporal en tu hogar para animales que esperan ser adoptados. Todos los gastos son cubiertos por la fundación.",
        },
        {
          icon: "icon-car",
          titulo: "Transporte",
          descripcion: "Ayuda a transportar animales a citas veterinarias, eventos de adopción o a sus nuevos hogares.",
        },
        {
          icon: "icon-clock",
          titulo: "Tiempo y habilidades",
          descripcion: "Comparte tus habilidades: fotografía, diseño, redes sociales, organización de eventos o atención directa a los animales.",
        }
      ];
    },
    getTiposAyuda: async (): Promise<string[]> => {
      return [
        "Hogar de paso",
        "Transporte",
        "Eventos",
        "Redes sociales",
        "Fotografía",
        "Otro",
      ];
    },
    getDisponibilidad: async (): Promise<{ id: string; label: string }[]> => {
      return [
        { id: "fines", label: "Fines de semana" },
        { id: "dias", label: "Días específicos entre semana" },
        { id: "flexible", label: "Horario flexible" },
      ];
    },
  }; 