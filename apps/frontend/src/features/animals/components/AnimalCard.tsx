import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';
import type { AnimalSummary } from '@patitas/types';

interface AnimalCardProps {
  animal: AnimalSummary;
  className?: string;
}

/**
 * Componente de tarjeta para mostrar información resumida de un animal
 */
export function AnimalCard({ animal, className = '' }: AnimalCardProps) {
  return (
    <Link
      to={`/animales/${animal.id}`}
      className={`block flex-shrink-0 w-64 md:w-auto h-full ${className}`}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
        <div className="relative h-64 flex-shrink-0">
          <img
            src={animal.imageUrl || '/placeholder.svg'}
            alt={animal.name}
            className="object-cover w-full h-full"
          />
          {animal.isUrgent && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {animal.daysWaiting} días
            </Badge>
          )}
        </div>
        <CardContent className="p-3 md:p-4 flex flex-col flex-1">
          <h3 className="font-bold text-base md:text-lg">{animal.name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {animal.breed} • {animal.ageText}
          </p>
          <div className="flex items-center gap-1 mt-auto pt-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{animal.location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
