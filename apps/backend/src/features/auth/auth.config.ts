import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { prisma } from '../../lib/prisma.js'

/**
 * Configura Passport con la estrategia de Google OAuth 2.0.
 * Se llama una sola vez al iniciar el servidor desde index.ts.
 *
 * Cuando Google confirma la identidad del usuario, Passport llama al callback
 * con el perfil. Aquí buscamos o creamos el usuario en la BD y lo retornamos
 * para que el controlador pueda emitir el JWT.
 */
export function configurePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'] ?? '',
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
        callbackURL: '/api/v1/auth/google/callback',
        // Pedimos solo los scopes mínimos necesarios: perfil básico y email
        scope: ['profile', 'email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value
          const googleId = profile.id
          const name = profile.displayName
          const avatarUrl = profile.photos?.[0]?.value ?? null

          if (!email) {
            return done(new Error('No se pudo obtener el email de Google'))
          }

          // Busca el usuario por google_id. Si no existe, lo crea.
          // upsert = update si existe, insert si no existe
          const user = await prisma.users.upsert({
            where: { google_id: googleId },
            update: { name, avatar_url: avatarUrl },
            create: {
              google_id: googleId,
              email,
              name,
              avatar_url: avatarUrl,
            },
          })

          return done(null, user)
        } catch (err) {
          return done(err as Error)
        }
      }
    )
  )
}
