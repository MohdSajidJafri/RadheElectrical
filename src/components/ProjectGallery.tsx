import React, { useState, useRef, useCallback } from 'react';
import { MapPin, Eye, X, ArrowLeft, ArrowRight } from 'lucide-react';
import type { GalleryProject } from '../types';

interface ProjectGalleryProps {
  projects: GalleryProject[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  
  // Before / After Slider State
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleSliderMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95);
      setSliderPos(percent);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential Pergolas' },
    { id: 'commercial', label: 'Commercial 3-Phase' },
    { id: 'inverter', label: 'Hardware & Structure' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#FAFBF5] text-[#121416] border-t border-[rgba(18,20,22,0.08)]">
      
      <div className="container-custom space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(18,20,22,0.08)]">
          <div className="space-y-2 max-w-xl">
            <span className="font-display text-[11px] font-bold text-[#686F76] uppercase tracking-wider block">
              PORTFOLIO & CASE STUDIES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121416] uppercase tracking-tight">
              ROOFTOP INSTALLATIONS IN DAUSA.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#686F76] max-w-xs">
            Verified installations across Dausa, Agra Road, Bandikui, and Eastern Rajasthan.
          </p>
        </div>

        {/* FEATURED TRANSFORMATION: Interactive Before / After Slider */}
        <div className="bg-white border border-[rgba(18,20,22,0.09)] rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-display uppercase tracking-widest text-[#C46A38] font-bold block mb-1">
                Featured Terrace Transformation
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121416]">
                5 KW Elevated Pergola Terrace Setup
              </h3>
            </div>
            <span className="text-xs font-display text-[#686F76] bg-[#F2F2EF] px-3 py-1.5 rounded-xs self-start sm:self-auto">
              Near Giriraj Dharan Mandir, Agra Road, Dausa
            </span>
          </div>

          {/* Slider Frame */}
          <div
            ref={sliderRef}
            className="relative aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden select-none cursor-ew-resize border border-[rgba(18,20,22,0.1)] shadow-xs"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full Background) */}
            <img
              src="/images/after-terrace.jpg"
              alt="Completed 5 KW elevated solar pergola installation on rooftop in Dausa"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 bg-[#121416] text-white font-display text-xs font-bold px-3 py-1 rounded-xs shadow-sm z-10">
              AFTER: 5 KW SOLAR PERGOLA
            </span>

            {/* Before Image (Clipped Overlay with Hardware-Accelerated ClipPath) */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src="/images/before-terrace.jpg"
                alt="Empty concrete rooftop terrace before solar panel installation"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-black/80 text-white font-display text-xs font-bold px-3 py-1 rounded-xs border border-white/20 shadow-sm">
                BEFORE: EMPTY CONCRETE SLAB
              </span>
            </div>

            {/* Vertical Divider Line */}
            <div
              className="absolute inset-y-0 z-25 border-r-2 border-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            />

            {/* Divider Handle */}
            <div
              className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none -ml-4"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#121416] text-white flex items-center justify-center shadow-md border-2 border-white">
                <div className="flex gap-0.5">
                  <ArrowLeft className="w-2.5 h-2.5" />
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#686F76] pt-2 border-t border-[rgba(18,20,22,0.06)] gap-2">
            <span>Drag slider horizontally to compare before and after terrace transformation.</span>
            <span className="text-[#121416] font-display font-bold">Generation: ~22 Units/Day • Full AC & Domestic Load</span>
          </div>

        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xs border text-xs font-display transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#121416] text-white font-bold border-[#121416]'
                  : 'bg-white text-[#686F76] border-[rgba(18,20,22,0.1)] hover:text-[#121416]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white border border-[rgba(18,20,22,0.09)] rounded-sm overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <div className="aspect-[16/10] relative bg-[#F2F2EF] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 font-display text-[9px] text-white font-bold px-2 py-0.5 rounded-xs">
                    {project.capacityTag}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-full bg-white text-[#121416] shadow-md">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[#686F76] text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#C46A38] shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#121416] line-clamp-1 group-hover:text-[#C46A38] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#686F76] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#FAFBF5] border-t border-[rgba(18,20,22,0.06)] flex items-center justify-between text-xs text-[#686F76]">
                <span className="capitalize">{project.category}</span>
                <span className="font-display font-bold text-[#121416] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Project</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setSelectedProject(null)}
          />

          <div className="relative z-10 max-w-4xl w-full bg-white border border-[rgba(18,20,22,0.15)] rounded-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-5 border-b border-[rgba(18,20,22,0.08)] bg-[#FAFBF5]">
              <div>
                <span className="text-[10px] font-display uppercase tracking-widest text-[#C46A38] font-bold block">
                  {selectedProject.capacityTag} • {selectedProject.location}
                </span>
                <h3 className="font-display font-bold text-xl text-[#121416]">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded bg-white text-[#686F76] hover:text-[#121416] border border-[rgba(18,20,22,0.1)] focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="aspect-[16/10] bg-[#F2F2EF] rounded-sm overflow-hidden border border-[rgba(18,20,22,0.08)]">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-[#686F76] leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            <div className="p-4 bg-[#FAFBF5] border-t border-[rgba(18,20,22,0.08)] flex items-center justify-between text-xs">
              <span className="text-[#686F76]">RADHE ELECTRICAL Project Record</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-secondary-outline text-xs py-1.5 px-4"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
