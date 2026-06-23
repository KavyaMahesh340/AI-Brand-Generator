import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import {
  TrendingUp, Users, Zap, Target, ArrowRight, Plus, BarChart3,
  Sparkles, Clock, CheckCircle2, Brain, Activity
} from 'lucide-react'
import { mockPersonas, mockHealthScore } from '../lib/mockData'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

const DEMO_CAMPAIGNS = [
  { id: '1', name: 'Pongal Harvest Launch', client: 'NatureBloom Co.', status: 'active', score: 84, goal: 'Brand Awareness', created_at: '2024-01-10', platform: 'Instagram' },
  { id: '2', name: 'Q1 LinkedIn Thought Leader', client: 'TechForge India', status: 'draft', score: 71, goal: 'Lead Generation', created_at: '2024-01-08', platform: 'LinkedIn' },
  { id: '3', name: "Valentine's Flash Sale", client: 'Velvet Rose Boutique', status: 'completed', score: 92, goal: 'Conversions', created_at: '2024-01-05', platform: 'Instagram + TikTok' },
]

function ScorePill({ score }) {
  const color = score >= 80 ? '#15803d' : score >= 65 ? '#b45309' : '#be123c'
  const bg   = score >= 80 ? '#f0fdf4'  : score >= 65 ? '#fffbeb'  : '#fff1f2'
  const bdr  = score >= 80 ? '#bbf7d0'  : score >= 65 ? '#fde68a'  : '#fecdd3'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 9999,
      background: bg, border: `1px solid ${bdr}`,
      fontSize: 13, fontWeight: 600, color,
      flexShrink: 0, whiteSpace: 'nowrap',
      lineHeight: 1
    }}>
      <BarChart3 size={14} />
      <span>{score}/100</span>
    </span>
  )
}

