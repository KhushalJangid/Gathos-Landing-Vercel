// Results-showcase data. Each entry describes one generated artefact that
// the landing page should display in the ResultsShowcase section.
//
// HOW TO SWAP IN A REAL OUTPUT
// ────────────────────────────
//  1. Generate the artefact through the Gathos API using the `prompt` field.
//  2. Drop the file at the `src` path under /public (e.g. /public/showcase/
//     images/img-01.webp).
//  3. Set `ready: true` on the entry. The component will render the real
//     file and the gradient placeholder will disappear.
//
// Until `ready: true` the component renders a styled gradient card with the
// prompt text — so the layout, animations, and spacing are testable on
// dev.gathos.com without any binary assets present.
//
// Gradient swatches map to the cream / matcha / slushie / ube / lemon /
// dragonfruit palette in tailwind.config.js to stay on-brand even as
// placeholders.

// Curated to 6 — the strongest "image with rendered text" pieces
// (Tokyo, YouTube thumbnail, editorial spread, Bauhaus poster) plus a
// cinematic and a stylised illustration to show range. Removed: coffee
// mug, app onboarding, infographic, sneaker banner — solid but they
// pushed the section past one viewport.
export const IMAGE_RESULTS = [
  {
    id: 'img-01',
    prompt: 'Vintage travel poster for Tokyo at night, neon kanji headline "電光石火" reading "lightning speed", thin sans-serif subtitle "Direct flights from $399 — book by March 12", retro 1960s offset-print palette',
    aspect: 'portrait', // 4:5
    swatch: 'ube',
    feature: 'Long-text rendering · poster',
    ready: true,
    src: '/showcase/images/tokyo-neon-travel-poster.webp',
  },
  {
    id: 'img-03',
    prompt: 'YouTube thumbnail: split-screen comparison, left side messy spreadsheet labelled "BEFORE", right side clean dashboard labelled "AFTER", bold red headline "I CUT MY REPORTING TIME BY 87%", high-contrast YouTube-thumbnail style',
    aspect: 'landscape',
    swatch: 'lemon',
    feature: 'Thumbnail · long headline',
    ready: true,
    src: '/showcase/images/youtube-thumbnail-before-after.webp',
  },
  {
    id: 'img-04',
    prompt: 'Editorial magazine spread for a finance feature, two-column layout, large pull quote "The next bull run will be measured in tokens, not tickers." set in serif italic, financial chart on the right, off-white paper texture',
    aspect: 'landscape',
    swatch: 'cream',
    feature: 'Editorial · serif typography',
    ready: true,
    src: '/showcase/images/editorial-finance-magazine-spread.webp',
  },
  {
    id: 'img-06',
    prompt: 'Cinematic still of a lone astronaut walking through a red Martian canyon at golden hour, helmet visor reflecting a small habitat dome in the distance, anamorphic 2.39:1 framing, film grain',
    aspect: 'landscape',
    swatch: 'dragonfruit',
    feature: 'Cinematic · 16:9',
    ready: true,
    src: '/showcase/images/martian-canyon-astronaut-cinematic.webp',
  },
  {
    id: 'img-09',
    prompt: 'Anime-style illustration, character sitting at a window with a laptop, rain outside, soft city lights bokeh, sticker on the laptop reads "ship daily", Makoto Shinkai colour grade',
    aspect: 'square',
    swatch: 'ube',
    feature: 'Anime · sticker text',
    ready: true,
    src: '/showcase/images/anime-rainy-window-illustration.webp',
  },
  {
    id: 'img-10',
    prompt: 'Minimalist Bauhaus-style poster for a design conference, three geometric shapes in primary colours, kerned sans-serif text reads "FORM · 2026 · Berlin / Studio Hall / June 12–14"',
    aspect: 'portrait',
    swatch: 'lemon',
    feature: 'Poster · multi-line kerning',
    ready: true,
    src: '/showcase/images/bauhaus-design-conference-poster.webp',
  },
]

// One of the image entries is "featured" — rendered larger as the hero
// tile of the masonry grid. Pick the one that most clearly demonstrates
// long-text-in-image (Gathos' sharpest differentiator).
export const FEATURED_IMAGE_ID = 'img-01'

