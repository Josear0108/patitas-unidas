import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface AnimalGalleryProps {
  images: string[];
  name: string;
  urgent?: boolean;
  daysWaiting?: number;
}

/**
 * Galería de imágenes del animal con thumbnails
 */
export function AnimalGallery({ images, name, urgent, daysWaiting }: AnimalGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Imagen Principal */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
        <img
          src={images[selectedImage] || '/placeholder.svg'}
          alt={`${name} - Imagen ${selectedImage + 1}`}
          className="object-cover w-full h-full"
        />
        {urgent && daysWaiting && (
          <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Urgente - {daysWaiting} días esperando
          </Badge>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-muted-foreground/20'
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
  );
}
