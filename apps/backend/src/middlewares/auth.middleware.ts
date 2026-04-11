import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthUserSchema, type AuthUser } from '@patitas/types'

export type { AuthUser }

// Extendemos Express.User para que req.user sea AuthUser en todo el proyecto.
// Passport declara req.user como Express.User — al extenderla evitamos conflictos de tipos.
declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.token

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
    const raw = jwt.verify(token, secret)
    const result = AuthUserSchema.safeParse(raw)
    if (!result.success) {
      res.status(401).json({ error: 'Token inválido' })
      return
    }
    req.user = result.data
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}
