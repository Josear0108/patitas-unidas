import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente que redirige rutas sin prefijo /patitas-unidas al prefijo correcto
 */
export function RedirectToPatitasUnidas() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirigir agregando el prefijo /patitas-unidas
    const newPath = `/patitas-unidas${location.pathname}${location.search}${location.hash}`;
    navigate(newPath, { replace: true });
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Redirigiendo...</p>
    </div>
  );
}
