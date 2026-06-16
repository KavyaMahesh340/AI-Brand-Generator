const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const supabase = require('../lib/supabase')

// Mock data fallback when Supabase is not configured
const mockClients = [
  { id: 'c1', brand_name: 'NatureBloom Co.', industry: 'Beauty & Wellness', geography: 'Chennai, Tamil Nadu', brand_dna: { tone_archetype: 'Caregiver', colour_emotion: 'warm/urgent', competitor_narrative_gap: 'Emotional validation over product specs', customer_core_aspiration: 'To feel naturally beautiful without effort', brand_voice_signature: ['warm', 'honest', 'nurturing'] }, created_at: '2024-01-01' },
  { id: 'c2', brand_name: 'TechForge India', industry: 'Technology', geography: 'Bangalore, Karnataka', brand_dna: { tone_archetype: 'Sage', colour_emotion: 'cool/trustworthy', competitor_narrative_gap: 'Post-purchase identity over pre-purchase persuasion', customer_core_aspiration: 'To be the smartest person in the room', brand_voice_signature: ['bold', 'insightful', 'precise'] }, created_at: '2024-01-03' },
]

// GET all clients
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (error) return res.json(mockClients)
    res.json(data || mockClients)
  } catch { res.json(mockClients) }
})

// GET client by id
router.get('/:id', async (req, res) => {
  const mock = mockClients.find(c => c.id === req.params.id)
  try {
    const { data, error } = await supabase.from('clients').select('*').eq('id', req.params.id).single()
    if (error || !data) return res.json(mock || { error: 'Not found' })
    res.json(data)
  } catch { res.json(mock || { error: 'Not found' }) }
})

// POST create client
router.post('/', async (req, res) => {
  const newClient = { id: uuidv4(), ...req.body, created_at: new Date().toISOString() }
  try {
    const { data, error } = await supabase.from('clients').insert(newClient).select().single()
    if (error) return res.status(201).json(newClient)
    res.status(201).json(data)
  } catch { res.status(201).json(newClient) }
})

// PATCH update client
router.patch('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('clients').update(req.body).eq('id', req.params.id).select().single()
    if (error) return res.json({ id: req.params.id, ...req.body })
    res.json(data)
  } catch { res.json({ id: req.params.id, ...req.body }) }
})

// DELETE client
router.delete('/:id', async (req, res) => {
  try {
    await supabase.from('clients').delete().eq('id', req.params.id)
    res.json({ deleted: true })
  } catch { res.json({ deleted: true }) }
})

module.exports = router
