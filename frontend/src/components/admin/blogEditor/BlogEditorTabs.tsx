import { Eye } from 'lucide-react';

export type EditorTabType = 'info' | 'content' | 'seo' | 'preview';

interface BlogEditorTabsProps {
  activeTab: EditorTabType;
  setActiveTab: (tab: EditorTabType) => void;
}

export default function BlogEditorTabs({
  activeTab,
  setActiveTab,
}: BlogEditorTabsProps) {
  return (
    <div className="flex items-center gap-6 px-6 pt-2 border-b border-slate-200 text-xs sm:text-sm font-semibold select-none bg-slate-50/50">
      <button
        type="button"
        onClick={() => setActiveTab('info')}
        className={`pb-3 relative transition-colors cursor-pointer ${
          activeTab === 'info'
            ? 'text-slate-900 font-bold border-b-2 border-accent-red'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        1. Details &amp; Media
      </button>

      <button
        type="button"
        onClick={() => setActiveTab('content')}
        className={`pb-3 relative transition-colors cursor-pointer ${
          activeTab === 'content'
            ? 'text-slate-900 font-bold border-b-2 border-accent-red'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        2. Article Content
      </button>

      <button
        type="button"
        onClick={() => setActiveTab('seo')}
        className={`pb-3 relative transition-colors cursor-pointer ${
          activeTab === 'seo'
            ? 'text-slate-900 font-bold border-b-2 border-accent-red'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        3. SEO &amp; Schema
      </button>

      <button
        type="button"
        onClick={() => setActiveTab('preview')}
        className={`pb-3 relative transition-colors cursor-pointer flex items-center gap-1.5 ${
          activeTab === 'preview'
            ? 'text-accent-red font-bold border-b-2 border-accent-red'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Eye size={14} />
        <span>4. Live Card Preview</span>
      </button>
    </div>
  );
}