function StatusPill({ status, t }) {
  const map = {
    active:    { label: t('campaigns.active'),    cls: 'status-active',    dotCls: 'status-dot-active' },
    draft:     { label: t('campaigns.draft'),     cls: 'status-draft',     dotCls: 'status-dot-draft' },
    completed: { label: t('campaigns.completed'), cls: 'status-completed', dotCls: 'status-dot-completed' },
  }
  const s = map[status] || map.draft
  return (
    <span className={`status-pill ${s.cls}`} style={{ 
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 9999,
      fontSize: 13, fontWeight: 600,
      flexShrink: 0, whiteSpace: 'nowrap', lineHeight: 1
    }}>
      <span className={`status-dot ${s.dotCls}`} style={{ width: 6, height: 6, borderRadius: '50%' }} />
      <span>{s.label}</span>
    </span>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [animatedScores, setAnimatedScores] = useState([0, 0, 0, 0])

  useEffect(() => {
    const timers = stats.map((stat, i) =>
      setTimeout(() => {
        let cur = 0
        const interval = setInterval(() => {
          cur = Math.min(cur + Math.ceil(stat.value / 20), stat.value)
          setAnimatedScores((prev) => { const n = [...prev]; n[i] = cur; return n })
          if (cur >= stat.value) clearInterval(interval)
        }, 40)
      }, i * 150)
    )
    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const personas = mockPersonas('brand awareness')

  const stats = [
    { label: t('dashboard.totalCampaigns'), value: 12,  suffix: '',  delta: '+3 this week',       icon: Zap,      iconBg: '#f0fdf4', iconColor: '#16a34a' },
    { label: t('dashboard.avgScore'),       value: 81,  suffix: '',  delta: '+4.2 vs last month', icon: BarChart3, iconBg: '#f0fdfa', iconColor: '#0d9488' },
    { label: t('dashboard.brandProfiles'),  value: 8,   suffix: '',  delta: '3 new onboarded',   icon: Brain,    iconBg: '#faf5ff', iconColor: '#9333ea' },
    { label: t('dashboard.hoursSaved'),     value: 140, suffix: '+', delta: t('dashboard.vsManual'), icon: Clock, iconBg: '#eff6ff', iconColor: '#2563eb' },
  ]

  const quickActions = [
    { icon: Brain,  label: t('dashboard.extractDna'),      path: '/brand-dna',  color: '#0d9488' },
    { icon: Users,  label: t('dashboard.buildPersonas'),   path: '/personas',   color: '#9333ea' },
    { icon: Target, label: t('dashboard.detectBlindSpots'),path: '/risk',       color: '#d97706' },
    { icon: Zap,    label: t('dashboard.mapMoments'),      path: '/empathy',    color: '#2563eb' },
  ]

  const iqMetrics = [
    { label: 'Persona-Platform Fit', score: 92, color: '#0d9488' },
    { label: 'Message Clarity',      score: 88, color: '#2563eb' },
    { label: 'Timing Alignment',     score: 85, color: '#16a34a' },
    { label: 'Risk Index (inv.)',     score: 72, color: '#d97706' },
  ]

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header animate-fadeInUp">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div className="pulse-dot" />
            <Badge variant="success" style={{ fontSize: 11 }}>AI Engine Online</Badge>
          </div>
          <h1 className="page-title" style={{ fontSize: 28, marginBottom: 4 }}>
            {language === 'ta' ? (
              <>பிரச்சார <span className="gradient-text">புலனாய்வு</span> மையம்</>
            ) : (
              <>Campaign <span className="gradient-text">Intelligence</span> Hub</>
            )}
          </h1>
          <p className="page-subtitle">Brands Built to Bloom — MarketMind AI AI</p>
        </div>
        <Button id="new-campaign-btn" onClick={() => navigate('/campaigns/new')}>
          <Plus size={15} />
          {t('dashboard.newCampaign')}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: stat.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={stat.iconColor} />
                </div>
                <TrendingUp size={13} color="#22c55e" />
              </div>
              <div style={{
                fontSize: 32, fontWeight: 800,
                fontFamily: 'Space Grotesk, sans-serif',
                color: '#0f172a', marginBottom: 4,
                lineHeight: 1.1, letterSpacing: '-0.02em',
              }}>
                {animatedScores[i]}{stat.suffix}
              </div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{stat.delta}</div>
            </div>
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">

        {/* Recent Campaigns */}
        <Card>
          <CardHeader style={{ paddingBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>{t('dashboard.recentCampaigns')}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/campaigns')}>
                {t('dashboard.viewAll')} <ArrowRight size={13} />
              </Button>
            </div>
          </CardHeader>
          <CardContent style={{ paddingTop: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DEMO_CAMPAIGNS.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/campaigns/${c.id}`)}
                  style={{
                    padding: '14px 16px',
                    background: '#f8fafc',
                    borderRadius: 10,
                    border: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#99f6e4'
                    e.currentTarget.style.background = '#f0fdfa'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#f1f5f9'
                    e.currentTarget.style.background = '#f8fafc'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.client} · {c.goal}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <StatusPill status={c.status} t={t} />
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{c.platform}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: 16 }}>
                    <ScorePill score={c.score} />
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 5 }}>{c.created_at}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => navigate('/campaigns/new')}
              style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
            >
              <Sparkles size={14} />
              {t('dashboard.newCampaign')}
            </Button>
          </CardContent>
        </Card>

        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Quick actions */}
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}>
              <div className="section-label" style={{ marginBottom: 0 }}>{t('dashboard.quickActions').toUpperCase()}</div>
            </CardHeader>
            <CardContent style={{ paddingTop: 0 }}>
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 10px',
                      marginBottom: 6,
                      borderRadius: 8,
                      border: '1px solid #f1f5f9',
                      background: 'transparent',
                      color: '#475569',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      textAlign: 'left',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${action.color}08`
                      e.currentTarget.style.borderColor = `${action.color}30`
                      e.currentTarget.style.color = '#0f172a'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = '#f1f5f9'
                      e.currentTarget.style.color = '#475569'
                    }}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: `${action.color}12`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={14} color={action.color} />
                    </div>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {action.label}
                    </span>
                    <ArrowRight size={12} style={{ flexShrink: 0, opacity: 0.4 }} />
                  </button>
                )
              })}
            </CardContent>
          </Card>

          {/* Persona snapshot */}
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}>
              <div className="section-label" style={{ marginBottom: 0 }}>
                {language === 'ta' ? 'செயலில் உள்ள நபர்கள்' : 'ACTIVE PERSONAS'}
              </div>
            </CardHeader>
            <CardContent style={{ paddingTop: 0 }}>
              {personas.slice(0, 3).map((p) => {
                const initials = p.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
                return (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      marginBottom: 10, padding: '8px 6px', borderRadius: 8,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: `${p.color}18`,
                      border: `2px solid ${p.color}35`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: p.color, flexShrink: 0,
                    }}>
                      {initials}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{p.age} · {p.location.split(',')[0]}</div>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: 10, flexShrink: 0 }}>Active</Badge>
                  </div>
                )
              })}
              <Button
                variant="outline"
                size="sm"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                onClick={() => navigate('/personas')}
              >
                {language === 'ta' ? 'நபர்களை நிர்வகி' : 'Manage Personas'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CampaignIQ Health Overview */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Activity size={16} color="#0d9488" />
              <CardTitle>
                {language === 'ta' ? 'கேம்பெய்ன்IQ ஆரோக்கிய கண்ணோட்டம்' : 'CampaignIQ Health Overview'}
              </CardTitle>
            </div>
            <Badge variant="purple">Latest Analysis</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {iqMetrics.map((item) => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 10 }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="32"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="6"
                      strokeDasharray={`${(item.score / 100) * 201} 201`}
                      strokeLinecap="round"
                      className="gauge-ring"
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 16, fontWeight: 800, color: item.color,
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}>
                    {item.score}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
