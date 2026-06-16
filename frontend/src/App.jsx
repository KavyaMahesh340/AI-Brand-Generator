import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore, useThemeStore } from './store'
import Sidebar from './components/Sidebar'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import OnboardingPage from './pages/OnboardingPage'
import CampaignsPage from './pages/CampaignsPage'
import NewCampaignPage from './pages/NewCampaignPage'
import CampaignDetailPage from './pages/CampaignDetailPage'
import BrandDnaPage from './pages/BrandDnaPage'
import PersonasPage from './pages/PersonasPage'
import RiskRadarPage from './pages/RiskRadarPage'
import EmpathySimPage from './pages/EmpathySimPage'
import ExportPage from './pages/ExportPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'

function ProtectedLayout({ children }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main className="main-content" style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  )
}

export default function App() {
  const { applyTheme } = useThemeStore()

  // Apply persisted theme on mount
  useEffect(() => {
    applyTheme()
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
          error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<ProtectedLayout><OnboardingPage /></ProtectedLayout>} />
        <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
        <Route path="/campaigns" element={<ProtectedLayout><CampaignsPage /></ProtectedLayout>} />
        <Route path="/campaigns/new" element={<ProtectedLayout><NewCampaignPage /></ProtectedLayout>} />
        <Route path="/campaigns/:id" element={<ProtectedLayout><CampaignDetailPage /></ProtectedLayout>} />
        <Route path="/brand-dna" element={<ProtectedLayout><BrandDnaPage /></ProtectedLayout>} />
        <Route path="/personas" element={<ProtectedLayout><PersonasPage /></ProtectedLayout>} />
        <Route path="/risk" element={<ProtectedLayout><RiskRadarPage /></ProtectedLayout>} />
        <Route path="/empathy" element={<ProtectedLayout><EmpathySimPage /></ProtectedLayout>} />
        <Route path="/export" element={<ProtectedLayout><ExportPage /></ProtectedLayout>} />
        <Route path="/analytics" element={<ProtectedLayout><AnalyticsPage /></ProtectedLayout>} />
        <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
