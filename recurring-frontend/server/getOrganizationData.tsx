import { commonRequest } from "@/api/server";
import { redirect } from "next/navigation";

export const getOrganizationData = async () => {
  const data = await commonRequest({
    method: "GET",
    url: "/user/organization",
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
