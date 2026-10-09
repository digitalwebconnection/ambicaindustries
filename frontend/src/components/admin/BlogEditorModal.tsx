import { useState, useEffect, useRef } from 'react';
import type { BlogArticle } from '@/types/blog';
import { adminService, type BlogPayload } from '@/services/adminService';
import {
  BlogEditorHeader,
  BlogEditorTabs,
  BlogDetailsTab,
  BlogContentTab,
  BlogSeoTab,
  BlogPreviewTab,
  BlogEditorFooter,
  SmartPasteModal,
  AutoImportModal,
  markdownToHtml,
  type EditorTabType,
} from './blogEditor';

interface BlogEditorModalProps {
  isOpen: boolean;
  article: BlogArticle | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function BlogEditorModal({
  isOpen,
  article,
  onClose,
  onSaved,
}: BlogEditorModalProps) {
  const [activeTab, setActiveTab] = useState<EditorTabType>('info');
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

  const handleInsertLink = () => {
    if (isCodeView) return;
    const url = window.prompt('Enter link URL (e.g. https://example.com):', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleInsertImage = () => {
    if (isCodeView) return;
    const url = window.prompt('Enter image URL or path (e.g. /images/blog/diagram.webp):');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const handleClearContent = () => {
    if (window.confirm('Are you sure you want to clear the article content?')) {
      setEditorHtml('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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

  const handleApplyAutoImport = () => {
    if (!autoImportText.trim()) return;
    const lines = autoImportText.split(/\r?\n/).map((l) => l.trim());

    let detectedTitle = '';
    const headingLine = lines.find((l) => l.startsWith('# ') || l.startsWith('Title:'));
    if (headingLine) {
      detectedTitle = headingLine.replace(/^(#\s*|Title:\s*)/i, '').trim();
    } else {
      detectedTitle = lines.find((l) => l.length > 5) || 'New Article';
    }

    let detectedExcerpt = '';
    const summaryLine = lines.find((l) => l.toLowerCase().startsWith('summary:') || l.toLowerCase().startsWith('excerpt:'));
    if (summaryLine) {
      detectedExcerpt = summaryLine.replace(/^(summary:|excerpt:)\s*/i, '').trim();
    } else {
      const para = lines.find((l) => l.length > 30 && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('*'));
      detectedExcerpt = para || '';
    }

    const bulletLines = lines
      .filter((l) => /^[-*•]\s+/.test(l))
      .map((l) => l.replace(/^[-*•]\s+/, '').trim())
      .slice(0, 5);

    const fullHtml = markdownToHtml(autoImportText);

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
        {/* Modal Header */}
        <BlogEditorHeader
          isEditing={Boolean(article)}
          onOpenAutoImport={() => setAutoImportOpen(true)}
          onClose={onClose}
        />

        {/* Tabs Bar */}
        <BlogEditorTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Modal Form Content */}
        <form
          data-lenis-prevent
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5"
        >
          {/* Tab 1: Details & Media */}
          {activeTab === 'info' && (
            <BlogDetailsTab
              title={title}
              onTitleChange={handleTitleChange}
              slug={slug}
              setSlug={setSlug}
              setCanonicalUrl={setCanonicalUrl}
              category={category}
              setCategory={setCategory}
              readTime={readTime}
              setReadTime={setReadTime}
              onCalculateReadTime={handleCalculateReadTime}
              author={author}
              setAuthor={setAuthor}
              authorRole={authorRole}
              setAuthorRole={setAuthorRole}
              publishDate={publishDate}
              setPublishDate={setPublishDate}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              uploadingImage={uploadingImage}
              onImageFileChange={handleImageFileChange}
              fileInputRef={fileInputRef}
              excerpt={excerpt}
              onExcerptChange={handleExcerptChange}
              takeawaysRaw={takeawaysRaw}
              setTakeawaysRaw={setTakeawaysRaw}
            />
          )}

          {/* Tab 2: Article Body Content */}
          {activeTab === 'content' && (
            <BlogContentTab
              editorHtml={editorHtml}
              setEditorHtml={setEditorHtml}
              isCodeView={isCodeView}
              setIsCodeView={setIsCodeView}
              copiedCode={copiedCode}
              onCopyCode={handleCopyCode}
              onClearContent={handleClearContent}
              onInsertLink={handleInsertLink}
              onInsertImage={handleInsertImage}
              executeCommand={executeCommand}
              onOpenSmartPaste={() => setSmartPasteOpen(true)}
              editorRef={editorRef}
              wordCount={wordCount}
              estimatedMins={estimatedMins}
            />
          )}

          {/* Tab 3: SEO & Meta Tags */}
          {activeTab === 'seo' && (
            <BlogSeoTab
              title={title}
              slug={slug}
              excerpt={excerpt}
              metaTitle={metaTitle}
              setMetaTitle={setMetaTitle}
              canonicalUrl={canonicalUrl}
              setCanonicalUrl={setCanonicalUrl}
              keywords={keywords}
              setKeywords={setKeywords}
              metaDescription={metaDescription}
              setMetaDescription={setMetaDescription}
              schemaMarkup={schemaMarkup}
              setSchemaMarkup={setSchemaMarkup}
              onGenerateSchema={handleGenerateSchema}
            />
          )}

          {/* Tab 4: Live Card & Hero Preview */}
          {activeTab === 'preview' && (
            <BlogPreviewTab
              title={title}
              slug={slug}
              category={category}
              readTime={readTime}
              estimatedMins={estimatedMins}
              author={author}
              publishDate={publishDate}
              imageUrl={imageUrl}
              excerpt={excerpt}
              wordCount={wordCount}
              isPublished={isPublished}
            />
          )}

          {/* Modal Footer Controls */}
          <BlogEditorFooter
            isPublished={isPublished}
            setIsPublished={setIsPublished}
            saving={saving}
            isEditing={Boolean(article)}
            onClose={onClose}
          />
        </form>
      </div>

      {/* Smart Paste Popup Modal */}
      <SmartPasteModal
        isOpen={smartPasteOpen}
        onClose={() => setSmartPasteOpen(false)}
        smartPasteText={smartPasteText}
        setSmartPasteText={setSmartPasteText}
        onApply={handleApplySmartPaste}
      />

      {/* Auto-Detect & Import Modal */}
      <AutoImportModal
        isOpen={autoImportOpen}
        onClose={() => setAutoImportOpen(false)}
        autoImportText={autoImportText}
        setAutoImportText={setAutoImportText}
        onApply={handleApplyAutoImport}
      />
    </div>
  );
}
