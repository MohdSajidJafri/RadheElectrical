import { Phone, MessageSquare, MapPin, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 border-b border-slate-800/60">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-amber-400 mb-2 block">
            Office & Location
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Visit RADHE ELECTRICAL in Dausa
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Our office is located on Agra Road near Giriraj Dharan Temple in Dausa. Contact us directly or visit our office for in-person solar consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                {BUSINESS_INFO.name}
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                {BUSINESS_INFO.tagline}
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Office Address:</strong>
                    <span>{BUSINESS_INFO.location}</span>
                    <span className="block text-slate-500 mt-0.5">PIN Code: {BUSINESS_INFO.pincode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white block text-sm">Direct Phone:</strong>
                    <a href={BUSINESS_INFO.phoneTel} className="text-amber-400 font-semibold hover:underline">
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <strong className="text-white block text-sm">Consultation Hours:</strong>
                    <span>Monday – Sunday: 8:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="btn-primary text-xs py-2.5 px-5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 9982861558</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2.5 px-5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Service Areas */}
            <div className="pt-6 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Service Coverage Areas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BUSINESS_INFO.serviceDistricts.map((district, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded"
                  >
                    ✓ {district}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-4 shadow-xl">
                <iframe
                  title="RADHE ELECTRICAL Google Maps Location"
                  src="https://maps.google.com/maps?q=26.9065717,76.3788313&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <p className="text-xs text-slate-400 mb-4">
                Located near Giriraj Dharan Temple on Agra Road, Dausa.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">Official Google Maps Listing</span>
                <span className="text-[11px] text-slate-400">View directions and photos</span>
              </div>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2 px-4 shrink-0 flex items-center gap-1.5"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
