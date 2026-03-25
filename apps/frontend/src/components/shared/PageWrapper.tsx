import { cn } from '@/lib/utils';
import { Navigation } from '@/components/layout/Navigation';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper estándar para todas las páginas de la aplicación.
 * Incluye el Navigation y el fondo base para evitar repetición en cada página.
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn('min-h-screen bg-background pt-16 md:pt-18', className)}>
      <Navigation />
      {children}
    </div>
  );
}
