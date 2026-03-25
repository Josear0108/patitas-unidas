import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

/**
 * Footer global de la aplicación
 */
export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="font-bold">Patitas Unidas</span>
            </div>
            <p className="text-sm text-muted-foreground">Conectando corazones con patitas desde 2020</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm md:text-base">Adopción</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/animales" className="hover:text-foreground transition-colors">
                  Ver animales
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Requisitos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Proceso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm md:text-base">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#donar" className="hover:text-foreground transition-colors">
                  Donar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Voluntariado
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Apadrinar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm md:text-base">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Patitas Unidas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
