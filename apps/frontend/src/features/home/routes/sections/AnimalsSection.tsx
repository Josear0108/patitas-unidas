import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Heart, MapPin, PawPrint } from 'lucide-react';
import { useAnimalListParams } from '@/features/animals';
import { useAnimals } from '@/features/animals/hooks/useAnimals';
import type { AnimalFilters } from '@/features/animals';
import type { AnimalSummary } from '@patitas/types';

/**
 * La sección maneja su propio estado de filtros y llama directamente a la API.
 * Así el filtrado real lo hace la base de datos, no el cliente.
 */
export function AnimalsSection() {
  const [filters, setFilters] = useState<AnimalFilters>({
    type: 'all',
    size: 'all',
    urgentOnly: false,
    searchQuery: '',
  });

  const params = useAnimalListParams(filters);
  const { data } = useAnimals(params);
  const animals: AnimalSummary[] = data?.data ?? [];

  return (
    <section id="animales" className="py-8 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Animales Disponibles</h2>
          <p className="text-sm md:text-base text-muted-foreground">Encuentra a tu compañero ideal</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o ubicación..."
              className="pl-10 h-12 md:h-11 text-base"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            <Button
              variant={filters.type === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, type: 'all' })}
              className="flex-shrink-0 h-10"
            >
              Todos
            </Button>
            <Button
              variant={filters.type === 'DOG' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, type: 'DOG' })}
              className="flex-shrink-0 h-10"
            >
              Perros
            </Button>
            <Button
              variant={filters.type === 'CAT' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, type: 'CAT' })}
              className="flex-shrink-0 h-10"
            >
              Gatos
            </Button>
            <Button
              variant={filters.size === 'SMALL' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, size: filters.size === 'SMALL' ? 'all' : 'SMALL' })}
              className="flex-shrink-0 h-10"
            >
              Pequeño
            </Button>
            <Button
              variant={filters.size === 'MEDIUM' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, size: filters.size === 'MEDIUM' ? 'all' : 'MEDIUM' })}
              className="flex-shrink-0 h-10"
            >
              Mediano
            </Button>
            <Button
              variant={filters.size === 'LARGE' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, size: filters.size === 'LARGE' ? 'all' : 'LARGE' })}
              className="flex-shrink-0 h-10"
            >
              Grande
            </Button>
            <Button
              variant={filters.urgentOnly ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, urgentOnly: !filters.urgentOnly })}
              className="flex-shrink-0 h-10"
            >
              Solo urgentes
            </Button>
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {animals.map((animal) => (
            <Link key={animal.id} to={`/animales/${animal.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
                <div className="relative aspect-square">
                  <img
                    src={animal.imageUrl || '/placeholder.svg'}
                    alt={animal.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  {animal.isUrgent && (
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                      Urgente
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{animal.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {animal.breed} • {animal.ageText}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{animal.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      aria-label={`Guardar ${animal.name}`}
                      onClick={(e) => e.preventDefault()}
                      className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {animals.length === 0 && (
          <div className="text-center py-12">
            <PawPrint className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No se encontraron animales con esos filtros</p>
          </div>
        )}
      </div>
    </section>
  );
}
