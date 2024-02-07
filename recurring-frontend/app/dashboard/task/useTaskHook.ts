import { actualCommonRequest } from "@/api/actual_client";
import { TaskTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import { useEffect, useMemo, useState } from "react";

const useTaskHook = () => {
  const [tasks, setTasks] = useState<TaskTypes[]>();

  useEffect(() => {
    const loadTasks = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.PROJECT,
        method: "GET",
        url: "/api/task",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res && res.tasks) {
        setTasks(res.tasks);
      }
      console.log(
        "file: useTaskHook.ts:22 -> loadTasks -> res.tasks",
        res.tasks
      );
    };
    loadTasks();
  }, []);

  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    console.log(
      "file: useTaskHook.ts:28 -> handleDragEnd -> destination",
      destination
    );

    // If there is no destination or the source and destination are the same, do nothing
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    const newTasks = tasks?.map((task) => {
      if (task._id === draggableId) {
        task.status = destination.droppableId;
      }

      return task;
    });
    setTasks(newTasks);
  };

  const groupedTasks = useMemo(() => {
    if (!tasks) return {};

    return tasks.reduce((groups: any, task) => {
      const { status } = task;
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(task);
      return groups;
    }, {});
  }, [tasks]);

  return {
    tasks,
    handleDragEnd,
    groupedTasks,
  };
};

export default useTaskHook;
