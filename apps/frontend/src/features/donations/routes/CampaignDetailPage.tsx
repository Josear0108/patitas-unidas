import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, AlertCircle, Award } from 'lucide-react'
import { useDonation } from '../hooks/useDonations'
import { CampaignProgress } from '../components/CampaignProgress'
import { PageWrapper } from '@/components/shared'

export function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: campaign, isLoading, error } = useDonation(id ?? '')

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </PageWrapper>
    )
  }

  if (error || !campaign) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <p className="text-destructive">{error?.message ?? 'Campaña no encontrada'}</p>
            <Button onClick={() => navigate('/donaciones')}>Volver a campañas</Button>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-40 backdrop-blur">
        <div className="container px-4 md:px-6 lg:px-8 py-4">
          <Link
            to="/donaciones"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver a campañas
          </Link>
        </div>
      </div>

      <div className="container px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              {campaign.isUrgent && (
                <Badge className="mb-3 bg-destructive text-destructive-foreground">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Campaña Urgente{campaign.daysLeft != null ? ` - ${campaign.daysLeft} días restantes` : ''}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{campaign.title}</h1>
            </div>

            {/* Cover Image */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
              <img
                src={campaign.imageUrl || '/placeholder.svg'}
                alt={campaign.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Descripción */}
            {campaign.description && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Sobre esta campaña</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {campaign.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Actualizaciones */}
            {campaign.updates && campaign.updates.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Actualizaciones</h3>
                  <div className="space-y-4">
                    {campaign.updates.map((update) => (
                      <div key={`${update.date}-${update.message.slice(0, 20)}`} className="border-l-2 border-primary pl-4">
                        <div className="text-sm text-muted-foreground mb-1">
                          {update.date}
                        </div>
                        <p className="text-sm">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top Donantes */}
            {campaign.topDonors && campaign.topDonors.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Donantes Destacados</h3>
                  </div>
                  <div className="space-y-3">
                    {campaign.topDonors.map((donor) => (
                      <div
                        key={`${donor.name}-${donor.amount}`}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{donor.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Hace {donor.daysAgo} días
                          </div>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          ${donor.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progreso */}
            <CampaignProgress
              raisedAmount={campaign.raisedAmount}
              goalAmount={campaign.goalAmount}
              currency={campaign.currency}
              donorCount={campaign.donorCount}
              daysLeft={campaign.daysLeft}
            />

            {/* CTA Donar */}
            <Card>
              <CardContent className="p-6">
                <Button className="w-full" size="lg">
                  Donar Ahora
                </Button>
              </CardContent>
            </Card>

            {/* Recompensas */}
            {campaign.rewards && campaign.rewards.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Recompensas</h3>
                  <div className="space-y-3">
                    {campaign.rewards.map((reward) => (
                      <div key={`${reward.minimumAmount}-${reward.title}`} className="border rounded-lg p-3">
                        <div className="font-bold text-primary mb-1">
                          ${reward.minimumAmount}+
                        </div>
                        <div className="font-medium text-sm mb-1">{reward.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {reward.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
