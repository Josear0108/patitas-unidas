/**
 * Testimonial de un adoptante
 */
export interface Testimonial {
  name: string;
  pet: string;
  image: string;
  quote: string;
}

/**
 * Estadísticas de impacto global
 */
export interface ImpactStats {
  successfulAdoptions: number;
  activeFoundations: number;
  animalsWaitingForHome: number;
}
