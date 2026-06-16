const express = require('express')
const router = express.Router()

// POST /api/ai/extract-brand-dna
router.post('/extract-brand-dna', async (req, res) => {
  await new Promise(r => setTimeout(r, 2000))
  const { brand_name, industry, tone_archetype } = req.body
  res.json({
    tone_archetype: tone_archetype || 'Caregiver',
    colour_emotion: 'warm/urgent',
    competitor_narrative_gap: `Most competitors in ${industry || 'this category'} focus on features. The audience secretly wants to feel seen, not sold to. White space: brand identity and belonging.`,
    customer_core_aspiration: `To become the version of themselves that ${brand_name || 'your brand'} helps unlock — not just to buy a product.`,
    brand_voice_signature: ['bold', 'human', 'unapologetic'],
  })
})

// POST /api/ai/blind-spots
router.post('/blind-spots', async (req, res) => {
  await new Promise(r => setTimeout(r, 2200))
  res.json([
    { gap: 'Emotional validation over product specs', insight: 'Every competitor talks about what their product does. Not one of them tells your audience they\'re already making the right choice.', opportunity: 'Run a "Trust Your Gut" campaign series.' },
    { gap: 'Post-purchase identity, not pre-purchase persuasion', insight: 'All competitor ads stop at the buy now moment. The transformation story is completely untapped.', opportunity: 'UGC series: "3 months later" customer stories.' },
    { gap: 'Regional language emotional resonance', insight: 'Zero competitors are creating emotionally resonant content in Tamil, Kannada, or Telugu.', opportunity: 'Native-language content that feels written by someone from the community.' },
  ])
})

// POST /api/ai/cultural-moments
router.post('/cultural-moments', async (req, res) => {
  await new Promise(r => setTimeout(r, 1800))
  const { geography, month } = req.body
  res.json({
    primary_moment: 'Pongal / Harvest Season',
    timing_advice: 'Launch 3 weeks before Pongal (Jan 14). Use harvest and abundance imagery.',
    language_tip: 'Tamil-language captions will outperform English by ~40% in this window.',
    moments: [
      { name: 'Pongal', date: 'Jan 14', relevance: 'high', note: 'Abundance, gratitude, new beginnings' },
      { name: 'Republic Day', date: 'Jan 26', relevance: 'medium', note: 'National pride — use carefully' },
      { name: "Valentine's Day", date: 'Feb 14', relevance: 'low', note: 'Saturated — avoid unless core to brand' },
    ],
    micro_trends: ['"Quiet Luxury" gaining traction in Tier 1 cities', 'Short-form regional language content up 3× on Instagram'],
  })
})

// POST /api/ai/empathy-simulator
router.post('/empathy-simulator', async (req, res) => {
  await new Promise(r => setTimeout(r, 2800))
  const { persona_name } = req.body
  res.json({
    persona_name: persona_name || 'Ambitious Arjun',
    emotional_response: 'Seen but slightly cautious',
    would_save: true,
    would_share: false,
    save_reason: "I'd revisit this when I'm feeling low and need a reminder.",
    share_barrier: 'Feels too polished for my personal feed.',
    suggested_edit: 'Add one imperfect, vulnerable sentence. Drop the last line — it feels like a hard sell.',
    engagement_prediction: 'High saves, medium comments, low shares without the edit.',
  })
})

module.exports = router
