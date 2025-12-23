import { Button } from '@/components/ui/button';
import type { AnimalType, AnimalSize, AnimalFilters as FiltersType } from '../types/animal';

interface AnimalFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

/**
 * Componente de filtros para animales (tipo, tamaño, urgente)
 */
export function AnimalFilters({ filters, onFilterChange }: AnimalFiltersProps) {
  const handleTypeChange = (type: AnimalType | 'all') => {
    onFilterChange({ ...filters, type });
  };

  const handleSizeChange = (size: AnimalSize | 'all') => {
    onFilterChange({ ...filters, size });
  };

  const handleUrgentToggle = () => {
    onFilterChange({ ...filters, urgentOnly: !filters.urgentOnly });
  };

  return (
    <div className="space-y-4">
      {/* Tipo de Animal */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <Button
          variant={filters.type === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTypeChange('all')}
          className="flex-shrink-0 h-10"
        >
          Todos
        </Button>
        <Button
          variant={filters.type === 'Perro' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTypeChange('Perro')}
          className="flex-shrink-0 h-10"
        >
          🐕 Perros
        </Button>
        <Button
          variant={filters.type === 'Gato' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTypeChange('Gato')}
          className="flex-shrink-0 h-10"
        >
          🐈 Gatos
        </Button>
      </div>

      {/* Tamaño */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <Button
          variant={filters.size === 'Pequeño' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSizeChange(filters.size === 'Pequeño' ? 'all' : 'Pequeño')}
          className="flex-shrink-0 h-10"
        >
          Pequeño
        </Button>
        <Button
          variant={filters.size === 'Mediano' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSizeChange(filters.size === 'Mediano' ? 'all' : 'Mediano')}
          className="flex-shrink-0 h-10"
        >
          Mediano
        </Button>
        <Button
          variant={filters.size === 'Grande' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSizeChange(filters.size === 'Grande' ? 'all' : 'Grande')}
          className="flex-shrink-0 h-10"
        >
          Grande
        </Button>
        <Button
          variant={filters.urgentOnly ? 'destructive' : 'outline'}
          size="sm"
          onClick={handleUrgentToggle}
          className="flex-shrink-0 h-10"
        >
          🚨 Solo urgentes
        </Button>
      </div>
    </div>
  );
}
