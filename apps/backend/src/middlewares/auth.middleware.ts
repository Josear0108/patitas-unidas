import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthUser {
  id: string
  role: 'SUPER_ADMIN' | 'FOUNDATION_ADMIN' | 'VERIFIED_USER' | 'VISITOR'
  foundation_id: string | null
}

// Extendemos Express.User para que req.user sea AuthUser en todo el proyecto.
// Passport declara req.user como Express.User — al extenderla evitamos conflictos de tipos.
declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization']
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    res.status(401).json({ error: 'No autorizado' })
    return
  }

  const secret = process.env['JWT_SECRET']
  if (!secret) {
    res.status(500).json({ error: 'JWT_SECRET no configurado' })
    return
  }

  try {
    const payload = jwt.verify(token, secret) as AuthUser
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}
