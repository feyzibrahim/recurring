import { ScrollArea } from "@/components/ui/scroll-area";
import BackButton from "../../../../components/common/BackButton";
import CreateForm from "./CreateForm";
import { checkUserWithoutRedirectInManager } from "@/server/checkUserWithoutRedirectInManager";

const page = async () => {
  const user = await checkUserWithoutRedirectInManager();

  return (
    <ScrollArea className="w-full h-screen">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Create Project</h1>
        <BackButton />
      </div>
      <CreateForm user={user} />
    </ScrollArea>
  );
};

export default page;
