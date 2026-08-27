import React from 'react';
import { ArrowUp, Shield, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAFBF5] text-[#121416] border-t border-[rgba(18,20,22,0.08)] pt-12 pb-8">
      
      <div className="container-custom space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Location (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[#121416] text-lg uppercase tracking-wider">
                RADHE
              </span>
              <span className="font-display font-bold text-[#121416] text-sm uppercase tracking-widest">
                ELECTRICAL
              </span>
            </div>

            <p className="text-xs text-[#686F76] leading-relaxed max-w-xs">
              Complete rooftop and commercial solar panel installation solutions in Dausa, Rajasthan.
            </p>

            <div className="text-[11px] text-[#686F76]">
              Near Giriraj Dharan Mandir, Agra Road (PIN 303303)
            </div>
          </div>

          {/* Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-2 text-xs font-display font-semibold">
            <span className="text-[10px] text-[#8E959D] uppercase tracking-wider block font-bold">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-[#686F76] hover:text-[#121416] transition-colors">Home</a>
              <a href="#about" className="text-[#686F76] hover:text-[#121416] transition-colors">About</a>
              <a href="#services" className="text-[#686F76] hover:text-[#121416] transition-colors">Services</a>
              <a href="#capacity" className="text-[#686F76] hover:text-[#121416] transition-colors">Solar Systems</a>
              <a href="#projects" className="text-[#686F76] hover:text-[#121416] transition-colors">Projects</a>
              <a href="#calculator" className="text-[#686F76] hover:text-[#121416] transition-colors">Calculator</a>
              <a href="#contact" className="text-[#686F76] hover:text-[#121416] transition-colors">Contact</a>
              <button
                onClick={onOpenAdmin}
                className="text-left text-[#686F76] hover:text-[#121416] transition-colors flex items-center gap-1 font-bold"
              >
                <Shield className="w-3 h-3 text-[#C46A38]" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-2 text-xs">
            <span className="text-[10px] font-display font-bold text-[#8E959D] uppercase tracking-wider block">
              Contact & Hotline
            </span>
            <div className="space-y-1.5 text-[#686F76]">
              <div>Phone: +91 9982861558</div>
              <div>Hours: Mon – Sun: 8:00 AM – 8:00 PM</div>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#121416] font-display font-bold hover:underline pt-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C46A38]" />
                <span>WhatsApp Direct Chat</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8E959D] pt-6 border-t border-[rgba(18,20,22,0.06)] gap-4">
          <div>
            © {new Date().getFullYear()} RADHE ELECTRICAL. All rights reserved. Dausa, Rajasthan.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenAdmin}
              className="text-[#686F76] hover:text-[#121416] flex items-center gap-1 font-bold"
            >
              <Shield className="w-3 h-3 text-[#C46A38]" />
              <span>Admin Login</span>
            </button>

            <button
              onClick={scrollToTop}
              className="hover:text-[#121416] flex items-center gap-1 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 text-[#121416]" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
