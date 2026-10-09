import { RefreshCw } from 'lucide-react';

interface BlogEditorFooterProps {
  isPublished: boolean;
  setIsPublished: (val: boolean) => void;
  saving: boolean;
  isEditing: boolean;
  onClose: () => void;
}

export default function BlogEditorFooter({
  isPublished,
  setIsPublished,
  saving,
  isEditing,
  onClose,
}: BlogEditorFooterProps) {
  return (
    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
      {/* Publish immediately checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 rounded text-slate-900 accent-slate-900 cursor-pointer"
        />
        <span className="text-xs font-semibold text-slate-800">
          Publish immediately on live blog
        </span>
      </label>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
        >
          {saving && <RefreshCw size={13} className="animate-spin" />}
          <span>
            {saving ? 'Publishing...' : isEditing ? 'Update Article' : 'Publish Article'}
          </span>
        </button>
      </div>
    </div>
  );
}
