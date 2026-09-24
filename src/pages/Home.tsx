import { useEffect, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ─── Lightweight neural-network canvas for the hero ─── */
function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    type P = { x: number; y: number; vx: number; vy: number }
    let raf = 0
    let w = 0
    let h = 0
    let pts: P[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = w < 640 ? 24 : w < 1024 ? 38 : 54
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const maxD = 140
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxD) {
            ctx.strokeStyle = `rgba(103,232,249,${(1 - d / maxD) * 0.15})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = i % 3 === 0 ? 'rgba(139,124,255,0.55)' : 'rgba(103,232,249,0.45)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    resize()
    draw()
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (raf === 0) {
        raf = requestAnimationFrame(draw)
      }
    }
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

/* ─── Existing content data (unchanged) ─── */
const WORKERS = [
  { num: '01', title: 'Researcher', desc: 'Discovers relevant companies and gathers evidence from public sources.', color: '#6D5CFF', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { num: '02', title: 'Lead Qualifier', desc: 'Evaluates prospects against your ICP using evidence-based criteria.', color: '#8B7CFF', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { num: '03', title: 'Outreach Writer', desc: 'Creates personalized drafts grounded in verified company information.', color: '#22D3EE', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { num: '04', title: 'Follow-Up Worker', desc: 'Organizes follow-up sequences and respects stop conditions.', color: '#67E8F9', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { num: '05', title: 'Reporter', desc: 'Turns sales activity into clear pipeline visibility and reporting.', color: '#6D5CFF', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
]

const STEPS = [
  { num: '01', title: 'Define Your ICP', desc: 'Industry, geography, business type, size, and roles.' },
  { num: '02', title: 'Research the Market', desc: 'AI workers discover real companies and gather public evidence.' },
  { num: '03', title: 'Identify & Qualify', desc: 'Evidence-based scoring against your criteria.' },
  { num: '04', title: 'Prepare Outreach', desc: 'Personalized drafts from verified data only.' },
  { num: '05', title: 'Human Approval', desc: 'Nothing goes out without your explicit review.', highlight: true },
  { num: '06', title: 'Track & Report', desc: 'Full visibility into pipeline and results.' },
]

const INDUSTRIES = [
  { name: 'Wholesalers & Distributors', primary: true, desc: 'Find relevant buyers, qualify accounts, prepare personalized outreach.' },
  { name: 'Manufacturing', desc: 'Connect with distributors, suppliers, and business partners.' },
  { name: 'Industrial', desc: 'Research across energy, construction, and logistics sectors.' },
  { name: 'Technology', desc: 'Identify and qualify potential B2B customers and partners.' },
  { name: 'Professional Services', desc: 'Research and outreach for service firms targeting businesses.' },
  { name: 'Other B2B', desc: 'Any B2B organization that wants to scale sales research.' },
]

/* ─── End-to-end AI sales pipeline ─── */
const FLOW = [
  { t: 'Lead Research', d: 'ICP-matched prospects discovered from public data' },
  { t: 'Company Research', d: 'Evidence collected and verified per account' },
  { t: 'Outreach', d: 'Personalized drafts built from real data' },
  { t: 'Follow-Up', d: 'Sequences that respect stop conditions' },
  { t: 'Meeting', d: 'Coordination with mandatory human approval' },
  { t: 'CRM', d: 'Every touchpoint logged and organized' },
  { t: 'Revenue', d: 'Pipeline and revenue analytics' },
]

const FLOW_CAPS = ['Lead generation', 'Company research', 'Outreach preparation', 'Follow-up management', 'CRM management', 'Meeting coordination', 'Proposals', 'Revenue analytics']

/* ─── MUQTECH AI Core modules ─── */
const CORE_MODULES = [
  { name: 'Memory', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 10c0-2.21-3.582-4-8-4s-8 1.79-8 4' },
  { name: 'Knowledge', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { name: 'Reasoning', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { name: 'Tools', icon: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z' },
  { name: 'Automation', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { name: 'CRM', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Communication', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
]

/* ─── Hero Product Mockup (desktop + mobile) ─── */
function HeroMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative" aria-hidden="true">
      <div className={`mock-panel shadow-2xl shadow-black/40 ${compact ? '' : 'animate-glow'}`}>
        <div className="mock-panel-header">
          <div className="mock-dot bg-[#ff5f57]" />
          <div className="mock-dot bg-[#ffbd2e]" />
          <div className="mock-dot bg-[#28c840]" />
          <span className="mock-panel-title">MUQTECH Workforce</span>
          <span className="ml-auto text-[0.625rem] text-white/30 font-medium">Example workflow</span>
        </div>
        <div className={`p-4 space-y-3 ${compact ? 'p-3 space-y-2' : ''}`}>
          <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-[#6D5CFF]/25 flex items-center justify-center">
                <svg className="w-3 h-3 text-[#A5B4FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <span className="text-[0.6875rem] font-semibold text-white/90">Researcher</span>
              <span className="ml-auto mock-chip bg-emerald-500/20 text-emerald-400">Verified</span>
            </div>
            <div className="space-y-1.5">
              <div className="mock-row">
                <span className="mock-label">Company</span>
                <span className="mock-value">Texas Industrial Supply</span>
              </div>
              <div className="mock-row">
                <span className="mock-label">Website</span>
                <span className="mock-value text-[var(--av-cyan-light)]">texasindustrial.com</span>
              </div>
              <div className="mock-row">
                <span className="mock-label">Evidence</span>
                <div className="flex gap-1">
                  <span className="mock-chip bg-white/10 text-white/70">Website</span>
                  <span className="mock-chip bg-white/10 text-white/70">Products</span>
                  <span className="mock-chip bg-white/10 text-white/70">Profile</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-[#8B7CFF]/25 flex items-center justify-center">
                <svg className="w-3 h-3 text-[#C4B5FD]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-[0.6875rem] font-semibold text-white/90">Lead Qualifier</span>
              <span className="mock-score text-[var(--av-green-light)] ml-auto">82%</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="mock-row"><span className="mock-label">Industry</span><span className="text-emerald-400 text-[0.6875rem]">&#10003; Match</span></div>
              <div className="mock-row"><span className="mock-label">Geography</span><span className="text-emerald-400 text-[0.6875rem]">&#10003; Match</span></div>
              <div className="mock-row"><span className="mock-label">Business Type</span><span className="text-emerald-400 text-[0.6875rem]">&#10003; Match</span></div>
              <div className="mock-row"><span className="mock-label">Contact</span><span className="text-amber-400 text-[0.6875rem]">Unknown</span></div>
            </div>
          </div>

          <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
            <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-[#22D3EE]/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#22d3ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <span className="text-[0.6875rem] font-semibold text-white/90">Outreach</span>
              </div>
              <div className="mock-text-preview">"Hi John, I came across Texas Industrial Supply while researching distributors in the region..."</div>
              <div className="mt-2 mock-chip bg-[#22D3EE]/20 text-[#22d3ee]">Draft ready</div>
            </div>
            <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-[var(--av-amber)]/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span className="text-[0.6875rem] font-semibold text-white/90">Human Review</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-dot" />
                <span className="text-[0.6875rem] text-amber-400 font-medium">Pending approval</span>
              </div>
              <div className="mock-btn-row mt-3">
                <span className="mock-btn bg-emerald-500/20 text-emerald-400">Approve</span>
                <span className="mock-btn bg-white/10 text-white/60">Edit</span>
                <span className="mock-btn bg-white/10 text-white/60">Reject</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 bg-[var(--av-navy-light)] border border-white/10 rounded-lg px-3 py-2 shadow-xl animate-float">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#6D5CFF]/25 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#A5B4FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div>
            <p className="text-[0.625rem] text-white/50 font-medium">Reporter</p>
            <p className="text-xs font-bold text-white">11 qualified leads</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Workflow Showcase Panels ─── */
function WorkflowShowcase() {
  return (
    <div className="grid lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      <div className="mock-panel">
        <div className="mock-panel-header">
          <span className="text-[0.625rem] font-semibold text-[var(--av-blue-light)] tracking-wider uppercase">Research</span>
        </div>
        <div className="mock-panel-body space-y-2">
          <div className="mock-row">
            <span className="mock-label">Company</span>
            <span className="mock-value">Texas Industrial Supply</span>
          </div>
          <div className="mock-row">
            <span className="mock-label">Domain</span>
            <span className="mock-value text-[var(--av-cyan-light)]">texasindustrial.com</span>
          </div>
          <div className="mock-divider" />
          <p className="text-[0.6875rem] text-white/40 font-medium uppercase tracking-wider">Evidence</p>
          <div className="flex flex-wrap gap-1">
            <span className="mock-chip bg-white/10 text-white/70">Website</span>
            <span className="mock-chip bg-white/10 text-white/70">Product page</span>
            <span className="mock-chip bg-white/10 text-white/70">Company profile</span>
          </div>
          <div className="mock-row mt-1">
            <span className="mock-label">Status</span>
            <span className="mock-chip bg-emerald-500/20 text-emerald-400">Verified</span>
          </div>
        </div>
      </div>

      <div className="mock-panel">
        <div className="mock-panel-header">
          <span className="text-[0.625rem] font-semibold text-[#C4B5FD] tracking-wider uppercase">Qualification</span>
        </div>
        <div className="mock-panel-body">
          <div className="flex items-center gap-3 mb-3">
            <span className="mock-score text-[var(--av-green-light)]">82%</span>
            <span className="text-[0.6875rem] text-white/50">ICP Match</span>
          </div>
          <div className="space-y-1.5">
            <div className="mock-row"><span className="mock-label">Industry</span><span className="text-emerald-400 text-[0.6875rem]">&#10003; Match</span></div>
            <div className="mock-row"><span className="mock-label">Geography</span><span className="text-emerald-400 text-[0.6875rem]">&#10003; Match</span></div>
            <div className="mock-row"><span className="mock-label">Business Type</span><span className="text-emerald-400 text-[0.6875rem]">&#10003; Match</span></div>
            <div className="mock-row"><span className="mock-label">Product Relevance</span><span className="text-emerald-400 text-[0.6875rem]">&#10003; Match</span></div>
            <div className="mock-row"><span className="mock-label">Contact</span><span className="text-amber-400 text-[0.6875rem]">Unknown</span></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="mock-panel">
          <div className="mock-panel-header">
            <span className="text-[0.625rem] font-semibold text-[#22d3ee] tracking-wider uppercase">Outreach</span>
            <span className="ml-auto mock-chip bg-[#22D3EE]/20 text-[#22d3ee]">Draft ready</span>
          </div>
          <div className="mock-panel-body">
            <p className="text-[0.6875rem] text-white/40 mb-1">Subject</p>
            <p className="text-[0.75rem] text-white/90 font-medium mb-2">A question about your distribution team</p>
            <p className="text-[0.6875rem] text-white/40 mb-1">Body preview</p>
            <div className="mock-text-preview">"Hi John, I came across Texas Industrial Supply while researching distributors in the region. Your product range caught our attention..."</div>
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
  )
}

/* ─── AI Sales Workforce: end-to-end flow ─── */
function SalesFlow() {
  const arrowR = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  )
  const arrowD = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
  )
  const node = (s: { t: string; d: string }, i: number) => (
    <div className="flow-node">
      <span className="n">STEP {String(i + 1).padStart(2, '0')}</span>
      <span className="t">{s.t}</span>
      <span className="d">{s.d}</span>
    </div>
  )
  return (
    <>
      {/* Desktop: horizontal pipeline */}
      <div className="hidden lg:flex items-center gap-2 max-w-6xl mx-auto reveal">
        {FLOW.map((s, i) => (
          <Fragment key={s.t}>
            {i > 0 && <span className="flow-arrow" aria-hidden="true">{arrowR}</span>}
            {node(s, i)}
          </Fragment>
        ))}
      </div>
      {/* Mobile: vertical pipeline */}
      <div className="lg:hidden max-w-sm mx-auto flex flex-col gap-1 reveal">
        {FLOW.map((s, i) => (
          <Fragment key={s.t}>
            {node(s, i)}
            {i < FLOW.length - 1 && <div className="flow-arrow-v flex justify-center py-0.5" aria-hidden="true">{arrowD}</div>}
          </Fragment>
        ))}
      </div>
      {/* Capability tags */}
      <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto mt-10 reveal">
        {FLOW_CAPS.map((c) => (
          <span key={c} className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--av-gray-400)] bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:text-cyan-200 transition-colors">
            {c}
          </span>
        ))}
      </div>
    </>
  )
}

/* ─── MUQTECH AI CORE: central core + connected modules ─── */
function CoreNode({ m }: { m: { name: string; icon: string } }) {
  return (
    <div className="core-node">
      <span className="cn-icon">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={m.icon} /></svg>
      </span>
      <span className="cn-name">{m.name}</span>
    </div>
  )
}

function AICore() {
  const tops = ['7%', '32%', '57%', '82%']
  return (
    <>
      {/* Desktop diagram */}
      <div className="hidden lg:block relative max-w-4xl mx-auto reveal" style={{ height: '540px' }}>
        <svg className="core-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {[12, 37, 62, 87].map((y) => (
            <Fragment key={y}>
              <line x1="50" y1="50" x2="24.5" y2={y} />
              <line x1="50" y1="50" x2="75.5" y2={y} />
            </Fragment>
          ))}
        </svg>
        {CORE_MODULES.slice(0, 4).map((m, i) => (
          <div key={m.name} className="core-node absolute left-0 w-[230px]" style={{ top: tops[i] }}>
            <span className="cn-icon">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={m.icon} /></svg>
            </span>
            <span className="cn-name">{m.name}</span>
          </div>
        ))}
        {CORE_MODULES.slice(4).map((m, i) => (
          <div key={m.name} className="core-node absolute right-0 w-[230px]" style={{ top: tops[i] }}>
            <span className="cn-icon">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={m.icon} /></svg>
            </span>
            <span className="cn-name">{m.name}</span>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="core-center">
            <span className="core-label">MUQTECH AI Core</span>
            <span className="core-sub">Orchestrating 8 modules</span>
          </div>
        </div>
      </div>

      {/* Mobile diagram */}
      <div className="lg:hidden max-w-md mx-auto reveal">
        <div className="flex justify-center mb-8">
          <div className="core-center">
            <span className="core-label">MUQTECH AI Core</span>
            <span className="core-sub">Orchestrating 8 modules</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CORE_MODULES.map((m) => <CoreNode key={m.name} m={m} />)}
        </div>
      </div>
    </>
  )
}

export default function Home() {
  const heroRef = useReveal()
  const problemRef = useReveal()
  const flowRef = useReveal()
  const showcaseRef = useReveal()
  const workforceRef = useReveal()
  const coreRef = useReveal()
  const howRef = useReveal()
  const evidenceRef = useReveal()
  const industriesRef = useReveal()
  const capabilitiesRef = useReveal()
  const whyRef = useReveal()
  const pricingRef = useReveal()
  const founderRef = useReveal()
  const ctaRef = useReveal()
  const faqRef = useReveal()

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="relative overflow-hidden bg-[var(--av-navy)]" aria-labelledby="hero-heading">
        <NeuralCanvas />
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[480px] h-[480px] -top-40 -right-40" aria-hidden="true" />
        <div className="glow glow-cyan w-[420px] h-[420px] -bottom-48 -left-40" aria-hidden="true" />

        <div className="av-container relative z-10 py-16 lg:py-24 xl:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="max-w-xl reveal-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" aria-hidden="true" />
                AI Sales Workforce
              </span>
              <h1 id="hero-heading" className="text-[2.25rem] sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] tracking-tight mb-5">
                Your AI Workforce.
                <span className="block text-grad">Working 24/7.</span>
              </h1>
              <p className="text-base lg:text-lg text-[var(--av-gray-400)] leading-relaxed mb-8 max-w-lg">
                MUQTECH delivers AI-powered sales and business automation for B2B companies — research, lead qualification, outreach preparation, follow-up, and reporting coordinated into one AI workforce, with human approval where it matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#sales-flow" className="av-btn av-btn-primary !py-3.5 !px-8 !text-base">
                  Explore AI Workforce
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </a>
                <Link to="/contact" className="av-btn av-btn-ghost !py-3.5 !px-8 !text-base">
                  Book a Demo
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-8" aria-hidden="true">
                <span className="status-chip"><span className="dot" /><b>AI Core</b> — Online</span>
                <span className="status-chip violet"><span className="dot" /><b>AI Workforce</b> — Active</span>
                <span className="status-chip"><span className="dot" /><b>Lead Engine</b> — Running</span>
                <span className="status-chip violet"><span className="dot" /><b>Automation</b> — Active</span>
              </div>
            </div>
            <div className="hidden lg:block reveal-right">
              <HeroMockup />
            </div>
            <div className="lg:hidden reveal-scale" style={{ transitionDelay: '0.2s' }}>
              <HeroMockup compact />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST STRIP ═══════════ */}
      <section className="border-y border-white/5 bg-[#04060A]" aria-label="Trust principles">
        <div className="av-container py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-[var(--av-gray-500)] tracking-wide uppercase">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--av-cyan)] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />Evidence-Backed Research</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--av-cyan)] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />Human Approval</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--av-cyan)] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />No Fabricated Contacts</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--av-cyan)] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />Configurable Workflows</span>
          </div>
        </div>
      </section>

      {/* ═══════════ PROBLEM ═══════════ */}
      <section ref={problemRef} className="av-section bg-[var(--av-navy)]" aria-labelledby="problem-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">The Problem</span>
            <h2 id="problem-heading" className="av-section-title">Your sales team should spend more time selling</h2>
            <p className="av-section-subtitle">Manual research, scattered information and repetitive follow-up consume time that could be spent with real prospects.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { num: '01', title: 'Manual Research', desc: 'Finding and verifying companies takes hours of manual work across multiple sources.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { num: '02', title: 'Inconsistent Qualification', desc: 'Different team members apply different standards to the same prospects.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { num: '03', title: 'Follow-Up Gaps', desc: 'Good opportunities get lost between conversations and across tools.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
            ].map((p, i) => (
              <div key={i} className={`av-card !p-6 relative overflow-hidden reveal reveal-delay-${i + 1}`}>
                <span className="text-[3rem] font-bold text-white/5 absolute -top-3 -right-1 select-none" aria-hidden="true">{p.num}</span>
                <div className="w-10 h-10 rounded-lg bg-[var(--av-blue-subtle)] border border-[rgba(109,92,255,0.3)] flex items-center justify-center mb-4 relative">
                  <svg className="w-5 h-5 text-[var(--av-blue-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} /></svg>
                </div>
                <h3 className="text-base font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--av-gray-500)] leading-relaxed relative">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AI SALES WORKFORCE FLOW ═══════════ */}
      <section ref={flowRef} id="sales-flow" className="av-section bg-[var(--av-ink)] border-y border-white/5" aria-labelledby="flow-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">AI Sales Workforce</span>
            <h2 id="flow-heading" className="av-section-title">One intelligent pipeline — lead to revenue</h2>
            <p className="av-section-subtitle">Lead research, company research, outreach, follow-ups, meeting coordination, CRM, proposals, and revenue analytics — operating as one coordinated system under your direction.</p>
          </div>
          <SalesFlow />
        </div>
      </section>

      {/* ═══════════ PRODUCT SHOWCASE ═══════════ */}
      <section ref={showcaseRef} className="av-section bg-[var(--av-navy)]" aria-labelledby="showcase-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">Product</span>
            <h2 id="showcase-heading" className="av-section-title">See the workforce in action</h2>
            <p className="av-section-subtitle">From company research to human-approved outreach — every step is evidence-backed and transparent.</p>
          </div>
          <div className="reveal">
            <WorkflowShowcase />
          </div>
          <p className="text-center text-xs text-[var(--av-gray-500)] mt-6 italic reveal">Illustrative data — not customer results</p>
        </div>
      </section>

      {/* ═══════════ AI WORKFORCE ═══════════ */}
      <section ref={workforceRef} id="workforce" className="av-section bg-[var(--av-ink)]" aria-labelledby="workforce-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">The Solution</span>
            <h2 id="workforce-heading" className="av-section-title">One workforce. Multiple specialized capabilities.</h2>
            <p className="av-section-subtitle">Each worker handles a specific part of the sales process. Together they operate as one system under your direction.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {WORKERS.map((w, i) => (
              <div key={i} className={`av-card group relative overflow-hidden reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${w.color}, transparent)` }} aria-hidden="true" />
                <span className="text-[2.5rem] font-bold text-white/5 absolute -top-2 -right-1 select-none" aria-hidden="true">{w.num}</span>
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border" style={{ background: `${w.color}1a`, borderColor: `${w.color}55` }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: w.color }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={w.icon} /></svg>
                    </div>
                    <h3 className="text-lg font-bold">{w.title}</h3>
                  </div>
                  <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
            <div className="relative overflow-hidden rounded-xl border border-[rgba(109,92,255,0.45)] bg-[linear-gradient(155deg,rgba(109,92,255,0.22),rgba(255,255,255,0.02))] p-8 sm:col-span-2 lg:col-span-1 reveal reveal-delay-4">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--av-cyan)] to-[var(--av-blue)]" aria-hidden="true" />
              <span className="text-[2.5rem] font-bold text-white/10 absolute -top-2 -right-1 select-none" aria-hidden="true">06</span>
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-[var(--av-cyan-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Human Control</h3>
                <p className="text-sm text-[var(--av-gray-400)] leading-relaxed">
                  AI handles the work.<br />You handle the judgment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MUQTECH AI CORE ═══════════ */}
      <section ref={coreRef} id="core" className="av-section bg-[var(--av-navy)] relative overflow-hidden" aria-labelledby="core-heading">
        <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
        <div className="glow glow-violet w-[520px] h-[520px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <div className="av-container relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">MUQTECH AI Core</span>
            <h2 id="core-heading" className="av-section-title">The intelligence layer beneath every workflow</h2>
            <p className="av-section-subtitle">Eight coordinated modules — Memory, Knowledge, Reasoning, Tools, Automation, CRM, Communication, and Analytics — power research, qualification, outreach, and reporting end to end.</p>
          </div>
          <AICore />
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section ref={howRef} id="how-it-works" className="av-section bg-[var(--av-ink)]" aria-labelledby="how-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">Process</span>
            <h2 id="how-heading" className="av-section-title">From prospect discovery to human-approved action</h2>
          </div>
          {/* Desktop */}
          <div className="hidden lg:block max-w-5xl mx-auto reveal">
            <div className="relative">
              <div className="absolute top-[2.25rem] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[rgba(109,92,255,0.15)] via-[var(--av-cyan)] to-[rgba(109,92,255,0.15)]" aria-hidden="true" />
              <div className="grid grid-cols-6 gap-4 relative">
                {STEPS.map((s, i) => (
                  <div key={i} className="text-center relative">
                    <div className={`w-11 h-11 rounded-full mx-auto mb-4 flex items-center justify-center text-sm font-bold relative z-10 ${s.highlight ? 'bg-gradient-to-br from-[#6D5CFF] to-[#4F46E5] text-white ring-4 ring-[rgba(109,92,255,0.25)]' : 'bg-[#0A0F1A] text-[var(--av-cyan-light)] border border-cyan-400/40 shadow-[0_0_18px_-6px_rgba(34,211,238,0.6)]'}`}>{s.num}</div>
                    <h3 className="text-sm font-bold mb-1">{s.title}</h3>
                    <p className="text-xs text-[var(--av-gray-500)] leading-relaxed">{s.desc}</p>
                    {s.highlight && <span className="inline-block mt-2 px-2 py-0.5 bg-[var(--av-blue-subtle)] border border-[rgba(109,92,255,0.35)] text-[var(--av-blue-light)] text-[10px] font-semibold rounded-full">Mandatory</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile */}
          <div className="lg:hidden max-w-md mx-auto reveal">
            <div className="relative pl-8">
              <div className="absolute left-[1.375rem] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[rgba(109,92,255,0.3)] via-[rgba(34,211,238,0.4)] to-[rgba(109,92,255,0.1)]" aria-hidden="true" />
              <div className="space-y-8">
                {STEPS.map((s, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-8 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.highlight ? 'bg-gradient-to-br from-[#6D5CFF] to-[#4F46E5] text-white ring-4 ring-[rgba(109,92,255,0.25)]' : 'bg-[#0A0F1A] text-[var(--av-cyan-light)] border border-cyan-400/40'}`}>{s.num}</div>
                    <div className={s.highlight ? 'bg-[rgba(109,92,255,0.08)] border border-[rgba(109,92,255,0.3)] rounded-lg p-4 -ml-2' : ''}>
                      <h3 className="text-sm font-bold mb-0.5">{s.title}</h3>
                      <p className="text-xs text-[var(--av-gray-500)]">{s.desc}</p>
                      {s.highlight && <span className="inline-block mt-1.5 px-2 py-0.5 bg-[var(--av-blue)] text-white text-[10px] font-semibold rounded-full">Mandatory</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EVIDENCE-FIRST ═══════════ */}
      <section ref={evidenceRef} className="av-section bg-[var(--av-navy)] text-white relative overflow-hidden" aria-labelledby="evidence-heading">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div className="glow glow-cyan w-[460px] h-[460px] -bottom-56 -right-40" aria-hidden="true" />
        <div className="av-container relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <h2 id="evidence-heading" className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold text-white leading-tight tracking-tight mb-4">AI should not guess when the data is unknown</h2>
            <p className="text-[var(--av-gray-400)] text-lg">Every important decision in MUQTECH is grounded in available evidence — and unknown data stays unknown.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 max-w-3xl mx-auto mb-14 reveal">
            {['Evidence', 'Qualification', 'Human Review', 'Action'].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="px-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-lg text-sm font-semibold text-white backdrop-blur-md">{step}</div>
                {i < 3 && <svg className="w-5 h-5 text-[var(--av-cyan)] shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>}
                {i < 3 && <svg className="w-5 h-5 text-[var(--av-cyan)] shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
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
              <div key={i} className={`flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5 backdrop-blur-sm reveal reveal-delay-${i + 1}`}>
                <svg className="w-4 h-4 text-[var(--av-cyan-light)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-[var(--av-gray-400)] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ INDUSTRIES ═══════════ */}
      <section ref={industriesRef} className="av-section bg-[var(--av-ink)]" aria-labelledby="industries-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">Industries</span>
            <h2 id="industries-heading" className="av-section-title">Built for B2B businesses</h2>
            <p className="av-section-subtitle">Start with wholesalers and distributors. Expand into complex B2B sales workflows.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className={`!p-5 rounded-xl transition-all reveal reveal-delay-${Math.min(i + 1, 4)} ${ind.primary ? 'av-card av-card-accent text-white' : 'av-card text-[var(--av-gray-700)]'}`}>
                <p className={`text-sm font-bold mb-1 ${ind.primary ? 'text-white' : 'text-[var(--av-heading)]'}`}>{ind.name}</p>
                <p className={`text-xs leading-relaxed ${ind.primary ? 'text-white/75' : 'text-[var(--av-gray-500)]'}`}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CAPABILITIES ═══════════ */}
      <section ref={capabilitiesRef} className="av-section bg-[var(--av-navy)]" aria-labelledby="capabilities-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">Capabilities</span>
            <h2 id="capabilities-heading" className="av-section-title">Everything your sales workforce needs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { title: 'AI Sales Research', desc: 'Discover relevant companies using your ICP criteria.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { title: 'Lead Discovery', desc: 'Find real companies from public data sources.', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
              { title: 'Evidence-Based Qualification', desc: 'Evaluate prospects with transparent scoring.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: 'Personalized Outreach', desc: 'Drafts built from verified company data.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
              { title: 'Follow-Up Workflows', desc: 'Organized sequences that respect stop conditions.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
              { title: 'Sales Reporting', desc: 'Clear visibility into pipeline and results.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { title: 'Process Automation', desc: 'Automate repetitive sales tasks.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
              { title: 'AI Workforce Design', desc: 'Custom configurations for your workflow.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
            ].map((svc, i) => (
              <div key={i} className={`av-card flex items-start gap-3 !p-5 group reveal reveal-delay-${Math.min((i % 4) + 1, 4)}`}>
                <div className="w-9 h-9 rounded-lg bg-[var(--av-blue-subtle)] border border-[rgba(109,92,255,0.3)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(109,92,255,0.22)] transition-colors">
                  <svg className="w-4 h-4 text-[var(--av-blue-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svc.icon} /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--av-gray-800)] mb-0.5">{svc.title}</p>
                  <p className="text-xs text-[var(--av-gray-500)] leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY MUQTECH ═══════════ */}
      <section ref={whyRef} className="av-section bg-[var(--av-ink)]" aria-labelledby="why-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <h2 id="why-heading" className="av-section-title">Built around evidence, automation, and human control</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: 'Modular Workforce', desc: 'Each AI worker does one job well. They compose into a complete system.' },
              { title: 'Evidence-Backed', desc: 'Every decision is based on verified data — not assumptions or fabricated information.' },
              { title: 'Human Approval', desc: 'Nothing goes out without explicit human review. You stay in control.' },
              { title: 'Configurable', desc: 'ICPs, workflows, and thresholds adapt to your business — not the other way around.' },
              { title: 'Transparent', desc: 'Every data point, every score, every decision is auditable. No black boxes.' },
              { title: 'Reusable Infrastructure', desc: 'The same core technology powers research, qualification, outreach, and reporting.' },
            ].map((item, i) => (
              <div key={i} className={`av-card !p-6 reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section ref={pricingRef} className="av-section bg-[var(--av-navy)]" aria-labelledby="pricing-heading">
        <div className="av-container">
          <div className="max-w-2xl mx-auto text-center mb-14 reveal">
            <span className="av-eyebrow">Pricing</span>
            <h2 id="pricing-heading" className="av-section-title">Simple, transparent plans</h2>
            <p className="av-section-subtitle">Every workforce is configured around your sales process, lead volume, ICP and workflow complexity.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto items-start">
            {[
              { name: 'Starter', desc: 'For teams exploring AI-assisted sales', price: '$299', setup: '$499', features: ['Core AI workforce', 'Up to 50 leads/month', 'Basic reporting', 'Email support'] },
              { name: 'Growth', desc: 'For growing sales teams', highlight: true, price: '$599', setup: '$999', features: ['Full AI workforce', 'Up to 200 leads/month', 'Advanced reporting', 'Custom ICPs', 'Priority support'] },
              { name: 'Scale', desc: 'For complex B2B operations', price: '$999', setup: '$1,999', features: ['Custom workforce design', 'Unlimited leads', 'Full reporting suite', 'Custom integrations', 'Dedicated support'] },
            ].map((plan, i) => (
              <div key={i} className={`!p-7 rounded-xl relative reveal reveal-delay-${i + 1} ${plan.highlight ? 'av-card av-card-accent sm:-mt-4' : 'av-card'}`}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0A0F1A] border border-[rgba(109,92,255,0.55)] text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--av-blue-light)] shadow-[0_0_18px_-4px_rgba(109,92,255,0.6)]">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-[var(--av-gray-500)] mb-5">{plan.desc}</p>
                <p className="text-2xl font-extrabold text-white mb-1">{plan.price}<span className="text-sm font-semibold text-[var(--av-gray-400)]"> /month</span></p>
                <p className="text-xs text-[var(--av-gray-500)] mb-5">One-time setup: {plan.setup}</p>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[var(--av-gray-600)]">
                      <svg className="w-4 h-4 text-[var(--av-cyan)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`av-btn w-full text-center ${plan.highlight ? 'av-btn-primary' : 'av-btn-secondary'}`}>Talk to Us</Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--av-gray-500)] text-center mt-8 max-w-2xl mx-auto leading-relaxed">
            Prices in USD. Monthly subscription and one-time setup/deployment fee are billed separately. Taxes extra where applicable. Third-party service/API costs are separate and billed separately where applicable.
          </p>
        </div>
      </section>

      {/* ═══════════ FOUNDER ═══════════ */}
      <section ref={founderRef} className="av-section bg-[var(--av-ink)] border-t border-white/5 relative overflow-hidden" aria-labelledby="founder-heading">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
        <div className="glow glow-violet w-[380px] h-[380px] -top-32 -left-24" aria-hidden="true" />
        <div className="glow glow-cyan w-[360px] h-[360px] -bottom-40 -right-16" aria-hidden="true" />
        <div className="av-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="av-card !p-8 lg:!p-10 grid sm:grid-cols-[auto_1fr] gap-8 items-center reveal">
              <div className="mx-auto sm:mx-0 w-full max-w-[240px]">
                <div className="bg-gradient-to-br from-[rgba(103,232,249,0.5)] via-white/10 to-[rgba(109,92,255,0.5)] p-[1px] rounded-2xl shadow-[0_0_40px_-12px_rgba(34,211,238,0.45)]">
                  <img
                    src="/brand/founder-parag-doijad.png"
                    alt="Parag Doijad, Founder and CEO of MUQTECH"
                    loading="lazy"
                    className="rounded-2xl w-full h-auto block"
                  />
                </div>
              </div>
              <div>
                <span className="av-eyebrow">Founder</span>
                <h2 id="founder-heading" className="text-2xl lg:text-3xl font-bold text-white mb-1">Parag Doijad</h2>
                <p className="text-sm font-semibold text-[var(--av-cyan-light)] tracking-wide uppercase mb-4">Founder &amp; CEO, MUQTECH</p>
                <p className="text-sm text-[var(--av-gray-500)] leading-relaxed mb-6">
                  MUQTECH is built around a practical idea: AI should handle the repetitive work of sales — research, qualification, outreach preparation, follow-up, and reporting — while your team keeps control of every important decision. Parag founded MUQTECH to help businesses put AI to work in a way that is evidence-based, transparent, and useful from day one.
                </p>
                <Link to="/about" className="av-btn av-btn-secondary !py-2.5 !px-6">
                  Meet the Founder
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="av-section bg-[var(--av-navy)] relative overflow-hidden border-t border-white/5" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[520px] h-[520px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <div className="glow glow-cyan w-[360px] h-[360px] top-0 right-[10%]" aria-hidden="true" />
        <div className="av-container relative z-10 text-center reveal">
          <h2 id="cta-heading" className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold text-white leading-tight tracking-tight mb-4">Build a sales workforce that works with your team</h2>
          <p className="text-[var(--av-gray-400)] text-lg max-w-2xl mx-auto mb-10">See how MUQTECH can turn repetitive sales work into a coordinated AI-powered workflow.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/contact" className="av-btn av-btn-primary !py-3.5 !px-8 !text-base">
              Book a Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link to="/#how-it-works" className="av-btn av-btn-ghost !py-3.5 !px-8 !text-base">See How It Works</Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section ref={faqRef} className="av-section bg-[var(--av-ink)]" aria-labelledby="faq-preview-heading">
        <div className="max-w-3xl mx-auto px-[var(--container-px)]">
          <div className="text-center mb-12 reveal">
            <span className="av-eyebrow">FAQ</span>
            <h2 id="faq-preview-heading" className="av-section-title">Frequently asked questions</h2>
          </div>
          <div className="space-y-3 reveal">
            {[
              { q: 'What is an AI Sales Workforce?', a: 'A collection of specialized AI workers — Researcher, Qualifier, Writer, Follow-Up, Reporter — each handling one part of the sales process under human direction.' },
              { q: 'Does MUQTECH automatically send messages?', a: 'No. Every outreach draft requires explicit human approval before anything is sent.' },
              { q: 'How does MUQTECH prevent fabricated information?', a: 'Unknown data stays marked as unknown. Contacts are only created when there is evidence of an actual person. Every claim is traceable to a source.' },
              { q: 'Can MUQTECH be customized to our ICP?', a: 'Yes. You define your Ideal Customer Profile — industry, geography, business type, size, roles — and the AI workforce adapts.' },
            ].map((item, i) => (
              <details key={i} className="group border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                <summary className="font-semibold text-[var(--av-gray-800)] cursor-pointer list-none flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
                  {item.q}
                  <svg className="w-4 h-4 text-[var(--av-gray-400)] group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-5 pb-4 text-sm text-[var(--av-gray-500)] leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8 reveal">
            <Link to="/faq" className="text-cyan-300 font-semibold hover:underline text-sm">View all FAQs →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
