import { Sparkles } from 'lucide-react';

interface BlogDetailContentProps {
  content: string[] | string;
  author: string;
}

export default function BlogDetailContent({ content, author }: BlogDetailContentProps) {
  // Helper to render either array of paragraphs or rich text HTML
  const renderContent = (data: string[] | string) => {
    if (Array.isArray(data)) {
      return data.map((para, i) => (
        <p key={i} className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          {para}
        </p>
      ));
    }
    return (
      <div
        className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    );
  };

  return (
    <main className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs mb-12">
      <div className="text-slate-800 leading-relaxed font-sans">
        {renderContent(content)}
      </div>

      {/* Author Attribution Box */}
      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border">
        <div className="w-12 h-12 rounded-full bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red shrink-0">
          <Sparkles size={22} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Published by {author}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Ambica Industry R&amp;D Technical Group — Providing customized dye synthesis and technical processing support for global textile mills, paper manufacturers, and tanneries since 1986.
          </p>
        </div>
      </div>
    </main>
  );
}
