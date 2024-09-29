"use client"; // This is a client-side component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser"; // To render HTML content
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // Code syntax highlighting
import { coyWithoutShadows } from "react-syntax-highlighter/dist/cjs/styles/prism"; // Clean, simple style

export default function ItemDetailClient({ item }) {
  const [mostFrequentWord, setMostFrequentWord] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // Function to count word occurrences
  const findMostFrequentWord = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove punctuation
      .split(/\s+/); // Split the text into words

    const wordMap = {};

    // Count occurrences of each word
    words.forEach((word) => {
      if (word) {
        wordMap[word] = (wordMap[word] || 0) + 1;
      }
    });

    // Find the most frequent word
    let maxCount = 0;
    let frequentWord = "";
    Object.keys(wordMap).forEach((word) => {
      if (wordMap[word] > maxCount) {
        maxCount = wordMap[word];
        frequentWord = word;
      }
    });

    return { word: frequentWord, count: maxCount };
  };

  // Custom parser for handling code tags and applying syntax highlighting for any language
  const options = {
    replace: (domNode) => {
      if (domNode.name === "code") {
        const classList = domNode.attribs ? domNode.attribs.class || "" : "";
        const match = classList.match(/language-(\w+)/); // Match the language class (e.g., "language-js", "language-python")

        // Dynamically extract the language or default to "javascript"
        const language = match ? match[1] : "javascript";
        const codeContent = domToReact(domNode.children);

        return (
          <div className="my-4">
            <SyntaxHighlighter
              language={language} // Dynamically set the language for syntax highlighting
              style={coyWithoutShadows} // Use a clean, simple syntax highlighting style
              customStyle={{
                backgroundColor: "#f4f4f4",
                padding: "16px",
                borderRadius: "4px",
                fontSize: "14px",
                border: "1px solid #e0e0e0",
                fontFamily: "'Courier New', Courier, monospace",
                overflowX: "auto",
                color: "#333",
              }}
            >
              {codeContent}{" "}
              {/* Render the code content with proper syntax highlighting */}
            </SyntaxHighlighter>
          </div>
        );
      } else if (domNode.name === "p" || domNode.name === "div") {
        return (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {" "}
            {/* Ky është ndryshimi kryesor */}
            {domToReact(domNode.children)}
          </div>
        );
      }
    },
  };

  useEffect(() => {
    // Once the component mounts, find the most frequent word in the description
    if (item.description) {
      const textContent = item.description.replace(/<[^>]+>/g, ""); // Strip out HTML tags
      const { word, count } = findMostFrequentWord(textContent);
      setMostFrequentWord(word);
      setWordCount(count);
    }
  }, [item.description]);

  return (
    <div>
      {/* Display blog post image */}
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={1000}
          height={1000}
          className="h-auto w-full rounded-md mb-4" // Add margin at the bottom
        />
      )}

      {/* Display blog post title */}
      <h1 className="text-[25px] lg:text-[35px] mt-[25px] font-bold mb-4">
        {item.title}
      </h1>

      {/* Display tags */}
      <div className="flex mt-[18px] flex-wrap gap-2 mb-4">
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

      {/* Display the most frequent word at the end of the blog */}
      <div className="mt-10">
        <h2 className="font-bold text-lg">Most Frequent Word:</h2>
        <p>
          The word "<strong>{mostFrequentWord}</strong>" was mentioned{" "}
          <strong>{wordCount}</strong> times in this blog.
        </p>
      </div>
    </div>
  );
}
