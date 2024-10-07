import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/items/:slug*",
    "/Words",
    "/HowWorks",
    "/About",
    "/OurMission",
    "/Share",
    "/api/send-email",
  ], // Public access to homepage and blog post slugs
});

// Clerk middleware configuration
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
