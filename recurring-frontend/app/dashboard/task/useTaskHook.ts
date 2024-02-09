import { actualCommonRequest } from "@/api/actual_client";
import { TaskTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import { useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Column {
  id: string;
  list: TaskTypes[];
}

const useTaskHook = () => {
  const [sheetData, setSheetData] = useState<TaskTypes>();
  const [onOpenChange, setOnOpenChange] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Fetching task details initially
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

  // Changing the task status on drag and drop
  const updateTaskStatus = async (slug: string, status: string) => {
    const body = {
      status,
    };

    const res = await actualCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "PATCH",
      url: `/api/task/by-task/${slug}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("file: useTaskHook.ts:90 -> updateTaskStatus -> res", res);
  };

  // Drag and drop enabling function
  const onDragEnd = async ({
    source,
    destination,
    draggableId,
  }: DropResult) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      // Same column drop
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
      // Other column drop
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

      await updateTaskStatus(draggableId, destination.droppableId);

      return null;
    }
  };

  // New Task Form Schema
  const formSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .max(30, { message: "Name should be Less than 30 characters" }),
    project: z
      .string()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .optional(),
    startDate: z.date(),
    dueDate: z.date(),
    status: z
      .string()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .max(30, { message: "Name should be Less than 30 characters" }),
    priority: z
      .string()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .max(30, { message: "Name should be Less than 30 characters" }),
    assignee: z
      .string()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .max(30, { message: "Name should be Less than 30 characters" }),
    // description: z
    //   .string()
    //   .min(2, {
    //     message: "Email must be at least 2 characters.",
    //   })
    //   .max(70, { message: "Name should be Less than 30 characters" })
    //   .optional(),
    // tags: z
    //   .string()
    //   .min(2, {
    //     message: "Email must be at least 2 characters.",
    //   })
    //   .max(70, { message: "Name should be Less than 30 characters" })
    //   .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      project: "",
      startDate: undefined,
      dueDate: undefined,
      status: "",
      priority: "",
      assignee: "",
      // description: "",
      // tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await actualCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "POST",
      url: "/api/task",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success && res.task) {
      console.log("file: useTaskHook.ts:239 -> onSubmit -> res.task", res.task);
      const updatedColumns = columns;
      const { status } = res.task;
      if (updatedColumns.hasOwnProperty(status)) {
        updatedColumns[status].list.push(res.task);
      } else {
        console.error(`Column with status '${status}' not found.`);
      }

      setColumn(updatedColumns);
      setOnOpenChange(false);
    }
  }

  return {
    tasks,
    columns,
    onDragEnd,
    onOpenChange,
    setOnOpenChange,
    sheetData,
    setSheetData,
    error,
    loading,
    form,
    onSubmit,
    formSchema,
  };
};

export default useTaskHook;
