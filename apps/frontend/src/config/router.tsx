import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

const HomePage = lazy(() =>
  import('@/features/home').then((m) => ({ default: m.HomePage }))
);
const AnimalListPage = lazy(() =>
  import('@/features/animals').then((m) => ({ default: m.AnimalListPage }))
);
const AnimalDetailPage = lazy(() =>
  import('@/features/animals').then((m) => ({ default: m.AnimalDetailPage }))
);
const FoundationListPage = lazy(() =>
  import('@/features/foundations').then((m) => ({ default: m.FoundationListPage }))
);
const FoundationDetailPage = lazy(() =>
  import('@/features/foundations').then((m) => ({ default: m.FoundationDetailPage }))
);
const CampaignListPage = lazy(() =>
  import('@/features/donations').then((m) => ({ default: m.CampaignListPage }))
);
const CampaignDetailPage = lazy(() =>
  import('@/features/donations').then((m) => ({ default: m.CampaignDetailPage }))
);

const fallback = (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner className="h-8 w-8" />
  </div>
);

function s(element: React.ReactNode) {
  return <Suspense fallback={fallback}>{element}</Suspense>;
}

/**
 * Configuración del router de la aplicación.
 * Todas las páginas se cargan con React.lazy para code-splitting automático.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: s(<HomePage />),
  },
  {
    path: '/animales',
    children: [
      {
        index: true,
        element: s(<AnimalListPage />),
      },
      {
        path: ':id',
        element: s(<AnimalDetailPage />),
      },
    ],
  },
  {
    path: '/fundaciones',
    children: [
      {
        index: true,
        element: s(<FoundationListPage />),
      },
      {
        path: ':id',
        element: s(<FoundationDetailPage />),
      },
    ],
  },
  {
    path: '/donaciones',
    children: [
      {
        index: true,
        element: s(<CampaignListPage />),
      },
      {
        path: ':id',
        element: s(<CampaignDetailPage />),
      },
    ],
  },
]);
