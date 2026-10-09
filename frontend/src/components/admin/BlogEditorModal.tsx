import { useState, useEffect, useRef } from 'react';
import {
  FileText,
  X,
  Sparkles,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Code2,
  Copy,
  UploadCloud,
  Check,
  ChevronDown,
  RefreshCw,
  Trash2,
  Eye,
  Clock,
  User,
} from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import { adminService, type BlogPayload } from '@/services/adminService';

interface BlogEditorModalProps {
  isOpen: boolean;
  article: BlogArticle | null;
  onClose: () => void;
  onSaved: () => void;
}

const CATEGORIES = [
  'Textile Dyes',
  'Leather & Specialty Dyes',
  'Sustainability',
  'Direct Dyes',
  'Reactive Dyes',
  'Acid Dyes',
  'Company News',
  'Solar Basics',
  'Technical Insights',
];

// Helper to convert Markdown / plaintext to HTML
function markdownToHtml(raw: string): string {
  if (!raw) return '';
  const lines = raw.split(/\r?\n/);
  const output: string[] = [];
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      output.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      output.push('</ol>');
      inOl = false;
    }
  };

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeLists();
      continue;
    }

    // Markdown Headings
    if (/^######\s+(.*)/.test(trimmed)) {
      closeLists();
      output.push(`<h6>${trimmed.replace(/^######\s+/, '')}</h6>`);
    } else if (/^#####\s+(.*)/.test(trimmed)) {
      closeLists();
      output.push(`<h5>${trimmed.replace(/^#####\s+/, '')}</h5>`);
    } else if (/^####\s+(.*)/.test(trimmed)) {
      closeLists();
      output.push(`<h4>${trimmed.replace(/^####\s+/, '')}</h4>`);
    } else if (/^###\s+(.*)/.test(trimmed)) {
      closeLists();
      output.push(`<h3>${trimmed.replace(/^###\s+/, '')}</h3>`);
    } else if (/^##\s+(.*)/.test(trimmed)) {
      closeLists();
      output.push(`<h2>${trimmed.replace(/^##\s+/, '')}</h2>`);
    } else if (/^#\s+(.*)/.test(trimmed)) {
      closeLists();
      output.push(`<h1>${trimmed.replace(/^#\s+/, '')}</h1>`);
    }
    // Bullet list items
    else if (/^[-*•]\s+(.*)/.test(trimmed)) {
      if (!inUl) {
        closeLists();
        output.push('<ul class="list-disc pl-5 my-3 space-y-1">');
        inUl = true;
      }
      const content = trimmed.replace(/^[-*•]\s+/, '');
      output.push(`<li>${formatInline(content)}</li>`);
    }
    // Numbered list items
    else if (/^\d+\.\s+(.*)/.test(trimmed)) {
      if (!inOl) {
        closeLists();
        output.push('<ol class="list-decimal pl-5 my-3 space-y-1">');
        inOl = true;
      }
      const content = trimmed.replace(/^\d+\.\s+/, '');
      output.push(`<li>${formatInline(content)}</li>`);
    }
    // Regular paragraph
    else {
      closeLists();
      output.push(`<p class="my-3">${formatInline(trimmed)}</p>`);
    }
  }

  closeLists();
  return output.join('\n');
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>');
}

