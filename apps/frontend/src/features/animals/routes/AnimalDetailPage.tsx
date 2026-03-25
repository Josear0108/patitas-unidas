import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
} from 'lucide-react'
import { useAnimal } from '../hooks/useAnimals'
import { PageWrapper } from '@/components/shared'
import { ANIMAL_SIZE_LABEL, ANIMAL_GENDER_LABEL } from '../types/animal'

export function AnimalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: animal, isLoading, error } = useAnimal(id ?? '')
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Cargando...</p>
        </div>
      </PageWrapper>
    )
  }

  if (error || !animal) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-destructive font-medium">{error?.message ?? 'Animal no encontrado'}</p>
          <Button onClick={() => navigate('/animales')} variant="outline">
            Volver a animales
          </Button>
        </div>
      </PageWrapper>
    )
  }

  const images = animal.imageUrls ?? (animal.imageUrl ? [animal.imageUrl] : ['/placeholder.svg']);

  return (
    <PageWrapper>
      <div className="container px-4 md:px-6 lg:px-8 py-6">
        {/* Breadcrumb row */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/animales"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Animales
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
                {animal.isUrgent && (
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
                      key={image || idx}
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

                {animal.description && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{animal.description}</p>
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
                    {animal.personality.map((trait) => (
                      <li key={trait} className="flex items-start gap-2 text-sm">
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
                    {animal.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm">
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
                    {animal.breed} • {animal.ageText}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {animal.size && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Tamaño</p>
                      <p className="font-semibold">{ANIMAL_SIZE_LABEL[animal.size]}</p>
                    </div>
                  )}
                  {animal.gender && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Género</p>
                      <p className="font-semibold">{ANIMAL_GENDER_LABEL[animal.gender]}</p>
                    </div>
                  )}
                </div>

                {/* Health Status */}
                {(animal.isVaccinated !== undefined ||
                  animal.isNeutered !== undefined ||
                  animal.isDewormed !== undefined ||
                  animal.hasMicrochip !== undefined) && (
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Estado de Salud</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Vacunado</span>
                        {animal.isVaccinated ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Esterilizado</span>
                        {animal.isNeutered ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Desparasitado</span>
                        {animal.isDewormed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Microchip</span>
                        {animal.hasMicrochip ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    </div>
                    {animal.lastCheckupAt && (
                      <p className="text-xs text-muted-foreground mt-3">
                        Último chequeo: {animal.lastCheckupAt}
                      </p>
                    )}
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
    </PageWrapper>
  );
}
