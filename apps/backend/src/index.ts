import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { configurePassport } from './features/auth/auth.config.js'

import foundationsRouter from './features/foundations/foundations.routes.js'
import animalsRouter from './features/animals/animals.routes.js'
import campaignsRouter from './features/campaigns/campaigns.routes.js'
import authRouter from './features/auth/auth.routes.js'

// Inicializa la estrategia de Google OAuth antes de registrar rutas
configurePassport()

const app = express()
const PORT = process.env['PORT'] ?? 3000

app.use(helmet())
app.use(cors({ origin: process.env['FRONTEND_URL'] ?? 'http://localhost:5173' }))
app.use(rateLimit({ windowMs: 60_000, max: 100, standardHeaders: true, legacyHeaders: false }))
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/foundations', foundationsRouter)
app.use('/api/v1/animals', animalsRouter)
app.use('/api/v1/campaigns', campaignsRouter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
