import { PawPrint } from 'lucide-react';
import { AnimalCard } from './AnimalCard';
import type { Animal } from '../types/animal';

interface AnimalGridProps {
  animals: Animal[];
  emptyMessage?: string;
}

/**
 * Grid responsive de tarjetas de animales
 */
export function AnimalGrid({
  animals,
  emptyMessage = 'No se encontraron animales con estos filtros.'
}: AnimalGridProps) {
  if (animals.length === 0) {
    return (
      <div className="text-center py-16">
        <PawPrint className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="font-medium mb-1">Sin resultados</p>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}
