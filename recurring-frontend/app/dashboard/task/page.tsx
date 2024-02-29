import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import TaskContextWrapper from "./TaskContextWrapper";
import TaskList from "./TaskList";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = async () => {
  const user = await checkUserWithoutRedirect();
  return (
    <ScrollArea className="px-5 w-full h-screen">
      <TaskContextWrapper>
        <TaskList user={user} />
      </TaskContextWrapper>
    </ScrollArea>
  );
};

export default page;
