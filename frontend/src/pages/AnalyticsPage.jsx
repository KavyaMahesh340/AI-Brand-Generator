import { BarChart3, TrendingUp, Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'

const weeklyData = [
  { week: 'W1', campaigns: 2, avgScore: 72, hoursaved: 18 },
  { week: 'W2', campaigns: 3, avgScore: 76, hoursaved: 27 },
  { week: 'W3', campaigns: 4, avgScore: 79, hoursaved: 36 },
  { week: 'W4', campaigns: 3, avgScore: 84, hoursaved: 30 },
]

const platformData = [
  { name: 'Instagram', campaigns: 8, avgScore: 83 },
  { name: 'LinkedIn', campaigns: 5, avgScore: 78 },
  { name: 'TikTok', campaigns: 4, avgScore: 80 },
  { name: 'WhatsApp', campaigns: 3, avgScore: 74 },
]

export default function AnalyticsPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()

  const stats = [
    { label: t('analytics.totalCampaigns'), val: '20', delta: language === 'ta' ? '+4 இந்த மாதம்' : '+4 this month', color: '#12B485' },
    { label: t('analytics.avgIq'), val: '81', delta: language === 'ta' ? '+4.2 மேம்பாடு' : '+4.2 improvement', color: '#10B981' },
    { label: t('analytics.hoursSaved'), val: '140+', delta: language === 'ta' ? 'கைமுறை ஆராய்ச்சியுடன் ஒப்பிடும்போது' : 'vs manual research', color: '#F59E0B' },
  ]

  return (
    <div style={{ padding: '32px 36px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{t('analytics.title')}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t('analytics.subtitle')}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} className="glass-card-static" style={{ padding: 24 }}>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Space Grotesk', color: s.color, marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#10B981' }}>↑ {s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Weekly campaigns */}
        <div className="glass-card-static" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>{t('analytics.weeklyVolume')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#161C2E', border: '1px solid rgba(13,155,118,0.2)', borderRadius: 8, color: '#F1F5F9', fontFamily: 'Inter' }} />
              <Bar dataKey="campaigns" fill="url(#barGrad)" radius={[4,4,0,0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#12B485" />
                  <stop offset="100%" stopColor="#40C29A" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Avg score trend */}
        <div className="glass-card-static" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>{t('analytics.iqTrend')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} />
              <YAxis domain={[60, 100]} tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#161C2E', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#F1F5F9', fontFamily: 'Inter' }} />
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="avgScore" stroke="#10B981" strokeWidth={2} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform breakdown */}
      <div className="glass-card-static" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>{t('analytics.platformPerf')}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={platformData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 13 }} axisLine={false} width={90} />
            <Tooltip contentStyle={{ background: '#161C2E', border: '1px solid rgba(13,155,118,0.2)', borderRadius: 8, color: '#F1F5F9', fontFamily: 'Inter' }} />
            <Bar dataKey="avgScore" fill="#12B485" radius={[0,4,4,0]} name="Avg CampaignIQ" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

