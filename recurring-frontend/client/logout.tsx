import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logout = async (router: AppRouterInstance) => {
  const data = await actualCommonRequest({
    route: API_ROUTES.AUTH,
    method: "GET",
    url: "/api/user/logout",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (data.success) {
    router.replace("/");
    router.refresh();
  }
};
