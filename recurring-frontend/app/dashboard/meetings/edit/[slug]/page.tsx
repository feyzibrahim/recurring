import { ScrollArea } from "@/components/ui/scroll-area";
import EditForm from "./components/EditForm";
import BackButton from "@/components/common/BackButton";
import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";
import { MeetingTypes } from "@/constants/Types";

const page = async ({ params }: { params: { slug: string } }) => {
  const res = await actualServerCommonRequest({
    route: API_ROUTES.CHAT,
    method: "GET",
    url: `/api/meeting/${params.slug}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <ScrollArea className="w-full h-screen">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Edit Meeting</h1>
        <BackButton />
      </div>
      <EditForm meeting={res.meeting as MeetingTypes} />
    </ScrollArea>
  );
};

export default page;
