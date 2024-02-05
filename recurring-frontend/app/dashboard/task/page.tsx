import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmptyTask from "@/components/empty/EmptyTask";
import CreateTaskButton from "@/components/common/task/CreateTaskButton";
const page = () => {
  return (
    <div className="md:px-10 md:py-5 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Task</h1>
        <CreateTaskButton />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyTask />
        <p className="mt-2">No Tasks where created</p>
        <p className="text-sm py-2">Please Create One</p>
        <CreateTaskButton />
      </div>
    </div>
  );
};

export default page;
