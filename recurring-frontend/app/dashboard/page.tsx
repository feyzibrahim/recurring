import EmptyProject from "@/components/empty/EmptyProjects";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import TaskCompleteChart from "./components/TaskCompleteChart";
import { Skeleton } from "@/components/ui/skeleton";
import NewTaskChart from "./components/NewTaskChart";
import ProjectsDone from "./components/ProjectsDone";
import TaskDone from "./components/TaskDone";
import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";
const page = async () => {
  await checkUserWithoutRedirect();

  const projectStatus = await actualServerCommonRequest({
    route: API_ROUTES.PROJECT,
    method: "GET",
    url: "/api/project/completed-count",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const taskStatus = await actualServerCommonRequest({
    route: API_ROUTES.PROJECT,
    method: "GET",
    url: "/api/task/completed-count",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen w-full p-5">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TaskCompleteChart data={taskStatus.tasksCount} />
            <NewTaskChart data={taskStatus.newTaskCount} />
            <ProjectsDone data={projectStatus.projectsCount} />
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
