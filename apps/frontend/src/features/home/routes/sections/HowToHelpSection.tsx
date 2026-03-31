import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Home, DollarSign, Users } from 'lucide-react';
import type { AnimalSummary } from '@patitas/types';

interface HowToHelpSectionProps {
  featuredAnimals: AnimalSummary[];
}

export function HowToHelpSection({ featuredAnimals }: HowToHelpSectionProps) {
  return (
    <section id="donar" className="py-8 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Cómo Puedes Ayudar</h2>
          <p className="text-sm md:text-base text-muted-foreground">Cada acción cuenta para salvar una vida</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Adopt */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-semibold">Adopta</h3>
                <p className="text-sm text-muted-foreground">127 perros y gatos esperan por ti</p>
              </div>
              <Button className="w-full gap-2 h-11" asChild>
                <Link to="/animales">
                  Ver disponibles
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex gap-2 pt-2">
                {featuredAnimals.map((animal) => (
                  <Link key={animal.id} to={`/animales/${animal.id}`} className="flex-1">
                    <img
                      src={animal.imageUrl || '/placeholder.svg'}
                      alt={animal.name}
                      className="w-full aspect-square rounded-lg object-cover hover:opacity-80 transition-opacity"
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Donate */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-semibold">Dona</h3>
                <p className="text-sm text-muted-foreground">2 campañas urgentes activas</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cirugía de Max</span>
                  <span className="font-medium">$450/$800</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '56%' }} />
                </div>
              </div>
              <Button className="w-full gap-2 h-11" asChild>
                <Link to="/donaciones/1">
                  Ayudar ahora
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Volunteer */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-semibold">Sé Voluntario</h3>
                <p className="text-sm text-muted-foreground">Comparte tu tiempo y habilidades</p>
              </div>
              <div className="space-y-1 text-sm">
                {['Paseos y cuidado', 'Transporte a veterinarias', 'Fotografía y diseño'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full gap-2 bg-transparent h-11" variant="outline">
                Unirme al equipo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
