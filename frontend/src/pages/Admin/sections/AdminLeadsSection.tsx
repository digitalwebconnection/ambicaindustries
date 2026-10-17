import { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  Trash2,
  Calendar,
  Building2,
  MapPin,
  Eye,
  RefreshCw,
  X,
  MessageSquare,
  Globe,
  FileSpreadsheet,
  Download,
  Filter,
  RotateCcw,
} from 'lucide-react';
import type { LeadItem } from '@/services/leadService';
import { downloadLeadsToExcel, downloadSingleLeadToExcel } from '@/utils/excelExport';

interface AdminLeadsSectionProps {
  leads: LeadItem[];
  loading: boolean;
  actionLoading: boolean;
  onRefresh: () => void;
  onUpdateStatus?: (id: string, status: LeadItem['status']) => void;
  onDeleteLead: (id: string, name: string) => void;
}

type DatePreset = 'all' | 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'custom';

const toLocalDateInput = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function AdminLeadsSection({
  leads,
  loading,
  actionLoading,
  onRefresh,
  onDeleteLead,
}: AdminLeadsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [datePreset, setDatePreset] = useState<DatePreset>('all');
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<LeadItem | null>(null);

  const handlePresetChange = (preset: DatePreset) => {
    setDatePreset(preset);
    const now = new Date();

    if (preset === 'all') {
      setStartDate('');
      setEndDate('');
    } else if (preset === 'today') {
      const todayStr = toLocalDateInput(now);
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === 'yesterday') {
      const yest = new Date(now);
      yest.setDate(now.getDate() - 1);
      const yestStr = toLocalDateInput(yest);
      setStartDate(yestStr);
      setEndDate(yestStr);
    } else if (preset === '7days') {
      const past = new Date(now);
      past.setDate(now.getDate() - 6);
      setStartDate(toLocalDateInput(past));
      setEndDate(toLocalDateInput(now));
    } else if (preset === '30days') {
      const past = new Date(now);
      past.setDate(now.getDate() - 29);
      setStartDate(toLocalDateInput(past));
      setEndDate(toLocalDateInput(now));
    } else if (preset === 'thisMonth') {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      setStartDate(toLocalDateInput(firstDay));
      setEndDate(toLocalDateInput(now));
    }
  };

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    setDatePreset('custom');
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    setDatePreset('custom');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setDatePreset('all');
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Date Range Filter
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const leadDate = new Date(lead.createdAt);
        if (isNaN(leadDate.getTime()) || leadDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const leadDate = new Date(lead.createdAt);
        if (isNaN(leadDate.getTime()) || leadDate > end) return false;
      }

      // 2. Search Term Filter
      const term = searchTerm.toLowerCase().trim();
      if (!term) return true;

      return (
        lead.name?.toLowerCase().includes(term) ||
        lead.company?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.phone?.toLowerCase().includes(term) ||
        lead.city?.toLowerCase().includes(term) ||
        lead.country?.toLowerCase().includes(term) ||
        lead.service?.toLowerCase().includes(term) ||
        lead.referenceId?.toLowerCase().includes(term) ||
        lead.message?.toLowerCase().includes(term) ||
        lead.ip?.toLowerCase().includes(term) ||
        lead.ipLocation?.toLowerCase().includes(term) ||
        lead.sourcePage?.toLowerCase().includes(term)
      );
    });
  }, [leads, startDate, endDate, searchTerm]);

  const handleDownloadExcel = () => {
    let filename: string | undefined;
    if (startDate && endDate) {
      filename = `Ambica_Leads_${startDate}_to_${endDate}.csv`;
    } else if (startDate) {
      filename = `Ambica_Leads_from_${startDate}.csv`;
    } else if (endDate) {
      filename = `Ambica_Leads_until_${endDate}.csv`;
    } else if (datePreset !== 'all') {
      filename = `Ambica_Leads_${datePreset}.csv`;
    }
    downloadLeadsToExcel(filteredLeads, filename);
  };

  const newCount = leads.filter((l) => l.status === 'new').length;


  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Header & Quick Stat Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-accent-red" />
            Customer Leads & Enquiries
          </h2>
        </div>

        {/* Action Buttons (2-col grid on mobile, inline on desktop) */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDownloadExcel}
            disabled={filteredLeads.length === 0}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download all filtered leads into an Excel spreadsheet (.csv)"
          >
            <FileSpreadsheet size={15} />
            <span>Export ({filteredLeads.length})</span>
          </button>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading || actionLoading}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-accent-red' : 'text-slate-400'} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Stat Cards (Responsive 2x2 grid) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</div>
          <div className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-black text-slate-900">{leads.length}</div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500">In MongoDB database</div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl border border-emerald-200 bg-emerald-50/25 shadow-xs">
          <div className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            New Inquiries
          </div>
          <div className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-black text-emerald-700">{newCount}</div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-emerald-600">Pending initial contact</div>
        </div>
      </div>

      {/* 3. Search & Date Filter Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, company, email, phone, city, IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-all text-slate-800 placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Date Filter & Export Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full xl:w-auto">
            {/* Quick Preset Selector */}
            <div className="flex items-center justify-between sm:justify-start gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 w-full sm:w-auto">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-accent-red shrink-0" />
                <span className="text-slate-400 font-normal">Date:</span>
              </div>
              <select
                value={datePreset}
                onChange={(e) => handlePresetChange(e.target.value as DatePreset)}
                className="bg-transparent text-slate-800 font-semibold outline-none cursor-pointer text-xs text-right sm:text-left"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* From - To Date Pickers (Grid on mobile: 0 overflow!) */}
            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
                <label className="text-[10px] font-bold text-slate-400 uppercase shrink-0">From:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full bg-transparent text-slate-800 font-medium outline-none text-xs cursor-pointer min-w-0"
                  title="Start Date"
                />
              </div>
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
                <label className="text-[10px] font-bold text-slate-400 uppercase shrink-0">To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                  className="w-full bg-transparent text-slate-800 font-medium outline-none text-xs cursor-pointer min-w-0"
                  title="End Date"
                />
              </div>
            </div>

            {/* Action Buttons: Reset & Download */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
              {(startDate || endDate || searchTerm || datePreset !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  title="Reset all filters"
                  className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDownloadExcel}
                disabled={filteredLeads.length === 0}
                title="Download these filtered leads to Excel"
                className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                <FileSpreadsheet size={14} />
                <span>Download ({filteredLeads.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informative Active Date Filter Chip */}
        {(startDate || endDate) && (
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-900">
            <div className="flex items-center gap-1.5">
              <Filter size={13} className="text-amber-600 shrink-0" />
              <span className="text-[11px] sm:text-xs">
                Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> leads
                {startDate && endDate
                  ? ` (${startDate} to ${endDate})`
                  : startDate
                  ? ` (from ${startDate} onwards)`
                  : ` (up to ${endDate})`}
                .
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setDatePreset('all');
              }}
              className="text-[11px] font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer shrink-0"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* 4. Leads List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <RefreshCw size={28} className="animate-spin text-accent-red" />
            <p className="text-sm font-medium">Fetching leads from MongoDB...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center px-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Users size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-800">No leads found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {searchTerm || startDate || endDate
                ? 'No leads match your current search query or date filter range. Try adjusting your dates or search term.'
                : 'Customer inquiries submitted via the website forms will appear here and in your MongoDB Atlas database.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Customer / Company</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Requirement / Location</th>
                    <th className="py-3 px-4">Date & Source</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => {
                    return (
                      <tr key={lead._id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Name & Company */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          {lead.company && lead.company !== 'Not specified' ? (
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                              <Building2 size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate max-w-45">{lead.company}</span>
                            </div>
                          ) : null}
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                            Ref: {lead.referenceId || lead._id.slice(-6).toUpperCase()}
                          </div>
                        </td>

                        {/* Contact Info */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-accent-red font-medium transition-colors"
                            >
                              <Mail size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate max-w-50">{lead.email}</span>
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-accent-red font-medium transition-colors"
                            >
                              <Phone size={12} className="text-slate-400 shrink-0" />
                              <span>{lead.phone}</span>
                            </a>
                          </div>
                        </td>

                        {/* Requirement & Location */}
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-800 line-clamp-1">
                            {lead.service || 'General Requirement'}
                          </div>
                          {(lead.city || lead.country || lead.suburb) && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                              <MapPin size={12} className="text-slate-400 shrink-0" />
                              <span>
                                {[lead.city, lead.country || lead.suburb].filter(Boolean).join(', ')}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Date & Source & IP */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-xs text-slate-700 font-medium">
                            <Calendar size={12} className="text-slate-400 shrink-0" />
                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <Globe size={11} className="text-slate-400 shrink-0" />
                            <span>{lead.sourcePage || 'Website'}</span>
                          </div>
                          {lead.ip && (
                            <div
                              className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md mt-1 border border-slate-200/60"
                              title={lead.ipLocation ? `Location: ${lead.ipLocation}` : undefined}
                            >
                              <span className="text-slate-400">IP:</span>
                              <span className="font-semibold">{lead.ip}</span>
                              {lead.ipLocation && (
                                <span className="text-[9px] text-slate-400 font-sans">({lead.ipLocation})</span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => downloadSingleLeadToExcel(lead)}
                            title="Download this Lead to Excel (.csv)"
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Download size={15} />
                          </button>
                          <button
                            onClick={() => setActiveLead(lead)}
                            title="View Full Details"
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => setLeadToDelete(lead)}
                            title="Delete Lead"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Lead Cards View (Visible only on mobile devices) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredLeads.map((lead) => {
                const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9+]/g, '') : '';
                const waUrl = cleanPhone
                  ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for contacting Ambica Industries regarding your enquiry.`)}`
                  : null;

                return (
                  <div key={lead._id} className="p-4 space-y-3 hover:bg-slate-50/60 transition-colors">
                    {/* Top Row: Name, Ref, Date */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                        {lead.company && lead.company !== 'Not specified' && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                            <Building2 size={12} className="text-slate-400 shrink-0" />
                            <span className="truncate">{lead.company}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono font-bold rounded border border-slate-200">
                          {lead.referenceId || lead._id.slice(-6).toUpperCase()}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Requirement & Location */}
                    <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">
                        {lead.service || 'General Requirement'}
                      </div>
                      {(lead.city || lead.country || lead.suburb) && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <MapPin size={11} className="text-slate-400 shrink-0" />
                          <span>{[lead.city, lead.country || lead.suburb].filter(Boolean).join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Direct Contact Links */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                        >
                          <Phone size={11} className="text-slate-500" />
                          <span>{lead.phone}</span>
                        </a>
                      )}
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors max-w-47.5 truncate"
                        >
                          <Mail size={11} className="text-slate-500 shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </a>
                      )}
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg font-semibold transition-colors"
                        >
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="text-[10px] text-slate-400">
                        {lead.sourcePage || 'Website'}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => downloadSingleLeadToExcel(lead)}
                          title="Download Excel"
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveLead(lead)}
                          title="View Details"
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLeadToDelete(lead)}
                          title="Delete Lead"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 5. Lead Details Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveLead(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-red" />
              <h3 className="text-lg font-bold text-slate-900">Lead Enquiry Details</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="text-slate-500">Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">{activeLead.referenceId || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="text-slate-500">Submitted On:</span>
                  <span className="font-medium text-slate-800">{new Date(activeLead.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="text-slate-500">Source:</span>
                  <span className="font-medium text-slate-800">{activeLead.sourcePage || 'Website'}</span>
                </div>
                {activeLead.ip && (
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                    <span className="text-slate-500">Visitor IP:</span>
                    <span className="font-mono font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{activeLead.ip}</span>
                      {activeLead.ipLocation && (
                        <span className="text-[11px] text-slate-500 font-sans font-normal">
                          • {activeLead.ipLocation}
                        </span>
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="capitalize font-semibold text-slate-800">{activeLead.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Customer</span>
                  <div className="font-bold text-slate-900 mt-1">{activeLead.name}</div>
                  {activeLead.company && (
                    <div className="text-xs text-slate-500 mt-0.5">{activeLead.company}</div>
                  )}
                </div>

                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Requirement</span>
                  <div className="font-bold text-slate-900 mt-1">{activeLead.service || 'General Inquiry'}</div>
                  {(activeLead.city || activeLead.country) && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {[activeLead.city, activeLead.country].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-white space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Contact Information</span>
                <div className="flex items-center gap-2 pt-1">
                  <Mail size={14} className="text-slate-400" />
                  <a href={`mailto:${activeLead.email}`} className="text-accent-red font-medium hover:underline">
                    {activeLead.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <a href={`tel:${activeLead.phone}`} className="text-slate-800 font-medium hover:underline">
                    {activeLead.phone}
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-white space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                  <MessageSquare size={12} className="text-slate-400" />
                  Message / Details
                </span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg leading-relaxed whitespace-pre-wrap font-sans">
                  {activeLead.message || 'No additional message was provided.'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadSingleLeadToExcel(activeLead)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <FileSpreadsheet size={15} />
                  Download Excel (.csv)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const lead = activeLead;
                    setActiveLead(null);
                    setLeadToDelete(lead);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  title="Remove Lead from Admin Panel"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActiveLead(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Delete Confirmation Modal Popup */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setLeadToDelete(null)}
              disabled={actionLoading}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <X size={18} />
            </button>

            {/* Warning Header */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 text-rose-600 shadow-xs">
                <Trash2 size={22} />
              </div>
              <div className="pr-6">
                <h3 className="text-base font-bold text-slate-900">
                  Remove Lead from Admin Panel?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  This lead inquiry will be hidden from the admin dashboard list.
                </p>
              </div>
            </div>

            {/* Lead Summary Card */}
            <div className="my-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{leadToDelete.name}</span>
                <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                  {leadToDelete.referenceId || leadToDelete._id.slice(-6).toUpperCase()}
                </span>
              </div>
              {leadToDelete.company && (
                <div className="text-slate-600 flex items-center gap-1.5">
                  <Building2 size={12} className="text-slate-400 shrink-0" />
                  <span className="truncate">{leadToDelete.company}</span>
                </div>
              )}
              <div className="text-slate-600 flex items-center gap-1.5">
                <Mail size={12} className="text-slate-400 shrink-0" />
                <span className="truncate">{leadToDelete.email}</span>
              </div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Phone size={12} className="text-slate-400 shrink-0" />
                <span>{leadToDelete.phone}</span>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>Safe Deletion:</strong> The inquiry record is <strong>not deleted</strong> from MongoDB. It remains safely saved in your database for auditing and historical records.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                disabled={actionLoading}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const lead = leadToDelete;
                  await onDeleteLead(lead._id, lead.name);
                  setLeadToDelete(null);
                }}
                disabled={actionLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                <Trash2 size={14} />
                <span>{actionLoading ? 'Removing...' : 'Yes, Remove Lead'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
