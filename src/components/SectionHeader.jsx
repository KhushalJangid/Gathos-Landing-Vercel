import RevealOnScroll from './RevealOnScroll'

/**
 * Editorial section header: small uppercase label → large serif display
 * headline (wisperflow-style) → muted subtitle.
 */
export default function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  const align = center ? 'text-center flex flex-col items-center' : ''

  return (
    <div className={`mb-16 ${align}`}>
      {eyebrow && (
        <RevealOnScroll>
          <div className="label-clay text-warm-silver mb-6">
            {eyebrow}
          </div>
        </RevealOnScroll>
      )}

      <RevealOnScroll delay={0.05}>
        <h2 className="font-editorial text-[clamp(2.2rem,5vw,3.25rem)] font-normal tracking-[-0.025em] leading-[1.1] text-black text-balance max-w-3xl">
          {title}
        </h2>
      </RevealOnScroll>

      {subtitle && (
        <RevealOnScroll delay={0.1}>
          <p className="font-sans text-[1.05rem] text-warm-charcoal max-w-2xl leading-[1.6] mt-5 text-balance">
            {subtitle}
          </p>
        </RevealOnScroll>
      )}
    </div>
  )
}
