import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  MapPin,
  Calendar,
  Share2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Home,
  Activity,
  Users,
  Stethoscope,
  ChevronLeft,
} from 'lucide-react';
import { animalsService } from '../api/animalsService';
import type { Animal } from '../types/animal';

/**
 * Página de detalle de un animal específico
 */
export function AnimalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) {
      navigate('/patitas-unidas/animales');
      return;
    }

    animalsService
      .getById(Number(id))
      .then((data) => {
        if (data) {
          setAnimal(data);
        } else {
          setError('Animal no encontrado');
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

  if (error || !animal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error || 'Animal no encontrado'}</p>
          <Button onClick={() => navigate('/patitas-unidas/animales')}>
            Volver a animales
          </Button>
        </div>
      </div>
    );
  }

  const images = animal.images || (animal.image ? [animal.image] : ['/placeholder.svg']);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-40 backdrop-blur">
        <div className="container px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/animales"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Volver a animales
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
              <Button
                variant={isFavorite ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Guardado' : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={images[selectedImage] || '/placeholder.svg'}
                  alt={`${animal.name} - Imagen ${selectedImage + 1}`}
                  className="object-cover w-full h-full"
                />
                {animal.urgent && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Urgente - {animal.daysWaiting} días esperando
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image || '/placeholder.svg'}
                        alt={`Vista ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Conoce a {animal.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{animal.location}</span>
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    <span>En adopción desde hace {animal.daysWaiting} días</span>
                  </div>
                </div>

                {animal.story && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{animal.story}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Personality */}
            {animal.personality && animal.personality.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Personalidad y Temperamento</h3>
                  </div>
                  <ul className="space-y-2">
                    {animal.personality.map((trait, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {animal.requirements && animal.requirements.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Requisitos del Hogar Ideal</h3>
                  </div>
                  <ul className="space-y-2">
                    {animal.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Foundation Info */}
            {animal.foundation && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{animal.foundation.name}</h3>
                        <p className="text-sm text-muted-foreground">{animal.foundation.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {animal.foundation.animalsRescued} animales rescatados
                        </p>
                      </div>
                    </div>
                    <Link to={`/fundaciones/${animal.foundation.id}`}>
                      <Button variant="outline" size="sm">
                        Ver fundación
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{animal.name}</h1>
                  <p className="text-muted-foreground">
                    {animal.breed} • {animal.age}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Tamaño</p>
                    <p className="font-semibold">{animal.size}</p>
                  </div>
                  {animal.weight && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Peso</p>
                      <p className="font-semibold">{animal.weight}</p>
                    </div>
                  )}
                  {animal.gender && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Género</p>
                      <p className="font-semibold">{animal.gender}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="font-semibold">{animal.type}</p>
                  </div>
                </div>

                {/* Health Status */}
                {animal.health && (
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Estado de Salud</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Vacunado</span>
                        {animal.health.vaccinated ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Esterilizado</span>
                        {animal.health.sterilized ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Desparasitado</span>
                        {animal.health.dewormed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Microchip</span>
                        {animal.health.microchipped ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Último chequeo: {animal.health.lastCheckup}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  <Button size="lg" className="w-full">
                    Solicitar Adopción
                  </Button>
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    Apadrinar a {animal.name}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Proceso de adopción responsable • Verificación de hogar • Seguimiento post-adopción
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
