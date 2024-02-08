import { actualCommonRequest } from "@/api/actual_client";
import { TaskTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import { useEffect, useMemo, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";

interface Column {
  id: string;
  list: TaskTypes[];
}

const useTaskHook = () => {
  const [tasks, setTasks] = useState<TaskTypes[]>();
  const [columns, setColumn] = useState<Record<string, Column>>({
    planning: {
      id: "planning",
      list: [],
    },
    active: {
      id: "active",
      list: [],
    },
    completed: {
      id: "completed",
      list: [],
    },
    backlog: {
      id: "backlog",
      list: [],
    },
  });

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
        console.log(
          "file: useTaskHook.ts:67 -> loadTasks -> res.tasks",
          res.tasks
        );

        const tasksByStatus: Record<string, TaskTypes[]> = {};
        res.tasks.forEach((task: TaskTypes) => {
          if (!tasksByStatus[task.status]) {
            tasksByStatus[task.status] = [];
          }
          tasksByStatus[task.status].push(task);
        });

        setColumn((prevColumns) => ({
          ...prevColumns,
          ...Object.keys(tasksByStatus).reduce((acc, status) => {
            return {
              ...acc,
              [status]: {
                ...prevColumns[status],
                list: tasksByStatus[status],
              },
            };
          }, {}),
        }));
      }
    };
    loadTasks();
  }, []);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumn((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      const newEndList = end.list;

      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      setColumn((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return {
    tasks,
    columns,
    onDragEnd,
  };
};

export default useTaskHook;
