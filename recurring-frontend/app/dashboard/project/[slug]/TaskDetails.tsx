"use client";

import { getTasksByProjectId } from "@/app/lib/features/task/taskActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import CreateProjectButton from "@/components/common/task/CreateTaskButton";
import EmptyTask from "@/components/empty/EmptyTask";
import { useEffect } from "react";
import { TaskListTable } from "./TaskListTable";
import { ScrollArea } from "@/components/ui/scroll-area";

const TaskDetails = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasksByProjectId(slug));
  }, [dispatch, slug]);

  return (
    <ScrollArea className="col-span-3 h-screen flex flex-col">
      <h1 className="font-bold text-3xl px-5 pt-5">Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <TaskListTable slug={slug} />
      ) : (
        <div className="flex-1 flex justify-center flex-col items-center ">
          <EmptyTask />
          <p className="my-3">No tasks were created yet!</p>
          <CreateProjectButton slug={slug} />
        </div>
      )}
    </ScrollArea>
  );
};

export default TaskDetails;
