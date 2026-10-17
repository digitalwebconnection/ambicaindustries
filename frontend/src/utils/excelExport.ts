import type { LeadItem } from '@/services/leadService';

/**
 * Clean & escape cell values for Excel CSV
 */
function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '""';
  const str = String(value).replace(/"/g, '""');
  // Safe Excel escaping for formulas / special chars
  return `"${str}"`;
}

/**
 * Download a list of leads into a formatted Excel (.csv) file with UTF-8 BOM
 */
export function downloadLeadsToExcel(leads: LeadItem[], customFilename?: string) {
  if (!leads || leads.length === 0) {
    alert('No leads available to export.');
    return;
  }

  const headers = [
    'Reference ID',
    'Date Submitted',
    'Time',
    'Status',
    'Customer Name',
    'Company Name',
    'Email Address',
    'Phone / WhatsApp',
    'City',
    'Country',
    'Product / Requirement',
    'Visitor IP',
    'IP Location',
    'Source Page',
    'Customer Message / Requirement Details',
  ];

  const rows = leads.map((l) => {
    const d = new Date(l.createdAt);
    const dateStr = !isNaN(d.getTime()) ? d.toLocaleDateString('en-GB') : '';
    const timeStr = !isNaN(d.getTime())
      ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';

    return [
      escapeCsvCell(l.referenceId || l._id),
      escapeCsvCell(dateStr),
      escapeCsvCell(timeStr),
      escapeCsvCell((l.status || 'new').toUpperCase()),
      escapeCsvCell(l.name),
      escapeCsvCell(l.company || 'N/A'),
      escapeCsvCell(l.email),
      escapeCsvCell(l.phone),
      escapeCsvCell(l.city || 'N/A'),
      escapeCsvCell(l.country || l.suburb || 'N/A'),
      escapeCsvCell(l.service || 'General Requirement'),
      escapeCsvCell(l.ip || 'N/A'),
      escapeCsvCell(l.ipLocation || 'N/A'),
      escapeCsvCell(l.sourcePage || 'Website Form'),
      escapeCsvCell(l.message || ''),
    ].join(',');
  });

  // Prepend UTF-8 BOM so Excel opens with proper encoding
  const csvContent = '\uFEFF' + [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateSuffix = new Date().toISOString().split('T')[0];

  link.href = url;
  link.setAttribute('download', customFilename || `Ambica_Leads_Database_${dateSuffix}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download a single lead into Excel format
 */
export function downloadSingleLeadToExcel(lead: LeadItem) {
  const ref = lead.referenceId || lead._id.slice(-6).toUpperCase();
  const safeName = (lead.name || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
  const dateSuffix = new Date().toISOString().split('T')[0];
  downloadLeadsToExcel([lead], `Ambica_Lead_${ref}_${safeName}_${dateSuffix}.csv`);
}
