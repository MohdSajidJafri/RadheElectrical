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
            className="w-9 h-9 rounded-sm bg-white border border-[rgba(18,20,22,0.12)] text-[#121416] hover:bg-[#FAFBF5] flex items-center justify-center shadow-md transition-all"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-4 rounded-sm bg-[#121416] hover:bg-black text-xs font-display font-bold text-white flex items-center gap-2 shadow-lg transition-all"
          aria-label="Direct WhatsApp Consultation"
        >
          <MessageSquare className="w-4 h-4 text-[#C46A38]" />
          <span>WhatsApp Direct</span>
        </a>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 border-t border-[rgba(18,20,22,0.1)] p-2 backdrop-blur-md">
        <div className="grid grid-cols-3 gap-2">
          
          <a
            href={BUSINESS_INFO.phoneTel}
            className="py-2.5 px-2 text-xs flex items-center justify-center gap-1.5 rounded-sm bg-[#F2F2EF] text-[#121416] font-display font-bold hover:bg-[#E6E0D6] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-2 text-xs flex items-center justify-center gap-1.5 rounded-sm bg-[#F2F2EF] text-[#121416] font-display font-bold hover:bg-[#E6E0D6] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C46A38]" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenQuote}
            className="btn-primary-dark py-2.5 px-2 text-xs flex items-center justify-center gap-1.5 font-display font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Survey</span>
          </button>

        </div>
      </div>
    </>
  );
};
