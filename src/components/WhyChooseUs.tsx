import { Shield } from 'lucide-react';

export const WhyChooseUs = () => {
  const standards = [
    {
      num: '01',
      title: 'Professional Mechanical & Electrical Installation',
      desc: 'Precision south-facing azimuth alignment, rigid hot-dip galvanized anchoring, and neat concealed conduit wiring that protects roof waterproofing and optimizes solar capture.'
    },
    {
      num: '02',
      title: 'Quality Equipment & Structural Longevity',
      desc: 'High-efficiency monocrystalline solar panels, certified dual-MPPT hybrid inverters, and heavy-duty structural steel engineered to endure extreme summer heat and storm wind loads.'
    },
    {
      num: '03',
      title: 'Appropriate & Honest System Sizing',
      desc: 'Capacity calculations engineered strictly around your actual consumption load profile. We size what your building actually needs without unnecessary over-capacity upsell.'
    },
    {
      num: '04',
      title: 'Direct Local After-Sales Support in Dausa',
      desc: 'Our technicians operate directly out of our Agra Road office near Giriraj Dharan Temple for prompt physical site visits, string voltage testing, and long-term warranty support.'
    },
    {
      num: '05',
      title: 'Free On-Site Feasibility Consultation',
      desc: 'Zero-obligation rooftop shadow analysis, structural space verification, and transparent cost estimates before you make any financial commitment.'
    }
  ];

  return (
    <section id="why-us" className="py-28 bg-[#F6F5EE] text-slate-900 border-b border-slate-300 relative">
      <div className="container-custom">
        
        {/* Large Visual Statement Header */}
        <div className="max-w-4xl mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 block mb-3">
            05 / Quality Standards
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-[1.08]">
            How RADHE ELECTRICAL <br />
            <span className="text-amber-800">Builds Solar Systems</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl font-normal leading-relaxed mt-4">
            A declaration of how our technicians approach structural integrity, electrical safety, and local after-sales service across Dausa district.
          </p>
        </div>

        {/* Editorial Vertical Sequence + Hardware Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Physical Installation Hardware Photo (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-slate-900 shadow-xl border border-slate-300">
              <img
                src="/images/inverter-system.jpg"
                alt="Solar inverter setup and electrical conduits"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5 bg-white border border-slate-300 rounded-sm space-y-2">
              <div className="flex items-center gap-2 text-slate-950 font-bold text-sm uppercase font-display tracking-wide">
                <Shield className="w-4 h-4 text-amber-800" />
                <span>Local Presence on Agra Road</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Unlike third-party digital portals, we are physically located in Dausa near Giriraj Dharan Temple for responsive on-site service.
              </p>
            </div>
          </div>

          {/* Right Column: 5 Sequential Declarations with Hairline Dividers (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {standards.map((item) => (
              <div key={item.num} className="pt-6 border-t border-slate-300 flex items-start gap-5">
                <span className="font-mono text-base font-bold text-amber-800 mt-1 shrink-0">
                  {item.num}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
