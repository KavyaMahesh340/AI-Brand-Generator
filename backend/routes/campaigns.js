const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')

const AI_URL = process.env.AI_ENGINE_URL || 'http://localhost:8001'
const USE_MOCK = process.env.USE_MOCK_AI !== 'false' // default: mock mode

// Mock AI responses (same data as frontend mockData.js)
function mockPipeline(campaign) {
  return {
    brand_dna: { tone_archetype: 'Caregiver', colour_emotion: 'warm/urgent', competitor_narrative_gap: 'Emotional validation over product specs', customer_core_aspiration: 'To become naturally confident', brand_voice_signature: ['warm', 'honest', 'nurturing'] },
    personas: [
      { id: uuidv4(), name: 'Ambitious Arjun', age: 28, location: 'Chennai', emotional_state: 'Aspirational but overwhelmed', morning_state: 'Rushed — opens Instagram while commuting', fear: 'Being stuck in mediocrity', language_phrases: ['real results', 'worth it'], jobs_to_be_done: 'Look competent without spending hours researching' },
    ],
    blind_spots: [
      { gap: 'Emotional validation over product specs', insight: 'Competitors talk features. Own the "you\'re not wrong for wanting this" narrative.', opportunity: 'Run a "Trust Your Gut" campaign series.' },
    ],
    cultural_moments: { primary_moment: 'Pongal / Harvest Season', timing_advice: 'Launch 3 weeks before Pongal.', moments: [], micro_trends: [] },
    emotion_outcome: { target_emotion: 'Inspired + Urgent', content_format: 'Short-form video testimonials', platform_recommendation: 'Instagram Reels in Tamil' },
    platform_translation: {
      linkedin: { platform: 'LinkedIn', tone: 'Thought-leader', content: 'Most brands stop at the buy now moment. This changes that.' },
      instagram: { platform: 'Instagram', tone: 'Visual story', content: 'The moment it clicked for me was when I stopped asking "is this good?" and started asking "who do I become?" ✨', hashtags: ['#BrandStory', '#MarketMind'] },
      tiktok: { platform: 'TikTok', tone: 'Hook-first', content: '"Stop selling the product. Start selling who they become." [7s hook]' },
      whatsapp: { platform: 'WhatsApp', tone: 'Conversational', content: 'Hey! Quick one — the response to our latest campaign has blown us away 🙌 Reply "SHOW ME" to see the top 3 posts.' },
    },
    risk_radar: {
      cultural_sensitivity: { score: 3, label: 'Low Risk', reason: 'Universal aspiration themes, no cultural risk.', flag: false },
      trend_expiry: { score: 5, label: 'Medium Risk', reason: '"Quiet luxury" has ~4-month shelf life.', flag: true, alternative: 'Use identity transformation — evergreen.' },
      creative_fatigue: { score: 4, label: 'Medium Risk', reason: 'Testimonial format saturates in ~3 weeks.', flag: true, alternative: 'Format rotation at week 3.' },
    },
    health_score: { overall: 84, persona_platform_fit: 92, message_clarity: 88, timing_alignment: 85, risk_score_inverted: 72, rationale: 'Strong alignment. Trend expiry is the primary risk.' },
  }
}

// POST /api/campaigns — create campaign
router.post('/', (req, res) => {
  const campaign = { id: uuidv4(), ...req.body, status: 'draft', created_at: new Date().toISOString() }
  res.status(201).json(campaign)
})

// GET /api/campaigns — list (with optional clientId filter)
router.get('/', (req, res) => {
  res.json([
    { id: '1', name: 'Pongal Harvest Launch', client: 'NatureBloom Co.', status: 'active', score: 84, goal: 'Brand Awareness', created_at: '2024-01-10' },
    { id: '2', name: 'Q1 LinkedIn Thought Leader', client: 'TechForge India', status: 'draft', score: 71, goal: 'Lead Generation', created_at: '2024-01-08' },
  ])
})

// GET /api/campaigns/:id
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Pongal Harvest Launch', status: 'active', score: 84, goal: 'Brand Awareness' })
})

// POST /api/campaigns/:id/generate — full 4-step pipeline with SSE
router.post('/:id/generate', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const steps = [
    'Reading Brand DNA fingerprint',
    'Mapping audience emotional state',
    'Detecting competitor blind spots',
    'Assembling platform strategy',
  ]

  const sendEvent = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`)

  try {
    for (let i = 0; i < steps.length; i++) {
      sendEvent({ step: i, label: steps[i], status: 'running' })
      await new Promise(r => setTimeout(r, 1500))
      sendEvent({ step: i, label: steps[i], status: 'done' })
    }

    let result
    if (USE_MOCK) {
      result = mockPipeline(req.body)
    } else {
      const { data } = await axios.post(`${AI_URL}/ai/generate`, { campaign_id: req.params.id, ...req.body })
      result = data
    }

    sendEvent({ step: 'complete', result })
    res.end()
  } catch (err) {
    sendEvent({ step: 'error', message: err.message })
    res.end()
  }
})

// PATCH /api/campaigns/:id/section — regenerate one section
router.patch('/:id/section', async (req, res) => {
  const { sectionType } = req.body
  await new Promise(r => setTimeout(r, 1500))
  res.json({ sectionType, content: mockPipeline({})[sectionType] || {}, regenerated: true })
})

// POST /api/campaigns/:id/translate
router.post('/:id/translate', async (req, res) => {
  await new Promise(r => setTimeout(r, 1200))
  res.json(mockPipeline({}).platform_translation)
})

// GET /api/campaigns/:id/risk
router.get('/:id/risk', (req, res) => {
  res.json(mockPipeline({}).risk_radar)
})

// GET /api/campaigns/:id/health-score
router.get('/:id/health-score', (req, res) => {
  res.json(mockPipeline({}).health_score)
})

// DELETE /api/campaigns/:id
router.delete('/:id', (req, res) => res.json({ deleted: true }))

module.exports = router
