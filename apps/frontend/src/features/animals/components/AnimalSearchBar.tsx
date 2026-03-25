import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface AnimalSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Barra de búsqueda para filtrar animales por nombre o ubicación
 */
export function AnimalSearchBar({
  value,
  onChange,
  placeholder = 'Buscar por nombre o ubicación...'
}: AnimalSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-10 h-12 md:h-11 text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
