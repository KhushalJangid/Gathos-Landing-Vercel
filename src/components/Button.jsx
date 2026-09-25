// Clay + wisperflow hybrid. Primary = black pill (Clay), Lavender = pale purple
// with 2px black border (wisperflow signature), Ghost = white/oat bordered.

const base =
  'relative inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146ef5] focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-50 disabled:cursor-not-allowed'

const sizes = {
  sm: 'h-8 px-4 text-[0.8rem]',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-[0.95rem]',
}

const styles = {
  // Clay-style black pill (playful hover kept)
  primary:  'bg-black text-white rounded-pill shadow-clay clay-hover clay-hover-bold',
  // Wisperflow-style pale lavender with 2px dark border, 12px radius, no shadow
  lavender: 'bg-lavender text-black border-2 border-black/90 rounded-xl clay-hover',
  // Wisperflow secondary — cream w/ dark border
  ghost:    'bg-white text-black border-2 border-black/90 rounded-xl clay-hover',
  // Subtle outline variant (kept from before)
  outline:  'bg-transparent text-black border border-oat-dark rounded-pill clay-hover',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  href,
  className = '',
  ...props
}) {
  const cls = `${base} ${sizes[size]} ${styles[variant]} ${className}`

  // data-cursor='magnet' opts the button into the CustomCursor magnetic
  // pull — cursor approach within ~60px tugs the button toward it.
  if (href) {
    return (
      <a href={href} className={cls} data-cursor="magnet" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} data-cursor="magnet" {...props}>
      {children}
    </button>
  )
}
