import { Check, Cpu, Database, Info, Settings, Sun } from 'lucide-react'
import { useTranslation } from '../lib/useTranslation'
import toast from 'react-hot-toast'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Separator } from '../components/ui/separator'
import { SettingsActions, SettingsCard, SettingsField } from '../components/settings/SettingsPatterns'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div className="page-wrapper">
      <div className="flex w-full max-w-3xl flex-col gap-6 sm:gap-8">
        <header className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
            <Settings size={20} className="text-gray-500" />
          </div>
          <div className="min-w-0 space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{t('settings.title')}</h1>
            <p className="text-sm text-gray-500">{t('settings.subtitle')}</p>
          </div>
        </header>

        <SettingsCard
          icon={<Sun size={16} className="text-amber-600" />}
          title={t('settings.appearance')}
          description={t('settings.interfaceTheme')}
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-14 shrink-0 flex-col gap-1.5 rounded-lg border border-gray-200 bg-white p-2">
                  <div className="h-1.5 w-3/5 rounded-full bg-teal-600" />
                  <div className="h-1 w-full rounded-full bg-gray-200" />
                  <div className="h-1 w-4/5 rounded-full bg-gray-200" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-900">
                    <Sun size={14} className="text-amber-600" />
                    <span>{t('settings.lightMode')}</span>
                    <Badge variant="default" size="sm">
                      Active
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{t('settings.lightModeDesc')}</p>
                </div>

                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                  <Check size={14} />
                </div>
              </div>
            </div>

            <p className="text-xs leading-5 text-gray-500">{t('settings.themeNote')}</p>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Database size={16} className="text-blue-600" />}
          title={t('settings.supabase')}
          description="Connect your project data and API credentials."
        >
          <div className="space-y-4">
            <SettingsField htmlFor="supabase-url" label={t('settings.projectUrl')}>
              <Input
                id="supabase-url"
                placeholder="https://yourproject.supabase.co"
                defaultValue="https://placeholder.supabase.co"
              />
            </SettingsField>

            <SettingsField htmlFor="supabase-key" label={t('settings.anonKey')}>
              <Input
                id="supabase-key"
                placeholder="eyJ..."
                type="password"
                defaultValue="placeholder-key"
              />
            </SettingsField>

            <SettingsActions>
              <Button
                className="w-full sm:w-auto"
                variant="secondary"
                onClick={() => toast.success('Supabase config saved!')}
              >
                {t('settings.saveConnection')}
              </Button>
            </SettingsActions>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Cpu size={16} className="text-teal-600" />}
          title={t('settings.aiEngine')}
          description="Set your local model endpoint and fallback behavior."
        >
          <div className="space-y-4">
            <SettingsField htmlFor="engine-url" label={t('settings.engineUrl')}>
              <Input id="engine-url" defaultValue="http://localhost:8001" />
            </SettingsField>

            <SettingsField htmlFor="primary-model" label={t('settings.primaryModel')}>
              <Select id="primary-model" defaultValue="llama3:8b">
                <option value="llama3:8b">Llama 3 8B (Structured Output)</option>
                <option value="mistral:7b">Mistral 7B (Creative)</option>
              </Select>
            </SettingsField>

            <SettingsField htmlFor="fallback-model" label={t('settings.fallbackModel')}>
              <Select id="fallback-model" defaultValue="mistral:7b">
                <option value="mistral:7b">Mistral 7B</option>
                <option value="llama3:8b">Llama 3 8B</option>
              </Select>
            </SettingsField>

            <SettingsActions className="sm:justify-end">
              <Button
                className="w-full sm:w-auto"
                variant="secondary"
                onClick={() => toast.success('AI Engine config saved!')}
              >
                {t('settings.save')}
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                onClick={() => toast.success('Mock Mode - AI engine is simulated')}
              >
                {t('settings.testConnection')}
              </Button>
            </SettingsActions>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Info size={16} className="text-amber-600" />}
          title={t('settings.about')}
          description={t('settings.version')}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="text-sm font-semibold text-gray-900">BloomBig Studio AI</div>
              <p className="text-sm text-gray-600">{t('login.subtitle')}</p>
            </div>

            <Separator />

            <div className="space-y-1.5 text-xs leading-5 text-gray-500">
              <p>Confidential - BloomBig Studios Internship Programme</p>
              <p>Brands Built to Bloom - Internal Distribution Only</p>
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  )
}
