import { commonRequest } from "@/api/client";

export const logout = async (router: any) => {
  const data = await commonRequest({
    method: "GET",
    url: "/user/logout",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Log: logout -> data", data);
  if (data.success) {
    router.push("/");
  }
};
