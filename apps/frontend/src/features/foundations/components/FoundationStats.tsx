import { Card, CardContent } from '@/components/ui/card';
import { PawPrint, Home, Calendar } from 'lucide-react';
import type { FoundationStats as StatsType } from '../types/foundation';

interface FoundationStatsProps {
  stats: StatsType;
}

/**
 * Componente para mostrar estadísticas de impacto de la fundación
 */
export function FoundationStats({ stats }: FoundationStatsProps) {
  const statsData = [
    {
      icon: PawPrint,
      label: 'Animales Rescatados',
      value: stats.animalsRescued,
      color: 'text-blue-600',
    },
    {
      icon: Home,
      label: 'Animales Actuales',
      value: stats.currentAnimals,
      color: 'text-green-600',
    },
    {
      icon: Calendar,
      label: 'Años de Operación',
      value: stats.yearsActive,
      color: 'text-primary',
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Impacto y Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statsData.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`flex justify-center mb-2 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
