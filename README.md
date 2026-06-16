# AI Campaign Strategy Generator

> 
> *Brands Built to Bloom*

---

## Quick Start

### 1. Frontend (React + Vite + Tailwind CSS)
```powershell
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 2. Backend (Node.js + Express)
```powershell
cd backend
# Edit .env with your Supabase credentials (optional for mock mode)
npm run dev
# → http://localhost:4000
```

### 3. AI Engine (Python + FastAPI)
```powershell
cd ai-engine
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
# → http://localhost:8001
```

---

## Architecture

```
frontend/          React 18 + Vite + Tailwind CSS v4
backend/           Node.js 20 + Express 5 + Supabase
ai-engine/         Python 3.11 + FastAPI + Ollama bridge
supabase/          PostgreSQL schema + RLS policies
```

## AI Models
| Model | Use | Mode |
|---|---|---|
| Llama 3 8B | Structured JSON outputs | Primary |
| Mistral 7B | Creative hooks + captions | Creative |
| Mock | No Ollama required | Default |

Set `USE_MOCK_AI=false` in `backend/.env` and `MOCK_MODE=false` in `ai-engine/.env` to use real Ollama.

## Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Copy Project URL and keys into `frontend/.env` and `backend/.env`

## Five Core Differentiators
1. **Brand DNA Fingerprinting** — Persistent 5-attribute brand profile
2. **Competitor Blind Spot Detector** — 3 narrative gaps the competition is missing
3. **Cultural Moment Mapper** — Geography-aware timing + festival recommendations
4. **Audience Empathy Simulator** — AI responds AS the target persona
5. **CampaignIQ Health Score** — 0-100 score to justify strategy decisions

---

