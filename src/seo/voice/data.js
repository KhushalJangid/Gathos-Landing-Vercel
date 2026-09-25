// Programmatic language landing pages (Pattern 1F from the SEO plan).
//
// One template + a list of language descriptors = N pages. The template
// renders identically across languages but the data drives the unique
// content: speaker count, region, native name, sample script, and FAQs
// localized to common queries in that language community.
//
// Adding a new language is strictly additive. Drop a new entry, sitemap
// update, build. No template changes needed.

export const languages = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'hindi',
    language: 'Hindi',
    nativeName: 'हिन्दी',
    iso: 'hi',
    region: 'India and global Hindi-speaking diaspora',
    speakers: '600M+',
    metaTitle: 'Hindi Voice Cloning + TTS API · Native Quality · Gathos',
    metaDesc: "Clone any Hindi voice from a 30-second sample. Native cadence, regional accents, flat $18/month for unlimited generation. 600+ languages on the same key.",
    h1: 'Hindi voice cloning that sounds native.',
    sampleScript: "नमस्ते। आज मैं आपको एक नई कहानी सुनाने जा रहा हूं। यह कहानी एक छोटे से गाँव की है, जहाँ एक लड़की ने अपने सपनों को सच कर दिखाया।",
    sampleScriptTransliteration: "Namaste. Aaj main aapko ek nayi kahani sunaane jaa raha hoon. Yeh kahani ek chote se gaon ki hai, jahaan ek ladki ne apne sapnon ko sach kar dikhaaya.",
    valueProps: [
      'Native cadence and intonation, not the flat translated-English-into-Hindi sound that plagues most multilingual TTS providers.',
      'Regional accent control: Mumbai Hindi, Delhi Hindi, Lucknow Hindi all available. Pick the accent that matches your audience.',
      "Same voice clone reads English, Hindi, and any of the other 600+ languages Gathos supports. Build once, ship to multiple language markets.",
    ],
    useCases: [
      { t: 'Hindi YouTube channels', d: 'Voice your channel in your cloned voice in Hindi without re-recording.' },
      { t: 'Audiobook narration', d: 'Self-publish Hindi audiobooks at $18/month flat instead of paying ₹50,000+ per book to a narrator.' },
      { t: 'Course localization', d: 'Re-render your English course in Hindi for the Indian student audience without hiring voice actors.' },
      { t: 'Podcast trailers', d: 'Generate 60-second Hindi podcast trailers in your cloned voice for YouTube Shorts and Instagram Reels.' },
    ],
    faqs: [
      { q: 'Does Gathos really support native-quality Hindi?', a: 'Yes. Hindi is a first-class language in Gathos, with regional accent control and proper handling of Devanagari script. The output is widely indistinguishable from a native human reader for short-form content.' },
      { q: 'Can the same voice clone read English and Hindi?', a: 'Yes, this is the zero-shot multilingual feature. Upload one 30-second voice sample (in any language) and the clone reads any of the 600+ supported languages in your voice.' },
      { q: 'Which Indian languages does Gathos support beyond Hindi?', a: 'Tamil, Telugu, Marathi, Bengali, Gujarati, Punjabi, Kannada, Malayalam, Odia, Assamese, and Urdu are all first-class. Plus 100+ regional languages and dialects across South Asia.' },
      { q: 'How does this compare to Sarvam or Gnani?', a: 'Sarvam.ai and Gnani Vachana TTS are excellent India-focused providers. Gathos covers a broader language base globally and bundles image generation. For a pure-Indic-focused workflow, Sarvam is also a strong pick. For multilingual content that includes Hindi alongside English/Spanish/Portuguese, Gathos is more efficient.' },
      { q: 'What about pronunciation of English words in Hindi?', a: "Code-switching is handled · English words inside Hindi sentences are pronounced naturally. This is critical for tech/business content where English terms are common." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'tamil',
    language: 'Tamil',
    nativeName: 'தமிழ்',
    iso: 'ta',
    region: 'Tamil Nadu, Sri Lanka, Malaysia, Singapore, global diaspora',
    speakers: '85M+',
    metaTitle: 'Tamil Voice Cloning + TTS API · Native Quality · Gathos',
    metaDesc: "Tamil voice cloning with native intonation. Self-publish Tamil audiobooks, dub videos, voice your YouTube channel. Flat $18/month, 600+ languages.",
    h1: 'Tamil voice cloning with native intonation.',
    sampleScript: "வணக்கம். இன்று நான் உங்களுக்கு ஒரு புதிய கதையை சொல்லப் போகிறேன். இது ஒரு சிறிய கிராமத்தின் கதை.",
    sampleScriptTransliteration: "Vanakkam. Indru naan ungalukku oru pudhiya kadhaiyai sollap pogiren. Idhu oru chiriya graamathin kadhai.",
    valueProps: [
      'Native Tamil cadence with proper handling of long and short vowels (a critical distinction lost in most multilingual TTS).',
      'Same voice clone reads Tamil, English, and Hindi · useful for code-switching content common in South Indian media.',
      'Affordable for indie Tamil creators: flat $18/month covers full audiobook production, channel narration, and YouTube voiceover.',
    ],
    useCases: [
      { t: 'Tamil YouTube creators', d: 'Voice channels in your cloned voice without recording sessions.' },
      { t: 'Tamil audiobooks', d: 'Self-publish on Audible IN, Storytel, and Spotify for a fraction of human-narration cost.' },
      { t: 'Sri Lankan Tamil content', d: 'Same voice clone handles both Indian Tamil and Sri Lankan Tamil with accent variants.' },
      { t: 'Educational content', d: 'Localize courses and tutorials into Tamil for the South Asian education market.' },
    ],
    faqs: [
      { q: 'Does Gathos handle Tamil script correctly?', a: 'Yes. Tamil-script (தமிழ்) input is the standard. Romanized Tamil also works as a fallback. The TTS preserves long-vowel and short-vowel distinctions.' },
      { q: 'What about Sri Lankan Tamil vs Indian Tamil?', a: 'Both supported as accent variants. Pick the variant matching your audience. The voice clone keeps the speaker identity consistent across both.' },
      { q: 'Can the same clone read English and Tamil?', a: 'Yes. Upload one 30-second voice sample and the clone reads any of the 600+ supported languages.' },
      { q: 'How does this compare to Murf or PlayHT for Tamil?', a: 'Both Murf and PlayHT support Tamil but with limited voice options. Gathos zero-shot cloning means any voice you upload becomes a Tamil voice, with native cadence rather than translated English-style delivery.' },
      { q: 'What about Tamil podcast and YouTube use?', a: 'Common use case. Generate channel intros, episode trailers, and full episode narration in your Tamil cloned voice. Pair with the Gathos image-generation API for Tamil-text thumbnails.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'telugu',
    language: 'Telugu',
    nativeName: 'తెలుగు',
    iso: 'te',
    region: 'Andhra Pradesh, Telangana, global Telugu diaspora',
    speakers: '95M+',
    metaTitle: 'Telugu Voice Cloning + TTS API · Native Andhra/Telangana Accents · Gathos',
    metaDesc: "Telugu voice cloning with Andhra and Telangana accent variants. Audiobooks, YouTube channels, and dubbing in your cloned voice. Flat $18/month.",
    h1: 'Telugu voice cloning, native to your accent.',
    sampleScript: "నమస్కారం. ఈరోజు నేను మీకు ఒక కొత్త కథ చెప్పబోతున్నాను. ఇది ఒక చిన్న గ్రామంలోని కథ.",
    sampleScriptTransliteration: "Namaskaram. Eerojuna nenu meeku oka kotha kadha cheppabothunnaanu. Idhi oka chinna gramamlo katha.",
    valueProps: [
      'Andhra and Telangana accent variants (the two main regional Telugu varieties) both available. Pick by audience.',
      'Native cadence and proper handling of Telugu-script aspirated consonants that most multilingual TTS providers flatten.',
      'One flat $18/month for unlimited Telugu generation · meaningful at the scale Telugu creators ship at.',
    ],
    useCases: [
      { t: 'Telugu YouTube channels', d: 'One of the largest YouTube language audiences globally. Voice yours in your cloned voice.' },
      { t: 'Telugu audiobook production', d: 'Self-publish on Audible and Spotify for the Telugu reading audience.' },
      { t: 'Movie review and reaction channels', d: 'Generate fast voiceovers for the Telugu film commentary market without recording sessions.' },
      { t: 'Educational content', d: 'Course narration for the Telugu-speaking education market (one of the largest in India).' },
    ],
    faqs: [
      { q: 'Does Gathos support both Andhra and Telangana Telugu?', a: 'Yes, as accent variants. Gathos picks the appropriate variant from your sample voice or you can specify it in the prompt.' },
      { q: 'How does this compare to Sarvam.ai for Telugu?', a: 'Sarvam is excellent for Indic-only workflows. Gathos covers Telugu plus 600+ other languages on one flat subscription, useful for creators who also work in English, Hindi, or Tamil.' },
      { q: 'Will my cloned voice handle Telugu code-switching with English?', a: 'Yes. English words within Telugu sentences are pronounced naturally · important for tech, finance, and movie-review content.' },
      { q: 'Can I use this for movie commentary channels?', a: "Yes, very common use case. Telugu movie review channels benefit from the speed (no recording sessions) and the consistent voice across episodes." },
      { q: 'What format is the audio output?', a: 'MP3 by default at 44.1kHz. Configurable to WAV, OGG, or 22.05kHz for low-bandwidth streaming.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'brazilian-portuguese',
    language: 'Brazilian Portuguese',
    nativeName: 'Português do Brasil',
    iso: 'pt-BR',
    region: 'Brazil, Brazilian diaspora globally',
    speakers: '215M+',
    metaTitle: 'Brazilian Portuguese Voice Cloning + Dubbing · Gathos',
    metaDesc: "Voice clone in Brazilian Portuguese with São Paulo, Rio, and Nordeste accent variants. Audiobooks, dubbing, YouTube voiceover. Flat $18/month.",
    h1: 'Brazilian Portuguese voice cloning with regional accents.',
    sampleScript: "Olá. Hoje eu vou te contar uma nova história. É a história de uma pequena vila onde uma menina realizou seus sonhos.",
    valueProps: [
      'São Paulo, Rio (Carioca), and Nordeste accent variants. Brazilian audiences notice · non-native Portuguese sounds wrong instantly.',
      'Same voice clone reads English, Spanish, and Brazilian Portuguese · common for cross-LATAM creators.',
      'Affordable for the Brazilian creator economy at flat $18/month.',
    ],
    useCases: [
      { t: 'Brazilian YouTube creators', d: 'One of the fastest-growing YouTube markets. Voice channels and shorts in your cloned voice.' },
      { t: 'Audiobook self-publishing', d: 'Audible Brasil and Storytel both grow fast. Self-publish for $18 instead of R$ 8,000+ per book.' },
      { t: 'Course translation for Brazilian market', d: 'Re-render English courses in Brazilian Portuguese with your voice.' },
      { t: 'Video dubbing', d: 'Auto-dub English video into Brazilian Portuguese using the auto-dub-videos skill.' },
    ],
    faqs: [
      { q: 'Why specifically Brazilian Portuguese, not European Portuguese?', a: "They are different enough that Brazilian audiences immediately notice European Portuguese as foreign. Gathos supports both, but Brazilian Portuguese is a separate first-class language with its own accent variants." },
      { q: 'Which Brazilian accents does Gathos support?', a: "São Paulo (paulista), Rio (carioca), and Nordeste (Bahia / Recife / etc.) are first-class. The southern and central-west variants also work but with less accent specificity." },
      { q: 'How does this compare to Speechify or Eleven for Brazilian Portuguese?', a: "ElevenLabs supports Brazilian Portuguese well; Speechify is workable. Gathos differentiates on flat pricing and bundled image generation. For any team also generating thumbnails or product shots, Gathos consolidates the bill." },
      { q: 'Can I dub a YouTube video into Brazilian Portuguese?', a: 'Yes. Use the auto-dub-videos skill: upload the source video, pick Brazilian Portuguese, supply your voice clone. Output is a re-dubbed MP4 with synced timing.' },
      { q: 'Is the language model trained on Brazilian content?', a: 'Yes. The Brazilian Portuguese variant is trained on Brazilian content specifically · including media, audiobooks, and conversational corpora. The output sounds Brazilian, not Lisbon-Portuguese-with-an-accent-tweak.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'arabic',
    language: 'Arabic',
    nativeName: 'العربية',
    iso: 'ar',
    region: 'MENA, global Arabic-speaking diaspora',
    speakers: '420M+',
    metaTitle: 'Arabic Voice Cloning + TTS · MSA + Regional Dialects · Gathos',
    metaDesc: "Arabic voice cloning with MSA and regional dialect support (Egyptian, Levantine, Gulf, Maghrebi). RTL text-in-image too. Flat $18/month.",
    h1: 'Arabic voice cloning across MSA and regional dialects.',
    sampleScript: "مرحبا. اليوم سأحكي لك قصة جديدة. هذه قصة قرية صغيرة حيث حققت فتاة أحلامها.",
    sampleScriptTransliteration: "Marhaba. Al-yawm sa'ahki laka qissatan jadidah. Hadhihi qissat qaryah saghirah haythu haqqaqat fatatun ahlamaha.",
    valueProps: [
      'Modern Standard Arabic (MSA) plus regional dialects: Egyptian, Levantine (Lebanese/Syrian/Jordanian), Gulf, Maghrebi (Moroccan/Algerian/Tunisian).',
      'Right-to-left text-in-image rendering bundled at the same flat price · very few image-gen APIs render Arabic typography correctly.',
      "Same voice clone handles Arabic and English code-switching, important for MENA tech and business content.",
    ],
    useCases: [
      { t: 'Arabic YouTube and podcast', d: 'Voice channels in MSA or your local dialect, in your cloned voice.' },
      { t: 'Arabic audiobook production', d: 'Audible and Storytel both serve MENA. Self-publish for flat $18 instead of $1,500+ per book.' },
      { t: 'Course localization', d: 'Translate and voice English courses for the MENA student market.' },
      { t: 'Right-to-left poster and thumbnail design', d: 'Bundled image generation handles Arabic typography correctly · most providers garble it.' },
    ],
    faqs: [
      { q: 'Does Gathos support regional Arabic dialects?', a: "Yes. Modern Standard Arabic (MSA, the formal/written variant) plus four major dialect families: Egyptian, Levantine, Gulf, Maghrebi. Pick the one matching your audience." },
      { q: 'What about right-to-left text in images?', a: "Gathos image-generation handles RTL Arabic typography correctly · including proper letter joining, kashida, and diacritics. Most other image-gen providers garble Arabic text in images." },
      { q: 'Can I generate Arabic-language YouTube thumbnails with text?', a: 'Yes. The text-in-image strength of Gathos extends to Arabic and combined with the voice cloning, you can produce a complete Arabic-language video stack from one $18/month subscription.' },
      { q: 'How does this compare to dedicated MENA TTS providers?', a: 'Sarwa.ai and other regional providers do Arabic well. Gathos differentiates on language coverage (Arabic plus 600+ others) and flat pricing. For multilingual MENA content (Arabic + English + Hindi for the diaspora), Gathos is more efficient.' },
      { q: 'Are the dialects accurate enough for native ears?', a: "On short-form content, yes. On long-form (audiobook scale), there are still occasional regional inaccuracies that a native editor would catch. The Egyptian and Levantine variants are strongest; Maghrebi is workable but improving." },
    ],
  },
]

export function getLanguage(slug) {
  return languages.find((l) => l.slug === slug) || null
}
