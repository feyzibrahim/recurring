import TaskContextWrapper from "./TaskContextWrapper";
import TaskList from "./TaskList";
import { ScrollArea } from "@/components/ui/scroll-area";
const page = () => {
  return (
    <ScrollArea className="px-5 w-full h-screen">
      <TaskContextWrapper>
        <TaskList />
      </TaskContextWrapper>
    </ScrollArea>
  );
};

export default page;
