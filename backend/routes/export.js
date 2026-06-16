const express = require('express')
const router = express.Router()

// GET /api/export/:id/pdf
// In production: uses html2canvas on frontend or puppeteer on backend
// For now: returns campaign data for client-side PDF generation
router.get('/:id/pdf', async (req, res) => {
  await new Promise(r => setTimeout(r, 500))
  // Signal to frontend that data is ready for html2canvas capture
  res.json({
    campaign_id: req.params.id,
    ready: true,
    message: 'Use frontend jsPDF + html2canvas to generate PDF',
    pages: [
      'Brand DNA Card',
      'Persona Card — Ambitious Arjun',
      'Persona Card — Eco-Conscious Emily',
      'Persona Card — Pragmatic Priya',
      'Platform Breakdown',
      'Risk Radar Scores',
      'Campaign Calendar',
      'CampaignIQ Scorecard',
    ],
  })
})

module.exports = router
