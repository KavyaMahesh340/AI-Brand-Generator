-- ─── BloomBig Studio — Supabase Database Schema ─────────────────────────────
-- Run this in your Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/<your-project>/sql/new
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Clients ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_name    TEXT NOT NULL,
  industry      TEXT NOT NULL,
  geography     TEXT NOT NULL,
  brand_dna     JSONB DEFAULT '{}',
  brand_voice   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Row-Level Security for clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD their own clients"
  ON clients FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── Campaigns ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campaigns (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id     UUID REFERENCES clients(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  goal          TEXT,
  brand_voice   TEXT,
  status        TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  campaign_iq   INTEGER CHECK (campaign_iq BETWEEN 0 AND 100),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD their own campaigns"
  ON campaigns FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── Audience Personas ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audience_personas (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id         UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  age                 INTEGER,
  location            TEXT,
  income              TEXT,
  platform_preference TEXT,
  emotional_state     TEXT,
  morning_state       TEXT,
  fear                TEXT,
  language_phrases    TEXT[],
  jobs_to_be_done     TEXT,
  emoji               TEXT DEFAULT '👤',
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audience_personas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Persona access via campaign"
  ON audience_personas FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

-- ─── Content Pillars ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_pillars (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id    UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  platform       TEXT,
  tone           TEXT,
  risk_score     INTEGER CHECK (risk_score BETWEEN 1 AND 10),
  risk_reason    TEXT,
  content        JSONB DEFAULT '{}',
  start_week     INTEGER DEFAULT 1,
  duration_weeks INTEGER DEFAULT 2,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE content_pillars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pillar access via campaign"
  ON content_pillars FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

-- ─── Campaign Sections (for diff view + regeneration) ─────────────────────────
CREATE TABLE IF NOT EXISTS campaign_sections (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id      UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  section_type     TEXT NOT NULL, -- 'brand_dna','personas','blind_spots','cultural_moments','emotion_outcome','platform_translation','risk_radar','health_score'
  content          JSONB NOT NULL DEFAULT '{}',
  version          INTEGER DEFAULT 1,
  previous_content JSONB DEFAULT NULL,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (campaign_id, section_type)
);

ALTER TABLE campaign_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Section access via campaign"
  ON campaign_sections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

-- ─── Campaign Health Scores ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campaign_health_scores (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id           UUID REFERENCES campaigns(id) ON DELETE CASCADE UNIQUE,
  overall_score         INTEGER CHECK (overall_score BETWEEN 0 AND 100),
  persona_platform_fit  INTEGER CHECK (persona_platform_fit BETWEEN 0 AND 100),
  message_clarity       INTEGER CHECK (message_clarity BETWEEN 0 AND 100),
  timing_alignment      INTEGER CHECK (timing_alignment BETWEEN 0 AND 100),
  risk_score_inverted   INTEGER CHECK (risk_score_inverted BETWEEN 0 AND 100),
  rationale             TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE campaign_health_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Health score access via campaign"
  ON campaign_health_scores FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

-- ─── Learning Log (Bonus: Living Campaign Memory) ─────────────────────────────
CREATE TABLE IF NOT EXISTS campaign_learning_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id     UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  client_id       UUID REFERENCES clients(id) ON DELETE CASCADE,
  what_worked     TEXT[],
  what_flopped    TEXT[],
  platform_winner TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE campaign_learning_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learning log access via campaign"
  ON campaign_learning_logs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_campaigns_client_id ON campaigns(client_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_personas_campaign_id ON audience_personas(campaign_id);
CREATE INDEX IF NOT EXISTS idx_pillars_campaign_id ON content_pillars(campaign_id);
CREATE INDEX IF NOT EXISTS idx_sections_campaign_id ON campaign_sections(campaign_id);

-- ─── Updated_at trigger ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER sections_updated_at BEFORE UPDATE ON campaign_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER health_updated_at BEFORE UPDATE ON campaign_health_scores FOR EACH ROW EXECUTE FUNCTION update_updated_at();
