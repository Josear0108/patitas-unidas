import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PawPrint,
  Users,
  DollarSign,
  Menu,
  LogOut,
  UserCircle,
  ClipboardList,
  Heart,
  ShieldCheck,
} from 'lucide-react';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
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

/**
 * Derives up to two uppercase initials from a display name.
 * "Ana García" → "AG", "Carlos" → "C"
 */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

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

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Menú de ${user.name}`}
                    className="rounded-full transition-shadow hover:ring-2 hover:ring-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  >
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {getInitials(user.name)}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  {/* Non-interactive identity header */}
                  <div className="flex items-center gap-3 px-2 py-2">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {getInitials(user.name)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      Mi perfil
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/mis-solicitudes" className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      Mis solicitudes
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/guardados" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Animales guardados
                    </Link>
                  </DropdownMenuItem>

                  {user.role === 'SUPER_ADMIN' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin/verificaciones" className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4" />
                          Panel Admin
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={() => logout()}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="gap-2"
                asChild
              >
                {/* Usamos <a> en lugar de <Link> porque salimos del dominio del frontend */}
                <a href={GOOGLE_AUTH_URL}>
                  <GoogleIcon className="h-4 w-4" />
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
                {/* Authenticated user identity header inside Sheet */}
                {isAuthenticated && user && (
                  <div className="mb-4">
                    <div className="flex items-center gap-3 px-2 pb-4">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {getInitials(user.name)}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                  </div>
                )}

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
                      <GoogleIcon className="h-4 w-4" />
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
