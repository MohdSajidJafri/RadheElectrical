import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { SolarCapacityOption } from '../types';

interface ServicesProps {
  onSelectCapacity: (capacity: SolarCapacityOption) => void;
  onOpenQuote: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectCapacity, onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const capabilities = [
    {
      id: 'residential',
      number: '01',
      title: 'Residential Rooftops & Pergolas',
      category: 'Residential (1 KW – 10 KW)',
      image: '/images/residential-villa.jpg',
      description:
        'Transform rooftop terraces into shaded, usable living spaces while offsetting 70% to 90% of household power bills. Custom engineered elevated galvanized steel structures preserving full walking space.',
      recommendedCap: '3 KW' as SolarCapacityOption,
      specs: [
        'Elevated 8ft to 10ft pergola structures',
        'Mono PERC high-efficiency solar panels',
        'Powers daytime AC, refrigerator and pump loads',
        'DISCOM bi-directional net-metering synchronization'
      ]
    },
    {
      id: 'commercial',
      number: '02',
      title: 'Commercial & Industrial Solar Plants',
      category: 'Commercial (10 KW – 100 KW+)',
      image: '/images/commercial-solar.jpg',
      description:
        'High-capacity solar infrastructure engineered for schools, hospitals, commercial complexes, and manufacturing units across Dausa and Eastern Rajasthan.',
      recommendedCap: '10 KW+' as SolarCapacityOption,
      specs: [
        '3-Phase grid-tied string inverters with telemetry',
        'Heavy-duty industrial truss and purlin layout',
        'Engineered for heavy motor and inductive loads',
        'Accelerated asset depreciation benefits'
      ]
    },
    {
      id: 'maintenance',
      number: '03',
      title: 'Diagnostics, Inverters & System Care',
      category: 'Maintenance & Optimization',
      image: '/images/technician-maintenance.jpg',
      description:
        'Health audits, thermal hotspot inspections, inverter recalibration, chemical earthing resistance audits, and conduit repairs to restore peak generation.',
      recommendedCap: 'Not sure' as SolarCapacityOption,
      specs: [
        'Thermal imaging for panel hotspot detection',
        'DC string voltage & current performance testing',
        'Chemical earthing pit resistance measurement',
        'Local on-site field response in Dausa district'
      ]
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F2F2EF] text-[#121416] border-t border-[rgba(18,20,22,0.08)]">
      
      <div className="container-custom space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(18,20,22,0.08)]">
          <div className="space-y-2 max-w-xl">
            <span className="font-display text-[11px] font-bold text-[#686F76] uppercase tracking-wider block">
              CAPABILITIES & SERVICES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] uppercase tracking-tight">
              ENGINEERED FOR HOMES & ENTERPRISES.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#686F76] max-w-xs">
            Custom engineered around structural orientation and electrical load requirements.
          </p>
        </div>

        {/* Modular Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Capability List (5 cols) */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              {capabilities.map((cap, index) => {
                const isSelected = activeTab === index;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-5 rounded-sm border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-white border-[#121416] shadow-sm ring-1 ring-[#121416]'
                        : 'bg-white/60 border-[rgba(18,20,22,0.08)] hover:bg-white hover:border-[rgba(18,20,22,0.2)]'
                    }`}
                  >
                    <span
                      className={`font-display text-xs font-bold px-2 py-1 rounded-xs ${
                        isSelected
                          ? 'bg-[#121416] text-white'
                          : 'bg-[#F2F2EF] text-[#686F76]'
                      }`}
                    >
                      {cap.number}
                    </span>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-display font-bold text-[#686F76] tracking-wider block">
                        {cap.category}
                      </span>
                      <h3 className="font-display font-bold text-base text-[#121416]">
                        {cap.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-5 rounded-sm bg-white border border-[rgba(18,20,22,0.08)] flex items-center justify-between mt-4">
              <div>
                <span className="text-[10px] text-[#686F76] uppercase font-bold block">Need Advice?</span>
                <span className="font-display font-bold text-xs text-[#121416]">Free On-Site Survey</span>
              </div>
              <button
                onClick={onOpenQuote}
                className="btn-primary-dark text-xs py-2 px-3.5"
              >
                <span>Consult</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Active Showcase Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[rgba(18,20,22,0.09)] rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-sm space-y-6">
            
            <div className="space-y-6">
              
              {/* Photo Frame */}
              <div className="aspect-[16/9] rounded-sm overflow-hidden bg-[#F2F2EF] border border-[rgba(18,20,22,0.08)]">
                <img
                  src={capabilities[activeTab].image}
                  alt={capabilities[activeTab].title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Narrative */}
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#121416]">
                  {capabilities[activeTab].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#686F76] leading-relaxed">
                  {capabilities[activeTab].description}
                </p>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-2 pt-3 border-t border-[rgba(18,20,22,0.08)]">
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#686F76] block mb-2">
                  Key Technical Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {capabilities[activeTab].specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#121416]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C46A38] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Action Row */}
            <div className="pt-6 border-t border-[rgba(18,20,22,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#686F76] uppercase block">Recommended Sizing</span>
                <strong className="font-display text-[#121416] text-sm font-bold">
                  {capabilities[activeTab].recommendedCap}
                </strong>
              </div>

              <button
                onClick={() => {
                  onSelectCapacity(capabilities[activeTab].recommendedCap);
                  onOpenQuote();
                }}
                className="btn-primary-dark text-xs py-2.5 px-5"
              >
                <span>GET {capabilities[activeTab].recommendedCap} QUOTATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
