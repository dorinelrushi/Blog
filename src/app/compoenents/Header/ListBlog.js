"use client";
import { getAllItems } from "@/actions"; // Assuming this is an API call to fetch blog items
import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns"; // For date formatting
import Image from "next/image"; // For optimized image handling in Next.js
import Link from "next/link"; // For internal linking in Next.js

function ListBlog() {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState({});
  const [selectedTag, setSelectedTag] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  1; // State to manage search input
  const [isMobileTagOpen, setIsMobileTagOpen] = useState(false); // State to manage mobile dropdown visibility

  useEffect(() => {
    async function fetchItems() {
      const fetchedItems = await getAllItems();

      // Sort items by creation date in descending order (newest first)
      const sortedItems = fetchedItems.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setItems(sortedItems);

      // Aggregating tags and their counts
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

  // Filtered items based on search query and selected tag
  const filteredItems = items
    .filter((item) => (selectedTag ? item.tags.includes(selectedTag) : true))
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="container mx-auto p-4 mt-[30px]">
      {/* Search Box */}
      <div className="mb-[30px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blog title..."
          className="w-[91%] p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Toggle View Buttons */}
      <div className="flex flex-wrap">
        {/* Sidebar with tags */}
        <div className="w-full md:w-1/4 p-4 bg-[#ffffff]">
          {/* For Desktop */}
          <div className="hidden lg:block">
            <div className="flex justify-star mb-4">
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

          <h2 className="text-2xl text-[#141414] font-bold mb-4">Tags</h2>

          {/* Dropdown for mobile view */}
          <div className="lg:hidden mb-4">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded-lg w-full"
              onClick={() => setIsMobileTagOpen(!isMobileTagOpen)}
            >
              {isMobileTagOpen ? "Hide Tags" : "Show Tags"}
            </button>
            {isMobileTagOpen && (
              <div className="mt-4 bg-white border rounded-lg p-4">
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
            )}
          </div>
          {/* Tags for larger screens */}
          <div className="hidden lg:block">
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
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3">
          {filteredItems.length > 0 && (
            <div>
              {/* Featured Post */}
              <Link href={`/items/${filteredItems[0].slug}`}>
                <div className="mb-[15px] p-1 bg-[#ffffff] rounded-[15px] relative hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-[350px]">
                    <Image
                      src={filteredItems[0].imageUrl}
                      alt={filteredItems[0].title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[15px]"
                      priority
                    />
                    <div className="absolute bottom-4 left-4 bg-[#020202ab] text-white p-4 rounded-[15px]">
                      <p className="text-sm">
                        {formatTimeAgo(filteredItems[0].createdAt)}
                      </p>
                      <h2 className="text-[20px] lg:text-3xl font-bold mt-1">
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
                    key={item._id}
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
