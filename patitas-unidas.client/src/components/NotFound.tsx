import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <Search className="h-24 w-24 mx-auto text-muted-foreground opacity-50" />
          </div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-4">Página no encontrada</h2>
          <p className="text-muted-foreground mb-6">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link to="/patitas-unidas">
                <Home className="h-4 w-4 mr-2" />
                Ir al inicio
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/patitas-unidas/animales">Ver animales</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
