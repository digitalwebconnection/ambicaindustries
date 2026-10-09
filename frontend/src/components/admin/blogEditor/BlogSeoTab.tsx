interface BlogSeoTabProps {
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  canonicalUrl: string;
  setCanonicalUrl: (val: string) => void;
  keywords: string;
  setKeywords: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  schemaMarkup: string;
  setSchemaMarkup: (val: string) => void;
  onGenerateSchema: () => void;
}

export default function BlogSeoTab({
  title,
  slug,
  excerpt,
  metaTitle,
  setMetaTitle,
  canonicalUrl,
  setCanonicalUrl,
  keywords,
  setKeywords,
  metaDescription,
  setMetaDescription,
  schemaMarkup,
  setSchemaMarkup,
  onGenerateSchema,
}: BlogSeoTabProps) {
  return (
    <div className="border border-blue-100/80 rounded-2xl p-5 bg-white space-y-4 shadow-2xs">
      {/* Meta Title */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Meta Title
          </label>
          <button
            type="button"
            onClick={() => setMetaTitle(`${title} | Ambica Industries`)}
            className="text-[10px] text-blue-600 hover:underline cursor-pointer"
          >
            Sync with Title
          </button>
        </div>
        <input
          type="text"
          placeholder="SEO Title | Ambica Industries"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Canonical URL */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Canonical URL
          </label>
          <button
            type="button"
            onClick={() => setCanonicalUrl(`https://ambicaindustry.com/blogs/${slug}`)}
            className="text-[10px] text-blue-600 hover:underline cursor-pointer"
          >
            Sync with Slug
          </button>
        </div>
        <input
          type="text"
          placeholder="https://ambicaindustry.com/blogs/..."
          value={canonicalUrl}
          onChange={(e) => setCanonicalUrl(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-1.5">
          Keywords
        </label>
        <input
          type="text"
          placeholder="dyes, textile dyes, direct dyes, reactive dyes"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Meta Description */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Meta Description
          </label>
          <button
            type="button"
            onClick={() => setMetaDescription(excerpt)}
            className="text-[10px] text-blue-600 hover:underline cursor-pointer"
          >
            Sync with Excerpt
          </button>
        </div>
        <textarea
          rows={3}
          placeholder="Search engine meta description snippet..."
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Schema Markup (JSON-LD) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Schema Markup (JSON-LD)
          </label>
          <button
            type="button"
            onClick={onGenerateSchema}
            className="text-[10px] text-blue-600 hover:underline cursor-pointer"
          >
            Generate BlogPosting JSON-LD
          </button>
        </div>
        <textarea
          rows={5}
          placeholder='{ "@context": "https://schema.org", ... }'
          value={schemaMarkup}
          onChange={(e) => setSchemaMarkup(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
