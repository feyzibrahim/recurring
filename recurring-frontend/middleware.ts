import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authExistMiddleware } from "@/components/middleware/authExistMiddleware";
import { dashboardMiddleware } from "@/components/middleware/dashboardMiddleware";
import { manMiddleware } from "./components/middleware/manMiddleware";
import { homeMiddleware } from "./components/middleware/homeMiddleware";
import { superAdminMiddleware } from "./components/middleware/superAdminMiddleware";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log("file: middleware.ts:11 -> middleware -> path", path);

  if (path === "/login" || path === "/register" || path === "/") {
    return authExistMiddleware(req);
  } else if (path.startsWith("/dashboard")) {
    return dashboardMiddleware(req);
  } else if (path.startsWith("/man")) {
    return manMiddleware(req);
  } else if (path.startsWith("/home")) {
    return homeMiddleware(req);
  } else if (path.startsWith("/super-admin")) {
    return superAdminMiddleware(req);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/man/:path*",
    "/home/:path*",
    "/super-admin/:path*",
    "/login",
    "/register",
    "/",
  ],
};
