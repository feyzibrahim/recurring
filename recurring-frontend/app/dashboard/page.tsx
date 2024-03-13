import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import TaskCompleteChart from "@/components/charts/TaskCompleteChart";
import { Skeleton } from "@/components/ui/skeleton";
import NewTaskChart from "@/components/charts/NewTaskChart";
import ProjectsDone from "@/components/charts/ProjectsDone";
import TaskDone from "@/components/charts/TaskDone";
import { actualServerCommonRequest } from "@/api/actual_server";
import { API_ROUTES } from "@/lib/routes";
const page = async () => {
  await checkUserWithoutRedirect();

  const projectStatus = await actualServerCommonRequest({
    route: API_ROUTES.PROJECT_SERVER,
    method: "GET",
    url: "/api/project/completed-count",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const taskStatus = await actualServerCommonRequest({
    route: API_ROUTES.PROJECT_SERVER,
    method: "GET",
    url: "/api/task/completed-count",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen w-full p-5">
      <div className="">
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TaskCompleteChart data={taskStatus.tasksCount} />
            <NewTaskChart data={taskStatus.newTaskCount} />
            <ProjectsDone data={projectStatus.projectsCount} />
          </div>
          <TaskDone />
        </div>
        {/* <Skeleton className="h-[650px] w-full bg-backgroundAccent shadow-lg" /> */}
      </div>
    </div>
  );
};

export default page;
