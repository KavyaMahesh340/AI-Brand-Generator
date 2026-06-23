import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store'
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Zap, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTranslation } from '../lib/useTranslation'

const DEMO_EMAIL = 'demo@marketmind.ai'
const DEMO_PASSWORD = 'bloom2024'
const DEMO_NAME = 'Demo Intern'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const { t } = useTranslation()

  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  const doLogin = async (email, name) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    const mockUser = { id: 'demo-user', name, email }
    const mockToken = 'demo-token-' + Date.now()
    setUser(mockUser, mockToken)
    toast.success(`Welcome, ${name}!`)
    navigate('/')
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doLogin(form.email, form.name || 'MarketMind Intern')
  }

  const handleDemoLogin = () => {
    setForm({ email: DEMO_EMAIL, password: DEMO_PASSWORD, name: DEMO_NAME })
    doLogin(DEMO_EMAIL, DEMO_NAME)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'stretch',
    }}>
      {/* Left brand panel — visible on desktop */}
      <div style={{
        flex: '0 0 42%',
        background: 'linear-gradient(160deg, #0d9488 0%, #0891b2 60%, #1e40af 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 52px',
        position: 'relative',
        overflow: 'hidden',
      }} className="hidden lg:flex" id="login-brand-panel">
        {/* Subtle pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Brand mark */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 11,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              <Sparkles size={20} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17, color: 'white' }}>MarketMind AI</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>AI CAMPAIGN PLATFORM</div>
            </div>
          </div>

          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 20 }}>
            Campaign Strategy.<br />
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Powered by AI.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 360 }}>
            From brand DNA fingerprinting to pitch-ready PDF exports — in under 60 seconds.
          </p>
        </div>

        {/* Feature list */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {[
            'Brand DNA Fingerprinting',
            'AI Persona Generation',
            'Risk Radar Detection',
            'Empathy Simulator',
            'One-Click PDF Export',
          ].map((feat) => (
            <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{feat}</span>
            </div>
          ))}

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            Confidential — MarketMind AI Internship Programme
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: '#ffffff',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }} className="animate-scaleIn">

          {/* Mobile logo */}
          <div style={{ textAlign: 'center', marginBottom: 36 }} id="login-mobile-logo">
            <div style={{
              width: 50, height: 50, borderRadius: 14,
              background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 4px 16px rgba(13,148,136,0.25)',
            }}>
              <Sparkles size={22} color="white" />
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
              {t('login.title')}
            </h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>{t('login.subtitle')}</p>
          </div>

          {/* Confidential badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 12px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 20,
            marginBottom: 24,
          }}>
            <ShieldCheck size={13} color="#16a34a" />
            <span style={{ fontSize: 12, color: '#15803d', fontWeight: 600 }}>{t('login.confidential')}</span>
          </div>

          {/* Demo login banner */}
          <div style={{
            padding: '14px 16px',
            borderRadius: 10,
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Zap size={13} color="#16a34a" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#15803d' }}>{t('login.demoAccount')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>
                <div><span style={{ color: '#94a3b8' }}>{t('login.email')}:</span> {DEMO_EMAIL}</div>
                <div><span style={{ color: '#94a3b8' }}>{t('login.password')}:</span> {DEMO_PASSWORD}</div>
              </div>
              <button
                type="button"
                id="demo-login-btn"
                onClick={handleDemoLogin}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  background: '#0d9488',
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
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                <Zap size={12} /> {t('login.useDemo')}
              </button>
            </div>
          </div>

          {/* Mode tabs */}
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            borderRadius: 10,
            padding: 4,
            marginBottom: 24,
          }}>
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                id={`tab-${m}`}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: 8,
                  border: 'none',
                  background: mode === m ? '#ffffff' : 'transparent',
                  color: mode === m ? '#0f172a' : '#94a3b8',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
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
                  id="input-name"
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
                <Mail size={15} style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8', pointerEvents: 'none',
                }} />
                <input
                  id="input-email"
                  className="input-field"
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ paddingLeft: 38 }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="input-label">{t('login.password')}</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8', pointerEvents: 'none',
                }} />
                <input
                  id="input-password"
                  className="input-field"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  style={{ paddingLeft: 38, paddingRight: 42 }}
                  required
                />
                <button
                  type="button"
                  id="toggle-password"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#94a3b8', cursor: 'pointer', padding: 0,
                  }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              id="submit-login"
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  {t('login.authenticating')}
                </span>
              ) : (
                <>
                  {mode === 'login' ? t('login.signIn') : t('login.createAccount')}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#94a3b8' }}>
            {t('login.footer')}
          </p>
        </div>
      </div>

      {/* Inline style for responsive login panel */}
      <style>{`
        @media (max-width: 1023px) {
          #login-brand-panel { display: none !important; }
        }
      `}</style>
    </div>
  )
}
