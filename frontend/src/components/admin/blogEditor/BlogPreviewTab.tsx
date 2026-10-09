import { Eye, Clock, User } from 'lucide-react';

interface BlogPreviewTabProps {
  title: string;
  slug: string;
  category: string;
  readTime: string;
  estimatedMins: number;
  author: string;
  publishDate: string;
  imageUrl: string;
  excerpt: string;
  wordCount: number;
  isPublished: boolean;
}

export default function BlogPreviewTab({
  title,
  slug,
  category,
  readTime,
  estimatedMins,
  author,
  publishDate,
  imageUrl,
  excerpt,
  wordCount,
  isPublished,
}: BlogPreviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-accent-red" />
          <span className="font-semibold text-slate-800">Live Website Simulation</span>
          <span>— Preview how this article appears to website visitors</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white border border-slate-200">
          {isPublished ? 'Status: Live Public' : 'Status: Draft'}
        </span>
      </div>

      {/* Grid with Card Preview & Hero Banner Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* 1. Blog Card Preview */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Card Preview (as shown on /blogs grid)
          </h4>
          <div className="max-w-sm mx-auto bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title || 'Preview'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-slate-950 via-slate-900 to-primary-dark flex flex-col items-center justify-center p-6 text-center">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white border border-white/20 mb-1">
                    {category}
                  </span>
                  <span className="text-white/40 text-[11px] font-mono">
                    Ambica Industry
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                  {category}
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white shadow-xs flex items-center gap-1">
                  <Clock size={11} />
                  {readTime || `${estimatedMins} min read`}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">
                {title || 'Your Article Title'}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {excerpt || 'Your article summary will be displayed here on the preview card...'}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <User size={12} className="text-slate-400" />
                  {author || 'Trent Palmer'}
                </span>
                <span className="text-accent-red font-bold text-xs flex items-center gap-1">
                  Read &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Article Header Simulation */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Hero Preview (as shown on separate /blogs/{slug || 'article'} page)
          </h4>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-red/10 text-accent-red border border-accent-red/20 uppercase tracking-wider">
                {category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {publishDate || 'Today'} • {readTime || `${estimatedMins} min read`}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
              {title || 'Article Title Heading'}
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed border-l-2 border-accent-red pl-3 italic">
              {excerpt || 'Article summary snippet...'}
            </p>

            {/* Hero Image */}
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white/40 text-xs">
                  Featured Hero Banner
                </div>
              )}
            </div>

            {/* Word Count & Stats */}
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-center justify-between">
              <span>Article Length: {wordCount} words</span>
              <span>Est. Reading: {readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
