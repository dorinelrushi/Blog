"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SaveItems } from "@/actions";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break"; // For handling line breaks
import Paragraph from "@tiptap/extension-paragraph"; // For paragraph handling
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faCode,
  faListOl,
  faListUl,
  faLink,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

function FormInput() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Code,
      BulletList,
      OrderedList,
      Paragraph, // Proper paragraph handling
      HardBreak, // Handles shift+enter for line breaks
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
        },
      }),
      Image,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

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
      alert("Item Saved");
      setTitle("");
      setDescription("");
      editor.commands.clearContent();
      setImage(null);
      setTags([]);
      router.push("/");
    } else {
      alert("Failed to save item: " + result.error);
    }
  };

  if (!editor) {
    return null;
  }

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

        {/* Toolbar with Icons */}
        <div className="toolbar flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt("Enter the link URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt("Enter the image URL");
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <FontAwesomeIcon icon={faImage} />
          </button>
        </div>

        {/* Editor Content */}
        <div className="editor-container mb-8 border rounded p-2">
          <EditorContent
            editor={editor}
            className="h-[280px] max-h-[500px] overflow-y-auto tracking-wide leading-relaxed"
          />
        </div>

        <input
          type="file"
          onChange={handleImageChange}
          className="p-2 w-[80%] mt-[20px] lg:mt-[5px] lg:w-[15%] rounded bg-gray-100 border"
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
