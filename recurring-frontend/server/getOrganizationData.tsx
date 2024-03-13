import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export const getOrganizationData = async () => {
  const data = await actualServerCommonRequest({
    route: API_ROUTES.AUTH_SERVER,
    method: "GET",
    url: "/api/user/organization",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if (!data.success) {
  //   redirect("/dashboard/settings/organization-create");
  // }

  if (data.organization) {
    return data.organization;
  } else {
    return null;
  }
};
