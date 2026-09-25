import SectionHeader from './SectionHeader'

const COLUMNS = ['Gathos', 'Nano Banana', 'ElevenLabs', 'Veo 3']

const ROWS = [
  {
    feature: 'Pixel-perfect long text in images',
    values: ['yes', 'limited', 'none', 'none'],
  },
  {
    feature: 'Voice cloning across 600+ languages',
    values: ['yes', 'none', 'partial', 'none'],
  },
  {
    feature: 'Image-to-image editing and reference workflows',
    values: ['yes', 'limited', 'none', 'none'],
  },
  {
    feature: 'Text-to-video with generated audio controls',
    values: ['yes', 'none', 'none', 'partial'],
  },
  {
    feature: 'One platform for image editing, voice and video',
    values: ['yes', 'none', 'none', 'none'],
  },
  {
    feature: 'Flat-rate pricing for agent pipelines',
    values: ['yes', 'limited', 'limited', 'limited'],
  },
  {
    feature: 'Agent-native REST endpoints and async jobs',
    values: ['yes', 'partial', 'partial', 'partial'],
  },
]

function Mark({ value }) {
  if (value === 'yes') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-matcha-300/45 px-3 py-1 text-xs font-semibold text-matcha-800">
        <span className="h-1.5 w-1.5 rounded-full bg-matcha-600" />
        Yes
      </span>
    )
  }

  if (value === 'partial') {
    return (
      <span className="inline-flex items-center rounded-full bg-lemon-400/35 px-3 py-1 text-xs font-semibold text-warm-charcoal">
        Partial
      </span>
    )
  }

  if (value === 'limited') {
    return (
      <span className="inline-flex items-center rounded-full bg-oat/60 px-3 py-1 text-xs font-semibold text-warm-charcoal">
        Limited
      </span>
    )
  }

  return <span className="text-sm text-warm-silver">-</span>
}

export default function Comparison() {
  return (
    <section id="compare" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          center
          eyebrow="The Comparison"
          title={
            <>
              One stack instead of<br />
              <span className="italic text-matcha-800">four separate tools.</span>
            </>
          }
          subtitle="A clearer view of where Gathos fits when your agent needs image editing, voice and video from the same workflow."
        />

        <div className="overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-[0_20px_75px_-58px_rgba(0,0,0,0.6)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="border-b border-oat bg-[#f8f4ec]">
                  <th className="w-[34%] px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-warm-silver">Capability</th>
                  {COLUMNS.map((column) => (
                    <th key={column} className="px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-warm-silver">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-oat/70 last:border-b-0">
                    <td className="px-5 py-5 text-[0.95rem] font-semibold leading-snug text-black">{row.feature}</td>
                    {row.values.map((value, index) => (
                      <td key={`${row.feature}-${COLUMNS[index]}`} className={index === 0 ? 'bg-matcha-300/10 px-5 py-5' : 'px-5 py-5'}>
                        <Mark value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
