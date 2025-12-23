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
  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <Link to={`/patitas-unidas/donaciones/${campaign.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
        <div className="relative aspect-video">
          <img
            src={campaign.coverImage || '/placeholder.svg'}
            alt={campaign.title}
            className="object-cover w-full h-full"
          />
          {campaign.urgency === 'high' && (
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
                  ${campaign.raised.toLocaleString()} {campaign.currency}
                </span>
                <span className="text-muted-foreground">
                  de ${campaign.goal.toLocaleString()}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {progress.toFixed(0)}% alcanzado
              </p>
            </div>

            {/* Info adicional */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{campaign.donors} donantes</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{campaign.daysLeft} días restantes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
