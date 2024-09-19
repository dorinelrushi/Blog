"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { updateItem, getItemBySlug } from "@/actions";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ bold: true }, { italic: true }, { underline: true }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "link",
];

function UpdateInput({ slug }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { user } = useUser();
  const router = useRouter();

  // Fetch the current item data by slug
  useEffect(() => {
    async function fetchItem() {
      const response = await getItemBySlug(slug); // Fetch item data from the server
      if (response) {
        setTitle(response.title);
        setDescription(response.description);
        setImage(response.imageUrl);
        setTags(response.tags);
      } else {
        alert("Failed to load item data.");
      }
    }
    fetchItem();
  }, [slug]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault();
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle the form submission for updating the item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to submit the form");
      return;
    }

    const result = await updateItem(
      { title, description, image, tags },
      user.id,
      slug
    );
    if (result.success) {
      alert("Item Updated");
      router.push("/"); // Redirect after successful update
    } else {
      alert("Failed to update item: " + result.error);
    }
  };

  return (
    <div className="p-1 lg:p-[40px] m-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          placeholder="Name your item"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          formats={formats}
          className="h-60 mb-8"
          placeholder="Describe your item"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="p-2 w-[80%] mt-[50px] lg:mt-[5px] lg:w-[15%] rounded bg-gray-100 border"
        />
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            className="p-2 border rounded"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 p-2 bg-[#1f1f1f] text-[white] rounded"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="text-[#9ff82b]"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="p-3 w-full rounded bg-[#1f1f1f] text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateInput;
