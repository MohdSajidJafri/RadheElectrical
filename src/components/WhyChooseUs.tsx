import React from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export const WhyChooseUs: React.FC = () => {
  const craftStandards = [
    {
      num: '01',
      title: 'Precision Installation & Structural Anchoring',
      desc: 'All structural members and base plates are heavy-gauge hot-dip galvanized iron (GI) chemically anchored against severe pre-monsoon storm winds.'
    },
    {
      num: '02',
      title: 'Quality Equipment & Tier-1 Protection',
      desc: 'High-efficiency Mono PERC panels paired with dedicated copper-bonded chemical earthing electrodes and Class-II Surge Protection Devices (SPDs).'
    },
    {
      num: '03',
      title: 'Correct System Sizing & Energy Yield',
      desc: 'Precise capacity engineering tailored to your monthly electrical consumption and shadow-free terrace dimensions.'
    },
    {
      num: '04',
      title: 'Local Support & DISCOM Net-Metering',
      desc: 'Direct documentation and liaison for bi-directional meter sanctioning with Rajasthan DISCOM so your surplus solar generation offsets nighttime bills.'
    },
    {
      num: '05',
      title: 'After-Sales Service & Maintenance',
      desc: 'Direct phone hotline with our permanent installation team based at our Agra Road depot near Giriraj Dharan Temple in Dausa.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F2F2EF] text-[#121416] border-t border-[rgba(18,20,22,0.08)]">
      
      <div className="container-custom space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2 max-w-xl">
          <span className="font-display text-[11px] font-bold text-[#686F76] uppercase tracking-wider block">
            CRAFT STANDARDS & LOCAL ACCOUNTABILITY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] uppercase tracking-tight">
            THE STANDARD IS IN THE INSTALLATION.
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: 5 Principles Sequential List (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {craftStandards.map((std) => (
              <div
                key={std.num}
                className="p-5 sm:p-6 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm shadow-xs flex items-start gap-4"
              >
                <span className="font-display text-xs font-bold px-2 py-1 bg-[#F2F2EF] text-[#121416] rounded-xs shrink-0">
                  {std.num}
                </span>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#121416]">
                    {std.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#686F76] leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Hardware Detail Photo Card (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-white border border-[rgba(18,20,22,0.09)] rounded-sm overflow-hidden shadow-xs">
              <div className="aspect-[4/3] bg-[#E6E0D6] overflow-hidden">
                <img
                  src="/images/inverter-system.jpg"
                  alt="Inverter and conduit wiring setup"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-display font-bold text-sm text-[#121416]">
                  Industrial Wiring & Cable Armor
                </h3>
                <p className="text-xs text-[#686F76] leading-relaxed">
                  All DC and AC cabling is housed in UV-resistant PVC conduits with IP65-rated distribution boxes to protect against harsh Rajasthan heat and dust.
                </p>
              </div>
            </div>

            {/* Direct Phone Assistance Box */}
            <div className="p-6 bg-[#121416] text-[#FAFBF5] rounded-sm space-y-3 shadow-xs">
              <span className="font-display text-[10px] text-[#C46A38] uppercase tracking-widest block font-bold">
                Speak With A Local Field Engineer
              </span>
              <p className="text-xs text-[#8E959D] leading-relaxed">
                Have specific roof structure questions or high electricity tariff concerns? Call our Dausa depot directly.
              </p>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="btn-primary-dark text-xs py-2.5 px-4 w-full bg-white text-[#121416] hover:bg-[#FAFBF5] border-white"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 9982861558</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
