import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface FloatingActionsProps {
  onOpenQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenQuote }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-sm bg-[#0D121C] border border-slate-700 text-slate-300 hover:text-white hover:border-amber-500 flex items-center justify-center shadow-2xl transition-all"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 text-amber-400" />
          </button>
        )}

        {/* WhatsApp Floating Trigger */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-4 rounded-sm bg-[#0D121C] hover:bg-[#121824] text-xs font-mono font-bold text-slate-200 border border-emerald-500/50 hover:border-emerald-400 flex items-center gap-2 shadow-2xl transition-all"
          aria-label="Direct WhatsApp Consultation"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp Direct</span>
        </a>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#080B11]/95 border-t border-slate-800 p-2 backdrop-blur-md">
        <div className="grid grid-cols-3 gap-2">
          
          <a
            href={BUSINESS_INFO.phoneTel}
            className="py-2.5 px-2 text-xs flex items-center justify-center gap-1.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-200 font-mono font-bold hover:bg-slate-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call</span>
          </a>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-2 text-xs flex items-center justify-center gap-1.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-200 font-mono font-bold hover:bg-slate-800 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenQuote}
            className="btn-primary py-2.5 px-2 text-xs flex items-center justify-center gap-1.5 font-mono font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Quote</span>
          </button>

        </div>
      </div>
    </>
  );
};
