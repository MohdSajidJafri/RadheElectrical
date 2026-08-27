import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Phone, MapPin, Loader2, ExternalLink, User, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { enquiryService } from '../services/enquiryService';
import type { SolarCapacityOption, SolarEnquiry } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

interface SolarEnquiryFormProps {
  selectedCapacity?: SolarCapacityOption;
  initialMessage?: string;
  onEnquirySubmitted?: (enquiry: SolarEnquiry) => void;
}

export const SolarEnquiryForm: React.FC<SolarEnquiryFormProps> = ({
  selectedCapacity,
  initialMessage = '',
  onEnquirySubmitted
}) => {
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

    if (!formData.city.trim()) {
      newErrors.city = 'Town / Village name is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const cleanMobile = formData.mobile.replace(/\D/g, '');
      const newEnquiry = enquiryService.createEnquiry({
        name: formData.name.trim(),
        mobile: cleanMobile,
        district: formData.district,
        city: formData.city.trim(),
        pinCode: formData.pinCode.trim() || '303303',
        capacity: formData.capacity,
        message: formData.message.trim()
      });

      setSubmittedEnquiry(newEnquiry);
      setIsSubmitting(false);

      if (onEnquirySubmitted) {
        onEnquirySubmitted(newEnquiry);
      }

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 500);
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

  const generateWhatsAppHandoff = () => {
    if (!submittedEnquiry) return BUSINESS_INFO.whatsappUrl;
    const text = encodeURIComponent(
      `Hello RADHE ELECTRICAL,\nI just submitted an enquiry for a ${submittedEnquiry.capacity} Solar System.\n\nName: ${submittedEnquiry.name}\nPhone: ${submittedEnquiry.mobile}\nLocation: ${submittedEnquiry.city}, ${submittedEnquiry.district}\nRef ID: ${submittedEnquiry.id}\n\nPlease let me know when an on-site rooftop survey can be scheduled.`
    );
    return `https://wa.me/919982861558?text=${text}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAFBF5] text-[#121416] border-t border-[rgba(18,20,22,0.08)]">
      
      <div className="container-custom space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2 max-w-xl">
          <span className="font-display text-[11px] font-bold text-[#686F76] uppercase tracking-wider block">
            REQUEST A SURVEY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] uppercase tracking-tight">
            LET'S LOOK AT YOUR ROOFTOP.
          </h2>
          <p className="text-xs sm:text-sm text-[#686F76]">
            Provide your rooftop details below. Our certified engineers will review your shadow profile and contact you directly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Consultation Form from Reference Style (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[rgba(18,20,22,0.09)] p-6 sm:p-10 rounded-sm shadow-xs">
            
            {submittedEnquiry ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.1)] text-[#121416] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-[#C46A38]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#C46A38] font-bold block">
                    Ref #{submittedEnquiry.id}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#121416]">
                    Thank You, {submittedEnquiry.name}!
                  </h3>
                  <p className="text-xs text-[#686F76] max-w-sm mx-auto leading-relaxed">
                    Our Dausa team has received your request for a {submittedEnquiry.capacity} system in {submittedEnquiry.city}, {submittedEnquiry.district}. We will call you within 2 business hours.
                  </p>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppHandoff()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-dark text-xs py-3 px-5 w-full sm:w-auto"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Sync With WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="btn-secondary-outline text-xs py-3 px-4 w-full sm:w-auto"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Input with UserIcon */}
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-[#121416] block">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-[#FAFBF5] border rounded-sm pl-3 pr-9 py-2.5 text-xs text-[#121416] focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-[rgba(18,20,22,0.15)] focus:border-[#121416]'
                      }`}
                    />
                    <User className="w-4 h-4 text-[#8E959D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.name && (
                    <span className="text-[10px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </span>
                  )}
                </div>

                {/* Phone Number with PhoneIcon */}
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-[#121416] block">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="10-digit Indian Mobile Number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className={`w-full bg-[#FAFBF5] border rounded-sm pl-3 pr-9 py-2.5 text-xs text-[#121416] focus:outline-none ${
                        errors.mobile ? 'border-red-500' : 'border-[rgba(18,20,22,0.15)] focus:border-[#121416]'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-[#8E959D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.mobile && (
                    <span className="text-[10px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.mobile}</span>
                    </span>
                  )}
                </div>

                {/* City & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-display text-xs font-bold text-[#121416] block">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Agra Road, Dausa"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full bg-[#FAFBF5] border rounded-sm px-3 py-2.5 text-xs text-[#121416] focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-[rgba(18,20,22,0.15)] focus:border-[#121416]'
                      }`}
                    />
                    {errors.city && (
                      <span className="text-[10px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.city}</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="font-display text-xs font-bold text-[#121416] block">
                      District
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm px-3 py-2.5 text-xs text-[#121416] focus:outline-none focus:border-[#121416]"
                    >
                      <option value="Dausa">Dausa</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Alwar">Alwar</option>
                      <option value="Bharatpur">Bharatpur</option>
                      <option value="Karauli">Karauli</option>
                      <option value="Other Rajasthan">Other Rajasthan</option>
                    </select>
                  </div>
                </div>

                {/* Capacity Dropdown with Chevron */}
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-[#121416] block">
                    Select Capacity *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value as SolarCapacityOption })}
                      className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm pl-3 pr-9 py-2.5 text-xs text-[#121416] focus:outline-none focus:border-[#121416] appearance-none"
                    >
                      <option value="1 KW">1 KW (~4–5 Units/Day • 80 sq.ft.)</option>
                      <option value="2 KW">2 KW (~8–10 Units/Day • 160 sq.ft.)</option>
                      <option value="3 KW">3 KW Home Standard (~12–15 Units/Day • 240 sq.ft.) [Most Popular]</option>
                      <option value="5 KW">5 KW Villa & Dual AC (~20–25 Units/Day • 400 sq.ft.)</option>
                      <option value="10 KW+">10 KW+ Commercial / 3-Phase (~40–50+ Units/Day)</option>
                      <option value="Not sure">Not Sure (Need Engineer Assessment)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8E959D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-[#121416] block">
                    Roof Type or Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. RCC flat roof with water tank, monthly bill ~₹4,500..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm p-2.5 text-xs text-[#121416] focus:outline-none focus:border-[#121416]"
                  />
                </div>

                {/* Submit Button matching Reference Image */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-dark text-xs py-3.5 px-6 w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>SUBMITTING ENQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT ENQUIRY</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Right: Physical Depot Location & Google Maps Frame (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-[rgba(18,20,22,0.09)] rounded-sm p-6 sm:p-8 shadow-xs space-y-5">
              
              <div className="space-y-1">
                <span className="text-[10px] font-display uppercase tracking-widest text-[#C46A38] font-bold block">
                  Physical Depot Location
                </span>
                <h3 className="font-display font-bold text-xl text-[#121416]">
                  RADHE ELECTRICAL
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#686F76]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#121416] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#121416] block">Near Giriraj Dharan Mandir, Agra Road</strong>
                    <span>Dausa, Rajasthan (PIN: 303303)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#121416] shrink-0" />
                  <div>
                    <strong className="text-[#121416] block">Hotline: +91 9982861558</strong>
                    <span className="text-[11px] text-[#686F76]">Mon – Sun: 8:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps Frame */}
              <div className="aspect-[16/9] rounded-sm overflow-hidden border border-[rgba(18,20,22,0.1)] bg-[#FAFBF5] relative">
                <iframe
                  title="RADHE ELECTRICAL Location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.423985390772!2d76.37625637628853!3d26.90657177665225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396d8bbd90d048bd%3A0x87540d033c6c2edb!2sRADHE%20ELECTRICAL!5e0!3m2!1sen!2sin!4v1716382000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-outline text-xs py-2.5 px-4 w-full flex items-center justify-center gap-2"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
