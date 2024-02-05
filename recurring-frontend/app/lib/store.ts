import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./features/employee/employeeSlice";
import projectSlice from "./features/project/projectSlice";
import taskSlice from "./features/task/taskSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      employee: employeeSlice,
      project: projectSlice,
      task: taskSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
