import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { API_ROUTES } from "./lib/routes";

export async function middleware(req: NextRequest) {
  try {
    const access_token = req.cookies.get("access_token")?.value;
    const refresh_token = req.cookies.get("refresh_token")?.value;

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
        } else {
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