export default function BlogEditorModal({
  isOpen,
  article,
  onClose,
  onSaved,
}: BlogEditorModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'content' | 'seo' | 'preview'>('info');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Textile Dyes');
  const [readTime, setReadTime] = useState('5 min read');
  const [author, setAuthor] = useState('Trent Palmer');
  const [authorRole, setAuthorRole] = useState('Founder & Master Electrician');
  const [publishDate, setPublishDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [takeawaysRaw, setTakeawaysRaw] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [schemaMarkup, setSchemaMarkup] = useState('');

  // Rich Text Editor State
  const [editorHtml, setEditorHtml] = useState('');
  const [isCodeView, setIsCodeView] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal Sub-tools
  const [smartPasteOpen, setSmartPasteOpen] = useState(false);
  const [smartPasteText, setSmartPasteText] = useState('');
  const [autoImportOpen, setAutoImportOpen] = useState(false);
  const [autoImportText, setAutoImportText] = useState('');

  // Initialize or Reset Form
  useEffect(() => {
    if (!isOpen) return;

    if (article) {
      setTitle(article.title || '');
      setSlug(article.slug || '');
      setCategory(article.category || 'Textile Dyes');
      setReadTime(article.readTime || '5 min read');
      setAuthor(article.author || 'Trent Palmer');
      setAuthorRole(article.authorRole || 'Founder & Master Electrician');
      setPublishDate(article.publishDate || '');
      setImageUrl(article.imageUrl || '');
      setExcerpt(article.excerpt || '');
      setTakeawaysRaw((article.keyTakeaways || []).join('\n'));
      setIsPublished(article.isPublished !== false);

      const html = Array.isArray(article.content) ? article.content.join('\n\n') : (article.content || '');
      setEditorHtml(html);

      setMetaTitle(article.metaTitle || `${article.title} | Ambica Industries`);
      setCanonicalUrl(article.canonicalUrl || `https://ambicaindustry.com/blogs/${article.slug}`);
      setKeywords(article.keywords || '');
      setMetaDescription(article.metaDescription || article.excerpt || '');
      setSchemaMarkup(article.schemaMarkup || '');
    } else {
      // Default New Article values
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      setTitle('');
      setSlug('');
      setCategory('Textile Dyes');
      setReadTime('5 min read');
      setAuthor('Trent Palmer');
      setAuthorRole('Founder & Master Electrician');
      setPublishDate(formattedDate);
      setImageUrl('');
      setExcerpt('');
      setTakeawaysRaw('');
      setIsPublished(true);
      setEditorHtml('');

      setMetaTitle('');
      setCanonicalUrl('');
      setKeywords('');
      setMetaDescription('');
      setSchemaMarkup('');
    }

    setActiveTab('info');
    setIsCodeView(false);
  }, [isOpen, article]);

  // Synchronize editor contentEditable DOM whenever editorHtml changes or tab switches
  useEffect(() => {
    if (activeTab === 'content' && editorRef.current && !isCodeView) {
      if (editorRef.current.innerHTML !== editorHtml) {
        editorRef.current.innerHTML = editorHtml;
      }
    }
  }, [activeTab, isCodeView, editorHtml]);

  // Handle title change & auto-generate slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!article) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
      setCanonicalUrl(`https://ambicaindustry.com/blogs/${generatedSlug}`);
      setMetaTitle(`${val} | Ambica Industries`);
    }
  };

  // Auto-sync excerpt with meta description
  const handleExcerptChange = (val: string) => {
    setExcerpt(val);
    if (!metaDescription) {
      setMetaDescription(val);
    }
  };

  // Word count & read-time calculations
  const textContent = editorHtml.replace(/<[^>]+>/g, ' ').trim();
  const wordCount = textContent ? textContent.split(/\s+/).filter(Boolean).length : 0;
  const estimatedMins = Math.max(1, Math.ceil(wordCount / 180));

  // Sync calculated read time
  const handleCalculateReadTime = () => {
    setReadTime(`${estimatedMins} min read`);
  };

  // Image Upload handler (Base64 -> Cloudinary / Fallback)
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const hostedUrl = await adminService.uploadImage(base64);
          setImageUrl(hostedUrl);
        } catch {
          // Cloudinary not configured or offline - keep data URI directly so it displays without errors!
          setImageUrl(base64);
        } finally {
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('File read error:', err);
      setUploadingImage(false);
    }
  };

  // Rich Text Exec Command Helper
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (isCodeView) return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setEditorHtml(editorRef.current.innerHTML);
    }
  };

  // Link Dialog
  const handleInsertLink = () => {
    if (isCodeView) return;
    const url = window.prompt('Enter link URL (e.g. https://example.com):', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  // Image Insert in Content
  const handleInsertImage = () => {
    if (isCodeView) return;
    const url = window.prompt('Enter image URL or path (e.g. /images/blog/diagram.webp):');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  // Clear Content
  const handleClearContent = () => {
    if (window.confirm('Are you sure you want to clear the article content?')) {
      setEditorHtml('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
    }
  };

  // Copy HTML Code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Paste Any Doc Handler / Smart Paste
  const handleApplySmartPaste = () => {
    if (!smartPasteText.trim()) return;
    const converted = markdownToHtml(smartPasteText);
    const newContent = editorHtml ? `${editorHtml}\n${converted}` : converted;
    setEditorHtml(newContent);
    if (editorRef.current) {
      editorRef.current.innerHTML = newContent;
    }
    setSmartPasteText('');
    setSmartPasteOpen(false);
  };

  // Auto-Detect & Import All Details from Document
  const handleApplyAutoImport = () => {
    if (!autoImportText.trim()) return;
    const lines = autoImportText.split(/\r?\n/).map((l) => l.trim());

    // 1. Detect Title (first line or line starting with #)
    let detectedTitle = '';
    const headingLine = lines.find((l) => l.startsWith('# ') || l.startsWith('Title:'));
    if (headingLine) {
      detectedTitle = headingLine.replace(/^(#\s*|Title:\s*)/i, '').trim();
    } else {
      detectedTitle = lines.find((l) => l.length > 5) || 'New Article';
    }

    // 2. Detect Excerpt (summary paragraph)
    let detectedExcerpt = '';
    const summaryLine = lines.find((l) => l.toLowerCase().startsWith('summary:') || l.toLowerCase().startsWith('excerpt:'));
    if (summaryLine) {
      detectedExcerpt = summaryLine.replace(/^(summary:|excerpt:)\s*/i, '').trim();
    } else {
      const para = lines.find((l) => l.length > 30 && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('*'));
      detectedExcerpt = para || '';
    }

    // 3. Detect Key Takeaways (lines with bullet points)
    const bulletLines = lines
      .filter((l) => /^[-*•]\s+/.test(l))
      .map((l) => l.replace(/^[-*•]\s+/, '').trim())
      .slice(0, 5);

    // 4. Formatted HTML Content
    const fullHtml = markdownToHtml(autoImportText);

    // Apply detected fields
    if (detectedTitle) {
      setTitle(detectedTitle);
      const generatedSlug = detectedTitle
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
      setMetaTitle(`${detectedTitle} | Ambica Industries`);
      setCanonicalUrl(`https://ambicaindustry.com/blogs/${generatedSlug}`);
    }

    if (detectedExcerpt) {
      setExcerpt(detectedExcerpt);
      setMetaDescription(detectedExcerpt);
    }

    if (bulletLines.length > 0) {
      setTakeawaysRaw(bulletLines.join('\n'));
    }

    setEditorHtml(fullHtml);
    if (editorRef.current) {
      editorRef.current.innerHTML = fullHtml;
    }

    // Generate JSON-LD Schema
    const schema = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: detectedTitle || title,
        description: detectedExcerpt || excerpt,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ambica Industries',
          url: 'https://ambicaindustry.com',
        },
        datePublished: publishDate,
      },
      null,
      2
    );
    setSchemaMarkup(schema);

    setAutoImportText('');
    setAutoImportOpen(false);
  };

  // Generate Schema JSON-LD on demand
  const handleGenerateSchema = () => {
    const schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title || 'Article Title',
      description: excerpt || 'Article Summary',
      url: canonicalUrl || `https://ambicaindustry.com/blogs/${slug}`,
      image: imageUrl || 'https://ambicaindustry.com/images/blog/default.webp',
      author: {
        '@type': 'Person',
        name: author || 'Trent Palmer',
        jobTitle: authorRole || 'Founder & Master Electrician',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ambica Industries',
        url: 'https://ambicaindustry.com',
      },
      datePublished: publishDate || new Date().toISOString().split('T')[0],
      keywords: keywords || '',
    };
    setSchemaMarkup(JSON.stringify(schemaObj, null, 2));
  };

  // Submit & Save Article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a Blog Title');
      setActiveTab('info');
      return;
    }

    if (!excerpt.trim()) {
      alert('Please enter an Excerpt / Summary');
      setActiveTab('info');
      return;
    }

    const currentContent = isCodeView ? editorHtml : (editorRef.current?.innerHTML || editorHtml);
    if (!currentContent.trim()) {
      alert('Please provide Article Content');
      setActiveTab('content');
      return;
    }

    try {
      setSaving(true);
      const takeaways = takeawaysRaw
        .split('\n')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: BlogPayload = {
        title: title.trim(),
        slug: slug.trim(),
        category,
        readTime: readTime.trim() || `${estimatedMins} min read`,
        publishDate: publishDate.trim(),
        author: author.trim(),
        authorRole: authorRole.trim(),
        imageUrl: imageUrl.trim(),
        excerpt: excerpt.trim(),
        content: currentContent,
        keyTakeaways: takeaways,
        metaTitle: metaTitle.trim(),
        canonicalUrl: canonicalUrl.trim(),
        keywords: keywords.trim(),
        metaDescription: metaDescription.trim(),
        schemaMarkup: schemaMarkup.trim(),
        isPublished,
      };

      if (article) {
        await adminService.updateBlog(article._id, payload);
      } else {
        await adminService.createBlog(payload);
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error('Failed to save blog:', err);
      alert((err as Error).message || 'Failed to save article to database');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
    >
      <div
        data-lenis-prevent
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200/90 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        
        {/* ================= MODAL HEADER ================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <FileText size={17} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {article ? 'Edit Blog Article' : 'New Blog Article'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Set article details, formatted content, and SEO metadata.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoImportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50/80 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Paste markdown or document to auto-fill all tabs"
            >
              <Sparkles size={13} className="text-amber-600" />
              Auto-Detect & Import
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ================= 4 TABS NAVIGATION ================= */}
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

        {/* ================= MODAL BODY / TAB CONTENT ================= */}
        <form
          data-lenis-prevent
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5"
        >
          
          {/* TAB 1: BLOG INFO */}
          {activeTab === 'info' && (
            <div className="border border-blue-100/80 rounded-2xl p-5 bg-white space-y-4 shadow-2xs">
              
              {/* Blog Title */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Blog Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="eg. Solar Trends 2024"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
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
                        <option key={c} value={c}>{c}</option>
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
                      onClick={handleCalculateReadTime}
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
                  onChange={handleImageFileChange}
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
                  onChange={(e) => handleExcerptChange(e.target.value)}
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
          )}

          {/* TAB 2: ARTICLE CONTENT */}
          {activeTab === 'content' && (
            <div className="border border-blue-100/80 rounded-2xl p-5 bg-white space-y-4 shadow-2xs">
              
              {/* Header row */}
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold tracking-wider text-slate-800 uppercase">
                  ARTICLE BODY CONTENT
                </span>

                <button
                  type="button"
                  onClick={() => setSmartPasteOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <FileText size={13} className="text-amber-600" />
                  Paste Any Doc — Auto Detect Formatting
                </button>
              </div>

              {/* Rich Text Editor Container */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
                
                {/* TOOLBAR */}
                <div className="bg-slate-50/90 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 text-slate-700">
                  
                  {/* B, I, U */}
                  <button
                    type="button"
                    onClick={() => executeCommand('bold')}
                    className="p-1.5 hover:bg-slate-200 rounded font-bold cursor-pointer text-xs"
                    title="Bold (Ctrl+B)"
                  >
                    <Bold size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('italic')}
                    className="p-1.5 hover:bg-slate-200 rounded italic cursor-pointer text-xs"
                    title="Italic (Ctrl+I)"
                  >
                    <Italic size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('underline')}
                    className="p-1.5 hover:bg-slate-200 rounded underline cursor-pointer text-xs"
                    title="Underline (Ctrl+U)"
                  >
                    <Underline size={14} />
                  </button>

                  <span className="text-slate-300 mx-1">|</span>

                  {/* Headings */}
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<h1>')}
                    className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<h2>')}
                    className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<h3>')}
                    className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<h4>')}
                    className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="Heading 4"
                  >
                    H4
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<h5>')}
                    className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="Heading 5"
                  >
                    H5
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<h6>')}
                    className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="Heading 6"
                  >
                    H6
                  </button>

                  <span className="text-slate-300 mx-1">|</span>

                  {/* Lists */}
                  <button
                    type="button"
                    onClick={() => executeCommand('insertUnorderedList')}
                    className="inline-flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium cursor-pointer"
                    title="Bullet List"
                  >
                    <List size={13} />
                    <span>List</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('insertOrderedList')}
                    className="inline-flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium cursor-pointer"
                    title="Numbered List"
                  >
                    <ListOrdered size={13} />
                    <span>List</span>
                  </button>

                  <span className="text-slate-300 mx-1">|</span>

                  {/* Link */}
                  <button
                    type="button"
                    onClick={handleInsertLink}
                    className="inline-flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium cursor-pointer"
                    title="Insert Link"
                  >
                    <Link2 size={13} />
                    <span>Link</span>
                  </button>

                  {/* Smart Paste Button in toolbar */}
                  <button
                    type="button"
                    onClick={() => setSmartPasteOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold cursor-pointer"
                    title="Smart Paste markdown / Google Docs"
                  >
                    <Sparkles size={13} className="text-amber-600" />
                    <span>Smart Paste</span>
                  </button>

                  <span className="text-slate-300 mx-1">|</span>

                  {/* Insert Image */}
                  <button
                    type="button"
                    onClick={handleInsertImage}
                    className="inline-flex items-center gap-1 px-2 py-1 hover:bg-blue-50 text-blue-700 rounded text-xs font-semibold cursor-pointer"
                    title="Insert Image inside content"
                  >
                    <ImageIcon size={13} />
                    <span>+ Insert Image</span>
                  </button>

                  {/* Toggle HTML Code */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!isCodeView && editorRef.current) {
                        setEditorHtml(editorRef.current.innerHTML);
                      }
                      setIsCodeView(!isCodeView);
                    }}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono font-medium cursor-pointer ${
                      isCodeView ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Toggle HTML Source"
                  >
                    <Code2 size={13} />
                    <span>{isCodeView ? 'Visual Mode' : 'HTML Code'}</span>
                  </button>

                  {/* Copy Code */}
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>

                  {/* Clear */}
                  <button
                    type="button"
                    onClick={handleClearContent}
                    className="px-2 py-1 hover:bg-rose-50 text-rose-600 rounded text-xs font-medium cursor-pointer ml-auto"
                    title="Clear content"
                  >
                    Clear
                  </button>
                </div>

                {/* STATS BAR: Word count & read time */}
                <div className="px-4 py-1.5 bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-500 font-medium">
                  {wordCount} words • {estimatedMins} min read
                </div>

                {/* EDITABLE BODY */}
                {isCodeView ? (
                  <textarea
                    value={editorHtml}
                    onChange={(e) => setEditorHtml(e.target.value)}
                    rows={16}
                    placeholder="<p>Write raw HTML code here...</p>"
                    className="w-full p-4 font-mono text-xs text-slate-900 bg-slate-900/5 focus:outline-none resize-y min-h-75"
                  />
                ) : (
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => {
                      setEditorHtml((e.target as HTMLElement).innerHTML);
                    }}
                    onBlur={(e) => {
                      setEditorHtml((e.target as HTMLElement).innerHTML);
                    }}
                    className="w-full min-h-75 max-h-115 overflow-y-auto p-4 text-sm leading-relaxed text-slate-800 focus:outline-none prose prose-slate max-w-none"
                    style={{ minHeight: '300px' }}
                  />
                )}
              </div>

              {/* Bottom Support Tip Box */}
              <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
                <span className="text-slate-500 text-sm mt-0.5">📋</span>
                <p className="leading-normal">
                  <span className="font-bold text-slate-800">Copy & Paste Support:</span> Paste directly (Ctrl+V) from{' '}
                  <span className="font-semibold text-slate-800">Google Docs, Word, ChatGPT, or Markdown</span> —
                  Headings (H1-H6), subheadings, bold (<b>**text**</b>), bullet/number lists, and links are automatically detected! Or click{' '}
                  <span className="font-bold text-amber-700">✨ Smart Paste</span>
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: SEO & META TAGS */}
          {activeTab === 'seo' && (
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
                  placeholder="SEO Title | Sunny Solar"
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
                  placeholder="https://sunnysolar.com.au/learn/blog/..."
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
                  placeholder="solar, panels, battery, inverter"
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
                    onClick={handleGenerateSchema}
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
          )}

          {/* TAB 4: CARD & ARTICLE LIVE PREVIEW */}
          {activeTab === 'preview' && (
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
          )}

          {/* ================= MODAL FOOTER ================= */}
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
                  {saving ? 'Publishing...' : article ? 'Update Article' : 'Publish Article'}
                </span>
              </button>
            </div>

          </div>

        </form>

      </div>

      {/* ================= SMART PASTE POPUP MODAL ================= */}
      {smartPasteOpen && (
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4"
        >
          <div data-lenis-prevent className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Smart Paste (Docs, Word & Markdown)
                </h4>
              </div>
              <button
                onClick={() => setSmartPasteOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
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
                onClick={() => setSmartPasteOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplySmartPaste}
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Convert & Append
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= AUTO-DETECT & IMPORT MODAL ================= */}
      {autoImportOpen && (
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4"
        >
          <div data-lenis-prevent className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Auto-Detect & Import Article
                </h4>
              </div>
              <button
                onClick={() => setAutoImportOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
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
                onClick={() => setAutoImportOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyAutoImport}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                ✨ Auto-Detect & Fill All Fields
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
