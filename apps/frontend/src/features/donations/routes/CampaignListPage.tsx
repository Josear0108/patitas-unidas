import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useDonations } from '../hooks/useDonations'
import { CampaignCard } from '../components/CampaignCard'
import { PageWrapper } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export function CampaignListPage() {
  const { data: campaigns = [], isLoading, error } = useDonations()

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
          <Spinner className="h-8 w-8" />
          <p className="text-muted-foreground text-sm">Cargando campañas...</p>
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-destructive font-medium">No pudimos cargar las campañas</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reintentar
          </Button>
          <Button asChild variant="ghost">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </PageWrapper>
    )
  }

  const urgentCampaigns = campaigns.filter((c) => c.isUrgent === true);
  const otherCampaigns = campaigns.filter((c) => c.isUrgent !== true);

  return (
    <PageWrapper>
      <div className="container px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-6 md:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            Campañas de Donación
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Cada donación marca la diferencia en la vida de un animal
          </p>
        </div>

        {urgentCampaigns.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-destructive mb-4">Campañas Urgentes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {urgentCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {otherCampaigns.length > 0 && (
          <div>
            {urgentCampaigns.length > 0 && (
              <h2 className="text-lg font-semibold mb-4">Otras Campañas</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {otherCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {campaigns.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No hay campañas activas en este momento.
          </div>
        )}

        {campaigns.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {campaigns.length} {campaigns.length === 1 ? 'campaña activa' : 'campañas activas'}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