export const VOICE_RESULTS = [
  {
    id: 'voice-01',
    language: 'English (US)',
    flag: 'US',
    voice: 'Josh · preset',
    script: 'Every voice that returns sounds like it meant to say that. Calibrated pacing, intent on every syllable, and the right inflection to land the close.',
    kind: 'preset',
    ready: true,
    src: '/showcase/audio/english-tts-preset-josh.mp3',
  },
  {
    id: 'voice-02',
    language: 'English (US)',
    flag: 'US',
    voice: 'Pixxy · preset',
    script: 'Three hundred thousand voices, six hundred languages, one single API. Your agent speaks — and it sounds exactly the way you want it to.',
    kind: 'preset',
    ready: true,
    src: '/showcase/audio/english-tts-preset-pixxy.mp3',
  },
  {
    id: 'voice-03',
    language: 'Hindi',
    flag: 'IN',
    voice: 'Sia · zero-shot clone',
    script: 'आपकी अपनी आवाज़, आपकी हर भाषा में। बस एक छोटा सैंपल अपलोड कीजिए — और छह सौ से ज़्यादा भाषाओं में आपकी ही आवाज़ बोलने लगती है, बिल्कुल स्वाभाविक।',
    kind: 'clone',
    ready: true,
    src: '/showcase/audio/hindi-voice-clone-sia.mp3',
  },
  {
    id: 'voice-04',
    language: 'Russian',
    flag: 'RU',
    voice: 'Egor · zero-shot clone',
    script: 'Один короткий образец — и Gathos мгновенно клонирует ваш голос на любом из шестисот языков. Звучит естественно, как живая речь.',
    kind: 'clone',
    ready: true,
    src: '/showcase/audio/russian-voice-clone-egor.mp3',
  },
  {
    id: 'voice-05',
    language: 'Spanish (Colombia)',
    flag: 'CO',
    voice: 'Serena · zero-shot clone',
    script: 'Una sola muestra y Gathos clona tu voz al instante. Habla en seiscientos idiomas — y suena exactamente como tú quieres que suene.',
    kind: 'clone',
    ready: true,
    src: '/showcase/audio/spanish-voice-clone-serena.mp3',
  },
  {
    id: 'voice-06',
    language: 'Italian',
    flag: 'IT',
    voice: 'Cornelia · zero-shot clone',
    script: 'Un solo campione e Gathos clona la tua voce all’istante. Parla in oltre seicento lingue, e suona proprio come la pensi.',
    kind: 'clone',
    ready: true,
    src: '/showcase/audio/italian-voice-clone-cornelia.mp3',
  },
]

// Each video showcases Gathos Creator's actual differentiator vs Veo /
// Seedance: text-to-video WITH AI-generated audio (lip-synced speech) in
// a single API call. The prompt's quoted dialogue is what the character
// speaks; the audio track is generated alongside the visual frames.
export const VIDEO_RESULTS = [
  {
    id: 'video-01',
    prompt: 'Nature b-roll: forest stream over smooth pebbles, dappled morning light, AI-generated water trickle + birdsong.',
    duration: '10s · 1280×736',
    swatch: 'slushie',
    ready: true,
    src: '/showcase/video/forest-stream-natural-audio-broll.mp4',
  },
  {
    id: 'video-02',
    prompt: 'Product demo: "This entire ad — script, voice, and video — was generated in under three minutes."',
    duration: '10s · 1280×736',
    swatch: 'slushie',
    ready: true,
    src: '/showcase/video/product-demo-creator-video.mp4',
  },
  {
    id: 'video-03',
    prompt: 'Hindi narrator: "मेरी आवाज़, मेरी भाषा — और सब कुछ एक ही API से।"',
    duration: '10s · 1280×736',
    swatch: 'ube',
    ready: true,
    src: '/showcase/video/hindi-speaker-creator-video.mp4',
  },
  {
    id: 'video-04',
    prompt: 'Pixar-style animated short: tiny cartoon robot rolling through a sunlit wildflower meadow, AI-generated whimsical score + soft mechanical whirring.',
    duration: '10s · 1280×736',
    swatch: 'matcha',
    ready: true,
    src: '/showcase/video/pixar-style-animated-short.mp4',
  },
  {
    id: 'video-05',
    prompt: 'Macro lifestyle: cracking an egg into a sizzling cast-iron pan, AI-generated egg-crack + continuous sizzle foley.',
    duration: '10s · 1280×736',
    swatch: 'lemon',
    ready: true,
    src: '/showcase/video/egg-sizzle-foley-macro-shot.mp4',
  },
  {
    id: 'video-06',
    prompt: 'Neo-noir cinematic: detective on a rain-soaked neon street at midnight. "It always ends the same way — with someone running, and someone else watching."',
    duration: '10s · 1280×736',
    swatch: 'dragonfruit',
    ready: true,
    src: '/showcase/video/neo-noir-detective-cinematic.mp4',
  },
]
