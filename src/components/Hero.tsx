import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO, SOLAR_CAPACITIES } from '../data/mockData';

interface HeroProps {
  onSelectCapacity: (capacity: string) => void;
  onOpenQuote: () => void;
}

export const Hero = ({ onSelectCapacity, onOpenQuote }: HeroProps) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 border-b border-slate-800/60 overflow-hidden">
      
      {/* Background Architectural Canvas (Large Rajasthan Solar Installation) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-solar.jpg"
          alt="Architectural solar panel installation in Rajasthan"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
        />
        {/* Subtle architectural vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
      </div>

      <div className="container-custom relative z-10 my-auto">
        <div className="max-w-5xl">
          
          {/* Subtle Location & Discipline Tag */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-amber-400 mb-6">
            <span>[ Dausa, Rajasthan ]</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Rooftop & Commercial Solar Infrastructure</span>
          </div>

          {/* Massive Oversized Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.98] mb-8 uppercase">
            Complete Solar <br />
            <span className="text-amber-400">
              Installation
            </span> <br />
            Solutions.
          </h1>

          {/* Editorial Subtitle Narrative */}
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl font-light leading-relaxed mb-10">
            Engineering high-yield rooftop solar arrays and galvanized mounting structures for homes, shops, and commercial buildings across Dausa.
          </p>

          {/* Action Group */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="btn-primary text-sm py-3.5 px-8"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={BUSINESS_INFO.phoneTel}
              className="btn-secondary text-sm py-3.5 px-6"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+91 9982861558</span>
            </a>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2 px-4 py-3"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Horizontal Spec Bar */}
      <div className="container-custom relative z-10 pt-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Pre-fill consultation capacity:
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {SOLAR_CAPACITIES.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectCapacity(item.capacity)}
                className="px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all border border-white/15 bg-slate-900/60 text-slate-300 hover:border-amber-400 hover:text-amber-400 hover:bg-slate-900"
              >
                <span>{item.capacity}</span>
                {item.isPopular && <span className="ml-1 text-[10px] text-amber-400 font-normal">★</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
