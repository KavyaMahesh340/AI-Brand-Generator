import { useLanguageStore } from '../store'
import { translations } from './i18n'

/**
 * useTranslation()
 * Returns the `t` function for the current language.
 *
 * Usage:
 *   const { t, lang } = useTranslation()
 *   t('nav.dashboard')          → "Dashboard" or "டாஷ்போர்டு"
 *   t('login.signIn')           → "Sign In"   or "உள்நுழை"
 */
export function useTranslation() {
  const { language } = useLanguageStore()
  const dict = translations[language] ?? translations['en']

  function t(key) {
    const parts = key.split('.')
    let val = dict
    for (const p of parts) {
      if (val == null) break
      val = val[p]
    }
    // fallback to English if key missing in current lang
    if (val == null || typeof val === 'object') {
      let fallback = translations['en']
      for (const p of parts) {
        if (fallback == null) break
        fallback = fallback[p]
      }
      return fallback ?? key
    }
    return val
  }

  return { t, lang: language }
}
