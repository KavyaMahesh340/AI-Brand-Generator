import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore, useAuthStore, useThemeStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import { LANGUAGES } from '../lib/i18n'
import {
  LayoutDashboard,
  Zap,
  Users,
  BarChart3,
  FileText,
  Brain,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  Sparkles,
  Target,
  Shield,
  Sun,
  Moon,
  Languages,
} from 'lucide-react'

const NAV_KEYS = [
  { icon: LayoutDashboard, key: 'nav.dashboard',  path: '/' },
  { icon: Zap,             key: 'nav.newCampaign', path: '/campaigns/new' },
  { icon: Brain,           key: 'nav.brandDna',    path: '/brand-dna' },
  { icon: Users,           key: 'nav.personas',    path: '/personas' },
  { icon: Target,          key: 'nav.campaigns',   path: '/campaigns' },
  { icon: BarChart3,       key: 'nav.analytics',   path: '/analytics' },
  { icon: Shield,          key: 'nav.riskRadar',   path: '/risk' },
  { icon: Sparkles,        key: 'nav.empathySim',  path: '/empathy' },
  { icon: FileText,        key: 'nav.export',      path: '/export' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const { language, toggleLanguage } = useLanguageStore()
  const { t } = useTranslation()

  const isLight = theme === 'light'
  const isTamil = language === 'ta'
  const currentLang = LANGUAGES.find(l => l.code === language)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className="sidebar"
      style={{
        width: sidebarCollapsed ? '72px' : '260px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: sidebarCollapsed ? '20px 16px' : '24px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #0D9B76, #12B485)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(13,155,118,0.38)',
          }}
        >
          <Sparkles size={18} color="white" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <div
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
              }}
            >
              BloomBig
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              STUDIO AI
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ padding: '12px 10px', flex: 1, overflowY: 'auto' }}>
        {NAV_KEYS.map((item) => {
          const Icon = item.icon
          const label = t(item.key)
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              title={sidebarCollapsed ? label : undefined}
              style={{
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                marginBottom: 2,
              }}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!sidebarCollapsed && <span style={{ fontSize: isTamil ? 12 : 14 }}>{label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--border-subtle)' }}>

        {/* ─── Language Toggle ────────────────────────── */}
        <button
          onClick={toggleLanguage}
          className="sidebar-nav-item"
          title={sidebarCollapsed ? (isTamil ? 'Switch to English' : 'தமிழில் மாற்று') : undefined}
          style={{
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            marginBottom: 4,
            background: 'rgba(27,50,117,0.10)',
            border: '1px solid rgba(27,50,117,0.20)',
            color: '#8E9FC0',
          }}
        >
          <Languages size={16} />
          {!sidebarCollapsed && (
            <span style={{ fontSize: 12, fontWeight: 600 }}>
              {isTamil ? 'English' : 'தமிழ்'}
            </span>
          )}
        </button>

        {/* ─── Theme Toggle ─────────────────────────────── */}
        <button
          onClick={toggleTheme}
          className="sidebar-nav-item"
          title={sidebarCollapsed ? (isLight ? 'Switch to Dark' : 'Switch to Light') : undefined}
          style={{
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            marginBottom: 4,
            background: isLight ? 'rgba(13,155,118,0.07)' : 'rgba(188,154,0,0.08)',
            border: `1px solid ${isLight ? 'rgba(13,155,118,0.15)' : 'rgba(188,154,0,0.18)'}`,
            color: isLight ? 'var(--bloom-primary)' : '#E4BE34',
          }}
        >
          {isLight ? <Moon size={16} /> : <Sun size={16} />}
          {!sidebarCollapsed && (
            <span style={{ fontSize: 13 }}>
              {isLight ? t('nav.darkMode') : t('nav.lightMode')}
            </span>
          )}
        </button>

        <button
          className="sidebar-nav-item"
          style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start', marginBottom: 4 }}
          onClick={() => navigate('/settings')}
          title={sidebarCollapsed ? t('nav.settings') : undefined}
        >
          <Settings size={16} />
          {!sidebarCollapsed && <span style={{ fontSize: isTamil ? 12 : 14 }}>{t('nav.settings')}</span>}
        </button>

        {!sidebarCollapsed && user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 10px',
              marginBottom: 4,
              borderRadius: 10,
              background: 'var(--bg-card-hover)',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0D9B76, #D94515)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: 'white',
                flexShrink: 0,
              }}
            >
              {(user.name || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name || 'Demo User'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>BloomBig Studio</div>
            </div>
          </div>
        )}

        <button
          className="sidebar-nav-item"
          style={{
            color: 'var(--coral-400)',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          }}
          onClick={handleLogout}
          title={sidebarCollapsed ? t('nav.logout') : undefined}
        >
          <LogOut size={16} />
          {!sidebarCollapsed && <span style={{ fontSize: isTamil ? 12 : 14 }}>{t('nav.logout')}</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="sidebar-nav-item"
          style={{
            marginTop: 4,
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!sidebarCollapsed && <span style={{ fontSize: 12 }}>{t('nav.collapse')}</span>}
        </button>
      </div>
    </aside>
  )
}
