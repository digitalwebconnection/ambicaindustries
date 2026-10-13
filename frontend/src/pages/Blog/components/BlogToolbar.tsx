import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';

export type SortOption = 'newest' | 'popular' | 'readTime';

interface BlogToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categoryCounts?: Record<string, number>;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  totalFilteredCount: number;
  totalCount: number;
}

const POPULAR_TAGS = ['Acid Dyes', 'Direct Dyes', 'Reactive Dyes', 'Textile Processing', 'Paper Industry'];

export default function BlogToolbar({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  categoryCounts = {},
  sortBy,
  setSortBy,
  totalFilteredCount,
  totalCount,
}: BlogToolbarProps) {
  const isFiltering = selectedCategory !== 'All' || searchTerm.trim().length > 0;

  return (
    <div className="mb-10 space-y-6">
      {/* ================= 1. SEARCH & SORT BAR ================= */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search articles by title, keyword, chemistry, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl sm:rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Controls: Sort Dropdown & Reset */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200 rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-xs text-slate-700">
            <SlidersHorizontal size={14} className="text-slate-500 shrink-0" />
            <span className="font-semibold text-slate-500 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="readTime">Read Time</option>
            </select>
          </div>

          {isFiltering && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="px-3.5 py-2.5 rounded-xl sm:rounded-2xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <X size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= 2. CATEGORY PILLS BAR ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((category) => {
            const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
            const count = category === 'All' ? totalCount : categoryCounts[category] || 0;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Count summary badge */}
        <div className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-1.5 self-end sm:self-center">
          <span>Showing</span>
          <span className="font-bold text-slate-900">{totalFilteredCount}</span>
          <span>of {totalCount} publications</span>
        </div>
      </div>

      {/* ================= 3. POPULAR QUICK-SEARCH TAGS ================= */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1 font-semibold text-slate-400">
          <Sparkles size={12} className="text-amber-500" />
          Hot Topics:
        </span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchTerm(tag)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer text-[11px]"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
