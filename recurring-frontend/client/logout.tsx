import { deleteObject } from "@/util/localStorage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logout = async (router: AppRouterInstance) => {
  deleteObject("user_data");
  router.replace("/");
  router.refresh();
};
