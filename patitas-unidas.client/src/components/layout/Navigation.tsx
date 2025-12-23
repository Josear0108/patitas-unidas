import { Button } from '@/components/ui/button';
import { PawPrint, Users, DollarSign, Heart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/patitas-unidas" className="flex items-center gap-2">
            <PawPrint className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <span className="font-bold text-lg md:text-xl">Patitas Unidas</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#animales"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <PawPrint className="h-4 w-4" />
              Animales
            </a>
            <a
              href="#fundaciones"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              Fundaciones
            </a>
            <a
              href="#donar"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              Donar
            </a>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Heart className="h-4 w-4" />
              Voluntario
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button size="sm" variant="ghost" className="md:hidden">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
