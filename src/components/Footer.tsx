import { Phone, MessageSquare, MapPin, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer = ({ onOpenAdmin }: FooterProps) => {
  return (
    <footer className="bg-[#05070B] text-slate-400 text-xs pt-24 pb-20 border-t border-slate-900">
      <div className="container-custom">
        
        {/* Massive Brand Statement & Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              RADHE <span className="text-amber-500 font-light">ELECTRICAL</span>
            </h3>
            <p className="text-sm text-slate-400 max-w-md font-light leading-relaxed">
              Complete solar panel installation solutions and galvanized mounting structures for residential and commercial rooftops in Dausa, Rajasthan.
            </p>
            <div className="text-xs font-mono text-amber-500/80">
              Near Giriraj Dharan Temple, Agra Road, Dausa
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white block mb-4">
              Navigation
            </span>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  01 / Services
                </a>
              </li>
              <li>
                <a href="#capacities" className="hover:text-amber-400 transition-colors">
                  02 / System Scale
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  03 / Estimator
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  04 / Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  05 / Contact & Location
                </a>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
                >
                  <Shield className="w-3 h-3 text-amber-500" />
                  <span>06 / Staff & Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white block mb-4">
              Direct Contact
            </span>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={BUSINESS_INFO.phoneTel} className="text-white font-bold font-mono hover:text-amber-400">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-600">
          <div>
            © {new Date().getFullYear()} RADHE ELECTRICAL · Dausa, Rajasthan.
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-400 transition-colors">
              Back to Top ↑
            </a>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-500"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Gateway</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
