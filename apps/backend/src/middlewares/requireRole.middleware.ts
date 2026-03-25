import type { Request, Response, NextFunction } from 'express'
import type { AuthUser } from './auth.middleware.js'

type Role = AuthUser['role']

/**
 * Verifica que el usuario autenticado tenga uno de los roles indicados.
 */
export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'No autorizado' })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Permisos insuficientes' })
      return
    }

    next()
  }
}

/**
 * Verifica que el FOUNDATION_ADMIN solo acceda a recursos de su propia fundación.
 * El SUPER_ADMIN siempre pasa.
 *
 * @param getFoundationId - función que extrae el foundation_id del recurso a verificar
 */
export function requireOwnership(getFoundationId: (req: Request) => string | undefined) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'No autorizado' })
      return
    }

    if (req.user.role === 'SUPER_ADMIN') {
      next()
      return
    }

    const resourceFoundationId = getFoundationId(req)

    if (!resourceFoundationId || req.user.foundation_id !== resourceFoundationId) {
      res.status(403).json({ error: 'No tienes acceso a este recurso' })
      return
    }

    next()
  }
}
