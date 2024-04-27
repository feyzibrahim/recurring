"use client";
import TaskCompleteChart from "@/components/charts/TaskCompleteChart";
import NewTaskChart from "@/components/charts/NewTaskChart";
import ProjectsDone from "@/components/charts/ProjectsDone";
import TaskDone from "@/components/charts/TaskDone";

const ChartComponents = () => {
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TaskCompleteChart />
        <NewTaskChart />
        <ProjectsDone />
      </div>
      <TaskDone />
    </div>
  );
};

export default ChartComponents;
