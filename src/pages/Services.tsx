import { Link } from 'react-router-dom'

const SERVICES = [
  { title: 'AI Sales Workforce', desc: 'A coordinated system of specialized AI workers handling research, qualification, outreach, follow-up, and reporting under human direction.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { title: 'Lead Research', desc: 'AI-powered discovery of relevant companies using your ICP criteria. Every company is verified through public evidence.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { title: 'Lead Qualification', desc: 'Evidence-based scoring against industry, geography, business type, product relevance, and contact availability criteria.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Outreach Preparation', desc: 'Personalized drafts built from verified company data. Every claim is grounded in evidence.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { title: 'Follow-Up Workflows', desc: 'Organized follow-up sequences that respect stop conditions and human preferences.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { title: 'Sales Reporting', desc: 'Clear visibility into pipeline, qualified leads, outreach status, and performance metrics.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { title: 'Sales Process Automation', desc: 'Automate repetitive tasks across your sales workflow while keeping humans in control of decisions.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { title: 'AI Workforce Design', desc: 'Custom AI workforce configurations designed around your specific sales workflow and business requirements.', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z' },
]

export default function Services() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--av-navy)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[420px] h-[420px] -top-40 -right-20" aria-hidden="true" />
        <div className="glow glow-cyan w-[380px] h-[380px] -bottom-48 -left-10" aria-hidden="true" />
        <div className="av-container relative z-10 py-20 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" aria-hidden="true" />
            Services
          </span>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white leading-tight tracking-tight mb-5">
            Everything your sales workforce needs
          </h1>
          <p className="text-[var(--av-gray-400)] text-lg max-w-xl mx-auto leading-relaxed">
            From market research to pipeline reporting — MUQTECH provides the AI capabilities your sales operation needs.
          </p>
        </div>
      </section>

      <section className="av-section bg-[var(--av-navy)]">
        <div className="av-container">
          <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {SERVICES.map((svc, i) => (
              <div key={i} className="av-card group !p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--av-blue-subtle)] border border-[rgba(109,92,255,0.3)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(109,92,255,0.22)] group-hover:border-[rgba(103,232,249,0.4)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--av-blue-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svc.icon} /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1.5">{svc.title}</h3>
                    <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-xl border border-[rgba(109,92,255,0.45)] bg-[linear-gradient(155deg,rgba(109,92,255,0.18),rgba(255,255,255,0.02))] text-center relative overflow-hidden">
            <div className="glow glow-violet w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
            <div className="relative">
              <h3 className="text-xl font-bold mb-3">Need a custom configuration?</h3>
              <p className="text-sm text-[var(--av-gray-400)] mb-6 max-w-lg mx-auto">
                Every AI Sales Workforce can be configured around your specific sales process, lead volume, ICP, and workflow requirements.
              </p>
              <Link to="/contact" className="av-btn av-btn-primary !py-3 !px-7">
                Talk to Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
