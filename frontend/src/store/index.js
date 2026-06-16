import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Auth Store ────────────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) => {
        localStorage.setItem('bloom_token', token)
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        localStorage.removeItem('bloom_token')
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    { name: 'bloom-auth' }
  )
)

// ─── Theme Store ───────────────────────────────────────────────────────────────
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark', // 'dark' | 'light'
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        set({ theme: next })
      },
      applyTheme: () => {
        document.documentElement.setAttribute('data-theme', get().theme)
      },
    }),
    { name: 'bloom-theme' }
  )
)

// ─── Language Store ────────────────────────────────────────────────────────────
export const useLanguageStore = create(
  persist(
    (set, get) => ({
      language: 'en', // 'en' | 'ta'
      toggleLanguage: () => {
        const next = get().language === 'en' ? 'ta' : 'en'
        set({ language: next })
      },
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'bloom-language' }
  )
)

// ─── App Store ─────────────────────────────────────────────────────────────────
export const useAppStore = create((set, get) => ({
  // Clients
  clients: [],
  activeClient: null,
  setClients: (clients) => set({ clients }),
  setActiveClient: (client) => set({ activeClient: client }),
  addClient: (client) => set((s) => ({ clients: [client, ...s.clients] })),
  updateClient: (id, updates) =>
    set((s) => ({ clients: s.clients.map((c) => (c.id === id ? { ...c, ...updates } : c)) })),

  // Campaigns
  campaigns: [],
  activeCampaign: null,
  setCampaigns: (campaigns) => set({ campaigns }),
  setActiveCampaign: (campaign) => set({ activeCampaign: campaign }),
  addCampaign: (campaign) => set((s) => ({ campaigns: [campaign, ...s.campaigns] })),
  updateCampaign: (id, updates) =>
    set((s) => ({
      campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      activeCampaign:
        s.activeCampaign?.id === id ? { ...s.activeCampaign, ...updates } : s.activeCampaign,
    })),

  // Generation pipeline state
  generationSteps: [],
  isGenerating: false,
  setGenerating: (val) => set({ isGenerating: val }),
  setGenerationSteps: (steps) => set({ generationSteps: steps }),
  updateStep: (idx, updates) =>
    set((s) => ({
      generationSteps: s.generationSteps.map((step, i) =>
        i === idx ? { ...step, ...updates } : step
      ),
    })),

  // UI state
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),

  // Diff view state
  diffSections: {},
  setDiffSection: (sectionType, oldContent, newContent) =>
    set((s) => ({
      diffSections: { ...s.diffSections, [sectionType]: { old: oldContent, new: newContent } },
    })),
  clearDiff: (sectionType) =>
    set((s) => {
      const copy = { ...s.diffSections }
      delete copy[sectionType]
      return { diffSections: copy }
    }),
}))
