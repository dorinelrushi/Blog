"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getItems, deleteItemById } from "@/actions"; // Import server actions

function Page() {
  const { user } = useUser();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      if (user) {
        const response = await getItems(user.id); // Call the server action
        if (response.success) {
          // Sort items by 'createdAt' in descending order (newest first)
          const sortedItems = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setItems(sortedItems);
        } else {
          console.error("Error fetching items:", response.error);
        }
      }
    }

    fetchItems();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      const response = await deleteItemById(id); // Call the server action
      if (response.success) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Remove item from state
      } else {
        console.error(response.error);
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  if (!user) {
    return <p>Please log in to see your items.</p>;
  }

  if (items.length === 0) {
    return <p>No items found. Create your first item!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="text-center m-auto mb-[65px]">
        <h1 className="text-[45px] font-bold mb-[15px] text-[#1f1f1f]">
          My Latest Blog 🔥
        </h1>
        <p className="max-w-[790px] text-center m-auto mb-[30px] text-[#5e5e5e]">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
          Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
          Suspendisse urna nibh viverra non semper suscipit.
        </p>
        <Link
          className=" bg-[black] text-[white] rounded-[8px] px-[28px] py-[18px]"
          href="/AddBlog"
        >
          Create New Blog
        </Link>
      </div>
      <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={900}
                height={1000}
                className="h-auto rounded-md"
              />
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-2 text-[13px] bg-[#e7e8e9] text-[#646464] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-[15px] items-center mt-[25px]">
              <Link
                href={`/items/${item.slug}`}
                className="text-black hover:underline"
              >
                View Details
              </Link>
              <Link
                href={`/update/${item.slug}`} // Link to the update page
                className="p-[5px] px-[19px] rounded-[5px] bg-[#141414] text-[white]"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item._id)} // Handle item deletion
                className="p-[5px] px-[19px] rounded-[5px] bg-[#f53e3e] text-[white] hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
