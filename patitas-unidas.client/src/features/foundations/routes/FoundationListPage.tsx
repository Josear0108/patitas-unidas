import { useState, useEffect } from 'react';
import { foundationsService } from '../api/foundationsService';
import { FoundationGrid } from '../components/FoundationGrid';
import type { Foundation } from '../types/foundation';

/**
 * Página de lista de fundaciones
 */
export function FoundationListPage() {
  const [foundations, setFoundations] = useState<Foundation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    foundationsService
      .getAll()
      .then(setFoundations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando fundaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  const verifiedFoundations = foundations.filter((f) => f.verified);

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-18">
      <div className="container px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Fundaciones Verificadas
          </h1>
          <p className="text-muted-foreground">
            Organizaciones comprometidas con el rescate y bienestar animal
          </p>
        </div>

        {/* Grid de fundaciones */}
        <FoundationGrid
          foundations={verifiedFoundations}
          emptyMessage="No hay fundaciones disponibles en este momento."
        />

        {/* Contador */}
        {foundations.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Mostrando {verifiedFoundations.length} de {foundations.length} fundaciones
          </div>
        )}
      </div>
    </div>
  );
}
