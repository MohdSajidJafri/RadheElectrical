import React, { useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Zap, Home } from 'lucide-react';
import { SOLAR_CAPACITIES } from '../data/mockData';
import type { SolarCapacityOption } from '../types';

interface SolarCapacityProps {
  onSelectCapacity: (capacity: SolarCapacityOption) => void;
  onOpenQuote: () => void;
}

export const SolarCapacity: React.FC<SolarCapacityProps> = ({
  onSelectCapacity,
  onOpenQuote
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(2); // Default to 3 KW (Popular)
  const current = SOLAR_CAPACITIES[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    onSelectCapacity(SOLAR_CAPACITIES[idx].capacity);
  };

  return (
    <section id="capacity" className="py-16 sm:py-24 bg-[#121416] text-[#FAFBF5] relative overflow-hidden">
      
      <div className="container-custom space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-display text-[11px] font-bold text-[#8E959D] uppercase tracking-wider block">
            — POPULAR SOLAR SYSTEMS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            SELECT YOUR REQUIRED CAPACITY.
          </h2>
        </div>

        {/* Capacity Selector Horizontal Strip from Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {SOLAR_CAPACITIES.map((cap, index) => {
            const isSelected = selectedIdx === index;
            return (
              <button
                key={cap.capacity}
                onClick={() => handleSelect(index)}
                className={`p-5 rounded-sm border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1C1E20] border-[#C46A38] shadow-lg ring-1 ring-[#C46A38]'
                    : 'bg-[#17191B] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[#1C1E20]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-black text-xl text-white">
                      {cap.capacity}
                    </span>
                    {cap.isPopular && (
                      <span className="font-display text-[9px] font-bold px-1.5 py-0.5 rounded-xs bg-[#C46A38] text-white">
                        MOST POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8E959D] font-normal leading-snug">
                    {cap.idealFor}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.08)] text-[11px] text-[#FAFBF5] flex items-center justify-between">
                  <span>~ {cap.dailyGeneration.split('approx. ')[1] || cap.dailyGeneration}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C46A38]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active System Detailed Ledger */}
        <div className="bg-[#17191B] border border-[rgba(255,255,255,0.08)] rounded-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[rgba(255,255,255,0.08)]">
            <div>
              <span className="text-[10px] font-display uppercase tracking-widest text-[#C46A38] font-bold block mb-1">
                Active System Specification
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {current.capacity} Solar Power Setup
              </h3>
            </div>

            <button
              onClick={() => {
                onSelectCapacity(current.capacity);
                onOpenQuote();
              }}
              className="btn-primary-dark text-xs py-3 px-6 bg-white text-[#121416] hover:bg-[#FAFBF5] border-white self-start lg:self-auto"
            >
              <span>REQUEST {current.capacity} QUOTE</span>
              <ArrowRight className="w-4 h-4 text-[#121416]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 bg-[#121416] border border-[rgba(255,255,255,0.06)] rounded-sm space-y-1">
              <span className="text-[10px] text-[#8E959D] uppercase block">Daily Generation</span>
              <strong className="text-lg text-white font-bold block">{current.dailyGeneration}</strong>
              <span className="text-[10px] text-[#8E959D]">~{current.numericKw * 125} kWh / month</span>
            </div>

            <div className="p-4 bg-[#121416] border border-[rgba(255,255,255,0.06)] rounded-sm space-y-1">
              <span className="text-[10px] text-[#8E959D] uppercase block">Rooftop Area Required</span>
              <strong className="text-lg text-white font-bold block">{current.roofAreaSqFt}</strong>
              <span className="text-[10px] text-[#8E959D]">Shadow-free terrace space</span>
            </div>

            <div className="p-4 bg-[#121416] border border-[rgba(255,255,255,0.06)] rounded-sm space-y-1">
              <span className="text-[10px] text-[#8E959D] uppercase block">Est. Monthly Savings</span>
              <strong className="text-lg text-[#C46A38] font-bold block">~₹{(current.numericKw * 950).toLocaleString('en-IN')}/mo</strong>
              <span className="text-[10px] text-[#8E959D]">Rajasthan tariff rate</span>
            </div>

            <div className="p-4 bg-[#121416] border border-[rgba(255,255,255,0.06)] rounded-sm space-y-1">
              <span className="text-[10px] text-[#8E959D] uppercase block">Turnaround Time</span>
              <strong className="text-lg text-white font-bold block">3 to 5 Days</strong>
              <span className="text-[10px] text-[#8E959D]">Dausa field deployment</span>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="space-y-2">
              <span className="text-xs font-display font-bold uppercase text-white flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#C46A38]" />
                <span>Simultaneous Supported Load</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.applianceSupport.map((app, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded bg-[#121416] text-xs text-[#E6E0D6]">
                    <CheckCircle2 className="w-3 h-3 text-[#C46A38] shrink-0" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-display font-bold uppercase text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#C46A38]" />
                <span>Hardware Deliverables</span>
              </span>
              <div className="p-3 rounded bg-[#121416] text-xs text-[#8E959D] space-y-1.5">
                <div className="flex justify-between">
                  <span>Panels:</span>
                  <strong className="text-white">Mono PERC Half-Cut Modules</strong>
                </div>
                <div className="flex justify-between">
                  <span>Inverter:</span>
                  <strong className="text-white">High Efficiency Grid-Tied Inverter</strong>
                </div>
                <div className="flex justify-between">
                  <span>Mounting:</span>
                  <strong className="text-white">Hot-Dip Galvanized Iron (GI) Structure</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
