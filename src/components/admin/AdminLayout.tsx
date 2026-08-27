import { useState } from 'react';
import {
  LayoutDashboard, Users, Image as ImageIcon, ArrowLeft,
  Shield, ExternalLink, Menu, X, Clock
} from 'lucide-react';
import type { SolarEnquiry, GalleryProject } from '../../types';
import { AdminOverview } from './AdminOverview';
import { EnquiryManager } from './EnquiryManager';
import { GalleryManager } from './GalleryManager';

interface AdminLayoutProps {
  enquiries: SolarEnquiry[];
  galleryProjects: GalleryProject[];
  onUpdateEnquiries: (enquiries: SolarEnquiry[]) => void;
  onUpdateGallery: (projects: GalleryProject[]) => void;
  onCloseAdmin: () => void;
}

export const AdminLayout = ({
  enquiries,
  galleryProjects,
  onUpdateEnquiries,
  onUpdateGallery,
  onCloseAdmin
}: AdminLayoutProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'gallery'>('overview');
  const [statusFilterPreset, setStatusFilterPreset] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const handleFilterStatusFromOverview = (status: string) => {
    setStatusFilterPreset(status);
    setActiveTab('enquiries');
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-200 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top App Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0D121C] border-b border-slate-800/80 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-sm bg-amber-500 flex items-center justify-center text-amber-950 font-black text-xs">
            R
          </div>
          <span className="font-display font-black text-sm text-white uppercase tracking-tight">
            RADHE <span className="text-amber-400 font-light">OPERATIONS</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCloseAdmin}
            className="px-2.5 py-1 rounded-sm border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
          >
            Exit
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle admin navigation"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Operations Sidebar Navigation */}
      <aside
        className={`w-64 bg-[#0B0F18] border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0 fixed md:sticky top-0 h-screen z-30 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="pb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-7 h-7 rounded-sm bg-amber-500 flex items-center justify-center text-amber-950 font-black text-xs">
                R
              </div>
              <span className="font-display font-black text-base text-white tracking-tight uppercase">
                RADHE <span className="text-amber-400 font-light">OPS</span>
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Solar Operations Console
            </div>
            <div className="text-[10px] font-mono text-amber-500/80 mt-0.5">
              Dausa Depot · Agra Road
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block px-2 mb-2">
              Workspace Views
            </span>

            <button
              onClick={() => {
                setActiveTab('overview');
                setSidebarOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-sm text-xs font-mono font-semibold transition-all flex items-center gap-2.5 border ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-amber-950 font-bold border-amber-400 shadow-sm'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>01 / Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('enquiries');
                setStatusFilterPreset('all');
                setSidebarOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-sm text-xs font-mono font-semibold transition-all flex items-center justify-between border ${
                activeTab === 'enquiries'
                  ? 'bg-amber-500 text-amber-950 font-bold border-amber-400 shadow-sm'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>02 / Leads & Enquiries</span>
              </div>
              {newEnquiriesCount > 0 && (
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm ${
                  activeTab === 'enquiries' ? 'bg-amber-950 text-amber-400' : 'bg-amber-500 text-amber-950'
                }`}>
                  {newEnquiriesCount} New
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('gallery');
                setSidebarOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-sm text-xs font-mono font-semibold transition-all flex items-center justify-between border ${
                activeTab === 'gallery'
                  ? 'bg-amber-500 text-amber-950 font-bold border-amber-400 shadow-sm'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>03 / Portfolio Media</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{galleryProjects.length}</span>
            </button>
          </nav>

          {/* Depot Quick Telemetry */}
          <div className="p-3 bg-[#0D121C] border border-slate-800/80 rounded-sm space-y-1.5 text-[11px] font-mono text-slate-400">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span>Status:</span>
              <span className="text-emerald-400 flex items-center gap-1">● Active Depot</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>Office: 8 AM – 8 PM</span>
            </div>
            <div className="text-slate-500 text-[10px]">
              Direct: +91 9982861558
            </div>
          </div>

        </div>

        {/* Bottom Exit */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={onCloseAdmin}
            className="w-full py-2 px-3 rounded-sm bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Return to Website</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto overflow-y-auto w-full">
        
        {/* Workspace Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>RADHE ELECTRICAL · Operations Command</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {activeTab === 'overview' && 'Lead Pipeline & Activity Overview'}
              {activeTab === 'enquiries' && 'Solar Customer Leads Management'}
              {activeTab === 'gallery' && 'Field Portfolio Media Management'}
            </h1>
          </div>

          <button
            onClick={onCloseAdmin}
            className="btn-primary text-xs py-2 px-4 self-start sm:self-auto flex items-center gap-1.5 font-mono"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
        </div>

        {/* Tab Router */}
        {activeTab === 'overview' && (
          <AdminOverview
            enquiries={enquiries}
            onSelectTab={setActiveTab}
            onFilterStatus={handleFilterStatusFromOverview}
          />
        )}

        {activeTab === 'enquiries' && (
          <EnquiryManager
            enquiries={enquiries}
            onUpdateEnquiries={onUpdateEnquiries}
            initialStatusFilter={statusFilterPreset}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryManager
            projects={galleryProjects}
            onUpdateProjects={onUpdateGallery}
          />
        )}

      </main>

    </div>
  );
};
