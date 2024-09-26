"use client"; // This is a client-side component

import React from "react";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser"; // To render HTML content
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // Code syntax highlighting
import { coyWithoutShadows } from "react-syntax-highlighter/dist/cjs/styles/prism"; // Clean, simple style

export default function ItemDetailClient({ item }) {
  // Custom parser for handling code tags and applying syntax highlighting
  const options = {
    replace: (domNode) => {
      if (domNode.name === "code") {
        const classList = domNode.attribs ? domNode.attribs.class || "" : "";
        const match = classList.match(/language-(\w+)/); // Extract language if present

        // If the class contains a language, extract it, otherwise default to javascript
        const language = match ? match[1] : "javascript";
        const codeContent = domToReact(domNode.children);

        return (
          <div className="my-4">
            <SyntaxHighlighter
              language={language}
              style={coyWithoutShadows} // Using a simple, clean theme
              customStyle={{
                backgroundColor: "#f4f4f4", // Very light background
                padding: "16px", // Keep padding to give breathing space
                borderRadius: "4px", // Small rounded corners
                fontSize: "14px", // Slightly smaller font size for simplicity
                border: "1px solid #e0e0e0", // Minimal border
                fontFamily: "'Courier New', Courier, monospace", // Simple monospace font
                overflowX: "auto", // Allow horizontal scrolling for long lines
                color: "#333", // Darker text for good readability
              }}
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        );
      } else if (domNode.name === "p" || domNode.name === "div") {
        // Ensure paragraph breaks and <br> tags are rendered correctly with line breaks
        return (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {domToReact(domNode.children)}
          </div>
        );
      }
    },
  };

  return (
    <div>
      {/* Display blog post image */}
      {item.imageUrl && (
        <div>
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={1000}
            height={1000}
            className="h-auto w-full rounded-md"
          />

          {/* Share buttons */}
          <div className="mt-4 flex space-x-4">
            {/* Twitter Share */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                item.imageUrl
              )}&text=${encodeURIComponent(item.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Share on Twitter
            </a>

            {/* LinkedIn Share */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                item.imageUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              Share on LinkedIn
            </a>
          </div>
        </div>
      )}

      {/* Display blog post title */}
      <h1 className="text-[25px] lg:text-[35px] mt-[25px] font-bold">
        {item.title}
      </h1>

      {/* Display tags */}
      <div className="flex mt-[18px] flex-wrap gap-2">
        {item.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Display the blog post content */}
      <div className="mt-10 text-[14px] lg:text-[20px] leading-relaxed">
        {parse(item.description, options)}{" "}
        {/* Use custom options for parsing */}
      </div>
    </div>
  );
}
