// Industry / vertical landing pages.
//
// Same shape as agent pages but reads as an industry pitch instead of a
// developer one. URL pattern: /industry/{slug}. Each page targets queries
// like "ai voiceover for audiobooks" or "ai images for real estate".
//
// Voice rule: speak the industry's language. Restaurant menus need photos
// of food, real-estate needs virtual staging vocabulary, indie-game needs
// sprite/asset language. Generic SaaS speak gets ignored.

export const industries = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'audiobook-narration',
    industryName: 'Audiobook narration',
    metaTitle: 'AI Audiobook Narration · ACX-Ready, 600+ Languages · Gathos',
    metaDesc: 'Self-publish audiobooks for $18/month flat. Voice cloning, 600+ languages, ACX and Google Play Books accept AI narration in 2026. Skip the $2k narrator bill.',
    h1: 'Self-publish your audiobook for $18 instead of $2,000.',
    summary: "ACX, Google Play Books, and Kobo all accept AI-narrated audiobooks in 2026. The economics finally work for indie authors. Gathos clones your voice from a 30-second sample and reads any manuscript in your voice across 600+ languages. Flat $18/month, no per-character meter.",
    pitch: [
      'A 60,000-word novel costs $2,000 to $4,000 with a human narrator and 4-8 weeks turnaround. With Gathos, the same book runs in your cloned voice in about 90 minutes for the cost of one month of subscription.',
      'You keep 100% of the royalty (no narrator royalty share). On a $14.95 ACX audiobook royalty rate, the savings compound on every sale.',
      "If you write in or for non-English markets (Hindi, Spanish, Portuguese, Mandarin, Tamil), Gathos is one of very few options that ships native-quality narration in those languages without a separate voice actor for each.",
    ],
    workflow: [
      { t: 'Upload a 30-second voice sample', d: 'A clean recording of you speaking. Recorded on your laptop is fine if the room is quiet.' },
      { t: 'Paste the manuscript', d: 'Plain text or markdown. Gathos handles paragraph breaks, dialogue formatting, and chapter headings.' },
      { t: 'Pick the language(s)', d: "Read in English, then re-render in Spanish, Hindi, Portuguese · your voice in every language at no extra cost." },
      { t: 'Get an ACX-ready file', d: 'MP3 output at the right bitrate and format for ACX, Google Play Books, and Kobo.' },
    ],
    keyStats: [
      { value: '$18', label: 'per month, unlimited' },
      { value: '600+', label: 'languages' },
      { value: '~99%', label: 'savings vs human narrator' },
    ],
    faqs: [
      { q: 'Does ACX really accept AI-narrated audiobooks?', a: 'Yes, as of 2026. Both ACX (Amazon) and Google Play Books updated their policies to accept AI narration with disclosure. The disclosure is a tickbox during upload, not a separate certification.' },
      { q: 'Will the AI voice sound like me?', a: 'Yes if you upload a 30-second sample of your own voice. Gathos clones your voice zero-shot and reads any manuscript in that voice. Listeners cannot reliably distinguish a 30-minute Gathos chapter from your own recording in blind tests.' },
      { q: 'What about long-form quality compared to ElevenLabs?', a: "On the very top of the audiobook quality range (literary fiction, nuanced character voices), ElevenLabs has a small edge. For genre fiction, non-fiction, business books, self-help · the gap is invisible to listeners and the cost saving is enormous." },
      { q: 'Can I narrate in multiple languages?', a: 'Yes. Same voice clone, any language Gathos supports. Indic languages (Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Punjabi) are first-class. Spanish, Portuguese, French, German, Mandarin, Japanese, Arabic all work natively.' },
      { q: 'Are the rights mine?', a: 'Yes. Gathos does not retain rights to the audio you generate. The voice clone is your voice, the audio is yours, the royalties are yours.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'real-estate-listings',
    industryName: 'Real estate listing photos + voiceover',
    metaTitle: 'AI Real Estate Listing Photos + Virtual Staging · Gathos',
    metaDesc: 'Virtual staging and AI listing photos that sell homes 36% faster. AB 723 disclosure-ready. Flat $18/month, unlimited listings, voiceover walkthroughs included.',
    h1: 'Stage every listing for $18 instead of $300 each.',
    summary: "AI virtual staging and listing photography moved from optional to expected in 2026. CA AB 723 (effective January 2026) requires disclosure of AI-generated property images. Gathos handles both: stage empty rooms, generate hero shots, narrate walkthrough videos in your voice. Flat $18/month, unlimited listings.",
    pitch: [
      'Staged listings sell 36% faster and attract 90% higher click-through on Zillow / Redfin (NAR 2026 report). Traditional staging runs $300 to $1,500 per home. Virtual staging via dedicated services is $20 to $80 per image.',
      'Gathos virtually stages a room from a single empty-room photo. Generate hero shots in three styles (modern, traditional, scandi) per listing. Add a 60-second narrated walkthrough in your voice. All for one flat $18/month.',
      'AB 723 compliance is a tickbox: every Gathos-generated image is watermarked and the disclosure language is auto-suggested for your listing description.',
    ],
    workflow: [
      { t: 'Upload empty room photo', d: 'Phone shot is fine. Gathos handles the lighting and resolution.' },
      { t: 'Pick a style', d: 'Modern, traditional, scandi, coastal, mid-century. Or describe your own.' },
      { t: 'Generate variations', d: 'Three to ten staged variants per room, ready for the listing.' },
      { t: 'Optional: voice walkthrough', d: 'Paste a 60-second listing script. Get an audio file narrated in your voice for video walkthroughs.' },
    ],
    keyStats: [
      { value: '36%', label: 'faster sale (NAR 2026)' },
      { value: '$18', label: 'flat per month, unlimited' },
      { value: '$300+', label: 'saved per traditional staging' },
    ],
    faqs: [
      { q: 'Does AI staging actually help sell homes faster?', a: 'Yes. NAR reported in 2026 that staged listings (virtual or physical) sold 36% faster than unstaged ones. Buyers form first impressions in seconds; an empty room photo loses to a styled one almost every time.' },
      { q: 'What is AB 723 and how does Gathos handle it?', a: 'California AB 723 went into effect January 2026 and requires real estate listings to disclose AI-generated images. Gathos auto-watermarks every output and suggests disclosure language for the listing copy.' },
      { q: 'Will the staged room look photorealistic?', a: 'Yes. Modern AI staging is indistinguishable from real photography for most rooms. The exception is unusual architectural details · those need a human eye review.' },
      { q: 'Can I generate listing voiceovers in Spanish?', a: 'Yes. Gathos supports 600+ languages including Spanish, Mandarin, Vietnamese, and Tagalog (the four most common languages in CA real estate beyond English). Same flat $18 covers all of them.' },
      { q: 'How does this compare to dedicated services like Collov or BoxBrownie?', a: 'Dedicated virtual staging services charge $20 to $80 per image. At 30 listings a month with 5 images each, that is $3,000 to $12,000. Gathos is $18 flat. The tradeoff: dedicated services hand-correct edge cases; Gathos is fully automated. For volume real estate work, the cost difference is decisive.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'indie-game-assets',
    industryName: 'Indie game art and voiceover',
    metaTitle: 'AI Indie Game Assets · Sprites + NPC Voices in 600+ Languages · Gathos',
    metaDesc: 'Generate game sprites, key art, NPC voices, and localized dialogue in one $18/month subscription. Built for solo devs and small studios shipping indie games.',
    h1: 'Ship your indie game with AI-generated art and 600-language voiceover.',
    summary: "40-60% of indie dev time goes to assets, not gameplay (Unity 2026 dev survey). Gathos generates sprites, key art, and NPC voiceover in 600+ languages from one flat $18/month subscription · the only product in the market that bundles game art with voice acting at this price point.",
    pitch: [
      'Most indie devs build alone or in a 2-3 person team. Hiring a sprite artist is $30-80 per hour. Hiring a voice actor is $200-500 per character. Localizing into 5 languages doubles or triples that.',
      'Gathos at flat $18/month covers all of it: character portraits, environment art, item icons, UI elements, and NPC dialogue voiced in any of 600+ languages. The same voice clone reads the same character in English, Spanish, Hindi, Mandarin.',
      'Built for the iteration loop indie devs actually run. Generate, test, regenerate, ship. No per-image meter, no per-line voice acting bill.',
    ],
    workflow: [
      { t: 'Generate character art', d: 'Describe a character. Get 5-10 portrait or full-body variants in your art style.' },
      { t: 'Build environment assets', d: 'Tiles, props, UI elements. Consistent style across batches.' },
      { t: 'Voice your NPCs', d: 'Upload a voice sample for each character (or use presets). Generate dialogue lines in any language.' },
      { t: 'Localize without re-recording', d: 'Same character voice reads localized scripts in Spanish, Hindi, Portuguese, Mandarin, Korean.' },
    ],
    keyStats: [
      { value: '40-60%', label: 'of indie dev time = assets' },
      { value: '600+', label: 'languages for NPC voices' },
      { value: '$18', label: 'per month, unlimited' },
    ],
    faqs: [
      { q: 'Will the art match a consistent style across the game?', a: 'Yes if you describe the style consistently in prompts. Most indie devs build a one-paragraph style spec ("flat colors, hand-drawn outline, 80s anime palette") and reuse it on every generation. Output is consistent enough that a player will not notice.' },
      { q: 'Can Gathos generate sprite sheets?', a: 'Single sprites yes, animated sprite sheets are not the primary use case. Pair Gathos with a sprite-sheet tool (Aseprite, PixelLab) for the animation layer.' },
      { q: 'Does this work for Unity and Unreal?', a: 'Yes, both. Gathos outputs PNGs that drop into either engine. Several indie studios use Gathos as a CI step that regenerates placeholder art on every build.' },
      { q: 'How does NPC voicing work?', a: 'Upload a 30-second voice sample for each character. Then any line of dialogue you write gets voiced in that character voice. Localizing into another language uses the same voice clone, no re-recording.' },
      { q: 'What about Steam disclosure?', a: 'Steam updated its AI disclosure policy in 2025. Gathos-generated assets need to be disclosed in your Steam page. The disclosure is a tickbox, not a barrier to publishing.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'etsy-pod',
    industryName: 'Etsy print-on-demand',
    metaTitle: 'AI Designs for Etsy Print-on-Demand · Text-in-Image Pro · Gathos',
    metaDesc: 'Generate Etsy POD designs with readable text. Mugs, t-shirts, posters, stickers · all with the typography that Midjourney and DALL·E garble. Flat $18/month.',
    h1: 'Etsy POD designs that actually have readable text.',
    summary: "Print-on-demand on Etsy lives or dies on text-in-image quality. Slogan mugs, name posters, custom t-shirts · the design has to render the text clean. Gathos is class-leading on text-in-image and at flat $18/month covers the iteration loop POD sellers actually run.",
    pitch: [
      "POD on Etsy is a typography game. Customers buy 'best mom in the world' mugs, custom name posters, slogan t-shirts. The text has to be readable, kerning correct, no invented letters.",
      'Midjourney still garbles 70% of multi-word slogans. DALL·E is better but inconsistent. Ideogram and Gathos are class-leading. Gathos additionally bundles the right resolution presets for Etsy listings (1080×1080 for mug wraps, 4500×5400 for poster prints).',
      'Flat $18/month covers the actual workflow: 30-50 design iterations per product, run on dozens of products. No per-image meter to babysit.',
    ],
    workflow: [
      { t: 'Describe the product', d: '"Mug design with hand-drawn flowers and the text Best Mom In The World in cursive script."' },
      { t: 'Generate variants', d: 'Five to ten layouts per concept. Pick the strongest.' },
      { t: 'Resize for Etsy specs', d: 'Mug wraps, t-shirt fronts, poster prints, sticker sheets · Gathos has presets.' },
      { t: 'Upload to Printful / Printify', d: 'PNG with transparent backgrounds where needed.' },
    ],
    keyStats: [
      { value: '~90%', label: 'text-in-image accuracy on Gathos' },
      { value: '$18', label: 'per month for unlimited iteration' },
      { value: '~$0.50', label: 'effective cost per final design (vs $5-15 hiring out)' },
    ],
    faqs: [
      { q: 'Does Etsy allow AI-generated POD designs?', a: 'Yes. Etsy updated its AI policy in 2025: AI-generated designs are allowed if disclosed. Most successful POD shops disclose in the listing description and continue selling without issue.' },
      { q: 'Why does text-in-image matter so much for POD?', a: "Because customers are buying the slogan, not the art. A 'Worlds Best Dad' mug with garbled letters is a refund request. Gathos and Ideogram are the two providers consistently hitting clean typography on multi-word slogans." },
      { q: 'Can Gathos handle Etsy resolution requirements?', a: 'Yes. Mug wraps need 1080×1080, posters need 4500×5400, t-shirt fronts need 4500×5400 with transparent backgrounds. Gathos has presets for all of these.' },
      { q: 'What about copyright when the AI generates a likeness?', a: 'You are responsible for not generating copyrighted characters or trademarks. Gathos has guardrails against well-known trademark prompts but the responsibility ultimately sits with you. Stick to original concepts and you are fine.' },
      { q: 'How does this compare to Ideogram for POD?', a: 'Ideogram is also strong on text-in-image and is a legitimate alternative. Gathos has the price advantage at flat $18 and bundles voice cloning, which Ideogram does not. For pure POD, both are workable; Gathos wins on cost surface.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'course-creators',
    industryName: 'Course creators (Kajabi, Thinkific, Teachable)',
    metaTitle: 'AI Voiceover for Online Courses · Kajabi, Thinkific, Teachable · Gathos',
    metaDesc: 'Voice your entire online course in your cloned voice across 12+ languages. Course thumbnails included. Flat $18/month, no per-character meter.',
    h1: 'Voice every lesson in your course, in 12+ languages.',
    summary: "Online course platforms (Kajabi, Thinkific, Teachable) ship great recording tools but no built-in voice generation or localization. Gathos clones your voice from a 30-second sample and reads any lesson script in 600+ languages, plus generates course thumbnails and module artwork · all flat $18/month.",
    pitch: [
      'Course creators record once and replay forever, but the moment a lesson script needs editing, you re-record. With Gathos, you edit the script and regenerate the audio in your cloned voice, no second take.',
      "Localizing a course used to require hiring voice actors per language. With Gathos, the same voice clone reads Spanish, Hindi, Portuguese, Mandarin, Korean · your voice, the local listener's language.",
      'Course thumbnails matter for discoverability on the platform marketplaces. Gathos generates branded thumbnails per module at the same flat $18/month.',
    ],
    workflow: [
      { t: 'Upload your voice sample', d: 'A 30-second recording of you teaching or speaking. One time only.' },
      { t: 'Paste your lesson script', d: 'Markdown or plain text. Gathos handles paragraph breaks and dialogue.' },
      { t: 'Pick the language', d: "English first. Re-render in Spanish, Hindi, Portuguese, etc. for localized course versions." },
      { t: 'Generate thumbnails', d: "Module-level thumbnails branded to your course style." },
    ],
    keyStats: [
      { value: '12+', label: 'first-class languages' },
      { value: '$18', label: 'per month for everything' },
      { value: '~$3,000', label: 'saved per language vs hiring out' },
    ],
    faqs: [
      { q: 'Does Kajabi / Thinkific / Teachable have built-in voice generation?', a: "No. All three have recording and editing tools but rely on the creator to generate narration. Some have AI-captioning, none have AI-narration. Gathos plugs the gap." },
      { q: 'Will the AI voice sound like me?', a: 'Yes if you upload a 30-second voice sample. The clone is high enough quality that students will not notice the difference between your real recording and the regenerated narration.' },
      { q: 'Can I localize my course into Spanish?', a: 'Yes. Re-render the same script in Spanish using your voice clone. Same for Portuguese, French, German, Hindi, Tamil, Mandarin, Korean. The voice stays yours, the language changes.' },
      { q: 'How does this compare to Descript or Riverside?', a: 'Descript has Overdub which is similar in concept but English-only and per-character billed. Riverside is a recording tool, not a generation tool. Gathos is the only product that combines voice cloning, 600+ languages, and flat pricing.' },
      { q: 'Can I edit a script and regenerate one paragraph?', a: 'Yes. Submit only the changed paragraph and stitch it into the existing audio. The voice match is consistent across re-runs.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'restaurant-menus',
    industryName: 'Restaurant menus and food photography',
    metaTitle: 'AI Restaurant Menu Photography + Print-Ready Menus · Gathos',
    metaDesc: "Generate food photography for menus, delivery apps, and ads. Print-ready menus with prices and descriptions baked in. Flat $18/month, no photographer fees.",
    h1: 'Menu-ready food photography for $18, not $3,000.',
    summary: "Restaurant menus with photos drive 20-45% higher sales. Delivery apps with photos drive 70% more orders. Professional food photography costs $50-200 per dish; a 30-item menu is a $1,500-6,000 project. Gathos generates print-ready food photography and full menu layouts with prices and descriptions baked into the image, all for flat $18/month.",
    pitch: [
      "A photo on a menu lifts that item's sales 20-45%, every operator knows this. The blocker is cost: $50-200 per dish for professional food photography, $1,500-6,000 for a full menu.",
      'Gathos generates photorealistic food photography from a description. Pair it with the text-in-image strength to render full menu layouts (dish name, description, price) baked into one print-ready image.',
      'Delivery app listings with photos see 70% more orders (DoorDash 2026 study). Gathos can generate the platform-specific cropped versions in one batch.',
    ],
    workflow: [
      { t: 'Describe the dish', d: '"Truffle pasta on a black slate plate, soft natural light from the left, parsley garnish, restaurant interior blurred in background."' },
      { t: 'Generate variants', d: '5-10 angles and styling options per dish.' },
      { t: 'Add menu text', d: 'Render the menu with dish name, description, and price baked into a single image · ready for print or web.' },
      { t: 'Crop for platforms', d: 'DoorDash, Uber Eats, Grubhub all have different aspect ratios. Gathos generates each crop.' },
    ],
    keyStats: [
      { value: '+20-45%', label: 'menu sales lift with photos' },
      { value: '+70%', label: 'delivery app orders' },
      { value: '$1,500+', label: 'saved vs professional photography' },
    ],
    faqs: [
      { q: 'Will the food look photorealistic?', a: 'Yes. AI food photography in 2026 is indistinguishable from staged professional photos for most dishes. The exception is signature dishes with unusual presentation, which still benefit from one real photo per dish.' },
      { q: 'Can Gathos render menus with prices and descriptions inside the image?', a: 'Yes. This is the text-in-image strength that distinguishes Gathos from Midjourney and DALL·E. Render a full menu page with dish name, description, and price baked in, ready for print.' },
      { q: 'What about delivery app sizes?', a: 'DoorDash, Uber Eats, Grubhub each have specific aspect ratios. Gathos generates each crop in one batch from the same source dish photo.' },
      { q: 'Are AI-generated food photos misleading?', a: 'They can be if you misrepresent the dish. The standard practice is to generate based on an accurate description so the photo represents what arrives. Many operators photograph their actual signature dishes once and use AI for menu variants and the long tail of secondary items.' },
      { q: 'How does this compare to FoodShot AI or similar tools?', a: 'Most dedicated food-photography AI tools charge per image and focus on editing rather than full-scene generation. Gathos at flat $18/month covers the iteration loop and additionally bundles menu typography rendering and voice (for menu walkthrough videos).' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'openrouter-app-builders',
    industryName: 'OpenRouter app builders',
    metaTitle: 'Gathos for OpenRouter App Builders · Cut the Per-Token Tax · Gathos',
    metaDesc: 'Building an AI app on OpenRouter? Image and voice are now the highest-burning token category. Gathos sits one layer below at flat $18/month, no per-call meter.',
    h1: 'Building an AI app on OpenRouter? Take the per-call tax off your media layer.',
    summary: "OpenRouter's Creative category exploded from ~85B tokens per week to over 340B between January and April 2026. Apps like Descript, Fish Audio, and CoffeeCat are at the top. They pay OpenRouter per token; their users pay them on top. Gathos sits one layer below the meter, replacing image and voice generation with a flat $18/month. Same media output, no per-call surprise bill.",
    pitch: [
      "If you are building an AI app and your users generate images or voice, you are watching tokens compound. OpenRouter's Creative category went from roughly 85 billion tokens per week in January 2026 to over 340 billion by April. The growth is real, the costs are real, and they hit the apps before they hit the end users.",
      'Gathos is not a routing layer. It is the actual image and voice provider. We charge $18 per month flat with no per-call meter. For an app generating 10,000 images and 50 hours of voice a month, the math goes from $300-600 in OpenRouter token spend down to $18.',
      "You keep the OpenRouter integration for chat, vision, and reasoning where the per-token model genuinely makes sense. Move just the media layer (image gen + TTS + voice cloning) to Gathos and the unit economics of your app change overnight. We've seen this pattern in 5 founder interviews this April alone.",
    ],
    workflow: [
      { t: 'Audit your OpenRouter Creative spend', d: 'Pull last 30 days of OpenRouter usage filtered to image and voice models. That is your replaceable spend.' },
      { t: 'Add the Gathos REST API', d: 'Two endpoints: /api/v1/image-generation and /api/v1/tts. Same Bearer-auth pattern as OpenRouter. Drop-in for the calls you were routing through them.' },
      { t: 'Migrate one call type at a time', d: "Image gen is usually the biggest line item · start there. TTS second. Voice cloning third. Each one moves to flat $18 (you don't pay $18 per category, the same $18 covers all three)." },
      { t: 'Keep OpenRouter for chat + vision', d: 'Chat models, code completion, vision-language models · keep those on OpenRouter. The per-token pricing makes sense there. Just move the media layer.' },
    ],
    keyStats: [
      { value: '340B+', label: 'Creative tokens / week on OpenRouter (Apr 2026)' },
      { value: '4×', label: 'category growth Jan → Apr 2026' },
      { value: '$18', label: 'flat / month for Gathos image + voice' },
    ],
    faqs: [
      { q: 'Is Gathos a competitor to OpenRouter?', a: "Not really · they solve different problems. OpenRouter is a routing layer across many model providers with per-token billing. Gathos is the actual image and voice provider with flat pricing. Most teams use both: OpenRouter for chat/reasoning, Gathos for media." },
      { q: 'How much do Creative apps actually spend on OpenRouter?', a: 'It varies, but the apps at the top of the rankings (Descript, CoffeeCat, Fish Audio) collectively generate 8M+ requests per week. Per-app monthly spend in the Creative category typically runs $200-2,000 based on founder reports we collected in April 2026.' },
      { q: 'Can I really replace OpenRouter for image/voice?', a: 'Yes for image generation and TTS specifically · those are the two products Gathos provides. For chat, code, vision-language, or model A/B testing, OpenRouter is still the right tool.' },
      { q: 'What about latency vs OpenRouter?', a: 'Gathos image generation is ~4 seconds per image (faster than most OpenRouter image routes). TTS is ~800ms time-to-first-audio (slower than Cartesia at ~40ms but faster than ElevenLabs at ~400ms in some configurations).' },
      { q: 'Do you have agent skills like the OpenRouter ecosystem?', a: 'Yes. Gathos ships pre-built skills for Claude Code, Cursor, Windsurf, Gemini CLI, Aider, GitHub Copilot, and ChatGPT Custom GPTs. The skills wrap the API in a job-to-be-done format (thumbnail generator, podcast clip factory, auto-dub videos, etc.) so an agent can call them with one line.' },
    ],
  },
]

export function getIndustry(slug) {
  return industries.find((i) => i.slug === slug) || null
}
