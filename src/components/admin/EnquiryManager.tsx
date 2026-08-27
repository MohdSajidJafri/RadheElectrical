import React, { useState } from 'react';
import {
  Search, Download, Phone, MessageSquare, Trash2, Eye, X,
  Save, RotateCcw, CheckCircle, User, Zap
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
        return 'bg-[#F2F2EF] text-[#121416] border border-[rgba(18,20,22,0.12)] font-bold';
      case 'Contacted':
        return 'bg-[#EBF5FB] text-[#2980B9] border border-[#AED6F1]';
      case 'In Progress':
      case 'Quoted':
        return 'bg-[#121416] text-white';
      case 'Converted':
        return 'bg-[#F9EBEA] text-[#C46A38] border border-[#F5CBA7] font-bold';
      default:
        return 'bg-[#F2F2EF] text-[#686F76]';
    }
  };

  const generateWhatsAppLink = (enquiry: SolarEnquiry) => {
    const text = encodeURIComponent(
      `Hello ${enquiry.name},\nThis is RADHE ELECTRICAL (Agra Road, Dausa).\n\nRegarding your enquiry for a ${enquiry.capacity} Solar System:\nWhen would be a convenient time for an on-site rooftop survey?\n\nPhone: 9982861558`
    );
    return `https://wa.me/91${enquiry.mobile}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Search, Filter & Action Toolbar */}
      <div className="bg-white border border-[rgba(18,20,22,0.08)] p-5 rounded-sm space-y-4 shadow-2xs">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8E959D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name, phone, city, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.12)] rounded-sm pl-9 pr-3 py-2 text-xs text-[#121416] placeholder-[#8E959D] focus:outline-none focus:border-[#121416]"
            />
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => enquiryService.exportToCsv(filteredEnquiries)}
              className="px-3 py-2 rounded-sm border border-[rgba(18,20,22,0.12)] hover:border-[rgba(18,20,22,0.3)] bg-white text-xs font-display font-bold text-[#121416] flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Export filtered leads as CSV file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 rounded-sm border border-[rgba(18,20,22,0.12)] hover:border-[rgba(18,20,22,0.3)] bg-white text-xs font-display text-[#686F76] hover:text-[#121416] flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Reset to initial sample leads"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Samples</span>
            </button>
          </div>

        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[rgba(18,20,22,0.06)] text-xs font-display font-medium">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#8E959D] uppercase text-[10px] mr-1 font-bold">Status:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-sm transition-all border ${
                statusFilter === 'all'
                  ? 'bg-[#121416] text-white border-[#121416] font-bold'
                  : 'bg-[#FAFBF5] text-[#686F76] border-[rgba(18,20,22,0.1)] hover:text-[#121416]'
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
                      ? 'bg-[#121416] text-white border-[#121416] font-bold'
                      : 'bg-[#FAFBF5] text-[#686F76] border-[rgba(18,20,22,0.1)] hover:text-[#121416]'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>

          {/* Capacity Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#8E959D] uppercase text-[10px] font-bold">Capacity:</span>
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="bg-[#FAFBF5] border border-[rgba(18,20,22,0.12)] rounded-sm px-2 py-1 text-xs text-[#121416] focus:outline-none focus:border-[#121416]"
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
      <div className="bg-white border border-[rgba(18,20,22,0.08)] rounded-sm overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAFBF5] border-b border-[rgba(18,20,22,0.08)] text-[#8E959D] uppercase tracking-wider text-[10px] font-display font-bold">
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">PHONE</th>
                <th className="py-3 px-4">CAPACITY</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(18,20,22,0.05)]">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8E959D]">
                    No leads found matching current search or filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="hover:bg-[#FAFBF5] transition-colors group cursor-pointer"
                    onClick={() => handleOpenDrawer(enquiry)}
                  >
                    <td className="py-3.5 px-4 font-display font-bold text-[#121416]">
                      {enquiry.name}
                    </td>

                    <td className="py-3.5 px-4 text-[#686F76]" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <span>{enquiry.mobile}</span>
                        <a
                          href={generateWhatsAppLink(enquiry)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded hover:bg-[#F2F2EF] text-[#686F76] transition-colors"
                          title="Open WhatsApp chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#C46A38]" />
                        </a>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-display font-bold text-[#121416]">
                      {enquiry.capacity}
                    </td>

                    <td className="py-3.5 px-4 text-[#686F76]">
                      {enquiry.city}
                    </td>

                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value as EnquiryStatus)}
                        className={`px-2 py-0.5 rounded-xs text-[10px] font-display font-bold cursor-pointer ${getStatusBadgeStyle(enquiry.status)}`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st} className="bg-white text-[#121416]">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-[#8E959D] text-[11px]">
                      {enquiry.createdAt.split('T')[0]}
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDrawer(enquiry)}
                          className="p-1 rounded hover:bg-[#F2F2EF] text-[#686F76] transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry.id, enquiry.name)}
                          className="p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
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
            className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
            onClick={handleCloseDrawer}
          />

          <div className="relative z-10 w-full max-w-lg bg-white border-l border-[rgba(18,20,22,0.1)] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between shadow-2xl">
            
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(18,20,22,0.08)]">
                <div>
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#C46A38] block font-bold">
                    Lead Ref #{selectedEnquiry.id}
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-[#121416]">
                    {selectedEnquiry.name}
                  </h2>
                </div>

                <button
                  onClick={handleCloseDrawer}
                  className="p-1.5 rounded text-[#8E959D] hover:text-[#121416]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-4 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-display font-bold text-[#8E959D] block">Current Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2.5 py-0.5 rounded-xs text-xs font-display font-bold ${getStatusBadgeStyle(selectedEnquiry.status)}`}>
                      {selectedEnquiry.status}
                    </span>
                    {statusChangeSuccess && (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>
                </div>

                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                  className="bg-white border border-[rgba(18,20,22,0.15)] text-[#121416] text-xs rounded-sm px-3 py-1.5 cursor-pointer font-display font-bold"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      Mark as {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Information */}
              <div className="space-y-3">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#121416] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C46A38]" />
                  <span>Customer Information</span>
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm">
                    <span className="text-[#8E959D] block mb-0.5">Phone Number</span>
                    <strong className="text-[#121416] font-display font-bold">+91 {selectedEnquiry.mobile}</strong>
                  </div>

                  <div className="p-3 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm">
                    <span className="text-[#8E959D] block mb-0.5">PIN Code</span>
                    <strong className="text-[#121416] font-display font-bold">{selectedEnquiry.pinCode}</strong>
                  </div>

                  <div className="p-3 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm col-span-2">
                    <span className="text-[#8E959D] block mb-0.5">Location</span>
                    <strong className="text-[#121416] font-display font-bold">{selectedEnquiry.city}, {selectedEnquiry.district}</strong>
                  </div>
                </div>
              </div>

              {/* System Sizing Requirement */}
              <div className="space-y-3">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#121416] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#C46A38]" />
                  <span>System Sizing</span>
                </span>

                <div className="p-3.5 bg-[#FAFBF5] border border-[rgba(18,20,22,0.08)] rounded-sm text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#8E959D]">Requested Capacity:</span>
                    <strong className="text-[#121416] font-display font-bold text-sm">{selectedEnquiry.capacity} System</strong>
                  </div>
                  {selectedEnquiry.message && (
                    <div className="pt-2 mt-2 border-t border-[rgba(18,20,22,0.06)] text-[#686F76] leading-relaxed">
                      <span className="text-[#8E959D] text-[10px] uppercase font-bold block mb-0.5">Customer Message:</span>
                      "{selectedEnquiry.message}"
                    </div>
                  )}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-[#121416]">
                    Internal Depot Notes
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs font-display font-bold text-[#C46A38] hover:underline flex items-center gap-1"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save Notes</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="Add internal notes on site visit, tariff slab, quotation..."
                  className="w-full bg-[#FAFBF5] border border-[rgba(18,20,22,0.12)] rounded-sm p-3 text-xs text-[#121416] placeholder-[#8E959D] focus:outline-none focus:border-[#121416]"
                />
              </div>

              {/* Direct Actions */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-display uppercase text-[#8E959D] font-bold block">Quick Actions</span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${selectedEnquiry.mobile}`}
                    className="btn-secondary-outline text-xs py-2.5 px-3 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#121416]" />
                    <span>Call Customer</span>
                  </a>

                  <a
                    href={generateWhatsAppLink(selectedEnquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-dark text-xs py-2.5 px-3 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Meta */}
            <div className="pt-4 border-t border-[rgba(18,20,22,0.08)] text-[11px] text-[#8E959D] flex items-center justify-between">
              <span>Logged: {selectedEnquiry.createdAt.replace('T', ' ').slice(0, 16)}</span>
              <button
                onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.name)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
