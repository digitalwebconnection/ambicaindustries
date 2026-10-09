import { Sparkles, X } from 'lucide-react';

interface AutoImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoImportText: string;
  setAutoImportText: (val: string) => void;
  onApply: () => void;
}

export default function AutoImportModal({
  isOpen,
  onClose,
  autoImportText,
  setAutoImportText,
  onApply,
}: AutoImportModalProps) {
  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4"
    >
      <div
        data-lenis-prevent
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Auto-Detect &amp; Import Article
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-3">
          Paste an entire article or draft here. We will automatically parse the <b>Title</b>, generate the <b>Slug</b>, extract the <b>Summary</b>, identify <b>Key Takeaways</b>, format the <b>Article Body</b>, and generate <b>SEO Tags</b>!
        </p>

        <textarea
          rows={10}
          value={autoImportText}
          onChange={(e) => setAutoImportText(e.target.value)}
          placeholder="# Article Title&#10;&#10;Summary of the article goes here...&#10;&#10;- Takeaway 1&#10;- Takeaway 2&#10;&#10;## Section Heading&#10;Paragraph body text..."
          className="w-full p-3 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 mb-4"
        />

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onApply}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            ✨ Auto-Detect &amp; Fill All Fields
          </button>
        </div>
      </div>
    </div>
  );
}
