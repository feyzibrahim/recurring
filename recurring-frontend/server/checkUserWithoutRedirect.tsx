import { commonRequest } from "@/api/server";
import { redirect } from "next/navigation";

export const checkUserWithoutRedirect = async () => {
  const data = await commonRequest({
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
};
