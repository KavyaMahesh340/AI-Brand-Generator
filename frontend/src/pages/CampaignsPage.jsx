import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import { Plus, Search, Filter, BarChart3, Zap, Clock, CheckCircle2, FileText } from 'lucide-react'

const DEMO_CAMPAIGNS = [
  { id: '1', name: 'Pongal Harvest Launch', client: 'NatureBloom Co.', status: 'active', score: 84, goal: 'Brand Awareness', created_at: '2024-01-10', platform: 'Instagram Reels' },
  { id: '2', name: 'Q1 LinkedIn Thought Leader', client: 'TechForge India', status: 'draft', score: 71, goal: 'Lead Generation', created_at: '2024-01-08', platform: 'LinkedIn' },
  { id: '3', name: "Valentine's Flash Sale", client: 'Velvet Rose Boutique', status: 'completed', score: 92, goal: 'Conversions', created_at: '2024-01-05', platform: 'Instagram + TikTok' },
  { id: '4', name: 'App Launch 2.0', client: 'FinEdge Startup', status: 'active', score: 78, goal: 'Product Launch', created_at: '2024-01-03', platform: 'LinkedIn + WhatsApp' },
  { id: '5', name: 'Sustainability Series', client: 'GreenPath NGO', status: 'draft', score: 65, goal: 'Community Building', created_at: '2024-01-01', platform: 'Instagram + TikTok' },
]

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

  const statusIcon = { active: Zap, draft: Clock, completed: CheckCircle2 }
  const statusColor = { active: '#10B981', draft: '#F59E0B', completed: '#3B82F6' }

  return (
    <div style={{ padding: '32px 36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{t('campaigns.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            {language === 'ta' ? (
              `${filtered.length} பிரச்சாரங்கள் கண்டறியப்பட்டன`
            ) : (
              `${filtered.length} campaign${filtered.length !== 1 ? 's' : ''} found`
            )}
          </p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/campaigns/new')}>
          <Plus size={16} /> {t('newCampaign.title')}
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="input-field"
            placeholder={t('campaigns.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 42 }}
          />
        </div>
        {['all', 'active', 'draft', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              border: `1px solid ${filter === f ? 'rgba(13,155,118,0.4)' : 'var(--border-subtle)'}`,
              background: filter === f ? 'rgba(13,155,118,0.12)' : 'transparent',
              color: filter === f ? 'var(--bloom-primary-light)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: filter === f ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >
            {t(`campaigns.${f}`)}
          </button>
        ))}
      </div>

      {/* Campaign table */}
      <div className="glass-card-static" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              {[
                t('campaigns.name'),
                t('campaigns.client'),
                t('campaigns.goal'),
                t('campaigns.platform'),
                t('detail.campaignIq'),
                t('campaigns.status'),
                t('campaigns.created'),
                ''
              ].map((h, index) => (
                <th key={index} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const StatusIcon = statusIcon[c.status]
              const sColor = statusColor[c.status]
              const scoreColor = c.score >= 80 ? '#10B981' : c.score >= 65 ? '#F59E0B' : '#EF4444'
              return (
                <tr
                  key={c.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    transition: 'background 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,155,118,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  onClick={() => navigate(`/campaigns/${c.id}`)}
                >
                  <td style={{ padding: '16px 20px', fontWeight: 600, fontSize: 14 }}>{c.name}</td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.client}</td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.goal}</td>
                  <td style={{ padding: '16px 20px', fontSize: 12, color: 'var(--text-muted)' }}>{c.platform}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ position: 'relative', width: 36, height: 36 }}>
                        <svg width="36" height="36" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke={scoreColor}
                            strokeWidth="3"
                            strokeDasharray={`${(c.score / 100) * 88} 88`}
                            strokeLinecap="round"
                            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
                        </svg>
                        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 9, fontWeight: 700, color: scoreColor }}>
                          {c.score}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, background: `${sColor}15`, border: `1px solid ${sColor}30`, fontSize: 11, fontWeight: 600, color: sColor }}>
                      <StatusIcon size={10} />
                      {t(`campaigns.${c.status}`)}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: 12, color: 'var(--text-muted)' }}>{c.created_at}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      className="btn-ghost"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={e => { e.stopPropagation(); navigate(`/campaigns/${c.id}`) }}
                    >
                      <FileText size={12} /> {t('common.view')}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

