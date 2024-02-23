import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export const checkUser = async () => {
  const data = await actualServerCommonRequest({
    route: API_ROUTES.AUTH,
    method: "GET",
    url: "/user",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data.success) {
    redirect("/dashboard");
  }
};
