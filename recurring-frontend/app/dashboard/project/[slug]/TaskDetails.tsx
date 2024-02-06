"use client";

import { getTasksByProjectId } from "@/app/lib/features/task/taskActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import CreateProjectButton from "@/components/common/task/CreateTaskButton";
import EmptyTask from "@/components/empty/EmptyTask";
import { useEffect } from "react";
import { TaskListTable } from "./TaskListTable";

const TaskDetails = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasksByProjectId(slug));
  }, [dispatch]);

  return (
    <div className="col-span-3 p-5">
      <h1 className="font-bold text-3xl">Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <TaskListTable slug={slug} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <EmptyTask />
            <p className="my-3">No tasks were created yet!</p>
            <CreateProjectButton slug={slug} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
