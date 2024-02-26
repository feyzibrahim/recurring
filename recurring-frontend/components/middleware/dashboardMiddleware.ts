import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_ROUTES } from "@/lib/routes";

export async function dashboardMiddleware(req: NextRequest) {
  try {
    const access_token = req.cookies.get("access_token")?.value;
    const refresh_token = req.cookies.get("refresh_token")?.value;
    if (!access_token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const data = await fetch(`${API_ROUTES.AUTH}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${access_token}; refresh_token=${refresh_token}`,
      },
    });
    let json = await data.json();
    if (!json.success) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      if (json.success) {
        if (json.user.role === "employee") {
          return NextResponse.redirect(new URL("/home", req.url));
        }
        if (json.user.role === "manager") {
          return NextResponse.redirect(new URL("/man", req.url));
        }
      }
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}
