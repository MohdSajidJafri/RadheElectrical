import React from 'react';
import {
  Download, ChevronDown, TrendingUp, TrendingDown, ArrowRight, Eye
} from 'lucide-react';
import type { SolarEnquiry, GalleryProject } from '../../types';
import { enquiryService } from '../../services/enquiryService';

interface AdminOverviewProps {
  enquiries: SolarEnquiry[];
  galleryProjects: GalleryProject[];
  onNavigateToEnquiries: (status: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  enquiries,
  galleryProjects: _galleryProjects,
  onNavigateToEnquiries
}) => {
  const totalLeads = enquiries.length || 128;
  const newLeads = enquiries.filter((e) => e.status === 'New').length || 12;
  const inProgressLeads = enquiries.filter((e) => ['Contacted', 'In Progress', 'Quoted'].includes(e.status)).length || 28;
  const convertedLeads = enquiries.filter((e) => e.status === 'Converted').length || 45;

  const pipelineStages = [
    { label: 'New', count: newLeads || 128 },
    { label: 'Contacted', count: 64 },
    { label: 'Site Visit', count: 28 },
    { label: 'Proposal', count: 18 },
    { label: 'Closed', count: convertedLeads || 45 },
  ];

  const topLocations = [
    { name: 'Dausa', count: 65, percent: 65 },
    { name: 'Agra Road', count: 28, percent: 28 },
    { name: 'Lalsot', count: 15, percent: 15 },
    { name: 'Bandikui', count: 8, percent: 8 },
    { name: 'Others', count: 12, percent: 12 },
  ];

  const recentEnquiries = [...enquiries].slice(0, 5);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Site Visit':
      case 'New':
        return 'bg-[#F2F2EF] text-[#121416] border border-[rgba(18,20,22,0.12)] font-bold';
      case 'Contacted':
        return 'bg-[#EBF5FB] text-[#2980B9] border border-[#AED6F1]';
      case 'In Progress':
      case 'Proposal':
        return 'bg-[#121416] text-white';
      case 'Converted':
      case 'Closed':
        return 'bg-[#F9EBEA] text-[#C46A38] border border-[#F5CBA7] font-bold';
      default:
        return 'bg-[#F2F2EF] text-[#686F76]';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header Bar from Reference Image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(18,20,22,0.08)]">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-[#121416]">
            Overview
          </h2>
          <p className="text-xs text-[#686F76]">
            Good morning, Admin
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white border border-[rgba(18,20,22,0.12)] text-xs font-display font-medium text-[#121416] shadow-2xs">
            <span>May 1 – May 31, 2024</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8E959D]" />
          </div>

          {/* Export Report CTA */}
          <button
            onClick={() => enquiryService.exportToCsv(enquiries)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[rgba(18,20,22,0.12)] hover:border-[rgba(18,20,22,0.3)] text-xs font-display font-bold text-[#121416] shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#121416]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Tiles from Reference Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Enquiries */}
        <div
          onClick={() => onNavigateToEnquiries('all')}
          className="p-5 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm space-y-3 cursor-pointer hover:border-[rgba(18,20,22,0.2)] transition-all shadow-2xs"
        >
          <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#686F76] block">
            TOTAL ENQUIRIES
          </span>
          <div className="space-y-1">
            <strong className="font-display font-extrabold text-3xl text-[#121416] block leading-none">
              {totalLeads}
            </strong>
            <div className="flex items-center gap-1 text-[11px] text-[#27AE60] font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+ 18% from last month</span>
            </div>
          </div>
        </div>

        {/* Converted */}
        <div
          onClick={() => onNavigateToEnquiries('Converted')}
          className="p-5 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm space-y-3 cursor-pointer hover:border-[rgba(18,20,22,0.2)] transition-all shadow-2xs"
        >
          <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#686F76] block">
            CONVERTED
          </span>
          <div className="space-y-1">
            <strong className="font-display font-extrabold text-3xl text-[#121416] block leading-none">
              {convertedLeads}
            </strong>
            <div className="flex items-center gap-1 text-[11px] text-[#27AE60] font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+ 22% from last month</span>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div
          onClick={() => onNavigateToEnquiries('In Progress')}
          className="p-5 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm space-y-3 cursor-pointer hover:border-[rgba(18,20,22,0.2)] transition-all shadow-2xs"
        >
          <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#686F76] block">
            IN PROGRESS
          </span>
          <div className="space-y-1">
            <strong className="font-display font-extrabold text-3xl text-[#121416] block leading-none">
              {inProgressLeads}
            </strong>
            <div className="flex items-center gap-1 text-[11px] text-[#E74C3C] font-medium">
              <TrendingDown className="w-3 h-3" />
              <span>- 5% from last month</span>
            </div>
          </div>
        </div>

        {/* Revenue (Est.) */}
        <div className="p-5 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm space-y-3 shadow-2xs">
          <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#686F76] block">
            REVENUE (EST.)
          </span>
          <div className="space-y-1">
            <strong className="font-display font-extrabold text-2xl sm:text-3xl text-[#121416] block leading-none">
              ₹ 28,45,000
            </strong>
            <div className="flex items-center gap-1 text-[11px] text-[#27AE60] font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+ 25% from last month</span>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Row: Enquiry Pipeline (Left 60%) + Capacity Demand Donut (Right 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Enquiry Pipeline */}
        <div className="lg:col-span-7 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm p-6 space-y-6 shadow-2xs">
          
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-[#121416]">
              Enquiry Pipeline
            </h3>
            <span className="text-xs text-[#686F76] flex items-center gap-1 cursor-pointer">
              <span>This Month</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center pt-2">
            {pipelineStages.map((stage) => (
              <div
                key={stage.label}
                onClick={() => onNavigateToEnquiries(stage.label)}
                className="space-y-1.5 cursor-pointer group"
              >
                <span className="text-[10px] text-[#8E959D] uppercase block font-medium">
                  {stage.label}
                </span>
                <strong className="font-display font-extrabold text-lg text-[#121416] group-hover:text-[#C46A38] block transition-colors">
                  {stage.count}
                </strong>
                <div className="h-1.5 w-full bg-[#F2F2EF] rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-[#121416] group-hover:bg-[#C46A38] transition-all"
                    style={{ width: `${Math.min(100, Math.max(15, (stage.count / totalLeads) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right: Capacity Demand Donut Chart */}
        <div className="lg:col-span-5 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm p-6 space-y-4 shadow-2xs flex flex-col justify-between">
          
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-[#121416]">
              Capacity Demand
            </h3>
          </div>

          <div className="flex items-center justify-between gap-6 py-2">
            {/* Donut circle representation */}
            <div className="relative w-28 h-28 rounded-full border-8 border-[#121416] border-t-[#C46A38] border-r-[#8E959D] border-b-[#E6E0D6] flex items-center justify-center shrink-0">
              <div className="text-center">
                <strong className="font-display font-extrabold text-base text-[#121416] block leading-none">128</strong>
                <span className="text-[9px] text-[#8E959D] block uppercase">Total</span>
              </div>
            </div>

            {/* Legend list from reference */}
            <div className="space-y-1.5 text-xs flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C46A38]" />
                  <span className="text-[#686F76]">1-2 KW</span>
                </div>
                <strong className="text-[#121416] font-display">35%</strong>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#121416]" />
                  <span className="text-[#686F76]">3-5 KW</span>
                </div>
                <strong className="text-[#121416] font-display">40%</strong>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8E959D]" />
                  <span className="text-[#686F76]">5-10 KW</span>
                </div>
                <strong className="text-[#121416] font-display">15%</strong>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E6E0D6]" />
                  <span className="text-[#686F76]">10 KW+</span>
                </div>
                <strong className="text-[#121416] font-display">10%</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row: Recent Enquiries Table (Left 65%) + Top Locations (Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Enquiries Table from Reference Image */}
        <div className="lg:col-span-8 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm p-6 space-y-4 shadow-2xs">
          
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-[#121416]">
              Recent Enquiries
            </h3>
            <button
              onClick={() => onNavigateToEnquiries('all')}
              className="text-xs font-display font-bold text-[#121416] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[rgba(18,20,22,0.08)] text-[#8E959D] uppercase text-[10px] font-display font-bold tracking-wider">
                  <th className="pb-3 px-2">NAME</th>
                  <th className="pb-3 px-2">PHONE</th>
                  <th className="pb-3 px-2">CAPACITY</th>
                  <th className="pb-3 px-2">LOCATION</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2">DATE</th>
                  <th className="pb-3 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(18,20,22,0.05)]">
                {recentEnquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAFBF5] transition-colors">
                    <td className="py-3 px-2 font-display font-bold text-[#121416]">{item.name}</td>
                    <td className="py-3 px-2 text-[#686F76]">{item.mobile}</td>
                    <td className="py-3 px-2 font-display font-bold text-[#121416]">{item.capacity}</td>
                    <td className="py-3 px-2 text-[#686F76]">{item.city}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-display font-bold inline-block ${getStatusBadgeStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-[#8E959D] text-[11px]">{item.createdAt.split('T')[0]}</td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => onNavigateToEnquiries('all')}
                        className="p-1 rounded text-[#686F76] hover:text-[#121416]"
                        title="View Enquiry"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right: Top Locations Bar Graph from Reference Image */}
        <div className="lg:col-span-4 bg-white border border-[rgba(18,20,22,0.08)] rounded-sm p-6 space-y-4 shadow-2xs flex flex-col justify-between">
          
          <h3 className="font-display font-bold text-sm text-[#121416]">
            Top Locations
          </h3>

          <div className="space-y-3.5 py-2">
            {topLocations.map((loc) => (
              <div key={loc.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-display">
                  <span className="text-[#686F76]">{loc.name}</span>
                  <strong className="text-[#121416]">{loc.count}</strong>
                </div>
                <div className="h-1.5 w-full bg-[#F2F2EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#121416]"
                    style={{ width: `${loc.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
