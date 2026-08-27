import React from 'react';
import { ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAFBF5] text-[#121416] border-t border-[rgba(18,20,22,0.08)]">
      
      <div className="container-custom space-y-16">
        
        {/* Top Grid: Headline Narrative (Left) + 3 Photo Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <span className="font-display text-[11px] font-bold text-[#686F76] uppercase tracking-wider block">
              WHY RADHE ELECTRICAL?
            </span>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] tracking-tight leading-[1.15]">
              Engineering discipline.<br />
              Local accountability.<br />
              Long-term value.
            </h2>

            <p className="text-xs sm:text-sm text-[#686F76] leading-relaxed">
              From structure to inverter, every element is designed and installed for maximum safety, performance and reliability.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-display text-xs font-bold text-[#121416] uppercase hover:text-[#C46A38] transition-colors"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Architectural Feature Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Card 1 */}
            <div className="bg-white border border-[rgba(18,20,22,0.08)] rounded-sm overflow-hidden flex flex-col justify-between group shadow-xs">
              <div>
                <div className="aspect-[4/3] bg-[#F2F2EF] overflow-hidden">
                  <img
                    src="/images/technician-maintenance.jpg"
                    alt="Precision solar installation by trained professionals"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-sm text-[#121416]">
                    Precision Installation
                  </h3>
                  <p className="text-xs text-[#686F76] leading-relaxed">
                    Trained professionals. Safe practices. Clean execution.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold text-[#121416] uppercase group-hover:text-[#C46A38] transition-colors"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[rgba(18,20,22,0.08)] rounded-sm overflow-hidden flex flex-col justify-between group shadow-xs">
              <div>
                <div className="aspect-[4/3] bg-[#F2F2EF] overflow-hidden">
                  <img
                    src="/images/inverter-system.jpg"
                    alt="High quality solar inverters and cabling"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-sm text-[#121416]">
                    Premium Quality
                  </h3>
                  <p className="text-xs text-[#686F76] leading-relaxed">
                    High-efficiency inverters, modules & protection.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold text-[#121416] uppercase group-hover:text-[#C46A38] transition-colors"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[rgba(18,20,22,0.08)] rounded-sm overflow-hidden flex flex-col justify-between group shadow-xs">
              <div>
                <div className="aspect-[4/3] bg-[#F2F2EF] overflow-hidden">
                  <img
                    src="/images/structure-detail.jpg"
                    alt="Galvanized iron mounting structures for Rajasthan conditions"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-sm text-[#121416]">
                    Engineered Structures
                  </h3>
                  <p className="text-xs text-[#686F76] leading-relaxed">
                    GI structures designed for Rajasthan conditions.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold text-[#121416] uppercase group-hover:text-[#C46A38] transition-colors"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Horizontal Specification Metric Strip from Reference */}
        <div className="pt-10 border-t border-[rgba(18,20,22,0.08)] grid grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          
          <div className="space-y-1">
            <strong className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] block">
              500+
            </strong>
            <span className="font-body text-xs text-[#686F76] block">
              Happy Customers
            </span>
          </div>

          <div className="space-y-1">
            <strong className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] block">
              1500+
            </strong>
            <span className="font-body text-xs text-[#686F76] block">
              Solar Systems Installed
            </span>
          </div>

          <div className="space-y-1">
            <strong className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] block">
              5+
            </strong>
            <span className="font-body text-xs text-[#686F76] block">
              Years of Experience
            </span>
          </div>

          <div className="space-y-1">
            <strong className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] block">
              100%
            </strong>
            <span className="font-body text-xs text-[#686F76] block">
              After-Sales Support
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};
