import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle2 } from 'lucide-react';
import type { FoundationSummary } from '@patitas/types';

interface FoundationCardProps {
  foundation: FoundationSummary;
  className?: string;
}

/**
 * Componente de tarjeta para mostrar información resumida de una fundación
 */
export function FoundationCard({ foundation, className = '' }: FoundationCardProps) {
  // FoundationSummary incluye stats como campo requerido (no opcional)
  return (
    <Link
      to={`/fundaciones/${foundation.id}`}
      className={`block ${className}`}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <img
                src={foundation.logoUrl || '/placeholder.svg'}
                alt={foundation.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              {foundation.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg mb-1 truncate">{foundation.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{foundation.location}</span>
              </div>
            </div>
          </div>

          {foundation.stats && (
            <div className="grid grid-cols-3 gap-3 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {foundation.stats.animalsRescued}
                </div>
                <div className="text-xs text-muted-foreground">Rescatados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {foundation.stats.currentAnimals}
                </div>
                <div className="text-xs text-muted-foreground">Actuales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {foundation.stats.yearsActive}
                </div>
                <div className="text-xs text-muted-foreground">Años activos</div>
              </div>
            </div>
          )}

          {foundation.isVerified && (
            <Badge variant="outline" className="mt-4 w-full justify-center">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Verificada
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
