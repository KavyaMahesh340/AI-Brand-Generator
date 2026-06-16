import { useState } from 'react'
import { Users, Plus, Edit3 } from 'lucide-react'
import { mockPersonas } from '../lib/mockData'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'

export default function PersonasPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [personas] = useState(mockPersonas('brand awareness'))
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ padding: '32px 36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{t('personas.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t('personas.subtitle')}</p>
        </div>
        <button className="btn-primary" onClick={() => toast.success(language === 'ta' ? 'நபர்களை உருவாக்குபவர் விரைவில் வரவிருக்கிறார்!' : 'Persona builder coming soon!')}>
          <Plus size={14} /> {t('personas.buildPersona')}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
        {personas.map(p => (
          <div
            key={p.id}
            onClick={() => setSelected(selected?.id === p.id ? null : p)}
            style={{
              padding: '24px',
              borderRadius: 16,
              background: selected?.id === p.id ? `${p.color}12` : 'rgba(22,28,46,0.9)',
              border: `1px solid ${selected?.id === p.id ? p.color + '50' : 'var(--border-subtle)'}`,
              cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: selected?.id === p.id ? `0 0 24px ${p.color}20` : 'var(--shadow-card)',
            }}
            onMouseEnter={e => { if (selected?.id !== p.id) { e.currentTarget.style.borderColor = p.color + '40'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
            onMouseLeave={e => { if (selected?.id !== p.id) { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none' } }}
          >
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${p.color}20`, border: `2px solid ${p.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                {p.emoji}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.age} · {p.location}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.income}</div>
              </div>
            </div>

            {/* Platform pref */}
            <div style={{ marginBottom: 14, padding: '6px 10px', background: `${p.color}10`, borderRadius: 8, fontSize: 12, color: p.color, fontWeight: 500 }}>
              📱 {p.platform_preference}
            </div>

            {/* Layers */}
            {[
              { emoji: '🌅', label: t('personas.morningState'), val: p.morning_state },
              { emoji: '😰', label: t('personas.biggestFear'), val: p.fear },
              { emoji: '💬', label: t('personas.theirLanguage'), val: p.language_phrases.join(' · ') },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: p.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                  {row.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{row.val}</div>
              </div>
            ))}

            {/* JTBD */}
            <div style={{ marginTop: 14, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px dashed var(--border-subtle)' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>🎯 {t('personas.jtbd')}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>"{p.jobs_to_be_done}"</div>
            </div>

            <button
              className="btn-ghost"
              style={{ width: '100%', justifyContent: 'center', marginTop: 14, fontSize: 12 }}
              onClick={e => { e.stopPropagation(); toast.success(language === 'ta' ? `${p.name} திருத்தப்படுகிறது` : `Editing ${p.name}`) }}
            >
              <Edit3 size={12} /> {t('personas.editPersona')}
            </button>
          </div>
        ))}
      </div>

      {/* JTBD Theory note */}
      <div className="glass-card-static" style={{ padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          {t('personas.jtbdMethodology')}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          {t('personas.jtbdNote')}
        </p>
      </div>
    </div>
  )
}

