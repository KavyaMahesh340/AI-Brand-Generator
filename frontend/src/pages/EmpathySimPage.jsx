import { useState } from 'react'
import { Zap, Send, CheckCircle2, XCircle, Lightbulb, MessageSquare, Share2, MessageCircle, PlayCircle } from 'lucide-react'
import { mockPersonas, mockEmpathySimulator, MOCK_DELAY } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

export default function EmpathySimPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const personas = mockPersonas('')
  const [selectedPersona, setSelectedPersona] = useState(personas[0])
  const [caption, setCaption] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const simulate = async () => {
    if (!caption.trim()) {
      toast.error(language === 'ta' ? 'முதலில் தலைப்பை ஒட்டவும்' : 'Paste a caption first')
      return
    }
    setLoading(true)
    setResult(null)
    await MOCK_DELAY(2800)
    setResult(mockEmpathySimulator(selectedPersona, caption))
    setLoading(false)
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={20} color="#2563eb" />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>{t('empathy.title')}</h1>
          <p className="page-subtitle">{t('empathy.subtitle')}</p>
        </div>
      </div>

      {/* Tip banner */}
      <div className="info-banner" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 24, background: '#eff6ff', borderColor: '#bfdbfe', color: '#1e40af' }}>
        <Lightbulb size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>{t('empathy.tip')}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        {/* Persona selector */}
        <div>
          <div className="section-label">{t('empathy.selectPersona')}</div>
          {personas.map(p => {
            const initials = p.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
            const isActive = selectedPersona.id === p.id
            return (
              <button
                key={p.id}
                id={`persona-btn-${p.id}`}
                onClick={() => { setSelectedPersona(p); setResult(null) }}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 12, marginBottom: 8,
                  border: `2px solid ${isActive ? p.color + '50' : '#f1f5f9'}`,
                  background: isActive ? `${p.color}08` : '#ffffff',
                  cursor: 'pointer', fontFamily: 'Inter', textAlign: 'left',
                  transition: 'all 0.15s',
                  boxShadow: isActive ? `0 0 0 3px ${p.color}15` : 'none',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `${p.color}18`,
                  border: `2px solid ${p.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: p.color,
                  fontFamily: 'Space Grotesk, sans-serif', flexShrink: 0,
                }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{p.age} · {p.location.split(',')[0]}</div>
                </div>
                {isActive && (
                  <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Simulator */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label className="input-label">{t('empathy.caption')}</label>
            <textarea
              id="empathy-caption-input"
              className="input-field"
              rows={5}
              placeholder={language === 'ta'
                ? `${selectedPersona.name} எதிர்வினையாற்ற வேண்டிய தலைப்பை ஒட்டவும்…`
                : `Paste the caption, headline, or post you want ${selectedPersona.name} to react to…`
              }
              value={caption}
              onChange={e => setCaption(e.target.value)}
              style={{ resize: 'vertical', fontFamily: 'Inter' }}
            />
          </div>

          <Button
            id="simulate-btn"
            onClick={simulate}
            disabled={loading}
            style={{ marginBottom: 24, width: '100%', justifyContent: 'center', padding: '13px' }}
          >
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                  </path>
                </svg>
                {language === 'ta' ? `${selectedPersona.name} ஆக உருவகப்படுத்துகிறது…` : `Simulating as ${selectedPersona.name}…`}
              </>
            ) : (
              <><Send size={14} /> {t('empathy.simulate')}</>
            )}
          </Button>

          {result && (
            <div className="animate-fadeInUp">
              {/* Persona bubble */}
              <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: `${selectedPersona.color}18`,
                  border: `2px solid ${selectedPersona.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: selectedPersona.color,
                  fontFamily: 'Space Grotesk, sans-serif', flexShrink: 0,
                }}>
                  {selectedPersona.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: selectedPersona.color }}>{result.persona_name}</span>
                    <Badge variant="info" style={{ fontSize: 10 }}>
                      <MessageSquare size={9} />
                      {language === 'ta' ? (result.emotional_response === 'Highly Engaged' ? 'மிகவும் ஆர்வம்' : 'மகிழ்ச்சி') : result.emotional_response}
                    </Badge>
                  </div>
                  <div className="persona-bubble">
                    <p style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.7, margin: 0 }}>
                      {language === 'ta' ? (
                        <><strong>{result.persona_name}</strong> ஆக, இந்தத் தலைப்பைப் படிப்பது என்னை <em>{selectedPersona.emotional_state === 'anxious' ? 'கவலையாக' : 'உற்சாகமாக'}</em> உணரச் செய்கிறது.</>
                      ) : (
                        <>As <strong>{result.persona_name}</strong>, reading this caption makes me feel <em>{selectedPersona.emotional_state.toLowerCase()}</em>.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Would save / share */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  { label: t('empathy.wouldSave'),  val: result.would_save,  reason: result.save_reason },
                  { label: t('empathy.wouldShare'), val: result.would_share, reason: result.share_barrier },
                ].map(m => (
                  <Card key={m.label} style={{ border: `1px solid ${m.val ? '#bbf7d0' : '#fecdd3'}`, background: m.val ? '#f0fdf4' : '#fff1f2' }}>
                    <CardContent style={{ padding: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        {m.val
                          ? <CheckCircle2 size={14} color="#16a34a" />
                          : <XCircle size={14} color="#dc2626" />
                        }
                        <span style={{ fontSize: 11, fontWeight: 700, color: m.val ? '#16a34a' : '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {m.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                        {language === 'ta' ? 'இந்த உள்ளடக்கம் எனக்குப் பயனுள்ளதாக இருக்கிறது.' : m.reason}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Suggested edit */}
              <div style={{ padding: '14px 16px', borderRadius: 10, background: '#fffbeb', border: '1px solid #fde68a', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Lightbulb size={14} color="#d97706" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t('empathy.suggestedEdit')}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6 }}>
                  {language === 'ta' ? 'தயாரிப்பின் பயன்களை நேரடியாக விளக்குங்கள்.' : result.suggested_edit}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: 10, background: '#f0fdfa', border: '1px solid #99f6e4', fontSize: 13, color: '#0f172a' }}>
                <span style={{ color: '#0d9488', fontWeight: 600 }}>{t('empathy.engagementPrediction')}: </span>
                {language === 'ta' ? 'சிறந்த ஈடுபாடு எதிர்பார்க்கப்படுகிறது' : result.engagement_prediction}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
