import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, MapPin, Award } from 'lucide-react';
import type { FoundationSummary } from '@patitas/types';

interface FoundationsSectionProps {
  foundations: FoundationSummary[];
}

export function FoundationsSection({ foundations }: FoundationsSectionProps) {
  return (
    <section id="fundaciones" className="py-8 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Fundaciones Verificadas</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Organizaciones comprometidas con el bienestar animal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {foundations.map((foundation) => (
            <Link key={foundation.id} to={`/fundaciones/${foundation.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <img
                        src={foundation.logoUrl || '/placeholder.svg'}
                        alt={foundation.name}
                        className="h-10 w-10 md:h-12 md:w-12"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-base md:text-lg leading-tight">{foundation.name}</h3>
                        {foundation.isVerified && (
                          <Badge variant="secondary" className="flex-shrink-0 text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            Verificada
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                        <span>{foundation.location}</span>
                      </div>

                      {foundation.stats && (
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          <div className="text-center p-2 bg-background rounded-lg">
                            <div className="text-base md:text-lg font-bold text-primary">
                              {foundation.stats.animalsRescued}
                            </div>
                            <div className="text-[10px] md:text-xs text-muted-foreground">Rescatados</div>
                          </div>
                          <div className="text-center p-2 bg-background rounded-lg">
                            <div className="text-base md:text-lg font-bold text-primary">
                              {foundation.stats.currentAnimals}
                            </div>
                            <div className="text-[10px] md:text-xs text-muted-foreground">En cuidado</div>
                          </div>
                          <div className="text-center p-2 bg-background rounded-lg">
                            <div className="text-base md:text-lg font-bold text-primary">
                              {foundation.stats.yearsActive}
                            </div>
                            <div className="text-[10px] md:text-xs text-muted-foreground">Años activos</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" variant="outline" className="gap-2 h-12 bg-transparent" asChild>
            <Link to="/fundaciones">
              Ver todas las fundaciones
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
