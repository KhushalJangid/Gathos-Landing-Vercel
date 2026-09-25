import SectionHeader from './SectionHeader'
import RevealOnScroll from './RevealOnScroll'

const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: 'Your unique link',
    desc: 'Get a personal referral link the moment you sign up. Share it anywhere — your newsletter, community, or repo.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
    title: 'Track every conversion',
    desc: 'Your partner dashboard shows exactly which users converted to Pro through your link, in real time.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Withdraw on your terms',
    desc: "Commissions accumulate in your wallet. Request a payout via PayPal or bank transfer whenever you're ready.",
  },
]

export default function AffiliateSection() {
  return (
    <section id="affiliate" className="py-24 md:py-32 bg-cream border-t border-dashed border-oat">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Partner Programme"
          title={<>Earn by sharing<br /><span className="italic">Gathos.</span></>}
          subtitle="Refer developers, creators, and teams to Gathos. Earn $2 per Pro signup and $5 per Creator signup — tracked to your wallet, withdrawable any time."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.07}>
              <div className="h-full p-7 rounded-[28px] bg-white border border-oat flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-matcha-300/30 text-matcha-800 flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-[1rem] font-semibold text-black mb-1.5">{p.title}</h3>
                  <p className="text-[0.9rem] text-warm-charcoal leading-[1.65]">{p.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://affiliate.gathos.com"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-pill bg-black text-white text-[0.9rem] font-semibold hover:opacity-85 transition-opacity clay-hover"
            >
              Become a partner
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <p className="text-[0.85rem] text-warm-charcoal">
              Free to join. No approval needed.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
