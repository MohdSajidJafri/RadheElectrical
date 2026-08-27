import { useState } from 'react';
import { ArrowRight, Home, Building } from 'lucide-react';
import type { SolarCapacityOption } from '../types';

interface SavingsCalculatorProps {
  onApplyCalculatedCapacity: (capacity: SolarCapacityOption, calculatedNotes: string) => void;
}

export const SavingsCalculator = ({ onApplyCalculatedCapacity }: SavingsCalculatorProps) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(5000);
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');

  const tariffPerUnit = propertyType === 'residential' ? 7.5 : 9.0;
  const monthlyUnitsConsumed = Math.round(monthlyBill / tariffPerUnit);
  
  const rawKwNeeded = monthlyUnitsConsumed / 130;
  let recommendedCapacity: SolarCapacityOption = '3 KW';
  let numericKw = 3;

  if (rawKwNeeded <= 1.4) {
    recommendedCapacity = '1 KW';
    numericKw = 1;
  } else if (rawKwNeeded <= 2.4) {
    recommendedCapacity = '2 KW';
    numericKw = 2;
  } else if (rawKwNeeded <= 4.2) {
    recommendedCapacity = '3 KW';
    numericKw = 3;
  } else if (rawKwNeeded <= 7.5) {
    recommendedCapacity = '5 KW';
    numericKw = 5;
  } else {
    recommendedCapacity = '10 KW+';
    numericKw = 10;
  }

  const estimatedMonthlyUnitsGen = numericKw * 130;
  const estimatedMonthlySavings = Math.min(monthlyBill, Math.round(estimatedMonthlyUnitsGen * tariffPerUnit));
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;
  const requiredRoofSqFt = numericKw * 95;

  const handleApply = () => {
    const notes = `Calculated via Solar Estimator: Current Bill ₹${monthlyBill.toLocaleString('en-IN')}/mo (${propertyType}), Recommended: ${recommendedCapacity}, Approx Roof: ~${requiredRoofSqFt} sq. ft.`;
    onApplyCalculatedCapacity(recommendedCapacity, notes);
  };

  return (
    <section id="calculator" className="py-28 bg-[#080B11] border-b border-slate-800/80 relative">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 block mb-3">
            04 / Estimation Instrument
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
            Solar Sizing & <br />
            <span className="text-amber-400">
              Savings Estimator
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl font-light leading-relaxed mt-4">
            Adjust your average monthly power bill to calculate the recommended solar system scale, rooftop area requirement, and approximate annual bill reduction.
          </p>
        </div>

        {/* Estimation Instrument Frame */}
        <div className="border border-slate-800 bg-slate-900/60 p-8 sm:p-14 shadow-2xl rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Input Controls (6 cols) */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Category Mode */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType('residential')}
                  className={`py-2.5 px-4 rounded-sm text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
                    propertyType === 'residential'
                      ? 'bg-amber-500 text-amber-950 border-amber-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Residential (Home)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType('commercial')}
                  className={`py-2.5 px-4 rounded-sm text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
                    propertyType === 'commercial'
                      ? 'bg-amber-500 text-amber-950 border-amber-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Commercial (Shop/Office)</span>
                </button>
              </div>

              {/* Prominent Monthly Bill */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Average Monthly Electricity Bill:
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-400 font-mono tracking-tight mb-4">
                  ₹{monthlyBill.toLocaleString('en-IN')}
                </div>

                <input
                  type="range"
                  min="1000"
                  max="35000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-none appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-xs font-mono text-slate-500 mt-2">
                  <span>₹1,000</span>
                  <span>₹15,000</span>
                  <span>₹35,000+</span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                Calculated Consumption: <strong className="text-white">~{monthlyUnitsConsumed} Units / month</strong>
              </div>

            </div>

            {/* Dominant Output Display (6 cols) */}
            <div className="lg:col-span-6 lg:pl-10 lg:border-l border-slate-800 space-y-8">
              
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Recommended System Scale
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                  {recommendedCapacity}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Estimated generation: ~{estimatedMonthlyUnitsGen} Units / month
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Estimated Annual Savings:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    ₹{estimatedAnnualSavings.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-slate-400 block font-mono mt-0.5">approximate per year</span>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Roof Space Required:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-200 font-mono">
                    ~{requiredRoofSqFt} <span className="text-xs font-sans font-normal text-slate-400">sq. ft.</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block font-mono mt-0.5">unshaded rooftop</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleApply}
                  className="btn-primary w-full py-3.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span>Transfer Sizing to Consultation Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
                * Note: Output figures are approximate engineering estimates based on 4.5–5 peak sun hours in Rajasthan. Actual savings depend on rooftop angle and local utility billing.
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
