import React, { useState } from 'react';
import {
  Search, Download, Phone, MessageSquare, Trash2, Eye, X,
  Save, RotateCcw, CheckCircle, MapPin, Zap, User
} from 'lucide-react';
import type { SolarEnquiry, EnquiryStatus } from '../../types';
import { enquiryService } from '../../services/enquiryService';

interface EnquiryManagerProps {
  enquiries: SolarEnquiry[];
  onUpdateEnquiries: (updated: SolarEnquiry[]) => void;
  initialStatusFilter?: string;
}

export const EnquiryManager: React.FC<EnquiryManagerProps> = ({
  enquiries,
  onUpdateEnquiries,
  initialStatusFilter = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<SolarEnquiry | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [statusChangeSuccess, setStatusChangeSuccess] = useState(false);

  const statuses: EnquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Quoted', 'Converted', 'Closed'];

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.includes(searchQuery) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.adminNotes && item.adminNotes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCapacity = capacityFilter === 'all' || item.capacity === capacityFilter;

    return matchesSearch && matchesStatus && matchesCapacity;
  });

  const handleOpenDrawer = (enquiry: SolarEnquiry) => {
    setSelectedEnquiry(enquiry);
    setAdminNotesInput(enquiry.adminNotes || '');
    setStatusChangeSuccess(false);
  };

  const handleCloseDrawer = () => {
    setSelectedEnquiry(null);
  };

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    const updated = enquiryService.updateStatus(id, newStatus);
    onUpdateEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      setStatusChangeSuccess(true);
      setTimeout(() => setStatusChangeSuccess(false), 2000);
    }
  };

  const handleSaveNotes = () => {
    if (!selectedEnquiry) return;
    const updated = enquiryService.updateNotes(selectedEnquiry.id, adminNotesInput);
    onUpdateEnquiries(updated);
    setSelectedEnquiry({ ...selectedEnquiry, adminNotes: adminNotesInput });
    setStatusChangeSuccess(true);
    setTimeout(() => setStatusChangeSuccess(false), 2000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete enquiry from ${name}?`)) {
      const updated = enquiryService.deleteEnquiry(id);
      onUpdateEnquiries(updated);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset lead list to sample data?')) {
      const updated = enquiryService.resetDefaults();
      onUpdateEnquiries(updated);
    }
  };

  const getStatusBadgeStyle = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500 text-amber-950 border-amber-400 font-bold';
      case 'Contacted':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'In Progress':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Quoted':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Converted':
        return 'bg-emerald-500 text-emerald-950 border-emerald-400 font-bold';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const generateWhatsAppLink = (enquiry: SolarEnquiry) => {
    const text = encodeURIComponent(
      `Hello ${enquiry.name},\nThis is RADHE ELECTRICAL (Near Giriraj Dharan Temple, Agra Road, Dausa).\n\nRegarding your enquiry for a ${enquiry.capacity} Solar System:\nWhen would be a convenient time for an on-site rooftop survey?\n\nPhone: 9982861558`
    );
    return `https://wa.me/91${enquiry.mobile}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Search, Filter & Action Toolbar */}
      <div className="bg-[#0D121C] border border-slate-800/80 p-5 rounded-sm space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name, phone, city, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080B11] border border-slate-800 rounded-sm pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => enquiryService.exportToCsv(filteredEnquiries)}
              className="px-3 py-2 rounded-sm border border-slate-800 hover:border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Export filtered leads as CSV file"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 rounded-sm border border-slate-800 hover:border-slate-700 bg-slate-900 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Reset to initial sample leads"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Samples</span>
            </button>
          </div>

        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 uppercase text-[10px] mr-1">Status:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-sm transition-all border ${
                statusFilter === 'all'
                  ? 'bg-amber-500 text-amber-950 border-amber-400 font-bold'
                  : 'bg-transparent text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              All ({enquiries.length})
            </button>
            {statuses.map((st) => {
              const count = enquiries.filter((e) => e.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-sm transition-all border ${
                    statusFilter === st
                      ? 'bg-amber-500 text-amber-950 border-amber-400 font-bold'
                      : 'bg-transparent text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>

          {/* Capacity Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase text-[10px]">Capacity:</span>
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="bg-[#080B11] border border-slate-800 rounded-sm px-2 py-1 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Capacities</option>
              <option value="1 KW">1 KW</option>
              <option value="2 KW">2 KW</option>
              <option value="3 KW">3 KW</option>
              <option value="5 KW">5 KW</option>
              <option value="10 KW+">10 KW+</option>
              <option value="Not sure">Not sure</option>
            </select>
          </div>

        </div>

      </div>

      {/* Leads Operations Table */}
      <div className="bg-[#0D121C] border border-slate-800/80 rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#090C13] border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Phone / Contact</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Capacity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No leads found matching current search or filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="hover:bg-slate-900/70 transition-colors group cursor-pointer"
                    onClick={() => handleOpenDrawer(enquiry)}
                  >
                    <td className="py-3.5 px-4 text-amber-500/80 font-bold">
                      {enquiry.id}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white font-sans text-sm">
                      {enquiry.name}
                    </td>

                    <td className="py-3.5 px-4 text-slate-300" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <span>+91 {enquiry.mobile}</span>
                        <a
                          href={generateWhatsAppLink(enquiry)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                          title="Open WhatsApp chat"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </a>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>{enquiry.city}, {enquiry.district}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-amber-400">
                      {enquiry.capacity}
                    </td>

                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value as EnquiryStatus)}
                        className={`px-2 py-0.5 rounded-sm border text-[11px] font-mono cursor-pointer ${getStatusBadgeStyle(enquiry.status)}`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st} className="bg-slate-950 text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {enquiry.createdAt.split('T')[0]}
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDrawer(enquiry)}
                          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry.id, enquiry.name)}
                          className="p-1.5 rounded bg-slate-900 hover:bg-red-950/80 text-red-400 hover:text-red-300 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseDrawer}
          />

          <div className="relative z-10 w-full max-w-xl bg-[#0B0F18] border-l border-slate-800 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between shadow-2xl">
            
            <div className="space-y-6">
              
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 block">
                    Lead Ref: {selectedEnquiry.id}
                  </span>
                  <h2 className="text-xl font-bold text-white uppercase font-display">
                    {selectedEnquiry.name}
                  </h2>
                </div>

                <button
                  onClick={handleCloseDrawer}
                  className="p-1.5 rounded bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-4 bg-[#080B11] border border-slate-800 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Current Pipeline Stage</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2.5 py-0.5 rounded-sm text-xs font-mono font-bold ${getStatusBadgeStyle(selectedEnquiry.status)}`}>
                      {selectedEnquiry.status}
                    </span>
                    {statusChangeSuccess && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>
                </div>

                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                  className="bg-slate-900 border border-slate-700 text-white text-xs font-mono rounded-sm px-3 py-1.5 cursor-pointer"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      Mark as {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Info Section */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  <span>Customer Information</span>
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#080B11] border border-slate-800 rounded-sm">
                    <span className="text-slate-500 block mb-0.5">Mobile Phone</span>
                    <strong className="text-white">+91 {selectedEnquiry.mobile}</strong>
                  </div>

                  <div className="p-3 bg-[#080B11] border border-slate-800 rounded-sm">
                    <span className="text-slate-500 block mb-0.5">PIN Code</span>
                    <strong className="text-white">{selectedEnquiry.pinCode}</strong>
                  </div>

                  <div className="p-3 bg-[#080B11] border border-slate-800 rounded-sm col-span-2">
                    <span className="text-slate-500 block mb-0.5">Location Area</span>
                    <strong className="text-white">{selectedEnquiry.city}, {selectedEnquiry.district}</strong>
                  </div>
                </div>
              </div>

              {/* Project Requirements */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>System Sizing Requirement</span>
                </span>

                <div className="p-3.5 bg-[#080B11] border border-slate-800 rounded-sm text-xs font-mono">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500">Requested Capacity:</span>
                    <strong className="text-amber-400 text-sm">{selectedEnquiry.capacity} System</strong>
                  </div>
                  {selectedEnquiry.message && (
                    <div className="pt-2 border-t border-slate-800 text-slate-300 leading-relaxed font-sans text-xs">
                      <span className="text-slate-500 font-mono block mb-1">Customer Notes:</span>
                      "{selectedEnquiry.message}"
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Internal Depot Notes
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save Notes</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="Record callback date, roof survey notes, quotation amount..."
                  className="w-full bg-[#080B11] border border-slate-800 rounded-sm p-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Direct Outreach Triggers */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Direct Actions</span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${selectedEnquiry.mobile}`}
                    className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-2 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Customer</span>
                  </a>

                  <a
                    href={generateWhatsAppLink(selectedEnquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2.5 px-3 flex items-center justify-center gap-2 font-mono"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Meta */}
            <div className="pt-6 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Submitted: {selectedEnquiry.createdAt.replace('T', ' ').slice(0, 16)}</span>
              <button
                onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.name)}
                className="text-red-400 hover:underline"
              >
                Delete Record
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
