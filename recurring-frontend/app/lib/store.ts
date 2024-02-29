import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./features/employee/employeeSlice";
import projectSlice from "./features/project/projectSlice";
import taskSlice from "./features/task/taskSlice";
import attendanceSlice from "./features/attendance/attendanceSlice";
import leaveSlice from "./features/leave/leaveSlice";
import chatSlice from "./features/chat/chatSlice";
import meetingSlice from "./features/meeting/meetingSlice";
import clientSlice from "./features/client/clientSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      employee: employeeSlice,
      project: projectSlice,
      task: taskSlice,
      attendance: attendanceSlice,
      leave: leaveSlice,
      chat: chatSlice,
      meeting: meetingSlice,
      client: clientSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
