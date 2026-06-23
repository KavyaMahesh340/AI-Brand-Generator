// ─── Mock AI Responses ────────────────────────────────────────────────────────
// These simulate the Python FastAPI + Ollama responses.
// Replace with real API calls when Ollama is running.

export const mockBrandDna = (brand) => ({
  tone_archetype: ['Rebel', 'Caregiver', 'Sage', 'Jester', 'Hero'][Math.floor(Math.random() * 5)],
  colour_emotion: Math.random() > 0.5 ? 'warm/urgent' : 'cool/trustworthy',
  competitor_narrative_gap: `Most competitors in the ${brand.industry} space focus on features and price. The audience secretly wants to feel seen, not sold to. White space: brand identity and belonging.`,
  customer_core_aspiration: `To become the version of themselves that ${brand.industry === 'fashion' ? 'turns heads effortlessly' : 'leads with confidence and credibility'} — not just to buy a product.`,
  brand_voice_signature: ['bold', 'human', 'unapologetic'],
})

export const mockPersonas = (campaignGoal) => [
  {
    id: 'p1',
    name: 'Ambitious Arjun',
    age: 28,
    location: 'Chennai, Tamil Nadu',
    income: '₹8–15L/year',
    platform_preference: 'Instagram + LinkedIn',
    emotional_state: 'Aspirational but overwhelmed',
    morning_state: 'Rushed — opens Instagram while commuting',
    fear: 'Being stuck in mediocrity while peers surge ahead',
    language_phrases: ['"real results"', '"worth it"', '"shows in my work"'],
    jobs_to_be_done: 'Help me look competent and ahead of the curve without spending hours researching',
    emoji: '🚀',
    color: '#7C3AED',
  },
  {
    id: 'p2',
    name: 'Eco-Conscious Emily',
    age: 23,
    location: 'Bangalore, Karnataka',
    income: '₹4–8L/year',
    platform_preference: 'Instagram + TikTok',
    emotional_state: 'Idealistic, slightly anxious about authenticity',
    morning_state: 'Aspirational — pins aesthetic boards before work',
    fear: 'Being called out for performative sustainability',
    language_phrases: ['"feels right"', '"actually sustainable"', '"no greenwashing"'],
    jobs_to_be_done: 'Let me make choices that align with my values without sacrificing style',
    emoji: '🌱',
    color: '#10B981',
  },
  {
    id: 'p3',
    name: 'Pragmatic Priya',
    age: 35,
    location: 'Mumbai, Maharashtra',
    income: '₹20–40L/year',
    platform_preference: 'WhatsApp + LinkedIn',
    emotional_state: 'Time-poor but quality-conscious',
    morning_state: 'Focused — checks WhatsApp groups for recommendations',
    fear: 'Wasting money on something that overpromises',
    language_phrases: ['"just works"', '"my team loves it"', '"worth the premium"'],
    jobs_to_be_done: 'Give me certainty that this decision is correct so I can move on',
    emoji: '💼',
    color: '#F59E0B',
  },
]

export const mockBlindSpots = (competitors) => [
  {
    gap: 'Emotional validation over product specs',
    insight: `Every competitor talks about what their product does. Not one of them tells your audience they're already making the right choice. Own the "you're not wrong for wanting this" narrative.`,
    opportunity: 'Run a campaign series called "Trust Your Gut" — validating the audience\'s decision-making rather than justifying your product.',
  },
  {
    gap: 'Post-purchase identity, not pre-purchase persuasion',
    insight: 'All competitor ads stop at the "buy now" moment. The transformation story — who you become after using the product — is completely untapped in this category.',
    opportunity: 'UGC series: "3 months later" customer stories. No product shots. Only lifestyle outcomes.',
  },
  {
    gap: 'Regional language emotional resonance',
    insight: 'Zero competitors are creating emotionally resonant content in Tamil, Kannada, or Telugu. They treat vernacular as translation, not as culture.',
    opportunity: 'Native-language content that feels written by someone from the community, not translated from English. Use local idioms and cultural references.',
  },
]

export const mockCulturalMoments = (geography, month) => ({
  primary_moment: 'Pongal / Harvest Season',
  timing_advice: 'Launch 3 weeks before Pongal (Jan 14). Use harvest and abundance imagery.',
  language_tip: 'Tamil-language captions will outperform English by ~40% in this window.',
  moments: [
    { name: 'Pongal', date: 'Jan 14', relevance: 'high', note: 'Abundance, gratitude, new beginnings' },
    { name: 'Republic Day', date: 'Jan 26', relevance: 'medium', note: 'National pride — use carefully' },
    { name: 'Valentine\'s Day', date: 'Feb 14', relevance: 'low', note: 'Saturated — avoid unless it\'s core to your brand' },
  ],
  micro_trends: [
    '"Quiet Luxury" aesthetic gaining traction in Tier 1 cities',
    'Short-form regional language content up 3× on Instagram',
    'WhatsApp Status emerging as a discovery channel for 25–35 urban segment',
  ],
})

