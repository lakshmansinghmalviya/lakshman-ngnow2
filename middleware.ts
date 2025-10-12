import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/user(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect(); // 🔒 Enforces authentication
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Run for all routes except static files
};
