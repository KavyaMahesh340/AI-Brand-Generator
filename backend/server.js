require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const clientRoutes = require('./routes/clients')
const campaignRoutes = require('./routes/campaigns')
const aiRoutes = require('./routes/ai')
const exportRoutes = require('./routes/export')

const app = express()
const PORT = process.env.PORT || 4000

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests' })
app.use('/api/', limiter)

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/clients', clientRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/export', exportRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() })
})

// ─── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`\n🌺 BloomBig Studio API running on http://localhost:${PORT}`)
  console.log(`   AI Engine: ${process.env.AI_ENGINE_URL || 'http://localhost:8001'} (mock mode)`)
  console.log(`   Supabase: ${process.env.SUPABASE_URL ? 'Connected' : 'Placeholder (set SUPABASE_URL in .env)'}\n`)
})

module.exports = app
