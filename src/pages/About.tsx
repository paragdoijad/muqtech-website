import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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

export default function About() {
  const aboutRef = useReveal()
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--av-navy)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[420px] h-[420px] -top-40 -left-20" aria-hidden="true" />
        <div className="glow glow-cyan w-[380px] h-[380px] -bottom-48 -right-10" aria-hidden="true" />
        <div className="av-container relative z-10 py-20 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" aria-hidden="true" />
            About MUQTECH
          </span>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white leading-tight tracking-tight mb-5 max-w-2xl mx-auto">
            AI workforces built for{' '}
            <span className="text-grad">business growth</span>
          </h1>
          <p className="text-[var(--av-gray-400)] text-lg max-w-xl mx-auto leading-relaxed">
            MUQTECH is an AI technology company building modular AI workforces that help B2B businesses research opportunities, qualify prospects, and prepare personalized outreach — with humans in control.
          </p>
        </div>
      </section>

      <section ref={aboutRef} className="av-section bg-[var(--av-navy)]">
        <div className="av-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="av-card !p-8 reveal-left">
                <span className="av-eyebrow">What We Build</span>
                <h2 className="av-section-title !text-2xl mb-4">AI workforces for real sales operations</h2>
                <p className="text-sm text-[var(--av-gray-500)] leading-relaxed mb-4">
                  MUQTECH builds AI-powered workforces that handle the repetitive, time-consuming parts of B2B sales — research, qualification, outreach preparation, follow-up, and reporting.
                </p>
                <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">
                  Our initial product, the <strong className="text-white">AI Sales Workforce</strong>, coordinates multiple specialized AI workers under one system. Each worker does one job well. Together, they form a complete sales support operation.
                </p>
              </div>
              <div className="av-card !p-8 reveal-right">
                <span className="av-eyebrow">Our Approach</span>
                <h2 className="av-section-title !text-2xl mb-4">Evidence first. Humans in control.</h2>
                <p className="text-sm text-[var(--av-gray-500)] leading-relaxed mb-4">
                  We believe AI should not guess when the data is unknown. Every qualification decision, every outreach message, every research finding in MUQTECH is grounded in available evidence.
                </p>
                <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">
                  Missing information stays marked as unknown. Contacts are only created when there is evidence of an actual person. No contacts are fabricated. No intent is invented. Humans review and approve important actions.
                </p>
              </div>
            </div>

            <div className="av-card !p-8 mt-6">
              <h3 className="text-lg font-bold mb-5">Our principles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Modular AI workforce — each worker does one job well',
                  'Evidence-backed decisions — every claim traceable to a source',
                  'Explicit unknown states — missing data is not treated as fact',
                  'Human approval — important actions remain under human control',
                  'No fabricated information — real contacts and evidence only',
                  'Configurable workflows — adapted to your business process',
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-[var(--av-blue-subtle)] border border-[rgba(109,92,255,0.35)] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[var(--av-cyan-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <p className="text-sm text-[var(--av-gray-600)]">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                {/* Portrait */}
                <div className="av-card !p-8 flex flex-col items-center justify-center relative overflow-hidden reveal-left">
                  <div className="glow glow-cyan w-[260px] h-[260px] -top-20 -right-16" aria-hidden="true" />
                  <div className="glow glow-violet w-[240px] h-[240px] -bottom-20 -left-16" aria-hidden="true" />
                  <div className="relative w-full max-w-sm">
                    <div className="bg-gradient-to-br from-[rgba(103,232,249,0.5)] via-white/10 to-[rgba(109,92,255,0.5)] p-[1px] rounded-2xl shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)]">
                      <img
                        src="/brand/founder-parag-doijad.png"
                        alt="Parag Doijad, Founder and CEO of MUQTECH"
                        loading="lazy"
                        className="rounded-2xl w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>
                {/* Story */}
                <div className="av-card !p-8 lg:!p-10 reveal-right">
                  <span className="av-eyebrow">Founder</span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">Parag Doijad</h2>
                  <p className="text-sm font-semibold text-[var(--av-cyan-light)] tracking-wide uppercase mb-6">Founder &amp; CEO, MUQTECH</p>
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-[var(--av-blue-light)] mb-2">The Story</h3>
                      <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">
                        Parag Doijad founded MUQTECH around a simple, practical belief: AI should carry the repetitive weight of B2B sales — research, qualification, outreach preparation, follow-up, and reporting — while people stay in control of every important decision.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-[var(--av-blue-light)] mb-2">Why MUQTECH</h3>
                      <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">
                        MUQTECH was created because the everyday work of sales teams is still scattered across manual research, disconnected tools, and follow-ups that fall through the cracks. The goal was straightforward: one coordinated AI workforce that does the heavy lifting, grounds every decision in real evidence, and keeps humans in charge of what matters.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-[var(--av-blue-light)] mb-2">The Vision</h3>
                      <p className="text-sm text-[var(--av-gray-500)] leading-relaxed">
                        To make practical AI automation and AI workforce technology accessible to businesses — not as a black box, but as dependable infrastructure that works alongside your team, 24/7.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-xl font-bold mb-3">Ready to see it in action?</h3>
              <p className="text-sm text-[var(--av-gray-500)] mb-6 max-w-md mx-auto">Book a demo to see how MUQTECH can work with your team.</p>
              <Link to="/contact" className="av-btn av-btn-primary !py-3 !px-7">
                Book a Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
