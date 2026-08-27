import React from 'react';
import { ArrowRight, Phone, Zap, ShieldCheck, Wrench, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative pt-28 pb-12 sm:pb-20 bg-[#FAFBF5] text-[#121416] overflow-hidden">
      
      <div className="container-custom space-y-12">
        
        {/* Main 2-Column Hero Composition from Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Kicker from reference */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-[1.5px] bg-[#121416]" />
              <span className="font-display text-[11px] sm:text-xs font-bold text-[#121416] uppercase tracking-wider">
                COMPLETE SOLAR PANEL INSTALLATION SOLUTIONS
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#121416] tracking-tight uppercase leading-[1.06]">
              SOLAR ENGINEERING.<br />
              BUILT FOR DAUSA.
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#686F76] font-normal leading-relaxed max-w-lg">
              Precision installation. Premium components. Long-term performance you can rely on.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuote}
                className="btn-primary-dark text-xs py-3.5 px-6"
              >
                <span>REQUEST ROOFTOP SURVEY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={BUSINESS_INFO.phoneTel}
                className="btn-secondary-outline text-xs py-3.5 px-5"
              >
                <Phone className="w-3.5 h-3.5 text-[#121416]" />
                <span>CALL NOW</span>
              </a>
            </div>

            {/* Speak To Our Experts / Social Proof Box */}
            <div className="p-3.5 rounded-sm bg-[#F2F2EF] border border-[rgba(18,20,22,0.08)] flex items-center justify-between max-w-sm">
              <div className="space-y-0.5">
                <span className="font-display text-[10px] uppercase tracking-wider text-[#686F76] block font-bold">
                  SPEAK TO OUR EXPERTS
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="/images/residential-villa.jpg" alt="" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="/images/technician-maintenance.jpg" alt="" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="/images/structure-detail.jpg" alt="" />
                  </div>
                  <span className="font-display text-xs font-bold text-[#121416]">500+</span>
                </div>
              </div>

              <div className="text-right pl-3 border-l border-[rgba(18,20,22,0.1)]">
                <strong className="font-display text-xs font-bold text-[#121416] block">500+</strong>
                <span className="text-[10px] text-[#686F76] block">Happy Customers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Photography Frame (7 cols) */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] lg:aspect-[16/11] rounded-sm overflow-hidden bg-[#E6E0D6] border border-[rgba(18,20,22,0.1)] shadow-md relative">
              <img
                src="/images/hero-solar.jpg"
                alt="Solar engineering and rooftop installation in Dausa, Rajasthan"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>

        {/* Bottom 4-Column Feature Strip from Reference */}
        <div className="bg-white border border-[rgba(18,20,22,0.09)] rounded-sm p-5 sm:p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(18,20,22,0.08)]">
          
          {/* Feature 1 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-3 first:pt-0 first:px-0">
            <div className="w-8 h-8 rounded-sm bg-[#FAFBF5] border border-[rgba(18,20,22,0.1)] flex items-center justify-center text-[#121416] shrink-0">
              <Zap className="w-4 h-4 text-[#C46A38]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xs text-[#121416] uppercase">
                Optimized Performance
              </h3>
              <p className="text-[11px] text-[#686F76] leading-snug">
                Max. energy output
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-8 h-8 rounded-sm bg-[#FAFBF5] border border-[rgba(18,20,22,0.1)] flex items-center justify-center text-[#121416] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#C46A38]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xs text-[#121416] uppercase">
                Premium Components
              </h3>
              <p className="text-[11px] text-[#686F76] leading-snug">
                Tier-1 quality only
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-8 h-8 rounded-sm bg-[#FAFBF5] border border-[rgba(18,20,22,0.1)] flex items-center justify-center text-[#121416] shrink-0">
              <Wrench className="w-4 h-4 text-[#C46A38]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xs text-[#121416] uppercase">
                Expert Installation
              </h3>
              <p className="text-[11px] text-[#686F76] leading-snug">
                Engineered to last
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-8 h-8 rounded-sm bg-[#FAFBF5] border border-[rgba(18,20,22,0.1)] flex items-center justify-center text-[#121416] shrink-0">
              <MapPin className="w-4 h-4 text-[#C46A38]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xs text-[#121416] uppercase">
                Local Support
              </h3>
              <p className="text-[11px] text-[#686F76] leading-snug">
                Dausa based team
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
