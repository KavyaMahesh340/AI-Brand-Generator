import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, useThemeStore, useLanguageStore } from '../store'
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Sun, Moon, Zap, Languages } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTranslation } from '../lib/useTranslation'

// ─── Demo credentials ──────────────────────────────────────────────────────────
const DEMO_EMAIL = 'demo@bloombig.studio'
const DEMO_PASSWORD = 'bloom2024'
const DEMO_NAME = 'Demo Intern'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const { language, toggleLanguage } = useLanguageStore()
  const { t } = useTranslation()
  const isLight = theme === 'light'

  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  const doLogin = async (email, name) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1100))
    const mockUser = { id: 'demo-user', name, email }
    const mockToken = 'demo-token-' + Date.now()
    setUser(mockUser, mockToken)
    toast.success(language === 'ta' ? `வரவேற்கிறோம், ${name}! 🌺` : `Welcome, ${name}! 🌺`)
    navigate('/')
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doLogin(form.email, form.name || 'BloomBig Intern')
  }

  const handleDemoLogin = () => {
    setForm({ email: DEMO_EMAIL, password: DEMO_PASSWORD, name: DEMO_NAME })
    doLogin(DEMO_EMAIL, DEMO_NAME)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Background orbs */}
      <div className="glow-orb glow-orb-primary" style={{ width: 500, height: 500, top: -100, left: -100 }} />
      <div className="glow-orb glow-orb-accent" style={{ width: 400, height: 400, bottom: -80, right: -80 }} />
      <div className="glow-orb glow-orb-blue" style={{ width: 300, height: 300, top: '40%', right: '10%' }} />

      {/* Controls — top right corner */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 24,
          zIndex: 50,
          display: 'flex',
          gap: 12,
        }}
      >
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          title={language === 'ta' ? 'Switch to English' : 'தமிழில் மாற்றவும்'}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: '1px solid rgba(27,50,117,0.25)',
            background: 'rgba(27,50,117,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s',
            backdropFilter: 'blur(12px)',
            color: '#8E9FC0',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Languages size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: `1px solid ${isLight ? 'rgba(13,155,118,0.2)' : 'rgba(188,154,0,0.25)'}`,
            background: isLight ? 'rgba(13,155,118,0.08)' : 'rgba(188,154,0,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s',
            backdropFilter: 'blur(12px)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isLight
            ? <Moon size={18} color="#0D9B76" />
            : <Sun size={18} color="#E4BE34" />
          }
        </button>
      </div>

      {/* Card */}
      <div
        className="glass-card-static animate-scaleIn"
        style={{ width: 440, padding: '48px 40px', position: 'relative', zIndex: 10 }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #0D9B76, #12B485)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 24px rgba(13,155,118,0.38)',
            }}
          >
            <Sparkles size={26} color="white" />
          </div>
          <h1
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 6,
            }}
          >
            {t('login.title')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
            {t('login.subtitle')}
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              background: 'rgba(13,155,118,0.1)',
              borderRadius: 20,
              border: '1px solid rgba(13,155,118,0.2)',
            }}
          >
            <span style={{ fontSize: 11, color: 'var(--bloom-primary-light)', fontWeight: 500 }}>
              🔒 {t('login.confidential')}
            </span>
          </div>
        </div>

        {/* ─── Demo Login Banner ─────────────────────────────────────── */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(13,155,118,0.1), rgba(188,154,0,0.07))',
            border: '1px solid rgba(13,155,118,0.25)',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--bloom-primary-light)', marginBottom: 8 }}>
            ⚡ {t('login.demoAccount')}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div><span style={{ color: 'var(--text-muted)' }}>{t('login.email')}:</span> {DEMO_EMAIL}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>{t('login.password')}:</span> {DEMO_PASSWORD}</div>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #12B485, #0D9B76)',
                color: 'white',
                border: 'none',
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(13,155,118,0.35)',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <Zap size={12} /> {t('login.useDemo')}
            </button>
          </div>
        </div>

        {/* Mode tabs */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 10,
            padding: 4,
            marginBottom: 22,
          }}
        >
          {['login', 'signup'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 8,
                border: 'none',
                background: mode === m ? 'linear-gradient(135deg, #12B485, #0D9B76)' : 'transparent',
                color: mode === m ? 'white' : 'var(--text-muted)',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: mode === m ? '0 4px 12px rgba(13,155,118,0.3)' : 'none',
              }}
            >
              {m === 'login' ? t('login.signIn') : t('login.signUp')}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{ marginBottom: 16 }}>
              <label className="input-label">{t('login.fullName')}</label>
              <input
                className="input-field"
                type="text"
                placeholder={t('login.namePlaceholder')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required={mode === 'signup'}
              />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label className="input-label">{t('login.email')}</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                className="input-field"
                type="email"
                placeholder={t('login.emailPlaceholder')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ paddingLeft: 40 }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label className="input-label">{t('login.password')}</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                className="input-field"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ paddingLeft: 40, paddingRight: 44 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                  </path>
                </svg>
                {t('login.authenticating')}
              </span>
            ) : (
              <>
                {mode === 'login' ? t('login.signIn') : t('login.createAccount')}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'var(--text-muted)' }}>
          {t('login.footer')}
        </p>
      </div>
    </div>
  )
}

