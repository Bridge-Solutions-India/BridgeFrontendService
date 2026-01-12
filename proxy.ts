// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ Public routes (no auth required)
  const publicRoutes = ["/login", "/register", "/"];

  // 2️⃣ Check auth token (cookie-based example)
  const authToken = request.cookies.get("auth_token")?.value;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 3️⃣ Redirect unauthenticated users
  if (!authToken && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 4️⃣ Prevent logged-in users from accessing auth pages
  if (authToken && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 5️⃣ Allow request to continue
  return NextResponse.next();
}

// 6️⃣ Middleware matcher
export const config = {
  matcher: [
    /*
      Match all routes except:
      - API routes
      - static files
      - image optimization
      - favicon
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
