import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore, useAuthStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
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
  X,
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

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()
  const { user, logout } = useAuthStore()
  const { t } = useTranslation()

  const handleLogout = () => {
    logout()
    navigate('/login')
    if (onMobileClose) onMobileClose()
  }

  const handleNav = (path) => {
    navigate(path)
    if (onMobileClose) onMobileClose()
  }

  const collapsed = sidebarCollapsed

  return (
    <aside
      className={`sidebar ${mobileOpen ? 'open' : ''}`}
      style={{
        width: collapsed ? '68px' : '260px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '18px 14px' : '20px 18px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: collapsed ? 'center' : 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(13,148,136,0.25)',
            }}
          >
            <Sparkles size={16} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#0f172a',
                  lineHeight: 1.2,
                }}
              >
                BloomBig
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '0.08em', fontWeight: 500 }}>
                STUDIO AI
              </div>
            </div>
          )}
        </div>

        {/* Mobile close */}
        {!collapsed && mobileOpen !== undefined && (
          <button
            onClick={onMobileClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: 4,
              display: 'flex',
            }}
            className="md:hidden"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ padding: '10px 8px', flex: 1, overflowY: 'auto' }}>
        {/* Section label */}
        {!collapsed && (
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#cbd5e1',
            padding: '8px 8px 4px',
          }}>
            Navigation
          </div>
        )}

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
              onClick={() => handleNav(item.path)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              title={collapsed ? label : undefined}
              style={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                marginBottom: 2,
              }}
            >
              <div style={{ width: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} style={{ color: isActive ? '#0d9488' : undefined }} />
              </div>
              {!collapsed && <span>{label}</span>}
              {isActive && !collapsed && (
                <div style={{
                  marginLeft: 'auto',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#14b8a6',
                  flexShrink: 0,
                }} />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '8px 8px 12px', borderTop: '1px solid #f1f5f9' }}>

        {/* User info */}
        {!collapsed && user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 10px',
              marginBottom: 6,
              borderRadius: 10,
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
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
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0f172a',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name || 'Demo User'}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>BloomBig Studio</div>
            </div>
          </div>
        )}

        <button
          className="sidebar-nav-item"
          style={{ justifyContent: collapsed ? 'center' : 'flex-start', marginBottom: 2 }}
          onClick={() => handleNav('/settings')}
          title={collapsed ? t('nav.settings') : undefined}
        >
          <Settings size={16} />
          {!collapsed && <span style={{ fontSize: 14 }}>{t('nav.settings')}</span>}
        </button>

        <button
          className="sidebar-nav-item"
          style={{
            color: '#e11d48',
            justifyContent: collapsed ? 'center' : 'flex-start',
            marginBottom: 2,
          }}
          onClick={handleLogout}
          title={collapsed ? t('nav.logout') : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span style={{ fontSize: 14 }}>{t('nav.logout')}</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="sidebar-nav-item"
          style={{
            marginTop: 4,
            justifyContent: collapsed ? 'center' : 'flex-start',
            color: '#cbd5e1',
          }}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          {!collapsed && <span style={{ fontSize: 12, color: '#94a3b8' }}>{t('nav.collapse')}</span>}
        </button>
      </div>
    </aside>
  )
}