export const mockEmotionOutcome = () => ({
  target_emotion: 'Inspired + Urgent',
  content_format: 'Short-form video testimonials (45–60 seconds)',
  platform_recommendation: 'Instagram Reels in Tamil with a 7-second hook showing transformation',
  hook_formula: 'Problem → Relatable struggle → Unexpected shift → Aspirational outcome',
  cta: 'Save this and show it to yourself in 3 months',
})

export const mockPlatformTranslation = (idea) => ({
  linkedin: {
    platform: 'LinkedIn',
    tone: 'Thought-leader',
    content: `Most brands in this space are playing it safe. Here's what the data actually shows about what your audience wants from you in 2024.

We analysed thousands of comments, DMs, and reviews in this category. The answer wasn't about product features.

It was about identity.

Your customer doesn't want to buy ${idea}. They want to become the kind of person who uses ${idea}.

That's the campaign insight that changes everything. And it's available to anyone willing to stop talking about their product and start talking about their customer's transformation.

What does your brand stand for beyond the product? ↓`,
    word_count: 178,
    hashtags: [],
  },
  instagram: {
    platform: 'Instagram',
    tone: 'Visual story',
    content: `The moment it clicked for me was when I stopped asking "is this product good?" and started asking "who do I become when I use this?" ✨

That's the shift. That's the whole thing.

#BrandStory #MarketingInsights #BuildWithPurpose #ContentStrategy #MarketMind`,
    word_count: 52,
    hashtags: ['#BrandStory', '#MarketingInsights', '#BuildWithPurpose', '#ContentStrategy', '#MarketMind'],
  },
  tiktok: {
    platform: 'TikTok',
    tone: 'Hook-first',
    content: `[0–7s] "Stop selling the product. Start selling who they become." 
[7–20s] *Show the transformation, not the transaction. B-roll of real people in real moments.*
[20–35s] "3 months of using this and the most common thing they say isn't about the product — it's about themselves."
[35–45s] "That's the campaign. That's the brand."
*text overlay: "Brand > Product"*`,
    format: '45-second Reels/TikTok script',
    hook: 'Stop selling the product.',
  },
  whatsapp: {
    platform: 'WhatsApp',
    tone: 'Conversational',
    content: `Hey! Quick one — we've been running something a bit different this month and honestly, the response has blown us away 🙌

Instead of talking about what we sell, we've been sharing stories of what customers *become*. 

The saves and shares are 4× our normal posts. 

Curious to see it? Reply "SHOW ME" and I'll send you the top 3. What do you think — would this work for your audience? 👇`,
    word_count: 58,
  },
})

export const mockRiskRadar = () => ({
  cultural_sensitivity: {
    score: 3,
    label: 'Low Risk',
    reason: 'Campaign uses universal aspiration themes without cultural appropriation.',
    flag: false,
    alternative: 'Maintain continuous review of local idioms to ensure messaging remains universally understood.',
  },
  trend_expiry: {
    score: 5,
    label: 'Medium Risk',
    reason: '"Quiet luxury" micro-trend has ~4-month shelf life. Consider evergreen backup content.',
    flag: true,
    alternative: 'Root the campaign in identity transformation — this is an evergreen emotional driver.',
  },
  creative_fatigue: {
    score: 4,
    label: 'Medium Risk',
    reason: 'Short-form testimonial format saturates in ~3 weeks for daily audiences.',
    flag: true,
    alternative: 'Schedule format rotation at week 3: shift from testimonials to behind-the-scenes process content.',
  },
})

export const mockHealthScore = (campaign) => ({
  overall: 84,
  rationale: 'Strong persona-platform alignment and excellent cultural timing. Slightly elevated risk on trend expiry reduces the ceiling from 90+.',
  sub_scores: {
    persona_platform_fit: { score: 92, label: 'Excellent', note: 'Instagram Reels + Tamil content matches Arjun and Emily perfectly.' },
    message_clarity: { score: 88, label: 'Excellent', note: 'Core hook understandable in 4 seconds. Passes 5-second test.' },
    timing_alignment: { score: 85, label: 'Good', note: 'Pongal window is a strong cultural anchor. Risk: competitor activity peaks same period.' },
    risk_score_inverted: { score: 72, label: 'Fair', note: 'Trend expiry and creative fatigue flags pull this down. Mitigation plan included.' },
  },
})

export const mockEmpathySimulator = (persona, caption) => ({
  persona_name: persona.name,
  reaction: `As ${persona.name} (${persona.age}, ${persona.location}), reading this caption makes me feel ${persona.emotional_state.toLowerCase()}. `,
  emotional_response: 'Seen but slightly cautious',
  would_save: true,
  would_share: false,
  share_barrier: 'Feels a bit too polished for my personal feed. My followers would see it as an ad.',
  save_reason: 'I\'d revisit this when I\'m feeling low and need a reminder of why I\'m doing what I\'m doing.',
  suggested_edit: 'Add one imperfect, vulnerable sentence. Make it feel like it was written for me, not at me. Drop the last line — it feels like a hard sell.',
  engagement_prediction: 'High saves, medium comments, low shares without the edit. With the edit: high all three.',
})

export const MOCK_DELAY = (ms = 1500) => new Promise((res) => setTimeout(res, ms))
