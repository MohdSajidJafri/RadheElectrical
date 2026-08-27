import { ArrowRight, Check } from 'lucide-react';

interface AboutProps {
  onOpenQuote: () => void;
}

export const About = ({ onOpenQuote }: AboutProps) => {
  return (
    <section id="about" className="py-28 bg-[#F6F5EE] text-slate-900 border-b border-slate-300 relative overflow-hidden">
      <div className="container-custom">
        
        {/* Massive Manifesto Statement */}
        <div className="max-w-5xl mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block mb-4">
            01 / Engineering Philosophy
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.05] uppercase">
            Built for the roof. <br />
            <span className="text-amber-800">Engineered for the Rajasthan sun.</span>
          </h2>
        </div>

        {/* Asymmetric Photographic & Technical Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Detail Architecture Photo (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden bg-slate-900 shadow-xl border border-slate-300">
              <img
                src="/images/structure-detail.jpg"
                alt="Galvanized steel solar mounting structure"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 font-mono pt-1">
              <span>[ Heavy-Duty Galvanized Iron Structure ]</span>
              <span>Near Giriraj Dharan Temple, Agra Road</span>
            </div>
          </div>

          {/* Right Column: Physical Engineering Truths (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:pt-4">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Based on Agra Road in Dausa, <strong className="text-slate-950 font-bold">RADHE ELECTRICAL</strong> designs and installs solar power systems built to withstand the high ambient temperatures and desert wind loads of eastern Rajasthan.
            </p>

            <div className="space-y-6 pt-4 border-t border-slate-300">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-950 uppercase tracking-wide">
                  <Check className="w-4 h-4 text-amber-700" />
                  <span>Structural Anchoring & Corrosion Resistance</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Hot-dip galvanized mounting structures anchored securely to withstand gale-force wind speeds without penetrating terrace waterproofing.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-950 uppercase tracking-wide">
                  <Check className="w-4 h-4 text-amber-700" />
                  <span>Dual Chemical Earthing & Surge Protection</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Dedicated grounding pits and AC/DC surge protection devices (SPD) protecting home and commercial appliances from voltage spikes.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-950 uppercase tracking-wide">
                  <Check className="w-4 h-4 text-amber-700" />
                  <span>Direct Local Dausa Depot</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Physical presence near Giriraj Dharan Temple for prompt on-site surveys, string testing, and warranty servicing.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="btn-mineral text-xs py-3 px-6 shadow-sm"
              >
                <span>Request On-Site Rooftop Survey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
