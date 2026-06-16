import { useState } from 'react'
import { Zap, Send } from 'lucide-react'
import { mockPersonas, mockEmpathySimulator, MOCK_DELAY } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'

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
    <div style={{ padding: '32px 36px', maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={20} color="#60A5FA" />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>{t('empathy.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t('empathy.subtitle')}</p>
        </div>
      </div>

      <div style={{ padding: '10px 14px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, marginBottom: 28, fontSize: 13, color: '#93C5FD' }}>
        {t('empathy.tip')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
        {/* Persona selector */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            {t('empathy.selectPersona')}
          </div>
          {personas.map(p => (
            <button
              key={p.id}
              onClick={() => { setSelectedPersona(p); setResult(null) }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, marginBottom: 8,
                border: `1px solid ${selectedPersona.id === p.id ? p.color + '50' : 'var(--border-subtle)'}`,
                background: selectedPersona.id === p.id ? `${p.color}10` : 'transparent',
                cursor: 'pointer', fontFamily: 'Inter', textAlign: 'left', transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 24 }}>{p.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.age} · {p.location.split(',')[0]}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Simulator */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label className="input-label">{t('empathy.caption')}</label>
            <textarea
              className="input-field"
              rows={5}
              placeholder={language === 'ta' ? `${selectedPersona.name} எதிர்வினையாற்ற வேண்டிய தலைப்பை ஒட்டவும்…` : `Paste the caption, headline, or post you want ${selectedPersona.name} to react to…`}
              value={caption}
              onChange={e => setCaption(e.target.value)}
              style={{ resize: 'vertical', fontFamily: 'Inter' }}
            />
          </div>

          <button className="btn-primary" onClick={simulate} disabled={loading} style={{ marginBottom: 24, width: '100%', justifyContent: 'center', padding: '13px' }}>
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></path></svg>
                {language === 'ta' ? `${selectedPersona.name} ஆக உருவகப்படுத்துகிறது…` : `Simulating as ${selectedPersona.name}…`}
              </>
            ) : (
              <>
                <Send size={14} />
                {t('empathy.simulate')}
              </>
            )}
          </button>

          {result && (
            <div className="animate-fadeInUp">
              {/* Persona bubble */}
              <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${selectedPersona.color}20`, border: `2px solid ${selectedPersona.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {selectedPersona.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: selectedPersona.color, marginBottom: 6 }}>
                    {result.persona_name} · {language === 'ta' ? (result.emotional_response === 'Highly Engaged' ? 'மிகவும் ஆர்வமாக உள்ளார்' : 'மகிழ்ச்சியாக உள்ளார்') : result.emotional_response}
                  </div>
                  <div className="persona-bubble" style={{ marginBottom: 0 }}>
                    <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
                      {language === 'ta' ? (
                        <><strong>{result.persona_name}</strong> ஆக, இந்தத் தலைப்பைப் படிப்பது என்னை <em>{selectedPersona.emotional_state === 'anxious' ? 'கவலையாக' : 'உற்சாகமாக'}</em> உணரச் செய்கிறது.</>
                      ) : (
                        <>As <strong>{result.persona_name}</strong>, reading this caption makes me feel <em>{selectedPersona.emotional_state.toLowerCase()}</em>.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
                {[
                  { label: t('empathy.wouldSave'), val: result.would_save, reason: result.save_reason },
                  { label: t('empathy.wouldShare'), val: result.would_share, reason: result.share_barrier },
                ].map(m => (
                  <div key={m.label} style={{ padding: '14px', borderRadius: 10, background: m.val ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${m.val ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: m.val ? '#10B981' : '#EF4444', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      {m.val ? '✅' : '❌'} {m.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {language === 'ta' ? 'இந்த உள்ளடக்கம் எனக்குப் பயனுள்ளதாக இருக்கிறது.' : m.reason}
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit suggestion */}
              <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                  {t('empathy.suggestedEdit')}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {language === 'ta' ? 'தயாரிப்பின் பயன்களை நேரடியாக விளக்குங்கள்.' : result.suggested_edit}
                </div>
              </div>

              <div style={{ marginTop: 12, padding: '12px 14px', borderRadius: 10, background: 'rgba(13,155,118,0.08)', border: '1px solid rgba(13,155,118,0.2)', fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ color: '#40C29A', fontWeight: 600 }}>{t('empathy.engagementPrediction')}: </span>
                {language === 'ta' ? 'சிறந்த ஈடுபாடு எதிர்பார்க்கப்படுகிறது' : result.engagement_prediction}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

