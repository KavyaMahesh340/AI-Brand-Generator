import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import { Plus, Search, BarChart3, Zap, Clock, CheckCircle2, FileText, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table'

const DEMO_CAMPAIGNS = [
  { id: '1', name: 'Pongal Harvest Launch', client: 'NatureBloom Co.', status: 'active', score: 84, goal: 'Brand Awareness', created_at: '2024-01-10', platform: 'Instagram Reels' },
  { id: '2', name: 'Q1 LinkedIn Thought Leader', client: 'TechForge India', status: 'draft', score: 71, goal: 'Lead Generation', created_at: '2024-01-08', platform: 'LinkedIn' },
  { id: '3', name: "Valentine's Flash Sale", client: 'Velvet Rose Boutique', status: 'completed', score: 92, goal: 'Conversions', created_at: '2024-01-05', platform: 'Instagram + TikTok' },
  { id: '4', name: 'App Launch 2.0', client: 'FinEdge Startup', status: 'active', score: 78, goal: 'Product Launch', created_at: '2024-01-03', platform: 'LinkedIn + WhatsApp' },
  { id: '5', name: 'Sustainability Series', client: 'GreenPath NGO', status: 'draft', score: 65, goal: 'Community Building', created_at: '2024-01-01', platform: 'Instagram + TikTok' },
]

const STATUS_CONFIG = {
  active:    { variant: 'success', icon: Zap,          label: 'Active' },
  draft:     { variant: 'warning', icon: Clock,         label: 'Draft' },
  completed: { variant: 'info',    icon: CheckCircle2,  label: 'Completed' },
}

function ScoreBadge({ score }) {
  const variant = score >= 80 ? 'success' : score >= 65 ? 'warning' : 'destructive'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, whiteSpace: 'nowrap' }}>
      <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="12" fill="none" stroke="#f1f5f9" strokeWidth="3" />
          <circle
            cx="16" cy="16" r="12" fill="none"
            stroke={score >= 80 ? '#16a34a' : score >= 65 ? '#d97706' : '#dc2626'}
            strokeWidth="3"
            strokeDasharray={`${(score / 100) * 75.4} 75.4`}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        <span style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: 8, fontWeight: 700,
          color: score >= 80 ? '#16a34a' : score >= 65 ? '#d97706' : '#dc2626',
        }}>
          {score}
        </span>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{score}/100</span>
    </div>
  )
}

export default function CampaignsPage() {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = DEMO_CAMPAIGNS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  const filters = ['all', 'active', 'draft', 'completed']

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('campaigns.title')}</h1>
          <p className="page-subtitle">
            {filtered.length} campaign{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Button id="new-campaign-top-btn" onClick={() => navigate('/campaigns/new')}>
          <Plus size={15} /> {t('newCampaign.title')}
        </Button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 360 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
          <Input
            id="campaign-search"
            placeholder={t('campaigns.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 10, padding: 4, gap: 2 }}>
          {filters.map(f => (
            <button
              key={f}
              id={`filter-${f}`}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                background: filter === f ? '#ffffff' : 'transparent',
                color: filter === f ? '#0f172a' : '#64748b',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: filter === f ? 600 : 500,
                transition: 'all 0.15s',
                boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {t(`campaigns.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Table */}
      <Card style={{ overflow: 'hidden' }}>
        <Table>
          <TableHeader>
            <TableRow style={{ background: '#f8fafc' }}>
              <TableHead>{t('campaigns.name')}</TableHead>
              <TableHead>{t('campaigns.client')}</TableHead>
              <TableHead>{t('campaigns.goal')}</TableHead>
              <TableHead>{t('campaigns.platform')}</TableHead>
              <TableHead>{t('detail.campaignIq')}</TableHead>
              <TableHead>{t('campaigns.status')}</TableHead>
              <TableHead>{t('campaigns.created')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => {
              const statusCfg = STATUS_CONFIG[c.status] || STATUS_CONFIG.draft
              const StatusIcon = statusCfg.icon
              return (
                <TableRow
                  key={c.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/campaigns/${c.id}`)}
                >
                  <TableCell style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{c.name}</TableCell>
                  <TableCell>{c.client}</TableCell>
                  <TableCell>{c.goal}</TableCell>
                  <TableCell style={{ color: '#94a3b8', fontSize: 12 }}>{c.platform}</TableCell>
                  <TableCell><ScoreBadge score={c.score} /></TableCell>
                  <TableCell>
                    <Badge variant={statusCfg.variant} style={{ gap: 5 }}>
                      <StatusIcon size={10} />
                      {t(`campaigns.${c.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell style={{ color: '#94a3b8', fontSize: 12 }}>{c.created_at}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => { e.stopPropagation(); navigate(`/campaigns/${c.id}`) }}
                    >
                      <FileText size={13} />
                      {t('common.view')}
                      <ChevronRight size={12} />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: '#94a3b8' }}>
            <FileText size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <div style={{ fontSize: 14, fontWeight: 500 }}>No campaigns found</div>
          </div>
        )}
      </Card>
    </div>
  )
}
