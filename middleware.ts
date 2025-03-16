import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/shop(.*)",
  "/grading",
  "/contact",
  "/api/(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (!publicRoutes(req)) {
    const session = await auth();
    if (!session.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};

