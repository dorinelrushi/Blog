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
  const [isGridView, setIsGridView] = useState(true); // State to manage grid or list view
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
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
          className="w-[91%] p-2 border border-[#272727] bg-[black] rounded"
        />
      </div>

      {/* Toggle View Buttons */}
      <div className="flex flex-wrap">
        {/* Sidebar with tags */}
        <div className="w-full md:w-1/4 p-4 bg-[#000000fd]">
          {/* For Desktop */}
          <div className="hidden lg:block">
            <div className="flex justify-star mb-4">
              <button
                onClick={() => setIsGridView(true)}
                className={`px-4 py-1 mr-2 ${
                  isGridView ? "bg-[#4f7dfa] text-white" : "bg-[#000000]"
                } rounded`}
              >
                Grid View
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`px-4 py-1 ${
                  !isGridView ? "bg-[#4f7dfa] text-white" : "bg-[#020202]"
                } rounded`}
              >
                List View
              </button>
            </div>
          </div>

          <h2 className="text-2xl text-[#f0f0f0] font-bold mb-4">Tags</h2>

          {/* Dropdown for mobile view */}
          <div className="lg:hidden mb-4">
            <button
              className="bg-[#111111fd] text-[white] px-4 py-2 rounded-lg w-full"
              onClick={() => setIsMobileTagOpen(!isMobileTagOpen)}
            >
              {isMobileTagOpen ? "Hide Tags" : "Show Tags"}
            </button>
            {isMobileTagOpen && (
              <div className="mt-4 bg-[#111111fd] border border-[#242323] rounded-lg p-4">
                <ul className="list-none">
                  {Object.keys(tags).map((tag) => (
                    <li key={tag} className="mb-2">
                      <button
                        onClick={() => setSelectedTag(tag)}
                        className={`text-[#fcfbfb] hover:underline ${
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
                      className={`text-[#ffffff] hover:underline ${
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
                    className={`text-[#ffffff] hover:underline ${
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
                  className={`text-[#ffffff] hover:underline ${
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
                <div className="mb-[15px] p-[10px] bg-[#161616fd]  rounded-[10px] relative hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-[350px]">
                    <Image
                      src={filteredItems[0].imageUrl}
                      alt={filteredItems[0].title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[10px]"
                      priority
                    />
                    <div className="absolute bottom-4 left-4 bg-[#1f5ab3] text-[#f3f1f1] p-4 rounded-[10px]">
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
                  <Link
                    className="hoverFlex flex flex-col rounded-[15px] p-[13px] bg-[#1d1c1cab] text-[white]   transition-shadow duration-300"
                    key={item._id}
                    href={`/items/${item.slug}`}
                  >
                    <div>
                      <div className="relative h-48">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-[15px]"
                        />
                        <div className="absolute bottom-2 left-2 bg-[#191a19] text-[#ffffff] p-2 rounded-lg">
                          <p className="text-xs">
                            {formatTimeAgo(item.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col justify-between flex-grow">
                        <h2 className="text-[17px] leading-[22px] font-semibold text-[#ffffff]">
                          {item.title}
                        </h2>

                        <span className="texthover bg-[#4f7dfa] rounded-[5px] w-[118px] py-[4px] flex justify-center hover:underline mt-[18px] cursor-pointer ">
                          Read More
                        </span>
                      </div>
                    </div>
                  </Link>
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
