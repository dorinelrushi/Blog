import { getItemBySlug } from "@/actions";
import { clerkClient } from "@clerk/nextjs/server"; // Clerk server-side API
import ItemDetailClient from "./ItemDetailClient"; // Client component for rendering the UI

export default async function ItemDetail({ params }) {
  const { slug } = params;
  const item = await getItemBySlug(slug);

  if (!item) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">Item Not Found</h1>
      </div>
    );
  }

  // Fetch the user data (author) from Clerk using userId
  const author = await clerkClient.users.getUser(item.userId);

  // Convert the user data to plain object (extract needed fields)
  const authorPlain = {
    firstName: author.firstName,
    lastName: author.lastName,
    profileImageUrl: author.profileImageUrl, // Clerk user's profile image
  };

  return (
    <div className="blogPost w-[99%] lg:w-[65%] mx-auto p-6">
      {/* Pass the item and author data as plain objects to the client component */}
      <ItemDetailClient item={item} author={authorPlain} />
    </div>
  );
}
