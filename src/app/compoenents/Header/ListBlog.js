"use client";
import { getAllItems } from "@/actions";
import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function ListBlog() {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState({});
  const [selectedTag, setSelectedTag] = useState("");
  const [isGridView, setIsGridView] = useState(true); // State to manage grid or list view

  useEffect(() => {
    async function fetchItems() {
      const fetchedItems = await getAllItems();
      const sortedItems = fetchedItems.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setItems(sortedItems);

      const tagCount = {};
      sortedItems.forEach((item) => {
        item.tags.forEach((tag) => {
          if (tagCount[tag]) {
            tagCount[tag] += 1;
          } else {
            tagCount[tag] = 1;
          }
        });
      });
      setTags(tagCount);
    }

    fetchItems();
  }, []);

  const formatTimeAgo = (date) => {
    if (!date) return "Invalid date";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Invalid date";
    const distance = formatDistanceToNowStrict(parsedDate);
    return `${distance.replace("about ", "").replace(" ago", "")} ago`;
  };

  const filteredItems = selectedTag
    ? items.filter((item) => item.tags.includes(selectedTag))
    : items;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-[white]">
        List of Blog
      </h1>

      {/* Toggle View Buttons */}

      <div className="flex flex-wrap ">
        {/* Sidebar with tags */}
        <div className="w-full md:w-1/4 p-4 bg-[#ffffff]">
          <div className="hidden lg:block">
            <div className="flex justify-star  mb-4">
              <button
                onClick={() => setIsGridView(true)}
                className={`px-4 py-1 mr-2 ${
                  isGridView ? "bg-[black] text-white" : "bg-gray-200"
                } rounded`}
              >
                Grid View
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`px-4 py-1 ${
                  !isGridView ? "bg-[black] text-white" : "bg-gray-200"
                } rounded`}
              >
                List View
              </button>
            </div>
          </div>
          <h2 className="text-2xl  text-[#141414] font-bold mb-4">Tags</h2>
          <ul className="list-none">
            {Object.keys(tags).map((tag) => (
              <li key={tag} className="mb-2">
                <button
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[#c2c2c2] hover:underline ${
                    selectedTag === tag ? "font-bold" : ""
                  }`}
                >
                  {tag} ({tags[tag]})
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setSelectedTag("")}
                className={`text-[#000000] hover:underline ${
                  selectedTag === "" ? "font-bold" : ""
                }`}
              >
                All Tags
              </button>
            </li>
          </ul>
        </div>
        {/* Main content */}
        <div className="w-full  md:w-2/3">
          {filteredItems.length > 0 && (
            <div>
              {/* Featured Post */}
              <Link href={`/items/${filteredItems[0].slug}`}>
                <div className="mb-[15px] p-1 bg-[#ffffff] ounded-[15px] relative hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-[350px]">
                    <Image
                      src={filteredItems[0].imageUrl}
                      alt={filteredItems[0].title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[15px]"
                    />
                    <div className="absolute bottom-4 left-4 bg-[#020202ab] text-white p-4 rounded-[15px]">
                      <p className="text-sm">
                        {formatTimeAgo(filteredItems[0].createdAt)}
                      </p>
                      <h2 className="text-3xl font-bold mt-1">
                        {filteredItems[0].title}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Grid or List of Other Posts */}
              <div
                className={`${
                  isGridView
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "flex flex-col space-y-3"
                }`}
              >
                {filteredItems.slice(1).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col p-[13px] bg-[#ffffff] rounded-lg border-[1px] hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#191a19] text-[#ffffff] p-2 rounded-lg">
                        <p className="text-xs">
                          {formatTimeAgo(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col justify-between flex-grow">
                      <h2 className="text-[19px] leading-[22px] font-semibold text-[#0c0c0c]">
                        {item.title}
                      </h2>
                      <Link href={`/items/${item.slug}`}>
                        <span className="text-blue-600 hover:underline mt-2 cursor-pointer inline-block">
                          Read More
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListBlog;
