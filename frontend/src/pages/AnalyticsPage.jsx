import { BarChart3, TrendingUp, Clock, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const weeklyData = [
  { week: 'W1', campaigns: 2, avgScore: 72, hoursaved: 18 },
  { week: 'W2', campaigns: 3, avgScore: 76, hoursaved: 27 },
  { week: 'W3', campaigns: 4, avgScore: 79, hoursaved: 36 },
  { week: 'W4', campaigns: 3, avgScore: 84, hoursaved: 30 },
]

const platformData = [
  { name: 'Instagram', campaigns: 8, avgScore: 83 },
  { name: 'LinkedIn',  campaigns: 5, avgScore: 78 },
  { name: 'TikTok',    campaigns: 4, avgScore: 80 },
  { name: 'WhatsApp',  campaigns: 3, avgScore: 74 },
]

const TOOLTIP_STYLE = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  color: '#0f172a',
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

export default function AnalyticsPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()

  const stats = [
    {
      label: t('analytics.totalCampaigns'),
      val: '20',
      delta: language === 'ta' ? '+4 இந்த மாதம்' : '+4 this month',
      icon: BarChart3,
      iconBg: '#f0fdfa',
      iconColor: '#0d9488',
    },
    {
      label: t('analytics.avgIq'),
      val: '81',
      delta: language === 'ta' ? '+4.2 மேம்பாடு' : '+4.2 improvement',
      icon: TrendingUp,
      iconBg: '#f0fdf4',
      iconColor: '#16a34a',
    },
    {
      label: t('analytics.hoursSaved'),
      val: '140+',
      delta: language === 'ta' ? 'கைமுறை ஆராய்ச்சியுடன்' : 'vs manual research',
      icon: Clock,
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
    },
  ]

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('analytics.title')}</h1>
          <p className="page-subtitle">{t('analytics.subtitle')}</p>
        </div>
        <Badge variant="default">Live Data</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        {stats.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={s.iconColor} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                  <ArrowUpRight size={13} />
                </div>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: '#0f172a', marginBottom: 3 }}>{s.val}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{s.delta}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Weekly campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.weeklyVolume')}</CardTitle>
          </CardHeader>
          <CardContent style={{ paddingTop: 0 }}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#f0fdfa' }} />
                <Bar dataKey="campaigns" fill="#0d9488" radius={[5, 5, 0, 0]} name="Campaigns" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* IQ score trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.iqTrend')}</CardTitle>
          </CardHeader>
          <CardContent style={{ paddingTop: 0 }}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: '#0d9488', strokeWidth: 1 }} />
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="avgScore" stroke="#0d9488" strokeWidth={2.5} fill="url(#areaGrad)" name="Avg IQ Score" dot={{ fill: '#0d9488', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform breakdown */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardTitle>{t('analytics.platformPerf')}</CardTitle>
            <Badge variant="secondary">Avg CampaignIQ</Badge>
          </div>
        </CardHeader>
        <CardContent style={{ paddingTop: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {platformData.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 120, fontSize: 13, fontWeight: 600, color: '#475569', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ flex: 1, minWidth: 0, height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${p.avgScore}%`,
                    background: 'linear-gradient(90deg, #0d9488, #14b8a6)',
                    borderRadius: 4,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <div style={{ width: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0d9488', lineHeight: 1 }}>{p.avgScore}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4, whiteSpace: 'nowrap' }}>{p.campaigns} campaigns</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
