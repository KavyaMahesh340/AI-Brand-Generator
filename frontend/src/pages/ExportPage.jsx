import { useState, useRef } from 'react'
import { Download, FileText, CheckCircle2, Check, Dna, Rocket, Leaf, Briefcase, Smartphone, Shield, Calendar, BarChart3, ChevronRight } from 'lucide-react'
import { mockPersonas, mockBrandDna, mockRiskRadar, mockHealthScore } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

export default function ExportPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)

  const PAGES = [
    { n: 1, title: language === 'ta' ? 'பிராண்ட் டிஎன்ஏ அட்டை' : 'Brand DNA Card',               desc: language === 'ta' ? '5 கைரேகை பண்புகள்' : '5 fingerprint attributes',                     Icon: Dna },
    { n: 2, title: language === 'ta' ? 'நபர் அட்டை — அரவிந்த்' : 'Persona Card — Ambitious Arjun', desc: language === 'ta' ? 'உணர்ச்சி + பயம் + மொழி' : 'Emotional + fear + language layers',        Icon: Rocket },
    { n: 3, title: language === 'ta' ? 'நபர் அட்டை — எமிலி' : 'Persona Card — Eco-Conscious Emily', desc: language === 'ta' ? 'உணர்ச்சி + பயம் + மொழி' : 'Emotional + fear + language layers',       Icon: Leaf },
    { n: 4, title: language === 'ta' ? 'நபர் அட்டை — பிரியா' : 'Persona Card — Pragmatic Priya',  desc: language === 'ta' ? 'உணர்ச்சி + பயம் + மொழி' : 'Emotional + fear + language layers',        Icon: Briefcase },
    { n: 5, title: language === 'ta' ? 'தளப் பிரிப்பு' : 'Platform Breakdown',                    desc: language === 'ta' ? '4 தளங்களுக்கான குரல் மொழிபெயர்ப்பு' : 'Tone Translator outputs for 4 platforms', Icon: Smartphone },
    { n: 6, title: language === 'ta' ? 'ஆபத்து ராடார் மதிப்பெண்கள்' : 'Risk Radar Scores',         desc: language === 'ta' ? 'வண்ணக் குறியீட்டு ஆபத்துக் கொடிகள்' : 'Colour-coded risk flags',           Icon: Shield },
    { n: 7, title: language === 'ta' ? 'பிரச்சார காலண்டர்' : 'Campaign Calendar',                 desc: language === 'ta' ? 'கலாச்சார தருண குறிப்புகள்' : 'Heatmap with cultural moment annotations',  Icon: Calendar },
    { n: 8, title: language === 'ta' ? 'கேம்பெய்ன்IQ மதிப்பெண் அட்டை' : 'CampaignIQ Scorecard', desc: language === 'ta' ? 'துணைப் பரிமாணப் பிரிப்பு' : 'Sub-dimension breakdown',                    Icon: BarChart3 },
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
      pdf.setFillColor(248, 250, 252)
      pdf.rect(0, 0, 210, 297, 'F')
      pdf.setTextColor(13, 148, 136)
      pdf.setFontSize(10)
      pdf.text('BLOOMBIG STUDIO — AI CAMPAIGN STRATEGY', 105, 20, { align: 'center' })
      pdf.setTextColor(15, 23, 42)
      pdf.setFontSize(22)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Brand DNA Card', 105, 40, { align: 'center' })
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 116, 139)
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
        pdf.setFillColor(241, 245, 249)
        pdf.roundedRect(15, y, 180, 28, 3, 3, 'F')
        pdf.setTextColor(13, 148, 136)
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'bold')
        pdf.text(label.toUpperCase(), 22, y + 9)
        pdf.setTextColor(15, 23, 42)
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        const lines = pdf.splitTextToSize(val, 165)
        pdf.text(lines, 22, y + 18)
        y += 34
      }

      // Page 2-4: Personas
      for (const p of personas) {
        pdf.addPage()
        pdf.setFillColor(248, 250, 252)
        pdf.rect(0, 0, 210, 297, 'F')
        pdf.setTextColor(13, 148, 136)
        pdf.setFontSize(10)
        pdf.text('AUDIENCE PERSONA', 105, 20, { align: 'center' })
        pdf.setTextColor(15, 23, 42)
        pdf.setFontSize(20)
        pdf.setFont('helvetica', 'bold')
        pdf.text(p.name, 105, 38, { align: 'center' })
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(100, 116, 139)
        pdf.text(`${p.age} · ${p.location} · ${p.income}`, 105, 50, { align: 'center' })

        let py = 68
        for (const [label, val] of [
          [t('personas.morningState'), p.morning_state],
          [t('personas.biggestFear'), p.fear],
          [t('personas.platform'), p.platform_preference],
          ['Emotional State', p.emotional_state],
          [t('personas.theirLanguage'), p.language_phrases.join(', ')],
          [t('personas.jtbd'), p.jobs_to_be_done],
        ]) {
          pdf.setFillColor(241, 245, 249)
          pdf.roundedRect(15, py, 180, 26, 3, 3, 'F')
          pdf.setTextColor(13, 148, 136)
          pdf.setFontSize(8)
          pdf.setFont('helvetica', 'bold')
          pdf.text(label.toUpperCase(), 22, py + 9)
          pdf.setTextColor(15, 23, 42)
          pdf.setFontSize(10)
          pdf.setFont('helvetica', 'normal')
          pdf.text(pdf.splitTextToSize(String(val), 165), 22, py + 18)
          py += 32
        }
      }

      // Page 5: Risk + Health
      pdf.addPage()
      pdf.setFillColor(248, 250, 252)
      pdf.rect(0, 0, 210, 297, 'F')
      pdf.setTextColor(13, 148, 136)
      pdf.setFontSize(10)
      pdf.text('CAMPAIGN HEALTH', 105, 20, { align: 'center' })
      pdf.setTextColor(15, 23, 42)
      pdf.setFontSize(22)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`CampaignIQ Score: ${health.overall}/100`, 105, 38, { align: 'center' })
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 116, 139)
      const rationale = pdf.splitTextToSize(health.rationale, 170)
      pdf.text(rationale, 20, 52)

      pdf.setTextColor(15, 23, 42)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text(t('riskRadar.title'), 20, 82)
      let ry = 92
      for (const [key, r] of Object.entries(risk)) {
        pdf.setFillColor(241, 245, 249)
        pdf.roundedRect(15, ry, 180, 24, 3, 3, 'F')
        pdf.setTextColor(r.score <= 3 ? 22 : r.score <= 6 ? 217 : 220, r.score <= 3 ? 163 : r.score <= 6 ? 119 : 38, r.score <= 3 ? 74 : r.score <= 6 ? 11 : 38)
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'bold')
        pdf.text(key.replace(/_/g,' ').toUpperCase() + ` — ${r.score}/10`, 22, ry + 9)
        pdf.setTextColor(100, 116, 139)
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        pdf.text(pdf.splitTextToSize(r.reason, 165), 22, ry + 17)
        ry += (r.alternative ? 35 : 30)
      }

      pdf.setTextColor(148, 163, 184)
      pdf.setFontSize(8)
      pdf.text('Confidential — BloomBig Studio Internship Programme — Brands Built to Bloom', 105, 290, { align: 'center' })

      pdf.save('BloomBig_Campaign_Strategy.pdf')
      setDone(true)
      toast.success('8-page pitch deck exported!')
    } catch (err) {
      console.error(err)
      toast.error('Export failed — check console')
    }
    setExporting(false)
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileText size={20} color="#16a34a" />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>{t('export.title')}</h1>
          <p className="page-subtitle">{t('export.subtitle')}</p>
        </div>
      </div>

      {/* Pages preview */}
      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardTitle>{t('export.deckContents')}</CardTitle>
            <Badge variant="default">{PAGES.length} pages</Badge>
          </div>
        </CardHeader>
        <CardContent style={{ paddingTop: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PAGES.map(page => {
              const Icon = page.Icon
              return (
                <div key={page.n} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 14px', borderRadius: 10,
                  background: '#f8fafc', border: '1px solid #f1f5f9',
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: '#f0fdfa', border: '1px solid #99f6e4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color="#0d9488" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>
                      {language === 'ta' ? `பக்கம் ${page.n}: ` : `Page ${page.n}: `}
                    </span>
                    <span style={{ fontSize: 13, color: '#0f172a' }}>{page.title}</span>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{page.desc}</div>
                  </div>
                  <Check size={14} color="#16a34a" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Campaign selector */}
      <Card style={{ marginBottom: 20 }}>
        <CardContent style={{ padding: 20 }}>
          <div className="section-label">{t('export.selectCampaign')}</div>
          <select id="export-campaign-select" className="input-field" style={{ cursor: 'pointer' }}>
            <option>Pongal Harvest Launch — NatureBloom Co.</option>
            <option>Q1 LinkedIn Thought Leader — TechForge India</option>
            <option>Valentine's Flash Sale — Velvet Rose Boutique</option>
          </select>
        </CardContent>
      </Card>

      <Button
        id="export-pdf-btn"
        onClick={handleExport}
        disabled={exporting}
        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}
      >
        {exporting ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
              </path>
            </svg>
            {t('export.exporting')}
          </>
        ) : done ? (
          <><CheckCircle2 size={15} /> {t('export.done')}</>
        ) : (
          <><Download size={15} /> {t('export.exportBtn')}</>
        )}
      </Button>

      {done && (
        <div style={{ marginTop: 14, padding: '12px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <CheckCircle2 size={16} color="#16a34a" />
          <div style={{ fontSize: 13, color: '#15803d' }}>
            <strong>BloomBig_Campaign_Strategy.pdf</strong> {t('export.savedMsg')}
          </div>
        </div>
      )}
    </div>
  )
}
