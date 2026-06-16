import { useState, useRef } from 'react'
import { Download, FileText, Sparkles, Check } from 'lucide-react'
import { mockPersonas, mockBrandDna, mockRiskRadar, mockHealthScore } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'

export default function ExportPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)
  const exportRef = useRef()

  const PAGES = [
    { n: 1, title: language === 'ta' ? 'பிராண்ட் டிஎன்ஏ அட்டை' : 'Brand DNA Card', desc: language === 'ta' ? '5 கைரேகை பண்புகள்' : '5 fingerprint attributes', icon: '🧬' },
    { n: 2, title: language === 'ta' ? 'நபர் அட்டை — அரவிந்த்' : 'Persona Card — Ambitious Arjun', desc: language === 'ta' ? 'உணர்ச்சி + பயம் + மொழி அடுக்குகள்' : 'Emotional + fear + language layers', icon: '🚀' },
    { n: 3, title: language === 'ta' ? 'நபர் அட்டை — எமிலி' : 'Persona Card — Eco-Conscious Emily', desc: language === 'ta' ? 'உணர்ச்சி + பயம் + மொழி அடுக்குகள்' : 'Emotional + fear + language layers', icon: '🌱' },
    { n: 4, title: language === 'ta' ? 'நபர் அட்டை — பிரியா' : 'Persona Card — Pragmatic Priya', desc: language === 'ta' ? 'உணர்ச்சி + பயம் + மொழி அடுக்குகள்' : 'Emotional + fear + language layers', icon: '💼' },
    { n: 5, title: language === 'ta' ? 'தளப் பிரிப்பு' : 'Platform Breakdown', desc: language === 'ta' ? '4 தளங்களுக்கான குரல் மொழிபெயர்ப்பு வெளியீடுகள்' : 'Tone Translator outputs for 4 platforms', icon: '📱' },
    { n: 6, title: language === 'ta' ? 'ஆபத்து ராடார் மதிப்பெண்கள்' : 'Risk Radar Scores', desc: language === 'ta' ? 'வண்ணக் குறியீட்டு ஆபத்துக் கொடிகள்' : 'Colour-coded risk flags', icon: '🛡' },
    { n: 7, title: language === 'ta' ? 'பிரச்சார காலண்டர்' : 'Campaign Calendar', desc: language === 'ta' ? 'கலாச்சார தருண சிறுகுறிப்புகளுடன் கூடிய வெப்ப வரைபடம்' : 'Heatmap with cultural moment annotations', icon: '📅' },
    { n: 8, title: language === 'ta' ? 'கேம்பெய்ன்IQ மதிப்பெண் அட்டை' : 'CampaignIQ Scorecard', desc: language === 'ta' ? 'துணைப் பரிமாணப் பிரிப்பு' : 'Sub-dimension breakdown', icon: '📊' },
  ]

  const handleExport = async () => {
    setExporting(true)
    setDone(false)
    await new Promise(r => setTimeout(r, 3500))

    try {
      const { default: jsPDF } = await import('jspdf')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const dna = mockBrandDna({ industry: 'Beauty & Wellness' })
      const personas = mockPersonas('brand awareness')
      const risk = mockRiskRadar()
      const health = mockHealthScore({})

      // Page 1: Brand DNA
      pdf.setFillColor(8, 11, 20)
      pdf.rect(0, 0, 210, 297, 'F')
      pdf.setTextColor(167, 139, 250)
      pdf.setFontSize(10)
      pdf.text(language === 'ta' ? 'பிளூம்பிக் ஸ்டூடியோ — AI பிரச்சார உத்தி' : 'BLOOMBIG STUDIO — AI CAMPAIGN STRATEGY', 105, 20, { align: 'center' })
      pdf.setTextColor(241, 245, 249)
      pdf.setFontSize(22)
      pdf.setFont('helvetica', 'bold')
      pdf.text(language === 'ta' ? 'பிராண்ட் டிஎன்ஏ அட்டை' : 'Brand DNA Card', 105, 40, { align: 'center' })
      pdf.setFontSize(14)
      pdf.text('NatureBloom Co.', 105, 52, { align: 'center' })

      let y = 70
      const attrs = [
        [t('brandDna.toneArchetype'), dna.tone_archetype],
        [t('brandDna.colourEmotion'), dna.colour_emotion],
        [t('brandDna.voiceSignature'), dna.brand_voice_signature.join(' · ')],
        [t('brandDna.coreAspiration'), dna.customer_core_aspiration],
        [t('brandDna.narrativeGap'), dna.competitor_narrative_gap],
      ]
      for (const [label, val] of attrs) {
        pdf.setFillColor(22, 28, 46)
        pdf.roundedRect(15, y, 180, 28, 3, 3, 'F')
        pdf.setTextColor(124, 58, 237)
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'bold')
        pdf.text(label.toUpperCase(), 22, y + 9)
        pdf.setTextColor(241, 245, 249)
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        const lines = pdf.splitTextToSize(val, 165)
        pdf.text(lines, 22, y + 18)
        y += 34
      }

      // Page 2-4: Personas
      for (const p of personas) {
        pdf.addPage()
        pdf.setFillColor(8, 11, 20)
        pdf.rect(0, 0, 210, 297, 'F')
        pdf.setTextColor(167, 139, 250)
        pdf.setFontSize(10)
        pdf.text(language === 'ta' ? 'பார்வையாளர் சுயவிவரம்' : 'AUDIENCE PERSONA', 105, 20, { align: 'center' })
        pdf.setTextColor(241, 245, 249)
        pdf.setFontSize(20)
        pdf.setFont('helvetica', 'bold')
        pdf.text(p.name, 105, 38, { align: 'center' })
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(148, 163, 184)
        pdf.text(`${p.age} · ${p.location} · ${p.income}`, 105, 50, { align: 'center' })

        let py = 68
        for (const [label, val] of [
          [t('personas.morningState'), p.morning_state],
          [t('personas.biggestFear'), p.fear],
          [t('personas.platform'), p.platform_preference],
          [language === 'ta' ? 'உணர்ச்சி நிலை' : 'Emotional State', p.emotional_state],
          [t('personas.theirLanguage'), p.language_phrases.join(', ')],
          [t('personas.jtbd'), p.jobs_to_be_done],
        ]) {
          pdf.setFillColor(22, 28, 46)
          pdf.roundedRect(15, py, 180, 26, 3, 3, 'F')
          pdf.setTextColor(124, 58, 237)
          pdf.setFontSize(8)
          pdf.setFont('helvetica', 'bold')
          pdf.text(label.toUpperCase(), 22, py + 9)
          pdf.setTextColor(241, 245, 249)
          pdf.setFontSize(10)
          pdf.setFont('helvetica', 'normal')
          pdf.text(pdf.splitTextToSize(String(val), 165), 22, py + 18)
          py += 32
        }
      }

      // Page 5: Risk + Health (simplified)
      pdf.addPage()
      pdf.setFillColor(8, 11, 20)
      pdf.rect(0, 0, 210, 297, 'F')
      pdf.setTextColor(167, 139, 250)
      pdf.setFontSize(10)
      pdf.text(language === 'ta' ? 'பிரச்சார ஆரோக்கியம்' : 'CAMPAIGN HEALTH', 105, 20, { align: 'center' })
      pdf.setTextColor(241, 245, 249)
      pdf.setFontSize(22)
      pdf.setFont('helvetica', 'bold')
      pdf.text(language === 'ta' ? `கேம்பெய்ன்IQ மதிப்பெண்: ${health.overall}/100` : `CampaignIQ Score: ${health.overall}/100`, 105, 38, { align: 'center' })
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(148, 163, 184)
      const rationale = pdf.splitTextToSize(health.rationale, 170)
      pdf.text(rationale, 20, 52)

      pdf.setTextColor(241, 245, 249)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text(t('riskRadar.title'), 20, 82)
      let ry = 92
      for (const [key, r] of Object.entries(risk)) {
        pdf.setFillColor(22, 28, 46)
        pdf.roundedRect(15, ry, 180, 24, 3, 3, 'F')
        pdf.setTextColor(r.score <= 3 ? 16 : r.score <= 6 ? 245 : 239, r.score <= 3 ? 185 : r.score <= 6 ? 158 : 68, r.score <= 3 ? 129 : r.score <= 6 ? 11 : 68)
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'bold')
        pdf.text(key.replace(/_/g,' ').toUpperCase() + ` — ${r.score}/10`, 22, ry + 9)
        pdf.setTextColor(148, 163, 184)
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        pdf.text(pdf.splitTextToSize(r.reason, 165), 22, ry + 17)
        if (r.alternative) {
          pdf.setTextColor(52, 211, 153)
          pdf.setFont('helvetica', 'italic')
          pdf.text(pdf.splitTextToSize("Solution: " + r.alternative, 165), 22, ry + 25)
          ry += 35
        } else {
          ry += 30
        }
      }

      pdf.setTextColor(71, 85, 105)
      pdf.setFontSize(8)
      pdf.text(language === 'ta' ? 'ரகசியமானது — பிளூம்பிக் ஸ்டூடியோஸ் இன்டர்ன்ஷிப் திட்டம் — பிராண்டுகள் மலரும்' : 'Confidential — BloomBig Studio Internship Programme — Brands Built to Bloom', 105, 290, { align: 'center' })

      pdf.save('BloomBig_Campaign_Strategy.pdf')
      setDone(true)
      toast.success(language === 'ta' ? '8 பக்க விளக்கக்காட்சி ஏற்றுமதி செய்யப்பட்டது!' : '8-page pitch deck exported!')
    } catch (err) {
      console.error(err)
      toast.error('Export failed — check console')
    }
    setExporting(false)
  }

  return (
    <div style={{ padding: '32px 36px', maxWidth: 760 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileText size={20} color="#34D399" />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>{t('export.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t('export.subtitle')}</p>
        </div>
      </div>

      {/* Pages preview */}
      <div className="glass-card-static" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
          {t('export.deckContents')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PAGES.map(page => (
            <div key={page.n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(13,155,118,0.12)', border: '1px solid rgba(13,155,118,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
                {page.icon}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{language === 'ta' ? `பக்கம் ${page.n}: ` : `Page ${page.n}: `}</span>
                <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{page.title}</span>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{page.desc}</div>
              </div>
              <Check size={14} color="#10B981" />
            </div>
          ))}
        </div>
      </div>

      {/* Campaign selector */}
      <div className="glass-card-static" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{t('export.selectCampaign')}</div>
        <select className="input-field" style={{ cursor: 'pointer' }}>
          <option>Pongal Harvest Launch — NatureBloom Co.</option>
          <option>Q1 LinkedIn Thought Leader — TechForge India</option>
          <option>Valentine's Flash Sale — Velvet Rose Boutique</option>
        </select>
      </div>

      <button
        className="btn-primary"
        onClick={handleExport}
        disabled={exporting}
        style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 15 }}
      >
        {exporting ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></path></svg>
            {t('export.exporting')}
          </>
        ) : done ? (
          <><Check size={16} /> {t('export.done')}</>
        ) : (
          <><Download size={16} /> {t('export.exportBtn')}</>
        )}
      </button>

      {done && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, fontSize: 13, color: '#34D399', textAlign: 'center' }}>
          ✅ <strong>BloomBig_Campaign_Strategy.pdf</strong> {t('export.savedMsg')}
        </div>
      )}
    </div>
  )
}

