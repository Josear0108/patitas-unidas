import { useFoundations } from '../hooks/useFoundations'
import { FoundationGrid } from '../components/FoundationGrid'
import { PageWrapper } from '@/components/shared'

export function FoundationListPage() {
  const { data: foundations = [], isLoading, error } = useFoundations()

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Cargando fundaciones...</p>
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-destructive">Error: {error.message}</p>
        </div>
      </PageWrapper>
    )
  }

  const verifiedFoundations = foundations.filter((f) => f.isVerified)

  return (
    <PageWrapper>
      <div className="container px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Fundaciones Verificadas
          </h1>
          <p className="text-muted-foreground">
            Organizaciones comprometidas con el rescate y bienestar animal
          </p>
        </div>

        <FoundationGrid
          foundations={verifiedFoundations}
          emptyMessage="No hay fundaciones disponibles en este momento."
        />

        {foundations.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Mostrando {verifiedFoundations.length} de {foundations.length} fundaciones
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
