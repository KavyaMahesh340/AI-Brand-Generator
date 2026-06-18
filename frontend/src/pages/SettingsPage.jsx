import { Settings, Database, Cpu, Info, Sun } from 'lucide-react'
import { useLanguageStore } from '../store'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { Badge } from '../components/ui/badge'

export default function SettingsPage() {
  const { language } = useLanguageStore()
  const { t } = useTranslation()

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={20} color="#64748b" />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>{t('settings.title')}</h1>
          <p className="page-subtitle">{t('settings.subtitle')}</p>
        </div>
      </div>

      {/* Appearance */}
      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sun size={15} color="#d97706" />
            <CardTitle>{t('settings.appearance')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent style={{ paddingTop: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#64748b', marginBottom: 14 }}>
            {t('settings.interfaceTheme')}
          </div>

          {/* Light mode — active only */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px', borderRadius: 12,
            border: '2px solid #0d9488',
            background: '#f0fdfa',
          }}>
            <div style={{ width: 44, height: 34, borderRadius: 7, background: '#ffffff', border: '1px solid #e2e8f0', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '5px 6px', gap: 3 }}>
              <div style={{ height: 4, width: '55%', background: '#0d9488', borderRadius: 2 }} />
              <div style={{ height: 3, width: '90%', background: '#e2e8f0', borderRadius: 2 }} />
              <div style={{ height: 3, width: '70%', background: '#e2e8f0', borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sun size={14} color="#d97706" />
                {t('settings.lightMode')}
                <Badge variant="default" style={{ marginLeft: 6, fontSize: 10 }}>Active</Badge>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{t('settings.lightModeDesc')}</div>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 12, lineHeight: 1.6 }}>
            {t('settings.themeNote')}
          </p>
        </CardContent>
      </Card>

      {/* Supabase */}
      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Database size={15} color="#2563eb" />
            <CardTitle>{t('settings.supabase')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent style={{ paddingTop: 0 }}>
          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="supabase-url" style={{ marginBottom: 6 }}>{t('settings.projectUrl')}</Label>
            <Input
              id="supabase-url"
              placeholder="https://yourproject.supabase.co"
              defaultValue="https://placeholder.supabase.co"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Label htmlFor="supabase-key" style={{ marginBottom: 6 }}>{t('settings.anonKey')}</Label>
            <Input
              id="supabase-key"
              placeholder="eyJ…"
              type="password"
              defaultValue="placeholder-key"
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => toast.success(language === 'ta' ? 'சுபாபேஸ் அமைப்பு சேமிக்கப்பட்டது!' : 'Supabase config saved!')}
          >
            {t('settings.saveConnection')}
          </Button>
        </CardContent>
      </Card>

      {/* AI Engine */}
      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cpu size={15} color="#0d9488" />
            <CardTitle>{t('settings.aiEngine')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent style={{ paddingTop: 0 }}>
          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="engine-url" style={{ marginBottom: 6 }}>{t('settings.engineUrl')}</Label>
            <Input id="engine-url" defaultValue="http://localhost:8001" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="primary-model" style={{ marginBottom: 6 }}>{t('settings.primaryModel')}</Label>
            <select id="primary-model" className="input-field" style={{ cursor: 'pointer' }}>
              <option value="llama3:8b">Llama 3 8B (Structured Output)</option>
              <option value="mistral:7b">Mistral 7B (Creative)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <Label htmlFor="fallback-model" style={{ marginBottom: 6 }}>{t('settings.fallbackModel')}</Label>
            <select id="fallback-model" className="input-field" style={{ cursor: 'pointer' }}>
              <option value="mistral:7b">Mistral 7B</option>
              <option value="llama3:8b">Llama 3 8B</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              variant="secondary"
              onClick={() => toast.success(language === 'ta' ? 'AI இயந்திர அமைப்பு சேமிக்கப்பட்டது!' : 'AI Engine config saved!')}
            >
              {t('settings.save')}
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success('Mock Mode — AI engine is simulated')}
            >
              {t('settings.testConnection')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Info size={15} color="#d97706" />
            <CardTitle>{t('settings.about')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent style={{ paddingTop: 0 }}>
          <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.8 }}>
            <div><strong style={{ color: '#0f172a' }}>BloomBig Studio AI</strong> — {t('settings.version')}</div>
            <div>{t('login.subtitle')}</div>
            <Separator style={{ margin: '12px 0' }} />
            <div style={{ fontSize: 12, color: '#94a3b8' }}>
              Confidential — BloomBig Studios Internship Programme<br />
              Brands Built to Bloom · Internal Distribution Only
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
