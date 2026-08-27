import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Image as ImageIcon, ArrowLeft,
  Menu, X, FolderKanban, MessageSquare, BarChart3, Settings, LogOut
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { EnquiryManager } from './EnquiryManager';
import { GalleryManager } from './GalleryManager';
import type { SolarEnquiry, GalleryProject } from '../../types';
import { BUSINESS_INFO } from '../../data/mockData';

interface AdminLayoutProps {
  enquiries: SolarEnquiry[];
  galleryProjects: GalleryProject[];
  onUpdateEnquiries: (updated: SolarEnquiry[]) => void;
  onUpdateGallery: (updated: GalleryProject[]) => void;
  onCloseAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  enquiries,
  galleryProjects,
  onUpdateEnquiries,
  onUpdateGallery,
  onCloseAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'gallery'>('overview');
  const [statusFilterPreset, setStatusFilterPreset] = useState<string>('all');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const handleFilterStatusFromOverview = (status: string) => {
    setStatusFilterPreset(status);
    setActiveTab('enquiries');
  };

  return (
    <div className="min-h-screen bg-[#FAFBF5] text-[#121416] flex flex-col md:flex-row font-body">
      
      {/* Mobile Top App Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[rgba(18,20,22,0.08)] sticky top-0 z-40">
        <div className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-xs uppercase tracking-wider text-[#121416]">
            RADHE
          </span>
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-[#121416]">
            ELECTRICAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCloseAdmin}
            className="px-2.5 py-1 rounded-sm bg-[#F2F2EF] text-xs font-display font-bold text-[#121416] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Site</span>
          </button>
          
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-1.5 rounded text-[#121416]"
            aria-label="Toggle admin navigation"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation matching Reference Image */}
      <aside
        className={`w-full md:w-64 bg-white border-r border-[rgba(18,20,22,0.08)] flex flex-col justify-between p-5 md:min-h-screen shrink-0 ${
          isMobileNavOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div className="space-y-6">
          
          {/* Logo & Toggle from Reference */}
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(18,20,22,0.06)]">
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-sm uppercase tracking-wider text-[#121416]">
                RADHE
              </span>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-[#121416]">
                ELECTRICAL
              </span>
            </div>
            <Menu className="w-4 h-4 text-[#8E959D] hidden md:block" />
          </div>

          {/* Navigation Menu from Reference Image */}
          <nav className="space-y-1 text-xs font-display font-semibold" aria-label="Operations Navigation">
            
            {/* Overview */}
            <button
              onClick={() => {
                setActiveTab('overview');
                setIsMobileNavOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-colors text-left ${
                activeTab === 'overview'
                  ? 'bg-[#F2F2EF] text-[#121416] font-bold'
                  : 'text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#121416]" />
              <span>Overview</span>
            </button>

            {/* Enquiries */}
            <button
              onClick={() => {
                setStatusFilterPreset('all');
                setActiveTab('enquiries');
                setIsMobileNavOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-sm transition-colors text-left ${
                activeTab === 'enquiries'
                  ? 'bg-[#F2F2EF] text-[#121416] font-bold'
                  : 'text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#121416]" />
                <span>Enquiries</span>
              </div>
              {newEnquiriesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-xs text-[10px] font-bold bg-[#121416] text-white">
                  {newEnquiriesCount}
                </span>
              )}
            </button>

            {/* Projects */}
            <button
              onClick={() => {
                setActiveTab('gallery');
                setIsMobileNavOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-colors text-left ${
                activeTab === 'gallery'
                  ? 'bg-[#F2F2EF] text-[#121416] font-bold'
                  : 'text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416]'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-[#121416]" />
              <span>Projects</span>
            </button>

            {/* Gallery */}
            <button
              onClick={() => {
                setActiveTab('gallery');
                setIsMobileNavOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416] transition-colors text-left"
            >
              <ImageIcon className="w-4 h-4 text-[#121416]" />
              <span>Gallery</span>
            </button>

            {/* Customers */}
            <button
              onClick={() => {
                setStatusFilterPreset('all');
                setActiveTab('enquiries');
                setIsMobileNavOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416] transition-colors text-left"
            >
              <Users className="w-4 h-4 text-[#121416]" />
              <span>Customers</span>
            </button>

            {/* Messages */}
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416] transition-colors text-left"
            >
              <MessageSquare className="w-4 h-4 text-[#121416]" />
              <span>Messages</span>
            </a>

            {/* Reports */}
            <button
              onClick={() => {
                setActiveTab('overview');
                setIsMobileNavOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416] transition-colors text-left"
            >
              <BarChart3 className="w-4 h-4 text-[#121416]" />
              <span>Reports</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => {
                setActiveTab('overview');
                setIsMobileNavOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-[#686F76] hover:bg-[#FAFBF5] hover:text-[#121416] transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-[#121416]" />
              <span>Settings</span>
            </button>

          </nav>

        </div>

        {/* Bottom Logout / Return trigger */}
        <div className="pt-4 border-t border-[rgba(18,20,22,0.06)] space-y-2">
          <button
            onClick={onCloseAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-display font-semibold text-[#686F76] hover:text-[#121416] transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#8E959D]" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
        
        {activeTab === 'overview' && (
          <AdminOverview
            enquiries={enquiries}
            galleryProjects={galleryProjects}
            onNavigateToEnquiries={handleFilterStatusFromOverview}
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
