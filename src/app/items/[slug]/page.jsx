import { clerkClient } from "@clerk/nextjs/server";
import { getItemBySlug } from "@/actions";
import ItemDetailClient from "./ItemDetailClient";

export default async function ItemDetail({ params }) {
  // Await params.slug since params is asynchronous
  const { slug } = await params; // Await `params` here

  if (!slug) {
    console.error("Slug is missing or invalid:", slug);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">Invalid URL</h1>
      </div>
    );
  }

  // Fetch the item by slug
  const item = await getItemBySlug(slug);

  if (!item) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">Item Not Found</h1>
      </div>
    );
  }

  if (!item?.userId) {
    console.error("User ID is missing or invalid:", item);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">Author Not Found</h1>
      </div>
    );
  }

  try {
    const user = await (await clerkClient()).users.getUser(item.userId);

    if (!user) {
      console.error("User not found:", item.userId);
      return (
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold">Author Not Found</h1>
        </div>
      );
    }

    const authorPlain = {
      firstName: user.firstName || "Unknown",
      lastName: user.lastName || "User",
      profileImageUrl: user.profileImageUrl || null,
    };

    return (
      <div className="blogPost w-[99%] lg:w-[56%] mx-auto p-6">
        <ItemDetailClient item={item} author={authorPlain} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching author data:", error);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">Error Fetching Author</h1>
      </div>
    );
  }
}
