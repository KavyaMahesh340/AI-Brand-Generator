import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 120000,
})

// Attach auth token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bloom_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── Clients ──────────────────────────────────────────────────────────────────
export const clientsApi = {
  create: (data) => api.post('/clients', data),
  getAll: () => api.get('/clients'),
  getById: (id) => api.get(`/clients/${id}`),
  update: (id, data) => api.patch(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
}

// ─── Campaigns ────────────────────────────────────────────────────────────────
export const campaignsApi = {
  create: (data) => api.post('/campaigns', data),
  getAll: (clientId) => api.get('/campaigns', { params: { clientId } }),
  getById: (id) => api.get(`/campaigns/${id}`),
  generate: (id) => api.post(`/campaigns/${id}/generate`),
  getSection: (id, sectionType) => api.get(`/campaigns/${id}/section/${sectionType}`),
  regenerateSection: (id, sectionType) => api.patch(`/campaigns/${id}/section`, { sectionType }),
  translate: (id, ideaText) => api.post(`/campaigns/${id}/translate`, { ideaText }),
  getRisk: (id) => api.get(`/campaigns/${id}/risk`),
  getHealthScore: (id) => api.get(`/campaigns/${id}/health-score`),
  delete: (id) => api.delete(`/campaigns/${id}`),
}

// ─── AI Engine ────────────────────────────────────────────────────────────────
export const aiApi = {
  extractBrandDna: (data) => api.post('/ai/extract-brand-dna', data),
  empathySimulator: (data) => api.post('/ai/empathy-simulator', data),
  detectBlindSpots: (data) => api.post('/ai/blind-spots', data),
  culturalMapper: (data) => api.post('/ai/cultural-moments', data),
}

// ─── Export ───────────────────────────────────────────────────────────────────
export const exportApi = {
  generatePdf: (id) => api.get(`/export/${id}/pdf`, { responseType: 'blob' }),
}

export default api
