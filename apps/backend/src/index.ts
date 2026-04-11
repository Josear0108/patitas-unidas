import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { configurePassport } from './features/auth/auth.config.js'
import cookieParser from 'cookie-parser'
import foundationsRouter from './features/foundations/foundations.routes.js'
import animalsRouter from './features/animals/animals.routes.js'
import campaignsRouter from './features/campaigns/campaigns.routes.js'
import authRouter from './features/auth/auth.routes.js'
import verificationRouter from './features/verification/verification.routes.js'
import adminRouter from './features/admin/admin.routes.js'

// Inicializa la estrategia de Google OAuth antes de registrar rutas
configurePassport()

const app = express()
const PORT = process.env['PORT'] ?? 3000

app.use(helmet())
app.use(cors({
  origin: process.env['FRONTEND_URL'] ?? 'http://localhost:5173',
  credentials: true, // Permite enviar cookies con la request
}))
app.use(cookieParser()) // Para leer las cookies de las requests
app.use(rateLimit({ windowMs: 60_000, max: 100, standardHeaders: true, legacyHeaders: false }))

// CSRF mitigation: reject state-mutating requests from unexpected origins.
// OPTIONS preflight requests are excluded — CORS middleware handles those above.
app.use((req, res, next) => {
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
    const origin = req.headers['origin'] ?? req.headers['referer'] ?? ''
    const allowed = process.env['FRONTEND_URL'] ?? 'http://localhost:5173'
    if (!String(origin).startsWith(allowed)) {
      res.status(403).json({ error: 'Origen no permitido' })
      return
    }
  }
  next()
})
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/foundations', foundationsRouter)
app.use('/api/v1/animals', animalsRouter)
app.use('/api/v1/campaigns', campaignsRouter)
app.use('/api/v1/verification', verificationRouter)
app.use('/api/v1/admin', adminRouter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error({ message: err.message, name: err.name, stack: process.env['NODE_ENV'] !== 'production' ? err.stack : undefined })
  res.status(500).json({ error: 'Error interno del servidor' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
