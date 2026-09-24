import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Products', href: '/services' },
  { label: 'AI Workforce', href: '/#workforce' },
  { label: 'Solutions', href: '/industries' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#05070A] focus:border focus:border-cyan-400/50 focus:px-4 focus:py-2 focus:rounded-lg focus:text-cyan-300"
      >
        Skip to main content
      </a>

      {/* ─── Navigation: transparent glass command bar ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#05070A]/90 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_-18px_rgba(109,92,255,0.45)]'
            : 'bg-[#05070A]/60 backdrop-blur-lg border-white/5'
        }`}
      >
        <nav className="av-container" aria-label="Main navigation">
          <div className="flex items-center justify-between h-[4.25rem]">
            {/* Logo */}
            <Link to="/" className="logo-chip shrink-0" aria-label="MUQTECH Home">
              <img
                src="/brand/muqtech-logo.png"
                alt="MUQTECH"
                className="h-8 sm:h-9 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const base = link.href.split('#')[0]
                const isActive = base !== '/' && location.pathname === base
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-1.5 rounded-lg text-[0.8125rem] font-medium tracking-wide transition-all ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-400/10 border border-cyan-400/25'
                        : 'text-[var(--av-gray-400)] hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/contact" className="av-btn av-btn-primary !py-2 !px-5 !text-[0.8125rem]">
                Book a Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-5 h-5 text-[var(--av-gray-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden pb-5 border-t border-white/10 pt-4 animate-fade-in">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--av-gray-400)] hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 px-4">
                  <Link to="/contact" className="av-btn av-btn-primary w-full text-center !text-sm">
                    Book a Demo
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative overflow-hidden bg-[#04060A] border-t border-white/10" role="contentinfo">
        <div className="glow glow-violet w-[420px] h-[420px] -top-64 -right-32" aria-hidden="true" />
        <div className="av-container relative z-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
            {/* Brand */}
            <div className="md:col-span-4">
              <span className="logo-chip">
                <img src="/brand/muqtech-logo.png" alt="MUQTECH" className="h-9 w-auto" />
              </span>
              <p className="text-[var(--av-gray-500)] text-sm leading-relaxed mt-4 max-w-xs">
                AI Workforce for Business Growth
              </p>
            </div>

            {/* Solutions */}
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Solutions</h3>
              <ul className="space-y-2.5">
                <li><Link to="/#workforce" className="text-[var(--av-gray-500)] hover:text-cyan-300 text-sm transition-colors">AI Sales Workforce</Link></li>
                <li><Link to="/services" className="text-[var(--av-gray-500)] hover:text-cyan-300 text-sm transition-colors">Services</Link></li>
                <li><Link to="/pricing" className="text-[var(--av-gray-500)] hover:text-cyan-300 text-sm transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2.5">
                <li><Link to="/about" className="text-[var(--av-gray-500)] hover:text-cyan-300 text-sm transition-colors">About</Link></li>
                <li><Link to="/industries" className="text-[var(--av-gray-500)] hover:text-cyan-300 text-sm transition-colors">Industries</Link></li>
                <li><Link to="/faq" className="text-[var(--av-gray-500)] hover:text-cyan-300 text-sm transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4 md:text-right">
              <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Get Started</h3>
              <p className="text-[var(--av-gray-500)] text-sm mb-5">
                See how MUQTECH can help your sales team.
              </p>
              <Link to="/contact" className="av-btn av-btn-primary !py-2.5 !px-6">
                Book a Demo
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[var(--av-gray-500)] text-xs">
              &copy; {new Date().getFullYear()} MUQTECH. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-[var(--av-gray-500)]">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
