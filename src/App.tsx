import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { SolarCapacity } from './components/SolarCapacity';
import { SavingsCalculator } from './components/SavingsCalculator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProjectGallery } from './components/ProjectGallery';
import { SolarEnquiryForm } from './components/SolarEnquiryForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AdminLayout } from './components/admin/AdminLayout';

import { enquiryService } from './services/enquiryService';
import { galleryService } from './services/galleryService';
import type { SolarCapacityOption, SolarEnquiry, GalleryProject } from './types';

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [enquiries, setEnquiries] = useState<SolarEnquiry[]>(() => enquiryService.getEnquiries());
  const [galleryProjects, setGalleryProjects] = useState<GalleryProject[]>(() => galleryService.getProjects());
  const [selectedCapacity, setSelectedCapacity] = useState<SolarCapacityOption>('3 KW');
  const [initialFormMessage, setInitialFormMessage] = useState<string>('');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCapacity = (capacity?: SolarCapacityOption) => {
    if (capacity) {
      setSelectedCapacity(capacity);
      setInitialFormMessage(`Interested in ${capacity} solar panel system installation in Dausa.`);
    }
    scrollToContact();
  };

  const handleEnquirySubmitted = (_newEnquiry: SolarEnquiry) => {
    setEnquiries(enquiryService.getEnquiries());
  };

  // If Admin Operations mode is active
  if (isAdminOpen) {
    return (
      <AdminLayout
        enquiries={enquiries}
        galleryProjects={galleryProjects}
        onUpdateEnquiries={(updated) => setEnquiries(updated)}
        onUpdateGallery={(updated) => setGalleryProjects(updated)}
        onCloseAdmin={() => setIsAdminOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBF5] text-[#121416] flex flex-col font-body selection:bg-[#121416] selection:text-white">
      
      {/* 1. Header matching Reference Image */}
      <Header
        onOpenQuote={() => {
          setSelectedCapacity('3 KW');
          scrollToContact();
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Experience */}
      <main className="flex-1 relative z-10">
        
        {/* 2. Hero matching Reference Composition */}
        <Hero
          onOpenQuote={() => {
            setSelectedCapacity('3 KW');
            scrollToContact();
          }}
        />

        {/* 3. About / Why Radhe Electrical from Reference */}
        <About />

        {/* 4. Popular Solar Systems from Reference */}
        <SolarCapacity
          onSelectCapacity={handleSelectCapacity}
          onOpenQuote={scrollToContact}
        />

        {/* 5. Services & Capabilities */}
        <Services
          onSelectCapacity={handleSelectCapacity}
          onOpenQuote={scrollToContact}
        />

        {/* 6. Savings & Yield Calculator */}
        <SavingsCalculator
          onSelectCapacity={handleSelectCapacity}
          onOpenQuote={scrollToContact}
        />

        {/* 7. Craft Standards Sequence */}
        <WhyChooseUs />

        {/* 8. Portfolio & Case Studies */}
        <ProjectGallery
          projects={galleryProjects}
        />

        {/* 9. Consultation Terminal matching Reference Form Elements */}
        <SolarEnquiryForm
          selectedCapacity={selectedCapacity}
          initialMessage={initialFormMessage}
          onEnquirySubmitted={handleEnquirySubmitted}
        />

      </main>

      {/* 10. Minimal Architectural Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Conversion Actions */}
      <FloatingActions
        onOpenQuote={() => {
          setSelectedCapacity('3 KW');
          scrollToContact();
        }}
      />

    </div>
  );
}

export default App;
