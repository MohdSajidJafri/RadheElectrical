import type { SolarEnquiry, EnquiryStatus } from '../types';
import { INITIAL_ENQUIRIES } from '../data/mockData';

const ENQUIRIES_STORAGE_KEY = 'radhe_electrical_enquiries_v1';

export const enquiryService = {
  getEnquiries: (): SolarEnquiry[] => {
    try {
      const data = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_ENQUIRIES));
        return INITIAL_ENQUIRIES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading enquiries:', e);
      return INITIAL_ENQUIRIES;
    }
  },

  createEnquiry: (enquiryData: Omit<SolarEnquiry, 'id' | 'createdAt' | 'status'>): SolarEnquiry => {
    const enquiries = enquiryService.getEnquiries();
    const newEnquiry: SolarEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    const updated = [newEnquiry, ...enquiries];
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return newEnquiry;
  },

  updateStatus: (id: string, status: EnquiryStatus): SolarEnquiry[] => {
    const enquiries = enquiryService.getEnquiries();
    const updated = enquiries.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  updateNotes: (id: string, adminNotes: string): SolarEnquiry[] => {
    const enquiries = enquiryService.getEnquiries();
    const updated = enquiries.map(item => item.id === id ? { ...item, adminNotes } : item);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteEnquiry: (id: string): SolarEnquiry[] => {
    const enquiries = enquiryService.getEnquiries();
    const updated = enquiries.filter(item => item.id !== id);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  exportToCsv: (enquiries: SolarEnquiry[]): void => {
    const headers = ['ID', 'Name', 'Mobile', 'District', 'City', 'Pin Code', 'Capacity', 'Status', 'Date', 'Message', 'Notes'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.name.replace(/"/g, '""')}"`,
      e.mobile,
      `"${e.district}"`,
      `"${e.city}"`,
      e.pinCode,
      `"${e.capacity}"`,
      e.status,
      new Date(e.createdAt).toLocaleDateString(),
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `radhe_electrical_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  resetDefaults: (): SolarEnquiry[] => {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_ENQUIRIES));
    return INITIAL_ENQUIRIES;
  }
};
