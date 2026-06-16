import { useState } from 'react'
import { Shield, AlertTriangle, Check } from 'lucide-react'
import { mockRiskRadar } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'

const CAMPAIGN_OPTIONS = ['Pongal Harvest Launch', 'Q1 LinkedIn Thought Leader', "Valentine's Flash Sale"]

export default function RiskRadarPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [selected, setSelected] = useState(CAMPAIGN_OPTIONS[0])
  const risk = mockRiskRadar()

  const dims = [
    { key: 'cultural_sensitivity', label: t('riskRadar.culturalSensitivity'), icon: '🌍', desc: t('riskRadar.culturalDesc') },
    { key: 'trend_expiry', label: t('riskRadar.trendExpiry'), icon: '⏱', desc: t('riskRadar.trendDesc') },
    { key: 'creative_fatigue', label: t('riskRadar.creativeFatigue'), icon: '😴', desc: t('riskRadar.fatigueDesc') },
  ]

  return (
    <div style={{ padding: '32px 36px', maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={20} color="#F87171" />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>{t('riskRadar.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t('riskRadar.subtitle')}</p>
        </div>
      </div>

      {/* Campaign selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {CAMPAIGN_OPTIONS.map(c => (
          <button key={c} onClick={() => setSelected(c)}
            style={{
              padding: '8px 16px', borderRadius: 8, fontFamily: 'Inter', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
              border: `1px solid ${selected === c ? 'rgba(239,68,68,0.4)' : 'var(--border-subtle)'}`,
              background: selected === c ? 'rgba(239,68,68,0.08)' : 'transparent',
              color: selected === c ? '#F87171' : 'var(--text-secondary)',
              fontWeight: selected === c ? 600 : 400,
            }}>
            {c}
          </button>
        ))}
      </div>

      {/* Dimension cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {dims.map(dim => {
          const r = risk[dim.key]
          const color = r.score <= 3 ? '#10B981' : r.score <= 6 ? '#F59E0B' : '#EF4444'
          const bg = r.score <= 3 ? 'rgba(16,185,129,' : r.score <= 6 ? 'rgba(245,158,11,' : 'rgba(239,68,68,'
          return (
            <div key={dim.key} className="glass-card-static" style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>{dim.icon}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{dim.label}</h3>
                    <span style={{ padding: '3px 10px', borderRadius: 20, background: `${bg}0.1)`, border: `1px solid ${bg}0.3)`, fontSize: 11, fontWeight: 700, color }}>
                      {language === 'ta' ? (
                        r.score <= 3 ? t('common.lowRisk') : r.score <= 6 ? t('common.mediumRisk') : t('common.highRisk')
                      ) : r.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{dim.desc}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: r.alternative ? 12 : 0 }}>
                    {language === 'ta' ? 'இந்தப் பகுதியில் போதிய பாதுகாப்பு நடவடிக்கைகள் தேவையாக இருக்கலாம்.' : r.reason}
                  </p>
                  {r.alternative && (
                    <div style={{ padding: '10px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {t('riskRadar.lowerRiskAlt')}
                      </div>
                      <div style={{ fontSize: 12, color: '#34D399', lineHeight: 1.5 }}>
                        {language === 'ta' ? 'குறைந்த ஆபத்து கொண்ட மாற்று முறைகளைப் பயன்படுத்தவும்.' : r.alternative}
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'center', minWidth: 80 }}>
                  <div style={{ position: 'relative', width: 72, height: 72 }}>
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                      <circle cx="36" cy="36" r="28" fill="none" stroke={color}
                        strokeWidth="5"
                        strokeDasharray={`${(r.score / 10) * 176} 176`}
                        strokeLinecap="round"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', filter: `drop-shadow(0 0 6px ${color}80)` }} />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 18, fontWeight: 800, color, fontFamily: 'Space Grotesk' }}>
                      {r.score}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>/10</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Overall risk summary */}
      <div style={{ padding: '20px 24px', borderRadius: 14, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <AlertTriangle size={16} color="#F59E0B" />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#FCD34D' }}>{t('riskRadar.overallRisk')}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
          {t('riskRadar.overallNote')}
        </p>
      </div>
    </div>
  )
}

