import {
  Image as ImageIcon,
  Check,
  ChevronDown,
  RefreshCw,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { CATEGORIES } from './helpers';

interface BlogDetailsTabProps {
  title: string;
  onTitleChange: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  setCanonicalUrl: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  readTime: string;
  setReadTime: (val: string) => void;
  onCalculateReadTime: () => void;
  author: string;
  setAuthor: (val: string) => void;
  authorRole: string;
  setAuthorRole: (val: string) => void;
  publishDate: string;
  setPublishDate: (val: string) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
  uploadingImage: boolean;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  excerpt: string;
  onExcerptChange: (val: string) => void;
  takeawaysRaw: string;
  setTakeawaysRaw: (val: string) => void;
}

export default function BlogDetailsTab({
  title,
  onTitleChange,
  slug,
  setSlug,
  setCanonicalUrl,
  category,
  setCategory,
  readTime,
  setReadTime,
  onCalculateReadTime,
  author,
  setAuthor,
  authorRole,
  setAuthorRole,
  publishDate,
  setPublishDate,
  imageUrl,
  setImageUrl,
  uploadingImage,
  onImageFileChange,
  fileInputRef,
  excerpt,
  onExcerptChange,
  takeawaysRaw,
  setTakeawaysRaw,
}: BlogDetailsTabProps) {
  return (
    <div className="border border-blue-100/80 rounded-2xl p-5 bg-white space-y-4 shadow-2xs">
      {/* Blog Title */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-1.5">
          Blog Title
        </label>
        <input
          type="text"
          required
          placeholder="eg. Direct vs Reactive Dyes: Complete Guide"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      {/* URL Slug */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-1.5">
          URL Slug <span className="font-normal text-slate-400 text-[11px]">(auto generated from title)</span>
        </label>
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/70 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
          <span className="px-3.5 py-2 text-xs font-mono text-slate-400 select-none border-r border-slate-200">
            /blogs/
          </span>
          <input
            type="text"
            placeholder="your-blog-title"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setCanonicalUrl(`https://ambicaindustry.com/blogs/${e.target.value}`);
            }}
            className="flex-1 px-3 py-2 bg-transparent text-slate-800 font-mono text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Category & Read Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-9 cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Read Time
            </label>
            <button
              type="button"
              onClick={onCalculateReadTime}
              className="text-[10px] text-blue-600 hover:underline cursor-pointer"
            >
              Auto-calculate
            </button>
          </div>
          <input
            type="text"
            placeholder="5 min read"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Author & Author Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Author Name
          </label>
          <input
            type="text"
            placeholder="Trent Palmer"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Author Role
          </label>
          <input
            type="text"
            placeholder="Founder & Master Electrician"
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Publish Date */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-1.5">
          Publish Date
        </label>
        <input
          type="text"
          placeholder="Oct 9, 2026"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Featured Blog Image */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <ImageIcon size={14} className="text-accent-red" />
            Featured Article Cover Image
          </label>
          {imageUrl && (
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Active Image Set
            </span>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={onImageFileChange}
          className="hidden"
        />

        {imageUrl ? (
          /* High Resolution Preview Banner with Controls */
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group shadow-xs">
            <div className="aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Featured Preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                }}
              />
            </div>

            {/* Gradient Overlay Toolbar */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-900/20 to-transparent flex flex-col justify-between p-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-emerald-400 backdrop-blur-md border border-emerald-500/30 flex items-center gap-1">
                  <Check size={12} /> Hosted on Cloudinary
                </span>

                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  title="Remove image"
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 text-white">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-mono truncate text-white/80 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                    {imageUrl}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold backdrop-blur-md transition-all cursor-pointer text-xs flex items-center gap-1.5 shrink-0"
                >
                  <RefreshCw size={13} />
                  <span>Replace</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Dashed Upload Box */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-accent-red rounded-2xl p-7 text-center bg-slate-50/70 hover:bg-rose-50/30 transition-all cursor-pointer flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-500 group-hover:text-accent-red group-hover:scale-105 transition-all mb-2.5">
              {uploadingImage ? (
                <RefreshCw size={22} className="animate-spin text-accent-red" />
              ) : (
                <UploadCloud size={22} />
              )}
            </div>
            <p className="text-xs font-bold text-slate-800 group-hover:text-accent-red transition-colors">
              {uploadingImage ? 'Uploading Image to Cloudinary...' : 'Click to Upload Article Cover Image'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              PNG, JPG, WEBP — automatically optimized &amp; hosted on Cloudinary
            </p>
          </div>
        )}

        {/* Direct image URL input */}
        <div className="pt-1">
          <input
            type="text"
            placeholder="Or enter direct image URL (https://res.cloudinary.com/... or /images/blog/...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs font-mono placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Excerpt / Summary */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-1.5">
          Excerpt / Summary
        </label>
        <textarea
          rows={3}
          required
          placeholder="Brief summary shown on blog cards..."
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Key Takeaways */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-1.5">
          Key Takeaways <span className="font-normal text-slate-400 text-[11px]">(one per line)</span>
        </label>
        <textarea
          rows={4}
          placeholder="Bullet 1&#10;Bullet 2&#10;Bullet 3"
          value={takeawaysRaw}
          onChange={(e) => setTakeawaysRaw(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
