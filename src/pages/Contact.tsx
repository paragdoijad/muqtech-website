import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (form: FormData) => {
    const e: Record<string, string> = {}
    if (!form.get('name')?.toString().trim()) e.name = 'Required'
    const email = form.get('email')?.toString().trim()
    if (!email) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email'
    if (!form.get('company')?.toString().trim()) e.company = 'Required'
    if (!form.get('role')?.toString().trim()) e.role = 'Required'
    return e
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--av-navy)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow glow-violet w-[420px] h-[420px] -top-40 -right-20" aria-hidden="true" />
        <div className="glow glow-cyan w-[380px] h-[380px] -bottom-48 -left-10" aria-hidden="true" />
        <div className="av-container relative z-10 py-20 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--av-cyan-light)] text-xs font-semibold tracking-wide uppercase mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[var(--av-cyan-light)] rounded-full animate-pulse-dot" aria-hidden="true" />
            Contact
          </span>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white leading-tight tracking-tight mb-5">
            Book a Demo
          </h1>
          <p className="text-[var(--av-gray-400)] text-lg max-w-xl mx-auto leading-relaxed">
            See how MUQTECH can work with your team. We will walk you through a live demonstration of the AI Sales Workforce.
          </p>
        </div>
      </section>

      <section className="av-section bg-[var(--av-navy)]">
        <div className="av-container">
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Left — what to expect */}
            <div className="av-card !p-8">
              <h2 className="text-lg font-bold mb-6">What you will see in a demo</h2>
              <div className="space-y-4">
                {[
                  'How your ICP is configured',
                  'Real company research from public sources',
                  'Evidence-backed qualification',
                  'Personalized outreach drafts',
                  'Human approval workflow',
                  'Pipeline reporting and visibility',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[var(--av-blue-subtle)] border border-[rgba(109,92,255,0.35)] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[var(--av-blue-light)]">{i + 1}</span>
                    </div>
                    <p className="text-sm text-[var(--av-gray-600)] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-xs text-[var(--av-gray-500)] leading-relaxed">
                  <strong className="text-white">No commitment required.</strong> A demo is a conversation. We will show you how MUQTECH works and answer any questions.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {status === 'success' ? (
                <div className="p-8 rounded-xl bg-[var(--av-green-subtle)] border border-emerald-400/30 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[var(--av-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Request submitted</h3>
                  <p className="text-sm text-[var(--av-gray-500)]">We will be in touch to schedule your demo.</p>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const form = new FormData(e.currentTarget)
                  const v = validate(form)
                  setErrors(v)
                  if (Object.keys(v).length === 0) setStatus('success')
                }} className="av-card !p-8 space-y-4" noValidate>
                  {[
                    { name: 'name', label: 'Your Name', type: 'text', required: true },
                    { name: 'email', label: 'Work Email', type: 'email', required: true },
                    { name: 'company', label: 'Company', type: 'text', required: true },
                    { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'e.g. VP Sales, CEO, Head of Business Development' },
                    { name: 'website', label: 'Company Website', type: 'url', placeholder: 'https://' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label htmlFor={`f-${field.name}`} className="block text-sm font-semibold text-[var(--av-gray-800)] mb-1.5">{field.label}{field.required && <span className="text-red-400 ml-0.5">*</span>}</label>
                      <input
                        id={`f-${field.name}`}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        aria-invalid={!!errors[field.name]}
                        aria-describedby={errors[field.name] ? `e-${field.name}` : undefined}
                        className={`av-input ${errors[field.name] ? 'border-red-300' : ''}`}
                      />
                      {errors[field.name] && <p id={`e-${field.name}`} role="alert" className="text-xs text-red-400 mt-1">{errors[field.name]}</p>}
                    </div>
                  ))}
                  <div>
                    <label htmlFor="f-improve" className="block text-sm font-semibold text-[var(--av-gray-800)] mb-1.5">What are you looking to improve?</label>
                    <select id="f-improve" name="improve" className="av-input">
                      <option value="">Select...</option>
                      <option>Prospect research</option>
                      <option>Lead qualification</option>
                      <option>Outreach preparation</option>
                      <option>Follow-up management</option>
                      <option>Sales reporting</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="f-message" className="block text-sm font-semibold text-[var(--av-gray-800)] mb-1.5">Message</label>
                    <textarea id="f-message" name="message" rows={3} className="av-input resize-none" placeholder="Anything specific you would like to discuss?" />
                  </div>
                  <button type="submit" className="av-btn av-btn-primary w-full !py-3.5 !text-base">
                    Request a Demo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                  <p className="text-xs text-[var(--av-gray-500)] text-center">We respect your privacy. No spam.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
