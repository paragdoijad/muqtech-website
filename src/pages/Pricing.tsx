import { Link } from 'react-router-dom'

export default function Pricing() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--av-navy)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[420px] h-[420px] -top-40 -right-20" aria-hidden="true" />
        <div className="glow glow-cyan w-[380px] h-[380px] -bottom-48 -left-10" aria-hidden="true" />
        <div className="av-container relative z-10 py-20 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" aria-hidden="true" />
            Pricing
          </span>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white leading-tight tracking-tight mb-5">
            Simple, transparent plans
          </h1>
          <p className="text-[var(--av-gray-400)] text-lg max-w-xl mx-auto leading-relaxed">
            Every AI Sales Workforce is configured around your sales process, lead volume, ICP, and workflow complexity.
          </p>
        </div>
      </section>

      <section className="av-section bg-[var(--av-navy)]">
        <div className="av-container">
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {[
              { name: 'Starter', desc: 'For teams exploring AI-assisted sales.', price: '$299', setup: '$499', features: ['Core AI workforce', 'Up to 50 leads/month', 'Basic reporting', 'Email support'], cta: 'Talk to Us' },
              { name: 'Growth', desc: 'For growing sales teams.', highlight: true, price: '$599', setup: '$999', features: ['Full AI workforce', 'Up to 200 leads/month', 'Advanced reporting', 'Custom ICPs', 'Priority support'], cta: 'Talk to Us' },
              { name: 'Scale', desc: 'For complex B2B operations.', price: '$999', setup: '$1,999', features: ['Custom workforce design', 'Unlimited leads', 'Full reporting suite', 'Custom integrations', 'Dedicated support'], cta: 'Talk to Us' },
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-xl transition-all ${plan.highlight ? 'av-card av-card-accent sm:-mt-4' : 'av-card'}`}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0A0F1A] border border-[rgba(109,92,255,0.55)] text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--av-blue-light)] shadow-[0_0_18px_-4px_rgba(109,92,255,0.6)]">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-[var(--av-gray-500)] mb-6">{plan.desc}</p>
                <p className="text-3xl font-extrabold text-white mb-1">{plan.price}<span className="text-base font-semibold text-[var(--av-gray-400)]"> /month</span></p>
                <p className="text-sm text-[var(--av-gray-500)] mb-6">One-time setup: {plan.setup}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-[var(--av-gray-600)]">
                      <svg className="w-4 h-4 text-[var(--av-cyan)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`av-btn w-full text-center ${plan.highlight ? 'av-btn-primary' : 'av-btn-secondary'}`}>{plan.cta}</Link>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--av-gray-500)] text-center mt-8 max-w-2xl mx-auto leading-relaxed">
            Prices in USD. Monthly subscription and one-time setup/deployment fee are billed separately. Taxes extra where applicable. Third-party service/API costs are separate and billed separately where applicable.
          </p>

          <div className="mt-16 text-center">
            <h3 className="text-lg font-bold mb-3">Not sure which plan?</h3>
            <p className="text-sm text-[var(--av-gray-500)] mb-6 max-w-md mx-auto">
              Book a demo and we will help you find the right configuration for your team.
            </p>
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
