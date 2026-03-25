import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Users, Calendar } from 'lucide-react';
import type { Campaign } from '../types/donation';

interface CampaignCardProps {
  campaign: Campaign;
}

/**
 * Componente de tarjeta para campañas de donación
 */
export function CampaignCard({ campaign }: CampaignCardProps) {
  const goal = campaign.goalAmount ?? 0;
  const progress = goal > 0 ? (campaign.raisedAmount / goal) * 100 : 0;

  return (
    <Link to={`/donaciones/${campaign.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
        <div className="relative aspect-video">
          <img
            src={campaign.imageUrl || '/placeholder.svg'}
            alt={campaign.title}
            className="object-cover w-full h-full"
          />
          {campaign.isUrgent && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
              <AlertCircle className="h-3 w-3 mr-1" />
              Urgente
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{campaign.title}</h3>

          <div className="space-y-3">
            {/* Progreso */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-primary">
                  ${campaign.raisedAmount.toLocaleString()} {campaign.currency}
                </span>
                {campaign.goalAmount != null && (
                  <span className="text-muted-foreground">
                    de ${campaign.goalAmount.toLocaleString()}
                  </span>
                )}
              </div>
              {goal > 0 && <Progress value={progress} className="h-2" />}
              {goal > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {progress.toFixed(0)}% alcanzado
                </p>
              )}
            </div>

            {/* Info adicional */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{campaign.donorCount} donantes</span>
              </div>
              {campaign.daysLeft != null && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{campaign.daysLeft} días restantes</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
