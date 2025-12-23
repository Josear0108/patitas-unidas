import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Stethoscope, Calendar } from 'lucide-react';
import type { HealthStatus } from '../types/animal';

interface AnimalHealthStatusProps {
  health: HealthStatus;
}

/**
 * Componente para mostrar el estado de salud del animal
 */
export function AnimalHealthStatus({ health }: AnimalHealthStatusProps) {
  const healthItems = [
    { label: 'Vacunado', value: health.vaccinated },
    { label: 'Esterilizado', value: health.sterilized },
    { label: 'Desparasitado', value: health.dewormed },
    { label: 'Microchip', value: health.microchipped },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Estado de Salud</h3>
        </div>

        <div className="space-y-3">
          {healthItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm">{item.label}</span>
              {item.value ? (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Sí</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">No</span>
                </div>
              )}
            </div>
          ))}

          {health.specialNeeds && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-1">Necesidades Especiales:</p>
              <p className="text-sm text-muted-foreground">{health.specialNeeds}</p>
            </div>
          )}

          {health.lastCheckup && (
            <div className="flex items-center gap-2 pt-3 border-t text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Último chequeo: {health.lastCheckup}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
