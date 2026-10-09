export const CATEGORIES = [
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

export function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>');
}

export function markdownToHtml(raw: string): string {
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

  for (const line of lines) {
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
