import { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQ_ITEMS = [
  {
    cat: 'Product',
    items: [
      { q: 'What is an AI Sales Workforce?', a: 'A coordinated system of specialized AI workers — Researcher, Lead Qualifier, Outreach Writer, Follow-Up Worker, and Reporter — each handling one part of the B2B sales process under human direction.' },
      { q: 'How does MUQTECH find prospects?', a: 'The Researcher worker uses configured search criteria — industry, geography, business type, and other ICP parameters — to discover real companies from public data sources. Every company is verified through evidence before being added to the pipeline.' },
      { q: 'What information does MUQTECH use?', a: 'Publicly available company information: websites, product pages, company profiles, and other public sources. No private data is accessed. No personal information is collected without evidence of a publicly available business contact.' },
    ]
  },
  {
    cat: 'AI Workforce',
    items: [
      { q: 'How does qualification work?', a: 'The Lead Qualifier evaluates each discovered company against your ICP criteria — industry match, geography, business type, product relevance, and contact availability. Every criterion produces a score backed by specific evidence. Unknown factors are marked as unknown.' },
      { q: 'How does MUQTECH prevent fabricated information?', a: 'Missing information stays marked as "unknown." Contacts are only created when there is evidence of an actual person. No emails are guessed. No company facts are invented. Every decision is traceable to evidence from public sources.' },
      { q: 'Can MUQTECH be customized to our ICP?', a: 'Yes. You define your Ideal Customer Profile — including industry, geography, business type, size, roles, and product relevance — and the AI workforce adapts its research, qualification, and outreach accordingly.' },
    ]
  },
  {
    cat: 'Human Control',
    items: [
      { q: 'Does MUQTECH automatically send messages?', a: 'No. MUQTECH prepares personalized outreach drafts, but every message requires explicit human approval before anything is sent. Humans review, edit, approve, or reject every draft.' },
      { q: 'Can humans review outreach?', a: 'Yes. Human review is mandatory for all outbound actions. The Approval Worker manages the review queue. You can approve, edit, or reject any draft.' },
      { q: 'Does MUQTECH replace our sales team?', a: 'No. MUQTECH handles repetitive, time-consuming sales support tasks — research, qualification, draft preparation, follow-up organization, and reporting. Your team handles judgment, relationships, negotiation, and final decisions.' },
    ]
  },
  {
    cat: 'Implementation',
    items: [
      { q: 'Which businesses can use MUQTECH?', a: 'B2B businesses that research, qualify, and reach out to other businesses. Our initial focus is wholesalers and distributors, particularly in the USA. The platform works for manufacturing, industrial, technology, professional services, and other B2B sectors.' },
      { q: 'Can MUQTECH work with our existing workflow?', a: 'Yes. MUQTECH is designed to complement your existing sales process. The AI workforce can be configured to match your ICP criteria, outreach style, and approval workflow.' },
    ]
  },
  {
    cat: 'Pricing',
    items: [
      { q: 'How much does MUQTECH cost?', a: 'Three simple USD plans: Starter at $299/month, Growth at $599/month, and Scale at $999/month, each with a one-time setup fee of $499, $999, and $1,999 respectively. The monthly subscription and the one-time setup/deployment fee are billed separately. Taxes are extra where applicable, and third-party service/API costs are separate and billed separately.' },
    ]
  },
  {
    cat: 'Security & Data',
    items: [
      { q: 'What happens to our data?', a: 'MUQTECH uses publicly available information to research companies and prepare outreach. Your ICP configuration and workflow settings are kept private to your account.' },
      { q: 'Does MUQTECH store customer data?', a: 'Research data and workflow configurations are stored to power your AI workforce. No data is shared with other customers. Contact us for specific data handling questions.' },
    ]
  }
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)} className="group border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
      <summary className="font-semibold text-[var(--av-gray-800)] cursor-pointer list-none flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
        {q}
        <svg className={`w-4 h-4 text-[var(--av-cyan)] transition-transform shrink-0 ml-3 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </summary>
      <div className="px-5 pb-4 text-sm text-[var(--av-gray-500)] leading-relaxed">{a}</div>
    </details>
  )
}

export default function FAQ() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--av-navy)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[420px] h-[420px] -top-40 -left-20" aria-hidden="true" />
        <div className="glow glow-cyan w-[380px] h-[380px] -bottom-48 -right-10" aria-hidden="true" />
        <div className="av-container relative z-10 py-20 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" aria-hidden="true" />
            FAQ
          </span>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white leading-tight tracking-tight mb-5">
            Frequently asked questions
          </h1>
          <p className="text-[var(--av-gray-400)] text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know about MUQTECH's AI Sales Workforce.
          </p>
        </div>
      </section>

      <section className="av-section bg-[var(--av-navy)]">
        <div className="max-w-3xl mx-auto px-[var(--container-px)]">
          {FAQ_ITEMS.map((group, gi) => (
            <div key={gi} className="mb-10">
              <h2 className="text-xs font-bold text-cyan-300/80 uppercase tracking-[0.16em] mb-4">{group.cat}</h2>
              <div className="space-y-3">
                {group.items.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
              </div>
            </div>
          ))}

          <div className="av-card mt-16 !p-8 text-center">
            <h3 className="text-lg font-bold mb-2">Have more questions?</h3>
            <p className="text-sm text-[var(--av-gray-500)] mb-5">Book a demo and we will walk you through exactly how MUQTECH works.</p>
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
