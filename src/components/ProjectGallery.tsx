import { useState } from 'react';
import { Maximize2, MapPin, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { GalleryProject } from '../types';

interface ProjectGalleryProps {
  projects: GalleryProject[];
}

export const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [beforeAfterSliderPos, setBeforeAfterSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential Rooftops' },
    { id: 'commercial', label: 'Commercial Systems' },
    { id: 'rooftop', label: 'Elevated Pergolas' },
    { id: 'inverter', label: 'Inverters & Hardware' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featuredProject = filteredProjects[0] || projects[0];
  const supportingProjects = filteredProjects.slice(1);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setBeforeAfterSliderPos(pos);
  };

  const currentLightboxProject = activeLightboxIndex !== null ? filteredProjects[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-28 bg-[#080B11] border-b border-slate-800/80 relative">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 block mb-3">
            06 / Architectural Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
            Completed Solar Projects in <br />
            <span className="text-amber-400">
              Dausa & Eastern Rajasthan
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl font-light leading-relaxed mt-4">
            A portfolio of real rooftop solar installations, elevated pergolas, and commercial arrays built for long-term generation performance.
          </p>
        </div>

        {/* Featured Case Study: Interactive Before & After Rooftop Transformation */}
        <div className="mb-24 border border-slate-800 bg-slate-900/60 p-8 sm:p-12 shadow-2xl rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Case Study Meta (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                [ Transformation Case Study ]
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
                5 KW Elevated Pergola Structure
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Transformed an unshaded concrete terrace into a high-yield 5 KW solar pergola structure, generating clean energy while providing a covered, usable outdoor terrace area for the home.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block mb-1">System Scale:</span>
                  <strong className="text-amber-400 text-base">5 KW System</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Location:</span>
                  <strong className="text-slate-200 text-sm">Dausa, Rajasthan</strong>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 pt-1">
                ↔ <span className="text-slate-200">Drag the vertical bar</span> to inspect before and after installation.
              </div>
            </div>

            {/* Before / After Visual Slider (7 cols) */}
            <div className="lg:col-span-7">
              <div
                className="before-after-container aspect-[16/10] sm:aspect-[16/9] relative cursor-ew-resize overflow-hidden"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={(e) => {
                  if (isDragging) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleSliderMove(e.clientX, rect);
                  }
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleSliderMove(touch.clientX, rect);
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleSliderMove(e.clientX, rect);
                }}
              >
                <img
                  src="/images/after-terrace.jpg"
                  alt="After: 5 KW Solar Pergola Installation"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-amber-950 text-[11px] font-mono font-bold px-3 py-1 rounded shadow">
                  AFTER / 5 KW Solar Pergola
                </div>

                <div
                  className="absolute inset-0 overflow-hidden select-none"
                  style={{ width: `${beforeAfterSliderPos}%` }}
                >
                  <img
                    src="/images/before-terrace.jpg"
                    alt="Before: Empty Concrete Terrace"
                    className="w-full h-full object-cover max-w-none"
                    style={{ width: '100%', minWidth: '100%' }}
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/90 text-slate-200 text-[11px] font-mono font-bold px-3 py-1 rounded shadow border border-slate-700">
                    BEFORE / Bare Terrace
                  </div>
                </div>

                <div
                  className="before-after-slider"
                  style={{ left: `${beforeAfterSliderPos}%` }}
                >
                  <div className="before-after-handle">
                    <span>↔</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Portfolio Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 border-b border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-amber-950 border-amber-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid (Dominant Lead + Asymmetric Grid) */}
        <div className="space-y-16">
          
          {/* Dominant Hero Project */}
          {featuredProject && (
            <div
              onClick={() => setActiveLightboxIndex(0)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-800 bg-slate-900/40 p-8 rounded-sm hover:border-slate-700 transition-all"
            >
              <div className="lg:col-span-8 aspect-[16/9] rounded-sm overflow-hidden bg-slate-950 relative">
                <img
                  src={featuredProject.imageUrl}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-slate-950/90 text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded border border-slate-700">
                  {featuredProject.capacityTag}
                </span>
                <div className="absolute bottom-4 right-4 p-2.5 rounded bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{featuredProject.location}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {featuredProject.description}
                </p>
                <div className="text-xs font-mono font-semibold text-amber-400 flex items-center gap-1 pt-2">
                  <span>View Project Lightbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          )}

          {/* Supporting Project Vignettes */}
          {supportingProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {supportingProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => setActiveLightboxIndex(idx + 1)}
                  className="group cursor-pointer space-y-4"
                >
                  <div className="aspect-[16/10] rounded-sm overflow-hidden bg-slate-950 border border-slate-800 relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border border-slate-700">
                      {project.capacityTag}
                    </span>

                    <div className="absolute top-3 right-3 w-7 h-7 rounded bg-slate-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-slate-300 font-mono">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors mb-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 font-light">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {currentLightboxProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveLightboxIndex(null)}
          />

          <div className="relative z-10 max-w-5xl w-full bg-slate-950 border border-slate-800 rounded-sm overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  {currentLightboxProject.capacityTag}
                </span>
                <span className="text-sm font-bold text-white uppercase truncate">
                  {currentLightboxProject.title}
                </span>
              </div>

              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black flex items-center justify-center">
              <img
                src={currentLightboxProject.imageUrl}
                alt={currentLightboxProject.title}
                className="w-full h-full object-contain"
              />

              {activeLightboxIndex !== null && activeLightboxIndex > 0 && (
                <button
                  onClick={() => setActiveLightboxIndex(activeLightboxIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 border border-slate-700 text-white hover:bg-amber-500 hover:text-amber-950"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {activeLightboxIndex !== null && activeLightboxIndex < filteredProjects.length - 1 && (
                <button
                  onClick={() => setActiveLightboxIndex(activeLightboxIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 border border-slate-700 text-white hover:bg-amber-500 hover:text-amber-950"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentLightboxProject.location}</span>
              </div>
              <p className="text-slate-300 font-light">
                {currentLightboxProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
