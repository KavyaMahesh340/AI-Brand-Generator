import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import {
  TrendingUp, Users, Zap, Target, ArrowRight, Plus, BarChart3,
  Sparkles, Clock, CheckCircle2, AlertTriangle, Brain
} from 'lucide-react'
import { mockPersonas, mockHealthScore } from '../lib/mockData'

const DEMO_CAMPAIGNS = [
  { id: '1', name: 'Pongal Harvest Launch', client: 'NatureBloom Co.', status: 'active', score: 84, goal: 'Brand Awareness', created_at: '2024-01-10', platform: 'Instagram' },
  { id: '2', name: 'Q1 LinkedIn Thought Leader', client: 'TechForge India', status: 'draft', score: 71, goal: 'Lead Generation', created_at: '2024-01-08', platform: 'LinkedIn' },
  { id: '3', name: 'Valentine\'s Flash Sale', client: 'Velvet Rose Boutique', status: 'completed', score: 92, goal: 'Conversions', created_at: '2024-01-05', platform: 'Instagram + TikTok' },
]

function ScoreBadge({ score }) {
  const color = score >= 80 ? '#10B981' : score >= 65 ? '#F59E0B' : '#EF4444'
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 20,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        fontSize: 12,
        fontWeight: 700,
        color,
      }}
    >
      <BarChart3 size={12} />
      {score}/100
    </div>
  )
}

