import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import { Sparkles, ArrowRight, ChevronLeft, Target } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function NewCampaignPage() {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const { addCampaign, setActiveCampaign } = useAppStore()
  const [form, setForm] = useState({ name: '', client: '', goal: '', notes: '' })

  const CLIENTS = [
    'NatureBloom Co.', 'TechForge India', 'Velvet Rose Boutique', 'FinEdge Startup', 'GreenPath NGO',
    language === 'ta' ? '+ புதிய வாடிக்கையாளர்' : '+ New Client',
  ]

  const GOALS = [
    { value: 'Brand Awareness',     label: t('newCampaign.goals.awareness') },
    { value: 'Lead Generation',     label: t('newCampaign.goals.leads') },
    { value: 'Conversions',         label: t('newCampaign.goals.conversions') },
    { value: 'Retention / Loyalty', label: t('newCampaign.goals.retention') },
    { value: 'Community Building',  label: t('newCampaign.goals.community') },
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
    toast.success(language === 'ta' ? 'பிரச்சாரம் உருவாக்கப்பட்டது!' : 'Campaign created! Generating strategy…')
    navigate(`/campaigns/${campaign.id}`)
  }

  return (
    <div className="page-wrapper">
      {/* Back + header */}
      <div style={{ marginBottom: 24 }}>
        <Button
          variant="ghost"
          size="sm"
          style={{ marginBottom: 16 }}
          onClick={() => navigate('/campaigns')}
        >
          <ChevronLeft size={15} />
          {language === 'ta' ? 'பிரச்சாரங்களுக்குத் திரும்பு' : 'Back to Campaigns'}
        </Button>
        <h1 className="page-title" style={{ fontSize: 26, marginBottom: 6 }}>
          {language === 'ta' ? (
            <>புதிய <span className="gradient-text">பிரச்சாரம்</span></>
          ) : (
            <>New <span className="gradient-text">Campaign</span></>
          )}
        </h1>
        <p className="page-subtitle">{t('newCampaign.subtitle')}</p>
      </div>

      <Card>
        <CardContent style={{ padding: 28 }}>
          {/* Campaign name */}
          <div style={{ marginBottom: 20 }}>
            <Label htmlFor="camp-name" style={{ marginBottom: 6 }}>{t('newCampaign.campaignName')} *</Label>
            <Input
              id="camp-name"
              placeholder={t('newCampaign.campaignNamePlaceholder')}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Brand / client */}
          <div style={{ marginBottom: 20 }}>
            <Label htmlFor="camp-client" style={{ marginBottom: 6 }}>{t('newCampaign.brand')} *</Label>
            <select
              id="camp-client"
              className="input-field"
              value={form.client}
              onChange={e => {
                if (e.target.value.includes('+ New Client') || e.target.value.includes('+ புதிய வாடிக்கையாளர்')) navigate('/onboarding')
                else setForm({ ...form, client: e.target.value })
              }}
              style={{ cursor: 'pointer' }}
            >
              <option value="">{language === 'ta' ? 'வாடிக்கையாளரைத் தேர்ந்தெடுக்கவும்…' : 'Select a client…'}</option>
              {CLIENTS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Campaign goal */}
          <div style={{ marginBottom: 20 }}>
            <Label style={{ marginBottom: 10, display: 'block' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Target size={13} color="#0d9488" />
                {t('newCampaign.goal')} *
              </span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {GOALS.map(g => (
                <button
                  key={g.value}
                  id={`goal-${g.value.replace(/\s+/g, '-')}`}
                  onClick={() => setForm({ ...form, goal: g.value })}
                  style={{
                    padding: '10px 12px', borderRadius: 10, fontSize: 13, fontFamily: 'Inter',
                    border: `2px solid ${form.goal === g.value ? '#0d9488' : '#e2e8f0'}`,
                    background: form.goal === g.value ? '#f0fdfa' : '#ffffff',
                    color: form.goal === g.value ? '#0d9488' : '#64748b',
                    cursor: 'pointer', transition: 'all 0.15s',
                    fontWeight: form.goal === g.value ? 600 : 400,
                    textAlign: 'left',
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 28 }}>
            <Label htmlFor="camp-notes" style={{ marginBottom: 6 }}>{t('newCampaign.notes')}</Label>
            <textarea
              id="camp-notes"
              className="input-field"
              rows={3}
              placeholder={t('newCampaign.notesPlaceholder')}
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              style={{ resize: 'vertical', fontFamily: 'Inter' }}
            />
          </div>

          <Button
            id="create-campaign-btn"
            onClick={handleCreate}
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
          >
            <Sparkles size={15} />
            {t('newCampaign.generate')}
            <ArrowRight size={15} />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
