import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Clock, MapPin } from 'lucide-react';
import type { AnimalSummary } from '@patitas/types';

interface UrgentCasesSectionProps {
  animals: AnimalSummary[];
}

export function UrgentCasesSection({ animals }: UrgentCasesSectionProps) {
  if (animals.length === 0) return null;

  return (
    <section className="bg-destructive/5 border-y py-4 md:py-6">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
            <h2 className="text-lg md:text-xl font-bold">Casos Urgentes</h2>
          </div>
          <Button variant="link" className="text-sm p-0 h-auto" asChild>
            <Link to="/animales">Ver todos</Link>
          </Button>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 pb-2">
          <div className="flex gap-3 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {animals.map((animal) => (
              <Link key={animal.id} to={`/animales/${animal.id}`} className="flex-shrink-0 w-64 md:w-auto">
                <Card className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-square">
                    <img
                      src={animal.imageUrl || '/placeholder.svg'}
                      alt={animal.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {animal.daysWaiting} días
                    </Badge>
                  </div>
                  <CardContent className="p-3 md:p-4">
                    <h3 className="font-bold text-base md:text-lg">{animal.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {animal.breed} • {animal.ageText}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{animal.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
