import type { GalleryProject } from '../types';
import { INITIAL_GALLERY_PROJECTS } from '../data/mockData';

const GALLERY_STORAGE_KEY = 'radhe_electrical_gallery_v1';

export const galleryService = {
  getProjects: (): GalleryProject[] => {
    try {
      const data = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_PROJECTS));
        return INITIAL_GALLERY_PROJECTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading gallery:', e);
      return INITIAL_GALLERY_PROJECTS;
    }
  },

  addProject: (projectData: Omit<GalleryProject, 'id'>): GalleryProject[] => {
    const projects = galleryService.getProjects();
    const newProject: GalleryProject = {
      ...projectData,
      id: `gal-${Date.now()}`
    };
    const updated = [newProject, ...projects];
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  updateProject: (project: GalleryProject): GalleryProject[] => {
    const projects = galleryService.getProjects();
    const updated = projects.map(p => p.id === project.id ? project : p);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteProject: (id: string): GalleryProject[] => {
    const projects = galleryService.getProjects();
    const updated = projects.filter(p => p.id !== id);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  resetDefaults: (): GalleryProject[] => {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_PROJECTS));
    return INITIAL_GALLERY_PROJECTS;
  }
};
