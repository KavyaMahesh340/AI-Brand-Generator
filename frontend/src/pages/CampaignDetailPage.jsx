import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Sparkles, RefreshCw, ChevronDown, ChevronUp, Copy,
  BarChart3, AlertTriangle,
  Brain, Users, Target, Globe, Zap, Download, Check,
  ArrowLeftRight, Shield
} from 'lucide-react'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'
import {
  mockPersonas, mockBlindSpots, mockCulturalMoments,
  mockEmotionOutcome, mockPlatformTranslation, mockRiskRadar,
  mockHealthScore, MOCK_DELAY
} from '../lib/mockData'

const PLATFORM_COLORS = {
  LinkedIn: '#0A66C2',
  Instagram: '#E1306C',
  TikTok: '#69C9D0',
  WhatsApp: '#25D366',
}

const PLATFORM_ICONS = { LinkedIn: '💼', Instagram: '📸', TikTok: '🎵', WhatsApp: '💬' }

function PipelineLoader({ steps, currentStep, done, t }) {
  return (
    <div className="glass-card-static" style={{ padding: 32, maxWidth: 520, margin: '40px auto', textAlign: 'center' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(13,155,118,0.2),rgba(167,139,250,0.1))', border: '2px solid rgba(13,155,118,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Sparkles size={24} color="#40C29A" style={{ animation: 'pulse-glow 1.5s infinite' }} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{t('pipeline.title')}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          {t('pipeline.subtitle')}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
        {steps.map((s, i) => {
          const Icon = s.icon
          const isDone = i < currentStep
          const isActive = i === currentStep && !done
          const stepLabel = t(`pipeline.step${s.id}`)
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 10, background: isDone ? 'rgba(16,185,129,0.08)' : isActive ? 'rgba(13,155,118,0.08)' : 'transparent', border: `1px solid ${isDone ? 'rgba(16,185,129,0.2)' : isActive ? 'rgba(13,155,118,0.2)' : 'transparent'}`, transition: 'all 0.3s' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: isDone ? 'rgba(16,185,129,0.15)' : isActive ? 'rgba(13,155,118,0.15)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {isDone ? <Check size={14} color="#10B981" /> : <Icon size={14} color={isActive ? '#40C29A' : 'var(--text-muted)'} />}
              </div>
              <span style={{ fontSize: 13, color: isDone ? '#34D399' : isActive ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: isDone || isActive ? 500 : 400 }}>
                {stepLabel}… {isDone ? '✓' : ''}
              </span>
              {isActive && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" stroke="rgba(167,139,250,0.3)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#40C29A" strokeWidth="3" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                  </path>
                </svg>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SectionCard({ title, icon: Icon, children, onRegenerate, badge, t, language }) {
  const [expanded, setExpanded] = useState(true)
  const [regen, setRegen] = useState(false)
  const handleRegen = async () => {
    setRegen(true)
    await MOCK_DELAY(2000)
    setRegen(false)
    onRegenerate?.()
    toast.success(language === 'ta' ? 'உத்தி வெற்றிகரமாக மீண்டும் உருவாக்கப்பட்டது!' : 'Section regenerated!')
  }
  return (
    <div className="glass-card-static" style={{ marginBottom: 20, overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px', borderBottom: expanded ? '1px solid var(--border-subtle)' : 'none', cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(13,155,118,0.12)', border: '1px solid rgba(13,155,118,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={16} color="#40C29A" />
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, flex: 1 }}>{title}</h3>
        {badge && <span className="badge badge-purple">{badge}</span>}
        <button
          className="btn-ghost"
          style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={e => { e.stopPropagation(); handleRegen() }}
          disabled={regen}
        >
          {regen ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(167,139,250,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#40C29A" strokeWidth="3" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></path></svg> : <RefreshCw size={12} />}
          {t('detail.regenerate')}
        </button>
        {expanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
      </div>
      {expanded && <div style={{ padding: '20px 24px' }}>{children}</div>}
    </div>
  )
}

export default function CampaignDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const { t } = useTranslation()
  const [generating, setGenerating] = useState(true)
  const [pipelineStep, setPipelineStep] = useState(0)
  const [data, setData] = useState(null)
  const [activePlatform, setActivePlatform] = useState('LinkedIn')
  const [showDiff, setShowDiff] = useState({})
  const [diffContent] = useState({ old: 'Original platform strategy focused on broad awareness metrics and monthly posting schedule.', new: null })
  const exportRef = useRef()

  const PIPELINE_STEPS = [
    { id: 0, label: t('pipeline.step0'), icon: Brain },
    { id: 1, label: t('pipeline.step1'), icon: Users },
    { id: 2, label: t('pipeline.step2'), icon: Target },
    { id: 3, label: t('pipeline.step3'), icon: Globe },
  ]

  useEffect(() => {
    const run = async () => {
      for (let i = 0; i < 4; i++) {
        setPipelineStep(i)
        await MOCK_DELAY(1800)
      }
      const personas = mockPersonas('brand awareness')
      const demoIdea = 'Own your transformation — not just the product'
      setData({
        personas,
        blindSpots: mockBlindSpots(['@competitor1', '@competitor2']),
        culturalMoments: mockCulturalMoments('Chennai, Tamil Nadu', 'January'),
        emotionOutcome: mockEmotionOutcome(),
        platformTranslation: mockPlatformTranslation(demoIdea),
        riskRadar: mockRiskRadar(),
        healthScore: mockHealthScore({}),
      })
      setGenerating(false)
    }
    run()
  }, [id])

  if (generating) {
    return (
      <div style={{ padding: '32px 36px' }}>
        <PipelineLoader steps={PIPELINE_STEPS} currentStep={pipelineStep} done={false} t={t} />
      </div>
    )
  }

  const { personas, blindSpots, culturalMoments, emotionOutcome, platformTranslation, riskRadar, healthScore } = data
  const platforms = Object.values(platformTranslation)
  const currentPlatform = platformTranslation[activePlatform]
  const score = healthScore.overall

  const mappedGantt = [
    { label: language === 'ta' ? 'போட்டியாளர் இடைவெளி உள்ளடக்கங்கள்' : 'Blind Spot Content', start: 0, span: 2, color: '#12B485', platform: 'Instagram' },
    { label: language === 'ta' ? 'பொங்கல் கவுண்ட்டவுன்' : 'Pongal Countdown', start: 1, span: 1.5, color: '#F59E0B', platform: 'All' },
    { label: language === 'ta' ? 'தமிழ் மொழிப் பதிவுகள்' : 'Tamil Language Posts', start: 0.5, span: 3, color: '#10B981', platform: 'Instagram' },
    { label: language === 'ta' ? 'சிந்தனை தலைமைத்துவம்' : 'Thought Leadership', start: 2, span: 2, color: '#3B82F6', platform: 'LinkedIn' },
    { label: language === 'ta' ? 'வாட்ஸ்அப் ஒளிபரப்பு' : 'WhatsApp Broadcast', start: 2.5, span: 1.5, color: '#25D366', platform: 'WhatsApp' },
  ]

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <button className="btn-ghost" style={{ marginBottom: 14, fontSize: 13 }} onClick={() => navigate('/campaigns')}>
            {t('detail.back')}
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Pongal Harvest Launch</h1>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="badge badge-green">NatureBloom Co.</span>
            <span className="badge badge-purple">{t('newCampaign.goals.awareness')}</span>
            <span className="badge badge-amber">{language === 'ta' ? 'ஜனவரி 2024' : 'Jan 2024'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* CampaignIQ Score */}
          <div style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: '#34D399', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('detail.campaignIq')}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#10B981', fontFamily: 'Space Grotesk', lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>/100</div>
          </div>
          <button className="btn-secondary" onClick={() => navigate('/export')}>
            <Download size={14} /> {t('detail.exportPdf')}
          </button>
        </div>
      </div>

      {/* CampaignIQ sub scores */}
      <div className="glass-card-static" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>{t('detail.healthScore')}</h2>
          <span className="badge badge-green" style={{ fontSize: 14, padding: '6px 16px' }}>
            <BarChart3 size={12} /> {score}/100 · {language === 'ta' ? t('common.good') : 'Good'}
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
          {language === 'ta' ? 'இந்த பிரச்சார உத்தி பார்வையாளர் சுயவிவரத்திற்கு மிகச் சிறந்த முறையில் பொருந்துகிறது. கலாச்சார ரீதியான ஈடுபாடு வலுவாக உள்ளது.' : healthScore.rationale}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {Object.entries(healthScore.sub_scores).map(([key, val]) => {
            const pct = val.score
            const color = pct >= 85 ? '#10B981' : pct >= 70 ? '#3B82F6' : '#F59E0B'
            const label = key === 'persona_platform_fit' ? (language === 'ta' ? 'நபரிடை-தளப் பொருத்தம்' : 'Persona-Platform Fit') :
                          key === 'message_clarity' ? (language === 'ta' ? 'செய்தி தெளிவு' : 'Message Clarity') :
                          key === 'timing_alignment' ? (language === 'ta' ? 'நேர சீரமைப்பு' : 'Timing Alignment') :
                          (language === 'ta' ? 'ஆபத்துக் குறியீடு' : 'Risk Index')
            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color }}>{pct}</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)` }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  {language === 'ta' ? 'மதிப்பீடு சிறப்பானது' : val.note}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Audience Personas */}
      <SectionCard title={t('detail.personas')} icon={Users} badge={t('detail.personasCount')} t={t} language={language}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {personas.map(p => (
            <div key={p.id} style={{ padding: '20px', borderRadius: 14, background: `${p.color}08`, border: `1px solid ${p.color}25` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${p.color}20`, border: `2px solid ${p.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {p.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.age} · {p.location}</div>
                </div>
              </div>
              {[
                { label: `🌅 ${t('personas.morningState')}`, val: p.morning_state },
                { label: `😰 ${t('personas.biggestFear')}`, val: p.fear },
                { label: `💬 ${t('personas.theirLanguage')}`, val: p.language_phrases.join(', ') },
                { label: `🎯 ${t('personas.jtbd')}`, val: p.jobs_to_be_done },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: p.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{row.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{row.val}</div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: '8px', background: `${p.color}10`, borderRadius: 8, fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                "{p.jobs_to_be_done}"
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Competitor Blind Spots */}
      <SectionCard title={t('detail.blindSpots')} icon={Target} badge={t('detail.gapsFound')} t={t} language={language}>
        <div style={{ marginBottom: 12, padding: '10px 14px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, fontSize: 13, color: '#93C5FD' }}>
          {t('detail.blindSpotsNote')}
        </div>
        {blindSpots.map((bs, i) => (
          <div key={i} style={{ padding: '18px', borderRadius: 12, border: '1px solid var(--border-subtle)', marginBottom: 12, background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(13,155,118,0.15)', border: '1px solid rgba(13,155,118,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#40C29A', flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{bs.gap}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.6 }}>{bs.insight}</div>
                <div style={{ padding: '10px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>💡 {t('detail.opportunity')}</div>
                  <div style={{ fontSize: 12, color: '#34D399', lineHeight: 1.5 }}>{bs.opportunity}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Cultural Moment Mapper */}
      <SectionCard title={t('detail.cultural')} icon={Globe} badge={t('detail.geoAware')} t={t} language={language}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ padding: '16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{t('detail.primaryMoment')}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{culturalMoments.primary_moment}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{culturalMoments.timing_advice}</div>
            </div>
            <div style={{ padding: '12px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, fontSize: 13, color: '#34D399', lineHeight: 1.5 }}>
              🌐 {culturalMoments.language_tip}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{t('detail.upcomingMoments')}</div>
            {culturalMoments.moments.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < culturalMoments.moments.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.relevance === 'high' ? '#10B981' : m.relevance === 'medium' ? '#F59E0B' : '#EF4444', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· {m.date}</span></div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.note}</div>
                </div>
                <span className={`badge ${m.relevance === 'high' ? 'badge-green' : m.relevance === 'medium' ? 'badge-amber' : 'badge-red'}`} style={{ fontSize: 10 }}>
                  {language === 'ta' ? (m.relevance === 'high' ? 'அதிகம்' : 'நடுத்தரம்') : m.relevance}
                </span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{t('detail.microTrends')}</div>
              {culturalMoments.micro_trends.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <span style={{ color: '#40C29A', flexShrink: 0 }}>→</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Emotion-Outcome Chain */}
      <SectionCard title={t('detail.emotion')} icon={Zap} badge={t('detail.aiChained')} t={t} language={language}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { step: '1', q: t('detail.targetEmotion'), a: emotionOutcome.target_emotion, color: '#12B485' },
            { step: '2', q: t('detail.bestFormat'), a: emotionOutcome.content_format, color: '#F59E0B' },
            { step: '3', q: t('detail.platformRec'), a: emotionOutcome.platform_recommendation, color: '#10B981' },
          ].map(item => (
            <div key={item.step} style={{ padding: '18px', borderRadius: 12, background: `${item.color}08`, border: `1px solid ${item.color}25` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{language === 'ta' ? `படி` : `Step`} {item.step} → {item.q}</div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{item.a}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(13,155,118,0.08)', border: '1px solid rgba(13,155,118,0.2)', borderRadius: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#40C29A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{t('detail.hookFormula')}</div>
          <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{emotionOutcome.hook_formula}</div>
        </div>
        <div style={{ marginTop: 10, padding: '10px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{t('detail.suggestedCta')}</div>
          <div style={{ fontSize: 13, color: '#34D399', fontStyle: 'italic' }}>"{emotionOutcome.cta}"</div>
        </div>
      </SectionCard>

      {/* Platform Tone Translator */}
      <SectionCard title={t('detail.platform')} icon={Globe} badge={t('detail.platforms4')} t={t} language={language}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {Object.keys(platformTranslation).map(p => {
            const color = PLATFORM_COLORS[p]
            return (
              <button key={p} onClick={() => setActivePlatform(p)}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontFamily: 'Inter', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  border: `1px solid ${activePlatform === p ? color + '60' : 'var(--border-subtle)'}`,
                  background: activePlatform === p ? color + '15' : 'transparent',
                  color: activePlatform === p ? color : 'var(--text-secondary)',
                }}>
                {PLATFORM_ICONS[p]} {p}
              </button>
            )
          })}
        </div>
        {currentPlatform && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {currentPlatform.tone} · {currentPlatform.platform}
                </span>
                <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}
                  onClick={() => { navigator.clipboard.writeText(currentPlatform.content); toast.success(t('detail.copied')) }}>
                  <Copy size={11} /> {t('detail.copy')}
                </button>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 10, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: activePlatform === 'TikTok' ? 'Space Grotesk, sans-serif' : 'Inter, sans-serif' }}>
                {currentPlatform.content}
              </div>
              {currentPlatform.hashtags?.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {currentPlatform.hashtags.map(h => (
                    <span key={h} style={{ fontSize: 11, color: PLATFORM_COLORS[activePlatform], padding: '2px 8px', background: PLATFORM_COLORS[activePlatform] + '15', borderRadius: 12 }}>{h}</span>
                  ))}
                </div>
              )}
            </div>
            <div>
              {/* Diff view toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('detail.diffView')}</span>
                <button
                  className="btn-ghost"
                  style={{ padding: '4px 10px', fontSize: 11 }}
                  onClick={() => setShowDiff(d => ({ ...d, [activePlatform]: !d[activePlatform] }))}
                >
                  <ArrowLeftRight size={11} />
                  {showDiff[activePlatform] ? t('detail.hideDiff') : t('detail.showDiff')}
                </button>
              </div>
              {showDiff[activePlatform] ? (
                <div>
                  <div className="diff-old" style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#F87171', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('detail.prevVersion')}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{diffContent.old}</div>
                  </div>
                  <div className="diff-new">
                    <div style={{ fontSize: 10, color: '#34D399', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('detail.currentVersion')}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.6 }}>{currentPlatform.content.substring(0, 160)}…</div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-subtle)', borderRadius: 10, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                  <ArrowLeftRight size={20} style={{ display: 'block', margin: '0 auto 8px', opacity: 0.4 }} />
                  {language === 'ta' ? 'முந்தைய பதிப்போடு ஒப்பிட்டுப் பார்க்க இந்த வேறுபாட்டுக் காட்சியைப் பயன்படுத்தவும்.' : 'Toggle to compare this version with the previous one. Cherry-pick the best lines from each.'}
                </div>
              )}
            </div>
          </div>
        )}
      </SectionCard>

      {/* Risk Radar */}
      <SectionCard title={t('detail.riskRadar')} icon={Shield} badge={t('detail.dim3')} t={t} language={language}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {Object.entries(riskRadar).map(([key, risk]) => {
            const label = key === 'cultural_sensitivity' ? t('riskRadar.culturalSensitivity') :
                          key === 'trend_expiry' ? t('riskRadar.trendExpiry') :
                          t('riskRadar.creativeFatigue')
            const scoreColor = risk.score <= 3 ? '#10B981' : risk.score <= 6 ? '#F59E0B' : '#EF4444'
            const icon = risk.score <= 3 ? '🟢' : risk.score <= 6 ? '🟡' : '🔴'
            return (
              <div key={key} style={{ padding: 18, borderRadius: 12, border: `1px solid ${scoreColor}25`, background: `${scoreColor}06` }}>
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
                  <div style={{ fontSize: 22, marginLeft: 'auto' }}>{icon}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Space Grotesk', color: scoreColor }}>{risk.score}</div>
                  <div style={{ fontSize: 12, color: scoreColor, fontWeight: 600 }}>/10<br />{language === 'ta' ? (risk.score <= 3 ? t('common.lowRisk') : risk.score <= 6 ? t('common.mediumRisk') : t('common.highRisk')) : risk.label}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: risk.alternative ? 10 : 0 }}>
                  {language === 'ta' ? 'இந்தப் பகுதியில் போதிய பாதுகாப்பு நடவடிக்கைகள் தேவையாக இருக்கலாம்.' : risk.reason}
                </div>
                {risk.alternative && (
                  <div style={{ padding: '8px 10px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 11, color: '#34D399', lineHeight: 1.5 }}>
                    {t('detail.lowRiskAlt')}: {language === 'ta' ? 'குறைந்த ஆபத்து கொண்ட மாற்று முறைகளைப் பயன்படுத்தவும்.' : risk.alternative}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </SectionCard>

      {/* Content Pillar Gantt */}
      <SectionCard title={t('detail.gantt')} icon={BarChart3} badge={t('detail.ganttView')} t={t} language={language}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 700 }}>
            {/* Header weeks */}
            <div style={{ display: 'flex', marginBottom: 10, paddingLeft: 140 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ flex: 1, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textAlign: 'center' }}>
                  {language === 'ta' ? `வாரம் ${i + 1}` : `Week ${i + 1}`}
                </div>
              ))}
            </div>
            {mappedGantt.map((bar, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ width: 130, fontSize: 12, color: 'var(--text-secondary)', paddingRight: 12, flexShrink: 0 }}>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{bar.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{bar.platform}</div>
                </div>
                <div style={{ flex: 1, position: 'relative', height: 32 }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, height: 32, background: 'rgba(255,255,255,0.03)', borderRadius: 4 }} />
                  <div
                    className="gantt-bar"
                    style={{
                      position: 'absolute',
                      left: `${(bar.start / 4) * 100}%`,
                      width: `${(bar.span / 4) * 100}%`,
                      background: `linear-gradient(90deg, ${bar.color}, ${bar.color}bb)`,
                      boxShadow: `0 2px 8px ${bar.color}40`,
                    }}
                  >
                    {bar.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

