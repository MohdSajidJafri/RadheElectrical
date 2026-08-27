import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Upload, MapPin } from 'lucide-react';
import type { GalleryProject } from '../../types';
import { galleryService } from '../../services/galleryService';

interface GalleryManagerProps {
  projects: GalleryProject[];
  onUpdateProjects: (updated: GalleryProject[]) => void;
}

export const GalleryManager: React.FC<GalleryManagerProps> = ({
  projects,
  onUpdateProjects
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'residential' as GalleryProject['category'],
    capacityTag: '3 KW',
    location: 'Dausa, Rajasthan',
    description: '',
    imageUrl: '/images/residential-villa.jpg',
    isBeforeAfter: false,
    beforeImageUrl: '/images/before-terrace.jpg',
  });

  const availableImages = [
    { label: 'Residential Villa (3-5 KW)', url: '/images/residential-villa.jpg' },
    { label: 'Commercial Rooftop Plant', url: '/images/commercial-solar.jpg' },
    { label: 'Technician Maintenance', url: '/images/technician-maintenance.jpg' },
    { label: 'Galvanized Structure Detail', url: '/images/structure-detail.jpg' },
    { label: 'Inverter & Cabling Setup', url: '/images/inverter-system.jpg' },
    { label: 'Hero Rooftop Installation', url: '/images/hero-solar.jpg' },
    { label: 'Before: Concrete Terrace', url: '/images/before-terrace.jpg' },
    { label: 'After: 5 KW Pergola', url: '/images/after-terrace.jpg' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          setFormData((prev) => ({
            ...prev,
            imageUrl: loadEvent.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAdd = () => {
    setFormData({
      title: '',
      category: 'residential',
      capacityTag: '3 KW',
      location: 'Dausa, Rajasthan',
      description: '',
      imageUrl: '/images/residential-villa.jpg',
      isBeforeAfter: false,
      beforeImageUrl: '/images/before-terrace.jpg',
    });
    setEditingId(null);
    setIsAdding(true);
  };

  const handleStartEdit = (project: GalleryProject) => {
    setFormData({
      title: project.title,
      category: project.category,
      capacityTag: project.capacityTag,
      location: project.location,
      description: project.description,
      imageUrl: project.imageUrl,
      isBeforeAfter: !!project.isBeforeAfter,
      beforeImageUrl: project.beforeImageUrl || '/images/before-terrace.jpg',
    });
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      const existing = projects.find(p => p.id === editingId);
      if (existing) {
        const updatedProject: GalleryProject = {
          ...existing,
          ...formData
        };
        const updated = galleryService.updateProject(updatedProject);
        onUpdateProjects(updated);
      }
    } else {
      const updated = galleryService.addProject(formData);
      onUpdateProjects(updated);
    }

    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete portfolio project "${title}"?`)) {
      const updated = galleryService.deleteProject(id);
      onUpdateProjects(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset gallery to default verified project photos?')) {
      const updated = galleryService.resetDefaults();
      onUpdateProjects(updated);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="bg-white border border-[rgba(18,20,22,0.08)] p-5 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <span className="text-[10px] font-display uppercase tracking-widest text-[#C46A38] block font-bold">
            Media Management
          </span>
          <h2 className="text-xl font-display font-extrabold text-[#121416]">
            PORTFOLIO & CASE STUDIES ({projects.length})
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-sm border border-[rgba(18,20,22,0.12)] hover:border-[rgba(18,20,22,0.3)] bg-white text-xs font-display text-[#686F76] hover:text-[#121416] transition-colors"
          >
            Reset Default Photos
          </button>

          <button
            onClick={handleStartAdd}
            className="btn-primary-dark text-xs py-2 px-4 flex items-center gap-1.5 font-display font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Case Study</span>
          </button>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
            onClick={() => setIsAdding(false)}
          />

          <div className="relative z-10 w-full max-w-2xl bg-white border border-[rgba(18,20,22,0.15)] rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(18,20,22,0.08)]">
              <h3 className="font-display font-bold text-lg text-[#121416]">
                {editingId ? 'Edit Project Record' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-1 rounded text-[#8E959D] hover:text-[#121416]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-display font-bold text-[#121416] block">Project Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 KW Pergola Terrace Setup"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm p-2.5 text-[#121416] focus:outline-none focus:border-[#121416]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-display font-bold text-[#121416] block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm p-2.5 text-[#121416] focus:outline-none focus:border-[#121416]"
                  >
                    <option value="residential">Residential Pergola</option>
                    <option value="commercial">Commercial 3-Phase</option>
                    <option value="rooftop">Rooftop Structure</option>
                    <option value="inverter">Hardware & Inverter</option>
                    <option value="before_after">Before / After</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-display font-bold text-[#121416] block">Capacity Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 KW or 5 KW"
                    value={formData.capacityTag}
                    onChange={(e) => setFormData({ ...formData, capacityTag: e.target.value })}
                    className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm p-2.5 text-[#121416] focus:outline-none focus:border-[#121416]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-display font-bold text-[#121416] block">Location Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Agra Road, Dausa"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm p-2.5 text-[#121416] focus:outline-none focus:border-[#121416]"
                  />
                </div>
              </div>

              {/* Photo Source Selector */}
              <div className="space-y-2 pt-2 border-t border-[rgba(18,20,22,0.08)]">
                <label className="font-display font-bold text-[#121416] block">Select Photo</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableImages.map((img) => (
                    <button
                      type="button"
                      key={img.url}
                      onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                      className={`p-2 rounded-sm border text-left flex items-center gap-2 transition-all ${
                        formData.imageUrl === img.url
                          ? 'bg-[#121416] text-white border-[#121416] font-bold'
                          : 'bg-[#FAFBF5] text-[#686F76] border-[rgba(18,20,22,0.1)] hover:text-[#121416]'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-7 h-7 rounded-xs object-cover" />
                      <span className="text-[11px] truncate">{img.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <label className="cursor-pointer btn-secondary-outline text-[11px] py-1.5 px-3 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Image</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-[10px] text-[#8E959D]">PNG/JPG up to 5MB</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-display font-bold text-[#121416] block">Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 5 KW elevated pergola structure with Mono PERC modules..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.15)] rounded-sm p-2.5 text-[#121416] focus:outline-none focus:border-[#121416]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[rgba(18,20,22,0.08)]">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-sm border border-[rgba(18,20,22,0.15)] text-[#686F76] hover:text-[#121416]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-dark px-5 py-2 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-[rgba(18,20,22,0.08)] rounded-sm overflow-hidden flex flex-col justify-between group shadow-2xs"
          >
            <div>
              <div className="aspect-[16/10] relative bg-[#F2F2EF] overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-black/80 font-display text-[9px] text-white px-2 py-0.5 rounded-xs font-bold">
                  {project.capacityTag}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] text-[#686F76]">
                  <MapPin className="w-3 h-3 text-[#C46A38] shrink-0" />
                  <span>{project.location}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-[#121416] line-clamp-1">
                  {project.title}
                </h4>
                <p className="text-xs text-[#686F76] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#FAFBF5] border-t border-[rgba(18,20,22,0.06)] flex items-center justify-between text-xs">
              <span className="text-[#8E959D] uppercase text-[10px] capitalize">{project.category}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(project)}
                  className="p-1 rounded text-[#686F76] hover:text-[#121416]"
                  title="Edit Record"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-1 rounded text-red-500 hover:text-red-700"
                  title="Delete Record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
