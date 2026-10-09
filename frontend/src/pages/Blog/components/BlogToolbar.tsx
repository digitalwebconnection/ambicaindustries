import { Search, X } from 'lucide-react';

interface BlogToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories?: string[];
  selectedCategory?: string;
  setSelectedCategory?: (cat: string) => void;
  totalCount?: number;
  loading?: boolean;
}

export default function BlogToolbar({
  searchTerm,
  setSearchTerm,
}: BlogToolbarProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
            Articles &amp; Industry Publications
          </h2>
          
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red transition-all shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

     
    </div>
  );
}
