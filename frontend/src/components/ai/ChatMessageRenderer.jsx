import React from "react";

/**
 * Custom Rich Chat Message Renderer
 * Converts Markdown formatting (bold, lists, checkmarks, headers, links)
 * into modern, styled typography elements for optimal user experience.
 */
const ChatMessageRenderer = ({ content, role }) => {
  if (!content) return null;

  // Split into lines to render lists, headers, and paragraphs
  const lines = content.split("\n");

  const renderFormattedInlineText = (text) => {
    // Regex matching bold **text** or *text* or checkmark ✓
    const parts = text.split(/(\*\*.*?\*\*|✓|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part === "✓") {
        return (
          <span key={index} className="inline-flex items-center justify-center w-4 h-4 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full mr-1">
            ✓
          </span>
        );
      }
      if (part.startsWith("[") && part.includes("](")) {
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          return (
            <a
              key={index}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 font-semibold underline hover:text-brand-800"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className={`space-y-1.5 text-xs sm:text-sm leading-relaxed ${role === "user" ? "text-white" : "text-gray-800"}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header 3 / 2
        if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
          return (
            <h4 key={idx} className="font-bold text-sm sm:text-base text-gray-900 mt-2 mb-1 border-b border-stone-100 pb-1">
              {renderFormattedInlineText(trimmed.replace(/^#+\s*/, ""))}
            </h4>
          );
        }

        // Bullet point list item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start space-x-2 my-1 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
              <div className="flex-1">{renderFormattedInlineText(trimmed.slice(2))}</div>
            </div>
          );
        }

        // Numbered list item
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start space-x-2 my-1 pl-1">
              <span className="font-bold text-brand-700 text-xs shrink-0">{numMatch[1]}.</span>
              <div className="flex-1">{renderFormattedInlineText(numMatch[2])}</div>
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="my-0.5">
            {renderFormattedInlineText(line)}
          </p>
        );
      })}
    </div>
  );
};

export default ChatMessageRenderer;
