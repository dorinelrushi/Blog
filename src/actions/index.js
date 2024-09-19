"use server";

import Item from "@/models/Item";
import connectToDB from "@/database";
import sanitizeHtml from "sanitize-html";
import slugify from "slugify";

export async function SaveItems(data, userId) {
  await connectToDB();

  const { title, description, image, tags } = data;

  // Save the raw HTML directly from React Quill's output
  try {
    const newItem = new Item({
      title,
      description, // No sanitization or modification
      userId,
      imageUrl: image,
      tags,
      slug: slugify(title, { lower: true, strict: true }), // Generate slug
    });
    await newItem.save();
    const plainItem = newItem.toObject({ getters: true, versionKey: false });
    plainItem._id = plainItem._id.toString();
    return { success: true, data: plainItem };
  } catch (error) {
    console.error("Error saving item:", error);
    return { success: false, error: error.message };
  }
}

export async function getItems(userId) {
  await connectToDB();

  try {
    const items = await Item.find({ userId });
    const plainItems = items.map((item) => {
      const plainItem = item.toObject({ getters: true, versionKey: false });
      plainItem._id = plainItem._id.toString();
      return plainItem;
    });

    return { success: true, data: plainItems };
  } catch (error) {
    console.error("Error retrieving items:", error);
    return { success: false, error: error.message };
  }
}

export async function getItemBySlug(slug) {
  await connectToDB();
  try {
    const item = await Item.findOne({ slug });

    if (!item) {
      return null;
    }

    // Convert the Mongoose document to a plain JavaScript object
    const plainItem = item.toObject({ getters: true, versionKey: false });

    // Convert `_id` and `createdAt` to string if needed
    plainItem._id = plainItem._id.toString();
    plainItem.createdAt = plainItem.createdAt.toISOString();

    return plainItem;
  } catch (error) {
    console.error("Error fetching item by slug:", error);
    return null;
  }
}
//get all items from db

export async function getAllItems() {
  await connectToDB();
  const items = await Item.find({});
  // Convert Mongoose documents to plain JavaScript objects
  const plainItems = items.map((item) => {
    const plainItem = item.toObject({ getters: true, versionKey: false });
    plainItem._id = plainItem._id.toString();
    return plainItem;
  });

  return plainItems;
}

// Delete item by ID
export async function deleteItemById(id) {
  await connectToDB();

  try {
    const item = await Item.findById(id);
    if (!item) {
      return { success: false, error: "Item does not exist" };
    }

    await Item.deleteOne({ _id: id });
    return { success: true };
  } catch (error) {
    console.error("Error deleting item:", error);
    return { success: false, error: error.message };
  }
}

//update
export async function updateItem(data, userId, slug) {
  await connectToDB();
  const { title, description, image, tags } = data;

  try {
    const item = await Item.findOne({ slug, userId }); // Find the item by slug and userId
    if (!item) {
      return { success: false, error: "Item not found" };
    }

    // Update fields
    item.title = title || item.title;
    item.description = description || item.description;
    item.imageUrl = image || item.imageUrl;
    item.tags = tags || item.tags;

    // If the title is updated, regenerate the slug
    if (title && title !== item.title) {
      item.slug = slugify(title, { lower: true, strict: true });
    }

    await item.save();
    const updatedItem = item.toObject({ getters: true, versionKey: false });
    updatedItem._id = updatedItem._id.toString();

    return { success: true, data: updatedItem };
  } catch (error) {
    console.error("Error updating item:", error);
    return { success: false, error: error.message };
  }
}
