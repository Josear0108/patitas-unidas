import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/components/layout/Navigation';
import {
  ChevronRight,
  PawPrint,
  Search,
  Heart,
  MapPin,
  Clock,
  Home,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { mockAnimals } from '@/data/mockAnimals';
import { mockFoundations } from '@/data/mockFoundations';

/**
 * Página principal (Landing Page)
 */
export function HomePage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnimals = mockAnimals.filter((animal) => {
    const matchesType = selectedType === 'all' || animal.type === selectedType;
    const matchesSize = selectedSize === 'all' || animal.size === selectedSize;
    const matchesUrgent = !showUrgentOnly || animal.urgent;
    const matchesSearch =
      searchQuery === '' ||
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSize && matchesUrgent && matchesSearch;
  });

  const urgentAnimals = mockAnimals.filter((a) => a.urgent);

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-18">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden border-b">
        <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <Badge variant="outline" className="w-fit text-xs md:text-sm">
                Ayudando fundaciones con recursos limitados
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance">
                Cambiando vidas, una patita a la vez
              </h1>

              <p className="text-base md:text-lg text-muted-foreground text-pretty">
                Conectamos animales que necesitan hogar con familias que quieren dar amor. Apoyamos fundaciones pequeñas
                para que puedan hacer un gran impacto.
              </p>

              {/* Impact Stats - Mobile Responsive */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-primary">347</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Adopciones exitosas</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-primary">23</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Fundaciones activas</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-primary">127</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Esperando hogar</div>
                </div>
              </div>

              {/* CTAs - Mobile Touch Optimized (min 44px height) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="gap-2 h-12 md:h-11" asChild>
                  <Link to="/patitas-unidas/animales">
                    Ver animales disponibles
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 md:h-11 bg-transparent" asChild>
                  <Link to="/patitas-unidas/fundaciones">Conocer fundaciones</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image - Responsive */}
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted order-first lg:order-last">
              <img src="/happy-golden-retriever.png" alt="Perro feliz" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Cases Section */}
      <section className="bg-destructive/5 border-y py-4 md:py-6">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
              <h2 className="text-lg md:text-xl font-bold">Casos Urgentes</h2>
            </div>
            <Button variant="link" className="text-sm p-0 h-auto" asChild>
              <Link to="/patitas-unidas/animales">Ver todos</Link>
            </Button>
          </div>

          {/* Horizontal Scroll on Mobile */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="flex gap-3 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-4">
              {urgentAnimals.map((animal) => (
                <Link key={animal.id} to={`/animales/${animal.id}`} className="flex-shrink-0 w-64 md:w-auto">
                  <Card className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square">
                      <img
                        src={animal.image || '/placeholder.svg'}
                        alt={animal.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {animal.daysWaiting} días
                      </Badge>
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="font-bold text-base md:text-lg">{animal.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {animal.breed} • {animal.age}
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

      {/* Animals Section */}
      <section id="animales" className="py-8 md:py-16">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Animales Disponibles</h2>
            <p className="text-sm md:text-base text-muted-foreground">Encuentra a tu compañero ideal</p>
          </div>

          {/* Search Bar - Mobile First */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o ubicación..."
                className="pl-10 h-12 md:h-11 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters - Horizontal Scroll on Mobile */}
          <div className="mb-6 md:mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
                className="flex-shrink-0 h-10"
              >
                Todos
              </Button>
              <Button
                variant={selectedType === 'Perro' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('Perro')}
                className="flex-shrink-0 h-10"
              >
                🐕 Perros
              </Button>
              <Button
                variant={selectedType === 'Gato' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('Gato')}
                className="flex-shrink-0 h-10"
              >
                🐈 Gatos
              </Button>
              <Button
                variant={selectedSize === 'Pequeño' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSize(selectedSize === 'Pequeño' ? 'all' : 'Pequeño')}
                className="flex-shrink-0 h-10"
              >
                Pequeño
              </Button>
              <Button
                variant={selectedSize === 'Mediano' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSize(selectedSize === 'Mediano' ? 'all' : 'Mediano')}
                className="flex-shrink-0 h-10"
              >
                Mediano
              </Button>
              <Button
                variant={selectedSize === 'Grande' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSize(selectedSize === 'Grande' ? 'all' : 'Grande')}
                className="flex-shrink-0 h-10"
              >
                Grande
              </Button>
              <Button
                variant={showUrgentOnly ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setShowUrgentOnly(!showUrgentOnly)}
                className="flex-shrink-0 h-10"
              >
                Solo urgentes
              </Button>
            </div>
          </div>

          {/* Animals Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredAnimals.map((animal) => (
              <Link key={animal.id} to={`/animales/${animal.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
                  <div className="relative aspect-square">
                    <img
                      src={animal.image || '/placeholder.svg'}
                      alt={animal.name}
                      className="object-cover w-full h-full"
                    />
                    {animal.urgent && (
                      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                        Urgente
                      </Badge>
                    )}
                    <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{animal.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {animal.breed} • {animal.age}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{animal.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {animal.health?.vaccinated && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Vacunado</span>
                        </div>
                      )}
                      {animal.health?.sterilized && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Esterilizado</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredAnimals.length === 0 && (
            <div className="text-center py-12">
              <PawPrint className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron animales con esos filtros</p>
            </div>
          )}
        </div>
      </section>

      {/* Foundations Section */}
      <section id="fundaciones" className="py-8 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Fundaciones Verificadas</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Organizaciones comprometidas con el bienestar animal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {mockFoundations.map((foundation) => (
              <Link key={foundation.id} to={`/fundaciones/${foundation.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      {/* Logo */}
                      <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <img
                          src={foundation.logo || '/placeholder.svg'}
                          alt={foundation.name}
                          className="h-10 w-10 md:h-12 md:w-12"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-base md:text-lg leading-tight">{foundation.name}</h3>
                          {foundation.verified && (
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

                        {/* Stats - Mobile Responsive Grid */}
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
                              <div className="text-base md:text-lg font-bold text-primary">{foundation.stats.volunteers}</div>
                              <div className="text-[10px] md:text-xs text-muted-foreground">Voluntarios</div>
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

          {/* CTA to see all foundations */}
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" className="gap-2 h-12 bg-transparent" asChild>
              <Link to="/patitas-unidas/fundaciones">
                Ver todas las fundaciones
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Help Section - Mobile Optimized */}
      <section id="donar" className="py-8 md:py-16">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Cómo Puedes Ayudar</h2>
            <p className="text-sm md:text-base text-muted-foreground">Cada acción cuenta para salvar una vida</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Adopt Card */}
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
                  <Link to="/patitas-unidas/animales">
                    Ver disponibles
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex gap-2 pt-2">
                  {mockAnimals.slice(0, 3).map((animal) => (
                    <Link key={animal.id} to={`/animales/${animal.id}`} className="flex-1">
                      <img
                        src={animal.image || '/placeholder.svg'}
                        alt={animal.name}
                        className="w-full aspect-square rounded-lg object-cover hover:opacity-80 transition-opacity"
                      />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donate Card */}
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

            {/* Volunteer Card */}
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
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Paseos y cuidado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Transporte a veterinarias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Fotografía y diseño</span>
                  </div>
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

      {/* Testimonials - Mobile Optimized */}
      <section className="py-8 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Historias que nos inspiran</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Familias felices que encontraron a su compañero ideal
            </p>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2 md:overflow-visible md:mx-0 md:px-0">
            <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-6">
              {[
                {
                  name: 'María González',
                  pet: 'Max',
                  image: '/happy-woman-with-dog.jpg',
                  quote: 'Max cambió mi vida completamente. No puedo imaginar mi hogar sin él.',
                },
                {
                  name: 'Carlos Ruiz',
                  pet: 'Luna',
                  image: '/man-holding-cat.jpg',
                  quote: 'Luna es la compañera perfecta. El proceso de adopción fue muy fácil y transparente.',
                },
                {
                  name: 'Ana Martínez',
                  pet: 'Rocky',
                  image: '/family-with-large-dog.jpg',
                  quote: 'Rocky es parte de nuestra familia. Gracias por ayudarnos a encontrarlo.',
                },
              ].map((testimonial, idx) => (
                <Card key={idx} className="flex-shrink-0 w-72 md:w-auto">
                  <CardContent className="p-4 md:p-6 space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={testimonial.image || '/placeholder.svg'}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm italic text-muted-foreground">{testimonial.quote}</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">Adoptó a {testimonial.pet}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Responsive */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <PawPrint className="h-6 w-6 text-primary" />
                <span className="font-bold">Patitas Unidas</span>
              </div>
              <p className="text-sm text-muted-foreground">Conectando corazones con patitas desde 2020</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Adopción</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/patitas-unidas/animales" className="hover:text-foreground transition-colors">
                    Ver animales
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Requisitos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Proceso
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Ayuda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#donar" className="hover:text-foreground transition-colors">
                    Donar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Voluntariado
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Apadrinar
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Patitas Unidas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
