import { useState } from 'react'
import { Users, Plus, Edit3, MapPin, Smartphone, Target, Sunrise, AlertTriangle, MessageSquare } from 'lucide-react'
import { mockPersonas } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

export default function PersonasPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [personas] = useState(mockPersonas('brand awareness'))
  const [selected, setSelected] = useState(null)

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('personas.title')}</h1>
          <p className="page-subtitle">{t('personas.subtitle')}</p>
        </div>
        <Button
          id="build-persona-btn"
          onClick={() => toast.success(language === 'ta' ? 'நபர்களை உருவாக்குபவர் விரைவில்!' : 'Persona builder coming soon!')}
        >
          <Plus size={14} /> {t('personas.buildPersona')}
        </Button>
      </div>

      {/* Persona Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {personas.map(p => {
          const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
          const isSelected = selected?.id === p.id
          return (
            <div
              key={p.id}
              onClick={() => setSelected(isSelected ? null : p)}
              style={{
                padding: '22px',
                borderRadius: 14,
                background: '#ffffff',
                border: `2px solid ${isSelected ? p.color + '60' : '#e2e8f0'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? `0 0 0 3px ${p.color}20` : '0 1px 3px rgba(0,0,0,0.07)',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = p.color + '40'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.07)'
                }
              }}
            >
              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `${p.color}18`,
                  border: `2px solid ${p.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, color: p.color,
                  flexShrink: 0,
                  fontFamily: 'Space Grotesk, sans-serif',
                }}>
                  {initials}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b', marginTop: 2 }}>
                    <MapPin size={11} />
                    {p.age} · {p.location.split(',')[0]}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{p.income}</div>
                </div>
              </div>

              {/* Platform badge */}
              <div style={{ marginBottom: 16 }}>
                <Badge variant="default" style={{ gap: 5, fontSize: 11 }}>
                  <Smartphone size={10} />
                  {p.platform_preference}
                </Badge>
              </div>

              {/* Attribute rows */}
              {[
                { label: t('personas.morningState'), val: p.morning_state, icon: Sunrise },
                { label: t('personas.biggestFear'),  val: p.fear, icon: AlertTriangle },
                { label: t('personas.theirLanguage'), val: p.language_phrases.join(' · '), icon: MessageSquare },
              ].map(row => {
                const RowIcon = row.icon
                return (
                <div key={row.label} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <RowIcon size={12} color={p.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                      {row.label}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.55 }}>{row.val}</div>
                  </div>
                </div>
              )})}

              {/* JTBD */}
              <div style={{ marginTop: 14, padding: '12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #f1f5f9', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Target size={12} color="#64748b" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    {t('personas.jtbd')}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.55, fontStyle: 'italic' }}>"{p.jobs_to_be_done}"</div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}
                onClick={e => { e.stopPropagation(); toast.success(`Editing ${p.name}`) }}
              >
                <Edit3 size={12} /> {t('personas.editPersona')}
              </Button>
            </div>
          )
        })}
      </div>

      {/* JTBD Theory note */}
      <Card>
        <CardContent style={{ padding: 20 }}>
          <div className="section-label">{t('personas.jtbdMethodology')}</div>
          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
            {t('personas.jtbdNote')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
