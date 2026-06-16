import { Settings, Database, Cpu, Info, Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { theme, toggleTheme } = useThemeStore()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const isLight = theme === 'light'

  return (
    <div style={{ padding: '32px 36px', maxWidth: 700 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(148,163,184,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={20} color="#94A3B8" />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>{t('settings.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t('settings.subtitle')}</p>
        </div>
      </div>

      {/* ─── Appearance ─────────────────────────────────────────── */}
      <div className="glass-card-static" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Monitor size={16} color="#40C29A" />
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t('settings.appearance')}</h3>
        </div>

        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12 }}>
          {t('settings.interfaceTheme')}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {/* Dark mode card */}
          <button
            onClick={() => !isLight || toggleTheme()}
            style={{
              flex: 1,
              padding: '18px 16px',
              borderRadius: 14,
              border: `2px solid ${!isLight ? 'var(--bloom-primary)' : 'var(--border-subtle)'}`,
              background: !isLight ? 'rgba(13,155,118,0.1)' : 'var(--bg-card-hover)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Mini dark preview */}
            <div style={{ width: 40, height: 32, borderRadius: 6, background: '#0F1422', border: '1px solid rgba(13,155,118,0.3)', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '4px', gap: 3 }}>
              <div style={{ height: 4, width: '60%', background: '#12B485', borderRadius: 2 }} />
              <div style={{ height: 3, width: '90%', background: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
              <div style={{ height: 3, width: '70%', background: 'rgba(255,255,255,0.1)', borderRadius: 2 }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Moon size={13} color="#40C29A" /> {t('settings.darkMode')}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t('settings.darkModeDesc')}</div>
            </div>
            {!isLight && (
              <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: '#12B485', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </button>

          {/* Light mode card */}
          <button
            onClick={() => isLight || toggleTheme()}
            style={{
              flex: 1,
              padding: '18px 16px',
              borderRadius: 14,
              border: `2px solid ${isLight ? 'var(--bloom-primary)' : 'var(--border-subtle)'}`,
              background: isLight ? 'rgba(13,155,118,0.08)' : 'var(--bg-card-hover)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Mini light preview */}
            <div style={{ width: 40, height: 32, borderRadius: 6, background: '#F0F2FA', border: '1px solid rgba(13,155,118,0.15)', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '4px', gap: 3 }}>
              <div style={{ height: 4, width: '60%', background: '#12B485', borderRadius: 2 }} />
              <div style={{ height: 3, width: '90%', background: 'rgba(0,0,0,0.12)', borderRadius: 2 }} />
              <div style={{ height: 3, width: '70%', background: 'rgba(0,0,0,0.08)', borderRadius: 2 }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sun size={13} color="#D97706" /> {t('settings.lightMode')}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t('settings.lightModeDesc')}</div>
            </div>
            {isLight && (
              <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: '#12B485', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </button>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.6 }}>
          {language === 'ta' ? 'கருப்பொருள் தானாக சேமிக்கப்பட்டு அமர்வுகள் முழுவதும் நீடிக்கும். நீங்கள் எப்போது வேண்டுமானாலும் பக்கவாட்டுப் பட்டியலிலிருந்து மாற்றலாம்.' : t('settings.themeNote')}
        </p>
      </div>

      {/* Supabase */}
      <div className="glass-card-static" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Database size={16} color="#3B82F6" />
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t('settings.supabase')}</h3>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label">{t('settings.projectUrl')}</label>
          <input className="input-field" placeholder="https://yourproject.supabase.co" defaultValue="https://placeholder.supabase.co" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label">{t('settings.anonKey')}</label>
          <input className="input-field" placeholder="eyJ…" type="password" defaultValue="placeholder-key" />
        </div>
        <button className="btn-secondary" onClick={() => toast.success(language === 'ta' ? 'சுபாபேஸ் அமைப்பு சேமிக்கப்பட்டது!' : 'Supabase config saved!')}>{t('settings.saveConnection')}</button>
      </div>

      {/* AI Engine */}
      <div className="glass-card-static" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Cpu size={16} color="#40C29A" />
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t('settings.aiEngine')}</h3>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label">{t('settings.engineUrl')}</label>
          <input className="input-field" defaultValue="http://localhost:8001" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label">{t('settings.primaryModel')}</label>
          <select className="input-field" style={{ cursor: 'pointer' }}>
            <option value="llama3:8b">Llama 3 8B (Structured Output)</option>
            <option value="mistral:7b">Mistral 7B (Creative)</option>
          </select>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="input-label">{t('settings.fallbackModel')}</label>
          <select className="input-field" style={{ cursor: 'pointer' }}>
            <option value="mistral:7b">Mistral 7B</option>
            <option value="llama3:8b">Llama 3 8B</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => toast.success(language === 'ta' ? 'AI இயந்திர அமைப்பு சேமிக்கப்பட்டது!' : 'AI Engine config saved!')}>{t('settings.save')}</button>
          <button className="btn-ghost" onClick={() => toast.success(language === 'ta' ? 'போலி முறைமை — AI இயந்திரம் உருவகப்படுத்தப்பட்டது' : 'Mock Mode — AI engine is simulated')}>{t('settings.testConnection')}</button>
        </div>
      </div>

      {/* About */}
      <div className="glass-card-static" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Info size={16} color="#F59E0B" />
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t('settings.about')}</h3>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div><strong style={{ color: 'var(--text-primary)' }}>BloomBig Studio AI</strong> — {t('settings.version')}</div>
          <div>{t('login.subtitle')}</div>
          <div style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: 12 }}>
            {language === 'ta' ? (
              <>
                ரகசியமானது — பிளூம்பிக் ஸ்டூடியோஸ் இன்டர்ன்ஷிப் திட்டம்<br />
                பிராண்டுகள் மலரும் · உள்ளக விநியோகம் மட்டும்
              </>
            ) : (
              <>
                Confidential — BloomBig Studios Internship Programme<br />
                Brands Built to Bloom · Internal Distribution Only
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

