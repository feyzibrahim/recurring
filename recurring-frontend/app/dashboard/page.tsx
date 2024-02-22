import EmptyProject from "@/components/empty/EmptyProjects";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import TaskCompleteChart from "./components/TaskCompleteChart";
import { Skeleton } from "@/components/ui/skeleton";
import NewTaskChart from "./components/NewTaskChart";
import ProjectsDone from "./components/ProjectsDone";
import TaskDone from "./components/TaskDone";
const page = async () => {
  await checkUserWithoutRedirect();

  return (
    <div className="min-h-screen w-full p-5">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TaskCompleteChart />
            <NewTaskChart />
            <ProjectsDone />
          </div>
          <TaskDone />
        </div>
        <Skeleton className="h-[650px] w-full bg-backgroundAccent shadow-lg" />
      </div>
      {/* <TaskCompleteChart /> */}
      {/* <div className="flex flex-col items-center justify-center h-full">
        <EmptyProject />
        <p className="mt-2">Dashboard Yet To be designed</p>
        <p className="text-sm py-2">Will be updated Later</p>
      </div> */}
    </div>
  );
};

export default page;
