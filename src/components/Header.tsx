import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenQuote: (prefillCapacity?: string) => void;
  onOpenAdmin?: () => void;
}

export const Header = ({ onOpenQuote, onOpenAdmin }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Systems & Scale', href: '#capacities' },
    { label: 'Portfolio', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'header-scrolled py-4' : 'header-transparent py-6'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between gap-8">
            
            {/* Brand Wordmark */}
            <a href="#hero" className="flex items-baseline gap-2.5 text-white no-underline shrink-0 group">
              <span className="font-display font-black text-lg tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors">
                RADHE <span className="text-amber-500 font-light">ELECTRICAL</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium tracking-wider uppercase">
                / Dausa, Rajasthan
              </span>
            </a>

            {/* Natural Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold text-slate-300 hover:text-white transition-colors tracking-widest uppercase"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Anchors */}
            <div className="hidden sm:flex items-center gap-6 shrink-0">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="text-xs font-bold text-slate-200 hover:text-amber-400 transition-colors tracking-wide"
                title="Call 9982861558"
              >
                +91 9982861558
              </a>

              <button
                onClick={() => onOpenQuote()}
                className="btn-primary text-xs py-2.5 px-4"
              >
                Get Free Quote
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex sm:hidden items-center gap-3">
              <button
                onClick={() => onOpenQuote()}
                className="btn-primary text-xs py-1.5 px-3"
              >
                Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-20 right-0 bottom-0 w-72 bg-slate-950 border-l border-slate-800 p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500 block pb-2 border-b border-slate-800">
                Menu
              </span>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-bold text-slate-200 hover:text-amber-400"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full py-3 px-4 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Call 9982861558</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="btn-primary w-full py-3 text-xs font-bold"
              >
                Get Free Quote
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-center text-[11px] font-mono text-slate-500 hover:text-amber-400 pt-2 transition-colors"
                >
                  🔒 Staff / Admin Portal
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
