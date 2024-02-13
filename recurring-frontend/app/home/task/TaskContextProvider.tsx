"use client";
import { ReactNode, createContext } from "react";
import useTaskHook from "./useTaskHook";
import { TaskTypes } from "@/constants/Types";

interface Column {
  id: string;
  list: TaskTypes[];
}

interface TaskContextType {
  columns: Record<string, Column>;
  onDragEnd: any;
  onOpenChange: any;
  setOnOpenChange: any;
  sheetData: any;
  setSheetData: any;
  error: any;
  loading: any;
  form: any;
  onSubmit: any;
  formSchema: any;
}

const TaskContext = createContext<TaskContextType>({
  columns: {},
  onDragEnd: () => {},
  onOpenChange: {},
  setOnOpenChange: {},
  sheetData: {},
  setSheetData: {},
  error: {},
  loading: {},
  form: {},
  onSubmit: {},
  formSchema: {},
});
const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const {
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
  } = useTaskHook();

  return (
    <TaskContext.Provider
      value={{
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContextProvider, TaskContext };
