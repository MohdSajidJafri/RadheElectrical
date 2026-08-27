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
import type { SolarCapacityOption, ServiceDetail, SolarEnquiry, GalleryProject } from './types';

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

  const handleSelectCapacity = (capacity?: string) => {
    if (capacity) {
      setSelectedCapacity(capacity as SolarCapacityOption);
      setInitialFormMessage(`Interested in ${capacity} solar panel system installation.`);
    }
    scrollToContact();
  };

  const handleSelectService = (service: ServiceDetail) => {
    setSelectedCapacity(service.defaultCapacity);
    setInitialFormMessage(`Requirement for ${service.title}: ${service.tagline}`);
    scrollToContact();
  };

  const handleApplyCalculatedCapacity = (capacity: SolarCapacityOption, notes: string) => {
    setSelectedCapacity(capacity);
    setInitialFormMessage(notes);
    scrollToContact();
  };

  const handleEnquirySubmitted = (_newEnquiry: SolarEnquiry) => {
    setEnquiries(enquiryService.getEnquiries());
  };

  // If Admin mode is toggled
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-amber-400 selection:text-amber-950">
      
      {/* Navigation Header */}
      <Header
        onOpenQuote={() => {
          setSelectedCapacity('3 KW');
          scrollToContact();
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Public Website Content */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onSelectCapacity={handleSelectCapacity}
          onOpenQuote={() => {
            setSelectedCapacity('3 KW');
            scrollToContact();
          }}
        />

        {/* 2. Editorial About / Engineering Philosophy */}
        <About
          onOpenQuote={() => {
            setSelectedCapacity('3 KW');
            scrollToContact();
          }}
        />

        {/* 3. Specialized Services Application Groups */}
        <Services
          onSelectService={handleSelectService}
        />

        {/* 4. Solar Capacities & Sizing Guide */}
        <SolarCapacity
          onSelectCapacity={(cap) => handleSelectCapacity(cap)}
        />

        {/* 5. Solar Savings & Rooftop Estimator */}
        <SavingsCalculator
          onApplyCalculatedCapacity={handleApplyCalculatedCapacity}
        />

        {/* 6. Why Choose Us Trust Pillars */}
        <WhyChooseUs />

        {/* 7. Field Project Gallery & Case Studies */}
        <ProjectGallery
          projects={galleryProjects}
        />

        {/* 8. Unified Consultation Hub & Office Depot Location */}
        <SolarEnquiryForm
          selectedCapacity={selectedCapacity}
          initialMessage={initialFormMessage}
          onEnquirySubmitted={handleEnquirySubmitted}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Buttons */}
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
