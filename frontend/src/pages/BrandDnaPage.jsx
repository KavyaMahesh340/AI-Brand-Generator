import { useState } from 'react'
import { Brain, Sparkles, RefreshCw, Mic, Palette, Search, Star, Volume2 } from 'lucide-react'
import { mockBrandDna, MOCK_DELAY } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const DEMO_CLIENTS = [
  { id: '1', brand_name: 'NatureBloom Co.', industry: 'Beauty & Wellness', geography: 'Chennai, Tamil Nadu' },
  { id: '2', brand_name: 'TechForge India',  industry: 'Technology',        geography: 'Bangalore, Karnataka' },
]

const ATTR_ICONS = [Mic, Palette, Search, Star, Volume2]

export default function BrandDnaPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [selectedClient, setSelectedClient] = useState(DEMO_CLIENTS[0])
  const [dna, setDna] = useState(mockBrandDna(DEMO_CLIENTS[0]))
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    await MOCK_DELAY(2200)
    setDna(mockBrandDna(selectedClient))
    setLoading(false)
    toast.success(language === 'ta' ? 'பிராண்ட் டிஎன்ஏ புதுப்பிக்கப்பட்டது!' : 'Brand DNA refreshed!')
  }

  const DNA_ATTRS = [
    { key: 'tone_archetype',           label: t('brandDna.toneArchetype'),  color: '#0d9488' },
    { key: 'colour_emotion',           label: t('brandDna.colourEmotion'),  color: '#d97706' },
    { key: 'competitor_narrative_gap', label: t('brandDna.narrativeGap'),   color: '#2563eb' },
    { key: 'customer_core_aspiration', label: t('brandDna.coreAspiration'), color: '#16a34a' },
    { key: 'brand_voice_signature',    label: t('brandDna.voiceSignature'), color: '#9333ea' },
  ]

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: '#f0fdfa', border: '1px solid #99f6e4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={20} color="#0d9488" />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>{t('brandDna.title')}</h1>
          <p className="page-subtitle">{t('brandDna.subtitle')}</p>
        </div>
      </div>

      {/* Client selector */}
      <Card style={{ marginBottom: 24 }}>
        <CardContent style={{ padding: 20 }}>
          <div className="section-label">Select Brand</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {DEMO_CLIENTS.map(c => (
              <button
                key={c.id}
                id={`brand-${c.id}`}
                onClick={() => { setSelectedClient(c); setDna(mockBrandDna(c)) }}
                style={{
                  padding: '12px 20px', borderRadius: 10,
                  fontFamily: 'Inter', fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
                  border: `2px solid ${selectedClient.id === c.id ? '#0d9488' : '#e2e8f0'}`,
                  background: selectedClient.id === c.id ? '#f0fdfa' : '#ffffff',
                  color: selectedClient.id === c.id ? '#0d9488' : '#64748b',
                  fontWeight: selectedClient.id === c.id ? 600 : 400,
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 600 }}>{c.brand_name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{c.industry}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* DNA Card */}
      <Card style={{ marginBottom: 20 }}>
        <CardContent style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{selectedClient.brand_name}</h2>
              <p style={{ color: '#64748b', fontSize: 13 }}>{selectedClient.industry} · {selectedClient.geography}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0, }}>
              <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                {loading ? 'Refreshing…' : t('brandDna.reExtract')}
              </Button>
              <Badge variant="purple">{t('brandDna.dnaActive')}</Badge>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DNA_ATTRS.map((attr, idx) => {
              const Icon = ATTR_ICONS[idx]
              return (
                <div key={attr.key} style={{
                  display: 'flex', gap: 16, padding: '16px 18px', borderRadius: 10,
                  background: `${attr.color}06`, border: `1px solid ${attr.color}20`,
                  transition: 'all 0.15s',
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `${attr.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={15} color={attr.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: attr.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                      {attr.label}
                    </div>
                    <div style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.6 }}>
                      {Array.isArray(dna[attr.key]) ? dna[attr.key].join(' · ') : dna[attr.key]}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => toast.success(language === 'ta' ? 'டிஎன்ஏ அடுத்த பிரச்சாரத்திற்குப் பயன்படுத்தப்பட்டது!' : 'DNA prepended to next campaign!')}>
          <Sparkles size={14} />
          {t('brandDna.applyNext')}
        </Button>
        <Button variant="secondary" onClick={() => toast.success(language === 'ta' ? 'டிஎன்ஏ அட்டை நகலெடுக்கப்பட்டது!' : 'DNA card copied!')}>
          {t('brandDna.copyCard')}
        </Button>
      </div>
    </div>
  )
}
