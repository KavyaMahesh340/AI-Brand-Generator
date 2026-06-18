import { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle2, Globe, Timer, Activity } from 'lucide-react'
import { mockRiskRadar } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'

const CAMPAIGN_OPTIONS = ['Pongal Harvest Launch', 'Q1 LinkedIn Thought Leader', "Valentine's Flash Sale"]

const DIM_ICONS = { cultural_sensitivity: Globe, trend_expiry: Timer, creative_fatigue: Activity }

export default function RiskRadarPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [selected, setSelected] = useState(CAMPAIGN_OPTIONS[0])
  const risk = mockRiskRadar()

  const dims = [
    { key: 'cultural_sensitivity', label: t('riskRadar.culturalSensitivity'), desc: t('riskRadar.culturalDesc') },
    { key: 'trend_expiry',         label: t('riskRadar.trendExpiry'),         desc: t('riskRadar.trendDesc') },
    { key: 'creative_fatigue',     label: t('riskRadar.creativeFatigue'),     desc: t('riskRadar.fatigueDesc') },
  ]

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: '#fff1f2', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={20} color="#e11d48" />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>{t('riskRadar.title')}</h1>
          <p className="page-subtitle">{t('riskRadar.subtitle')}</p>
        </div>
      </div>

      {/* Campaign selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {CAMPAIGN_OPTIONS.map(c => (
          <button
            key={c}
            id={`risk-camp-${c.replace(/\s+/g, '-')}`}
            onClick={() => setSelected(c)}
            style={{
              padding: '8px 16px', borderRadius: 8,
              fontFamily: 'Inter', fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
              border: `1px solid ${selected === c ? '#fecdd3' : '#e2e8f0'}`,
              background: selected === c ? '#fff1f2' : '#ffffff',
              color: selected === c ? '#be123c' : '#64748b',
              fontWeight: selected === c ? 600 : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Dimension cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
        {dims.map(dim => {
          const r = risk[dim.key]
          const Icon = DIM_ICONS[dim.key]
          const isLow    = r.score <= 3
          const isMedium = r.score <= 6 && r.score > 3
          const isHigh   = r.score > 6

          const badgeVariant = isLow ? 'success' : isMedium ? 'warning' : 'destructive'
          const riskLabel    = isLow ? t('common.lowRisk') : isMedium ? t('common.mediumRisk') : t('common.highRisk')
          const barColor     = isLow ? '#16a34a' : isMedium ? '#d97706' : '#dc2626'
          const progressColor = isLow ? 'var(--green-500)' : isMedium ? 'var(--amber-500)' : 'var(--coral-500)'

          return (
            <Card key={dim.key}>
              <CardContent style={{ padding: 24 }}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_100px] gap-6 items-start">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={15} color="#64748b" />
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{dim.label}</h3>
                      <Badge variant={badgeVariant}>{language === 'ta' ? riskLabel : r.label}</Badge>
                    </div>

                    <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>{dim.desc}</p>

                    {/* Progress bar */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Risk Level</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: barColor }}>{r.score}/10</span>
                      </div>
                      <Progress
                        value={r.score * 10}
                        indicatorClassName={isLow ? undefined : undefined}
                        style={{ height: 6 }}
                        className={undefined}
                      />
                      <style>{`.progress-${dim.key} [data-slot="indicator"] { background: ${progressColor}; }`}</style>
                    </div>

                    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: r.alternative ? 12 : 0 }}>
                      {language === 'ta' ? 'இந்தப் பகுதியில் போதிய பாதுகாப்பு நடவடிக்கைகள் தேவையாக இருக்கலாம்.' : r.reason}
                    </p>

                    {r.alternative && (
                      <div style={{ padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#16a34a', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          <CheckCircle2 size={13} style={{ flexShrink: 0 }} />
                          {t('riskRadar.lowerRiskAlt')}
                        </div>
                        <div style={{ fontSize: 12, color: '#15803d', lineHeight: 1.5 }}>
                          {language === 'ta' ? 'குறைந்த ஆபத்து கொண்ட மாற்று முறைகளைப் பயன்படுத்தவும்.' : r.alternative}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Score ring */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto' }}>
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                        <circle
                          cx="40" cy="40" r="32" fill="none"
                          stroke={barColor} strokeWidth="6"
                          strokeDasharray={`${(r.score / 10) * 201} 201`}
                          strokeLinecap="round"
                          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        />
                      </svg>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 20, fontWeight: 800, color: barColor, fontFamily: 'Space Grotesk, sans-serif' }}>
                        {r.score}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>out of 10</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Overall risk note */}
      <div style={{ padding: '18px 20px', borderRadius: 12, background: '#fffbeb', border: '1px solid #fde68a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <AlertTriangle size={15} color="#d97706" />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#92400e' }}>{t('riskRadar.overallRisk')}</span>
        </div>
        <p style={{ fontSize: 13, color: '#78350f', margin: 0, lineHeight: 1.6 }}>
          {t('riskRadar.overallNote')}
        </p>
      </div>
    </div>
  )
}
