"use server";

import Item from "@/models/Item";
import connectToDB from "@/database";
import Word from "@/models/Word";
import Order from "@/models/Order";
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

export async function getRelatedItemsByTags(tags, currentItemId) {
  await connectToDB();

  try {
    // Find items that share at least one tag and exclude the current item
    const relatedItems = await Item.find({
      tags: { $in: tags }, // Items where at least one tag matches
      _id: { $ne: currentItemId }, // Exclude the current item
    }).limit(5); // Limit the number of related items (optional)

    const plainRelatedItems = relatedItems.map((item) => {
      const plainItem = item.toObject({ getters: true, versionKey: false });
      plainItem._id = plainItem._id.toString();
      return plainItem;
    });

    return plainRelatedItems;
  } catch (error) {
    console.error("Error fetching related items by tags:", error);
    return [];
  }
}

// another app

//--------------------------------------------------------------------------------------------------------

// Add Word Action

export async function addWordToDB(data) {
  await connectToDB(); // Ensure the database is connected

  const { word, price } = data;

  // Check if the word already exists
  const existingWord = await Word.findOne({ word });
  if (existingWord) {
    throw new Error("Word already exists.");
  }

  // Create a new word
  const newWord = new Word({
    word,
    price,
  });

  try {
    const savedWord = await newWord.save(); // Save the word in the database

    // Convert Mongoose document to plain JavaScript object
    const plainWord = savedWord.toObject();
    plainWord._id = plainWord._id.toString(); // Ensure _id is converted to string for the client

    return plainWord; // Return the plain JavaScript object
  } catch (error) {
    throw new Error("Error adding word to the database.");
  }
}
// Fetch All Words Action
export async function getAllWords() {
  await connectToDB(); // Ensure the database is connected

  const words = await Word.find().lean(); // Use .lean() to return plain JavaScript objects

  // Map through the words and ensure _id is converted to string
  const plainWords = words.map((word) => ({
    ...word,
    _id: word._id.toString(), // Convert _id to string
  }));

  return plainWords;
}

// Funksioni për ruajtjen e porosisë në MongoDB
// Funksion për të ruajtur porosinë dhe përditësuar fjalën
export async function saveOrder(data) {
  await connectToDB(); // Lidhja me databazën

  const { wordId, userId, payerName, amount } = data;

  // Log për të parë të dhënat e porosisë
  console.log("Saving order with data:", { wordId, userId, payerName, amount });

  try {
    // Kontrollo nëse fjala ekziston
    const word = await Word.findById(wordId);
    if (!word) {
      throw new Error("Word not found");
    }

    // Rrit numrin e porosive për këtë fjalë
    word.purchases = (word.purchases || 0) + 1;

    // Ruaj ndryshimet në fjalë
    await word.save();

    // Krijo një porosi të re në databazë
    const newOrder = new Order({
      userId,
      payerName,
      wordId,
      amount,
      purchasedAt: new Date(),
    });

    // Ruaj porosinë në databazë
    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder);

    // Kthe porosinë e ruajtur për t'u përditësuar në frontend
    return savedOrder;
  } catch (error) {
    console.error("Error saving order to MongoDB:", error); // Logimi i plotë i gabimit
    throw new Error("Error saving order to database: " + error.message);
  }
}

// Fetch Orders by Word Action
export async function getOrdersByWord(wordId) {
  await connectToDB(); // Ensure the database is connected

  const orders = await Order.find({ wordId }).lean(); // Use .lean() to return plain JavaScript objects

  // Map through the orders and ensure _id and wordId are converted to strings
  const plainOrders = orders.map((order) => ({
    ...order,
    _id: order._id.toString(), // Convert _id to string
    wordId: order.wordId.toString(), // Convert wordId to string
  }));

  return plainOrders;
}

export async function saveOrderFromWebhook(data) {
  await connectToDB(); // Lidhja me database

  const { userId, payerName, wordId, amount } = data;

  // Log të dhënat për të verifikuar se po thirret siç duhet
  console.log("Saving order from webhook with data:", {
    userId,
    payerName,
    wordId,
    amount,
  });

  const newOrder = new Order({
    userId,
    payerName,
    wordId,
    amount,
  });

  try {
    const savedOrder = await newOrder.save(); // Ruaj porosinë në MongoDB
    console.log("Order saved successfully:", savedOrder);
    return savedOrder;
  } catch (error) {
    console.error("Error saving order from webhook:", error);
    throw new Error("Error saving order from webhook.");
  }
}

export async function getWords() {
  await dbConnect(); // Connect to MongoDB
  try {
    const words = await Word.find({}).select("word"); // Fetch words from the database
    const wordList = words.map((w) => w.word); // Extract word strings
    return wordList;
  } catch (error) {
    throw new Error("Failed to fetch words");
  }
}

export async function deleteWordFromDB(wordId) {
  try {
    await connectToDB(); // Connect to MongoDB
    const result = await Word.findByIdAndDelete(wordId); // Delete the word by ID
    if (!result) throw new Error("Word not found");
    return { success: true, message: "Word deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}