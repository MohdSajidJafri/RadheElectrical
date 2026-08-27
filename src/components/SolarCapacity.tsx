import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SOLAR_CAPACITIES } from '../data/mockData';
import type { SolarCapacityOption } from '../types';

interface SolarCapacityProps {
  onSelectCapacity: (capacity: SolarCapacityOption) => void;
}

export const SolarCapacity = ({ onSelectCapacity }: SolarCapacityProps) => {
  const [activeCapIndex, setActiveCapIndex] = useState<number>(2); // 3 KW default

  const currentOption = SOLAR_CAPACITIES[activeCapIndex];

  return (
    <section id="capacities" className="py-28 bg-[#F6F5EE] text-slate-900 border-b border-slate-300 relative">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block mb-3">
            03 / System Scale
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-[1.08]">
            Rooftop Solar Scale & <br />
            <span className="text-amber-800">Generation Capacity</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl font-normal leading-relaxed mt-4">
            Compare system scales to evaluate daily unit generation output, required terrace footprint, and compatible appliance loads.
          </p>
        </div>

        {/* Scale Progression Selector Bar */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-12 border-b border-slate-300">
          {SOLAR_CAPACITIES.map((cap, idx) => {
            const isActive = idx === activeCapIndex;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveCapIndex(idx)}
                className={`py-3 px-5 rounded-sm font-mono font-bold text-sm sm:text-base whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-950 text-amber-400 border-slate-950 shadow-md'
                    : 'bg-transparent text-slate-700 border-slate-300 hover:border-slate-500 hover:text-slate-950'
                }`}
              >
                <span>{cap.capacity}</span>
                {cap.isPopular && <span className="ml-2 text-xs text-amber-500 font-normal">· Home Standard</span>}
              </button>
            );
          })}
        </div>

        {/* Dynamic Architectural Scale Display */}
        <div className="bg-white border border-slate-300 p-8 sm:p-12 shadow-xl rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Massive Numerals & Scale Scope (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  Installation Scale
                </span>
                <div className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight font-display">
                  {currentOption.capacity}
                </div>
                <div className="text-sm sm:text-base text-slate-700 font-medium mt-2">
                  {currentOption.idealFor}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block mb-1">
                    Daily Generation:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-800 font-mono">
                    {currentOption.dailyGeneration}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block mb-1">
                    Terrace Area:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {currentOption.roofAreaSqFt}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onSelectCapacity(currentOption.capacity)}
                  className="btn-mineral text-xs py-3 px-6 shadow-sm flex items-center gap-2"
                >
                  <span>Proceed with {currentOption.capacity} Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Appliance Support & Structural Feasibility (6 cols) */}
            <div className="lg:col-span-6 lg:pl-8 lg:border-l border-slate-200 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 block mb-3">
                  Typical Operating Load Compatibility
                </span>
                <div className="space-y-3">
                  {currentOption.applianceSupport.map((app, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                      <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span className="font-medium">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed font-mono">
                <strong className="text-slate-900">Rajasthan Irradiance Metric:</strong> Generation calculations assume clean south-facing orientation and unobstructed sunlight hours in Dausa.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
