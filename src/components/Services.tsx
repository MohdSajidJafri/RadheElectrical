import { ArrowRight, Zap, Building, Wrench } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import type { ServiceDetail } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceDetail) => void;
}

export const Services = ({ onSelectService }: ServicesProps) => {
  const serviceResidential: ServiceDetail = SERVICES[0];
  const serviceCommercial: ServiceDetail = SERVICES[1];
  const serviceMaintenance: ServiceDetail = SERVICES[4] || SERVICES[0];

  return (
    <section id="services" className="py-28 bg-[#080B11] border-b border-slate-800/80 relative">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 block mb-3">
              02 / Application Scope
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
              Solar Installation & <br />
              <span className="text-amber-400">
                Engineering Services
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-light">
            Comprehensive solar energy engineering for residential terraces, commercial facilities, and dedicated maintenance across Dausa district.
          </p>
        </div>

        {/* 3 Asymmetric Visual Panels (Distinct Compositions) */}
        <div className="space-y-24">
          
          {/* Panel 1: Residential Solar & Rooftop Pergolas (Wide Asymmetric Frame) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative group overflow-hidden rounded-sm bg-slate-900 border border-slate-800">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/hero-solar.jpg"
                  alt="Residential solar rooftop installation in Dausa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-300">
                <span>[ 1 KW – 5 KW Systems ]</span>
                <span className="text-amber-400">Terrace & Rooftops</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Residential Solar & Rooftop Pergolas
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Designed for independent homes and villas in Dausa. We engineer standard rooftop arrays as well as elevated pergola structures that provide solar power while maintaining open living space on your terrace.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectService(serviceResidential)}
                  className="btn-secondary text-xs py-3 px-5 flex items-center gap-2 hover:border-amber-400"
                >
                  <span>Enquire For Home Solar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Panel 2: Commercial & Industrial Systems (Reversed Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6 lg:order-1 lg:pr-4">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Commercial Solar & 3-Phase Inverters
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                High-capacity solar setups for shops, retail showrooms, hospitals, schools, and workshops along the Agra Road corridor, engineered to offset heavy daytime electricity tariff charges.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectService(serviceCommercial)}
                  className="btn-secondary text-xs py-3 px-5 flex items-center gap-2 hover:border-amber-400"
                >
                  <span>Enquire For Commercial</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-2 relative group overflow-hidden rounded-sm bg-slate-900 border border-slate-800">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/commercial-solar.jpg"
                  alt="Commercial solar installation array in Rajasthan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-300">
                <span>[ 5 KW – 50 KW+ Systems ]</span>
                <span className="text-amber-400">Commercial & Industrial</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Engineering Installation & Ongoing Care (Wide Banner Frame) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative group overflow-hidden rounded-sm bg-slate-900 border border-slate-800">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/technician-maintenance.jpg"
                  alt="Solar maintenance and electrical string diagnostics in Dausa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-300">
                <span>[ Structural & Electrical Care ]</span>
                <span className="text-amber-400">Direct Dausa Depot</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Installation, Testing & Maintenance
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Precision azimuth mounting, dual chemical earthing, AC/DC surge protection, string voltage testing, inverter firmware updates, and rapid on-site troubleshooting across Dausa district.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectService(serviceMaintenance)}
                  className="btn-secondary text-xs py-3 px-5 flex items-center gap-2 hover:border-amber-400"
                >
                  <span>Request Installation / Care</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
