"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SaveItems } from "@/actions";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Custom toolbar configuration
const modules = {
  toolbar: [
    [{ bold: true }, { italic: true }, { underline: true }], // Text styling options
    [{ list: "ordered" }, { list: "bullet" }], // List options
    [{ align: [] }], // Alignment
    ["link"], // Link only, removed 'image'
    ["clean"], // Remove formatting button
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

function FormInput() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const { user } = useUser();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to submit the form");
      return;
    }

    const result = await SaveItems(
      { title, description, image, tags },
      user.id
    );
    if (result.success) {
      setTitle("");
      setDescription("");
      setImage(null);
      setTags([]);
      alert("Item Saved");
      window.location.reload();
    } else {
      alert("Failed to save item: " + result.error);
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
          required
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
          className="p-3 w-full rounded bg-[#1f1f1f] text-white "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormInput;
