import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import {
  ChevronRight, ChevronLeft, Check, Sparkles, Building2, Globe,
  Target, DollarSign, Mic, Brain, AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { mockBrandDna, MOCK_DELAY } from '../lib/mockData'

const INDUSTRIES = ['Fashion & Retail', 'Food & Beverage', 'Technology', 'Healthcare', 'Education', 'Real Estate', 'Finance', 'Beauty & Wellness', 'Travel', 'Other']

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const { setActiveClient, addClient } = useAppStore()
  const [step, setStep] = useState(1)
  const [extracting, setExtracting] = useState(false)
  const [dna, setDna] = useState(null)

  const [form, setForm] = useState({
    brand_name: '',
    industry: '',
    geography: '',
    budget_tier: '',
    goal: '',
    brand_voice: '',
    tone_archetype: '',
    competitors: ['', '', ''],
    brand_description: '',
  })

  const STEPS = [
    { id: 1, title: language === 'ta' ? 'பிராண்ட் அடிப்படைகள்' : 'Brand Basics', icon: Building2, desc: language === 'ta' ? 'பிராண்ட் பற்றி கூறவும்' : 'Tell us about the brand' },
    { id: 2, title: language === 'ta' ? 'பிரச்சார நோக்கம்' : 'Campaign Goal', icon: Target, desc: language === 'ta' ? 'நாம் என்ன சாதிக்க முயற்சிக்கிறோம்?' : 'What are we trying to achieve?' },
    { id: 3, title: language === 'ta' ? 'பிராண்ட் குரல்' : 'Brand Voice', icon: Mic, desc: language === 'ta' ? 'பிராண்ட் எவ்வாறு பேசுகிறது?' : 'How does the brand speak?' },
    { id: 4, title: language === 'ta' ? 'போட்டியாளர்கள்' : 'Competitors', icon: AlertCircle, desc: language === 'ta' ? 'நாம் யாருக்கு எதிராக இருக்கிறோம்?' : 'Who are we up against?' },
    { id: 5, title: language === 'ta' ? 'டிஎன்ஏ பிரித்தல்' : 'DNA Extraction', icon: Brain, desc: language === 'ta' ? 'AI உங்கள் பிராண்டை அடையாளம் காணும்' : 'AI fingerprints your brand' },
  ]

  const VOICE_OPTIONS = [
    { value: 'Humorous', emoji: '😄', desc: language === 'ta' ? 'இலகுவான, வேடிக்கையான' : 'Light, fun, relatable' },
    { value: 'Professional', emoji: '💼', desc: language === 'ta' ? 'தொழில்முறை, நம்பகமான' : 'Polished, expert, credible' },
    { value: 'Bold', emoji: '⚡', desc: language === 'ta' ? 'தைரியமான, நேரடியான' : 'Direct, confident, strong' },
    { value: 'Empathetic', emoji: '💛', desc: language === 'ta' ? 'அன்பான, மனிதநேயமிக்க' : 'Warm, caring, human' },
    { value: 'Provocative', emoji: '🔥', desc: language === 'ta' ? 'சவாலான, துணிச்சலான' : 'Edgy, disruptive, unconventional' },
  ]

  const ARCHETYPES = [
    { value: 'Rebel', color: '#EF4444', desc: language === 'ta' ? 'சவால்களை எதிர்கொள்பவர்' : 'Challenges the status quo' },
    { value: 'Caregiver', color: '#10B981', desc: language === 'ta' ? 'அரவணைப்பவர்' : 'Nurtures and protects' },
    { value: 'Sage', color: '#3B82F6', desc: language === 'ta' ? 'அறிவுரை கூறுபவர்' : 'Shares wisdom and insight' },
    { value: 'Jester', color: '#F59E0B', desc: language === 'ta' ? 'மகிழ்ச்சி தருபவர்' : 'Brings joy and laughter' },
    { value: 'Hero', color: '#12B485', desc: language === 'ta' ? 'துணிச்சலுடன் வெல்பவர்' : 'Masters challenges courageously' },
  ]

  const GOALS = [
    { value: 'Brand Awareness', label: t('newCampaign.goals.awareness') },
    { value: 'Lead Generation', label: t('newCampaign.goals.leads') },
    { value: 'Conversions', label: t('newCampaign.goals.conversions') },
    { value: 'Retention / Loyalty', label: t('newCampaign.goals.retention') },
    { value: 'Community Building', label: t('newCampaign.goals.community') },
  ]

  const BUDGET_TIERS = [
    language === 'ta' ? 'தொடக்க நிலை (< ₹50K)' : 'Starter (< ₹50K)',
    language === 'ta' ? 'வளர்ச்சி நிலை (₹50K–2L)' : 'Growth (₹50K–2L)',
    language === 'ta' ? 'அளவிடுதல் நிலை (₹2L–10L)' : 'Scale (₹2L–10L)',
    language === 'ta' ? 'நிறுவன நிலை (₹10L+)' : 'Enterprise (₹10L+)'
  ]

  const updateForm = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const updateCompetitor = (i, val) =>
    setForm((f) => {
      const c = [...f.competitors]; c[i] = val; return { ...f, competitors: c }
    })

  const canAdvance = () => {
    if (step === 1) return form.brand_name && form.industry && form.geography
    if (step === 2) return form.goal && form.budget_tier
    if (step === 3) return form.brand_voice && form.tone_archetype
    if (step === 4) return true
    return true
  }

  const handleExtract = async () => {
    setExtracting(true)
    await MOCK_DELAY(3000)
    const extracted = mockBrandDna(form)
    setDna(extracted)
    setExtracting(false)
  }

  const handleFinish = async () => {
    const newClient = {
      id: 'client-' + Date.now(),
      brand_name: form.brand_name,
      industry: form.industry,
      geography: form.geography,
      brand_dna: dna || mockBrandDna(form),
      brand_voice: form.brand_voice,
      goal: form.goal,
      created_at: new Date().toISOString(),
    }
    addClient(newClient)
    setActiveClient(newClient)
    toast.success(language === 'ta' ? `${form.brand_name}-க்கான பிராண்ட் டிஎன்ஏ சேமிக்கப்பட்டது!` : `Brand DNA for ${form.brand_name} saved!`)
    navigate('/campaigns/new')
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 36px', maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <span className="badge badge-purple" style={{ marginBottom: 12, display: 'inline-flex' }}>
          {language === 'ta' ? 'பிராண்ட் டிஎன்ஏ வழிகாட்டி' : 'Brand DNA Wizard'}
        </span>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          {language === 'ta' ? (
            <>உங்கள் பிராண்டின் <span className="gradient-text">கைரேகையைப்</span> பதிப்போம்</>
          ) : (
            <>Let's fingerprint your <span className="gradient-text">brand</span></>
          )}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          {language === 'ta' ? 'இந்தக் கட்டத்திலிருந்து ஒவ்வொரு வெளியீடும் உங்கள் தனித்துவமான பிராண்ட் டிஎன்ஏ மூலம் வடிகட்டப்படும்' : 'Every output from this point is filtered through your unique Brand DNA'}
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 40 }}>
        {STEPS.map((s, i) => {
          const done = step > s.id
          const active = step === s.id
          const Icon = s.icon
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div
                  className={`step-dot ${done ? 'step-dot-done' : active ? 'step-dot-active' : 'step-dot-pending'}`}
                  style={{ margin: '0 auto 6px' }}
                >
                  {done ? <Check size={14} /> : active ? <Icon size={14} /> : <span>{s.id}</span>}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: active ? 'var(--bloom-primary-light)' : done ? '#10B981' : 'var(--text-muted)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.title}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 60,
                    height: 1,
                    background: step > s.id ? '#10B981' : 'var(--border-subtle)',
                    margin: '0 8px',
                    marginBottom: 20,
                    transition: 'background 0.3s',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <div className="glass-card-static animate-scaleIn" style={{ padding: '36px 40px' }}>

        {/* Step 1: Brand Basics */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 6 }}>{language === 'ta' ? 'பிராண்ட் அடிப்படைகள்' : 'Brand Basics'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14 }}>
              {language === 'ta' ? 'அடிப்படை விவரங்களுடன் தொடங்குங்கள் — இடம், வகை மற்றும் அடையாளம்.' : 'Start with the fundamentals — location, category, and identity.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label className="input-label">{t('newCampaign.brand')} *</label>
                <input className="input-field" placeholder="e.g. NatureBloom Co." value={form.brand_name}
                  onChange={(e) => updateForm('brand_name', e.target.value)} />
              </div>
              <div>
                <label className="input-label">{t('newCampaign.industry')} *</label>
                <select className="input-field" value={form.industry}
                  onChange={(e) => updateForm('industry', e.target.value)}
                  style={{ cursor: 'pointer' }}>
                  <option value="">{language === 'ta' ? 'தொழில்துறையைத் தேர்ந்தெடுக்கவும்…' : 'Select industry…'}</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="input-label">{t('newCampaign.geography')} *</label>
              <input className="input-field" placeholder={t('newCampaign.geographyPlaceholder')} value={form.geography}
                onChange={(e) => updateForm('geography', e.target.value)} />
            </div>
            <div>
              <label className="input-label">{language === 'ta' ? 'பிராண்ட் விளக்கம்' : 'Brand Description'}</label>
              <textarea className="input-field" rows={3}
                placeholder={language === 'ta' ? 'உங்கள் பிராண்டின் முக்கிய செயல்பாடுகள் மற்றும் தனித்துவங்களை விளக்குங்கள்…' : 'Briefly describe what the brand does, who it serves, and what makes it different…'}
                value={form.brand_description}
                onChange={(e) => updateForm('brand_description', e.target.value)}
                style={{ resize: 'vertical' }} />
            </div>
          </div>
        )}

        {/* Step 2: Campaign Goal */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 6 }}>{t('newCampaign.goal')}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14 }}>
              {language === 'ta' ? 'இந்தப் பிரச்சாரத்தின் மூலம் நாம் என்ன சாதிக்க வேண்டும்?' : 'What outcome must this campaign drive?'}
            </p>
            <div style={{ marginBottom: 24 }}>
              <label className="input-label">{language === 'ta' ? 'முதன்மை நோக்கம்' : 'Primary Goal'} *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {GOALS.map(g => (
                  <button
                    key={g.value}
                    onClick={() => updateForm('goal', g.value)}
                    style={{
                      padding: '12px',
                      borderRadius: 10,
                      border: `1px solid ${form.goal === g.value ? 'rgba(13,155,118,0.5)' : 'var(--border-subtle)'}`,
                      background: form.goal === g.value ? 'rgba(13,155,118,0.15)' : 'transparent',
                      color: form.goal === g.value ? 'var(--bloom-primary-light)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 13,
                      fontWeight: form.goal === g.value ? 600 : 400,
                      transition: 'all 0.2s',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="input-label">{language === 'ta' ? 'வரவுசெலவுத் திட்டம்' : 'Budget Tier'} *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {BUDGET_TIERS.map(b => (
                  <button
                    key={b}
                    onClick={() => updateForm('budget_tier', b)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: `1px solid ${form.budget_tier === b ? 'rgba(245,158,11,0.5)' : 'var(--border-subtle)'}`,
                      background: form.budget_tier === b ? 'rgba(245,158,11,0.1)' : 'transparent',
                      color: form.budget_tier === b ? '#FCD34D' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 13,
                      fontWeight: form.budget_tier === b ? 600 : 400,
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    <DollarSign size={12} style={{ display: 'inline', marginRight: 6 }} />
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Brand Voice */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 6 }}>{language === 'ta' ? 'பிராண்ட் குரல் & வடிவம்' : 'Brand Voice & Archetype'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14 }}>
              {language === 'ta' ? 'ஒவ்வொரு AI பிரச்சார உள்ளடக்கமும் இந்த வடிகட்டி மூலம் உருவாக்கப்படும்.' : 'This becomes the filter for every piece of AI-generated content.'}
            </p>
            <div style={{ marginBottom: 28 }}>
              <label className="input-label">{t('newCampaign.brandVoice')} *</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {VOICE_OPTIONS.map(v => (
                  <button
                    key={v.value}
                    onClick={() => updateForm('brand_voice', v.value)}
                    style={{
                      flex: 1,
                      minWidth: 140,
                      padding: '16px 12px',
                      borderRadius: 12,
                      border: `1px solid ${form.brand_voice === v.value ? 'rgba(13,155,118,0.5)' : 'var(--border-subtle)'}`,
                      background: form.brand_voice === v.value ? 'rgba(13,155,118,0.12)' : 'rgba(255,255,255,0.02)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{v.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                      {language === 'ta' ? (
                        v.value === 'Humorous' ? 'நகைச்சுவை' :
                        v.value === 'Professional' ? 'தொழில்முறை' :
                        v.value === 'Bold' ? 'தைரியமான' :
                        v.value === 'Empathetic' ? 'அன்பான' : 'சவாலான'
                      ) : v.value}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="input-label">{t('brandDna.toneArchetype')} *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                {ARCHETYPES.map(a => (
                  <button
                    key={a.value}
                    onClick={() => updateForm('tone_archetype', a.value)}
                    style={{
                      padding: '14px 8px',
                      borderRadius: 10,
                      border: `1px solid ${form.tone_archetype === a.value ? a.color + '60' : 'var(--border-subtle)'}`,
                      background: form.tone_archetype === a.value ? a.color + '15' : 'transparent',
                      color: form.tone_archetype === a.value ? a.color : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      fontWeight: form.tone_archetype === a.value ? 700 : 400,
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                      {language === 'ta' ? (
                        a.value === 'Rebel' ? 'கிளர்ச்சியாளர்' :
                        a.value === 'Caregiver' ? 'அரவணைப்பாளர்' :
                        a.value === 'Sage' ? 'அறிஞர்' :
                        a.value === 'Jester' ? 'கோமாளி' : 'வீரர்'
                      ) : a.value}
                    </div>
                    <div style={{ fontSize: 10, lineHeight: 1.3 }}>{a.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Competitors */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 6 }}>{language === 'ta' ? 'போட்டியாளர்கள் விவரங்கள்' : 'Competitor Input'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14 }}>
              {language === 'ta' ? '2-3 போட்டியாளர்களைச் சேர்க்கவும். அவர்கள் விடுத்த இடைவெளிகளை AI கண்டறியும்.' : "Add 2-3 competitors. The AI will detect what they're NOT saying — your narrative white space."}
            </p>
            {form.competitors.map((c, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <label className="input-label">{language === 'ta' ? `போட்டியாளர் ${i + 1}` : `Competitor ${i + 1}`} {i > 0 ? (language === 'ta' ? '(விருப்பத்திற்குரியது)' : '(optional)') : '*'}</label>
                <input
                  className="input-field"
                  placeholder={`e.g. @competitor${i + 1} or https://competitor.com`}
                  value={c}
                  onChange={(e) => updateCompetitor(i, e.target.value)}
                />
              </div>
            ))}
            <div
              style={{
                marginTop: 20,
                padding: '14px 16px',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 10,
                fontSize: 13,
                color: '#93C5FD',
              }}
            >
              💡 {language === 'ta' ? 'போட்டியாளர்கள் கூறாத ஆனால் நுகர்வோர் கேட்க விரும்பும் 3 முக்கிய இடைவெளிகளை AI கண்டறியும்.' : 'The AI will analyse public messaging patterns and surface 3 narrative gaps — things your competitors are not saying that your audience secretly wants to hear.'}
            </div>
          </div>
        )}

        {/* Step 5: DNA Extraction */}
        {step === 5 && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(13,155,118,0.2), rgba(167,139,250,0.1))',
                border: '2px solid rgba(13,155,118,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                animation: extracting ? 'pulse-glow 1.5s infinite' : 'none',
              }}
            >
              <Brain size={32} color="#40C29A" />
            </div>

            {!dna && !extracting && (
              <>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>{language === 'ta' ? 'டிஎன்ஏ பிரித்தெடுக்கத் தயார்' : 'Ready to Extract Brand DNA'}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14, maxWidth: 440, margin: '0 auto 28px' }}>
                  {language === 'ta' ? 'பிராண்டின் 5 முக்கிய டிஎன்ஏ கூறுகளை AI கண்டறியும். இது உங்கள் எதிர்கால பிரச்சார உத்திகளில் பயன்படுத்தப்படும்.' : "The AI will analyse everything you've told us and extract your brand's 5 core DNA attributes. This fingerprint will be prepended to every strategy we generate."}
                </p>
                <button className="btn-primary" onClick={handleExtract} style={{ padding: '14px 32px' }}>
                  <Sparkles size={16} />
                  {t('brandDna.reExtract')}
                </button>
              </>
            )}

            {extracting && (
              <div>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>{language === 'ta' ? 'பிராண்ட் பகுப்பாய்வு செய்யப்படுகிறது…' : 'Analysing Brand…'}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                  Running Llama 3 8B extraction chain
                </p>
                {(language === 'ta' ? [
                  'பிராண்ட் விவரங்களைப் படிக்கிறது…',
                  'குரல் வடிவத்தை அடையாளம் காண்கிறது…',
                  'போட்டியாளர்களை வரைபடமிடுகிறது…',
                  'மைய விருப்பத்தைப் பிரிக்கிறது…',
                  'குரல் கையொப்பத்தை உருவாக்குகிறது…'
                ] : [
                  'Reading brand description…',
                  'Identifying tone archetype…',
                  'Mapping competitor landscape…',
                  'Extracting core aspiration…',
                  'Generating voice signature…'
                ]).map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(167,139,250,0.3)" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#40C29A" strokeWidth="3" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                      </path>
                    </svg>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s}</span>
                  </div>
                ))}
              </div>
            )}

            {dna && (
              <div className="animate-fadeInUp" style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: 20, marginBottom: 4, textAlign: 'center' }}>
                  <span className="gradient-text">{language === 'ta' ? 'பிராண்ட் டிஎன்ஏ பிரிக்கப்பட்டது ✓' : 'Brand DNA Extracted ✓'}</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 24, fontSize: 14 }}>
                  {language === 'ta' ? '5 கைரேகை கூறுகள் வெற்றிகரமாகச் சேமிக்கப்பட்டன' : '5 fingerprint attributes stored and ready to power your campaigns'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { key: t('brandDna.toneArchetype'), val: dna.tone_archetype, color: '#12B485' },
                    { key: t('brandDna.colourEmotion'), val: dna.colour_emotion, color: '#F59E0B' },
                    { key: t('brandDna.narrativeGap'), val: dna.competitor_narrative_gap, color: '#3B82F6' },
                    { key: t('brandDna.coreAspiration'), val: dna.customer_core_aspiration, color: '#10B981' },
                    { key: t('brandDna.voiceSignature'), val: dna.brand_voice_signature.join(' · '), color: '#EC4899' },
                  ].map(attr => (
                    <div key={attr.key} style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      background: `${attr.color}08`,
                      border: `1px solid ${attr.color}25`,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: attr.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                        {attr.key}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>{attr.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36 }}>
          <button
            className="btn-ghost"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            style={{ opacity: step === 1 ? 0.3 : 1 }}
          >
            <ChevronLeft size={16} />
            {t('common.back')}
          </button>

          {step < 5 && (
            <button
              className="btn-primary"
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              style={{ opacity: canAdvance() ? 1 : 0.4 }}
            >
              {language === 'ta' ? 'தொடர்க' : 'Continue'}
              <ChevronRight size={16} />
            </button>
          )}

          {step === 5 && dna && (
            <button className="btn-primary" onClick={handleFinish} style={{ padding: '12px 28px' }}>
              <Check size={16} />
              {language === 'ta' ? 'பிரச்சாரத்தைத் தொடங்கு' : 'Start Campaign'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

