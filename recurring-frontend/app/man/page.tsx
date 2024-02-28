import { actualServerCommonRequest } from "@/api/actual_server";
import NewTaskChart from "@/components/charts/NewTaskChart";
import ProjectsDone from "@/components/charts/ProjectsDone";
import TaskCompleteChart from "@/components/charts/TaskCompleteChart";
import TaskDone from "@/components/charts/TaskDone";
import { Skeleton } from "@/components/ui/skeleton";
import { API_ROUTES } from "@/lib/routes";

const page = async () => {
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
    </div>
  );
};

export default page;
