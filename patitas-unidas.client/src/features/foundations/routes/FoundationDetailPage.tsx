import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Users,
  Heart,
  Calendar,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  DollarSign,
  PawPrint,
  Award,
  TrendingUp,
} from 'lucide-react';
import { foundationsService } from '../api/foundationsService';
import type { Foundation } from '../types/foundation';

/**
 * Página de detalle de una fundación específica
 */
export function FoundationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [foundation, setFoundation] = useState<Foundation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/patitas-unidas/fundaciones');
      return;
    }

    foundationsService
      .getById(Number(id))
      .then((data) => {
        if (data) {
          setFoundation(data);
        } else {
          setError('Fundación no encontrada');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (error || !foundation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error || 'Fundación no encontrada'}</p>
          <Button onClick={() => navigate('/patitas-unidas/fundaciones')}>
            Volver a fundaciones
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-40 backdrop-blur">
        <div className="container px-4 md:px-6 lg:px-8 py-4">
          <Link
            to="/fundaciones"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver a fundaciones
          </Link>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-muted">
        <img
          src={foundation.coverImage || '/placeholder.svg'}
          alt="Fundación"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container px-4 md:px-6 lg:px-8">
        {/* Foundation Header */}
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="relative">
              <div className="h-32 w-32 rounded-2xl bg-background border-4 border-background shadow-xl overflow-hidden">
                <img
                  src={foundation.logo || '/placeholder.svg'}
                  alt={foundation.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{foundation.name}</h1>
                <p className="text-muted-foreground">{foundation.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {foundation.location}
                </Badge>
                {foundation.founded && (
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Desde {foundation.founded}
                  </Badge>
                )}
                {foundation.verified && (
                  <Badge variant="secondary" className="gap-1">
                    <Award className="h-3 w-3" />
                    Verificada
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="lg" className="gap-2">
                <Heart className="h-4 w-4" />
                Donar Ahora
              </Button>
              <Button size="lg" variant="outline">
                Contactar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Impact Stats */}
            {foundation.stats && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Nuestro Impacto
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center space-y-1">
                      <div className="text-3xl font-bold text-primary">
                        {foundation.stats.animalsRescued}
                      </div>
                      <div className="text-xs text-muted-foreground">Animales rescatados</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-3xl font-bold text-primary">
                        {foundation.stats.adoptionsCompleted}
                      </div>
                      <div className="text-xs text-muted-foreground">Adopciones exitosas</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-3xl font-bold text-primary">
                        {foundation.stats.currentAnimals}
                      </div>
                      <div className="text-xs text-muted-foreground">En cuidado actual</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-3xl font-bold text-primary">
                        {foundation.stats.volunteers}
                      </div>
                      <div className="text-xs text-muted-foreground">Voluntarios activos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About */}
            {foundation.description && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Nuestra Historia</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {foundation.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Mission & Vision */}
            {(foundation.mission || foundation.vision) && (
              <div className="grid md:grid-cols-2 gap-6">
                {foundation.mission && (
                  <Card>
                    <CardContent className="p-6 space-y-3">
                      <h3 className="font-bold text-lg">Misión</h3>
                      <p className="text-sm text-muted-foreground">{foundation.mission}</p>
                    </CardContent>
                  </Card>
                )}
                {foundation.vision && (
                  <Card>
                    <CardContent className="p-6 space-y-3">
                      <h3 className="font-bold text-lg">Visión</h3>
                      <p className="text-sm text-muted-foreground">{foundation.vision}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Achievements */}
            {foundation.achievements && foundation.achievements.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Logros y Reconocimientos
                  </h2>
                  <ul className="space-y-2">
                    {foundation.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Award className="h-3 w-3 text-primary" />
                        </div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Animals Available */}
            {foundation.currentAnimals && foundation.currentAnimals.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <PawPrint className="h-5 w-5 text-primary" />
                      Animales Disponibles ({foundation.currentAnimals.length})
                    </h2>
                    <Button variant="outline" size="sm">
                      Ver todos
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {foundation.currentAnimals.map((animal) => (
                      <Link key={animal.id} to={`/animales/${animal.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-square relative">
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
                          </div>
                          <CardContent className="p-3">
                            <p className="font-semibold">{animal.name}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            {foundation.contact && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold">Información de Contacto</h3>
                  <div className="space-y-3">
                    {foundation.contact.phone && (
                      <a
                        href={`tel:${foundation.contact.phone}`}
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{foundation.contact.phone}</span>
                      </a>
                    )}
                    {foundation.contact.email && (
                      <a
                        href={`mailto:${foundation.contact.email}`}
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{foundation.contact.email}</span>
                      </a>
                    )}
                    {foundation.contact.website && (
                      <a
                        href={`https://${foundation.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span>{foundation.contact.website}</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Campaigns */}
            {foundation.activeCampaigns && foundation.activeCampaigns.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">Campañas Activas</h3>
                    <Badge variant="secondary">{foundation.activeCampaigns.length}</Badge>
                  </div>
                  <div className="space-y-4">
                    {foundation.activeCampaigns.map((campaign) => (
                      <Link key={campaign.id} to={`/donaciones/${campaign.id}`}>
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4 space-y-3">
                            <div>
                              <p className="font-semibold text-sm">{campaign.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {campaign.daysLeft} días restantes
                              </p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Recaudado</span>
                                <span className="font-medium">
                                  ${campaign.raised} / ${campaign.goal}
                                </span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                                />
                              </div>
                            </div>
                            <Button size="sm" className="w-full">
                              Donar
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ways to Help */}
            <Card className="bg-primary/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold">Cómo Ayudar</h3>
                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <DollarSign className="h-4 w-4" />
                    Hacer una donación
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Users className="h-4 w-4" />
                    Ser voluntario
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Heart className="h-4 w-4" />
                    Apadrinar un animal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
