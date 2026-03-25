import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

interface HeroSectionProps {
  stats: {
    adoptions: number;
    foundations: number;
    waiting: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const stat1 = useCountUp(stats.adoptions);
  const stat2 = useCountUp(stats.foundations);
  const stat3 = useCountUp(stats.waiting);

  return (
    <section className="relative overflow-hidden border-b min-h-[85vh] flex items-center">
      {/* Background image — desktop only, covers right half */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
        <img
          src="/happy-golden-retriever.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
      </div>

      <div className="relative container px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24 w-full">
        {/* Mobile: image visible above text */}
        <div className="lg:hidden relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-8">
          <img src="/happy-golden-retriever.png" alt="Perro feliz" className="object-cover w-full h-full" />
        </div>

        <div className="max-w-2xl space-y-4 md:space-y-6">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            Colombia · Red de adopción
          </p>

          <Badge variant="outline" className="w-fit text-xs md:text-sm">
            Ayudando fundaciones con recursos limitados
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-none text-balance">
            Cambiando vidas, una patita a la vez
          </h1>

          <p className="text-base md:text-lg text-muted-foreground text-pretty">
            Conectamos animales que necesitan hogar con familias que quieren dar amor. Apoyamos fundaciones pequeñas
            para que puedan hacer un gran impacto.
          </p>

          <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
            <div className="space-y-1">
              <div ref={stat1.ref} className="text-2xl md:text-3xl font-bold text-primary">{stat1.count}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Adopciones exitosas</div>
            </div>
            <div className="space-y-1">
              <div ref={stat2.ref} className="text-2xl md:text-3xl font-bold text-primary">{stat2.count}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Fundaciones activas</div>
            </div>
            <div className="space-y-1 p-2 rounded-xl bg-destructive/10 border border-destructive/20 text-center">
              <div ref={stat3.ref} className="text-2xl md:text-3xl font-bold text-destructive">{stat3.count}</div>
              <div className="text-xs md:text-sm text-destructive/80 font-medium">esperando hoy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" className="gap-2 h-12 md:h-11" asChild>
              <Link to="/animales">
                Ver animales disponibles
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 md:h-11 bg-transparent" asChild>
              <Link to="/fundaciones">Conocer fundaciones</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
