import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ─── Slide data ─── */
const SLIDES = [
  {
    id: 'hero',
    label: 'Product Overview',
    duration: 10000,
    section: 'hero',
  },
  {
    id: 'showcase',
    label: 'See the Workforce in Action',
    duration: 12000,
    section: 'showcase',
  },
  {
    id: 'workforce',
    label: 'AI Sales Workforce',
    duration: 10000,
    section: 'workforce',
  },
  {
    id: 'evidence',
    label: 'Evidence-First AI',
    duration: 10000,
    section: 'evidence',
  },
  {
    id: 'how',
    label: 'How It Works',
    duration: 10000,
    section: 'how',
  },
  {
    id: 'cta',
    label: 'Get Started',
    duration: 10000,
    section: 'cta',
  },
]

/* ─── Animated Counter ─── */
function AnimatedNumber({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 1500
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target])
  return <>{prefix}{val}{suffix}</>
}

/* ─── Slide: Hero ─── */
function HeroSlide() {
  return (
    <div className="relative overflow-hidden bg-[var(--av-navy)] min-h-full flex items-center">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="hero-glow bg-[var(--av-blue)]/15 top-[-100px] right-[-100px]" />
      <div className="hero-glow bg-[var(--av-cyan)]/10 bottom-[-50px] left-[-50px]" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" />
              AI Sales Workforce
            </span>
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Your AI Sales Workforce.{' '}
              <span className="bg-gradient-to-r from-[var(--av-blue-light)] to-[var(--av-cyan-light)] bg-clip-text text-transparent">
                Working alongside your team.
              </span>
            </h1>
            <p className="text-base lg:text-lg text-[var(--av-gray-400)] leading-relaxed mb-8 max-w-lg">
              MUQTECH brings research, lead qualification, outreach preparation, follow-up, and reporting into one coordinated AI workforce — with human approval where it matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="av-btn av-btn-primary !py-3.5 !px-8 !text-base">
                Book a Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/#how-it-works" className="av-btn av-btn-ghost !py-3.5 !px-8 !text-base">
                See How It Works
              </Link>
            </div>
          </div>
          {/* Product mockup */}
          <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="mock-panel shadow-2xl shadow-black/30 animate-glow">
              <div className="mock-panel-header">
                <div className="mock-dot bg-[#ff5f57]" />
                <div className="mock-dot bg-[#ffbd2e]" />
                <div className="mock-dot bg-[#28c840]" />
                <span className="mock-panel-title">MUQTECH Workforce</span>
                <span className="ml-auto text-[0.625rem] text-white/30 font-medium">Example workflow</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded bg-[#2563eb]/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <span className="text-[0.6875rem] font-semibold text-white/90">Researcher</span>
                    <span className="ml-auto mock-chip bg-emerald-500/20 text-emerald-400">Verified</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="mock-row"><span className="mock-label">Company</span><span className="mock-value">Texas Industrial Supply</span></div>
                    <div className="mock-row"><span className="mock-label">Evidence</span><div className="flex gap-1"><span className="mock-chip bg-white/10 text-white/70">Website</span><span className="mock-chip bg-white/10 text-white/70">Products</span></div></div>
                  </div>
                </div>
                <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.6875rem] font-semibold text-white/90">Lead Qualifier</span>
                    <span className="mock-score text-[var(--av-green-light)] ml-auto">82%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="mock-row"><span className="mock-label">Industry</span><span className="text-emerald-400 text-[0.6875rem]">✓ Match</span></div>
                    <div className="mock-row"><span className="mock-label">Geography</span><span className="text-emerald-400 text-[0.6875rem]">✓ Match</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
                    <span className="text-[0.6875rem] font-semibold text-white/90">Outreach</span>
                    <div className="mock-text-preview mt-1">"Hi John, I came across Texas Industrial Supply..."</div>
                    <div className="mt-2 mock-chip bg-[#06b6d4]/20 text-[#22d3ee]">Draft ready</div>
                  </div>
                  <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
                    <span className="text-[0.6875rem] font-semibold text-white/90">Human Review</span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-dot" />
                      <span className="text-[0.6875rem] text-amber-400 font-medium">Pending</span>
                    </div>
                    <div className="mock-btn-row mt-2">
                      <span className="mock-btn bg-emerald-500/20 text-emerald-400">Approve</span>
                      <span className="mock-btn bg-white/10 text-white/60">Edit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Slide: Product Showcase ─── */
function ShowcaseSlide() {
  return (
    <div className="min-h-full flex items-center bg-[var(--av-gray-50)] py-16">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="av-eyebrow">Product</span>
          <h2 className="av-section-title">See the workforce in action</h2>
          <p className="av-section-subtitle">From company research to human-approved outreach — every step is evidence-backed.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Research */}
          <div className="mock-panel">
            <div className="mock-panel-header">
              <span className="text-[0.625rem] font-semibold text-[var(--av-blue-light)] tracking-wider uppercase">Research</span>
            </div>
            <div className="mock-panel-body space-y-2">
              <div className="mock-row"><span className="mock-label">Company</span><span className="mock-value">Texas Industrial Supply</span></div>
              <div className="mock-row"><span className="mock-label">Domain</span><span className="mock-value text-[var(--av-cyan-light)]">texasindustrial.com</span></div>
              <div className="mock-divider" />
              <p className="text-[0.6875rem] text-white/40 font-medium uppercase tracking-wider">Evidence</p>
              <div className="flex flex-wrap gap-1">
                <span className="mock-chip bg-white/10 text-white/70">Website</span>
                <span className="mock-chip bg-white/10 text-white/70">Product page</span>
                <span className="mock-chip bg-white/10 text-white/70">Profile</span>
              </div>
              <div className="mock-row mt-1"><span className="mock-label">Status</span><span className="mock-chip bg-emerald-500/20 text-emerald-400">Verified</span></div>
            </div>
          </div>
          {/* Qualification */}
          <div className="mock-panel">
            <div className="mock-panel-header">
              <span className="text-[0.625rem] font-semibold text-[#a78bfa] tracking-wider uppercase">Qualification</span>
            </div>
            <div className="mock-panel-body">
              <div className="flex items-center gap-3 mb-3">
                <span className="mock-score text-[var(--av-green-light)]">82%</span>
                <span className="text-[0.6875rem] text-white/50">ICP Match</span>
              </div>
              <div className="space-y-1.5">
                <div className="mock-row"><span className="mock-label">Industry</span><span className="text-emerald-400 text-[0.6875rem]">✓ Match</span></div>
                <div className="mock-row"><span className="mock-label">Geography</span><span className="text-emerald-400 text-[0.6875rem]">✓ Match</span></div>
                <div className="mock-row"><span className="mock-label">Business Type</span><span className="text-emerald-400 text-[0.6875rem]">✓ Match</span></div>
                <div className="mock-row"><span className="mock-label">Product Relevance</span><span className="text-emerald-400 text-[0.6875rem]">✓ Match</span></div>
                <div className="mock-row"><span className="mock-label">Contact</span><span className="text-amber-400 text-[0.6875rem]">Unknown</span></div>
              </div>
            </div>
          </div>
          {/* Outreach + Approval */}
          <div className="space-y-4">
            <div className="mock-panel">
              <div className="mock-panel-header">
                <span className="text-[0.625rem] font-semibold text-[#22d3ee] tracking-wider uppercase">Outreach</span>
                <span className="ml-auto mock-chip bg-[#06b6d4]/20 text-[#22d3ee]">Draft ready</span>
              </div>
              <div className="mock-panel-body">
                <p className="text-[0.6875rem] text-white/40 mb-1">Subject</p>
                <p className="text-[0.75rem] text-white/90 font-medium mb-2">A question about your distribution team</p>
                <div className="mock-text-preview">"Hi John, I came across Texas Industrial Supply while researching distributors in the region..."</div>
              </div>
            </div>
            <div className="mock-panel border-amber-500/20">
              <div className="mock-panel-body">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-dot" />
                  <span className="text-[0.6875rem] font-semibold text-amber-400">Ready for review</span>
                </div>
                <div className="mock-btn-row">
                  <span className="mock-btn bg-emerald-500/20 text-emerald-400">Approve</span>
                  <span className="mock-btn bg-white/10 text-white/60">Edit</span>
                  <span className="mock-btn bg-white/10 text-white/60">Reject</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-[var(--av-gray-400)] mt-6 italic animate-fade-in" style={{ animationDelay: '0.4s' }}>Illustrative workflow — not customer results</p>
      </div>
    </div>
  )
}

/* ─── Slide: AI Workforce ─── */
function WorkforceSlide() {
  const workers = [
    { num: '01', title: 'Researcher', desc: 'Discovers relevant companies and gathers evidence from public sources.', color: '#6D5CFF' },
    { num: '02', title: 'Lead Qualifier', desc: 'Evaluates prospects against your ICP using evidence-based criteria.', color: '#8B7CFF' },
    { num: '03', title: 'Outreach Writer', desc: 'Creates personalized drafts grounded in verified company information.', color: '#22D3EE' },
    { num: '04', title: 'Follow-Up Worker', desc: 'Organizes follow-up sequences and respects stop conditions.', color: '#67E8F9' },
    { num: '05', title: 'Reporter', desc: 'Turns sales activity into clear pipeline visibility and reporting.', color: '#6D5CFF' },
  ]
  return (
    <div className="min-h-full flex items-center bg-[var(--av-ink)] py-16">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="av-eyebrow">The Solution</span>
          <h2 className="av-section-title">One workforce. Multiple specialized capabilities.</h2>
          <p className="av-section-subtitle">Each worker handles a specific part of the sales process.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {workers.map((w, i) => (
            <div key={i} className="av-card relative overflow-hidden animate-fade-in-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${w.color}, transparent)` }} />
              <span className="text-[2.5rem] font-bold text-white/5 absolute -top-2 -right-1 select-none">{w.num}</span>
              <h3 className="text-lg font-bold mb-2">{w.title}</h3>
              <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">{w.desc}</p>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-xl bg-[var(--av-navy)] text-white p-8 sm:col-span-2 lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--av-cyan)] to-[var(--av-blue)]" />
            <span className="text-[2.5rem] font-extrabold text-white/10 absolute -top-2 -right-1 select-none">06</span>
            <h3 className="text-lg font-bold mb-3">Human Control</h3>
            <p className="text-sm text-[var(--av-gray-400)] leading-relaxed">AI handles the work. You handle the judgment.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Slide: Evidence-First ─── */
function EvidenceSlide() {
  return (
    <div className="min-h-full flex items-center bg-[var(--av-navy)] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold text-white leading-tight tracking-tight mb-4">AI should not guess when the data is unknown</h2>
          <p className="text-[var(--av-gray-400)] text-lg">Every decision is grounded in available evidence — unknown data stays unknown.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {['Evidence', 'Qualification', 'Human Review', 'Action'].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="px-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold text-white">{step}</div>
              {i < 3 && <svg className="w-5 h-5 text-[var(--av-gray-500)] shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>}
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Evidence-Based Research', desc: 'Every claim is traceable to a source.' },
            { label: 'Explicit Unknown States', desc: 'Missing information is not treated as fact.' },
            { label: 'No Fabricated Contacts', desc: 'Real people only. No guessed contacts.' },
            { label: 'Human Approval', desc: 'Important actions remain under human control.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5 animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <svg className="w-4 h-4 text-[var(--av-cyan-light)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[var(--av-gray-400)] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Slide: How It Works ─── */
function HowSlide() {
  const steps = [
    { num: '01', title: 'Define Your ICP', desc: 'Industry, geography, business type, size, and roles.' },
    { num: '02', title: 'Research the Market', desc: 'AI workers discover real companies and gather public evidence.' },
    { num: '03', title: 'Identify & Qualify', desc: 'Evidence-based scoring against your criteria.' },
    { num: '04', title: 'Prepare Outreach', desc: 'Personalized drafts from verified data only.' },
    { num: '05', title: 'Human Approval', desc: 'Nothing goes out without your explicit review.', highlight: true },
    { num: '06', title: 'Track & Report', desc: 'Full visibility into pipeline and results.' },
  ]
  return (
    <div className="min-h-full flex items-center bg-[var(--av-gray-50)] py-16">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="av-eyebrow">Process</span>
          <h2 className="av-section-title">From prospect discovery to human-approved action</h2>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute top-[2.25rem] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[rgba(109,92,255,0.2)] via-[var(--av-cyan)] to-[rgba(109,92,255,0.2)]" />
            <div className="grid grid-cols-6 gap-4 relative">
              {steps.map((s, i) => (
                <div key={i} className="text-center relative animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`w-11 h-11 rounded-full mx-auto mb-4 flex items-center justify-center text-sm font-bold relative z-10 ${s.highlight ? 'bg-[var(--av-blue)] text-white ring-4 ring-[var(--av-blue-muted)]' : 'bg-[#0A0F1A] text-[var(--av-cyan-light)] border-2 border-cyan-400/40'}`}>{s.num}</div>
                  <h3 className="text-sm font-bold mb-1">{s.title}</h3>
                  <p className="text-xs text-[var(--av-gray-500)] leading-relaxed">{s.desc}</p>
                  {s.highlight && <span className="inline-block mt-2 px-2 py-0.5 bg-[var(--av-blue-subtle)] text-[var(--av-blue-light)] text-[10px] font-semibold rounded-full">Mandatory</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Slide: CTA ─── */
function CtaSlide() {
  return (
    <div className="min-h-full flex items-center bg-[var(--av-navy)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="hero-glow bg-[var(--av-blue)]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="w-full max-w-7xl mx-auto px-8 relative z-10 text-center animate-fade-in-up">
        <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold text-white leading-tight tracking-tight mb-4">Build a sales workforce that works with your team</h2>
        <p className="text-[var(--av-gray-400)] text-lg max-w-2xl mx-auto mb-10">See how MUQTECH can turn repetitive sales work into a coordinated AI-powered workflow.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/contact" className="av-btn av-btn-primary !py-3.5 !px-8 !text-base">
            Book a Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link to="/#how-it-works" className="av-btn av-btn-ghost !py-3.5 !px-8 !text-base">See How It Works</Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Slide renderer ─── */
const SLIDE_COMPONENTS: Record<string, React.FC> = {
  hero: HeroSlide,
  showcase: ShowcaseSlide,
  workforce: WorkforceSlide,
  evidence: EvidenceSlide,
  how: HowSlide,
  cta: CtaSlide,
}

/* ─── Main Demo Page ─── */
export default function Demo() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimeRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  const goTo = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(SLIDES.length - 1, idx))
    setCurrent(next)
    setProgress(0)
    startTimeRef.current = Date.now()
  }, [])

  const next = useCallback(() => goTo(current < SLIDES.length - 1 ? current + 1 : 0), [current, goTo])
  const prev = useCallback(() => goTo(current > 0 ? current - 1 : SLIDES.length - 1), [current, goTo])

  // Auto-advance timer
  useEffect(() => {
    if (!playing) return
    const duration = SLIDES[current].duration
    startTimeRef.current = Date.now()
    setProgress(0)

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      if (pct >= 1) {
        next()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [current, playing, next])

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      else if (e.key === 'p' || e.key === 'P') { setPlaying(p => !p) }
      else if (e.key === 'Escape') { setPlaying(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const SlideComponent = SLIDE_COMPONENTS[SLIDES[current].id]
  const slide = SLIDES[current]

  return (
    <div className="h-screen flex flex-col bg-[var(--av-navy)]">
      {/* ─── Top Bar ─── */}
      <div className="relative z-50 bg-[var(--av-navy-light)] border-b border-white/10 px-6 py-3 flex items-center gap-4 shrink-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mr-4 shrink-0">
          <img src="/brand/muqtech-logo.png" alt="MUQTECH" className="h-7 w-auto" />
          <span className="text-sm font-bold text-white hidden sm:block">MUQTECH</span>
        </Link>

        {/* Demo badge */}
        <span className="px-2.5 py-0.5 bg-[var(--av-blue)]/20 border border-[var(--av-blue)]/30 rounded-full text-[0.625rem] font-semibold text-[var(--av-cyan-light)] tracking-wider uppercase shrink-0">
          Demo Mode
        </span>

        {/* Slide label */}
        <span className="text-sm text-white/60 font-medium truncate">{slide.label}</span>

        {/* Slide counter */}
        <span className="text-xs text-white/40 ml-auto shrink-0">{current + 1} / {SLIDES.length}</span>

        {/* Controls */}
        <div className="flex items-center gap-2 ml-3 shrink-0">
          <button onClick={prev} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Previous slide">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => setPlaying(p => !p)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
            )}
          </button>
          <button onClick={next} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Next slide">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* ─── Progress bar ─── */}
      <div className="h-0.5 bg-white/5 shrink-0 relative z-50">
        <div
          className="h-full bg-gradient-to-r from-[var(--av-blue)] to-[var(--av-cyan)] transition-none"
          style={{ width: `${((current + progress) / SLIDES.length) * 100}%` }}
        />
      </div>

      {/* ─── Slide dots ─── */}
      <div className="flex items-center justify-center gap-2 py-3 bg-[var(--av-navy)] border-b border-white/5 shrink-0 relative z-50">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setPlaying(false); goTo(i) }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[var(--av-blue)]' : i < current ? 'w-3 bg-[var(--av-blue)]/40' : 'w-3 bg-white/15 hover:bg-white/25'}`}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
          />
        ))}
      </div>

      {/* ─── Slide content ─── */}
      <div className="flex-1 overflow-hidden relative">
        <div key={current} className="absolute inset-0 animate-fade-in">
          <SlideComponent />
        </div>
      </div>

      {/* ─── Bottom info bar ─── */}
      <div className="flex items-center justify-between px-6 py-2 bg-[var(--av-navy-light)] border-t border-white/10 text-[0.625rem] text-white/30 shrink-0 relative z-50">
        <span>MUQTECH — AI Workforce for Business Growth</span>
        <span>Keyboard: ← → navigate · Space next · P pause · Esc stop</span>
        <span>Illustrative data — not customer results</span>
      </div>
    </div>
  )
}
