import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export const checkUserWithoutRedirect = async () => {
  const data = await actualServerCommonRequest({
    route: API_ROUTES.AUTH_SERVER,
    method: "GET",
    url: "/api/user",
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

  if (data.user && data.user.role && data.user.role === "employee") {
    redirect("/home");
  }
  if (data.user && data.user.role && data.user.role === "manager") {
    redirect("/man");
  }

  if (data.user) {
    return data.user;
  }
};
