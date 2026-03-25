/**
 * Feature flag para alternar entre la implementación mock y la API real.
 * Establecer VITE_USE_REAL_API=true en .env.local para usar la API real.
 */
export const USE_REAL_API = import.meta.env['VITE_USE_REAL_API'] === 'true'
