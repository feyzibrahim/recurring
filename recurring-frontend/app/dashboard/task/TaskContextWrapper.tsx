import React, { ReactNode } from "react";
import { TaskContextProvider } from "./TaskContextProvider";

const TaskContextWrapper = ({ children }: { children: ReactNode }) => {
  return <TaskContextProvider>{children}</TaskContextProvider>;
};

export default TaskContextWrapper;
