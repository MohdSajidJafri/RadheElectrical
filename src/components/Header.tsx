import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Shield, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'services', 'capacity', 'projects', 'calculator', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#', id: 'hero' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'SOLAR SYSTEMS', href: '#capacity', id: 'capacity' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'CALCULATOR', href: '#calculator', id: 'calculator' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAFBF5]/95 backdrop-blur-md py-3.5 border-b border-[rgba(18,20,22,0.08)] shadow-xs'
          : 'bg-[#FAFBF5] py-4 sm:py-5 border-b border-[rgba(18,20,22,0.06)]'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        
        {/* Left: Exact Brand Logo Wordmark */}
        <a href="#" className="flex flex-col leading-none group focus:outline-none" aria-label="RADHE ELECTRICAL">
          <span className="font-display font-extrabold text-[#121416] text-base sm:text-lg tracking-wider uppercase">
            RADHE
          </span>
          <span className="font-display font-bold text-[#121416] text-xs sm:text-sm tracking-widest uppercase">
            ELECTRICAL
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-display font-semibold tracking-wider text-[#121416]" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive ? 'text-[#121416] font-bold' : 'text-[#686F76] hover:text-[#121416]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#121416]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Phone block & CTA Button */}
        <div className="hidden sm:flex items-center gap-6">
          
          {/* Phone block from reference */}
          <a
            href={BUSINESS_INFO.phoneTel}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            title="Call or WhatsApp RADHE ELECTRICAL"
          >
            <div className="w-8 h-8 rounded-full bg-[#F2F2EF] border border-[rgba(18,20,22,0.1)] flex items-center justify-center text-[#121416] group-hover:bg-[#121416] group-hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-display font-bold text-xs text-[#121416] block leading-tight tracking-wide">
                9982 861 558
              </span>
              <span className="font-body text-[10px] text-[#686F76] block leading-tight">
                Call / WhatsApp
              </span>
            </div>
          </a>

          {/* Solid Black Button */}
          <button
            onClick={onOpenQuote}
            className="btn-primary-dark text-xs py-2.5 px-4"
          >
            <span>GET FREE QUOTE</span>
          </button>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex sm:hidden items-center gap-3">
          <a
            href={BUSINESS_INFO.phoneTel}
            className="p-2 rounded bg-[#F2F2EF] text-[#121416]"
            aria-label="Call RADHE ELECTRICAL"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#121416] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[60px] bg-[#FAFBF5] border-b border-[rgba(18,20,22,0.1)] p-6 space-y-5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3.5 font-display text-xs font-bold uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#121416] py-1 flex items-center justify-between border-b border-[rgba(18,20,22,0.06)] pb-2"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#686F76]" />
              </a>
            ))}
          </nav>

          <div className="pt-2 space-y-3">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="w-full btn-secondary-outline text-xs py-3 flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 9982 861 558</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full btn-primary-dark text-xs py-3 flex items-center justify-center gap-2"
            >
              <span>GET FREE QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-3 border-t border-[rgba(18,20,22,0.08)] flex items-center justify-between text-[11px] text-[#686F76]">
            <span>Dausa, Rajasthan (303303)</span>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-[#121416] font-bold flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-[#C46A38]" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
