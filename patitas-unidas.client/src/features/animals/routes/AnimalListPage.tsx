import { useState, useEffect } from 'react';
import { animalsService } from '../api/animalsService';
import { AnimalSearchBar } from '../components/AnimalSearchBar';
import { AnimalFilters } from '../components/AnimalFilters';
import { AnimalGrid } from '../components/AnimalGrid';
import type { Animal, AnimalFilters as FiltersType } from '../types/animal';

/**
 * Página de lista de animales disponibles para adopción
 */
export function AnimalListPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FiltersType>({
    type: 'all',
    size: 'all',
    urgentOnly: false,
    searchQuery: '',
  });

  // Cargar animales al montar
  useEffect(() => {
    animalsService
      .getAll()
      .then(setAnimals)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar animales
  const filteredAnimals = animals.filter((animal) => {
    const matchesType = filters.type === 'all' || animal.type === filters.type;
    const matchesSize = filters.size === 'all' || animal.size === filters.size;
    const matchesUrgent = !filters.urgentOnly || animal.urgent;
    const matchesSearch =
      filters.searchQuery === '' ||
      animal.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      animal.location.toLowerCase().includes(filters.searchQuery.toLowerCase());
    return matchesType && matchesSize && matchesUrgent && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando animales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-18">
      <div className="container px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            Animales Disponibles
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Encuentra a tu compañero ideal
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <AnimalSearchBar
            value={filters.searchQuery}
            onChange={(value) => setFilters({ ...filters, searchQuery: value })}
          />
        </div>

        {/* Filtros */}
        <div className="mb-6 md:mb-8">
          <AnimalFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Grid de animales */}
        <AnimalGrid
          animals={filteredAnimals}
          emptyMessage={
            filters.searchQuery || filters.type !== 'all' || filters.size !== 'all' || filters.urgentOnly
              ? 'No se encontraron animales con estos filtros.'
              : 'No hay animales disponibles en este momento.'
          }
        />

        {/* Contador de resultados */}
        {filteredAnimals.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Mostrando {filteredAnimals.length} de {animals.length} animales
          </div>
        )}
      </div>
    </div>
  );
}
