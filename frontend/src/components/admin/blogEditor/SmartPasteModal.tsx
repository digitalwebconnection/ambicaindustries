import { Sparkles, X } from 'lucide-react';

interface SmartPasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  smartPasteText: string;
  setSmartPasteText: (val: string) => void;
  onApply: () => void;
}

export default function SmartPasteModal({
  isOpen,
  onClose,
  smartPasteText,
  setSmartPasteText,
  onApply,
}: SmartPasteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4"
    >
      <div
        data-lenis-prevent
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Smart Paste (Docs, Word &amp; Markdown)
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
          Paste content from Google Docs, ChatGPT, Word, or Markdown. Headings, bullet points, numbered lists, and bold text are converted directly into clean HTML.
        </p>

        <textarea
          rows={8}
          value={smartPasteText}
          onChange={(e) => setSmartPasteText(e.target.value)}
          placeholder="Paste text here (e.g. ## Heading 2, - Bullet point, **Bold text**)..."
          className="w-full p-3 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 mb-4"
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
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Convert &amp; Append
          </button>
        </div>
      </div>
    </div>
  );
}
