import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export const checkUserWithoutRedirectInManager = async () => {
  const data = await actualServerCommonRequest({
    route: API_ROUTES.AUTH,
    method: "GET",
    url: "/user",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.success) {
    redirect("/");
  }

  if (data.user && !data.user.isEmailVerified) {
    redirect("/email-validation");
  }

  if (data.user && data.user.role && data.user.role === "owner") {
    redirect("/dashboard");
  }

  if (data.user) {
    return data.user;
  }
};