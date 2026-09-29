import { SITE_URL } from '../../lib/urls.js'
// Job-to-be-done skill pages.
//
// Each entry drives one page at /skills/{slug}. The shape is designed so
// adding a new page is strictly additive: drop a new object, register the
// slug in sitemap.xml, done. The SkillPage template renders everything.
//
// Voice: human, concrete, no em-dashes. Numbers beat adjectives. Examples
// beat explanations. Every page names Gathos by name at least 5 times (so
// LLM citations pull the brand name, not a description).

export const skills = [

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'text-to-video-api',
    eyebrow: 'Creator video API',
    h1: 'Text-to-video API with generated audio for $45/month.',
    metaTitle: 'Text-to-Video API with Audio — Creator Plan $45/mo · Gathos',
    metaDesc: 'Generate short text-to-video clips with AI audio through the Gathos Creator API. Async REST jobs, optional Styles, MP4 output, and Pro APIs included.',
    summary: 'The job: your agent or app needs to turn a prompt into a short video with generated audio. Gathos Creator gives you a text-to-video endpoint, optional Styles, async job polling, and base64 MP4 output, plus the same image generation and TTS APIs included in Pro.',
    samplePrompt: 'Create a 5-second video: A founder demos an AI API dashboard on a laptop in warm studio light. Confident generated audio explains: "Ship image, voice, and video from one API." Style: cinematic SaaS launch.',
    problemParas: [
      'AI video is easy to demo and annoying to productize. A model call is only one piece: you still need auth, user tiers, queue handling, polling, retries, output storage, and a way to pair the clip with thumbnails or narration.',
      'Gathos Creator packages that workflow for builders. The public launch exposes text-to-video with generated audio only, so the UI stays simple: prompt, optional negative prompt, dimensions, frame count, seed, and optional Styles. No mode picker, no image URL, no audio URL.',
      'The result is practical for short product clips, social teasers, lesson explainers, and agent-generated media assets. Your app submits a job, polls every 5-10 seconds, then saves the returned MP4. Image generation and TTS stay available through the same Gathos account.',
    ],
    workflowSteps: [
      { t: 'Create a Creator video key', d: 'Upgrade to Creator and create a vid_live API key from the dashboard. Creator includes the Pro image and TTS APIs.' },
      { t: 'Submit a text-to-video job', d: 'POST a prompt to /api/v1/video-generation. The server hardcodes text-to-video mode and keeps the request body minimal.' },
      { t: 'Poll every 5-10 seconds', d: 'Use the returned job_id with /api/v1/video-generation/jobs/{job_id}. Responses may include eta_seconds, estimated_completion_time, queue_position, and queue_depth.' },
      { t: 'Save the MP4 result', d: 'When the job completes, decode video_base64 as video/mp4 and write it to disk, storage, or your app media library.' },
    ],
    priceTable: {
      headers: ['Approach', 'Monthly cost', 'Audio included', 'Image + TTS included'],
      rows: [
        ['Gathos Creator', '$45/month', 'Yes', 'Yes'],
        ['Direct video model API', 'Usage-based or provider-plan dependent', 'Depends on model', 'No'],
        ['Video API + ElevenLabs + image model', 'Usually multiple bills', 'Yes, via separate product', 'Separate integrations'],
        ['Manual editor workflow', 'Hours of labor per clip', 'Manual voiceover', 'Manual assets'],
      ],
    },
    faqs: [
      { q: 'Is this text-to-video only?', a: 'Yes. For the current launch, Gathos exposes only text-to-video with generated audio. Do not build UI for image-to-video or audio-conditioned modes yet.' },
      { q: 'What does Styles mean?', a: 'Styles are optional presets returned by the styles endpoint. Show the style name in your UI and send that same name as the style value. Gathos resolves the internal preset file and trigger text automatically.' },
      { q: 'What video size should I use?', a: 'The default is 1280 x 736, with dimensions divisible by 32. Keep defaults unless your product has a specific aspect-ratio need.' },
      { q: 'How long does generation take?', a: 'A default 121-frame job is typically around 85-95 seconds after warm-up. A smaller 41-frame job is faster, often around 40-60 seconds. Queued and processing jobs may include approximate ETA fields.' },
      { q: 'What if I request an invalid video frame count?', a: 'Send the numeric frame count you want. Gathos snaps it to the nearest valid LTX frame count between 9 and 513 automatically, for example 120 becomes 121 and 240 becomes 241.' },
      { q: 'Can Pro users access video?', a: 'Video is part of the Creator plan. Pro keeps unlimited image generation and TTS; Creator adds the video endpoint and video API keys.' },
    ],
    related: ['youtube-thumbnails', 'ai-voiceover-loom', 'podcast-clip-factory'],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'youtube-thumbnails',
    eyebrow: 'Creator workflow',
    h1: 'Generate 100 YouTube thumbnails a week for $18/month.',
    metaTitle: 'YouTube Thumbnail Generator API — $18/month unlimited · Gathos',
    metaDesc: 'Generate click-through YouTube thumbnails with readable text, bold faces, and consistent channel style. Flat $18/month, unlimited, no per-image cost.',
    summary: 'The job: you run a YouTube channel and you need a fresh thumbnail for every video. Stock-photo subscriptions and Midjourney cost money per image. Gathos gives you unlimited generation at a flat $18/month, plus it can actually render readable text inside the image.',
    samplePrompt: 'Bold YouTube thumbnail for a video titled "I built a $10k app in 72 hours". Orange background, a surprised-looking developer on the left, huge yellow text "72 HOURS" on the right. Arrow pointing at the text. Cinematic lighting.',
    problemParas: [
      'Thumbnails are the single biggest CTR lever on YouTube. Most creators spend 30 to 60 minutes per thumbnail in Photoshop, or pay a freelancer $20 to $50 per thumbnail. A channel that publishes daily burns roughly $600 a month on thumbnails alone.',
      "Text-rendering is the real blocker. Midjourney, DALL·E, and older Stable Diffusion models produce garbled letters when you ask for words inside the image. That's why creators still pay humans: to layer the text manually after.",
      'Gathos runs a model that handles text-in-image natively. You describe the layout in a single sentence and it comes back with the words rendered correctly. No Photoshop step. No freelancer.',
    ],
    workflowSteps: [
      { t: 'Install the skill', d: ("Run `curl -sL " + SITE_URL + "/skills/youtube-thumbnails.md` and paste the output into Claude Code, Cursor, or your agent of choice. That's the whole install.") },
      { t: 'Describe the video', d: 'Give your agent the video title and one sentence of context. The skill turns that into a detailed prompt and calls the Gathos image API.' },
      { t: 'Get a thumbnail back in ~4 seconds', d: 'You get a 1280×720 PNG ready to upload. If you want variations, say "three versions with different color schemes" and the skill runs three calls.' },
      { t: 'Iterate in plain English', d: 'Ask for "bigger text", "different face", "move the logo up" — the agent rewrites the prompt and regenerates.' },
    ],
    priceTable: {
      headers: ['Tool', 'Per 100 thumbnails/month', 'Per 500 thumbnails/month', 'Text-in-image'],
      rows: [
        ['Gathos (Pro)', '$18 flat', '$18 flat', 'Yes, native'],
        ['Midjourney (Standard)', '$30 + manual text', '$60 + manual text', 'Poor'],
        ['DALL·E 3 via API', '$4 + manual text', '$20 + manual text', 'Decent'],
        ['Freelancer (Fiverr)', '$500 to $2,000', '$2,500 to $10,000', 'Yes'],
      ],
    },
    faqs: [
      { q: 'Can the thumbnails have readable words inside the image?', a: 'Yes. Gathos uses an image model tuned for text-in-image (long or short strings, uppercase or title case). DALL·E and Midjourney are weak here; it is the #1 reason creators switch.' },
      { q: 'What aspect ratio do I ask for?', a: 'YouTube thumbnails are 1280×720. Ask for "1280 by 720" in your prompt, or configure the skill once with width and height defaults.' },
      { q: 'Does it work on shorts as well?', a: 'Yes. Ask for 1080×1920 (vertical) and the same prompt style works. Pair with the /skills/product-explainer-reels flow if you also want the video assembly.' },
      { q: 'How many thumbnails can I generate per day?', a: 'Pro gets a fair-use 6-hour window cap (so a runaway script cannot blow up GPU cost), but daily is effectively unlimited for normal creator use. A daily publisher will never hit the cap.' },
      { q: 'Can I match my channel style across every video?', a: 'Yes. Put your channel style rules (color palette, logo placement, font character) in a single system prompt and the agent keeps them on every call. That is why it is a skill and not a one-shot prompt.' },
    ],
    related: ['shopify-product-shots', 'ai-voiceover-loom', 'podcast-clip-factory'],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'shopify-product-shots',
    eyebrow: 'Ecommerce workflow',
    h1: 'Bulk product shots for Shopify. One flat bill.',
    metaTitle: 'Shopify Product Shot Generator — Unlimited AI Images for $18/mo · Gathos',
    metaDesc: 'Generate consistent on-model and flatlay product shots for a Shopify catalog. Upload a SKU, get 20 lifestyle variants. Flat $18/month. No per-image cost.',
    summary: 'Small Shopify stores spend $200 to $1,500 per SKU on photography. With Gathos you upload one reference shot, describe the scene, and get 20 clean variants: flatlay, on-model, lifestyle, seasonal. $18/month flat, no per-image cost.',
    samplePrompt: 'Product photo of a matte black stainless-steel water bottle on a sunlit kitchen counter. Morning light from the left, soft shadow, eucalyptus stems in a glass vase blurred in the background. Muji-aesthetic. 1024x1024, photorealistic, sharp focus on the bottle.',
    problemParas: [
      "Catalog photography is the hidden cost of running a Shopify store. You launch 30 SKUs, you need 5 shots each, at $50 a shot that's $7,500 before you sell anything. Photographers also take two to four weeks, which kills seasonal drops.",
      'AI image generation is ready for this, but only if the model can: hold product color accurately, keep the SKU consistent across angles, and render text on packaging. Gathos handles the first two out of the box and is the strongest publicly-available model on the third.',
      "Workflow is: upload one hero shot, describe the scenes you want, get back 20 shots that all look like the same product. No turntable, no lightbox, no re-shoot. When you launch a new colorway, it's five minutes of generation, not a half-day in a studio.",
    ],
    workflowSteps: [
      { t: 'Install the skill', d: 'Copy the Shopify product-shots skill into your agent. Takes one line of curl.' },
      { t: 'Feed it a CSV of SKUs', d: 'Columns are: sku, name, reference_image_url, desired_scenes. The agent loops.' },
      { t: 'Get a folder back', d: 'For each SKU you get a numbered folder with 20 variants. Filenames are human-readable: sku-lifestyle-01.png, sku-flatlay-03.png.' },
      { t: 'Drop into Shopify', d: 'Use the Shopify CLI or the Admin API to attach the images to the variants. The skill includes a ready-to-copy upload script.' },
    ],
    priceTable: {
      headers: ['Approach', '30 SKUs × 5 shots', '100 SKUs × 10 shots', 'Time to ship'],
      rows: [
        ['Gathos (Pro)', '$18 flat', '$18 flat', 'Same day'],
        ['Local product photographer', '$3,000 to $7,500', '$15,000 to $40,000', '2 to 4 weeks'],
        ['Fiverr flat-lay service', '$450 to $900', '$3,000 to $6,000', '1 to 2 weeks'],
        ['Midjourney + Photoshop', '$30 + 20 hours labor', '$60 + 80 hours labor', '3 to 7 days'],
      ],
    },
    faqs: [
      { q: 'Will the product look identical across 20 shots?', a: 'Consistency depends on the prompt. Use the same hero image as a reference and describe the scene variations (lighting, surface, background). Color drift on 20 shots is usually under 5%, which is well within Shopify-catalog tolerance. For pixel-identical shots, use a single hero and regenerate the background.' },
      { q: 'Can it handle brand color accurately?', a: 'Yes — give a hex code in the prompt. "A matte bottle in exactly #1A1A1A black" is the phrasing that works.' },
      { q: 'What about product labels and readable text?', a: 'Gathos is the strongest widely-available model at text-in-image. You can generate a full product-mockup with the real brand name rendered on the packaging.' },
      { q: 'Does this work for apparel?', a: 'Yes. On-model apparel is the #2 use case (after CPG). The skill includes pose presets (front, 3/4, back, detail shot).' },
      { q: 'How do I keep a consistent look across my whole store?', a: 'Put the look rules (palette, lighting direction, surface) in the skill config once. Every call inherits them. That is how you build a catalog that feels authored by one photographer.' },
    ],
    related: ['youtube-thumbnails', 'etsy-listing-images', 'ad-creative-variants'],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-voiceover-loom',
    eyebrow: 'Async video',
    h1: 'AI voiceover for Loom and screen recordings. 600+ languages.',
    metaTitle: 'AI Voiceover for Loom Videos — Zero-Shot Voice Cloning · Gathos',
    metaDesc: 'Record a script once, generate voiceover in 600+ languages with your own cloned voice. Perfect for async product demos and internal training videos.',
    summary: 'Loom videos are the backbone of remote teams. The one thing that kills them: you cannot re-record when you want to tweak the script, and you cannot ship them in Spanish or Hindi without a second take. Gathos clones your voice from a 30-second sample and speaks any script in 600+ languages.',
    samplePrompt: 'Clone my voice from voice-sample.wav. Then read this script in English, Hindi, and Spanish: "Hey team, quick update on the Q2 roadmap. We shipped the billing v2 migration last week and now we are focused on three things."',
    problemParas: [
      "Async communication is how distributed teams operate. But re-recording a 4-minute Loom every time the script changes is a 20-minute tax. And the moment you need to ship the same content in Spanish or Hindi for a different office, you either hire voice talent or settle for subtitles that no one reads.",
      "Zero-shot voice cloning changes the math. You upload a 30-second voice sample one time. From then on, any script you type is read in your voice, in any language Gathos supports. The clone handles your accent, cadence, and emotional range without a re-take.",
      'The Gathos zero-shot TTS model covers 600+ languages. English, Hindi, Spanish, Portuguese, Mandarin, Arabic, Japanese are first-class. Underrepresented languages like Telugu, Marathi, Swahili, and Gujarati work well too.',
    ],
    workflowSteps: [
      { t: 'Upload a 30-second voice sample', d: 'Any clean clip of you speaking. Record on your laptop mic in a quiet room. Save as WAV or MP3.' },
      { t: 'Install the skill', d: 'One curl line in your agent. The skill wires the clone to a TTS job and stitches the audio onto a Loom export.' },
      { t: 'Paste your script', d: 'Type the script. Mark the language. Submit. You get back an MP3 in about 8 seconds for a 2-minute script.' },
      { t: 'Overlay on your screen recording', d: 'The skill includes an ffmpeg snippet that strips the original audio and drops in the new track.' },
    ],
    priceTable: {
      headers: ['Tool', '50 voiceovers/month', 'Voice cloning', 'Languages'],
      rows: [
        ['Gathos (Pro)', '$18 flat', 'Zero-shot', '600+'],
        ['ElevenLabs (Creator)', '$22 for 100k chars', 'Instant Voice Clone', '32'],
        ['PlayHT (Pro)', '$31.20 for 600k chars', 'Instant Voice Clone', '142'],
        ['Hiring a VO artist', '$1,500 to $5,000', 'N/A', 'Per language'],
      ],
    },
    faqs: [
      { q: 'How long should my voice sample be?', a: '30 seconds of clean audio is the floor. 60 to 90 seconds is the sweet spot. Longer does not help; clean audio matters more than length.' },
      { q: 'Can I change the language after I clone my voice?', a: 'Yes — this is the point of zero-shot. The same clone speaks any of the 600+ supported languages. Accent quality on the target language depends on the model; Hindi, Spanish, Portuguese, English are near-native.' },
      { q: 'How fast is generation?', a: 'About 4 seconds of audio per 1 second of wall-clock time. A 2-minute Loom voiceover is ready in about 30 seconds.' },
      { q: 'Will the clone sound robotic?', a: 'No. The 2026 zero-shot models are broadly considered indistinguishable from a studio recording for short clips. Long-form audiobook narration is where artifacts start to show; for a 2 to 5 minute Loom you will not notice.' },
      { q: 'Is my voice data used to train the model?', a: 'No. Gathos does not train on user voice samples. The sample is used for inference only and can be deleted on request.' },
    ],
    related: ['podcast-clip-factory', 'auto-dub-videos', 'course-slide-deck'],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'auto-dub-videos',
    eyebrow: 'Video localization',
    h1: 'Auto-dub any video into 600+ languages with your own voice.',
    metaTitle: 'Auto-Dub Videos — AI Video Dubbing into 600+ Languages · Gathos',
    metaDesc: 'Upload an English video, get dubbed versions in Hindi, Spanish, Portuguese, French, and 600+ more — in your own cloned voice. Flat $18/month on Gathos.',
    summary: 'You have a 10-minute video in English. You want Hindi, Spanish, and Portuguese versions without hiring three voice actors and a translator. Upload it to Gathos: the skill transcribes, translates, re-reads the translation in your cloned voice, and re-aligns to your on-screen timing.',
    samplePrompt: 'Dub input.mp4 from English into Hindi and Spanish. Use the voice clone from voice-sample.wav. Keep the original music. Output two files: input-hi.mp4 and input-es.mp4.',
    problemParas: [
      "YouTube's multi-language audio feature rewards channels that ship dubbed versions: your reach effectively doubles when you add Hindi or Spanish. But dubbing a single 10-minute video the traditional way takes 5 to 12 hours, costs $200 to $800 per language, and the voice never sounds like you.",
      'Full auto-dubbing is a pipeline: transcribe → translate → voice-clone → re-read → align → mux. Doing it yourself means wiring up Whisper, DeepL, a TTS API, and ffmpeg. Most creators never ship because step 3 is where off-the-shelf TTS sounds wrong for their voice.',
      'The Gathos auto-dub skill bundles all five steps. You give it an mp4 and a voice sample; it hands back a new mp4 with dubbed audio in any target language. Your voice, your timing, their language.',
    ],
    workflowSteps: [
      { t: 'Upload your video + voice sample', d: 'mp4 or mov, any length. Voice sample is a 30-second WAV.' },
      { t: 'List target languages', d: 'Say "dub into Hindi, Spanish, Portuguese, French". The skill runs all four in parallel.' },
      { t: 'Wait ~8 minutes for a 10-min video', d: 'Translation + cloning + alignment + mux. All four languages come back in one zip.' },
      { t: 'Upload to YouTube multi-audio', d: 'Attach the additional audio tracks in YouTube Studio. Your subscribers can toggle language from the player.' },
    ],
    priceTable: {
      headers: ['Approach', '1 video × 3 languages', '10 videos × 3 languages', 'Voice matches you'],
      rows: [
        ['Gathos (Pro)', '$18 flat', '$18 flat', 'Yes, cloned'],
        ['ElevenLabs Dubbing', '$99+/month usage', '$330+/month usage', 'Yes'],
        ['HeyGen Dubbing', '$29 per video × 3 languages', '$870', 'Yes'],
        ['Human dubbing studio', '$600 to $2,400', '$6,000 to $24,000', 'No'],
      ],
    },
    faqs: [
      { q: 'Does the dubbed video lip-sync?', a: 'Gathos does translation-level alignment (audio matches visual timing), not mouth-level lip-sync. For lip-sync, pipe the output through a lip-sync skill (HeyGen has this; Sync Labs has an API). For 95% of YouTube use cases, timing-alignment is enough — viewers watch multi-audio content with the original video.' },
      { q: 'Which languages work best?', a: 'English, Hindi, Spanish, Portuguese, French, German, Italian, Japanese, Korean, Arabic are first-class. Lower-resource languages (Telugu, Swahili, Gujarati) work but with slightly more monotone output. Test on a 30-second clip before dubbing a long video.' },
      { q: 'Can I dub a podcast episode this way?', a: 'Yes — audio-only is the simplest case. Skip the video-mux step; the skill drops an MP3 per language.' },
      { q: 'How accurate is the translation?', a: 'Gathos uses a frontier LLM for translation, not a dedicated MT model. Output is natural and preserves tone. For legal, medical, or marketing copy you still want a human reviewer.' },
      { q: 'What does this cost at scale?', a: 'Flat $18/month covers a solo creator comfortably. The 6-hour window cap prevents a runaway script (e.g., dubbing 200 videos overnight), but a daily publisher never hits it.' },
    ],
    related: ['ai-voiceover-loom', 'podcast-clip-factory', 'youtube-thumbnails'],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'podcast-clip-factory',
    eyebrow: 'Podcast growth',
    h1: 'Turn every podcast episode into 20 shareable clips.',
    metaTitle: 'Podcast Clip Factory — AI Video + Voice Clips for $18/mo · Gathos',
    metaDesc: 'Feed a 60-minute episode, get 20 vertical clips with captions, a cover image, and a trailer in your host voice. Flat $18/month. No per-clip cost.',
    summary: 'Every podcast episode is a month of social content if you chop it right. The chopping is the hard part. Gathos bundles the whole pipeline: transcript, highlight picking, vertical reframe, caption burn-in, cover art generation, and a 60-second trailer narrated in your voice.',
    samplePrompt: 'Feed episode-47.mp3 into the podcast-clip-factory skill. Pick the 20 most quotable 45-second segments. For each, generate a vertical clip with burnt-in captions and a cover image in my channel style.',
    problemParas: [
      "Podcast growth in 2026 is a social game. Spotify and Apple surface subscribers you already have; discovery comes from Instagram Reels, TikTok, and YouTube Shorts. Every host knows this. Nobody has time to edit 20 clips per episode.",
      'The bottleneck used to be the human eye for what to clip. LLMs solved that in 2024. The remaining bottleneck is the stitching: transcript timestamp extraction, vertical reframe on the speaker, caption style that matches your brand, cover image per clip, and a 60-second trailer in your own voice to advertise the next episode.',
      'Gathos does all of it in one pass. You upload an mp3, you get back a folder: 20 MP4s ready to post, 20 cover images, and a trailer. $18/month flat.',
    ],
    workflowSteps: [
      { t: 'Upload the episode + a voice sample', d: 'MP3 or WAV for the episode. 30-second WAV of your voice.' },
      { t: 'Install the skill', d: 'Once. Future episodes are a single command.' },
      { t: 'Pick your clip style once', d: 'Captions font, cover image look, intro sound. The skill saves the config and reuses it for every episode.' },
      { t: 'Run the pipeline', d: 'Transcript → highlight scoring → reframe → caption → cover → trailer. All in parallel. A 60-minute episode returns in about 12 minutes.' },
    ],
    priceTable: {
      headers: ['Tool', 'Per episode (20 clips)', 'Voice-cloned trailer', 'Cover image per clip'],
      rows: [
        ['Gathos (Pro)', '$18 flat/month', 'Yes', 'Yes'],
        ['Opus Clip (Pro)', '$9 to $29/month', 'No', 'No'],
        ['Descript', '$24/month + effort', 'Yes (Overdub)', 'No'],
        ['Hiring an editor', '$150 to $500 per episode', 'No', 'Separate cost'],
      ],
    },
    faqs: [
      { q: 'Does the skill pick good moments to clip?', a: 'Yes. It scores every 30-second window on hook strength, emotional peak, and quote potential. The top 20 clips are usually 80% as good as what a human editor would pick.' },
      { q: 'What is a "trailer" here?', a: 'A 60-second voice-cloned narration previewing the episode. "This week on the pod I sat down with X. We talked about Y, Z, and the reason Q." Exactly the kind of thing you would put at the top of your feed announcement.' },
      { q: 'Can I keep a consistent clip style across all episodes?', a: 'Yes. Caption font, cover template, and intro sound are config in the skill. Every episode inherits it.' },
      { q: 'Does it handle interviews (two speakers)?', a: 'Yes. The reframe step detects speaker turns and cuts between them. Output looks professionally edited.' },
      { q: 'What if I only want the transcript, not the clips?', a: 'The skill lets you run any subset: transcript-only, clips-only, trailer-only. Stack only what you need.' },
    ],
    related: ['ai-voiceover-loom', 'auto-dub-videos', 'youtube-thumbnails'],
  },

  // ─── Day 3 (Wed) — YouTube auto-narration ───────────────────────────────
  {
    slug: 'youtube-voiceover',
    eyebrow: 'YouTube creator',
    h1: 'AI voiceover for YouTube. Your voice, every language.',
    metaTitle: 'AI YouTube Voiceover — Your Cloned Voice in 600+ Languages · Gathos',
    metaDesc: 'Record a 30-second voice sample once. Narrate every YouTube video in your own voice across 600+ languages. Flat $18/month with unlimited calls.',
    summary: 'YouTube channels grow when they ship faster. The script-to-narration step is the part that kills speed: re-recording costs hours, hiring a VA costs $50-200 per video, and translating to a second market doubles the cost. Gathos clones your voice from 30 seconds of audio and reads any script in 600+ languages.',
    samplePrompt: 'Clone my voice from voice-sample.wav. Read the script in voice-narration.txt at conversational pace. Output as voiceover.mp3 ready to drop into Premiere or DaVinci.',
    problemParas: [
      "YouTube's multi-language audio feature ships subscriber growth on a plate: a video with English + Hindi + Spanish dub averages 2.6x the watch time of an English-only upload (YouTube Creator data, Q1 2026). The blocker is always the dub. Hiring a voice actor for three languages is $300-1,500 per video; a translation studio is more.",
      "The DIY workaround used to be ElevenLabs Multilingual at $22-99/month, capped on character count. Most creators outgrow that tier within a quarter and either jump to $330/month or stop dubbing. Both options are bad.",
      "Gathos solves it the same way creators wish they could: clone your voice once from a 30-second sample, narrate any script, in any language, at flat $18/month with no per-character meter. Upload to YouTube as an additional audio track.",
    ],
    workflowSteps: [
      { t: 'Upload a 30-second voice sample', d: 'Any clean clip of you speaking. Read your channel intro into your phone mic in a quiet room.' },
      { t: 'Install the skill', d: 'One curl line in your agent. The skill wires the clone to the TTS endpoint and keeps a stable voice ID per channel.' },
      { t: 'Paste your script + target language', d: 'Plain text. Mark the language. Submit. Output is a clean MP3 in about 8 seconds for a 5-minute script.' },
      { t: 'Drop into your editor', d: 'The MP3 is a clean track ready for Premiere / DaVinci / Final Cut. Mux it in as a new audio track and upload to YouTube as a multi-audio entry.' },
    ],
    priceTable: {
      headers: ['Tool', '50 videos / month', 'Voice clone', 'Languages', 'Pricing model'],
      rows: [
        ['Gathos (Pro)', '$18 flat', 'Zero-shot', '600+', 'Flat monthly'],
        ['ElevenLabs (Creator)', '$22 / 100k chars', 'Instant Voice Clone', '32', 'Per character'],
        ['ElevenLabs (Scale)', '$330 / 2M chars', 'Same', '32', 'Per character'],
        ['PlayHT (Pro)', '$31.20 / 600k chars', 'Instant', '142', 'Per character'],
        ['Hiring a VO artist (per video)', '$50-200 each', 'N/A', 'Per language', 'Per video'],
      ],
    },
    faqs: [
      { q: 'Will the cloned voice sound robotic?', a: 'Not for short-form. The 2026 zero-shot models are broadly indistinguishable from a studio recording for clips under 8 minutes. For longer documentary-style narration, ElevenLabs still has a slight edge on micro-prosody.' },
      { q: 'How accurate is the language coverage for non-English?', a: 'Hindi, Spanish, Portuguese, French, German, Italian, Mandarin, Japanese, Arabic, Korean: production-grade, indistinguishable for short-form. Long-tail Indic and African languages: strong, occasionally a misplaced phoneme that a native speaker may catch.' },
      { q: 'What is the latency for a 5-minute script?', a: 'About 8-12 seconds of wall-clock time. The TTS pipeline streams; you can start listening before the file is fully written.' },
      { q: 'Will my voice be used to train models?', a: 'No. Gathos does not train on user voice samples. The sample is used for inference only and is deleted on request.' },
      { q: 'Can I license a celebrity voice?', a: 'No. Gathos zero-shot only works with voice samples you own the rights to. We refuse jobs that submit copyrighted or impersonation samples.' },
    ],
    related: ['ai-voiceover-loom', 'auto-dub-videos', 'podcast-clip-factory'],
  },

  // ─── Day 4 (Thu) — LinkedIn carousel batch generator ────────────────────
  {
    slug: 'linkedin-carousel-maker',
    eyebrow: 'B2B social',
    h1: 'LinkedIn carousels in five minutes. Brand-consistent every time.',
    metaTitle: 'LinkedIn Carousel Maker — AI Slide Generator for $18/mo · Gathos',
    metaDesc: 'Paste an article or paragraph, get 8-10 designed LinkedIn carousel slides with consistent typography and on-brand colors. Flat $18/month. No per-carousel cost.',
    summary: 'LinkedIn carousels drive 5x the organic reach of plain text posts in 2026 (LinkedIn Insights, Q1 2026). The bottleneck is design: every slide is 10 minutes in Canva. Gathos turns a paragraph or article into a designed 8-10 slide carousel in five minutes, brand-consistent every time.',
    samplePrompt: 'Generate a 9-slide LinkedIn carousel from this paragraph: "AI inference costs are dropping 40% per quarter. Most teams are still paying 2024 prices because procurement cycles lag behind market." Use my brand colors #1A1A1A and #F5F1E8 with sharp serif headings.',
    problemParas: [
      "LinkedIn carousels outperform every other format on the platform — single-image posts and text-only posts now reach about a fifth of carousel impressions for the same author. Carousels are also the format the algorithm pushes hardest because they keep users on-platform longest.",
      "The cost to ship one is the design tax: 60-90 minutes per carousel in Canva or Figma, and consistency is brittle. Templates help but never quite stay on-brand across 50 carousels. Hiring a designer at $80-300 per carousel solves consistency but kills cadence.",
      "Gathos generates the carousel from text in five minutes. You give it the post copy and a brand palette; it returns 8-10 designed slides matching your typography, colors, and image style. PDF + individual PNGs ready for upload.",
    ],
    workflowSteps: [
      { t: 'Define your brand once', d: 'Two hex codes, a heading font, a body font, an icon style. Saved as the carousel-maker config and reused for every future call.' },
      { t: 'Paste your post copy', d: 'A paragraph, an article excerpt, or a bullet list. The skill structures it into a slide arc: hook → pain → reframe → solution → proof → CTA.' },
      { t: 'Run the generator', d: '8-10 designed slides in about 90 seconds. Each slide is rendered as a 1080×1350 PNG plus stitched into a single PDF.' },
      { t: 'Upload to LinkedIn', d: 'Drag the PDF into the LinkedIn post composer. LinkedIn renders it as a native carousel — no third-party scheduler needed.' },
    ],
    priceTable: {
      headers: ['Approach', '4 carousels / month', '20 carousels / month', 'Brand consistency'],
      rows: [
        ['Gathos (Pro)', '$18 flat', '$18 flat', 'Saved config, identical every time'],
        ['Canva Pro + 60 min/carousel', '$13/mo + 4 hours', '$13/mo + 20 hours', 'Drift across templates'],
        ['Freelance designer', '$320-1,200', '$1,600-6,000', 'Strong, expensive'],
        ['AdCreative.AI / Postwise', '$59-99/mo', 'Token-capped', 'Generic, recognisable'],
      ],
    },
    faqs: [
      { q: 'How does this stay on-brand?', a: 'You configure two hex codes and one heading font. Every carousel inherits both. Output is pixel-consistent across the year.' },
      { q: 'Can I edit a slide after generation?', a: 'Yes. Output includes the source PDF and individual PNGs. Drop into Figma or Canva for tweaks. Most users ship raw output.' },
      { q: 'Does it handle non-English carousels?', a: 'Yes. Pass the source text in any language. Hindi, Portuguese, Spanish, French, German, Mandarin all work.' },
      { q: 'Will my carousels look the same as someone else using Gathos?', a: 'No. The brand config (palette, fonts, image style) is per-account. Two users with different configs get visually distinct output even from the same input copy.' },
      { q: 'How long is each slide?', a: 'About 25-40 words per slide. The skill reflows automatically for longer copy and adds a slide if needed.' },
    ],
    related: ['shopify-product-shots', 'youtube-thumbnails', 'course-slide-deck'],
  },

  // ─── Day 4 (Thu) — Course slide deck generator ──────────────────────────
  {
    slug: 'course-slide-deck',
    eyebrow: 'EdTech',
    h1: 'Course slide decks from a lesson outline.',
    metaTitle: 'AI Course Slide Deck Generator — 30-40 Slides for $18/mo · Gathos',
    metaDesc: 'Upload a lesson outline, get back 30-40 designed slide images that match a chosen style. Ready for Teachable, Thinkific, Coursera, or Notion. Flat $18/month.',
    summary: 'Online instructors lose half their week to slide design. The lesson is in your head; turning it into 30 polished slides is the part that takes three days. Gathos generates the entire deck from a markdown outline in under fifteen minutes, in a style you pick once and reuse for every course.',
    samplePrompt: 'Generate a 35-slide deck for the lesson outlined in lesson-3.md. Style: minimalist, off-white background, charcoal serif headings, mustard accents on diagrams. Include a section divider every 8 slides.',
    problemParas: [
      "Course platforms rank decks higher than text-only modules on completion rate, retention, and review score. Teachable, Thinkific, and Coursera all explicitly nudge instructors toward slide-based modules. Most independent instructors don't ship them because the design tax is brutal: 30-40 slides per lesson at 5-15 minutes each.",
      "Existing tools are bimodal. Beautiful.AI and Tome generate decks but you fight the templates and the output looks generic — students recognise the style across hundreds of courses, which kills perceived quality. Hiring a slide designer is $400-1,500 per course, which is a margin-killer for under-$200 courses.",
      "Gathos generates the deck from your outline. Style is yours, picked once and locked. Charts, diagrams, and section dividers render in-line. Output is 30-40 PNG slides plus a PDF, ready to drop into the course platform's slide module.",
    ],
    workflowSteps: [
      { t: 'Lock your visual style once', d: 'Background tone, heading font, accent colour, diagram style. The skill saves it; every course inherits.' },
      { t: 'Write the lesson outline', d: 'Markdown with headings and bullet points. The skill maps headings → section dividers and bullets → slide content.' },
      { t: 'Run the generator', d: 'About 8-15 minutes for a 30-slide deck. The skill renders each slide as a 1920×1080 PNG plus a stitched PDF.' },
      { t: 'Drop into your course platform', d: 'Teachable / Thinkific accept PDF directly as a module. Coursera and Notion want individual PNGs — both are in the output folder.' },
    ],
    priceTable: {
      headers: ['Approach', 'One 30-slide deck', 'Six decks / quarter', 'Style consistency across courses'],
      rows: [
        ['Gathos (Pro)', '$18 flat / month', '$18 flat / month', 'Saved config — identical every time'],
        ['Beautiful.AI', '$40 / month', '$40 / month', 'Templated, recognisable'],
        ['Tome', '$20-30 / month', '$20-30 / month', 'Templated'],
        ['Hiring a slide designer', '$400-1,500', '$2,400-9,000', 'Strong, expensive'],
        ['DIY in Keynote / Figma', '$0 + 8 hours', '$0 + 48 hours', 'Drift across decks'],
      ],
    },
    faqs: [
      { q: 'Can I edit individual slides after generation?', a: 'Yes. Output includes the source PDF and 30+ individual PNGs. Drop into Keynote / Figma / PowerPoint for tweaks. Most users ship raw output.' },
      { q: 'Does it handle technical content with code blocks?', a: 'Yes. The skill detects code fences in the outline and renders them in a monospaced typeface with syntax highlighting. Output is a flat image of the code, not editable text.' },
      { q: 'How does it generate diagrams?', a: 'For simple diagrams (flow, hierarchy, comparison), it places labelled shapes in a layout that matches your style config. For complex visualisations, it renders a placeholder and flags it for human review.' },
      { q: 'Will my decks look like other instructors using Gathos?', a: 'No. Style config (colour, font, accent) is per-account. Two instructors with different configs get visually distinct output even from the same lesson outline.' },
      { q: 'What languages does it support for the slide content?', a: 'Any language. The text rendering layer handles Latin, Devanagari, Cyrillic, Arabic, CJK, Thai. Diagrams are language-agnostic.' },
    ],
    related: ['shopify-product-shots', 'youtube-thumbnails', 'linkedin-carousel-maker'],
  },
]

export function getSkill(slug) {
  return skills.find((s) => s.slug === slug) || null
}
