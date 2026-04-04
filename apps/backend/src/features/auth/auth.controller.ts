import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { AuthUser } from '../../middlewares/auth.middleware.js'
import type { users } from '../../../generated/prisma/client.js'
import { prisma } from '../../lib/prisma.js'

// =============================================================================
// Helpers privados
// =============================================================================

/**
 * Emite un JWT firmado con los datos mínimos necesarios para autorizar requests.
 * El token expira en 7 días — el usuario tendrá que volver a hacer login.
 */
function issueToken(user: users): string {
  const secret = process.env['JWT_SECRET']
  if (!secret) throw new Error('JWT_SECRET no configurado')

  const payload: AuthUser = {
    id: user.id,
    role: user.role,
    foundation_id: user.foundation_id,
  }

  return jwt.sign(payload, secret, { expiresIn: '1d' })
}

// =============================================================================
// Endpoints
// =============================================================================

/**
 * GET /api/v1/auth/google/callback
 * Passport ya verificó la identidad con Google y adjuntó el usuario en req.user.
 * Aquí emitimos el JWT y redirigimos al frontend con el token en la URL.
 *
 * El frontend lee el token de la URL, lo guarda en localStorage y lo usa
 * en el header Authorization de futuros requests.
 */
export function handleGoogleCallback(req: Request, res: Response): void {
  const user = req.user as users | undefined

  if (!user) {
    res.status(401).json({ error: 'Autenticación fallida' })
    return
  }

  const token = issueToken(user)
  const frontendUrl = process.env['FRONTEND_URL'] ?? 'http://localhost:5173'
  const isProd = process.env['NODE_ENV'] === 'production'

  res.cookie('token', token, {
    httpOnly: true,    // Solo el servidor puede leer el token
    secure: isProd,     // Solo se envía en HTTPS
    sameSite: isProd ? 'strict' : 'lax', // Prevenir ataques CSRF
    maxAge: 1000 * 60 * 60 * 24, // 1 días en ms
  })

  // Redirige al frontend sin el token en la URL
  res.redirect(`${frontendUrl}/auth/callback`)
}

/**
 * GET /api/v1/auth/me
 * Busca el usuario completo en BD y lo retorna.
 * El JWT solo contiene id/role/foundation_id — aquí añadimos name, email, avatar_url.
 */
export async function getMe(req: Request, res: Response): Promise<void> {
  const user = await prisma.users.findUnique({
    where: { id: req.user!.id },
    select: { id: true, name: true, email: true, avatar_url: true, role: true, foundation_id: true },
  })

  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' })
    return
  }

  res.json(user)
}

/**
 * POST /api/v1/auth/logout
 * El logout en JWT es stateless — el servidor no guarda tokens.
 * Le decimos al cliente que descarte el token desde su lado.
 */
export function logout(_req: Request, res: Response): void {
  const isProd = process.env['NODE_ENV'] === 'production'
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
  })
  res.json({ message: 'Sesión cerrada' })
}
