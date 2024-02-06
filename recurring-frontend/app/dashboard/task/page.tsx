import CreateTaskButton from "@/components/common/task/CreateTaskButton";
import TaskList from "./TaskList";
import { ScrollArea } from "@/components/ui/scroll-area";
const page = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="md:px-10 md:py-5 flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Task</h1>
        <CreateTaskButton />
      </div>
      <ScrollArea className="h-[650px] md:px-10">
        <TaskList />
      </ScrollArea>
    </div>
  );
};

export default page;
