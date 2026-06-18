import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store'
import Sidebar from './components/Sidebar'
import { Menu } from 'lucide-react'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div style={{ display: 'flex' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <main className="main-content" style={{ flex: 1 }}>
        {/* Mobile header */}
        <div className="mobile-header">
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Menu size={18} color="#475569" />
          </button>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            color: '#0f172a',
          }}>
            BloomBig Studio
          </div>
          <div style={{ width: 34 }} />
        </div>

        {children}
      </main>
    </div>
  )
}

export default function App() {
  // Force light theme on mount — no dark mode in this application
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
          success: { iconTheme: { primary: '#16a34a', secondary: 'white' } },
          error: { iconTheme: { primary: '#e11d48', secondary: 'white' } },
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
