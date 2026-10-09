import { FileText, Sparkles, X } from 'lucide-react';

interface BlogEditorHeaderProps {
  isEditing: boolean;
  onOpenAutoImport: () => void;
  onClose: () => void;
}

export default function BlogEditorHeader({
  isEditing,
  onOpenAutoImport,
  onClose,
}: BlogEditorHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
          <FileText size={17} />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            {isEditing ? 'Edit Blog Article' : 'New Blog Article'}
          </h3>
          <p className="text-[11px] text-slate-500">
            Set article details, formatted content, and SEO metadata.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenAutoImport}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50/80 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          title="Paste markdown or document to auto-fill all tabs"
        >
          <Sparkles size={13} className="text-amber-600" />
          Auto-Detect &amp; Import
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
