import { marked } from 'marked';
import DOMPurify from 'dompurify';

const MarkdownRenderer = ({ markdownContent }) => {
  // Convert Markdown to HTML using the marked library
  const rawMarkup = marked.parse(markdownContent);

  // Sanitize the HTML using DOMPurify
  const sanitizedHTML = DOMPurify.sanitize(rawMarkup);

  // Render sanitized HTML using React and add Tailwind CSS classes
  return (
    <div
      className="prose prose-lg mx-auto"  // Tailwind CSS classes
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};


export default MarkdownRenderer
