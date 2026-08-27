import React, { useState, useRef } from 'react';
import { Plus, Trash2, Edit3, MapPin, X, RotateCcw, Upload } from 'lucide-react';
import type { GalleryProject } from '../../types';
import { galleryService } from '../../services/galleryService';

interface GalleryManagerProps {
  projects: GalleryProject[];
  onUpdateProjects: (updated: GalleryProject[]) => void;
}

const STOCK_OPTIONS = [
  { label: 'Rooftop Array', path: '/images/hero-solar.jpg' },
  { label: 'Commercial Array', path: '/images/commercial-solar.jpg' },
  { label: 'Inverter System', path: '/images/inverter-system.jpg' },
  { label: 'Residential Villa', path: '/images/residential-villa.jpg' },
  { label: 'Mounting Structure', path: '/images/structure-detail.jpg' },
  { label: 'Technician Check', path: '/images/technician-maintenance.jpg' },
  { label: 'Pergola Terrace', path: '/images/after-terrace.jpg' },
];

export const GalleryManager: React.FC<GalleryManagerProps> = ({
  projects,
  onUpdateProjects
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingProject, setEditingProject] = useState<GalleryProject | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const beforeFileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'residential' as 'residential' | 'commercial' | 'rooftop' | 'inverter' | 'before_after',
    location: 'Agra Road, Dausa',
    capacityTag: '3 KW Rooftop Array',
    imageUrl: '/images/hero-solar.jpg',
    imageFileName: '',
    beforeImageUrl: '',
    beforeImageFileName: '',
    description: '',
    isBeforeAfter: false
  });

  const handleFileUpload = (file: File, isBefore: boolean = false) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (isBefore) {
        setFormData((prev) => ({
          ...prev,
          beforeImageUrl: dataUrl,
          beforeImageFileName: file.name
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          imageUrl: dataUrl,
          imageFileName: file.name
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    if (!formData.imageUrl.trim()) {
      alert('Please upload or select an installation image.');
      return;
    }

    const updated = galleryService.addProject({
      title: formData.title.trim(),
      category: formData.isBeforeAfter ? 'before_after' : formData.category,
      location: formData.location.trim() || 'Dausa, Rajasthan',
      capacityTag: formData.capacityTag.trim() || 'Solar System',
      imageUrl: formData.imageUrl.trim(),
      beforeImageUrl: formData.isBeforeAfter ? formData.beforeImageUrl.trim() : undefined,
      description: formData.description.trim() || 'Completed solar installation in Dausa.',
      isBeforeAfter: formData.isBeforeAfter
    });

    onUpdateProjects(updated);
    setIsAddingNew(false);
    setFormData({
      title: '',
      category: 'residential',
      location: 'Agra Road, Dausa',
      capacityTag: '3 KW Rooftop Array',
      imageUrl: '/images/hero-solar.jpg',
      imageFileName: '',
      beforeImageUrl: '',
      beforeImageFileName: '',
      description: '',
      isBeforeAfter: false
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const updated = galleryService.updateProject({
      ...editingProject,
      title: editingProject.title.trim(),
      category: editingProject.category,
      location: editingProject.location.trim(),
      capacityTag: editingProject.capacityTag.trim(),
      imageUrl: editingProject.imageUrl.trim(),
      description: editingProject.description.trim(),
      beforeImageUrl: editingProject.beforeImageUrl,
      isBeforeAfter: editingProject.isBeforeAfter
    });

    onUpdateProjects(updated);
    setEditingProject(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete project "${title}" from portfolio?`)) {
      const updated = galleryService.deleteProject(id);
      onUpdateProjects(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset portfolio to sample project records?')) {
      const updated = galleryService.resetDefaults();
      onUpdateProjects(updated);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#0D121C] border border-slate-800/80 rounded-sm">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-tight">
            Portfolio Showcase Media
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Manage project case studies and rooftop photography ({projects.length} Active Records)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddingNew(true)}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project Record</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-sm border border-slate-800 hover:border-slate-700 bg-slate-900 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Samples</span>
          </button>
        </div>
      </div>

      {/* Add New Project Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsAddingNew(false)}
          />

          <div className="relative z-10 max-w-2xl w-full bg-[#0B0F18] border border-slate-800 rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-white uppercase font-display">
                Add New Project Case Study
              </h3>
              <button
                onClick={() => setIsAddingNew(false)}
                className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 KW Villa Rooftop Pergola"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="residential">Residential Rooftops</option>
                    <option value="commercial">Commercial Systems</option>
                    <option value="rooftop">Elevated Pergolas</option>
                    <option value="inverter">Inverters & Hardware</option>
                    <option value="before_after">Before & After Case Study</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Scale / Capacity Tag *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 KW Elevated System"
                    value={formData.capacityTag}
                    onChange={(e) => setFormData({ ...formData, capacityTag: e.target.value })}
                    className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Location (Dausa Area) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Giriraj Dharan Temple, Agra Road"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              {/* Image Upload / Stock Selector */}
              <div className="space-y-3 pt-2">
                <label className="block text-slate-300 font-bold uppercase">
                  Installation Photograph *
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], false);
                      }
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Local File</span>
                  </button>

                  <span className="text-slate-500 text-[11px]">
                    {formData.imageFileName ? `Selected: ${formData.imageFileName}` : 'or choose from site library'}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-2">
                  {STOCK_OPTIONS.map((opt) => (
                    <button
                      key={opt.path}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: opt.path, imageFileName: '' })}
                      className={`aspect-[4/3] rounded-sm overflow-hidden border transition-all ${
                        formData.imageUrl === opt.path
                          ? 'border-amber-500 ring-2 ring-amber-500/50'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={opt.path} alt={opt.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Before/After Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBeforeAfter}
                    onChange={(e) => setFormData({ ...formData, isBeforeAfter: e.target.checked })}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span>Include "Before Installation" Terrace Photo</span>
                </label>

                {formData.isBeforeAfter && (
                  <div className="mt-3 p-3 bg-[#080B11] border border-slate-800 rounded-sm space-y-2">
                    <span className="text-[11px] text-slate-400 block">Upload Before Photo:</span>
                    <input
                      type="file"
                      ref={beforeFileInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], true);
                        }
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => beforeFileInputRef.current?.click()}
                      className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{formData.beforeImageFileName || 'Upload Before Image'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe mounting structure, panels, or client results..."
                  className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-6"
                >
                  Save Project Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setEditingProject(null)}
          />

          <div className="relative z-10 max-w-2xl w-full bg-[#0B0F18] border border-slate-800 rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-white uppercase font-display">
                Edit Project Record
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Scale / Capacity Tag *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.capacityTag}
                    onChange={(e) => setEditingProject({ ...editingProject, capacityTag: e.target.value })}
                    className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Location Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-6"
                >
                  Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Portfolio Media Grid (Photography-Led Records) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0D121C] border border-slate-800/80 rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="aspect-[16/10] relative bg-[#080B11] overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border border-slate-700">
                  {project.capacityTag}
                </span>
                {project.isBeforeAfter && (
                  <span className="absolute top-3 right-3 bg-emerald-500 text-emerald-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm">
                    Before/After
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1 text-[11px] font-mono text-amber-500/90">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{project.location}</span>
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-tight line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 font-light">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#090C13] border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] text-slate-500 uppercase">{project.category}</span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Edit Record"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-1.5 rounded bg-slate-900 hover:bg-red-950/80 text-red-400 hover:text-red-300 transition-colors"
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
