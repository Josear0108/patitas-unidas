import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SlidersHorizontal, Dog, Cat, AlertTriangle, X, Search } from 'lucide-react';
import type { AnimalType, AnimalSize, AnimalFilters as FiltersType } from '../types/animal';

interface AnimalFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

function countActiveFilters(filters: FiltersType) {
  let count = 0;
  if (filters.type !== 'all') count++;
  if (filters.size !== 'all') count++;
  if (filters.urgentOnly) count++;
  if (filters.searchQuery) count++;
  return count;
}

const TYPE_OPTIONS: { value: AnimalType | 'all'; label: string; icon?: React.ElementType }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'DOG', label: 'Perros', icon: Dog },
  { value: 'CAT', label: 'Gatos', icon: Cat },
];

const SIZE_OPTIONS: { value: AnimalSize; label: string }[] = [
  { value: 'SMALL', label: 'Pequeño' },
  { value: 'MEDIUM', label: 'Mediano' },
  { value: 'LARGE', label: 'Grande' },
];

/**
 * Botón de filtros con panel flotante (Popover).
 * Incluye búsqueda por nombre/ciudad, tipo, tamaño y urgencia.
 */
export function AnimalFilters({ filters, onFilterChange }: AnimalFiltersProps) {
  const [open, setOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  const handleClear = () => {
    onFilterChange({ type: 'all', size: 'all', urgentOnly: false, searchQuery: '' });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 cursor-pointer"
          aria-label={`Filtros${activeCount > 0 ? `, ${activeCount} activos` : ''}`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeCount > 0 && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center text-[11px] rounded-full ml-1">
              {activeCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4" align="start" sideOffset={8}>
        <div className="space-y-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Filtros</p>
            {activeCount > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-3 w-3" />
                Limpiar todo
              </button>
            )}
          </div>

          {/* Búsqueda por nombre o ciudad */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Nombre o ciudad..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="pl-9 h-9"
            />
          </div>

          {/* Tipo */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Tipo
            </p>
            <div className="flex gap-2 flex-wrap">
              {TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
                <Button
                  key={value}
                  variant={filters.type === value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFilterChange({ ...filters, type: value })}
                  className="gap-1.5 cursor-pointer"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tamaño */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Tamaño
            </p>
            <div className="flex gap-2 flex-wrap">
              {SIZE_OPTIONS.map(({ value, label }) => (
                <Button
                  key={value}
                  variant={filters.size === value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    onFilterChange({ ...filters, size: filters.size === value ? 'all' : value })
                  }
                  className="cursor-pointer"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Urgentes */}
          <div className="pt-2 border-t">
            <Button
              variant={filters.urgentOnly ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => onFilterChange({ ...filters, urgentOnly: !filters.urgentOnly })}
              className="gap-2 w-full cursor-pointer"
            >
              <AlertTriangle className="h-4 w-4" />
              Solo urgentes
            </Button>
          </div>

        </div>
      </PopoverContent>
    </Popover>
  );
}
