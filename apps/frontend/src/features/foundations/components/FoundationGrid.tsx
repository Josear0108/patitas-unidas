import { FoundationCard } from './FoundationCard';
import type { Foundation } from '../types/foundation';

interface FoundationGridProps {
  foundations: Foundation[];
  emptyMessage?: string;
}

/**
 * Grid responsive de tarjetas de fundaciones
 */
export function FoundationGrid({
  foundations,
  emptyMessage = 'No se encontraron fundaciones.'
}: FoundationGridProps) {
  if (foundations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foundations.map((foundation) => (
        <FoundationCard key={foundation.id} foundation={foundation} />
      ))}
    </div>
  );
}