function StatusBadge({ status, t }) {
  const map = {
    active: { color: '#10B981', label: t('campaigns.active') },
    draft: { color: '#F59E0B', label: t('campaigns.draft') },
    completed: { color: '#3B82F6', label: t('campaigns.completed') },
  }
  const s = map[status] || map.draft
  return (
    <span
      style={{
        padding: '3px 10px',
        borderRadius: 20,
        background: `${s.color}15`,
        border: `1px solid ${s.color}30`,
        fontSize: 11,
        fontWeight: 600,
        color: s.color,
        letterSpacing: '0.04em',
      }}
    >
      {s.label}
    </span>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { activeClient } = useAppStore()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [animatedScores, setAnimatedScores] = useState([0, 0, 0, 0])

  useEffect(() => {
    // Animate stats on mount
    const targets = [12, 81, 8, 140]
    const timers = targets.map((target, i) =>
      setTimeout(() => {
        let cur = 0
        const interval = setInterval(() => {
          cur = Math.min(cur + Math.ceil(target / 20), target)
          setAnimatedScores((prev) => { const n = [...prev]; n[i] = cur; return n })
          if (cur >= target) clearInterval(interval)
        }, 40)
      }, i * 150)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const personas = mockPersonas('brand awareness')

  const stats = [
    { label: t('dashboard.totalCampaigns'), value: '12', delta: language === 'ta' ? '+3 இந்த வாரம்' : '+3 this week', icon: Zap, color: '#12B485' },
    { label: t('dashboard.avgScore'), value: '81', delta: language === 'ta' ? '+4.2 முந்தைய மாதத்துடன் ஒப்பிடும்போது' : '+4.2 vs last month', icon: BarChart3, color: '#10B981' },
    { label: t('dashboard.brandProfiles'), value: '8', delta: language === 'ta' ? '3 புதிய சேர்க்கை' : '3 new onboarded', icon: Brain, color: '#F59E0B' },
    { label: t('dashboard.hoursSaved'), value: '140+', delta: t('dashboard.vsManual'), icon: Clock, color: '#3B82F6' },
  ]

  const quickActions = [
    { icon: Brain, label: t('dashboard.extractDna'), path: '/brand-dna', color: '#12B485' },
    { icon: Users, label: t('dashboard.buildPersonas'), path: '/personas', color: '#10B981' },
    { icon: Target, label: t('dashboard.detectBlindSpots'), path: '/risk', color: '#F59E0B' },
    { icon: Zap, label: t('dashboard.mapMoments'), path: '/empathy', color: '#3B82F6' },
  ]

  const iqMetrics = [
    { label: language === 'ta' ? 'நபரிடை-தளப் பொருத்தம்' : 'Persona–Platform Fit', score: 92, color: '#10B981' },
    { label: language === 'ta' ? 'செய்தி தெளிவு' : 'Message Clarity', score: 88, color: '#3B82F6' },
    { label: language === 'ta' ? 'நேர சீரமைப்பு' : 'Timing Alignment', score: 85, color: '#12B485' },
    { label: language === 'ta' ? 'ஆபத்து குறியீடு (தலைகீழ்)' : 'Risk Index (inv.)', score: 72, color: '#F59E0B' },
  ]

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1400 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 36,
        }}
        className="animate-fadeInUp"
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div className="pulse-dot" />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              AI Engine Online
            </span>
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              marginBottom: 6,
            }}
          >
            {language === 'ta' ? (
              <>பிரச்சார <span className="gradient-text">புலனாய்வு</span> மையம்</>
            ) : (
              <>Campaign <span className="gradient-text">Intelligence</span> Hub</>
            )}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Brands Built to Bloom — BloomBig Studio AI
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => navigate('/campaigns/new')}
          style={{ gap: 8 }}
        >
          <Plus size={16} />
          {t('dashboard.newCampaign')}
        </button>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          marginBottom: 36,
        }}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="glass-card"
              style={{ padding: '24px', animationDelay: `${i * 0.1}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${stat.color}18`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={18} color={stat.color} />
                </div>
                <TrendingUp size={14} color="#10B981" />
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: 'var(--text-primary)',
                  marginBottom: 4,
                }}
              >
                {i === 3 ? '140+' : animatedScores[i]}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 11, color: '#10B981' }}>{stat.delta}</div>
            </div>
          )
        })}
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, marginBottom: 24 }}>
        {/* Recent Campaigns */}
        <div className="glass-card-static" style={{ padding: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 700 }}>{t('dashboard.recentCampaigns')}</h2>
            <button
              className="btn-ghost"
              style={{ fontSize: 12, padding: '6px 14px' }}
              onClick={() => navigate('/campaigns')}
            >
              {t('dashboard.viewAll')} <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DEMO_CAMPAIGNS.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/campaigns/${c.id}`)}
                style={{
                  padding: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 12,
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(13,155,118,0.3)'
                  e.currentTarget.style.background = 'rgba(13,155,118,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                    {c.client} · {c.goal}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StatusBadge status={c.status} t={t} />
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.platform}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: 16 }}>
                  <ScoreBadge score={c.score} />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                    {c.created_at}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate('/campaigns/new')}
            style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
          >
            <Sparkles size={14} />
            {t('dashboard.newCampaign')}
          </button>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Quick actions */}
          <div className="glass-card-static" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-secondary)' }}>
              {t('dashboard.quickActions').toUpperCase()}
            </h3>
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
                    gap: 12,
                    padding: '10px 12px',
                    marginBottom: 6,
                    borderRadius: 10,
                    border: '1px solid var(--border-subtle)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${action.color}10`
                    e.currentTarget.style.borderColor = `${action.color}40`
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: `${action.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={14} color={action.color} />
                  </div>
                  {action.label}
                  <ArrowRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
              )
            })}
          </div>

          {/* Persona snapshot */}
          <div className="glass-card-static" style={{ padding: 20 }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 14,
                color: 'var(--text-secondary)',
              }}
            >
              {language === 'ta' ? 'செயலில் உள்ள நபர்கள்' : 'ACTIVE PERSONAS'}
            </h3>
            {personas.slice(0, 3).map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                  padding: '8px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `${p.color}20`,
                    border: `2px solid ${p.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                  }}
                >
                  {p.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {p.age} · {p.location.split(',')[0]}
                  </div>
                </div>
              </div>
            ))}
            <button
              className="btn-ghost"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 12 }}
              onClick={() => navigate('/personas')}
            >
              {language === 'ta' ? 'நபர்களை நிர்வகி' : 'Manage Personas'}
            </button>
          </div>
        </div>
      </div>

      {/* CampaignIQ preview */}
      <div className="glass-card-static" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700 }}>
            {language === 'ta' ? 'கேம்பெய்ன்IQ ஆரோக்கிய கண்ணோட்டம்' : 'CampaignIQ Health Overview'}
          </h2>
          <span className="badge badge-purple">{language === 'ta' ? 'சமீபத்திய பகுப்பாய்வு' : 'Latest Analysis'}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {iqMetrics.map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {item.label}
              </div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle
                    cx="40" cy="40" r="32"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="6"
                    strokeDasharray={`${(item.score / 100) * 201} 201`}
                    strokeLinecap="round"
                    className="gauge-ring"
                    style={{ filter: `drop-shadow(0 0 6px ${item.color}80)` }}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 16,
                    fontWeight: 800,
                    color: item.color,
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {item.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

