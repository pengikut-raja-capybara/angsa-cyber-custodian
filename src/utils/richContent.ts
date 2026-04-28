import DOMPurify from 'dompurify';
import { marked } from 'marked';

/**
 * Deteksi apakah konten adalah HTML atau Markdown.
 */
export type ContentFormat = 'markdown' | 'html';

const HTML_BLOCK_START_PATTERN = /^\s*<(p|div|h[1-6]|ul|ol|li|blockquote|pre|code|table|article|section|header|footer|nav|main|figure|aside|details|summary|br|hr|img|a)\b/i;

function detectContentFormat(content: string): ContentFormat {
  const trimmed = content.trim();
  if (!trimmed) return 'markdown';
  return HTML_BLOCK_START_PATTERN.test(trimmed) ? 'html' : 'markdown';
}

function parseMarkdownToHtml(markdown: string): string {
  const result = marked.parse(markdown, {
    async: false,
    gfm: true,
    breaks: true,
  });
  return typeof result === 'string' ? result : '';
}

/**
 * Mengonversi string (Markdown atau HTML) menjadi HTML yang aman (sanitized).
 */
export function toSafeHtml(content: string | undefined): string {
  if (!content) return '';
  
  const trimmed = content.trim();
  const format = detectContentFormat(trimmed);
  const rawHtml = format === 'html' ? trimmed : parseMarkdownToHtml(trimmed);

  return DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
  });
}
