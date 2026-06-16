import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import { Sparkles, Target, Building2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewCampaignPage() {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const { addCampaign, setActiveCampaign } = useAppStore()
  const [form, setForm] = useState({ name: '', client: '', goal: '', notes: '' })

  const CLIENTS = [
    'NatureBloom Co.',
    'TechForge India',
    'Velvet Rose Boutique',
    'FinEdge Startup',
    'GreenPath NGO',
    language === 'ta' ? '+ புதிய வாடிக்கையாளர்' : '+ New Client'
  ]

  const GOALS = [
    { value: 'Brand Awareness', label: t('newCampaign.goals.awareness') },
    { value: 'Lead Generation', label: t('newCampaign.goals.leads') },
    { value: 'Conversions', label: t('newCampaign.goals.conversions') },
    { value: 'Retention / Loyalty', label: t('newCampaign.goals.retention') },
    { value: 'Community Building', label: t('newCampaign.goals.community') },
  ]

  const handleCreate = () => {
    if (!form.name || !form.goal) {
      toast.error(language === 'ta' ? 'தேவையான புலங்களை நிரப்பவும்' : 'Please fill in required fields')
      return
    }
    const campaign = {
      id: 'camp-' + Date.now(),
      ...form,
      status: 'draft',
      score: null,
      created_at: new Date().toISOString().split('T')[0],
      platform: '',
    }
    addCampaign(campaign)
    setActiveCampaign(campaign)
    toast.success(language === 'ta' ? 'பிரச்சாரம் உருவாக்கப்பட்டது! உத்தி வடிவமைக்கப்படுகிறது…' : 'Campaign created! Generating strategy…')
    navigate(`/campaigns/${campaign.id}`)
  }

  return (
    <div style={{ padding: '32px 36px', maxWidth: 640 }}>
      <div style={{ marginBottom: 28 }}>
        <button className="btn-ghost" style={{ marginBottom: 20, fontSize: 13 }} onClick={() => navigate('/campaigns')}>
          {language === 'ta' ? '← பிரச்சாரங்களுக்குத் திரும்பு' : '← Back to Campaigns'}
        </button>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
          {language === 'ta' ? (
            <>புதிய <span className="gradient-text">பிரச்சாரம்</span></>
          ) : (
            <>New <span className="gradient-text">Campaign</span></>
          )}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          {t('newCampaign.subtitle')}
        </p>
      </div>

      <div className="glass-card-static" style={{ padding: 32 }}>
        <div style={{ marginBottom: 20 }}>
          <label className="input-label">{t('newCampaign.campaignName')} *</label>
          <input className="input-field" placeholder={t('newCampaign.campaignNamePlaceholder')} value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label className="input-label">{t('newCampaign.brand')} *</label>
          <select className="input-field" value={form.client}
            onChange={e => {
              if (e.target.value.includes('+ New Client') || e.target.value.includes('+ புதிய வாடிக்கையாளர்')) navigate('/onboarding')
              else setForm({ ...form, client: e.target.value })
            }}
            style={{ cursor: 'pointer' }}>
            <option value="">{language === 'ta' ? 'வாடிக்கையாளரைத் தேர்ந்தெடுக்கவும்…' : 'Select a client…'}</option>
            {CLIENTS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label className="input-label">{t('newCampaign.goal')} *</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {GOALS.map(g => (
              <button key={g.value} onClick={() => setForm({ ...form, goal: g.value })}
                style={{
                  padding: '10px 8px', borderRadius: 10, fontSize: 12, fontFamily: 'Inter',
                  border: `1px solid ${form.goal === g.value ? 'rgba(13,155,118,0.5)' : 'var(--border-subtle)'}`,
                  background: form.goal === g.value ? 'rgba(13,155,118,0.12)' : 'transparent',
                  color: form.goal === g.value ? 'var(--bloom-primary-light)' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.2s', fontWeight: form.goal === g.value ? 600 : 400,
                }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label className="input-label">{t('newCampaign.notes')}</label>
          <textarea className="input-field" rows={3} placeholder={t('newCampaign.notesPlaceholder')}
            value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
            style={{ resize: 'vertical' }} />
        </div>

        <button className="btn-primary" onClick={handleCreate} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
          <Sparkles size={16} />
          {t('newCampaign.generate')}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

