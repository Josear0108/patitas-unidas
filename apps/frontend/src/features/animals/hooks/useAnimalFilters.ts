import { useMemo } from 'react';
import type { Animal, AnimalFilters } from '../types/animal';

/**
 * Hook para filtrar animales según los criterios seleccionados.
 * Centraliza la lógica de filtrado usada en HomePage y AnimalListPage.
 */
export function useAnimalFilters(animals: Animal[], filters: AnimalFilters): Animal[] {
  return useMemo(
    () =>
      animals.filter((animal) => {
        const matchesType = filters.type === 'all' || animal.type === filters.type;
        const matchesSize = filters.size === 'all' || animal.size === filters.size;
        const matchesUrgent = !filters.urgentOnly || animal.isUrgent;
        const matchesSearch =
          filters.searchQuery === '' ||
          animal.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          (animal.location ?? '').toLowerCase().includes(filters.searchQuery.toLowerCase());
        return matchesType && matchesSize && matchesUrgent && matchesSearch;
      }),
    [animals, filters],
  );
}
