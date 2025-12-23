import { createBrowserRouter } from 'react-router-dom';
import { AnimalListPage, AnimalDetailPage } from '@/features/animals';
import { FoundationListPage, FoundationDetailPage } from '@/features/foundations';
import { CampaignDetailPage } from '@/features/donations';
import { HomePage } from '@/features/home';
import { NotFound } from '@/components/NotFound';
import { RedirectToPatitasUnidas } from '@/components/RedirectToPatitasUnidas';

/**
 * Configuración del router de la aplicación
 */
export const router = createBrowserRouter([
  // Ruta raíz - redirige a /patitas-unidas
  {
    path: '/',
    element: <RedirectToPatitasUnidas />,
  },
  // Rutas principales con prefijo /patitas-unidas
  {
    path: '/patitas-unidas',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/patitas-unidas/animales',
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AnimalListPage />,
      },
      {
        path: ':id',
        element: <AnimalDetailPage />,
      },
    ],
  },
  {
    path: '/patitas-unidas/fundaciones',
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <FoundationListPage />,
      },
      {
        path: ':id',
        element: <FoundationDetailPage />,
      },
    ],
  },
  {
    path: '/patitas-unidas/donaciones',
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <div>Campaigns List - Coming Soon</div>,
      },
      {
        path: ':id',
        element: <CampaignDetailPage />,
      },
    ],
  },
  // Rutas de redirección para URLs sin prefijo
  {
    path: '/animales',
    element: <RedirectToPatitasUnidas />,
  },
  {
    path: '/animales/:id',
    element: <RedirectToPatitasUnidas />,
  },
  {
    path: '/fundaciones',
    element: <RedirectToPatitasUnidas />,
  },
  {
    path: '/fundaciones/:id',
    element: <RedirectToPatitasUnidas />,
  },
  {
    path: '/donaciones',
    element: <RedirectToPatitasUnidas />,
  },
  {
    path: '/donaciones/:id',
    element: <RedirectToPatitasUnidas />,
  },
  // Ruta catch-all para 404
  {
    path: '*',
    element: <NotFound />,
  },
]);
