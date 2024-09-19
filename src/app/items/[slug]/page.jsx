import { getItemBySlug } from "@/actions";
import React from "react";
import Image from "next/image";
import parse from "html-react-parser"; // Import html-react-parser to render HTML

const ItemDetail = async ({ params }) => {
  const { slug } = params;
  const item = await getItemBySlug(slug);

  if (!item) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">Item Not Found</h1>
      </div>
    );
  }

  return (
    <div className="blogPost w-[65%]  mx-auto p-6">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={1000}
          height={1000}
          className="h-auto rounded-md"
        />
      )}
      <h1 className="text-[35px] mt-[25px] font-bold">{item.title}</h1>
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
      <div className="mt-10 text-[20px]">
        {/* Use html-react-parser to safely render the HTML content */}
        {parse(item.description)}
      </div>
    </div>
  );
};

export default ItemDetail;
