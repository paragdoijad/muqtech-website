import { Link } from 'react-router-dom'

const INDUSTRIES = [
  { name: 'Wholesalers & Distributors', primary: true, desc: 'Find relevant buyers, qualify accounts, and prepare personalized outreach. Our initial focus market.', capabilities: ['Buyer discovery', 'Account qualification', 'Personalized outreach', 'Follow-up management'] },
  { name: 'Manufacturing', desc: 'Connect with distributors, suppliers, and business partners across the manufacturing supply chain.', capabilities: ['Supplier research', 'Partner discovery', 'Outreach preparation', 'Pipeline reporting'] },
  { name: 'Industrial', desc: 'Research across energy, construction, logistics, and industrial equipment sectors.', capabilities: ['Market research', 'Lead qualification', 'Evidence collection', 'Sales reporting'] },
  { name: 'Technology', desc: 'Identify and qualify potential B2B customers, partners, and channel opportunities.', capabilities: ['Customer discovery', 'Partner research', 'Qualification', 'Outreach workflows'] },
  { name: 'Professional Services', desc: 'Research and outreach for consulting, financial, legal, and other service firms targeting businesses.', capabilities: ['Prospect research', 'ICP matching', 'Personalized messaging', 'Follow-up sequences'] },
  { name: 'Other B2B', desc: 'Any B2B organization that wants to scale sales research and outreach preparation.', capabilities: ['Custom ICPs', 'Flexible workflows', 'Modular workforce', 'Human approval'] },
]

export default function Industries() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--av-navy)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[420px] h-[420px] -top-40 -left-20" aria-hidden="true" />
        <div className="glow glow-cyan w-[380px] h-[380px] -bottom-48 -right-10" aria-hidden="true" />
        <div className="av-container relative z-10 py-20 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" aria-hidden="true" />
            Industries
          </span>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white leading-tight tracking-tight mb-5">
            Built for B2B businesses
          </h1>
          <p className="text-[var(--av-gray-400)] text-lg max-w-xl mx-auto leading-relaxed">
            Start with wholesalers and distributors. Expand into any complex B2B sales workflow.
          </p>
        </div>
      </section>

      <section className="av-section bg-[var(--av-navy)]">
        <div className="av-container">
          <div className="grid gap-5 max-w-5xl mx-auto">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className={`p-6 rounded-xl transition-all ${ind.primary ? 'av-card av-card-accent text-white !p-6' : 'av-card !p-6'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-base font-bold ${ind.primary ? 'text-white' : ''}`}>{ind.name}</h3>
                      {ind.primary && <span className="px-2 py-0.5 bg-gradient-to-r from-[#6D5CFF] to-[#4F46E5] text-white text-[10px] font-semibold rounded-full">Initial Focus</span>}
                    </div>
                    <p className={`text-sm leading-relaxed ${ind.primary ? 'text-white/75' : 'text-[var(--av-gray-500)]'}`}>{ind.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ind.capabilities.map((c, j) => (
                      <span key={j} className={`px-2.5 py-1 rounded-md text-xs font-medium ${ind.primary ? 'bg-white/10 text-white/80 border border-white/10' : 'bg-white/[0.04] text-[var(--av-gray-400)] border border-white/10 hover:border-cyan-400/35 hover:text-cyan-200 transition-colors'}`}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold mb-3">Not sure if MUQTECH fits your industry?</h3>
            <p className="text-sm text-[var(--av-gray-500)] mb-6 max-w-md mx-auto">Book a demo and we will walk you through how the AI Sales Workforce can be configured for your specific market.</p>
            <Link to="/contact" className="av-btn av-btn-primary !py-3 !px-7">
              Book a Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
