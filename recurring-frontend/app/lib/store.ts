import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./features/employee/employeeSlice";
import projectSlice from "./features/project/projectSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      employee: employeeSlice,
      project: projectSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
