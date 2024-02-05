import CreateProjectButton from "@/components/common/task/CreateTaskButton";
import EmptyTask from "@/components/empty/EmptyTask";

const TaskDetails = ({ slug }: { slug: string }) => {
  return (
    <div className="col-span-3 p-5">
      <h1 className="font-bold text-3xl">Tasks</h1>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <EmptyTask />
          <p className="my-3">No tasks were created yet!</p>
          <CreateProjectButton slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
