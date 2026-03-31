import { Router, type IRouter } from 'express'
import passport from 'passport'
import { handleGoogleCallback, getMe, logout } from './auth.controller.js'
import { authenticate } from '../../middlewares/auth.middleware.js'

const router: IRouter = Router()

/**
 * GET /api/v1/auth/google
 * Inicia el flujo OAuth — redirige al usuario a la pantalla de login de Google.
 */
router.get('/google', passport.authenticate('google'))

/**
 * GET /api/v1/auth/google/callback
 * Google redirige aquí después de que el usuario acepta.
 * Passport verifica el code, obtiene el perfil y llama a handleGoogleCallback.
 * Si falla, redirige al frontend con error=auth_failed.
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env['FRONTEND_URL'] ?? 'http://localhost:5173'}/auth/callback?error=auth_failed`,
  }),
  handleGoogleCallback
)

/**
 * GET /api/v1/auth/me
 * Retorna los datos del usuario autenticado (requiere token válido).
 */
router.get('/me', authenticate, getMe)

/**
 * POST /api/v1/auth/logout
 * Logout stateless — el servidor no hace nada, el cliente descarta el token.
 */
router.post('/logout', authenticate, logout)

export default router
