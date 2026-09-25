import { useEffect } from 'react'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ResultsShowcase from '../components/ResultsShowcase'
import UserVideoShowcase from '../components/UserVideoShowcase'
import TrustBar from '../components/TrustBar'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import OpenSource from '../components/OpenSource'
import Comparison from '../components/Comparison'
import AskAgents from '../components/AskAgents'
import Pricing from '../components/Pricing'
import AffiliateSection from '../components/AffiliateSection'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import NewsletterPopup from '../components/NewsletterPopup'
import CustomCursor from '../components/CustomCursor'

// Homepage-only FAQ schema. This used to live in index.html but was
// duplicating with the per-page FAQs on /blog, /compare, /skills since
// index.html ships with every SPA route. Now it's only injected when
// the Landing component is mounted, so blog/compare/skill pages emit
// only their own page-specific FAQPage block.
const HOMEPAGE_FAQS = [
  { q: 'What is Gathos?', a: 'Gathos is an API platform built for AI agents. Pro includes image generation with pixel-perfect long-text rendering and text-to-speech with zero-shot voice cloning in 600+ languages. Creator adds image-to-image editing plus text-to-video and image-to-video with AI-generated audio, so agents can create, edit, narrate, and animate assets through one REST API platform.' },
  { q: 'How much does Gathos cost?', a: 'Gathos Pro costs $18 per month for unlimited image and TTS API calls. Creator is currently available at limited-time $45 per month pricing and adds image-to-image editing, text-to-video, image-to-video, and generated audio controls. New users can start with a 7-day no-card trial for image and TTS; Creator also has a 3-day trial after authorizing a Dodo mandate, then renews at the Creator price unless cancelled.' },
  { q: 'How is Gathos different from Nano Banana Pro, Midjourney, or ChatGPT image?', a: 'Gathos renders long paragraphs, headlines, and UI labels inside generated images with pixel-perfect typography. Nano Banana Pro ($0.134-$0.24 per image via Gemini API), Midjourney, and ChatGPT image can garble longer text. Gathos also bundles unlimited TTS and zero-shot voice cloning in Pro, while Creator adds image-to-image editing and video generation for teams that want a simpler alternative to stitching together image editors, Veo 3, Seedance, TTS, and image tools.' },
  { q: 'Which AI agents does Gathos work with?', a: 'Gathos works with any shell-capable AI agent, including Claude Code, Cursor, Windsurf, Gemini CLI, OpenClaw, Aider, GitHub Copilot, ChatGPT Custom GPTs, and Continue. The API is a standard REST endpoint with Bearer-token authentication.' },
  { q: 'Does voice cloning cost extra?', a: 'No. Zero-shot voice cloning is included in the $18/month plan with unlimited calls. ElevenLabs charges $5-$22+ per month for equivalent cloning tiers and meters by character count.' },
  { q: 'How many languages does Gathos TTS support?', a: 'Gathos TTS supports 600+ languages and accents for both text-to-speech synthesis and zero-shot voice cloning. ElevenLabs v3 supports 70+ languages.' },
  { q: 'How does Gathos video compare to Veo 3 or Seedance?', a: 'Veo 3 and Seedance are frontier video models with advanced workflows. Gathos Creator is packaged for builders who want one agent-native platform for image-to-image editing, text-to-video, image-to-video, generated audio, and the same image and TTS APIs already in Pro, at a predictable limited-time $45/month plan.' },
  { q: 'How do I install the Gathos agent skill?', a: 'Sign in at https://dashboard.gathos.live/login/, open the Skills tab in your dashboard, and copy the install command scoped to your API key. The installer drops Idea-to-Presentation, YouTube Video Factory, and Script-to-Reel into your agent\'s skill directory.' },
  { q: 'How does the free trial work?', a: 'The trial lasts 7 days. You get 25 API calls per day across image and TTS, up to 140 calls total over the week. Paid Pro and Creator accounts currently share a 600-submission 6-hour fair-use window, plus queue/concurrency limits to keep generation stable. No credit card is required to start the trial, and you keep your account and keys after it ends.' },
  { q: 'What are the Creator plan rate limits?', a: 'Creator includes unlimited daily generations under fair use with a 600-submission 6-hour fair-use window across API keys, image and image-to-image outstanding-job controls, and up to 2 outstanding video jobs per user. API-key buckets allow 180 generation submissions per minute and 600 job polls per minute. For heavier production workloads, High Priority Queue and Enterprise/Dedicated Capacity options are available.' },
  { q: 'Is Gathos open source?', a: 'The API platform itself is proprietary. Pre-built agent skills (Idea-to-Presentation, YouTube Video Factory, Script-to-Reel) are available inside the subscriber dashboard and call the hosted Gathos APIs under the hood.' },
  { q: 'What image sizes does Gathos support?', a: 'Four presets: 1024×1024 (square, Instagram feed and LinkedIn), 1024×1280 (portrait, Instagram posts), 864×1536 (9:16 story, TikTok and Reels), and 1536×864 (16:9 landscape, YouTube thumbnails). All dimensions are divisible by 16. Maximum 1536 pixels on the long edge.' },
]

export default function Landing() {
  useEffect(() => {
    // Inject FAQPage JSON-LD into <head> only when the Landing component
    // is mounted. Cleanup removes it on unmount so navigating to a
    // different route never leaves a stray homepage FAQPage behind.
    const existing = document.getElementById('gathos-home-faq-jsonld')
    if (existing) existing.remove()
    const tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.id = 'gathos-home-faq-jsonld'
    tag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOMEPAGE_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    document.head.appendChild(tag)
    return () => {
      const t = document.getElementById('gathos-home-faq-jsonld')
      if (t) t.remove()
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <NewsletterPopup />
      <Background />
      <CustomCursor />
      <Navbar />
      <Hero />
      <UserVideoShowcase />
      <TrustBar />
      <Comparison />
      <AskAgents />
      <HowItWorks />
      <ResultsShowcase />
      <Features />
      <OpenSource />
      <Pricing />
      <AffiliateSection />
      <FinalCTA />
      <Footer />
    </>
  )
}
