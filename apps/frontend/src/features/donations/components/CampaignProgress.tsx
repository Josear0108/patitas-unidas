import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar } from 'lucide-react';

interface CampaignProgressProps {
  raisedAmount: number;
  goalAmount?: number | null;
  currency: string;
  donorCount: number;
  daysLeft?: number | null;
}

/**
 * Componente de progreso de campaña con estadísticas
 */
export function CampaignProgress({
  raisedAmount,
  goalAmount,
  currency,
  donorCount,
  daysLeft,
}: CampaignProgressProps) {
  const goal = goalAmount ?? 0;
  const progress = goal === 0 ? 0 : (raisedAmount / goal) * 100;
  const remaining = goal > 0 ? Math.max(0, goal - raisedAmount) : null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Montos */}
          <div>
            <div className="text-3xl font-bold text-primary mb-1">
              ${raisedAmount.toLocaleString()} {currency}
            </div>
            {goal > 0 && (
              <div className="text-sm text-muted-foreground">
                recaudados de ${goal.toLocaleString()} {currency}
              </div>
            )}
          </div>

          {/* Barra de progreso */}
          {goal > 0 && (
            <div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{progress.toFixed(1)}% alcanzado</span>
                {remaining != null && <span>${remaining.toLocaleString()} faltantes</span>}
              </div>
            </div>
          )}

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-bold">{donorCount}</div>
                <div className="text-xs text-muted-foreground">Donantes</div>
              </div>
            </div>
            {daysLeft != null && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-bold">{daysLeft}</div>
                  <div className="text-xs text-muted-foreground">Días restantes</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
