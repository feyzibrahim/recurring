"use client";

import {
  getTask,
  getTasksByProjectId,
} from "@/app/lib/features/task/taskActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import CreateProjectButton from "@/components/common/task/CreateTaskButton";
import EmptyTask from "@/components/empty/EmptyTask";
import { useEffect, useState } from "react";
import { DataTableDemo } from "../DataTableDemo";
import { columns } from "../columns";
import TaskDetailSheet from "./TaskDetailSheet";

const TaskDetails = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  const [onEditSheet, setOnEditSheet] = useState(false);

  useEffect(() => {
    dispatch(getTasksByProjectId(slug));
  }, [dispatch, slug]);

  const rowOnCLick = (something: string) => {
    dispatch(getTask(something));
    setOnEditSheet(true);
  };

  return (
    <div className="col-span-3 h-screen">
      <TaskDetailSheet
        onOpenChange={onEditSheet}
        setOnOpenChange={setOnEditSheet}
      />
      {tasks && tasks.length > 0 ? (
        <DataTableDemo
          columns={columns}
          data={tasks}
          pageTitle="Tasks"
          newButton={<CreateProjectButton slug={slug} />}
          searchField="title"
          rowOnCLick={rowOnCLick}
        />
      ) : (
        <div className="flex-1 flex justify-center flex-col items-center ">
          <EmptyTask />
          <p className="my-3">No tasks were created yet!</p>
          <CreateProjectButton slug={slug} />
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
