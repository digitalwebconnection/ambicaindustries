import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Sparkles,
  Code2,
  Copy,
  Check,
  FileText,
} from 'lucide-react';

interface BlogContentTabProps {
  editorHtml: string;
  setEditorHtml: (html: string) => void;
  isCodeView: boolean;
  setIsCodeView: (val: boolean) => void;
  copiedCode: boolean;
  onCopyCode: () => void;
  onClearContent: () => void;
  onInsertLink: () => void;
  onInsertImage: () => void;
  executeCommand: (command: string, value?: string) => void;
  onOpenSmartPaste: () => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  wordCount: number;
  estimatedMins: number;
}

export default function BlogContentTab({
  editorHtml,
  setEditorHtml,
  isCodeView,
  setIsCodeView,
  copiedCode,
  onCopyCode,
  onClearContent,
  onInsertLink,
  onInsertImage,
  executeCommand,
  onOpenSmartPaste,
  editorRef,
  wordCount,
  estimatedMins,
}: BlogContentTabProps) {
  return (
    <div className="border border-blue-100/80 rounded-2xl p-5 bg-white space-y-4 shadow-2xs">
      {/* Header row */}
      <div className="flex items-center justify-between pb-1">
        <span className="text-xs font-bold tracking-wider text-slate-800 uppercase">
          ARTICLE BODY CONTENT
        </span>

        <button
          type="button"
          onClick={onOpenSmartPaste}
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
            onClick={onInsertLink}
            className="inline-flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium cursor-pointer"
            title="Insert Link"
          >
            <Link2 size={13} />
            <span>Link</span>
          </button>

          {/* Smart Paste Button in toolbar */}
          <button
            type="button"
            onClick={onOpenSmartPaste}
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
            onClick={onInsertImage}
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
            onClick={onCopyCode}
            className="inline-flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium cursor-pointer"
            title="Copy Code"
          >
            {copiedCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={onClearContent}
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
          <span className="font-bold text-slate-800">Copy &amp; Paste Support:</span> Paste directly (Ctrl+V) from{' '}
          <span className="font-semibold text-slate-800">Google Docs, Word, ChatGPT, or Markdown</span> — Headings
          (H1-H6), subheadings, bold (<b>**text**</b>), bullet/number lists, and links are automatically detected! Or
          click <span className="font-bold text-amber-700">✨ Smart Paste</span>
        </p>
      </div>
    </div>
  );
}
