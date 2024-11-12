import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/items/:slug*",
    "/Contact",
    "/api/send-email",
    "/Asset",
    "/Derivatives",
    "/not-found",
  ], // Public access to homepage and blog post slugs
});

// Clerk middleware configuration
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
