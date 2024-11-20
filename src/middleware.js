import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/items/:slug*", // Allow public access to dynamic blog post routes
    "/Contact",
    "/BlogPosts",
    "/Home",
    "/api/send-email",
    "/Asset",
    "/Derivatives",
    "/not-found",
    "/CryptoNews",
    "/api/data",
    "/TestApi",
    // Add this temporarily to prevent redirection issue
  ], // Public access to homepage and blog post slugs
});

// Clerk middleware configuration
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
