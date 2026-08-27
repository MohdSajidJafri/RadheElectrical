import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Phone, MapPin, Loader2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { enquiryService } from '../services/enquiryService';
import type { SolarCapacityOption, SolarEnquiry } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

interface SolarEnquiryFormProps {
  selectedCapacity?: SolarCapacityOption;
  initialMessage?: string;
  onEnquirySubmitted?: (enquiry: SolarEnquiry) => void;
}

export const SolarEnquiryForm = ({
  selectedCapacity,
  initialMessage = '',
  onEnquirySubmitted
}: SolarEnquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    district: 'Dausa',
    city: '',
    pinCode: '',
    capacity: (selectedCapacity || '3 KW') as SolarCapacityOption,
    message: initialMessage
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<SolarEnquiry | null>(null);
  const [prevProps, setPrevProps] = useState({ selectedCapacity, initialMessage });
  if (prevProps.selectedCapacity !== selectedCapacity || prevProps.initialMessage !== initialMessage) {
    setPrevProps({ selectedCapacity, initialMessage });
    if (selectedCapacity && selectedCapacity !== formData.capacity) {
      setFormData((prev) => ({ ...prev, capacity: selectedCapacity }));
    }
    if (initialMessage && initialMessage !== formData.message) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'Please enter your district.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city/town.';
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required.';
    } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      newErrors.pinCode = 'Enter a valid 6-digit PIN code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 350));

      const created = enquiryService.createEnquiry({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        district: formData.district.trim(),
        city: formData.city.trim(),
        pinCode: formData.pinCode.trim(),
        capacity: formData.capacity,
        message: formData.message.trim()
      });

      setSubmittedEnquiry(created);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }

      if (onEnquirySubmitted) {
        onEnquirySubmitted(created);
      }
    } catch {
      setErrors({ form: 'An error occurred. Please call 9982861558 directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedEnquiry(null);
    setFormData({
      name: '',
      mobile: '',
      district: 'Dausa',
      city: '',
      pinCode: '',
      capacity: '3 KW',
      message: ''
    });
    setErrors({});
  };

  const generateWhatsAppDirectLink = (enquiry: SolarEnquiry) => {
    const text = encodeURIComponent(
      `Hello RADHE ELECTRICAL,\nI would like to enquire about a *${enquiry.capacity} Solar System*.\n\nName: ${enquiry.name}\nPhone: ${enquiry.mobile}\nLocation: ${enquiry.city}, ${enquiry.district} (${enquiry.pinCode})\n${enquiry.message ? `Notes: ${enquiry.message}` : ''}\n\nPlease share price details and schedule a rooftop consultation.`
    );
    return `https://wa.me/919982861558?text=${text}`;
  };

  return (
    <section id="contact" className="py-28 bg-[#F6F5EE] text-slate-900 border-b border-slate-300 relative">
      <div className="container-custom">
        
        {/* Editorial Statement Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 block mb-3">
            07 / Consultation & Depot
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-[1.08]">
            Let’s see what your roof <br />
            <span className="text-amber-800">can produce in Dausa.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl font-normal leading-relaxed mt-4">
            Request an on-site feasibility consultation or visit our office on Agra Road. Zero sales pressure, transparent system sizing.
          </p>
        </div>

        {/* Clean 2-Column Hub (Mineral Ground) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Calm Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-300 p-8 sm:p-10 rounded-sm shadow-xl">
            
            {submittedEnquiry ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold text-slate-950 uppercase">
                  Thank You, {submittedEnquiry.name}!
                </h3>

                <p className="text-sm text-slate-700 max-w-md mx-auto">
                  Your enquiry for a <strong className="text-amber-800">{submittedEnquiry.capacity} Solar Setup</strong> has been recorded (Reference: <span className="font-mono text-slate-950 font-bold">{submittedEnquiry.id}</span>).
                </p>

                <div className="p-4 bg-slate-50 border border-slate-200 text-left text-xs font-mono space-y-1.5 max-w-sm mx-auto">
                  <div className="flex justify-between text-slate-600">
                    <span>Contact:</span>
                    <strong className="text-slate-950">+91 {submittedEnquiry.mobile}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Location:</span>
                    <strong className="text-slate-950">{submittedEnquiry.city}, {submittedEnquiry.district}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Capacity:</span>
                    <strong className="text-amber-800">{submittedEnquiry.capacity}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  <a
                    href={generateWhatsAppDirectLink(submittedEnquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-mineral text-xs py-3 px-6 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Send On WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="py-3 px-5 border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-950 hover:border-slate-500 rounded-sm"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {errors.form && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-slate-50 border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-950 focus:outline-none focus:border-amber-700 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-[11px] text-red-600 mt-1 font-mono">{errors.name}</p>}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9982861558"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                        className={`w-full bg-slate-50 border border-slate-300 rounded-sm pl-11 pr-3.5 py-2.5 text-xs text-slate-950 font-mono focus:outline-none focus:border-amber-700 ${errors.mobile ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.mobile && <p className="text-[11px] text-red-600 mt-1 font-mono">{errors.mobile}</p>}
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      District *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dausa"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className={`w-full bg-slate-50 border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-950 focus:outline-none focus:border-amber-700 ${errors.district ? 'border-red-500' : ''}`}
                    />
                    {errors.district && <p className="text-[11px] text-red-600 mt-1 font-mono">{errors.district}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bandikui / Agra Road"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full bg-slate-50 border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-950 focus:outline-none focus:border-amber-700 ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && <p className="text-[11px] text-red-600 mt-1 font-mono">{errors.city}</p>}
                  </div>

                  {/* Pin Code */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 303303"
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value.replace(/\D/g, '') })}
                      className={`w-full bg-slate-50 border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-950 font-mono focus:outline-none focus:border-amber-700 ${errors.pinCode ? 'border-red-500' : ''}`}
                    />
                    {errors.pinCode && <p className="text-[11px] text-red-600 mt-1 font-mono">{errors.pinCode}</p>}
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      System Scale *
                    </label>
                    <select
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value as SolarCapacityOption })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-950 focus:outline-none focus:border-amber-700 cursor-pointer"
                    >
                      <option value="1 KW">1 KW (Small Home / Shop)</option>
                      <option value="2 KW">2 KW (2-3 BHK Home)</option>
                      <option value="3 KW">3 KW (Standard Residential)</option>
                      <option value="5 KW">5 KW (Large Villa / Commercial)</option>
                      <option value="10 KW+">10 KW+ (Commercial / Factory)</option>
                      <option value="Not sure">Not sure (Need Advice)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Requirement Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Roof space details, average monthly bill..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-950 focus:outline-none focus:border-amber-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-mineral w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Consultation Request</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* Right Column: Physical Depot & Google Maps Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-slate-300 p-8 rounded-sm shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Physical Depot Location
                </span>
                <h3 className="text-xl font-bold text-slate-950 uppercase font-display">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {BUSINESS_INFO.tagline}
                </p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-950 block">Depot Address:</strong>
                    <span className="text-slate-700">{BUSINESS_INFO.location}</span>
                    <span className="block text-slate-500 font-mono mt-0.5">PIN: {BUSINESS_INFO.pincode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <strong className="text-slate-950 block">Direct Telephone:</strong>
                    <a href={BUSINESS_INFO.phoneTel} className="text-amber-800 font-bold font-mono hover:underline">
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="btn-mineral text-xs py-2.5 px-4 flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 9982861558</span>
                </a>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-950 hover:border-slate-500 rounded-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>

            {/* Embedded Live Google Maps */}
            <div className="rounded-sm overflow-hidden border border-slate-300 bg-white shadow-xl">
              <div className="aspect-[16/9] w-full relative bg-slate-100">
                <iframe
                  title="RADHE ELECTRICAL Location in Dausa"
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

              <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600">Near Giriraj Dharan Temple</span>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-800 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
