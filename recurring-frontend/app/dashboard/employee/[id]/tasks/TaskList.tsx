"use client";

import { getTasksByUserId } from "@/app/lib/features/task/taskActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import CreateProjectButton from "@/components/common/task/CreateTaskButton";
import EmptyTask from "@/components/empty/EmptyTask";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskListTable } from "./TaskListTable";
import TasksBarChart from "./TasksBarChart";
import { useSearchParams } from "next/navigation";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { employee } = useAppSelector((state) => state.employee);
  const { tasks, length } = useAppSelector((state) => state.task);
  const [completedTasks, setCompleteTasks] = useState(0);
  const page = searchParams.get("page");

  useEffect(() => {
    if (employee) {
      let filter = [];
      if (page) {
        filter.push(`page=${page}`);
      }

      dispatch(
        getTasksByUserId({ userSlug: employee._id, filter: filter.join("&") })
      );
    }
  }, [dispatch, employee, page]);

  useEffect(() => {
    if (tasks) {
      let sum = tasks.reduce((acc, val) => {
        if (val.status === "completed") {
          console.log("file: TaskList.tsx:27 -> sum -> val.status", val.status);
          return acc + 1;
        }
        return acc;
      }, 0);
      setCompleteTasks(sum);
    }
  }, [tasks]);

  return (
    <div className="">
      <div className="pt-5">
        <h1 className="font-bold text-3xl">
          Tasks ({completedTasks}/{length && length})
        </h1>
      </div>
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          <TasksBarChart data={tasks} />
          <TaskListTable />
        </div>
      ) : (
        <div className="flex-1 flex justify-center flex-col items-center ">
          <EmptyTask />
          <p className="my-3">No tasks were assigned yet!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
