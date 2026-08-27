import React, { useState } from 'react';
import { ArrowRight, Sun } from 'lucide-react';
import type { SolarCapacityOption } from '../types';

interface SavingsCalculatorProps {
  onSelectCapacity: (capacity: SolarCapacityOption) => void;
  onOpenQuote: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  onSelectCapacity,
  onOpenQuote
}) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);
  const [tariffType, setTariffType] = useState<'residential' | 'commercial'>('residential');

  const unitRate = tariffType === 'residential' ? 7.8 : 9.5;
  const estimatedMonthlyUnits = Math.round(monthlyBill / unitRate);
  const calculatedKw = Math.max(1, Math.round((estimatedMonthlyUnits / 120) * 10) / 10);

  let recommendedCapacity: SolarCapacityOption = '3 KW';
  if (calculatedKw <= 1.4) recommendedCapacity = '1 KW';
  else if (calculatedKw <= 2.4) recommendedCapacity = '2 KW';
  else if (calculatedKw <= 4.0) recommendedCapacity = '3 KW';
  else if (calculatedKw <= 7.5) recommendedCapacity = '5 KW';
  else recommendedCapacity = '10 KW+';

  const monthlyGeneration = Math.round(calculatedKw * 125);
  const estimatedMonthlySavings = Math.round(Math.min(monthlyBill * 0.9, monthlyGeneration * unitRate));
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;
  const twentyFiveYearSavings = estimatedAnnualSavings * 25;
  const requiredRoofArea = Math.round(calculatedKw * 80);

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#FAFBF5] text-[#121416] border-t border-[rgba(18,20,22,0.08)]">
      
      <div className="container-custom space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <span className="font-display text-[11px] font-bold text-[#686F76] uppercase tracking-wider block">
            SAVINGS & YIELD CALCULATOR
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] uppercase tracking-tight">
            ESTIMATE YOUR ENERGY GENERATION.
          </h2>
          <p className="text-xs sm:text-sm text-[#686F76]">
            Calculated from Rajasthan solar irradiance and current DISCOM electricity tariffs.
          </p>
        </div>

        {/* Clean Split Layout from Reference Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Inputs (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[rgba(18,20,22,0.09)] rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6">
            
            <div className="space-y-6">
              
              {/* Tariff Category */}
              <div>
                <label className="font-display text-xs font-bold uppercase tracking-wider text-[#121416] block mb-2">
                  Connection Category
                </label>
                <div className="grid grid-cols-2 gap-3 font-display text-xs">
                  <button
                    onClick={() => setTariffType('residential')}
                    className={`py-2.5 px-4 rounded-sm border transition-all ${
                      tariffType === 'residential'
                        ? 'bg-[#121416] text-white font-bold border-[#121416]'
                        : 'bg-[#F2F2EF] text-[#686F76] border-transparent hover:text-[#121416]'
                    }`}
                  >
                    Domestic / Residential
                  </button>
                  <button
                    onClick={() => setTariffType('commercial')}
                    className={`py-2.5 px-4 rounded-sm border transition-all ${
                      tariffType === 'commercial'
                        ? 'bg-[#121416] text-white font-bold border-[#121416]'
                        : 'bg-[#F2F2EF] text-[#686F76] border-transparent hover:text-[#121416]'
                    }`}
                  >
                    Commercial / 3-Phase
                  </button>
                </div>
              </div>

              {/* Monthly Bill Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold uppercase text-[#121416]">
                    Average Monthly Electricity Bill
                  </span>
                  <strong className="font-display text-2xl font-extrabold text-[#121416]">
                    ₹{monthlyBill.toLocaleString('en-IN')}
                  </strong>
                </div>

                <input
                  type="range"
                  min={1500}
                  max={35000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-[#686F76]">
                  <span>₹1,500/mo</span>
                  <span>₹10,000/mo</span>
                  <span>₹20,000/mo</span>
                  <span>₹35,000+/mo</span>
                </div>
              </div>

              {/* Quick Bill Selectors */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-display font-bold text-[#686F76] block mb-2">
                  Common Monthly Baselines:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[2500, 4500, 7500, 12000, 20000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setMonthlyBill(val)}
                      className={`px-3 py-1.5 rounded-sm border text-xs font-display transition-all ${
                        monthlyBill === val
                          ? 'bg-[#121416] text-white border-[#121416] font-bold'
                          : 'bg-[#F2F2EF] text-[#686F76] border-transparent hover:text-[#121416]'
                      }`}
                    >
                      ₹{val.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-4 bg-[#F2F2EF] rounded-sm text-xs text-[#686F76] flex items-center gap-3">
              <Sun className="w-4 h-4 text-[#C46A38] shrink-0" />
              <span>
                Estimated monthly consumption: <strong className="text-[#121416]">~{estimatedMonthlyUnits} units</strong>. Sized for ~85–90% bill offset.
              </span>
            </div>

          </div>

          {/* Right: Output (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[rgba(18,20,22,0.09)] rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(18,20,22,0.08)]">
                <span className="font-display text-xs font-bold uppercase tracking-wider text-[#686F76]">
                  Recommended System Scale
                </span>
                <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded-xs bg-[#F2F2EF] text-[#121416]">
                  OPTIMAL SIZING
                </span>
              </div>

              <div className="py-6 space-y-1">
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] uppercase">
                  {recommendedCapacity} System
                </h3>
                <span className="text-xs text-[#686F76] block">
                  ({calculatedKw} kW Capacity • ~{monthlyGeneration} Units/Month)
                </span>
              </div>
            </div>

            {/* Output Metric Tiles */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              
              <div className="p-4 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm space-y-1">
                <span className="text-[#686F76] text-[10px] uppercase font-bold block">Est. Annual Savings</span>
                <strong className="text-xl font-display font-bold text-[#121416] block">
                  ₹{estimatedAnnualSavings.toLocaleString('en-IN')}
                </strong>
                <span className="text-[10px] text-[#686F76]">~₹{estimatedMonthlySavings.toLocaleString('en-IN')} / month</span>
              </div>

              <div className="p-4 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm space-y-1">
                <span className="text-[#686F76] text-[10px] uppercase font-bold block">25-Year Asset Yield</span>
                <strong className="text-xl font-display font-bold text-[#C46A38] block">
                  ₹{(twentyFiveYearSavings / 100000).toFixed(1)} Lakhs
                </strong>
                <span className="text-[10px] text-[#686F76]">Lifetime value</span>
              </div>

              <div className="p-4 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm space-y-1 col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-[#686F76] text-[10px] uppercase font-bold block">Rooftop Area Required</span>
                  <strong className="text-sm font-display font-bold text-[#121416] block">
                    ~{requiredRoofArea} sq. ft.
                  </strong>
                </div>
                <span className="text-[10px] text-[#686F76]">
                  Shadow-free terrace space
                </span>
              </div>

            </div>

            {/* Apply Sizing CTA */}
            <button
              onClick={() => {
                onSelectCapacity(recommendedCapacity);
                onOpenQuote();
              }}
              className="btn-primary-dark text-xs py-3.5 px-6 w-full"
            >
              <span>APPLY {recommendedCapacity} SIZING TO FREE QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};
