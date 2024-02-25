import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { API_ROUTES } from "./lib/routes";
import { cookies } from "next/headers";

export async function middleware() {
  try {
    const cookieObj = cookies();

    const access_token = cookieObj.get("access_token");

    const refresh_token = cookieObj.get("refresh_token");

    const data = await fetch(`${API_ROUTES.AUTH}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${access_token}; refresh_token=${refresh_token}`,
      },
    });
    let json = await data.json();
    if (!json.success) {
      return NextResponse.redirect("/");
    } else {
      if (json.success) {
        if (json.user.role === "employee") {
          return NextResponse.redirect("/home");
        }
        if (json.user.role === "manager") {
          return NextResponse.redirect("/man");
        }
        if (json.user.role === "owner") {
          return NextResponse.redirect("/dashboard");
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/:path*"],
};
