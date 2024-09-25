"use client"; // This is a client-side component

import React from "react";
import Image from "next/image";
import parse from "html-react-parser"; // To render HTML content

export default function ItemDetailClient({ item }) {
  return (
    <div>
      {/* Display blog post image */}
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={1000}
          height={1000}
          className="h-auto w-full rounded-md"
        />
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
      <div className="mt-10 text-[14px] lg:text-[20px]">
        {parse(item.description)}
      </div>
    </div>
  );
}
