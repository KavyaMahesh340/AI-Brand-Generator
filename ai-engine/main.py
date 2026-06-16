"""
BloomBig Studio — AI Engine
FastAPI bridge between Express backend and Ollama (Llama 3 8B / Mistral 7B)

Modes:
  MOCK_MODE=true  → Returns realistic mock responses (no Ollama required)
  MOCK_MODE=false → Real Ollama + LangChain structured output (requires Ollama running)

Run:
  uvicorn main:app --host 0.0.0.0 --port 8001 --reload
"""

import os
import json
import asyncio
import random
from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

MOCK_MODE = os.getenv("MOCK_MODE", "true").lower() == "true"
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
PRIMARY_MODEL = os.getenv("PRIMARY_MODEL", "llama3:8b")
FALLBACK_MODEL = os.getenv("FALLBACK_MODEL", "mistral:7b")

app = FastAPI(
    title="BloomBig Studio AI Engine",
    description="AI pipeline for campaign strategy generation",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Pydantic Schemas ──────────────────────────────────────────────────────────

class BrandInput(BaseModel):
    brand_name: str
    industry: str
    geography: str
    brand_description: Optional[str] = ""
    tone_archetype: Optional[str] = ""
    brand_voice: Optional[str] = ""
    competitors: Optional[List[str]] = []


class BrandDNA(BaseModel):
    tone_archetype: str
    colour_emotion: str
    competitor_narrative_gap: str
    customer_core_aspiration: str
    brand_voice_signature: List[str]


class BlindSpotItem(BaseModel):
    gap: str
    insight: str
    opportunity: str


class CulturalMoment(BaseModel):
    name: str
    date: str
    relevance: str
    note: str


class CulturalMomentsOutput(BaseModel):
    primary_moment: str
    timing_advice: str
    language_tip: str
    moments: List[CulturalMoment]
    micro_trends: List[str]


class EmotionOutcome(BaseModel):
    target_emotion: str
    content_format: str
    platform_recommendation: str
    hook_formula: str
    cta: str


class PlatformContent(BaseModel):
    platform: str
    tone: str
    content: str
    hashtags: Optional[List[str]] = []


class PlatformTranslation(BaseModel):
    linkedin: PlatformContent
    instagram: PlatformContent
    tiktok: PlatformContent
    whatsapp: PlatformContent


class RiskDimension(BaseModel):
    score: int = Field(ge=1, le=10)
    label: str
    reason: str
    flag: bool
    alternative: Optional[str] = None


class RiskRadar(BaseModel):
    cultural_sensitivity: RiskDimension
    trend_expiry: RiskDimension
    creative_fatigue: RiskDimension


class EmpathySimInput(BaseModel):
    persona_name: str
    persona_age: int
    persona_location: str
    persona_emotional_state: str
    persona_fear: str
    caption: str


class EmpathySimOutput(BaseModel):
    persona_name: str
    emotional_response: str
    would_save: bool
    would_share: bool
    save_reason: str
    share_barrier: str
    suggested_edit: str
    engagement_prediction: str


class GenerationRequest(BaseModel):
    campaign_id: str
    brand_name: Optional[str] = "Unknown Brand"
    industry: Optional[str] = "General"
    geography: Optional[str] = "India"
    goal: Optional[str] = "Brand Awareness"
    brand_voice: Optional[str] = "Professional"
    competitors: Optional[List[str]] = []


# ─── Mock Response Generators ──────────────────────────────────────────────────

ARCHETYPES = ["Rebel", "Caregiver", "Sage", "Jester", "Hero"]
EMOTIONS = ["warm/urgent", "cool/trustworthy", "bold/energetic", "calm/reassuring"]


def _mock_brand_dna(brand: BrandInput) -> BrandDNA:
    archetype = brand.tone_archetype if brand.tone_archetype else random.choice(ARCHETYPES)
    return BrandDNA(
        tone_archetype=archetype,
        colour_emotion=random.choice(EMOTIONS),
        competitor_narrative_gap=(
            f"Most competitors in the {brand.industry} space focus on features and price. "
            "The audience secretly wants to feel seen, not sold to. "
            "White space: brand identity and sense of belonging."
        ),
        customer_core_aspiration=(
            f"To become the version of themselves that {brand.brand_name} helps unlock "
            "— not just to purchase a product, but to transform their identity."
        ),
        brand_voice_signature=["bold", "human", "unapologetic"],
    )


def _mock_blind_spots(competitors: List[str]) -> List[BlindSpotItem]:
    return [
        BlindSpotItem(
            gap="Emotional validation over product specs",
            insight="Every competitor talks about what their product does. Not one tells your audience they're already making the right choice. Own the 'you're not wrong for wanting this' narrative.",
            opportunity="Run a campaign series called 'Trust Your Gut' — validating the audience's decision-making rather than justifying your product.",
        ),
        BlindSpotItem(
            gap="Post-purchase identity, not pre-purchase persuasion",
            insight="All competitor ads stop at the 'buy now' moment. The transformation story — who you become after — is completely untapped in this category.",
            opportunity="UGC series: '3 months later' customer stories. No product shots. Only lifestyle outcomes.",
        ),
        BlindSpotItem(
            gap="Regional language emotional resonance",
            insight="Zero competitors are creating emotionally resonant content in Tamil, Kannada, or Telugu. They treat vernacular as translation, not culture.",
            opportunity="Native-language content that feels written by someone from the community, not translated from English.",
        ),
    ]


def _mock_cultural_moments(geography: str, month: str) -> CulturalMomentsOutput:
    return CulturalMomentsOutput(
        primary_moment="Pongal / Harvest Season",
        timing_advice="Launch 3 weeks before Pongal (Jan 14). Use harvest and abundance imagery.",
        language_tip="Tamil-language captions will outperform English by ~40% in this cultural window.",
        moments=[
            CulturalMoment(name="Pongal", date="Jan 14", relevance="high", note="Abundance, gratitude, new beginnings"),
            CulturalMoment(name="Republic Day", date="Jan 26", relevance="medium", note="National pride — use carefully"),
            CulturalMoment(name="Valentine's Day", date="Feb 14", relevance="low", note="Saturated — avoid unless core to brand"),
        ],
        micro_trends=[
            '"Quiet Luxury" aesthetic gaining traction in Tier 1 cities',
            "Short-form regional language content up 3× on Instagram",
            "WhatsApp Status emerging as discovery channel for 25–35 urban segment",
        ],
    )


def _mock_emotion_outcome() -> EmotionOutcome:
    return EmotionOutcome(
        target_emotion="Inspired + Urgent",
        content_format="Short-form video testimonials (45–60 seconds)",
        platform_recommendation="Instagram Reels in Tamil with a 7-second hook showing transformation",
        hook_formula="Problem → Relatable struggle → Unexpected shift → Aspirational outcome",
        cta="Save this and show it to yourself in 3 months",
    )


def _mock_platform_translation(idea: str) -> PlatformTranslation:
    return PlatformTranslation(
        linkedin=PlatformContent(
            platform="LinkedIn",
            tone="Thought-leader",
            content=f"Most brands in this space are playing it safe. Here's what the data actually shows about what your audience wants from you.\n\nWe analysed thousands of comments, DMs, and reviews. The answer wasn't about product features.\n\nIt was about identity.\n\nYour customer doesn't want to buy {idea}. They want to become the kind of person who uses {idea}.\n\nThat's the insight that changes everything.",
        ),
        instagram=PlatformContent(
            platform="Instagram",
            tone="Visual story",
            content=f"The moment it clicked for me was when I stopped asking 'is this product good?' and started asking 'who do I become when I use this?' ✨\n\nThat's the shift. That's the whole thing.",
            hashtags=["#BrandStory", "#MarketingInsights", "#BuildWithPurpose", "#ContentStrategy", "#BloomBig"],
        ),
        tiktok=PlatformContent(
            platform="TikTok",
            tone="Hook-first",
            content=f'[0–7s] "Stop selling the product. Start selling who they become."\n[7–20s] *Show the transformation, not the transaction.*\n[20–35s] "3 months of using this and the most common thing they say isn\'t about the product — it\'s about themselves."\n[35–45s] "That\'s the campaign. That\'s the brand."',
        ),
        whatsapp=PlatformContent(
            platform="WhatsApp",
            tone="Conversational",
            content="Hey! Quick one — we've been running something different this month and the response has blown us away 🙌\n\nInstead of talking about what we sell, we've been sharing stories of what customers *become*.\n\nThe saves and shares are 4× our normal posts.\n\nCurious to see it? Reply 'SHOW ME' 👇",
        ),
    )


def _mock_risk_radar() -> RiskRadar:
    return RiskRadar(
        cultural_sensitivity=RiskDimension(
            score=3, label="Low Risk",
            reason="Campaign uses universal aspiration themes without cultural appropriation risk.",
            flag=False,
        ),
        trend_expiry=RiskDimension(
            score=5, label="Medium Risk",
            reason='"Quiet luxury" micro-trend has ~4-month shelf life. Consider evergreen backup content.',
            flag=True,
            alternative="Root the campaign in identity transformation — this is an evergreen emotional driver.",
        ),
        creative_fatigue=RiskDimension(
            score=4, label="Medium Risk",
            reason="Short-form testimonial format saturates in ~3 weeks for daily audiences.",
            flag=True,
            alternative="Schedule format rotation at week 3: shift to behind-the-scenes process content.",
        ),
    )


def _mock_empathy_sim(data: EmpathySimInput) -> EmpathySimOutput:
    return EmpathySimOutput(
        persona_name=data.persona_name,
        emotional_response="Seen but slightly cautious",
        would_save=True,
        would_share=False,
        save_reason="I'd revisit this when I'm feeling low and need a reminder of why I'm doing what I'm doing.",
        share_barrier="Feels a bit too polished for my personal feed. My followers would see it as an ad.",
        suggested_edit="Add one imperfect, vulnerable sentence. Drop the last line — it feels like a hard sell.",
        engagement_prediction="High saves, medium comments, low shares without the edit. With the edit: high all three.",
    )


# ─── Real Ollama Chain (when MOCK_MODE=false) ──────────────────────────────────

async def _real_brand_dna(brand: BrandInput) -> BrandDNA:
    """Real Llama 3 8B extraction via LangChain + Instructor."""
    try:
        import instructor  # type: ignore[import-untyped,import-not-found]
        from langchain_ollama import OllamaLLM  # type: ignore[import-untyped,import-not-found]

        prompt = f"""
You are a senior brand strategist. Extract a Brand DNA fingerprint from this brand information.

Brand: {brand.brand_name}
Industry: {brand.industry}
Geography: {brand.geography}
Description: {brand.brand_description}
Preferred Archetype: {brand.tone_archetype}
Brand Voice: {brand.brand_voice}
Competitors: {', '.join(brand.competitors)}

Return a JSON object with exactly these 5 fields:
- tone_archetype: one of [Rebel, Caregiver, Sage, Jester, Hero]
- colour_emotion: e.g. "warm/urgent" or "cool/trustworthy"
- competitor_narrative_gap: what competitors are NOT saying (1-2 sentences)
- customer_core_aspiration: what the audience secretly wants to become (1 sentence)
- brand_voice_signature: array of exactly 3 adjectives

JSON only, no markdown:"""

        llm = OllamaLLM(model=PRIMARY_MODEL, base_url=OLLAMA_BASE_URL, temperature=0.3)
        raw = await asyncio.to_thread(llm.invoke, prompt)

        # Parse JSON from response
        start = raw.find("{")
        end = raw.rfind("}") + 1
        data = json.loads(raw[start:end])
        return BrandDNA(**data)

    except Exception as e:
        print(f"Ollama failed ({e}), falling back to mock")
        return _mock_brand_dna(brand)


# ─── API Routes ────────────────────────────────────────────────────────────────

@app.get("/")
def health():
    return {
        "service": "BloomBig Studio AI Engine",
        "version": "1.0.0",
        "mode": "mock" if MOCK_MODE else "ollama",
        "models": {"primary": PRIMARY_MODEL, "fallback": FALLBACK_MODEL},
    }


@app.post("/ai/extract-brand-dna", response_model=BrandDNA)
async def extract_brand_dna(brand: BrandInput):
    """Chain 1: Extract 5-attribute Brand DNA fingerprint."""
    await asyncio.sleep(0.5)  # Simulate latency
    if MOCK_MODE:
        return _mock_brand_dna(brand)
    return await _real_brand_dna(brand)


@app.post("/ai/blind-spots", response_model=List[BlindSpotItem])
async def detect_blind_spots(data: dict):
    """Chain 2: Competitor Blind Spot Detector — 3 narrative gaps."""
    await asyncio.sleep(0.8)
    competitors = data.get("competitors", [])
    if MOCK_MODE:
        return _mock_blind_spots(competitors)

    # Real chain would scrape public messaging and run analysis
    try:
        from langchain_ollama import OllamaLLM  # type: ignore[import-untyped,import-not-found]
        llm = OllamaLLM(model=PRIMARY_MODEL, base_url=OLLAMA_BASE_URL, temperature=0.5)
        prompt = f"""
Analyse these competitor handles/URLs and identify 3 narrative gaps — things they are NOT saying that the target audience secretly wants to hear.
Competitors: {', '.join(competitors)}
Return JSON array with 3 objects, each having: gap, insight, opportunity.
JSON only:"""
        raw = await asyncio.to_thread(llm.invoke, prompt)
        start = raw.find("[")
        end = raw.rfind("]") + 1
        items = json.loads(raw[start:end])
        return [BlindSpotItem(**item) for item in items]
    except Exception as e:
        print(f"Ollama failed ({e}), using mock")
        return _mock_blind_spots(competitors)


@app.post("/ai/cultural-moments", response_model=CulturalMomentsOutput)
async def map_cultural_moments(data: dict):
    """Chain 3: Cultural Moment Mapper — geography + month → timing advice."""
    await asyncio.sleep(0.6)
    geography = data.get("geography", "India")
    month = data.get("month", "January")
    if MOCK_MODE:
        return _mock_cultural_moments(geography, month)

    try:
        from langchain_ollama import OllamaLLM  # type: ignore[import-untyped,import-not-found]
        llm = OllamaLLM(model=PRIMARY_MODEL, base_url=OLLAMA_BASE_URL, temperature=0.3)
        prompt = f"""
You are a cultural marketing expert for India. For a campaign launching in {geography} in {month}:
List the top 3 cultural moments, micro-trends, and give timing + language advice.
Return JSON with: primary_moment, timing_advice, language_tip, moments (array), micro_trends (array).
JSON only:"""
        raw = await asyncio.to_thread(llm.invoke, prompt)
        start = raw.find("{")
        end = raw.rfind("}") + 1
        d = json.loads(raw[start:end])
        return CulturalMomentsOutput(**d)
    except Exception as e:
        print(f"Ollama failed ({e}), using mock")
        return _mock_cultural_moments(geography, month)


@app.post("/ai/emotion-outcome", response_model=EmotionOutcome)
async def emotion_outcome_chain(data: dict):
    """Chain 4: Emotion-Outcome — works backwards from desired action to format + platform."""
    await asyncio.sleep(0.7)
    if MOCK_MODE:
        return _mock_emotion_outcome()

    try:
        from langchain_ollama import OllamaLLM  # type: ignore[import-untyped,import-not-found]
        llm = OllamaLLM(model=FALLBACK_MODEL, base_url=OLLAMA_BASE_URL, temperature=0.6)  # Mistral for creative
        prompt = f"""
Campaign goal: {data.get('goal', 'Brand Awareness')}
Target geography: {data.get('geography', 'India')}
Target persona: {data.get('persona_summary', 'Urban 25-35 professional')}

Step 1: What emotional state must the audience reach to take action?
Step 2: Which content formats trigger that specific emotional combination?
Step 3: Which platform converts best when that emotion is triggered in this geography?

Return JSON with: target_emotion, content_format, platform_recommendation, hook_formula, cta.
JSON only:"""
        raw = await asyncio.to_thread(llm.invoke, prompt)
        start = raw.find("{")
        end = raw.rfind("}") + 1
        d = json.loads(raw[start:end])
        return EmotionOutcome(**d)
    except Exception as e:
        print(f"Ollama failed ({e}), using mock")
        return _mock_emotion_outcome()


@app.post("/ai/platform-translation", response_model=PlatformTranslation)
async def translate_platforms(data: dict):
    """Chain 5: Platform Tone Translator — 1 idea → 4 platform voices."""
    await asyncio.sleep(1.0)
    idea = data.get("idea", "Own your transformation")
    if MOCK_MODE:
        return _mock_platform_translation(idea)

    try:
        from langchain_ollama import OllamaLLM  # type: ignore[import-untyped,import-not-found]
        llm = OllamaLLM(model=FALLBACK_MODEL, base_url=OLLAMA_BASE_URL, temperature=0.7)
        prompt = f"""
Rewrite this campaign idea for 4 different platform voices:
Idea: "{idea}"

LinkedIn: Thought-leader tone, insight-led, professional, 150-200 words, no hashtags.
Instagram: Visual story tone, sensory language, 3-line caption, 5 hashtags.
TikTok: Hook-first 7-second script: action word + curiosity gap + payoff.
WhatsApp: Conversational, first-person, under 60 words, ends with a question.

Return JSON with linkedin, instagram, tiktok, whatsapp keys. Each has: platform, tone, content, hashtags (array, empty if not applicable).
JSON only:"""
        raw = await asyncio.to_thread(llm.invoke, prompt)
        start = raw.find("{")
        end = raw.rfind("}") + 1
        d = json.loads(raw[start:end])
        return PlatformTranslation(**d)
    except Exception as e:
        print(f"Ollama failed ({e}), using mock")
        return _mock_platform_translation(idea)


@app.post("/ai/risk-radar", response_model=RiskRadar)
async def score_risk(data: dict):
    """Chain 6: Risk Radar — 3-dimension campaign risk scoring."""
    await asyncio.sleep(0.8)
    if MOCK_MODE:
        return _mock_risk_radar()

    try:
        from langchain_ollama import OllamaLLM  # type: ignore[import-untyped,import-not-found]
        llm = OllamaLLM(model=PRIMARY_MODEL, base_url=OLLAMA_BASE_URL, temperature=0.2)
        prompt = f"""
Score this campaign strategy on 3 risk dimensions (1-10, where 10=highest risk):
Campaign: {json.dumps(data)}

1. cultural_sensitivity: Does messaging risk misinterpretation in target geography?
2. trend_expiry: Will the hook feel stale in 2 weeks (high=10) or 6 months (low=1)?
3. creative_fatigue: Days before audience tunes out (high score=faster fatigue)

For each: score (1-10), label (Low/Medium/High Risk), reason (1 sentence), flag (bool if >5), alternative (mitigation plan for this risk, regardless of level).
Return JSON only:"""
        raw = await asyncio.to_thread(llm.invoke, prompt)
        start = raw.find("{")
        end = raw.rfind("}") + 1
        d = json.loads(raw[start:end])
        return RiskRadar(**d)
    except Exception as e:
        print(f"Ollama failed ({e}), using mock")
        return _mock_risk_radar()


@app.post("/ai/empathy-simulator", response_model=EmpathySimOutput)
async def empathy_simulator(data: EmpathySimInput):
    """Bonus Chain: Responds AS the target persona to a draft caption."""
    await asyncio.sleep(1.2)
    if MOCK_MODE:
        return _mock_empathy_sim(data)

    try:
        from langchain_ollama import OllamaLLM  # type: ignore[import-untyped,import-not-found]
        llm = OllamaLLM(model=FALLBACK_MODEL, base_url=OLLAMA_BASE_URL, temperature=0.8)
        prompt = f"""
You are {data.persona_name}, a {data.persona_age}-year-old from {data.persona_location}.
Your emotional state: {data.persona_emotional_state}
Your biggest fear about this category: {data.persona_fear}

React to this caption from a brand:
"{data.caption}"

Be brutally honest. You are NOT the marketer. You are the target audience.
Return JSON: emotional_response (2-4 words), would_save (bool), would_share (bool), save_reason (1 sentence), share_barrier (1 sentence), suggested_edit (specific edit suggestion), engagement_prediction (1 sentence).
JSON only:"""
        raw = await asyncio.to_thread(llm.invoke, prompt)
        start = raw.find("{")
        end = raw.rfind("}") + 1
        d = json.loads(raw[start:end])
        return EmpathySimOutput(persona_name=data.persona_name, **d)
    except Exception as e:
        print(f"Ollama failed ({e}), using mock")
        return _mock_empathy_sim(data)


@app.post("/ai/generate")
async def full_pipeline(req: GenerationRequest):
    """Full 4-step pipeline for campaign generation."""
    brand = BrandInput(
        brand_name=req.brand_name,
        industry=req.industry,
        geography=req.geography,
        competitors=req.competitors,
    )

    # Run chains in sequence (as per spec — chained, not parallel)
    dna = _mock_brand_dna(brand) if MOCK_MODE else await _real_brand_dna(brand)
    await asyncio.sleep(0.3)

    blind_spots = _mock_blind_spots(req.competitors) if MOCK_MODE else await detect_blind_spots({"competitors": req.competitors})
    await asyncio.sleep(0.3)

    cultural = _mock_cultural_moments(req.geography, "current") if MOCK_MODE else await map_cultural_moments({"geography": req.geography, "month": "current"})
    await asyncio.sleep(0.3)

    emotion = _mock_emotion_outcome() if MOCK_MODE else await emotion_outcome_chain({"goal": req.goal, "geography": req.geography})
    platform_trans = _mock_platform_translation("Own your transformation") if MOCK_MODE else await translate_platforms({"idea": emotion.content_format})
    risk = _mock_risk_radar() if MOCK_MODE else await score_risk({"campaign": req.dict()})

    return {
        "campaign_id": req.campaign_id,
        "brand_dna": dna.model_dump(),
        "blind_spots": [b.model_dump() for b in blind_spots],
        "cultural_moments": cultural.model_dump(),
        "emotion_outcome": emotion.model_dump(),
        "platform_translation": platform_trans.model_dump(),
        "risk_radar": risk.model_dump(),
        "health_score": {
            "overall": 84,
            "persona_platform_fit": 92,
            "message_clarity": 88,
            "timing_alignment": 85,
            "risk_score_inverted": 72,
            "rationale": "Strong persona-platform alignment and excellent cultural timing.",
        },
    }
