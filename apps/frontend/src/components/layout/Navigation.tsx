import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PawPrint, Users, DollarSign, Menu, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';

const navLinks = [
  { href: '/animales', label: 'Animales', icon: PawPrint },
  { href: '/fundaciones', label: 'Fundaciones', icon: Users },
  { href: '/donaciones', label: 'Donar', icon: DollarSign },
];

/**
 * La URL de auth de Google viene del backend.
 * El frontend solo necesita saber a qué URL redirigir — no genera tokens.
 */
const GOOGLE_AUTH_URL = `${import.meta.env['VITE_API_URL'] ?? 'http://localhost:3000/api/v1'}/auth/google`

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PawPrint className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <span className="font-bold text-lg md:text-xl">Patitas Unidas</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium">{user?.name}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 bg-transparent"
                asChild
              >
                {/* Usamos <a> en lugar de <Link> porque salimos del dominio del frontend */}
                <a href={GOOGLE_AUTH_URL}>
                  <LogIn className="h-4 w-4" />
                  Entrar con Google
                </a>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="sm" variant="ghost" className="md:hidden" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <div className="flex items-center gap-2 mb-8 mt-2">
                <PawPrint className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Patitas Unidas</span>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-base font-medium py-3 px-2 rounded-lg hover:bg-accent hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    {label}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm px-2 text-muted-foreground">
                      {user?.name}
                    </p>
                    <Button
                      className="w-full gap-2"
                      variant="outline"
                      onClick={() => { logout(); setOpen(false); }}
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <Button className="mt-4 w-full gap-2" asChild>
                    <a href={GOOGLE_AUTH_URL} onClick={() => setOpen(false)}>
                      <LogIn className="h-4 w-4" />
                      Entrar con Google
                    </a>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
