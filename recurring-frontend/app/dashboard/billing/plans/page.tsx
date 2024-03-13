import { ScrollArea } from "@/components/ui/scroll-area";
import Plans from "./components/Plans";
import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";

const page = async () => {
  const res = await actualServerCommonRequest({
    route: API_ROUTES.SUBSCRIPTION_SERVER,
    method: "GET",
    url: "/api/subscription",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <ScrollArea className="py-5 h-screen w-full">
      <Plans subscription={res.subscription} />
    </ScrollArea>
  );
};

export default page;
