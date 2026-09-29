import { API_URL, SITE_URL } from '../../lib/urls.js'
// Agent-specific integration pages.
//
// These target a rising query: "best image API for [agent]". First-mover
// advantage here is big · most competitors are not positioning around specific
// agents. Each page shows exact install commands, a sample session, and the
// pre-built skills for that agent.

export const agents = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'claude-code',
    agentName: 'Claude Code',
    agentTagline: 'Anthropic CLI for coding with Claude',
    metaTitle: 'Gathos for Claude Code · Image + TTS in Your Agent · Gathos',
    metaDesc: 'Add image generation and voice cloning to Claude Code in one curl command. Pre-built skills for thumbnails, product shots, voiceover, and dubbing. Flat $18/month.',
    h1: 'Image generation and voice cloning for Claude Code.',
    summary: 'Claude Code is the fastest-growing agent for power users. Gathos is the unified image + TTS API that plugs into Claude Code with a single install command. This page shows the install, a sample session, and the pre-built skills most teams install first.',
    installCommand: ("curl -sL " + SITE_URL + "/install.sh | bash"),
    sampleSession: [
      { who: 'you', say: 'Generate a YouTube thumbnail for a video titled "72 hours to build an app". Orange background, big yellow "72 HOURS" text.' },
      { who: 'cc', say: 'I will use the Gathos image-gen skill. Calling /skills/youtube-thumbnails with width 1280, height 720, text-in-image enabled.' },
      { who: 'cc', say: '→ POST /api/v1/image-generation ... 4.1s' },
      { who: 'cc', say: 'Done. thumbnail-01.png saved. Want three variants?' },
      { who: 'you', say: 'yes, three variants with different color schemes' },
      { who: 'cc', say: 'Running 3 parallel calls... thumbnail-02.png (blue), thumbnail-03.png (green), thumbnail-04.png (red). All saved.' },
    ],
    whySections: [
      {
        t: 'One install, both APIs',
        d: "Gathos gives you image generation and text-to-speech behind the same key. You don't install two SDKs and juggle two usage dashboards. Ask Claude Code for a thumbnail and it calls image-gen; ask for a voiceover and it calls TTS.",
      },
      {
        t: 'Agent-native skills, not raw API calls',
        d: 'Each Gathos skill is a markdown file shaped like a recipe. Claude Code reads it, understands the job-to-be-done, and wires the right API call. You ask for "20 vertical clips from this episode" instead of writing a loop over a transcript.',
      },
      {
        t: 'Flat $18/month means no usage anxiety',
        d: 'When your agent is writing code that calls an API in a loop, per-request pricing is scary. Gathos is flat with a 6-hour fair-use window. A buggy script cannot hand you a $400 bill at 3am.',
      },
      {
        t: 'Pre-built skills for the common jobs',
        d: 'Thumbnail generator, Shopify product-shot bulk tool, Loom voiceover, podcast clip factory, auto-dub into 600+ languages. Each one is a curl-install line.',
      },
    ],
    topSkills: [
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'ai-voiceover-loom', title: 'AI voiceover for Loom' },
      { slug: 'auto-dub-videos', title: 'Auto-dub videos' },
      { slug: 'podcast-clip-factory', title: 'Podcast clip factory' },
    ],
    faqs: [
      { q: 'How do I install Gathos into Claude Code?', a: ("One line of curl: `curl -sL " + SITE_URL + "/install.sh | bash`. It writes the skill files into your Claude Code skills directory and asks you to paste your API key once. From then on, Claude Code knows about every Gathos skill.") },
      { q: 'Do I need to know the Gathos API?', a: ("No. The skills abstract it. You ask Claude Code for \"a thumbnail for this video title\" and it picks the right skill, calls the right endpoint, and hands you the output. If you want to drop to raw API, the endpoints are at " + API_URL + "/api/v1.") },
      { q: 'Can I write my own skills?', a: 'Yes. Gathos skills are plain markdown with a front-matter block and a "how to use the API" section. Copy an existing one as a template, change the job description, commit to your own repo.' },
      { q: 'What happens if I exceed my plan limit?', a: 'You get a 429 with a clear error message in your Claude Code terminal ("6-hour window limit reached. Resets in X minutes."). Nothing breaks silently. Your script can catch the 429 and back off.' },
      { q: 'Does Gathos work with Claude Code in the terminal and in the VSCode extension?', a: 'Both. The skills live in your user-level Claude Code config so they apply to every invocation.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'cursor',
    agentName: 'Cursor',
    agentTagline: 'The AI-first code editor',
    metaTitle: 'Gathos for Cursor · Image + TTS in Your Editor · Gathos',
    metaDesc: 'Use Gathos image generation and voice cloning from Cursor. Ask the agent for a thumbnail or voiceover and it runs it. Flat $18/month, no per-call cost.',
    h1: 'Image generation and voice cloning in Cursor.',
    summary: 'Cursor is where millions of developers write code every day. Gathos plugs into Cursor as a set of agent-callable skills · you describe what you want in a chat message, Cursor runs the API, and the output lands in your project folder. Flat $18/month.',
    installCommand: ("curl -sL " + SITE_URL + "/install.sh | bash && echo \"Restart Cursor\""),
    sampleSession: [
      { who: 'you', say: 'I need 5 product shots for the water bottle SKU. Use the reference image in ./assets/hero.jpg. Output lifestyle, flatlay, kitchen, outdoor, and gym.' },
      { who: 'cursor', say: 'Running /skills/shopify-product-shots. 5 parallel calls to Gathos image-gen...' },
      { who: 'cursor', say: '→ 5 files saved to ./assets/generated/: bottle-lifestyle.png, bottle-flatlay.png, bottle-kitchen.png, bottle-outdoor.png, bottle-gym.png' },
      { who: 'you', say: 'Now generate a 30-second product voiceover in Spanish using my voice clone.' },
      { who: 'cursor', say: 'Running /skills/ai-voiceover-loom with language=es and voice=your saved clone...' },
      { who: 'cursor', say: '→ voiceover-es.mp3 saved. 2.1 MB, 31 seconds.' },
    ],
    whySections: [
      {
        t: 'Skills live with your project',
        d: "Check the Gathos skills into your repo's .cursor/rules directory. Every teammate who opens the project gets the same agent-callable tools, with no setup. The skill becomes part of the codebase.",
      },
      {
        t: 'Both APIs, one editor',
        d: 'Image generation and text-to-speech behind the same key. Generate a thumbnail and voiceover for the same video in a single Cursor session without swapping tabs.',
      },
      {
        t: 'Asset files land in your repo',
        d: 'Cursor runs the call, writes the image or audio to a path you specified, and then you can commit it. No copy-paste from a web UI.',
      },
      {
        t: 'Predictable billing for AI-generated code',
        d: 'Cursor loves to write loops. A per-image API can cost you $50 before you notice. Gathos is flat with a 6-hour fair-use cap, so cost surprises are bounded by design.',
      },
    ],
    topSkills: [
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'ai-voiceover-loom', title: 'AI voiceover for Loom' },
      { slug: 'auto-dub-videos', title: 'Auto-dub videos' },
      { slug: 'podcast-clip-factory', title: 'Podcast clip factory' },
    ],
    faqs: [
      { q: 'How do I add Gathos skills to a Cursor project?', a: 'The install script writes skill files into `.cursor/rules/gathos/`. Cursor picks them up automatically. Commit the folder so teammates get the same setup.' },
      { q: 'Do I need a different API key per project?', a: 'You can. Common pattern is one key per environment (dev, staging, prod) and scope by the image vs TTS key type.' },
      { q: 'Does Cursor need to be on a specific version?', a: 'Any version from 2025 onward (when custom skills/rules were stabilized). We test on the current stable release.' },
      { q: 'What if I want to use the Gathos API directly, without the skills?', a: ("The API is a plain REST endpoint at " + API_URL + "/api/v1/image-generation and /api/v1/tts. Skills are convenience; they are not required.") },
      { q: 'Can I use Gathos for generating assets at build time?', a: 'Yes. Many teams call Gathos from a Vite/Next build script to generate OG images or hero thumbnails at deploy time. The flat billing makes this pattern cheap.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'windsurf',
    agentName: 'Windsurf',
    agentTagline: 'Cascade-powered AI editor by Codeium',
    metaTitle: 'Gathos for Windsurf · Cascade Skills for Image + Voice · Gathos',
    metaDesc: 'Plug Gathos image generation and voice cloning into Windsurf as Cascade Skills. One install, both APIs, flat $18/month. Built for Wave 13+ skill spec.',
    h1: 'Image generation and voice cloning, native to Windsurf.',
    summary: "Windsurf shipped Cascade Skills in Wave 13 (January 2026), and the spec is the same single-file markdown convention Anthropic and Cursor adopted. Gathos plugs in as a Cascade Skill so the agent can generate thumbnails, product shots, voiceover, and dubbed videos without you leaving the editor.",
    installCommand: ("curl -sL " + SITE_URL + "/install.sh | bash && echo \"Reload Windsurf\""),
    sampleSession: [
      { who: 'you', say: 'I need 5 vertical reels from podcast-ep-12.mp3. Use my saved voice clone for the trailer narration. Style matches my channel template.' },
      { who: 'windsurf', say: 'Running Cascade Skill /skills/podcast-clip-factory. Pulling 12 highlights from the transcript, picking the top 5...' },
      { who: 'windsurf', say: '→ 5 vertical MP4s (1080×1920) saved to ./output/. Cover images generated for each clip. Trailer.mp3 narrated in your voice.' },
      { who: 'you', say: 'Add burnt-in captions in your channel font.' },
      { who: 'windsurf', say: 'Re-running with caption overlay enabled. ETA 90 seconds.' },
    ],
    whySections: [
      {
        t: 'Cascade Skills are markdown · the install is a curl line',
        d: 'Windsurf reads Cascade Skill files from `.windsurf/skills/`. Gathos installs into that directory. Commit the folder so every teammate inherits the same agent-callable tools without setup.',
      },
      {
        t: 'Two APIs, one editor, flat bill',
        d: 'Image generation and TTS share one API key in Gathos. Generate a thumbnail and the voiceover for the same video in a single Cascade session. No swap-tab, no two dashboards.',
      },
      {
        t: 'Asset files land in your repo',
        d: 'Windsurf invokes the Gathos API and writes the PNG or MP3 to a path you specified, ready to commit. No copy-paste from a web UI.',
      },
      {
        t: 'Bounded cost surface for AI-generated code',
        d: 'Cascade is enthusiastic about loops. A per-image API can hand you a $40 surprise. Gathos is flat $18/month with a 6-hour fair-use window · runaway scripts hit a soft wall, not a billing wall.',
      },
    ],
    topSkills: [
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'ai-voiceover-loom', title: 'AI voiceover for Loom' },
      { slug: 'auto-dub-videos', title: 'Auto-dub videos' },
      { slug: 'podcast-clip-factory', title: 'Podcast clip factory' },
    ],
    faqs: [
      { q: 'Which Windsurf version do I need?', a: 'Wave 13 or later (January 2026 onward) when Cascade Skills were stabilized. The install script checks your version and warns if you are below.' },
      { q: 'Do I commit the skills folder?', a: 'Yes. Cascade reads `.windsurf/skills/` as part of the project. Committing the folder means everyone on the team gets the same tools without per-machine setup.' },
      { q: 'Can I run multiple Gathos skills in parallel?', a: 'Yes. The Pro plan allows 10 concurrent jobs by default; admins can raise this. Cascade handles the parallelism if you ask for "20 reels in batches of 5".' },
      { q: 'What if I want a custom skill on top of Gathos?', a: 'Copy any of the bundled skills as a template, edit the front-matter and the API call section, save into `.windsurf/skills/`. Cascade picks it up on next reload.' },
      { q: 'Does Gathos work in Cascade Mode chat or only in the agent?', a: 'Both. The skills are invokable from chat-mode prompts and from agent runs. Same install path.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'gemini-cli',
    agentName: 'Gemini CLI',
    agentTagline: "Google's terminal agent for Gemini",
    metaTitle: 'Gathos for Gemini CLI · Image + Voice Skills · Gathos',
    metaDesc: 'Add Gathos image generation and 600+ language TTS to Gemini CLI as native skills. Flat $18/month. Built for the Gemini CLI Skills spec.',
    h1: 'Image and voice generation, native to Gemini CLI.',
    summary: "Gemini CLI's Skills spec went GA in early 2026 · same single-file markdown convention Anthropic and Codeium adopted. Gathos installs as a Gemini CLI skill so the agent can generate images and voiceover from any terminal session.",
    installCommand: ("curl -sL " + SITE_URL + "/install.sh | bash"),
    sampleSession: [
      { who: 'you', say: 'gemini "Generate a Bauhaus-style poster for our launch event. Bold yellow background, the date \'May 18 2026\' rendered in clean typography, our logo in the bottom-left."' },
      { who: 'gemini-cli', say: 'Loading skill: /skills/event-poster (matched on intent).' },
      { who: 'gemini-cli', say: '→ POST /api/v1/image-generation, width=1024 height=1280...' },
      { who: 'gemini-cli', say: '✓ poster-launch-may18.png saved (1024×1280, 412 KB).' },
      { who: 'you', say: 'gemini "Now narrate the event description in Hindi using my saved voice clone."' },
      { who: 'gemini-cli', say: '→ /skills/ai-voiceover-loom with language=hi, voice=clone-1...' },
      { who: 'gemini-cli', say: '✓ event-narration-hi.mp3 saved (47 seconds).' },
    ],
    whySections: [
      {
        t: 'Gemini CLI skills, one install',
        d: 'Gathos installs into `~/.gemini/skills/`. Gemini CLI auto-discovers them on the next invocation. Project-scoped skills work too if you commit `.gemini/skills/` to your repo.',
      },
      {
        t: 'Pair Gemini reasoning with Gathos generation',
        d: 'Gemini CLI is exceptional at planning and tool-calling but does not include image generation in the standard distribution. Gathos fills that gap with one curl line.',
      },
      {
        t: 'Indic + global language coverage',
        d: 'Gathos TTS covers 600+ languages, including 12 first-class Indic languages. If your team is in India or your audience is multilingual, Gathos is one of very few options that ship Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, and Punjabi at native quality.',
      },
      {
        t: 'Flat pricing for terminal-driven workflows',
        d: 'Terminal agents are loop-friendly. Per-image and per-character APIs become bills before you notice. Gathos is $18/month flat with a 6-hour soft cap to prevent runaways.',
      },
    ],
    topSkills: [
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'ai-voiceover-loom', title: 'AI voiceover for Loom' },
      { slug: 'auto-dub-videos', title: 'Auto-dub videos' },
    ],
    faqs: [
      { q: 'Is Gemini CLI Skills support stable?', a: 'Yes, the skills spec went GA in early 2026 and is documented at the Gemini CLI docs site. Gathos targets the stable spec.' },
      { q: 'Can I use Gathos and the Gemini Imagen API in the same project?', a: 'Yes. Many teams use Gemini Imagen for one-off hero shots (per-image pricing is fine at low volume) and Gathos for everything else. The Gemini CLI agent can route between them based on a tag in the prompt.' },
      { q: 'Does Gathos work with Gemini CLI in non-interactive (one-shot) mode?', a: 'Yes. The skills export deterministic output paths so a CI script can call `gemini -p "do X"` and pick up the file by path.' },
      { q: 'How do I scope a skill to one project?', a: 'Move the skill file from `~/.gemini/skills/` to `<project>/.gemini/skills/`. Project skills override global ones.' },
      { q: 'Are the skills MIT-licensed?', a: 'Yes. The skill markdown files are MIT. Gathos itself (the API) is proprietary.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'aider',
    agentName: 'Aider',
    agentTagline: 'Pair-programming AI in your terminal',
    metaTitle: 'Gathos for Aider · Image + Voice Generation in Terminal · Gathos',
    metaDesc: 'Add Gathos image and voice APIs to Aider as terminal-callable tools. Generate assets without leaving the pair-programming session. Flat $18/month.',
    h1: 'Image and voice generation, called from inside Aider sessions.',
    summary: "Aider is a terminal-first pair programmer that has stayed lean and fast. It does not ship with image generation or TTS, and the popular pattern is to bolt those on as external commands. Gathos slots in as a Bash-callable tool so an Aider session can generate assets without leaving the terminal.",
    installCommand: ("curl -sL " + SITE_URL + "/install.sh | bash"),
    sampleSession: [
      { who: 'you', say: 'aider> i need an OG image for the new /pricing route. 1200×630, our brand colors, "Flat $18/month" headline.' },
      { who: 'aider', say: 'Got it. Running `gathos image-gen --width 1200 --height 630 --prompt "Cream background with matcha-green accents, bold serif text Flat dollar 18 slash month, minimalist Clay aesthetic"`...' },
      { who: 'aider', say: '✓ saved public/og-pricing.png. Adding it to your <Helmet /> in src/pages/Pricing.jsx.' },
      { who: 'you', say: 'aider> generate a 30-second voiceover of the page summary in my cloned voice for a launch tweet.' },
      { who: 'aider', say: 'Running `gathos tts --voice my-clone --text "Gathos is..."`. Output: launch-vo.mp3 (28s).' },
    ],
    whySections: [
      {
        t: 'Aider stays lean · Gathos plugs in via Bash',
        d: 'Aider does not have a plugin system in the modern agent-skill sense. Gathos integrates as a CLI binary that Aider can shell out to. Same flexibility, no new abstraction.',
      },
      {
        t: 'Bundled image + voice means one auth, one bill',
        d: 'Aider already orchestrates several tools per session. Adding Gathos means one more API key, not two · image generation and TTS share a single key.',
      },
      {
        t: 'Predictable cost is critical for terminal pair-programming',
        d: 'Aider is good at iterating in tight loops. Per-image pricing turns a 30-minute session into an unintended $20 bill. Gathos is flat · generate as many drafts as the work needs.',
      },
      {
        t: 'Skills are markdown, not Python plugins',
        d: 'The Gathos skills are single-file recipes that document what the agent should call when. Aider can read them as context (e.g., `aider --read .gathos/skills/youtube-thumbnails.md`) and follow the recipe.',
      },
    ],
    topSkills: [
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'ai-voiceover-loom', title: 'AI voiceover for Loom' },
      { slug: 'podcast-clip-factory', title: 'Podcast clip factory' },
    ],
    faqs: [
      { q: 'Does Aider have a "skills" system like Claude Code or Cursor?', a: 'Not in the same form factor. Aider stays close to the terminal-pair-programming metaphor. Gathos works by adding a CLI tool that Aider can call directly via shell-out, plus markdown recipes Aider can read with `--read`.' },
      { q: 'Will Aider always know to call Gathos for an image task?', a: 'Yes if you `--read` the relevant skill markdown, or if you tell it once at the start of the session. Aider is good at remembering tool conventions within a session.' },
      { q: 'Is the CLI binary required?', a: 'No. You can also call the Gathos REST API directly from a one-line `curl` and Aider handles that fine. The CLI is a convenience.' },
      { q: 'Does this work with Aider in a Docker container?', a: 'Yes. Mount your Gathos config volume into the container and the CLI works the same. Many teams keep Aider in a dev container.' },
      { q: 'What about cost? Aider is loop-friendly.', a: 'Flat $18/month is the only safe answer to a loop-friendly agent. Per-image APIs and Aider together produce surprise bills more often than not.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'github-copilot',
    agentName: 'GitHub Copilot',
    agentTagline: "GitHub's coding agent built into your IDE",
    metaTitle: 'Gathos for GitHub Copilot · Image + Voice via Custom Agents · Gathos',
    metaDesc: 'Add Gathos image generation and voice cloning to GitHub Copilot via custom agents and MCP servers. Flat $18/month, one auth.',
    h1: 'Image and voice generation, plugged into GitHub Copilot.',
    summary: "GitHub Copilot supports custom agents and MCP servers in 2026, which means Gathos can be wired in as a callable tool inside any IDE that ships Copilot. The setup is one curl line and one config entry.",
    installCommand: ("curl -sL " + SITE_URL + "/install.sh | bash"),
    sampleSession: [
      { who: 'you', say: '@gathos generate a 1200x630 OG image for the new /pricing route, brand colors, headline "Flat $18/month".' },
      { who: 'copilot', say: 'Calling Gathos image-generation skill via the MCP server...' },
      { who: 'copilot', say: '✓ public/og-pricing.png saved (1200×630, 387 KB). Adding to <Helmet /> in src/pages/Pricing.jsx.' },
      { who: 'you', say: '@gathos record a 30-second voiceover of the page summary in my saved voice.' },
      { who: 'copilot', say: 'Running Gathos TTS skill, voice=clone-1, language=en...' },
      { who: 'copilot', say: '✓ public/audio/launch-vo.mp3 saved (28s, 1.1 MB).' },
    ],
    whySections: [
      {
        t: 'Copilot custom agents make this trivial',
        d: 'GitHub Copilot Agents (GA in 2026) let you register external tools the agent can invoke. Gathos installs as a custom agent and Copilot picks it up across VSCode, JetBrains, Visual Studio, and the GitHub web UI.',
      },
      {
        t: 'One auth for image, voice, and skills',
        d: 'Most teams that try to add image generation to a Copilot workflow end up wiring two products and two auth flows. Gathos is one API key for image and TTS. Less ceremony.',
      },
      {
        t: 'Predictable pricing for an agent that loops',
        d: 'Copilot Agents are eager to generate. Per-image APIs combined with eager agents produce real bills. Gathos flat $18 with the 6-hour fair-use window means the cost surface is bounded by design.',
      },
      {
        t: 'Works in GitHub Actions too',
        d: 'The same skill files work as scripts in CI. Generate OG images on every PR, regenerate audio walkthroughs on every release, all from the same flat $18.',
      },
    ],
    topSkills: [
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'ai-voiceover-loom', title: 'AI voiceover for Loom' },
      { slug: 'auto-dub-videos', title: 'Auto-dub videos' },
    ],
    faqs: [
      { q: 'Does GitHub Copilot support custom tools?', a: 'Yes, via the Copilot Agents framework that went GA in 2026 and via MCP server integration. Both routes work for Gathos. The install script picks the right path based on your Copilot version.' },
      { q: 'Where does Copilot find the Gathos skills?', a: "Copilot reads skill metadata from your `~/.copilot/agents/` directory (or the project-scoped `.github/copilot-agents/`). The Gathos installer drops files there and Copilot picks them up on next reload." },
      { q: 'Will this work in Visual Studio (full IDE) or only VSCode?', a: 'Both. And in JetBrains. The Copilot Agents protocol is consistent across host editors.' },
      { q: 'Can I trigger Gathos from a GitHub Actions workflow?', a: 'Yes. The same skills are CLI-callable. A common pattern is generating OG images on every PR via the Gathos CLI inside Actions.' },
      { q: 'Is this different from MCP?', a: 'Slightly. Copilot Agents and MCP are related but not identical. Copilot supports both. Gathos works through either.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'chatgpt-gpts',
    agentName: 'ChatGPT Custom GPTs',
    agentTagline: "OpenAI's custom assistants with tool calls and Actions",
    metaTitle: 'Gathos for ChatGPT GPTs · Image + Voice Actions · Gathos',
    metaDesc: 'Wire Gathos image and TTS APIs into a custom ChatGPT GPT as Actions. Generate thumbnails, voiceovers, dubbed videos from inside ChatGPT. Flat $18/month.',
    h1: 'Image and voice generation, callable from a custom ChatGPT GPT.',
    summary: "Custom ChatGPT GPTs support Actions, which are HTTPS-callable tools the GPT can invoke during a conversation. Gathos exposes a clean OpenAPI schema so wiring it as an Action takes about ten minutes.",
    installCommand: ("# In your custom GPT > Configure > Actions > Import from URL\n" + API_URL + "/openapi.json"),
    sampleSession: [
      { who: 'you', say: 'Make me 5 vertical Reels from this podcast episode link, with my channel style.' },
      { who: 'chatgpt', say: 'Calling the gathos.podcast_clip_factory action...' },
      { who: 'chatgpt', say: '✓ Got 5 vertical MP4s. Want me to send them as direct download links here?' },
      { who: 'you', say: 'Yes. And generate a Hindi voiceover trailer narrated in my saved voice.' },
      { who: 'chatgpt', say: 'Calling gathos.tts with voice=clone-1, language=hi...' },
      { who: 'chatgpt', say: '✓ trailer-hi.mp3 ready.' },
    ],
    whySections: [
      {
        t: 'OpenAPI schema means Actions setup is a paste',
        d: ("Gathos publishes a standard OpenAPI schema at " + API_URL + "/openapi.json. ChatGPT Actions imports directly from a URL, so wiring takes about ten minutes per GPT, not a custom integration project."),
      },
      {
        t: 'API key per GPT means you can build product-specific assistants',
        d: 'Each Custom GPT can have its own Gathos API key. Build a YouTube-thumbnail GPT, a Shopify-product-shot GPT, a podcast-clipping GPT. Each one has scoped access and its own usage view.',
      },
      {
        t: 'ChatGPT loops are eager · flat pricing handles it',
        d: 'GPTs love iterating. A custom assistant that helps generate thumbnails will easily call the API 30 times per conversation. Per-image meters punish that. Gathos flat $18 makes iteration free.',
      },
      {
        t: 'Bundled image + voice means richer GPT outputs',
        d: 'A "build me a launch announcement" GPT can generate the poster, the social variants, the voiceover, and the multilingual dubs from one tool. Building that with two separate APIs is twice the wiring.',
      },
    ],
    topSkills: [
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'auto-dub-videos', title: 'Auto-dub videos' },
      { slug: 'podcast-clip-factory', title: 'Podcast clip factory' },
    ],
    faqs: [
      { q: 'How do I add Gathos as a ChatGPT Action?', a: ("In your Custom GPT > Configure > Actions > Import from URL > paste " + API_URL + "/openapi.json. Then add your Gathos API key in the auth section. Done.") },
      { q: 'Does this work with the free ChatGPT tier?', a: 'Custom GPTs require ChatGPT Plus or higher. Once on Plus, your custom GPTs can call any Action.' },
      { q: 'Can I share my Gathos GPT with other people?', a: 'Yes. Share the GPT link. Each user provides their own Gathos API key on first use, so you do not pay for their usage.' },
      { q: 'What about the GPT Store?', a: "Yes, you can publish a Gathos-powered GPT to the store. Many teams build niche GPTs (thumbnail generator, product shot factory) on top of Gathos and publish them." },
      { q: 'How does this differ from MCP?', a: "ChatGPT Actions and MCP are different protocols solving similar problems. Gathos works through both. If you're inside ChatGPT, use Actions. If you're using Claude Code or Cursor, use MCP."},
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'continue',
    agentName: 'Continue',
    agentTagline: 'Open-source AI code assistant for VSCode and JetBrains',
    metaTitle: 'Gathos for Continue · Image + Voice in Open-Source AI Coder · Gathos',
    metaDesc: 'Add Gathos image generation and voice cloning to Continue.dev as custom slash commands and tools. Flat $18/month, one auth, MIT-licensed skills.',
    h1: 'Image and voice generation in Continue.dev sessions.',
    summary: "Continue is the open-source alternative to Cursor, focused on developer control and self-hosting. It supports custom slash commands and tools through a clean config. Gathos plugs in as a callable tool so the agent can generate assets from the same editor session.",
    installCommand: ("curl -sL " + SITE_URL + "/install.sh | bash"),
    sampleSession: [
      { who: 'you', say: '/gathos image OG card for the new pricing page, our brand colors, "Flat $18/month" headline' },
      { who: 'continue', say: 'Running Gathos image-gen skill with width=1200 height=630...' },
      { who: 'continue', say: '✓ public/og-pricing.png saved.' },
      { who: 'you', say: '/gathos voiceover read this announcement in my saved voice clone' },
      { who: 'continue', say: 'Running Gathos TTS skill, voice=clone-1, language=en...' },
      { who: 'continue', say: '✓ public/audio/announcement.mp3 saved (38s, 1.4 MB).' },
    ],
    whySections: [
      {
        t: 'Custom commands map naturally to skills',
        d: "Continue's `~/.continue/config.json` accepts custom slash commands and tools. Gathos installs as `/gathos image`, `/gathos voice`, and `/gathos dub` so the workflow is familiar from day one.",
      },
      {
        t: 'Open-source alignment',
        d: 'Continue is MIT-licensed. The Gathos skill markdown files are also MIT-licensed and ship with their source visible. Aligned philosophies, simpler audits.',
      },
      {
        t: 'Self-host friendly',
        d: 'Continue users often self-host their LLM backend. Gathos still works the same way (single REST endpoint, one API key). No deeper integration with the LLM provider needed.',
      },
      {
        t: 'Predictable cost for power users',
        d: 'Continue is a power-user editor. Power users iterate. Gathos flat $18 makes iteration free, which suits the user shape.',
      },
    ],
    topSkills: [
      { slug: 'youtube-thumbnails', title: 'YouTube thumbnails' },
      { slug: 'shopify-product-shots', title: 'Shopify product shots' },
      { slug: 'ai-voiceover-loom', title: 'AI voiceover for Loom' },
      { slug: 'podcast-clip-factory', title: 'Podcast clip factory' },
    ],
    faqs: [
      { q: 'How do I install Gathos into Continue?', a: 'Run the curl install line. It writes a Gathos block into `~/.continue/config.json` registering custom commands. Reload Continue and the commands are available immediately.' },
      { q: 'Does this work with Continue in VSCode and JetBrains?', a: "Yes, both. Continue's config is host-agnostic so the same setup applies." },
      { q: 'Can I scope skills to one project?', a: "Yes. Move the Gathos block from `~/.continue/config.json` to `<project>/.continue/config.json`. Project-level config takes precedence." },
      { q: 'Will Continue see Gathos as a tool the LLM can call autonomously?', a: 'Yes if you mark the commands as agent-callable in your config. Continue then includes them in the tool-call planning phase. Most users prefer explicit slash-command invocation for asset generation, but autonomous is supported.' },
      { q: 'Is the Gathos integration open-source?', a: 'The skill files are MIT-licensed. The Gathos API itself is proprietary. The integration code in your Continue config is also yours to fork or modify.' },
    ],
  },
]

export function getAgent(slug) {
  return agents.find((a) => a.slug === slug) || null
}
