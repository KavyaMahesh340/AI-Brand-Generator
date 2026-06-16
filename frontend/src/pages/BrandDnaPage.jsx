import { useState } from 'react'
import { Brain, Sparkles, RefreshCw } from 'lucide-react'
import { mockBrandDna, MOCK_DELAY } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'

const DEMO_CLIENTS = [
  { id: '1', brand_name: 'NatureBloom Co.', industry: 'Beauty & Wellness', geography: 'Chennai, Tamil Nadu' },
  { id: '2', brand_name: 'TechForge India', industry: 'Technology', geography: 'Bangalore, Karnataka' },
]

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
    { key: 'tone_archetype', label: t('brandDna.toneArchetype'), color: '#12B485', icon: '🎭' },
    { key: 'colour_emotion', label: t('brandDna.colourEmotion'), color: '#F59E0B', icon: '🎨' },
    { key: 'competitor_narrative_gap', label: t('brandDna.narrativeGap'), color: '#3B82F6', icon: '🔍' },
    { key: 'customer_core_aspiration', label: t('brandDna.coreAspiration'), color: '#10B981', icon: '⭐' },
    { key: 'brand_voice_signature', label: t('brandDna.voiceSignature'), color: '#EC4899', icon: '🎤' },
  ]

  return (
    <div style={{ padding: '32px 36px', maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(13,155,118,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} color="#40C29A" />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800 }}>{t('brandDna.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t('brandDna.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Client selector */}
      <div className="glass-card-static" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {DEMO_CLIENTS.map(c => (
            <button
              key={c.id}
              onClick={() => { setSelectedClient(c); setDna(mockBrandDna(c)) }}
              style={{
                padding: '12px 20px', borderRadius: 10, fontFamily: 'Inter', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                border: `1px solid ${selectedClient.id === c.id ? 'rgba(13,155,118,0.4)' : 'var(--border-subtle)'}`,
                background: selectedClient.id === c.id ? 'rgba(13,155,118,0.1)' : 'transparent',
                color: selectedClient.id === c.id ? 'var(--bloom-primary-light)' : 'var(--text-secondary)',
                fontWeight: selectedClient.id === c.id ? 600 : 400,
              }}
            >
              {c.brand_name}
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{c.industry}</div>
            </button>
          ))}
        </div>
      </div>

      {/* DNA Card */}
      <div
        style={{
          padding: '32px',
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(13,155,118,0.12) 0%, rgba(15,20,34,0.95) 60%, rgba(245,158,11,0.06) 100%)',
          border: '1px solid rgba(13,155,118,0.2)',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="glow-orb glow-orb-primary" style={{ width: 300, height: 300, top: -100, right: -100, opacity: 0.08 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selectedClient.brand_name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{selectedClient.industry} · {selectedClient.geography}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost" style={{ fontSize: 12 }} onClick={refresh} disabled={loading}>
              {loading ? '…' : <RefreshCw size={13} />} {t('brandDna.reExtract')}
            </button>
            <span className="badge badge-purple">{t('brandDna.dnaActive')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {DNA_ATTRS.map(attr => (
            <div key={attr.key} style={{ display: 'flex', gap: 16, padding: '16px', borderRadius: 12, background: `${attr.color}08`, border: `1px solid ${attr.color}20` }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{attr.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: attr.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                  {attr.label}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {Array.isArray(dna[attr.key]) ? dna[attr.key].join(' · ') : dna[attr.key]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-primary" onClick={() => toast.success(language === 'ta' ? 'டிஎன்ஏ அடுத்த பிரச்சாரத்திற்குப் பயன்படுத்தப்பட்டது!' : 'DNA prepended to next campaign!')}>
          <Sparkles size={14} />
          {t('brandDna.applyNext')}
        </button>
        <button className="btn-secondary" onClick={() => toast.success(language === 'ta' ? 'டிஎன்ஏ அட்டை நகலெடுக்கப்பட்டது!' : 'DNA card copied!')}>
          {t('brandDna.copyCard')}
        </button>
      </div>
    </div>
  )
}

