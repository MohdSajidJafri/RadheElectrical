import React from 'react';
import { Users, Clock, TrendingUp, CheckCircle2, ArrowRight, Zap, MapPin } from 'lucide-react';
import type { SolarEnquiry } from '../../types';

interface AdminOverviewProps {
  enquiries: SolarEnquiry[];
  onSelectTab: (tab: 'enquiries' | 'gallery') => void;
  onFilterStatus: (status: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  enquiries,
  onSelectTab,
  onFilterStatus
}) => {
  const totalLeads = enquiries.length;
  const newLeads = enquiries.filter((e) => e.status === 'New').length;
  const contactedLeads = enquiries.filter((e) => e.status === 'Contacted').length;
  const inProgressLeads = enquiries.filter((e) => e.status === 'In Progress').length;
  const quotedLeads = enquiries.filter((e) => e.status === 'Quoted').length;
  const convertedLeads = enquiries.filter((e) => e.status === 'Converted').length;

  const capacityCounts = enquiries.reduce((acc, curr) => {
    acc[curr.capacity] = (acc[curr.capacity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentEnquiries = [...enquiries].slice(0, 5);

  return (
    <div className="space-y-10">
      
      {/* 4 Summary High-Value Metrics (Operational Top Ledger) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total */}
        <div className="p-6 bg-[#0D121C] border border-slate-800/80 rounded-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-400">Total Leads</span>
            <Users className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
            {totalLeads}
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            All Recorded Inquiries
          </div>
        </div>

        {/* New - Needs Attention */}
        <div
          onClick={() => {
            onFilterStatus('New');
            onSelectTab('enquiries');
          }}
          className="p-6 bg-[#0D121C] border border-amber-500/50 hover:border-amber-400 transition-all rounded-sm cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">New Leads</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
            {newLeads}
          </div>
          <div className="text-[11px] font-mono text-amber-300/80 mt-1">
            ● Awaiting First Callback
          </div>
        </div>

        {/* Active Pipeline */}
        <div
          onClick={() => {
            onFilterStatus('Quoted');
            onSelectTab('enquiries');
          }}
          className="p-6 bg-[#0D121C] border border-slate-800/80 hover:border-slate-700 transition-all rounded-sm cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-sky-400 font-bold">Active Pipeline</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
            {inProgressLeads + quotedLeads}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            {quotedLeads} Quoted · {inProgressLeads} In Progress
          </div>
        </div>

        {/* Converted */}
        <div
          onClick={() => {
            onFilterStatus('Converted');
            onSelectTab('enquiries');
          }}
          className="p-6 bg-[#0D121C] border border-slate-800/80 hover:border-slate-700 transition-all rounded-sm cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Converted</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
            {convertedLeads}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Confirmed Installations
          </div>
        </div>

      </div>

      {/* Main Breakdown: Pipeline Flow + Capacity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pipeline Progression (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D121C] border border-slate-800/80 p-6 sm:p-8 rounded-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-tight">
                Lead Conversion Pipeline
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Stage progression of active solar consultations
              </p>
            </div>
            <button
              onClick={() => onSelectTab('enquiries')}
              className="text-xs font-mono font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {[
              { label: 'New', count: newLeads, color: 'bg-amber-500', text: 'text-amber-400' },
              { label: 'Contacted', count: contactedLeads, color: 'bg-sky-500', text: 'text-sky-400' },
              { label: 'In Progress', count: inProgressLeads, color: 'bg-indigo-500', text: 'text-indigo-400' },
              { label: 'Quoted', count: quotedLeads, color: 'bg-purple-500', text: 'text-purple-400' },
              { label: 'Converted', count: convertedLeads, color: 'bg-emerald-500', text: 'text-emerald-400' },
            ].map((stage) => {
              const pct = totalLeads > 0 ? Math.round((stage.count / totalLeads) * 100) : 0;
              return (
                <div
                  key={stage.label}
                  onClick={() => {
                    onFilterStatus(stage.label);
                    onSelectTab('enquiries');
                  }}
                  className="p-3 bg-[#080B11] border border-slate-800/80 rounded-sm hover:border-slate-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className={`font-bold uppercase ${stage.text}`}>{stage.label}</span>
                    <span className="text-slate-300 font-semibold">{stage.count} leads ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-none overflow-hidden">
                    <div className={`h-full ${stage.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capacity Demand (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D121C] border border-slate-800/80 p-6 sm:p-8 rounded-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white uppercase tracking-tight">
                Capacity Demand
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Requested system scales in Dausa
              </p>
            </div>

            <div className="space-y-2.5 pt-4">
              {['3 KW', '5 KW', '2 KW', '10 KW+', '1 KW', 'Not sure'].map((cap) => {
                const count = capacityCounts[cap] || 0;
                return (
                  <div key={cap} className="flex items-center justify-between p-3 bg-[#080B11] border border-slate-800/80 rounded-sm text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-bold text-white">{cap} System</span>
                    </div>
                    <span className="font-bold text-amber-400">{count} inquiries</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>Market Demand:</span>
            <span className="text-amber-400 font-semibold">3 KW is Most Requested</span>
          </div>
        </div>

      </div>

      {/* Recent Enquiries Action List (Answering "What needs my attention?") */}
      <div className="bg-[#0D121C] border border-slate-800/80 p-6 sm:p-8 rounded-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-tight">
              Recent Inquiries Awaiting Action
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Latest consumer quote submissions
            </p>
          </div>
          <button
            onClick={() => onSelectTab('enquiries')}
            className="btn-primary text-xs py-2 px-4 font-mono"
          >
            <span>Open Leads Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase">
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Capacity</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-white font-sans">
                    {enq.name}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    +91 {enq.mobile}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{enq.city}, {enq.district}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold text-amber-400">
                    {enq.capacity}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase ${
                      enq.status === 'New'
                        ? 'bg-amber-500 text-amber-950'
                        : enq.status === 'Converted'
                        ? 'bg-emerald-500 text-emerald-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        onFilterStatus('all');
                        onSelectTab('enquiries');
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
