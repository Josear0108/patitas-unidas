import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar } from 'lucide-react';

interface CampaignProgressProps {
  raised: number;
  goal: number;
  currency: string;
  donors: number;
  daysLeft: number;
}

/**
 * Componente de progreso de campaña con estadísticas
 */
export function CampaignProgress({
  raised,
  goal,
  currency,
  donors,
  daysLeft,
}: CampaignProgressProps) {
  const progress = (raised / goal) * 100;
  const remaining = goal - raised;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Montos */}
          <div>
            <div className="text-3xl font-bold text-primary mb-1">
              ${raised.toLocaleString()} {currency}
            </div>
            <div className="text-sm text-muted-foreground">
              recaudados de ${goal.toLocaleString()} {currency}
            </div>
          </div>

          {/* Barra de progreso */}
          <div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{progress.toFixed(1)}% alcanzado</span>
              <span>${remaining.toLocaleString()} faltantes</span>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-bold">{donors}</div>
                <div className="text-xs text-muted-foreground">Donantes</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-bold">{daysLeft}</div>
                <div className="text-xs text-muted-foreground">Días restantes</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
